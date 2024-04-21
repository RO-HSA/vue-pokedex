<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'

import MainInformation from './MainInformation.vue'
import ListInformation from './ListInformation.vue'
import PokeEvolutions from './PokeEvolutions.vue'

const store = useStore()

const modalIsOpen = computed(() => store.state.modalIsOpen)

const pokemon = computed(() => store.state.selectedPokemon)

const toggleModal = () => {
  store.dispatch('toggleModal')
}
</script>

<template>
  <b-modal id="modal" v-model="modalIsOpen" v-on:change="toggleModal()" modal-footer="false">
    <MainInformation :pokemon="pokemon" />
    <div class="mt-2">
      <ListInformation :title="'Games'" :infos="pokemon.games" />
    </div>
    <div class="mt-2">
      <ListInformation :title="'Attack Moves'" :infos="pokemon.moves" />
    </div>
    <Suspense>
      <div class="mt-2">
        <PokeEvolutions :pokemon="pokemon" />
      </div>
    </Suspense>
  </b-modal>
</template>
