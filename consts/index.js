export const TYPE_CREATURE = 1
export const TYPE_FOOD     = 2
export const TYPE_ACTION   = 3

const IF_CREATURE_GREATER_THAN = (num, effect) => {
  return {
    activate: ({ state, commit, player }) => {
      if (state.fields[player].length >= num) { effect.activate({ state, commit, player }) }
    },
    text: `もし生物が${num}体以上いるなら、${effect.text}`
  }
}

const ADD_FOOD = (num, imgId) => {
  return {
    activate: ({ commit, player }) => { commit('addFood', {player, num, imgId}) },
    text: `食料を${num}つ手に入れる。`
  }
}

const DESTROY_FOOD = (num) => {
  return {
    activate: ({ commit, player }) => { commit('destroyFood', { player: (player + 1) % 2, num }) },
    text: `相手の食料を${num}つ減らす。`
  }
}

const DRAW = (num) => {
  return {
    activate: ({ commit, player }) => { commit('draw', { player, num }) },
    text: `カードを${num}枚引く。`
  }
}

export const CARDS = [
  {
    id: 0,
    name: '柴犬',
    type: TYPE_CREATURE,
    intake: 1,
    effect: DESTROY_FOOD(1)
  },
  {
    id: 1,
    name: 'ニンジン',
    type: TYPE_FOOD,
    effect: ADD_FOOD(2, 0),
    badge: 4
  },
  {
    id: 2,
    name: '狩猟',
    type: TYPE_ACTION,
    effect: IF_CREATURE_GREATER_THAN(2, ADD_FOOD(4, 1))
  },
  {
    id: 3,
    name: 'シェフ',
    type: TYPE_CREATURE,
    effect: ADD_FOOD(2, 2),
    intake: 1
  },
  {
    id: 4,
    name: '小金持ち',
    type: TYPE_CREATURE,
    effect: DRAW(2),
    intake: 2
  }
]
