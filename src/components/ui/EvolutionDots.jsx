import React, { useState, useEffect } from 'react'
import { 
  parseEvolutionChain, 
  hasEvolution, 
  getEvolutionLevel, 
  getEvolutionDots 
} from '../../utils/evolutionDisplay'

const EvolutionDots = ({ pokemonName }) => {
  const [dots, setDots] = useState(1)
  const [isNoEvolution, setIsNoEvolution] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchEvolutionData = async () => {
      try {
        // Get Pokemon data from PokeAPI
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}/`)
        const pokemonData = await response.json()
        
        // Get species data
        const speciesResponse = await fetch(pokemonData.species.url)
        const speciesData = await speciesResponse.json()
        
        // Get evolution chain
        if (speciesData.evolution_chain?.url) {
          const evolutionResponse = await fetch(speciesData.evolution_chain.url)
          const evolutionData = await evolutionResponse.json()
          
          // Check if Pokemon has evolutions
          const hasEvolutions = hasEvolution(evolutionData.chain)
          setIsNoEvolution(!hasEvolutions)
          
          // Parse evolution chain to determine stage and level
          const stage = parseEvolutionChain(evolutionData.chain, pokemonName.toLowerCase())
          const evolutionLevel = getEvolutionLevel(evolutionData.chain, pokemonName.toLowerCase())
          
          // Get number of dots
          const dotCount = getEvolutionDots(stage, hasEvolutions, evolutionLevel)
          setDots(dotCount)
        } else {
          setDots(1)
          setIsNoEvolution(true)
        }
      } catch (error) {
        // Silently fail and show default state
        setDots(1)
        setIsNoEvolution(true)
      } finally {
        setLoading(false)
      }
    }

    fetchEvolutionData()
  }, [pokemonName])

  if (loading) {
    return <div className="w-3 h-3 bg-gray-300 rounded-full animate-pulse" />
  }

  return (
    <div className="flex items-center justify-center gap-0.5">
      {Array.from({ length: dots }, (_, i) => (
        <div 
          key={i} 
          className={`w-1.5 h-1.5 rounded-full ${
            isNoEvolution 
              ? 'border border-gray-600 bg-transparent' 
              : 'bg-gray-600'
          }`} 
        />
      ))}
    </div>
  )
}

export default EvolutionDots 