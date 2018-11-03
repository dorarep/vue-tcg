<template lang="pug">
  v-card
    v-card-title
      div デッキ編集
      v-spacer
      v-text-field(
        v-model="search"
        append-icon="search"
        label="Search"
        single-line
        hide-details
      )
    draggable(v-model="decks" :options="{group:'deck'}")
      transition-group(name="flip-list")
        div(v-for="card in decks" :key="card.id" style="width: 100px;")
          div {{ card.name }}
</template>

<script>
  import draggable from 'vuedraggable'
  import Card from '~/components/atoms/FullCard'

  export default {
    components: {
      draggable,
      Card
    },
    data () {
      return {
        split : 0.5
      }
    },
    computed: {
      decks: {
        get () {
          return this.$store.state.user.decks
        },
        set(value) {
          this.$store.commit('user/updateDecks', value)
        }
      }
    },
  }
</script>

<style>
  .flip-list-move {
    transition: transform 0.5s;
  }
</style>

