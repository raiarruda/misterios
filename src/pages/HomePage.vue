<script setup>
import { computed, ref, watch, onMounted } from "vue";
import { useRoute } from "vue-router";
import CryptoJS from "crypto-js";
import MisterioView from "../components/MisterioView.vue";
import misteriosEncrypted from "../data/misterios-encrypted";
import { CRYPTO_KEY } from "../config/security";
import LandingPage from "../components/LandingPage.vue";
import UnlockPage from "../components/UnlockPage.vue";

import {
  registrarDescoberta,
  obterProgressoPorCodigo
} from "../services/progressoService";


const route = useRoute();
const carregando = ref(true);
const desbloqueado = ref(false);

const id = computed(() => route.query.id);


const misterio = computed(() => {

  if (!id.value) {
    return null;
  }

  const encrypted =
    misteriosEncrypted[id.value];

  if (!encrypted) {
    return null;
  }

  try {

    const bytes =
      CryptoJS.AES.decrypt(
        encrypted,
        CRYPTO_KEY
      );

    return JSON.parse(
      bytes.toString(
        CryptoJS.enc.Utf8
      )
    );

  } catch {

    return null;

  }

});

watch(
  misterio,
  async (novoMisterio) => {

    if (!novoMisterio) {

      desbloqueado.value = false;
      carregando.value = false;

      return;
    }

    carregando.value = true;

    const progresso =
      await obterProgressoPorCodigo(
        novoMisterio.codigo
      );

    desbloqueado.value =
      progresso !== null;

    carregando.value = false;

  },
  {
    immediate: true
  }
);
async function desbloquear() {

  await registrarDescoberta(
    misterio.value.codigo
  );

  desbloqueado.value = true;

}
</script>



<template>

  <div>

    <LandingPage v-if="!id" />


    <div v-else-if="!misterio">
      <h2>Mistério não encontrado</h2>
    </div>
    <div v-else-if="carregando" class="loading">
    </div>

    <UnlockPage v-else-if="!desbloqueado" :misterio="misterio" @desbloqueado="desbloquear" />
    <MisterioView v-else :misterio="misterio" />

  </div>
</template>


<style scoped>
.loading {

  min-height: 50vh;
}
</style>