<template>
  <div class="overlay-text">Toca la pantalla para comenzar</div>
  <div class="home-container">
    <div class="contenido"  @click="iniciarJuego()">
      <h1><strong>¡PON A PRUEBA TU MEMORIA!</strong></h1>
      <div class="texto">
        <p>
          Tienes <span style="color: #318fff; font-style: italic; font-weight: bold; "> 15 segundos</span> para
          <br>
          encontrar las parejas y
          <br>
          <strong>llevarte un premio</strong>          
        </p>
      </div>

      <div class="logos">
        <img src="/images/logo.png" alt="Logos" class="logos-img" />      
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    iniciarJuego() {
      clearTimeout(this.timeoutId);
      this.$router.push(`/juego/memoria`);
    }
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
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 60vh;
  box-sizing: border-box;
  text-align: center;
  color: #fff;
  padding-bottom: 1vh;
}


h1 {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  box-sizing: border-box;
  text-align: center;
  color: #fff;
  font-size: 5.5vh;
  max-width: 50vh;
}

.logos-img {
  width: 100%;
}


.texto p {
  max-width: 40vh;
  font-size: 3.8rem;
  margin-bottom: 8rem;
  margin-top: 5rem;
}

.logos {
  position: absolute;
  bottom: -15vh;
  left: 50%;
  transform: translateX(-50%);
  width: 65%;
  max-width: 50%;
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

  .logos {
  width: 60%;
  align-items: center; /* Alinea al centro */
}

}
</style>
