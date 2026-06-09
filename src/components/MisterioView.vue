<script setup>


import { RouterLink } from "vue-router";
import { concluirMisterio, verificarConclusao } from "../services/progressoService";
import { ref, onMounted } from "vue";

const concluido = ref(false);
const carregando = ref(true); // Começa como true para evitar o flicker

const props = defineProps({
  misterio: {
    type: Object,
    required: true
  }
});

onMounted(async () => {
  if (props.misterio?.codigo) {
    concluido.value = await verificarConclusao(props.misterio.codigo);
  }
  carregando.value = false; // Libera a renderização após a resposta do banco
});

async function marcarConcluido() {
  carregando.value = true; // Opcional: desabilita interações durante o clique
  const sucesso = await concluirMisterio(props.misterio.codigo);
  if (sucesso) {
    concluido.value = true;
  }
  carregando.value = false;
}

</script>

<template>
  <div v-if="props.misterio" class="misterio-page">
    <RouterLink to="/colecao" class="back-link">
      ← Voltar para coleção
    </RouterLink>

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

    <!-- Estado de carregamento: esconde os botões e evita o delay visual -->
    <div v-if="carregando" class="loading-box">
      <span>Carregando status...</span>
    </div>

    <!-- Só renderiza as ações quando o loading terminar -->
    <template v-else>
      <div v-if="!concluido" class="acoes">
        <button class="concluir-btn" @click="marcarConcluido">
          ✅ Marcar como concluído
        </button>
      </div>

      <div v-else class="concluido-box">
        <h3>
          ✅ Experiência concluída
        </h3>
        <p>
          Este mistério já foi realizado.
        </p>
      </div>
    </template>
  </div>
</template>

<style scoped>
.acoes {

  margin-top: 32px;

  display: flex;

  justify-content: center;
}

.concluir-btn {

  padding: 16px 28px;

  border: none;

  border-radius: 12px;

  background: #2f6b42;

  color: white;

  font-size: 1rem;

  font-weight: bold;

  cursor: pointer;

  transition: .2s;
}

.concluir-btn:hover {

  background: #3f8a55;

  transform: translateY(-2px);
}

.concluido-box {

  margin-top: 32px;

  padding: 24px;

  border-radius: 16px;

  text-align: center;

  background:
    rgba(47, 107, 66, .15);

  border:
    1px solid rgba(63, 138, 85, .4);
}

.concluido-box h3 {

  margin-bottom: 12px;

  color: #7fd69c;
}

.concluido-box p {

  margin: 0;

  opacity: .85;
}

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

.back-link {

  align-self: flex-start;

  margin-bottom: 24px;

  color: #c7b299;

  text-decoration: none;
}

.back-link:hover {

  color: #f1e7d8;
}
</style>