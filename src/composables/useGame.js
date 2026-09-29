import { reactive, computed } from 'vue'
import { buildings } from '../data/buildings'

const SAVE_KEY = 'cookie-clicker-save'
const COST_MULTIPLIER = 1.15
const COOKIES_PER_CLICK = 1

function load() {
  try { return JSON.parse(localStorage.getItem(SAVE_KEY)) || {} } catch { return {} }
}

const state = reactive({
  cookies: 0,
  totalBaked: 0,
  totalClicks: 0,
  playtime: 0,
  owned: {},
  ...load(),
})

const cps = computed(() =>
  buildings.reduce((sum, b) => {
    const qty = state.owned[b.id] || 0
    const perSecond = b.type === 'CPS' ? b.cps : COOKIES_PER_CLICK / b.interval
    return sum + qty * perSecond
  }, 0)
)

function addCookies(n) {
  state.cookies += n
  state.totalBaked += n
}

function click() {
  addCookies(COOKIES_PER_CLICK)
  state.totalClicks++
  return COOKIES_PER_CLICK
}

const owned = (b) => state.owned[b.id] || 0
const costOf = (b) => Math.ceil(b.baseCost * COST_MULTIPLIER ** owned(b))
const isUnlocked = (b) => state.totalBaked >= b.unlockAt
const canAfford = (b) => state.cookies >= costOf(b)

function buy(b) {
  if (!isUnlocked(b) || !canAfford(b)) return
  state.cookies -= costOf(b)
  state.owned[b.id] = owned(b) + 1
}

let last = Date.now()
let lastSave = last
setInterval(() => {
  const now = Date.now()
  const dt = (now - last) / 1000
  last = now
  addCookies(cps.value * dt)
  state.playtime += dt
  if (now - lastSave > 1000) {
    lastSave = now
    localStorage.setItem(SAVE_KEY, JSON.stringify(state))
  }
}, 100)

export function useGame() {
  return { state, cps, click, buy, owned, costOf, isUnlocked, canAfford }
}

export const formatNumber = (n) => Math.floor(n).toLocaleString('en-US')
export function formatPlaytime(seconds) {
  const h = String(Math.floor(seconds / 3600)).padStart(2, '0')
  const m = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0')
  return `${h}h ${m}m`
}