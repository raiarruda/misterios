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

      <div v-if="!desbloqueado" class="unlock-card">

        <div class="seal">
          ARQUIVO CLASSIFICADO
        </div>

        <h1>
          Um novo mistério foi localizado
        </h1>

        <p class="subtitle">
          Digite a chave encontrada na raspadinha para acessar o conteúdo.
        </p>

        <div class="input-area">

          <input v-model="senha" class="password-input" @keyup.enter="desbloquear" placeholder="Digite a chave" />

          <Transition name="fade">

            <p v-if="erroSenha" class="error">
              Chave inválida.
            </p>

          </Transition>

          <button class="unlock-button" @click="desbloquear">
            DESBLOQUEAR
          </button>

        </div>

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

.unlock-card {
  width: min(700px, 90vw);
  margin: 80px auto;
  padding: 48px;
  border-radius: 20px;
  background:
    rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(10px);
  text-align: center;
}

.seal {

  display: inline-block;
  margin-bottom: 24px;
  padding: 8px 18px;
  border-radius: 999px;
  background: #5b1017;
  color: #f1e7d8;
  letter-spacing: 3px;
  font-size: 12px;
  font-weight: bold;
}

.subtitle {
  opacity: 0.8;
  margin-bottom: 32px;
}

.password-input {
  width: 100%;
  max-width: 420px;
  padding: 16px;
  border-radius: 12px;
  border: 1px solid #5b1017;
  background: rgba(0, 0, 0, 0.25);
  color: white;
  font-size: 18px;
  text-align: center;
  outline: none;
}

.password-input:focus {

  border-color: #a68a56;

  box-shadow:
    0 0 0 2px rgba(166, 138, 86, .25);
}

.unlock-button {

  margin-top: 24px;
  padding: 16px 28px;
  border: none;
  border-radius: 12px;
  background: #5b1017;
  color: white;
  font-weight: bold;
  letter-spacing: 1px;
  cursor: pointer;
}

.unlock-button:hover {

  transform: translateY(-1px);
}

.error {

  color: #ff8b8b;

  font-size: 14px;

  font-weight: 500;

  min-height: 20px;
}

.input-area {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;

  margin-top: 32px;
}

.fade-enter-active,
.fade-leave-active {
  transition: all .2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}
</style>