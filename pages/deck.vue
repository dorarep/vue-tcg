<template lang="pug">
  div(height="100%")
    .demo-split
      split(v-model="split")
        scroll(slot="left").demo-split-pane
          deck-editor
        scroll(slot="right").demo-split-pane
          draggable(v-model="cards" :options="{group:'deck'}")
            transition-group(name="flip-list")
              div(v-for="card in cards" :key="card.id" style="width: 100px;")
                card(:card="card")
</template>

<script>
  import draggable from 'vuedraggable'
  import Card from '~/components/atoms/FullCard'
  import DeckEditor from '~/components/organisms/DeckEditor'

  export default {
    components: {
      draggable,
      Card,
      DeckEditor
    },
    data () {
      return {
        split : 0.5
      }
    },
    computed: {
      decks: {
        get () {
          return this.$store.state.user.decks
        },
        set(value) {
          this.$store.commit('user/updateDecks', value)
        }
      },
      cards: {
        get () {
          return this.$store.state.user.cards
        },
        set(value) {
          this.$store.commit('user/updateCards', value)
        }
      }
    },
  }
</script>

<style>
  .flip-list-move {
    transition: transform 0.5s;
  }
   .demo-split{
     height: 200px;
   }
  .demo-split-pane{
    padding: 10px;
  }
</style>

