import { TYPE_CREATURE, TYPE_FOOD, TYPE_ACTION, CARDS } from '~/consts'
import { uuid } from 'vue-uuid'

const STATE_PLAYABLE    = 0
const STATE_END_OF_TURN = 1

const initialState = {
  decks: [
    [
      CARDS[0],
      CARDS[1],
      CARDS[2],
      CARDS[0],
      CARDS[1],
      CARDS[2],
      CARDS[3],
      CARDS[4],
      CARDS[1],
      CARDS[2],
      CARDS[3],
      CARDS[4]
    ],
    [
      CARDS[1],
      CARDS[1],
      CARDS[1]
    ]
  ],
  showingCard: null,
  eating: null,
  hands: [[], []],
  fields: [[], []],
  graveyards: [[], []],
  foods: [[], []],
  playable: {
    creature: 2,
    food: 1
  },
  played: {
    creature: 0,
    food: 0
  },
  state: STATE_PLAYABLE,
}

export const state = () => JSON.parse(JSON.stringify(initialState))

export const mutations = {
  update (state, { key, value }) {
    state[key] = JSON.parse(JSON.stringify(value))
  },
  newTurn (state) {
    state.played = Object.assign({}, initialState.played)
  },
  draw (state, { player, num = 1 }) {
    [...Array(num)].forEach(() => {
      if (state.decks[player].length > 0) {
        let card = state.decks[player].pop()
        card.uuid = uuid.v1()
        state.hands[player].push(card)
      }
    })
  },
  discard (state, { player, i }) {
    if (!state.hands[player][i]) {
      return
    }

    state.graveyards[player].push(state.hands[player][i])
    state.hands[player].splice(i, 1)
  },
  createToken (state, { player, id }) {
    let card = Object.assign({}, CARDS[id])
    card.uuid = uuid.v1()
    state.fields[player].push(card)
  },
  enter (state, { player, i } ) {
    if (!state.hands[player][i]) {
      return
    }

    state.fields[player].push(state.hands[player][i])
    state.hands[player].splice(i, 1)
  },
  addFood (state, { player, num, imgId = 0 }) {
    [...Array(num)].forEach(() => state.foods[player].push({imgId, uuid: uuid.v1()}))
  },
  destroyFood (state, { player, num }) {
    state.foods[player].splice(0, num)
  },
  destroyCreature (state, { player, i }) {
    if (!state.fields[player][i]) {
      return
    }

    state.fields[player].splice(i, 1)
  },
  setEating (state, val) {
    state.eating = val
  },
  setState (state, val) {
    state.state = val
  },
  addPlayed (state, type) {
    state.played[type] ++
  }
}

const isPlayable = (state, { player, i }) => {
  if (!state.hands[player][i]) { return false }

  switch (state.hands[player][i].type) {
    case TYPE_CREATURE:
      return state.playable.creature > state.played.creature
    case TYPE_FOOD:
      return state.playable.food > state.played.food
    default:
      return true
  }
}

export const actions = {
  startGame ({ commit }) {
    commit('draw', { player: 0, num: 3 })
    commit('draw', { player: 1, num: 3 })
    commit('addFood', { player: 0, num: 3 })
    commit('addFood', { player: 1, num: 3 })
    commit('createToken', { player: 0, id: 0 })
    commit('createToken', { player: 1, id: 0 })
  },
  handlePlay ({ dispatch, state }, { player = 0, i }) {
    if (state.state !== STATE_PLAYABLE) {
      return
    }

    dispatch('play', { i, player })
  },
  play ({ commit, state }, { player = 0, i }) {
    if (!isPlayable(state, { player, i })) { return }

    const cardMaster = CARDS[state.hands[player][i].id]

    if (cardMaster.effect) { cardMaster.effect.activate({ commit, state, player }) }

    switch (cardMaster.type) {
      case TYPE_CREATURE:
        commit('enter', { player, i })
        commit('addPlayed', 'creature')
        break
      case TYPE_FOOD:
        commit('discard', { player, i })
        commit('addPlayed', 'food')
        break
      default:
        commit('discard', { player, i })
        break
    }

    commit('audio/playSound', 'set', {root: true})
  },
  eat ({ state, commit }, { player = 0 ,i } ) {
    if (!state.fields[player][i]) {
      return
    }
    commit('setEating', state.fields[player][i].uuid)

    if (state.fields[player][i].intake <= state.foods[player].length) {
      commit('destroyFood', { player, num: state.fields[player][i].intake })
      commit('audio/playSound', 'mog', {root: true})
    } else {
      commit('destroyCreature', { player, i })
      commit('audio/playSound', 'die', {root: true})
    }

    return new Promise(resolve => setTimeout(resolve, 1000));
  },
  async handleTurnEnd ({ commit, state, dispatch }, player = 0) {
    if (state.state !== STATE_PLAYABLE) {
      return
    }

    commit('setState', STATE_END_OF_TURN)
    await dispatch('endPhase', player)
    await dispatch('cpuTurn')
    commit('draw', { player })
    commit('setState', STATE_PLAYABLE)
  },
  async endPhase ({ commit, dispatch, state }, player = 0) {
    for (let i = state.fields[player].length - 1; i >= 0; i--) {
      await dispatch('eat', { player, i })
    }
    commit('newTurn')
  },
  async cpuTurn ({ commit, dispatch, state }, player = 1) {
    commit('draw', { player })
    await dispatch('play', { i: 0, player })
    await dispatch('endPhase', player)
  }
}

