import { TYPE_CREATURE, TYPE_FOOD, TYPE_ACTION, CARDS } from '~/consts'
import { uuid } from 'vue-uuid'

const initialState = {
  decks: [
    CARDS[0],
    CARDS[1],
    CARDS[2],
    CARDS[0],
    CARDS[1],
    CARDS[2],
    CARDS[3],
    CARDS[4]
  ],
  showingCard: null,
  eating: null,
  hands: [],
  fields: [[CARDS[0]], [CARDS[0]]],
  graveyards: [],
  foods: [],
  playable: {
    creature: 2,
    food: 1
  },
  played: {
    creature: 0,
    food: 0
  },
}

export const state = () => JSON.parse(JSON.stringify(initialState))

export const mutations = {
  initialize (state) {
    state = Object.assign({}, initialState)
  },
  update (state, { key, value }) {
    state[key] = JSON.parse(JSON.stringify(value))
  },
  newTurn (state) {
    state.played = JSON.parse(JSON.stringify(initialState.played))
  },
  draw (state, { player, num = 1 }) {
    [...Array(num)].forEach(() => {
      if (state.decks.length > 0) {
        let card = state.decks.pop()
        card.uuid = uuid.v1()
        state.hands.push(card)
      }
    })
  },
  discard (state, { player, i }) {
    if (!state.hands[i]) {
      return
    }

    state.graveyards.push(state.hands[i])
    state.hands.splice(i, 1)
  },
  enter (state, { player, i } ) {
    if (!state.hands[i]) {
      return
    }

    state.fields[player].push(state.hands[i])
    state.hands.splice(i, 1)
  },
  addFood (state, { player, num, imgId }) {
    [...Array(num)].forEach(() => state.foods.push({imgId, uuid: uuid.v1()}))
  },
  destroyFood (state, { player, num }) {
    state.foods.splice(0, num)
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
  addPlayed (state, type) {
    state.played[type] ++
  }
}

const isPlayable = (state, i) => {
  if (!state.hands[i]) { return false }

  switch (state.hands[i].type) {
    case TYPE_CREATURE:
      return state.playable.creature > state.played.creature
    case TYPE_FOOD:
      return state.playable.food > state.played.food
    default:
      return true
  }
}

export const actions = {
  initialize ({ commit }) {
    commit('initialize')
    commit('draw', 3)
  },
  play ({ commit, state }, { player = 0, i }) {
    if (!isPlayable(state, i)) { return }

    const cardMaster = CARDS[state.hands[i].id]

    if (cardMaster.effect) { cardMaster.effect.activate({ commit, state }) }

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

    if (state.fields[i].intake <= state.foods.length) {
      commit('destroyFood', { player, num: state.fields[player][i].intake })
      commit('audio/playSound', 'mog', {root: true})
    } else {
      commit('destroyCreature', { player, i })
      commit('audio/playSound', 'die', {root: true})
    }

    return new Promise(resolve => setTimeout(resolve, 1000));
  },
  async turnEnd ({ commit, dispatch, state }, player = 0) {
    for (let i = state.fields[player].length - 1; i >= 0; i--) {
      await dispatch('eat', { player, i })
    }
    commit('draw', { player })
    commit('newTurn', { player })
  }
}

