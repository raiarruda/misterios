<script setup>
import { RouterLink } from "vue-router";
import { computed } from "vue";

const props = defineProps({
  misterio: {
    type: Object,
    required: true
  },
  status: {
    type: String,
    required: true
  }
});

const descoberto = computed(() => props.status === "DESCOBERTO");
const concluido = computed(() => props.status === "CONCLUIDO");
</script>

<template>
  <!-- Link ativo para Descoberto ou Concluído -->
  <RouterLink v-if="descoberto || concluido" :to="`/?id=${misterio.id}`" class="card-link">
    <div class="card shine-effect" :class="{ descoberto, concluido }">

      <div class="icon">
        {{ misterio.icone }}
      </div>

      <!-- Envolvemos o conteúdo textual para controlar o alinhamento e espaçamento -->
      <div class="info">
        <h3>{{ misterio.titulo }}</h3>
        <p v-if="descoberto">📖 Ver Detalhes</p>
        <p v-else-if="concluido">✨ Revisitar</p>
      </div>
    </div>
  </RouterLink>

  <!-- Estado Oculto -->
  <template v-else>
    <div class="card oculto">
      <div class="icon">
        🔒
      </div>

      <div class="info">
        <h3>Mistério {{ misterio.ordem }}</h3>
        <p>Ainda oculto</p>
      </div>
    </div>
  </template>
</template>


<style scoped>
h3 {
  font-size: 1rem;
  line-height: 1.2;
  margin-bottom: 12px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

p {
  opacity: .7;
}

.card-link {
  display: block;
  text-decoration: none;
  color: inherit;
  height: 100%;
}

.icon {
  font-size: 3rem;
  margin-bottom: 16px;
  backface-visibility: hidden;
}

/* Base Comum de Todos os Cards */
.card {
  position: relative;
  /* Necessário para posicionar o brilho */
  overflow: hidden;
  /* Corta o brilho quando ele sai das bordas do card */
  border-radius: 5px;
  padding: 24px;
  text-align: center;
  backface-visibility: hidden;
  -webkit-font-smoothing: antialiased;
  transition: transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease, opacity 0.3s ease, background 0.3s ease;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  /* Empurra o ícone para cima e o texto para baixo */
  align-items: center;
  height: 100%;
  /* Ocupa o tamanho máximo da linha do grid */
  min-height: 220px;
  /* Define uma altura mínima segura para que todos fiquem iguais */
  box-sizing: border-box;
  /* Evita que o padding altere o tamanho final calculados */

}

.info {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  flex-grow: 1;
  /* Faz o bloco de texto preencher o espaço restante */
  width: 100%;
}

/* --- 🌟 Efeito de Brilho Reflexivo (Shine) --- */
.shine-effect::after {
  content: '';
  position: absolute;
  top: 0;
  left: -150%;
  /* Começa completamente fora do card à esquerda */
  width: 50%;
  height: 100%;
  background: linear-gradient(90deg,
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, 0.13) 50%,
      rgba(255, 255, 255, 0) 100%);
  transform: skewX(-25deg);
  /* Inclina a faixa de luz */
  transition: none;
}

/* Dispara o movimento da luz no hover */
.shine-effect:hover::after {
  left: 150%;
  /* Atravessa o card até sumir à direita */
  transition: left 0.6s ease-in-out;
}

/* --- ESTADO: OCULTO --- */
.card.oculto {
  opacity: .6;
  background: linear-gradient(180deg, rgba(40, 40, 40, .15), rgba(20, 20, 20, .4));
  border: 1px dashed rgba(166, 138, 86, .25);
  cursor: not-allowed;
}

.card.oculto:hover {
  transform: translateY(-4px);
  opacity: .85;
  border-color: rgba(166, 138, 86, .5);
  box-shadow: 0 8px 25px rgba(166, 138, 86, .1);
}

.card.oculto .icon {
  filter: grayscale(100%) blur(1px);
  opacity: 0.5;
}

.card.oculto h3 {
  color: rgba(255, 255, 255, 0.4);
  filter: blur(4px);
}

/* --- ESTADO: DESCOBERTO --- */
.descoberto {
  opacity: 1;
  border: 2px solid rgba(166, 138, 86, .4);
  background: linear-gradient(180deg, rgba(91, 16, 23, .35), rgba(25, 10, 12, .9));
  box-shadow: 0 0 25px rgba(91, 16, 23, .25);
}

.descoberto:hover {
  border-color: #a32736;
  box-shadow: 0 0 35px rgba(163, 39, 54, .4);
  transform: translateY(-4px);
}

.descoberto h3 {
  color: #f1e7d8;
}

/* --- ESTADO: CONCLUIDO --- */
.concluido {
  opacity: 1;
  border: 2px solid #a68a56;
  background: linear-gradient(180deg, rgba(47, 107, 66, .25), rgba(15, 30, 20, .95));
  box-shadow: 0 0 25px rgba(47, 107, 66, .25);
}

/* Intensifica a faixa de luz para o mistério concluído */
.concluido.shine-effect::after {
  background: linear-gradient(90deg,
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, 0.25) 50%,
      rgba(255, 255, 255, 0) 100%);
}

.concluido:hover {
  border-color: #c4ab76;
  box-shadow: 0 0 35px rgba(63, 138, 85, .4);
  transform: translateY(-4px);
}

.concluido h3 {
  color: #7fd69c;
}

.concluido p {
  color: #a68a56;
  font-weight: bold;
}

@media (max-width: 768px) {
  .card {
    /* 🌟 Removemos o aspect-ratio para o card não esticar igual um retângulo vertical */
    aspect-ratio: auto !important;
    padding: 16px 8px !important;
    /* Padding vertical confortável */
    min-height: 110px;
    /* Altura mínima estável para o mobile */
    justify-content: center;
    align-items: center;
    gap: 6px;
    /* Espaçamento fixo entre os elementos internos */
  }

  .icon {
    font-size: 1.8rem !important;
    /* Tamanho controlado do cadeado/ícone */
    margin-bottom: 0 !important;
    line-height: 1;
  }

  .card h3 {
    font-size: 0.8rem !important;
    line-height: 1.2;
    margin: 0 !important;
    padding: 0 4px;
    width: 100%;
    word-break: break-word;
    /* Evita que o texto quebre a borda */
  }

  .card p {
    display: none !important;
    /* Garante que o texto de ação suma no mobile */
  }
}
</style>
