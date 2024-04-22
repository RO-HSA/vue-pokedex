<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'
import axios from 'axios'

import capitalize from '@/utils/capitalize'

const props = defineProps(['pokemon'])
const store = useStore()

const chain = await axios.get(props.pokemon.evolution_chain)
let evolutions = []
const basePokemon = chain.data.chain.species.name
evolutions.push(basePokemon)
chain.data.chain.evolves_to.forEach((evolution) => {
  evolutions.push(evolution.species.name)
  evolution.evolves_to.forEach((evolution) => {
    evolutions.push(evolution.species.name)
  })
})

evolutions = evolutions.filter((evolution) => evolution !== props.pokemon.name)

const allPokemons = computed(() => store.state.pokemons)

const evolutionsSprites = evolutions.map((evolution) => {
  const pokemon = allPokemons.value.find((poke) => poke.name === evolution)
  return pokemon.sprites.front_default
})
</script>

<template>
  <div v-if="evolutions.length > 0">
    <h3 class="border-bottom pb-2">{{ $t('modal.evolutions') }}</h3>
    <div class="d-flex flex-wrap gap-1">
      <div
        class="d-flex flex-column align-items-center"
        v-for="(name, index) in evolutions"
        :key="index"
      >
        <img :src="evolutionsSprites[index]" alt="" />
        <p>{{ capitalize(name) }}</p>
      </div>
    </div>
  </div>
</template>
