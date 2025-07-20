import axios from 'axios'
import { getPokemonImageUrl, getPokemonCryUrl } from '../utils'

const API_BASE_URL = 'http://localhost:3333'

// Create axios instance with base configuration
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Pokemon API service
export const pokemonAPI = {
  // Get all Pokemon
  getAll: async () => {
    try {
      const response = await api.get('/pokemon')
      return response.data
    } catch (error) {
      console.error('Error fetching Pokemon data:', error)
      throw error
    }
  },

  // Add new Pokemon
  create: async (pokemonData) => {
    try {
      const response = await api.post('/pokemon', pokemonData)
      return response.data
    } catch (error) {
      console.error('Error creating Pokemon:', error)
      throw error
    }
  },

  // Get Pokemon image
  getImage: async (pokemonName) => {
    try {
      const response = await axios.get(getPokemonImageUrl(pokemonName))
      return response.data.sprites.front_default
    } catch (error) {
      console.log(`Could not fetch image for ${pokemonName}:`, error.message)
      return null
    }
  },

  // Get Pokemon cry
  getCry: async (pokemonName) => {
    try {
      const response = await axios.get(getPokemonCryUrl(pokemonName))
      return response.data.cries.latest
    } catch (error) {
      console.log(`Could not fetch cry for ${pokemonName}:`, error.message)
      return null
    }
  }
}

export default api 