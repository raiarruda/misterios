<script setup>
import { computed, ref, watch } from "vue";
import { useRoute } from "vue-router";
import CryptoJS from "crypto-js";
import MisterioView from "../components/MisterioView.vue";
import misteriosEncrypted from "../data/misterios-encrypted";
import { CRYPTO_KEY } from "../config/security";
import LandingPage from "../components/LandingPage.vue";
import UnlockPage from "../components/UnlockPage.vue";


const route = useRoute();


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

const desbloqueado = ref(false);

watch(
  id,
  (novoId) => {

    const item =
      localStorage.getItem(
        `mist-${novoId}`
      );

    desbloqueado.value =
      !!item;

  },
  {
    immediate: true
  }
);


function desbloquear() {


  desbloqueado.value = true;

  localStorage.setItem(
    `mist-${id.value}`,
    JSON.stringify({
      abertoEm: new Date().toISOString()
    })
  );
}
</script>



<template>


  <RouterLink to="/colecao" class="collection-link">
    Ver coleção completa
  </RouterLink>
  <div>

    <LandingPage v-if="!id" />


    <div v-else-if="!misterio">
      <h2>Mistério não encontrado</h2>
    </div>

    <UnlockPage v-else-if="!desbloqueado" :misterio="misterio" @desbloqueado="desbloquear" />
    <MisterioView v-else :misterio="misterio" />

  </div>
</template>


<style scoped></style>