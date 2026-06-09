<script setup>
import { ref, computed, onMounted } from "vue"; // Corrigido: onMounted importado
import misterios from "../data/misterios-master";
import MisterioCard from "../components/MisterioCard.vue";
import { obterTodosProgressos } from "../services/progressoService";

const progressos = ref([]);
const carregando = ref(true); // Evita o flicker na contagem dos badges

onMounted(async () => {
  progressos.value = await obterTodosProgressos() || [];
  carregando.value = false;
});

// Transforma o objeto de mistérios em uma lista ordenada
const lista = computed(() => {
  return Object.entries(misterios)
    .map(([id, misterio]) => ({
      id,
      ...misterio
    }))
    .sort((a, b) => a.ordem - b.ordem);
});

// Contadores baseados no array de progresso
const descobertos = computed(() =>
  progressos.value.filter(x => x.status === "DESCOBERTO").length
);

const concluidos = computed(() =>
  progressos.value.filter(x => x.status === "CONCLUIDO").length
);

// Corrigido: total de mistérios que saíram do status 'OCULTO' (descobertos + concluídos)
const totalDesbloqueados = computed(() => progressos.value.length);

// Corrigido: Calcula o percentual baseado em tudo que não está oculto
const percentual = computed(() => {
  if (lista.value.length === 0) return 0;
  return (totalDesbloqueados.value / lista.value.length) * 100;
});

// Retorna o status atual do mistério para passar ao Card
function obterStatus(codigo) {
  const progresso = progressos.value.find(p => p.codigo === codigo);
  return progresso ? progresso.status : "OCULTO";
}
</script>

<template>
  <div class="page">
    <h1>Coleção de Mistérios</h1>

    <!-- Exibe um esqueleto simples ou esconde enquanto carrega do Supabase -->
    <div v-if="carregando" class="loading-state">
      Carregando sua coleção...
    </div>

    <template v-else>
      <div class="resumo">
        <!-- Ocultos: Total na lista menos os registros existentes no banco -->
        <div class="badge" title="Mistérios Ocultos">
          🔒 {{ lista.length - totalDesbloqueados }}
        </div>

        <div class="badge" title="Mistérios Descobertos">
          🟥 {{ descobertos }}
        </div>

        <div class="badge" title="Mistérios Concluídos">
          ✅ {{ concluidos }}
        </div>
      </div>

      <div class="progress">
        <div class="progress-fill" :style="{ width: `${percentual}%` }" />
      </div>

      <p class="subtitle">
        {{ totalDesbloqueados }} de {{ lista.length }} desbloqueados
      </p>

      <div class="grid">
        <!-- Corrigido: Enviando a função de status correta para o card determinar a borda/opacidade -->
        <MisterioCard v-for="misterio in lista" :key="misterio.codigo" :misterio="misterio"
          :status="obterStatus(misterio.codigo)" />
      </div>
    </template>
  </div>
</template>

<style scoped>
/* Adicionado estilo para centralizar o resumo que estava faltando */
.resumo {
  display: flex;
  justify-content: center;
  gap: 16px;
  margin-bottom: 24px;
}

.badge {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 8px 16px;
  border-radius: 12px;
  font-weight: bold;
}

.progress {
  width: 300px;
  max-width: 90vw;
  height: 10px;
  margin: 0 auto 20px;
  border-radius: 999px;
  overflow: hidden;
  background: rgba(255, 255, 255, .08);
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #5b1017, #8d1c2c);
  transition: .3s;
}

.page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 60px 24px;
}

h1 {
  text-align: center;
  margin-bottom: 24px;
}

.subtitle {
  text-align: center;
  opacity: .7;
  margin-bottom: 48px;
}

.grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 20px;
  margin-top: 40px;
}

.loading-state {
  text-align: center;
  color: #c7b299;
  font-style: italic;
  margin: 40px 0;
}


@media (max-width: 768px) {
  .grid {
    grid-template-columns: repeat(3, 1fr) !important;
    /* Força 3 colunas */
    grid-auto-rows: minmax(100px, auto) !important;
    /* Linhas adaptáveis */
    gap: 8px !important;
    /* Espaço ideal para telas menores */
    margin-top: 24px;
  }
}
</style>
