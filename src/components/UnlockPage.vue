<script setup>
import { ref, watch } from "vue";

const props = defineProps({
  misterio: {
    type: Object,
    required: true
  }
});

const emit = defineEmits([
  "desbloqueado"
]);

const senha = ref("");
const erroSenha = ref(false);

watch(senha, () => {
  erroSenha.value = false;
});

function validar() {

  if (
    senha.value.trim().toUpperCase() !==
    props.misterio.senha.toUpperCase()
  ) {

    erroSenha.value = true;

    senha.value = "";

    return;
  }

  emit("desbloqueado");
}
</script>

<template>

  <div class="unlock">

    <div class="unlock-card">
      <div class="seal">
        MISTÉRIO LOCALIZADO
      </div>

      <h1>
        Uma nova experiência foi encontrada
      </h1>

      <p class="subtitle">
        Digite a chave revelada na raspadinha.
      </p>

      <div class="input-area">

        <input autofocus v-model="senha" class="password-input" placeholder="Chave de acesso" @keyup.enter="validar" />
        <Transition name="fade">

          <p v-if="erroSenha" class="error">
            A chave informada não corresponde a este mistério.
          </p>

        </Transition>

        <button class="unlock-button" @click="validar">
          DESBLOQUEAR
        </button>

      </div>
    </div>
  </div>

</template>

<style scoped>
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

.unlock {

  min-height: 100vh;

  display: flex;

  justify-content: center;

  align-items: center;

  padding: 40px;
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

.unlock-card {

  width: min(650px, 90vw);

  padding: 48px;

  border-radius: 24px;

  text-align: center;

  background: rgba(255, 255, 255, .03);

  border: 1px solid rgba(255, 255, 255, .08);

  backdrop-filter: blur(10px);
}



button {
  background: #5b1017;
  color: white;
  border: none;
  padding: 14px 24px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
}





.subtitle {
  opacity: 0.8;
  margin-bottom: 32px;
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