<template>
  <div class="juego-memoria">    
    <div class="contenido">
      <div class="temporizador">
        <span>{{ tiempo }}</span>
      </div>
      <div class="area-juego">
        <div class="tablero">
          <div v-for="(carta, index) in cartas" :key="index" class="carta" @click="voltearCarta(index)"
            :class="{ mezclando: mezclando,'glow-dorado': carta.especial && mostrarGlow  }" :style="mezclando ? `animation-delay: ${index * 0.05}s` : ''">
            
            <div class="card-inner" :class="{ girada: carta.volteada || carta.encontrada}">
              <div class="card-front">
                <img src="/images/card.png" alt="Reverso"/>
              </div>
              <div class="card-back">
                <img :src="carta.especial ? '/images/special-card.png' : getImagenCarta(carta.valor)" :alt="carta.valor"  />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="logos">
        <img src="/images/logo.png" alt="Logos" class="logos-img" />
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      cartas: [],
      primeraCarta: null,
      segundaCarta: null,
      bloqueo: false,
      tiempo: 15,
      temporizador: null,
      ganaste: false,
      perdiste: false,
      mezclando: false,
      juegoSeleccionado: 'memoria',
      mostrarGlow: false,
    };
  },
  created() {
    this.reiniciarJuego();
  },
  methods: {
    getImagenCarta(valor) {
      return `${import.meta.env.BASE_URL}images/${valor}`;
    },    
    generarCartas() {
      const valoresBase = ['card1.png', 'card2.png', 'card3.png', 'card4.png'];
      const valores = [...valoresBase, ...valoresBase];
      const mezcladas = valores
        .map(valor => ({ valor, volteada: false, encontrada: false }))
        .sort(() => 0.5 - Math.random());
      
       // Insertar carta especial en el medio (posición 4 en array de 9)
      const cartaCentral = {
        valor: 'carta-central',
        volteada: false,
        encontrada: false,
        especial: true
      };

      mezcladas.splice(4, 0, cartaCentral); // Insertar en el medio

      return mezcladas;
    },
    voltearCarta(index) {
      if (this.ganaste || this.perdiste) return;
      const carta = this.cartas[index];

      if (carta.especial) return; // ❗ no se puede voltear
      
      if (this.bloqueo || carta.volteada || carta.encontrada) return;

      carta.volteada = true;

      if (!this.primeraCarta) {
        this.primeraCarta = { carta, index };
      } else if (!this.segundaCarta) {
        this.segundaCarta = { carta, index };
        this.bloqueo = true;

        setTimeout(() => {
          const { carta: primera } = this.primeraCarta;
          const { carta: segunda } = this.segundaCarta;

          if (primera.valor === segunda.valor) {
            primera.encontrada = true;
            segunda.encontrada = true;
          } else {
            primera.volteada = false;
            segunda.volteada = false;
          }

          this.primeraCarta = null;
          this.segundaCarta = null;
          this.bloqueo = false;

          if (this.cartas.filter(c => !c.especial).every(c => c.encontrada)) {
            clearInterval(this.temporizador);
            this.bloqueo = true;

            // 👉 buscar la carta especial
            const cartaEspecial = this.cartas.find(c => c.especial);

            // 👉 darle la vuelta
            if (cartaEspecial) {
              cartaEspecial.volteada = true;

              // ⏱️ esperar a que termine el giro
              setTimeout(() => {
                this.mostrarGlow = true;
              }, 600); // igual al transition del giro
            }

            // 👉 esperar la animación antes de ir a Ganaste
            setTimeout(() => {
              this.$router.push(`/winner`);
            }, 2400); // un poquito más que el transition de 0.6s
          }
        }, 800);
      }
    },
    iniciarTemporizador() {
      this.temporizador = setInterval(() => {
        if (this.tiempo > 0) {
          this.tiempo--;
        } else {
          clearInterval(this.temporizador);
          this.bloqueo = true;
          setTimeout(() => {
            this.$router.push(`/loser`);
          }, 500);
        }
      }, 1000);
    },
    reiniciarJuego() {
      this.cartas = this.generarCartas();
      this.primeraCarta = null;
      this.segundaCarta = null;
      this.bloqueo = true;
      this.tiempo = 15;
      this.ganaste = false;
      this.perdiste = false;
      clearInterval(this.temporizador);

      this.mezclando = true;
      setTimeout(() => {
        this.mezclando = false;
        this.bloqueo = false;
        this.iniciarTemporizador();
      }, 1500);
    }
  }
};
</script>
<style scoped>
.juego-memoria {
  width: 100vw;
  height: 100vh;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  background-color: #006aff;
}

.contenido {
  position: relative;
  z-index: 1;
  flex: 1;
  padding: 2vh 4vw;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: flex-start;
  text-align: center;
  color: white;
  font-weight: bold;
}

.temporizador {
  color: #ffffff;
  display: flex;
  align-items: center;  
  border-radius: 50%;
  font-size: 8vh;
  margin-bottom: 2vh;
  align-self: center;
  margin-top: 10vh;
  margin-bottom: 5vh;
  border: 14px solid #fff;
  text-align: center;
  justify-content: center;

  
  min-width: 10vh;
  max-width: 12vh;
  max-height: 13vh;
  width: 100%;
  height: 100%;
  padding: 1vh 2vh;
}

.tablero {
  margin-top: 3vh;
  display: grid;
  gap: 0.8vh;
  grid-template-columns: repeat(3, 1fr);
  width: 70vw;
  flex-grow: 1;
  max-height: 50vh;
}

.carta {
  perspective: 1000px;
  width: 100%;
  aspect-ratio: 1/1;
}

.card-inner {
  position: relative;
  width: 100%;
  height: 100%;
  transition: transform 0.6s ease;
  transform-style: preserve-3d;
  background-color: white;
  border-radius: 1vh;
}

.card-inner.girada {
  transform: rotateY(180deg);
}

.card-inner.girada .card-back {
  background-color: white;
}

.card-front {
background-color: #002d74;
}

.card-front,
.card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  border-radius: 1vh;
  display: flex;
  align-items: center;     /* 👈 centra vertical */
  justify-content: center; /* 👈 centra horizontal */
}

.card-front img {
  width: 80%;
  height: 80%;
  object-fit: contain;
  justify-content: center;
  border-radius: 1vh;
}

.card-back img {
   width: 85%;
  height: 85%;
  object-fit: contain;
  border-radius: 1vh;
}

.card-back {
  transform: rotateY(180deg);
}

.mezclando {
  animation: mezclar 0.6s ease-in-out forwards;
}

.logos {
  position: absolute;
  bottom: 4vh;
  left: 50%;
  transform: translateX(-50%);
  width: 65%;
  max-width: 45%;
}
.logos-img {
  width: 100%;
}

@keyframes mezclar {
  0% {
    transform: translateY(0) scale(1);
  }

  30% {
    transform: translateY(-2vh) scale(1.1) rotate(5deg);
  }

  60% {
    transform: translateY(2vh) scale(0.9) rotate(-5deg);
  }

  100% {
    transform: translateY(0) scale(1);
  }
}
.area-juego {
  width: 70vw;
  /* igual que el tablero */
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 2vh;
}

.glow-dorado {  /* renombramos a algo más genérico, por ejemplo: shake */
  animation: shakeCard 0.5s infinite;
}

@keyframes shakeCard {
  0% { transform: rotate(0deg) translateX(0); }
  10% { transform: rotate(-3deg) translateX(-2px); }
  20% { transform: rotate(3deg) translateX(2px); }
  30% { transform: rotate(-3deg) translateX(-2px); }
  40% { transform: rotate(3deg) translateX(2px); }
  50% { transform: rotate(-2deg) translateX(-1px); }
  60% { transform: rotate(2deg) translateX(1px); }
  70% { transform: rotate(-1deg) translateX(-1px); }
  80% { transform: rotate(1deg) translateX(1px); }
  90% { transform: rotate(0deg) translateX(0); }
  100% { transform: rotate(0deg) translateX(0); }
}

/* 📱 Adaptación a pantallas pequeñas */
@media (max-width: 768px) {
  .contenido h2 {
    font-size: 3vh;
  }

  .temporizador {
    font-size: 2.5vh;
  }

  .icono-reloj {
    width: 2.5vh;
    height: 2.5vh;
  }

  .tablero {
    grid-template-columns: repeat(3, 1fr);
    gap: 1.5vh;
  }
}
</style>
