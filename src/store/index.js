import { createStore } from 'vuex'
import axios from 'axios'
import getLocaleNames from '@/utils/getLocaleNames'

export default createStore({
  state: {
    pokemons: [],
    selectedPokemon: null,
    modalIsOpen: false
  },
  getters: {
    getPokemons: (state) => state.pokemons,
    getSelectedPokemon: (state) => state.selectedPokemon,
    getModalIsOpen: (state) => state.modalIsOpen
  },
  actions: {
    async fetchPokemons({ commit }) {
      try {
        const data = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=150')
        const pokemons = []

        const pokemonDetailsPromises = data.data.results.map(async (item) => {
          const pokemonData = await axios.get(item.url)
          const pokemonSpecies = await axios.get(
            `https://pokeapi.co/api/v2/pokemon-species/${pokemonData.data.id}`
          )
          const movesUrls = pokemonData.data.moves.map((move) => move.move.url)
          const typesUrls = pokemonData.data.types.map((type) => type.type.url)

          const [movesData, typesData] = await Promise.all([
            Promise.all(movesUrls.map((url) => axios.get(url))),
            Promise.all(typesUrls.map((url) => axios.get(url)))
          ])

          const moves = getLocaleNames(movesData)

          const types = getLocaleNames(typesData)

          pokemons.push({
            id: pokemonData.data.id,
            name: pokemonData.data.name,
            types,
            sprites: pokemonData.data.sprites,
            species: pokemonData.data.species.name,
            moves,
            games: pokemonData.data.game_indices.map((game) => game.version.name),
            evolution_chain: pokemonSpecies.data.evolution_chain.url
          })
        })

        await Promise.all(pokemonDetailsPromises)

        commit('SET_POKEMONS', pokemons)
      } catch (error) {
        console.error(error)
      }
    },
    selectPokemon({ commit, state }, pokemon) {
      const selectedPokemon = state.pokemons.find((p) => p.name === pokemon.toLowerCase())
      commit('SET_SELECTED_POKEMON_DATA', selectedPokemon)
    },
    toggleModal({ commit, state }) {
      commit('SET_MODAL_IS_OPEN', !state.modalIsOpen)
    }
  },
  mutations: {
    SET_POKEMONS(state, pokemons) {
      state.pokemons = pokemons
    },
    SET_SELECTED_POKEMON_DATA(state, selectedPokemon) {
      state.selectedPokemon = selectedPokemon
    },
    SET_MODAL_IS_OPEN(state, modalIsOpen) {
      state.modalIsOpen = modalIsOpen
    }
  }
})
