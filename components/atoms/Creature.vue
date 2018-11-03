<template lang="pug">
  badge(:count="card.intake")
    img(:src="imgUrl" width="64" height="64" :class="animateClass").card-wrapper
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
