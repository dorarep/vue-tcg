<template lang="pug">
  div(v-if="card" @mouseenter="$store.commit('game/update', {key: 'showingCard', value: card})")
    badge(v-if="card.intake >= 0 || card.size >= 0 || card.badge" :count="card.badge || card.intake || card.size")
      img(:src="imgUrl" width="64" height="64"  :class="animateClass").card-wrapper
    template(v-else)
      img(:src="imgUrl" width="64" height="64"  :class="animateClass").card-wrapper
</template>

<script>
  export default {
    props: ['card'],
    computed: {
      imgUrl () {
        return require(`~/assets/cards/${this.card.id}.png`)
      },
      animateClass () {
        if (this.$store.state.game.eating == this.card.uuid) {
          return 'animated rubberBand'
        } else {
          return ''
        }
      }
    }
  }
</script>
