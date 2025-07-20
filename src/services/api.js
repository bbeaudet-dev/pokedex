import axios from 'axios'
import { getPokemonImageUrl, getPokemonCryUrl } from '../utils/api'

const API_BASE_URL = 'http://localhost:3333'

// Add request throttling
let requestQueue = []
let isProcessing = false

const processQueue = async () => {
  if (isProcessing || requestQueue.length === 0) return
  
  isProcessing = true
  
  while (requestQueue.length > 0) {
    const { request, resolve, reject } = requestQueue.shift()
    try {
      const result = await request()
      resolve(result)
    } catch (error) {
      reject(error)
    }
    // Add delay between requests to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 100))
  }
  
  isProcessing = false
}

const throttledRequest = (request) => {
  return new Promise((resolve, reject) => {
    requestQueue.push({ request, resolve, reject })
    processQueue()
  })
}

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
    // Skip Pokemon that likely don't exist in PokeAPI
    if (pokemonName.includes('-') || pokemonName.length > 20) {
      return null
    }
    
    return throttledRequest(async () => {
      try {
        const response = await axios.get(getPokemonImageUrl(pokemonName))
        return response.data.sprites.front_default
      } catch (error) {
        // Silently fail for missing Pokemon
        return null
      }
    })
  },

  // Get Pokemon cry
  getCry: async (pokemonName) => {
    // Skip Pokemon that likely don't exist in PokeAPI
    if (pokemonName.includes('-') || pokemonName.length > 20) {
      return null
    }
    
    return throttledRequest(async () => {
      try {
        const response = await axios.get(getPokemonCryUrl(pokemonName))
        return response.data.cries.latest
      } catch (error) {
        // Silently fail for missing Pokemon
        return null
      }
    })
  },

  // Get detailed Pokemon data (height, weight, evolution chain)
  getDetails: async (pokemonName) => {
    return throttledRequest(async () => {
      try {
        const response = await axios.get(getPokemonImageUrl(pokemonName))
        const pokemonData = response.data
        
        // Get evolution chain if available
        let evolutionChain = null
        if (pokemonData.species?.url) {
          try {
            const speciesResponse = await axios.get(pokemonData.species.url)
            if (speciesResponse.data.evolution_chain?.url) {
              const evolutionResponse = await axios.get(speciesResponse.data.evolution_chain.url)
              evolutionChain = evolutionResponse.data
            }
          } catch (error) {
            // Silently fail for evolution chain
          }
        }

        return {
          height: pokemonData.height / 10, // Convert to meters
          weight: pokemonData.weight / 10, // Convert to kg
          evolutionChain: evolutionChain
        }
      } catch (error) {
        // Silently fail for missing Pokemon
        return {
          height: null,
          weight: null,
          evolutionChain: null
        }
      }
    })
  },

  // Get Pokemon footprint
  getFootprint: async (pokemonName) => {
    return throttledRequest(async () => {
      try {
        const response = await axios.get(getPokemonImageUrl(pokemonName))
        const pokemonData = response.data
        
        // Get species data for footprint
        if (pokemonData.species?.url) {
          const speciesResponse = await axios.get(pokemonData.species.url)
          return speciesResponse.data.pokedex_numbers?.[0]?.entry_number || null
        }
        
        return null
      } catch (error) {
        // Silently fail for missing Pokemon
        return null
      }
    })
  }
}

export default api 