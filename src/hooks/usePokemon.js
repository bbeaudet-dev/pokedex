import { useState, useEffect, useCallback } from 'react'
import { pokemonAPI } from '../services/api'

// Example Pokemon data for fallback
const EXAMPLE_POKEMON = {
  name: 'Tauros',
  type: 'normal',
  evolutionStage: 'NONE',
  specialCategories: [],
  description: 'A wild bull Pokémon that charges at anything that moves. It is known for its violent nature.'
}

export const usePokemon = () => {
  const [entries, setEntries] = useState([{
    ...EXAMPLE_POKEMON,
    specialCategories: []
  }])
  const [pokemonImages, setPokemonImages] = useState({})
  const [pokemonCries, setPokemonCries] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Fetch all Pokemon data
  const fetchPokemonData = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      
      console.log('Fetching Pokemon data from server...')
      const data = await pokemonAPI.getAll()
      
      console.log('GET request response:', data)
      console.log('Number of Pokemon received:', data.length)
      
      // Ensure each entry has specialCategories
      const processedData = data.map(entry => ({
        ...entry,
        specialCategories: entry.specialCategories || []
      }))
      
      setEntries(processedData)
      
      // Fetch images and cries for all Pokemon
      processedData.forEach(pokemon => {
        fetchPokemonImage(pokemon.name.toLowerCase())
        fetchPokemonCry(pokemon.name.toLowerCase())
      })
      
    } catch (err) {
      console.error('Error fetching Pokemon data:', err)
      console.log('Using fallback data (Tauros)')
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [])

  // Fetch Pokemon image
  const fetchPokemonImage = useCallback(async (pokemonName) => {
    try {
      const imageUrl = await pokemonAPI.getImage(pokemonName)
      if (imageUrl) {
        setPokemonImages(prev => ({
          ...prev,
          [pokemonName.toLowerCase()]: imageUrl
        }))
      }
    } catch (error) {
      console.log(`Could not fetch image for ${pokemonName}:`, error.message)
    }
  }, [])

  // Fetch Pokemon cry
  const fetchPokemonCry = useCallback(async (pokemonName) => {
    try {
      const cryUrl = await pokemonAPI.getCry(pokemonName)
      if (cryUrl) {
        setPokemonCries(prev => ({
          ...prev,
          [pokemonName.toLowerCase()]: cryUrl
        }))
      }
    } catch (error) {
      console.log(`Could not fetch cry for ${pokemonName}:`, error.message)
    }
  }, [])

  // Add new Pokemon
  const addPokemon = useCallback(async (pokemonData) => {
    try {
      const newPokemon = await pokemonAPI.create(pokemonData)
      
      // Add to local state
      setEntries(prev => [...prev, newPokemon])
      
      // Fetch image for new Pokemon
      fetchPokemonImage(newPokemon.name.toLowerCase())
      
      return newPokemon
    } catch (error) {
      console.error('Error adding Pokemon:', error)
      throw error
    }
  }, [fetchPokemonImage])

  // Play Pokemon cry
  const playPokemonCry = useCallback((pokemonName) => {
    const cry = pokemonCries[pokemonName.toLowerCase()]
    if (cry) {
      const audio = new Audio(cry)
      audio.volume = 0.5
      audio.play()
      return audio
    }
    return null
  }, [pokemonCries])

  // Initialize data on mount
  useEffect(() => {
    fetchPokemonData()
  }, [fetchPokemonData])

  return {
    entries,
    pokemonImages,
    pokemonCries,
    loading,
    error,
    addPokemon,
    playPokemonCry,
    refetch: fetchPokemonData
  }
} 