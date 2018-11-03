import { CARDS } from '~/consts'

export const state = () => ({
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
  cards: [
    CARDS[4]
  ]
})

export const mutations = {
  updateDecks (state, newDeck) {
    state.decks = newDeck
  },
  updateCards (state, newCard) {
    state.cards = newCard
  },
}
