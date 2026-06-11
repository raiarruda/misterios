<script setup>
import { computed, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import CryptoJS from "crypto-js";
import MisterioView from "../components/MisterioView.vue";
import misteriosEncrypted from "../data/misterios-encrypted";
import { CRYPTO_KEY } from "../config/security";
import LandingPage from "../components/LandingPage.vue";
import UnlockPage from "../components/UnlockPage.vue";

import {
  registrarDescoberta,
  obterProgressoPorCodigo,
  obterTodosProgressos,
} from "../services/progressoService";

import misteriosMaster from "../data/misterios-master";

const route = useRoute();
const router = useRouter();
const carregando = ref(true);
const desbloqueado = ref(false);
const descobertoAtivo = ref(null); // { codigo, ordem, id } do card DESCOBERTO bloqueando

const id = computed(() => route.query.id);

const misterio = computed(() => {
  if (!id.value) return null;

  const encrypted = misteriosEncrypted[id.value];
  if (!encrypted) return null;

  try {
    const bytes = CryptoJS.AES.decrypt(encrypted, CRYPTO_KEY);
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  } catch {
    return null;
  }
});

watch(
  misterio,
  async (novoMisterio) => {
    descobertoAtivo.value = null;

    if (!novoMisterio) {
      desbloqueado.value = false;
      carregando.value = false;
      return;
    }

    carregando.value = true;

    const progresso = await obterProgressoPorCodigo(novoMisterio.codigo);

    if (progresso !== null) {
      // Já descoberto ou concluído — mostrar MisterioView normalmente
      desbloqueado.value = true;
    } else {
      // Ainda bloqueado — verificar se há outro DESCOBERTO ativo
      const todos = await obterTodosProgressos();
      const outroDescoberto = todos.find((p) => p.status === "DESCOBERTO");

      if (outroDescoberto) {
        // Encontrar o id (chave) do mistério descoberto para montar o link
        const idDescoberto = Object.entries(misteriosMaster).find(
          ([, m]) => m.codigo === outroDescoberto.codigo
        )?.[0];

        const ordemDescoberto =
          misteriosMaster[idDescoberto]?.ordem ?? "?";

        descobertoAtivo.value = {
          codigo: outroDescoberto.codigo,
          ordem: ordemDescoberto,
          id: idDescoberto,
        };
      }

      desbloqueado.value = false;
    }

    carregando.value = false;
  },
  { immediate: true }
);

async function desbloquear() {
  await registrarDescoberta(misterio.value.codigo);
  desbloqueado.value = true;
}

function irParaDescoberto() {
  if (descobertoAtivo.value?.id) {
    router.push({ path: "/", query: { id: descobertoAtivo.value.id } });
  }
}
</script>



<template>
  <div>
    <LandingPage v-if="!id" />

    <div v-else-if="!misterio">
      <h2>Mistério não encontrado</h2>
    </div>

    <div v-else-if="carregando" class="loading"></div>

    <!-- Bloqueado: já há um card DESCOBERTO ativo -->
    <div v-else-if="!desbloqueado && descobertoAtivo" class="bloqueio-wrapper">
      <div class="bloqueio-card">
        <div class="bloqueio-icone">🔒</div>
        <h2 class="bloqueio-titulo">Mistério bloqueado</h2>
        <p class="bloqueio-mensagem">
          Você ainda tem um mistério descoberto.<br />
          Complete o
          <strong>Mistério #{{ descobertoAtivo.ordem }}</strong>
          antes de descobrir outro.
        </p>
        <button class="bloqueio-btn" @click="irParaDescoberto">
          Ir para o Mistério #{{ descobertoAtivo.ordem }}
        </button>
      </div>
    </div>

    <UnlockPage
      v-else-if="!desbloqueado"
      :misterio="misterio"
      @desbloqueado="desbloquear"
    />

    <MisterioView v-else :misterio="misterio" />
  </div>
</template>


<style scoped>
.loading {
  min-height: 50vh;
}

.bloqueio-wrapper {
  min-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.bloqueio-card {
  background: rgba(91, 16, 23, 0.18);
  border: 1px solid rgba(166, 138, 86, 0.35);
  border-radius: 12px;
  padding: 3rem 2.5rem;
  max-width: 480px;
  width: 100%;
  text-align: center;
  backdrop-filter: blur(8px);
}

.bloqueio-icone {
  font-size: 3rem;
  margin-bottom: 1.25rem;
}

.bloqueio-titulo {
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.75rem;
  font-weight: 600;
  color: var(--cor-dourado, #a68a56);
  margin-bottom: 1rem;
  letter-spacing: 0.04em;
}

.bloqueio-mensagem {
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.15rem;
  color: rgba(255, 255, 255, 0.82);
  line-height: 1.7;
  margin-bottom: 2rem;
}

.bloqueio-btn {
  background: transparent;
  border: 1px solid var(--cor-dourado, #a68a56);
  color: var(--cor-dourado, #a68a56);
  font-family: 'Cormorant Garamond', serif;
  font-size: 1rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  padding: 0.75rem 2rem;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
}

.bloqueio-btn:hover {
  background: var(--cor-dourado, #a68a56);
  color: #1a0a0c;
}
</style>