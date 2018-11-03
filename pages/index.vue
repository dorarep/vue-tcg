<template lang="pug">
  battle-field
</template>

<script>
import BattleField from '~/components/organisms/BattleField.vue'

export default {
  components: {
    BattleField
  },
  created () {
    this.$store.dispatch('game/startGame')
  }
}
</script>

