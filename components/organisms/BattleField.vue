<template lang="pug">
  #game-area
    split(v-model="split1").demo-split-pane
      div(slot="left").demo-split-pane
        full-card(:card="$store.state.game.showingCard")
        v-btn(@click="$store.dispatch('game/handleTurnEnd')") ターン終了
      div(slot="right").demo-split-pane#field-area
        deck
        hand(:player=1)
        foods(:player=1)
        field(:player=1)
        field(:player=0)
        foods(:player=0)
        hand(:player=0)
</template>

<script>
  import Hand from '~/components/molecules/Hand.vue'
  import Field from '~/components/molecules/Field.vue'
  import Foods from '~/components/molecules/Foods.vue'
  import Deck from '~/components/molecules/Deck.vue'
  import FullCard from '~/components/atoms/FullCard.vue'

  export default {
    components: {
      Hand, Field, Foods, Deck, FullCard
    },
    data () {
      return {
        split1: 0.3,
        split2: 0.7
      }
    }
  }
</script>

<style>

  #game-area {
    height: 100vh;
  }
  #field-area {
    background-image: url('~assets/background/sea.jpeg');
    background-size: cover;
  }
  .demo-split-pane {
    height: 100%;
  }
  .split-pane {
    height: 100vh;
  }
</style>
