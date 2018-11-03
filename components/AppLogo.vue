<template lang="pug">
  div
    deck
    hand
</template>

<script>
  import Hand from '~/components/molecules/Hand.vue'
  import Deck from '~/components/molecules/Deck.vue'

  export default {
    components: {
      Hand, Deck
    }
  }
</script>
