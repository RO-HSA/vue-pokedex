<script setup>
import { computed, onBeforeMount, ref } from 'vue'
import { useStore } from 'vuex'

const store = useStore()
const pokemon = ref([])
const isLoading = ref(true)

onBeforeMount(async () => {
  await store.dispatch('fetchPokemons')
  isLoading.value = !isLoading.value
  const pokemons = computed(() => store.state.pokemons)

  pokemon.value = pokemons.value.map((pokemon) => ({
    id: pokemon.id.toString().padStart(3, '0'),
    name: pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1),
    types: pokemon.types.map((type) => type.charAt(0).toUpperCase() + type.slice(1)).join('/'),
    species: pokemon.species.charAt(0).toUpperCase() + pokemon.species.slice(1)
  }))
})

const fields = [
  { key: 'id', label: 'ID', sortable: true },
  { key: 'name', sortable: true },
  { key: 'types', sortable: true },
  { key: 'species', sortable: true }
]
const sortBy = 'id'
const filter = ref('')
</script>

<template>
  <div class="panel">
    <div class="table">
      <b-form-input
        class="search-bar"
        v-model="filter"
        placeholder="Type to search..."
        @input="searchChanged"
      />
      <div class="table-container">
        <b-table
          hover
          class="pokedex-table"
          :items="pokemon"
          :fields="fields"
          :filter="filter"
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
