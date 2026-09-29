<script setup>
import ClickerPanel from '../components/ClickerPanel.vue'
import ShopPanel from '../components/ShopPanel.vue'
</script>

<template>
  <div class="home">
    <ClickerPanel class="home_clicker" />
    <ShopPanel class="home_shop" />
  </div>
</template>

<style scoped>
.home { 
  display: grid; 
  grid-template-columns: 1fr 340px; 
  min-height: 100vh; 
}

.home_shop { 
  background: #fffdf8; 
  border-left: 1px solid var(--cream-dark); 
}

@media (max-width: 800px) {
  .home { grid-template-columns: 1fr; }
  .home_shop { border-left: 0; border-top: 1px solid var(--cream-dark); }
}
</style>