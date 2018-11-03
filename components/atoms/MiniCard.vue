<template lang="pug">
  div(v-if="card" @mouseenter="$store.commit('game/update', {key: 'showingCard', value: card})")
    img(:src="imgUrl" width="64" height="64").card-wrapper
</template>

<script>
  export default {
    props: ['card'],
    computed: {
      imgUrl () {
        return require(`~/assets/cards/${this.card.id}.png`)
      }
    }
  }
</script>
