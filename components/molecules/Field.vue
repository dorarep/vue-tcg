<template lang="pug">
  v-container(grid-list-md)
    transition-group(name="transition-list" tag="p").manual-v-layout
      v-flex(xs2 v-for="(field, i) in $store.state.game.fields[0]" :key="i")
        creature(:card="field")
</template>

<script>
  import Creature from '~/components/atoms/Creature.vue'

  export default {
    components: {
      Creature
    }
  }
</script>
