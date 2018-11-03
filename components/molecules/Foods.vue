<template lang="pug">
  v-container(grid-list-md)
    transition-group(name="transition-list" tag="p").manual-v-layout
      v-flex(xs v-for="(food, i) in $store.state.game.foods[player]" :key="food.uuid")
        food(:imgId="food.imgId")
</template>

<script>
  import Food from '~/components/atoms/Food.vue'

  export default {
    props: {
      player: Number
    },
    components: {
      Food
    }
  }
</script>
