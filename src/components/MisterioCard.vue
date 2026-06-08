<script setup>
import { RouterLink } from "vue-router";
const props = defineProps({
  misterio: {
    type: Object,
    required: true
  },

  descoberto: {
    type: Boolean,
    default: false
  }
});

</script>

<template>


  <RouterLink v-if="descoberto" :to="`/?id=${misterio.id}`" class="card-link">
    <div class="card descoberto">

      <div class="icon">
        {{ misterio.icone }}
      </div>

      <h3>
        {{ misterio.titulo }}
      </h3>

      <p>
        🔓 Revisitar
      </p>

    </div>
  </RouterLink>


  <template v-else>
    <div class="card ">
      <div class="icon">
        🔒
      </div>

      <h3>
        Mistério {{ misterio.ordem }}
      </h3>

      <p>
        Ainda oculto
      </p>
    </div>
  </template>


</template>

<style scoped>
/* Elements Base */
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

/* Links */
.card-link {
  display: block;
  text-decoration: none;
  color: inherit;
  height: 100%;
}

/* Elements Global */
.titulo {
  opacity: 0;
  transition: opacity 0.3s ease;
}

.icon {
  font-size: 3rem;
  margin-bottom: 16px;
  backface-visibility: hidden;
}

/* Component: Card Base (Bloqueado / Mistério) */
.card {
  border-radius: 5px;
  padding: 24px;
  text-align: center;
  opacity: .6;
  background: linear-gradient(180deg, rgba(40, 40, 40, .15), rgba(20, 20, 20, .4));
  border: 1px dashed rgba(166, 138, 86, .25);
  /* Borda tracejada de mistério */
  cursor: pointer;
  backface-visibility: hidden;
  -webkit-font-smoothing: antialiased;
  transition: transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease, opacity 0.3s ease, background 0.3s ease;
}

/* Efeito de hover no Card Bloqueado */
.card:not(.descoberto):hover {
  transform: translateY(-4px);
  opacity: .85;
  border-color: rgba(166, 138, 86, .5);
  box-shadow: 0 8px 25px rgba(166, 138, 86, .1);
}

/* Esconde / Modifica itens do card enquanto bloqueado */
.card:not(.descoberto) .icon {
  filter: grayscale(100%) blur(1px);
  opacity: 0.5;
  transition: filter 0.3s ease, opacity 0.3s ease;
}

.card:not(.descoberto):hover .icon {
  filter: grayscale(30%) blur(0px);
  opacity: 0.8;
}

.card:not(.descoberto) h3 {
  color: rgba(255, 255, 255, 0.4);
  filter: blur(4px);
  /* Texto do título borrado até descobrir! */
  transition: filter 0.3s ease, color 0.3s ease;
}

/* Component: Card State (Descoberto / Revelado) */
.descoberto {
  opacity: 1 !important;
  border: 1px solid #7d1b26;
  border-width: 2px;
  border-color: rgba(166, 138, 86, .4);
  background: linear-gradient(180deg, rgba(91, 16, 23, .25), rgba(25, 10, 12, .85));
  box-shadow: 0 0 25px rgba(91, 16, 23, .20);
}

.descoberto:hover {
  border-color: #a32736;
  box-shadow: 0 0 35px rgba(163, 39, 54, .35);
  transform: translateY(-4px);
}

/* Interações após Descoberto */
.descoberto h3 {
  color: #f1e7d8;
  filter: blur(0px) !important;
}

.descoberto .titulo {
  opacity: 1;
}

.descoberto .icon {
  filter: drop-shadow(0 0 8px rgba(166, 138, 86, .35)) !important;
  opacity: 1 !important;
}

/* Responsiveness */
@media (max-width: 768px) {
  .card {
    aspect-ratio: 0.85;
    padding: 8px;
    border-radius: 5px;
  }

  .icon {
    font-size: 2rem;
    margin-bottom: 4px;
  }

  .codigo {
    font-size: 0.85rem;
    letter-spacing: 1px;
  }

  .card h3 {
    font-size: 0.9rem;
    margin: 0;
  }

  .card p {
    display: none;
  }
}
</style>
