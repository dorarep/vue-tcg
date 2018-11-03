<template lang="pug">
  transition-group.tr.full-width(name="transition-list" tag="div")
    .td.format-width(v-for="(hand, i) in $store.state.game.hands[player]" :key="hand.uuid")
      mini-card(:card="hand" @click.native="$store.dispatch('game/handlePlay', { player, i })")
</template>

<script>
  import draggable from 'vuedraggable';
  import MiniCard from '~/components/atoms/MiniCard.vue'

  export default {
    props: {
      player: Number
    },
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
