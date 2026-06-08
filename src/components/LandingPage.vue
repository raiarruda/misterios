<template>

  <div class="landing">

    <div class="hero">

      <h1>15 mistérios.</h1>

      <h1>15 encontros.</h1>

      <h1>1 pessoa autorizada.</h1>

      <div class="divider"></div>

      <p class="intro">
        Este site guarda uma coleção de experiências
        preparadas especialmente para você.
      </p>

      <p class="intro">
        Cada raspadinha revela apenas uma delas.
      </p>

      <div class="steps">

        <div>1. Obtenha uma raspadinha.</div>

        <div>2. Escaneie o QR Code.</div>

        <div>3. Informe a chave encontrada.</div>

        <div>4. Aguarde os próximos acontecimentos.</div>

      </div>

      <p class="footer">
        Nenhum suporte técnico será fornecido.
      </p>

      <p class="footer small">
        Exceto talvez alguns abraços.
      </p>

    </div>

  </div>

</template>

<style scoped>
.landing {

  min-height: 100vh;

  display: flex;

  justify-content: center;

  align-items: center;

  padding: 40px;
}

.hero {

  max-width: 900px;

  text-align: center;
}

.hero h1 {

  margin: 0;

  font-size: clamp(2.5rem, 7vw, 5rem);

  line-height: 1.1;

  color: #f5f0e8;
}

.divider {

  width: 120px;

  height: 2px;

  margin: 40px auto;

  background: #8d0d18;
}

.intro {

  font-size: 1.2rem;

  line-height: 1.8;

  color: rgba(245, 240, 232, .85);
}

.steps {

  margin-top: 48px;

  display: flex;

  flex-direction: column;

  gap: 12px;

  color: #a68a56;

  letter-spacing: 1px;
}

.footer {

  margin-top: 48px;

  font-style: italic;

  color: rgba(245, 240, 232, .7);
}

.small {

  margin-top: 8px;

  font-size: .9rem;
}
</style>