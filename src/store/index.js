import { createStore } from 'vuex'
import axios from 'axios'

export default createStore({
  state: {
    pokemons: []
  },
  getters: {
    getPokemons: (state) => state.pokemons
  },
  actions: {
    async fetchPokemons({ commit }) {
      try {
        const data = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=150')
        const pokemons = []

        for (let item of data.data.results) {
          const pokemonData = await axios.get(item.url)
          pokemons.push({
            id: pokemonData.data.id,
            name: pokemonData.data.name,
            types: pokemonData.data.types.map((type) => type.type.name),
            sprites: pokemonData.data.sprites,
            species: pokemonData.data.species.name,
            moves: pokemonData.data.moves.map((move) => move.move.name),
            games: pokemonData.data.game_indices.map((game) => game.version.name)
          })
        }
        commit('SET_POKEMONS', pokemons)
      } catch (error) {
        console.error(error)
      }
    }
  },
  mutations: {
    SET_POKEMONS(state, pokemons) {
      state.pokemons = pokemons
    }
  }
})
