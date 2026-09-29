<script setup>
import { ref } from 'vue'
import { useGame, formatNumber, formatPlaytime } from '../composables/useGame'

const { state, cps, click } = useGame()

const floaters = ref([])
let nextId = 0

function onCookieClick(e) {
  const gained = click()
  const rect = e.currentTarget.getBoundingClientRect()
  const id = nextId++
  floaters.value.push({
    id,
    text: `+${gained}`,
    x: e.clientX - rect.left + (Math.random() * 40 - 20),
    y: e.clientY - rect.top - 10,
  })
  setTimeout(() => (floaters.value = floaters.value.filter((f) => f.id !== id)), 900)
}
</script>

<template>
  <main class="clicker">
    <header class="clicker_title">
      <span class="logo">🍪</span>
      <div>
        <h1>Cookie Clicker</h1>
        <p>Bakery edition</p>
      </div>
    </header>

    <section class="clicker_score" aria-live="polite">
      <div class="count"><span aria-hidden="true">🍪</span>{{ formatNumber(state.cookies) }}</div>
      <p class="cps">producing <strong>{{ cps.toFixed(1) }}</strong> cookies per second</p>
    </section>

    <section class="clicker_stage">
      <button class="plate" aria-label="Bake a cookie" @click="onCookieClick">
        <span class="plate_inner"><span class="cookie">🍪</span></span>
        <span v-for="f in floaters" :key="f.id" class="floater" :style="{ left: f.x + 'px', top: f.y + 'px' }">
          {{ f.text }}
        </span>
      </button>
    </section>

    <footer class="clicker_stats">
      <span class="chip">🏆 Total baked: <b>{{ formatNumber(state.totalBaked) }}</b></span>
      <span class="chip">👆 Total clicks: <b>{{ formatNumber(state.totalClicks) }}</b></span>
      <span class="chip">⏱️ Playtime: <b>{{ formatPlaytime(state.playtime) }}</b></span>
    </footer>
  </main>
</template>

<style scoped>
.clicker {
  box-sizing: border-box;
  height: 100%;
  min-height: 0;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  padding: 1rem 2rem;
  gap: 1.5rem;
}

.clicker_title {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.logo {
  display: grid;
  place-items: center;
  width: 2.75rem;
  height: 2.75rem;
  border-radius: 50%;
  background: var(--orange);
  font-size: 1.5rem;
}

h1 {
  font-family: 'Sigmar', cursive;
  font-weight: 400;
  font-size: 1.9rem;
  line-height: 1;
}

.clicker_title p {
  font-size: 0.7rem;
  font-weight: 800;
  color: var(--pink);
}

.clicker_score {
  text-align: center;
}

.count {
  font-family: 'Sigmar', cursive;
  font-size: clamp(2.5rem, 7vw, 4rem);
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.75rem;
}

.count span {
  font-size: 2rem;
}

.cps {
  display: inline-block;
  margin-top: 0.25rem;
  padding: 0.2rem 1rem;
  border-radius: 999px;
  background: var(--cream-dark);
  font-size: 0.85rem;
  font-weight: 600;
}

.cps strong {
  color: var(--pink);
}

.clicker_stage {
  flex: 1;
  display: grid;
  place-items: center;
  min-height: 0;
}

.plate {
  position: relative;
  width: min(340px, 80vw);
  aspect-ratio: 1;
  border-radius: 50%;
  background: #f5f0e8;
  box-shadow: 0 18px 30px rgba(120, 80, 20, 0.25);
  display: grid;
  place-items: center;
  transition: transform 0.08s;
}

.plate:active {
  transform: scale(0.95);
}

.plate_inner {
  width: 62%;
  aspect-ratio: 1;
  border-radius: 50%;
  background: #fff;
  box-shadow: inset 0 2px 8px rgba(0, 0, 0, 0.12);
  display: grid;
  place-items: center;
}

.cookie {
  font-size: 7rem;
  line-height: 1;
  user-select: none;
}

.floater {
  position: absolute;
  pointer-events: none;
  font-weight: 800;
  font-size: 1.5rem;
  color: var(--pink);
  animation: rise 0.9s ease-out forwards;
}

@keyframes rise {
  to {
    transform: translateY(-70px);
    opacity: 0;
  }
}

.clicker_stats {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.75rem;
}

.chip {
  padding: 0.35rem 0.9rem;
  border-radius: 999px;
  background: var(--cream-dark);
  border: 1px solid #fde68a;
  font-size: 0.8rem;
}
</style>