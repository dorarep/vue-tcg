<template lang="pug">
  img(:src="imgUrl" width="64" height="64").card-wrapper
</template>

<script>
  export default {
    props: ['imgId'],
    computed: {
      imgUrl () {
        return require(`~/assets/foods/${this.imgId}.png`)
      }
    }
  }
</script>
