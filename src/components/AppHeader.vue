<script setup>
import { RouterLink } from "vue-router";
</script>

<template>

  <header class="app-header">

    <RouterLink to="/" class="logo">
      15 Mistérios
    </RouterLink>

    <nav>

      <RouterLink to="/colecao" class="menu-link">
        Coleção
      </RouterLink>

    </nav>

  </header>

</template>

<style scoped>
.app-header {

  display: flex;

  justify-content: space-between;

  align-items: center;

  padding: 20px 40px;

  border-bottom:
    1px solid rgba(91, 16, 23, .3);
}

.logo {

  color: #f1e7d8;

  text-decoration: none;

  font-size: 1.2rem;

  font-weight: bold;
}

.menu-link {

  color: #c7b299;

  text-decoration: none;
}

.menu-link:hover {

  color: #f1e7d8;
}

@media (max-width: 768px) {

  .app-header {

    padding: 16px;
  }

}
</style>