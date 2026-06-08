<script setup>
defineProps({
  misterio: Object
})
</script>

<template>

  <div class="misterio">

    <div class="cabecalho">

      <h1>
        {{ misterio.titulo }}
      </h1>

      <p class="frase">
        {{ misterio.frase }}
      </p>

    </div>

    <div class="conteudo">

      <p>
        {{ misterio.descricao }}
      </p>

    </div>

  </div>

</template>

<style scoped>
.misterio {
  max-width: 900px;

  margin: auto;

  padding: 40px;
}

.cabecalho {

  text-align: center;

  border: 1px solid #3d3d3d;

  background:
    rgba(255, 255, 255, 0.03);

  border-radius: 16px;

  padding: 40px;
}

.codigo {

  color: #a68a56;

  letter-spacing: 4px;

  font-size: 14px;
}

h1 {

  margin-top: 16px;

  font-family:
    "Cinzel",
    serif;

  color: #d4c3a0;
}

.frase {

  font-style: italic;

  font-size: 1.3rem;

  color: #d6d0c8;
}

.conteudo {

  margin-top: 24px;

  border-left: 4px solid #5b1017;

  padding-left: 24px;

  line-height: 1.8;
}
</style>