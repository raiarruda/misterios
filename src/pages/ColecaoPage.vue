<script setup>

import { computed } from "vue";
import misterios from "../data/misterios-master";
import MisterioCard from "../components/MisterioCard.vue";

const lista = computed(() => {

  return Object.entries(misterios)
    .map(([id, misterio]) => ({
      id,
      ...misterio
    }))
    .sort(
      (a, b) => a.ordem - b.ordem
    );

});
function foiDescoberto(misterio) {

  return !!localStorage.getItem(
    `mist-${misterio.id}`
  );

}

const totalDescobertos = computed(() => {

  return lista.value.filter(
    foiDescoberto
  ).length;

});

</script>

<template>

  <div class="page">

    <h1>
      Coleção de Mistérios
    </h1>

    <p class="subtitle">

      {{ totalDescobertos }}
      de
      {{ lista.length }}
      descobertos

    </p>

    <div class="grid">

      <MisterioCard v-for="misterio in lista" :key="misterio.codigo" :misterio="misterio"
        :descoberto="foiDescoberto(misterio)" />

    </div>

  </div>

</template>

<style scoped>
.page {

  max-width: 1200px;

  margin: 0 auto;

  padding: 60px 24px;
}

h1 {

  text-align: center;

  margin-bottom: 12px;
}

.subtitle {

  text-align: center;

  opacity: .7;

  margin-bottom: 48px;
}

.grid {


  display: grid;

  grid-template-columns: repeat(5, 1fr);

  gap: 20px;

  margin-top: 40px;
}

@media (max-width: 768px) {

  .grid {

    grid-template-columns: repeat(3, 1fr);

    gap: 8px;
  }

}
</style>