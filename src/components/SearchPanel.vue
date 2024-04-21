<script setup>
import { computed, onBeforeMount, ref } from 'vue'
import { useStore } from 'vuex'

import capitalize from '@/utils/capitalize'

const store = useStore()
const pokemon = ref([])
const isLoading = ref(true)
const sortBy = 'id'
const filter = ref('')

onBeforeMount(async () => {
  await store.dispatch('fetchPokemons')
  isLoading.value = !isLoading.value
  const pokemons = computed(() => store.state.pokemons)

  pokemon.value = pokemons.value.map((pokemon) => ({
    id: pokemon.id.toString().padStart(3, '0'),
    name: capitalize(pokemon.name),
    types: pokemon.types.map((type) => capitalize(type)).join('/'),
    species: capitalize(pokemon.species).replace('-', ' ')
  }))
})

const fields = [
  { key: 'id', label: 'ID', sortable: true },
  { key: 'name', sortable: true },
  { key: 'types', sortable: true },
  { key: 'species', sortable: true }
]

const getPokemon = (pokemon) => {
  store.dispatch('selectPokemon', pokemon.name)
  store.dispatch('toggleModal')
}
</script>

<template>
  <div class="panel">
    <div class="table">
      <b-form-input class="search-bar" v-model="filter" placeholder="Type to search..." />
      <div class="table-container">
        <b-table
          hover
          class="pokedex-table"
          :items="pokemon"
          :fields="fields"
          :filter="filter"
          v-on:row-clicked="getPokemon"
          v-model:sort-by="sortBy"
          label-sort-desc=""
          label-sort-asc=""
          :busy="isLoading"
        >
          <template #table-busy>
            <div class="text-center text-danger my-2">
              <b-spinner class="align-middle m-2"></b-spinner>
              <strong>Loading...</strong>
            </div>
          </template>
        </b-table>
      </div>
    </div>
  </div>
</template>

<style scoped>
.panel {
  padding: 40px 40px 0 40px;
}

.search-bar {
  width: 100%;
  padding: 18px;
  background-color: var(--grey);
  border-radius: 2px;
}

.table {
  width: 100%;
}

.table-container {
  height: 80vh;
  width: 100%;
  border: none;
  overflow: auto;
}

.search-bar,
.search-bar:focus,
.search-bar::placeholder {
  background-color: var(--grey);
  color: var(--darker-grey);
}

.pokedex-table {
  padding: 20px;
  background: white;
  cursor: pointer;
}
</style>
