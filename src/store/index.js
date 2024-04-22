import { createStore } from 'vuex'
import axios from 'axios'
import getLocaleNames from '@/utils/getLocaleNames'

export default createStore({
  state: {
    pokemons: [],
    selectedPokemon: null,
    moves: [],
    games: [],
    modalIsOpen: false,
    isLoading: false
  },
  getters: {
    getPokemons: (state) => state.pokemons,
    getSelectedPokemon: (state) => state.selectedPokemon,
    getMoves: (state) => state.moves,
    getGames: (state) => state.games,
    getModalIsOpen: (state) => state.modalIsOpen,
    getIsLoading: (state) => state.isLoading
  },
  actions: {
    async fetchPokemons({ commit, state }, lang) {
      commit('SET_IS_LOADING', !state.isLoading)
      try {
        const data = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=150')
        const pokemons = []

        const pokemonDetailsPromises = data.data.results.map(async (item) => {
          const pokemonData = await axios.get(item.url)
          const pokemonSpecies = await axios.get(
            `https://pokeapi.co/api/v2/pokemon-species/${pokemonData.data.id}`
          )

          const typesUrls = pokemonData.data.types.map((type) => type.type.url)
          const typesData = await Promise.all(typesUrls.slice(0, 6).map((url) => axios.get(url)))
          const types = getLocaleNames(typesData, lang)

          pokemons.push({
            id: pokemonData.data.id,
            name: pokemonData.data.name,
            types,
            sprites: pokemonData.data.sprites,
            species: pokemonData.data.species.name,
            evolution_chain: pokemonSpecies.data.evolution_chain.url
          })
        })

        await Promise.all(pokemonDetailsPromises)

        commit('SET_POKEMONS', pokemons)
        commit('SET_IS_LOADING', !state.isLoading)
      } catch (error) {
        console.error(error)
      }
    },
    selectPokemon({ commit, state }, pokemon) {
      const selectedPokemon = state.pokemons.find((p) => p.name === pokemon.toLowerCase())
      commit('SET_SELECTED_POKEMON_DATA', selectedPokemon)
    },
    async fetchMovesGames({ commit, state }, lang) {
      commit('SET_IS_LOADING', !state.isLoading)
      const pokemonId = state.selectedPokemon.id
      const pokemonData = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)

      const movesUrls = pokemonData.data.moves.map((move) => move.move.url).slice(0, 6)
      const movesData = await Promise.all(movesUrls.map((url) => axios.get(url)))
      const moves = getLocaleNames(movesData, lang)

      const gamesUrls = pokemonData.data.game_indices.map((game) => game.version.url)
      const gamesData = await Promise.all(gamesUrls.map((url) => axios.get(url)))
      const games = getLocaleNames(gamesData, lang)

      commit('SET_MOVES', moves)
      commit('SET_GAMES', games)
      commit('SET_IS_LOADING', !state.isLoading)
    },
    toggleModal({ commit, state }) {
      commit('SET_MODAL_IS_OPEN', !state.modalIsOpen)
    },
    clearSelectedPokemon({ commit }) {
      commit('SET_SELECTED_POKEMON_DATA', null)
      commit('SET_MOVES', [])
    },
    setisLoading({ commit }, isLoading) {
      commit('SET_IS_LOADING', isLoading)
    }
  },
  mutations: {
    SET_POKEMONS(state, pokemons) {
      state.pokemons = pokemons
    },
    SET_SELECTED_POKEMON_DATA(state, selectedPokemon) {
      state.selectedPokemon = selectedPokemon
    },
    SET_MOVES(state, moves) {
      state.moves = moves
    },
    SET_GAMES(state, games) {
      state.games = games
    },
    SET_MODAL_IS_OPEN(state, modalIsOpen) {
      state.modalIsOpen = modalIsOpen
    },
    SET_IS_LOADING(state, isLoading) {
      state.isLoading = isLoading
    }
  }
})
