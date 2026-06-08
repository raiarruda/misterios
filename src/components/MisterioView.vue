<script setup>

const props = defineProps({
  misterio: {
    type: Object,
    required: true
  }
});

</script>

<template>

  <div v-if="props.misterio" class="misterio-page">

    <div class="tag">
      MISTÉRIO DESBLOQUEADO
    </div>

    <div v-if="props.misterio.icone" class="icone">
      {{ props.misterio.icone }}
    </div>

    <h1>
      {{ props.misterio.titulo }}
    </h1>

    <p class="frase">
      {{ props.misterio.frase }}
    </p>

    <section class="card">

      <h2>
        O QUE VAI ACONTECER?
      </h2>

      <p>
        {{ props.misterio.descricao }}
      </p>

    </section>

  </div>

</template>

<style scoped>
.misterio-page {

  min-height: 100vh;

  display: flex;

  flex-direction: column;

  align-items: center;

  padding: 60px 24px;
}

.tag {

  background: #5b1017;

  color: #f1e7d8;

  padding: 10px 20px;

  border-radius: 999px;

  letter-spacing: 2px;

  font-size: 12px;

  font-weight: bold;

  margin-bottom: 32px;
}

.icone {

  font-size: 4rem;

  margin-bottom: 16px;
}

h1 {

  text-align: center;

  font-size: clamp(2rem, 5vw, 4rem);

  margin-bottom: 24px;

  color: #f5f0e8;
}

.frase {

  max-width: 700px;

  text-align: center;

  font-size: 1.2rem;

  font-style: italic;

  color: #c7b299;

  margin-bottom: 40px;
}

.card {

  width: min(800px, 95vw);

  padding: 40px;

  border-radius: 24px;

  background: rgba(255, 255, 255, 0.04);

  border: 1px solid rgba(255, 255, 255, 0.08);

  backdrop-filter: blur(10px);
}

.card h2 {

  margin-bottom: 20px;

  letter-spacing: 2px;

  font-size: 14px;

  color: #a68a56;
}

.card p {

  line-height: 1.9;

  font-size: 1.1rem;

  color: #f5f0e8;
}
</style>