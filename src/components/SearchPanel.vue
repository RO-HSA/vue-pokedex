<script setup>
import { computed, onBeforeMount, ref, watch } from 'vue'
import { useStore } from 'vuex'
import { useI18n } from 'vue-i18n'

import capitalize from '@/utils/capitalize'

const { t, locale } = useI18n()

const store = useStore()
const pokemon = ref([])
const isLoading = computed(() => store.state.isLoading)
const sortBy = 'id'
const filter = ref('')
const table = ref()
const pokemons = computed(() => store.state.pokemons)

const formatPokemonData = (pokemons) => {
  return pokemons.map((pokemon) => ({
    id: pokemon.id.toString().padStart(3, '0'),
    name: capitalize(pokemon.name),
    types: pokemon.types.map((type) => capitalize(type)).join('/'),
    species: capitalize(pokemon.species).replace('-', ' ')
  }))
}

onBeforeMount(async () => {
  await store.dispatch('fetchPokemons', locale.value)
  pokemon.value = formatPokemonData(pokemons.value)
  store.dispatch('setisLoading', false)
})

const labels = ref({
  name: t('panel.table.name'),
  types: t('panel.table.types'),
  species: t('panel.table.species')
})

const fields = [
  { key: 'id', label: 'ID', sortable: true },
  { key: 'name', label: labels.value.name, sortable: true },
  { key: 'types', label: labels.value.types, sortable: true },
  { key: 'species', label: labels.value.species, sortable: true }
]

watch(pokemons, () => {
  pokemon.value = formatPokemonData(pokemons.value)
})

watch(locale, async () => {
  fields.forEach((field) => {
    field.label = field.key !== 'id' ? t(`panel.table.${field.key}`) : field.label
  })
})

const translatedFields = computed(() => {
  return fields.map((field) => ({
    ...field,
    label: t(`panel.table.${field.key}`)
  }))
})

const getPokemon = (pokemon) => {
  store.dispatch('selectPokemon', pokemon.name)
  store.dispatch('fetchMovesGames', locale.value)
  store.dispatch('toggleModal')
}
</script>

<template>
  <div class="panel">
    <div class="table">
      <b-form-input class="search-bar" v-model="filter" :placeholder="$t('panel.placeholder')" />
      <div class="table-container">
        <b-table
          hover
          class="pokedex-table"
          :items="pokemon"
          :fields="fields"
          :filter="filter"
          ref="table"
          v-on:row-clicked="getPokemon"
          v-model:sort-by="sortBy"
          label-sort-desc=""
          label-sort-asc=""
          :busy="isLoading"
        >
          <template
            v-for="(field, index) in translatedFields"
            :key="index"
            v-slot:[`cell(${field.key})`]="{ item }"
          >
            {{ item[field.key] }}
          </template>
          <template #table-busy>
            <div class="text-center text-danger my-2">
              <b-spinner class="align-middle m-2"></b-spinner>
              <strong>{{ $t('panel.loading') }}</strong>
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
