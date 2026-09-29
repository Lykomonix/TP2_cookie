<script setup>
import ShopItem from './ShopItem.vue'
import { buildings } from '../data/buildings'
import { useGame } from '../composables/useGame'

const { buy, owned, costOf, isUnlocked, canAfford } = useGame()
</script>

<template>
  <aside class="shop">
    <h2>Bakery Shop</h2>
    <p class="shop_intro">Hire helpers and upgrade equipment to boost production!</p>

    <ul class="shop_list">
      <li v-for="b in buildings" :key="b.id">
        <ShopItem
          :building="b"
          :owned="owned(b)"
          :cost="costOf(b)"
          :unlocked="isUnlocked(b)"
          :affordable="canAfford(b)"
          @buy="buy(b)"
        />
      </li>
    </ul>
  </aside>
</template>

<style scoped>
.shop { 
  padding: 1.5rem 1.25rem; 
}

h2 { 
  font-family: 'Sigmar', 
  cursive; 
  font-weight: 400; 
  font-size: 1.5rem; 
}

.shop_intro { 
  margin: .25rem 0 1rem;
  font-size: .8rem; 
}

.shop_list { 
  list-style: none; 
  padding: 0; 
  display: flex; 
  flex-direction: column; 
  gap: .75rem; 
}
</style>