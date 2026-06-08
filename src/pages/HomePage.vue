<script setup>
import { computed, ref, watch } from "vue";
import { useRoute } from "vue-router";
import CryptoJS from "crypto-js";
import MisterioView from "../components/MisterioView.vue";
import misteriosEncrypted from "../data/misterios-encrypted";
import { CRYPTO_KEY } from "../config/security";
import ids from "../data/ids";

const senha = ref("");
const erroSenha = ref(false);

const route = useRoute();

const codigo = computed(() => {

  const id = route.query.id;

  if (!id) {
    return null;
  }

  return ids[id];

});;

const misterio = computed(() => {
  if (
    !codigo.value ||
    !misteriosEncrypted[codigo.value]
  ) {
    return null;
  }

  try {
    const bytes = CryptoJS.AES.decrypt(
      misteriosEncrypted[codigo.value],
      CRYPTO_KEY
    );

    return JSON.parse(
      bytes.toString(CryptoJS.enc.Utf8)
    );
  } catch (error) {
    console.error(error);
    return null;
  }
});

const desbloqueado = ref(false);

watch(
  codigo,
  (novoCodigo) => {
    const item = localStorage.getItem(`mist-${novoCodigo}`);
    desbloqueado.value = item === "true" || !!item;
  },
  {
    immediate: true,
  }
);

function desbloquear() {

  if (
    senha.value.trim().toUpperCase() !== misterio.value.senha.toUpperCase()
  ) {
    erroSenha.value = true;
    return;
  }

  erroSenha.value = false;

  desbloqueado.value = true;

  localStorage.setItem(
    `mist-${codigo.value}`,
    JSON.stringify({
      abertoEm: new Date().toISOString()
    })
  );
}
</script>



<template>
  <div>


    <div v-if="!misterio">
      <h2>Mistério não encontrado</h2>
    </div>

    <template v-else>

      <div v-if="!desbloqueado">

        <h1>
          🦇 Arquivo Encontrado
        </h1>

        <p>
          Código identificado:
          <strong>
            {{ misterio.codigo }}
          </strong>
        </p>

        <p>
          Um novo mistério aguarda desbloqueio.
        </p>
        <p>
          Digite a chave encontrada na raspadinha.
        </p>

        <input v-model="senha" placeholder="Digite a chave" />

        <p v-if="erroSenha">
          Chave inválida.
        </p>

        <button @click="desbloquear">
          DESBLOQUEAR MISTÉRIO
        </button>
      </div>

      <MisterioView v-else :misterio="misterio" />

    </template>


  </div>
</template>


<style scoped>
button {

  background: #5b1017;

  color: white;

  border: none;

  padding: 14px 24px;

  border-radius: 8px;

  cursor: pointer;

  font-weight: bold;
}
</style>