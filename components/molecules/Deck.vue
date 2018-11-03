<template lang="pug">
  deck(:deck="$store.state.game.decks")
</template>

<script>
  import Deck from '~/components/atoms/Deck.vue'

  export default {
    components: {
      Deck
    }
  }
</script>
