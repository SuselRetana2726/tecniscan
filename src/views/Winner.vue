<template>
  <div class="overlay-text">Toca la pantalla para comenzar</div>
  <div class="home-container">
  <div class="contenido" @click="iniciarJuego()">
    <div class="texto-wrapper">
      <div class="texto">
        <p><b>¡GANASTE!</b></p>
      </div>
    </div>
    <div class="logos">
      <img src="/images/logo.png" alt="Logos" class="logo-img" />      
    </div>
  </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      juegoSeleccionado: '',
      timeoutId: null, // Guardar el ID del timeout
      clicHabilitado: false
    }
  },
  methods: {
    iniciarJuego() {
      if (!this.clicHabilitado) return;

      // Cancelamos el redireccionamiento automático si el usuario ya interactuó
      clearTimeout(this.timeoutId);
      this.$router.push(`/`);
    }
  },
  mounted() {
    // Inicia el temporizador de 30 segundos
    this.timeoutId = setTimeout(() => {
      this.$router.push(`/`); // o la ruta que desees
    }, 30000); // 30,000 milisegundos = 30 segundos

    // Habilitar clics después de 1 segundo
    setTimeout(() => {
      this.clicHabilitado = true;
    }, 1500);
  },
  beforeDestroy() {
    // Por si acaso, limpiamos el timeout cuando el componente se destruye
    clearTimeout(this.timeoutId);
  }
}
</script>

<style scoped>
.home-container {
  background-color: #002d74;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.contenido {
  width: 100%;
  padding: 0.5rem 0.5rem 8vh; /* espacio para que el logo no lo empuje */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center; /* centra verticalmente el texto-wrapper */
  height: 60vh;
  box-sizing: border-box;
  text-align: center;
  color: rgb(255, 255, 255);
  margin-top: -8vh;
  font-family:'FiraSans', sans-serif;
  position: relative; /* necesario para que logos con absolute funcione bien */
}

.logo-img {
  width: 100%;
}
.texto-wrapper {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10rem;
}

.texto p {
  font-size: 9rem;
}
.logos {
  position: absolute;
  bottom: -19vh;
  left: 50%;
  transform: translateX(-50%);
  width: 65%;
  max-width: 45%;
}

.overlay-text {
  position: absolute;
  top: 1vh;
  width: 100%;
  text-align: center;
  font-size: 3vh;
  color: rgba(255, 255, 255, 0.534);
  text-shadow: 0 0 8px rgba(0, 0, 0, 0.7);
  font-weight: bold;
  animation: pulse 1.8s infinite;
  padding: 0 0vw;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}


/* Responsivo para celulares pequeños */
@media (max-width: 480px) {
  .contenido {
    height: 80vh;
    padding: 1.5rem 1rem;
    margin-top: 0vh;
  }

  .logo-img {
    max-width: 90%;
  }
  .texto p {
    font-size: 1rem;
  }
}
</style>
