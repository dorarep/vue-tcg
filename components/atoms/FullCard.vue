<template lang="pug">
  .wrapper(v-if="card" @mouseenter="$store.commit('game/update', {key: 'showingCard', value: card})")
    .background
      .container
        .card-name {{ card.name }}
        .art-wrapper
          img(:src="imgUrl")
        .card-text
          p(v-if="card.effect") {{ card.effect.text }}
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

<style scoped>
  .wrapper {
    position: relative;
    width: 100%;
  }
  .wrapper:before {
    content:"";
    display: block;
    padding-top: 150%;
  }
  .background {
    margin: 5px;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color:lightgray;
    background:linear-gradient(lightgray,whitesmoke);
    border-radius: 20px;
    box-sizing: border-box;
    box-shadow: -8px 9px 16px -3px gray;
  }
  .container {
    margin: 10px;
    height: 100%;
    width: auto;
  }
  .art-wrapper img {
    position: absolute;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    width: 100%;
    height: auto;
  }
  .art-wrapper {
    overflow: hidden;
    width: 100%;
    height: 50%;
    position: relative;
  }
  .card-name {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    -o-text-overflow: ellipsis; /* Opera9,10対応 */
  }
  .card-text {
    height: 40%;
    overflow: scroll;
  }
</style>
