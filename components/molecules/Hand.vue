<template lang="pug">
  transition-group.tr.full-width(name="transition-list" tag="div")
    .td.format-width(v-for="(hand, i) in $store.state.game.hands" :key="hand.uuid")
      mini-card(:card="hand" @click.native="$store.dispatch('game/play', i)")
    .td.format-width
    .td.format-width
    .td.format-width
    .td.format-width
</template>

<script>
  import draggable from 'vuedraggable';
  import MiniCard from '~/components/atoms/MiniCard.vue'

  export default {
    components: {
      MiniCard, draggable
    }
  }
</script>

<style scoped>
  .full-width {
    width: 100%;
  }
  .format-width {
    width: 10%;
  }
</style>
