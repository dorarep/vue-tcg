<template lang="pug">
  v-container(grid-list-md)
    transition-group(name="transition-list" tag="p").manual-v-layout
      v-flex(xs2 v-for="(field, i) in $store.state.game.fields[player]" :key="i")
        mini-card(:card="field")
</template>

<script>
  import MiniCard from '~/components/atoms/MiniCard.vue'

  export default {
    props: {
      player: Number
    },
    components: {
      MiniCard
    }
  }
</script>
