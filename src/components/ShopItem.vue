<script setup>
import { formatNumber } from '../composables/useGame'

defineProps({
  building: { type: Object, required: true },
  owned: { type: Number, default: 0 },
  cost: { type: Number, required: true },
  unlocked: { type: Boolean, default: true },
  affordable: { type: Boolean, default: false },
})
defineEmits(['buy'])
</script>

<template>
  <article class="item" :class="{ 'item--locked': !unlocked, 'item--poor': unlocked && !affordable }">
    <span class="item_icon" aria-hidden="true">{{ building.icon }}</span>

    <div class="item_body">
      <h3>
        {{ building.name }}
        <span v-if="owned > 0" class="item_owned">x{{ owned }}</span>
      </h3>
      <p class="item_desc">{{ building.description }}</p>
      <p class="item_cost">🍪 {{ formatNumber(cost) }} cookies</p>
    </div>

    <button class="item_buy" :disabled="!unlocked || !affordable" @click="$emit('buy')">
      {{ unlocked ? 'BUY' : 'Locked' }}
    </button>
  </article>
</template>

<style scoped>
.item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.7rem;
  border-radius: 14px;
  background: var(--cream-dark);
  border: 1px solid #fde68a;
}

.item_icon {
  flex: none;
  display: grid;
  place-items: center;
  width: 2.75rem;
  height: 2.75rem;
  border-radius: 12px;
  background: var(--orange);
  font-size: 1.4rem;
}

.item_body {
  flex: 1;
  min-width: 0;
}

h3 {
  font-size: 0.9rem;
  font-weight: 800;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
}

.item_owned {
  padding: 0 0.5rem;
  border-radius: 999px;
  background: var(--pink);
  color: #fff;
  font-size: 0.65rem;
}

.item_desc {
  font-size: 0.68rem;
}

.item_cost {
  font-size: 0.72rem;
  font-weight: 800;
  color: var(--orange);
}

.item_buy {
  flex: none;
  padding: 0.45rem 0.9rem;
  border-radius: 999px;
  background: var(--pink);
  color: #fff;
  font-size: 0.72rem;
  font-weight: 800;
  transition: transform 0.1s;
}

.item_buy:not(:disabled):active {
  transform: scale(0.94);
}

.item_buy:disabled {
  background: #e7e5e4;
  color: var(--muted);
  cursor: not-allowed;
}

.item--poor {
  opacity: 0.75;
}

.item--locked {
  opacity: 0.5;
  background: #f5f5f4;
  border-color: #e7e5e4;
  filter: grayscale(1);
}
</style>