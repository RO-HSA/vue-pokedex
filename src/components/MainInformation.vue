<script setup>
import PokeTypes from './PokeTypes.vue'

import capitalize from '@/utils/capitalize'

const props = defineProps(['pokemon'])

const sprites = Object.values(props.pokemon.sprites).filter((img) => typeof img === 'string')
</script>

<template>
  <div class="info-wrapper d-flex flex-column">
    <p class="poke-id">#{{ props.pokemon.id.toString().padStart(3, '0') }}</p>
    <h2 class="poke-name">{{ capitalize(props.pokemon.name) }}</h2>
    <div class="d-flex gap-2">
      <PokeTypes v-for="type in props.pokemon.types" :key="type" :class="type" :type="type" />
    </div>
    <div class="d-flex flex-wrap justify-content-center">
      <img v-for="sprite in sprites" :key="sprite" :src="sprite" />
    </div>
  </div>
</template>

<style scoped>
.info-wrapper {
  font-family: 'Roboto', sans-serif;
}

.poke-id {
  font-size: 14px;
  color: var(--grey);
  margin-bottom: 0;
}
</style>
