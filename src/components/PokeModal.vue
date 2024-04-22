<script setup>
import { computed, watch, ref } from 'vue'
import { useStore } from 'vuex'

import MainInformation from './MainInformation.vue'
import ListInformation from './ListInformation.vue'
import PokeEvolutions from './PokeEvolutions.vue'

const store = useStore()

const modalIsOpen = computed(() => store.state.modalIsOpen)
const pokemon = computed(() => store.state.selectedPokemon)
const moves = computed(() => store.state.moves)
const games = computed(() => store.state.games)
const isLoading = ref(true)

watch(pokemon, () => {
  isLoading.value = !isLoading.value
})

const toggleModal = () => {
  store.dispatch('toggleModal')
  store.dispatch('clearSelectedPokemon')
}
</script>

<template>
  <div v-if="!isLoading">
    <b-modal id="modal" v-model="modalIsOpen" v-on:change="toggleModal" modal-footer="false">
      <MainInformation :pokemon="pokemon" />
      <div class="mt-2">
        <ListInformation :title="$t('modal.games')" :infos="games" />
      </div>
      <div class="mt-2">
        <ListInformation :title="$t('modal.attack_moves')" :infos="moves" />
      </div>
      <Suspense>
        <div class="mt-2">
          <PokeEvolutions :pokemon="pokemon" />
        </div>
      </Suspense>
    </b-modal>
  </div>
</template>
