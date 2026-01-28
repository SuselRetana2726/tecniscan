<template>
  <div>
    <component :is="componenteJuego" />
  </div>
</template>

<script>
import JuegoMemoria from '../components/Memory.vue'

export default {
  name: 'Juego',
  components: {
    JuegoMemoria,
  },
  computed: {
    componenteJuego() {
      const juego = this.$route.params.juego
      if (juego === 'memoria') return 'JuegoMemoria'
      return null
    }
  }
}
</script>
