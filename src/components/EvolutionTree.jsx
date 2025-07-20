import React, { useState, useEffect } from 'react'
import { TypeIcon } from './ui'
import { parseEvolutionChain, getEvolutionTriggerDescription } from '../utils/evolution'
import { formatPokemonName } from '../utils/formatting'
import { pokemonAPI } from '../services/api'

const EvolutionTree = ({ pokemonName, evolutionChain }) => {
  const [evolutionData, setEvolutionData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const loadEvolutionData = async () => {
      if (!evolutionChain) {
        setLoading(false)
        return
      }

      try {
        setLoading(true)
        const evolutions = parseEvolutionChain(evolutionChain)
        
        // Fetch images for each Pokemon in the evolution chain
        const evolutionWithImages = await Promise.all(
          evolutions.map(async (evolution) => {
            try {
              const imageUrl = await pokemonAPI.getImage(evolution.name)
              return {
                ...evolution,
                imageUrl
              }
            } catch (error) {
              console.log(`Could not load image for ${evolution.name}:`, error)
              return {
                ...evolution,
                imageUrl: null
              }
            }
          })
        )
        
        setEvolutionData(evolutionWithImages)
      } catch (error) {
        console.error('Error loading evolution data:', error)
        setError('Failed to load evolution data')
      } finally {
        setLoading(false)
      }
    }

    loadEvolutionData()
  }, [evolutionChain])

  if (loading) {
    return (
      <div className="flex items-center justify-center py-4">
        <div className="text-gray-500 text-sm">Loading evolution data...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center py-4">
        <div className="text-red-500 text-sm">{error}</div>
      </div>
    )
  }

  if (!evolutionChain || evolutionData.length === 0) {
    return (
      <div className="flex items-center justify-center py-4">
        <div className="text-gray-500 text-sm">No evolution data available</div>
      </div>
    )
  }

  // Group evolutions by level
  const evolutionLevels = {}
  evolutionData.forEach(evolution => {
    if (!evolutionLevels[evolution.level]) {
      evolutionLevels[evolution.level] = []
    }
    evolutionLevels[evolution.level].push(evolution)
  })

  const levels = Object.keys(evolutionLevels).sort((a, b) => parseInt(a) - parseInt(b))

  return (
    <div className="evolution-tree">
      <h3 className="text-lg font-semibold text-gray-800 mb-3">Evolution Chain</h3>
      <div className="flex items-center justify-center gap-4 overflow-x-auto pb-4">
        {levels.map((level, levelIndex) => (
          <div key={level} className="flex flex-col items-center gap-2 min-w-0">
            {evolutionLevels[level].map((evolution, evolutionIndex) => (
              <div key={`${evolution.name}-${evolutionIndex}`} className="flex flex-col items-center">
                <div className="relative">
                  <div className="w-16 h-16 bg-white rounded-lg border-2 border-gray-300 p-1 flex items-center justify-center">
                    {evolution.imageUrl ? (
                      <img 
                        src={evolution.imageUrl} 
                        alt={evolution.name}
                        className="w-full h-full object-contain"
                        onError={(e) => {
                          e.target.style.display = 'none'
                          e.target.nextSibling.style.display = 'flex'
                        }}
                      />
                    ) : null}
                    <div className="hidden w-full h-full items-center justify-center text-gray-400 text-xs font-bold">
                      ?
                    </div>
                  </div>
                  {evolution.name.toLowerCase() === pokemonName.toLowerCase() && (
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-blue-500 rounded-full border-2 border-white"></div>
                  )}
                </div>
                <div className="text-xs text-gray-600 mt-1 text-center max-w-16">
                  {formatPokemonName(evolution.name)}
                </div>
              </div>
            ))}
            
            {/* Evolution arrows and conditions */}
            {levelIndex < levels.length - 1 && (
              <div className="flex flex-col items-center gap-2">
                <div className="text-gray-400 text-lg">→</div>
                {evolutionLevels[level].map((evolution, evolutionIndex) => {
                  const nextLevelEvolutions = evolutionLevels[parseInt(level) + 1] || []
                  return nextLevelEvolutions.map((nextEvolution, nextIndex) => {
                    const evolutionDetail = evolution.evolutionDetails.find(detail => 
                      detail.trigger?.name && getEvolutionTriggerDescription(detail) !== 'Unknown'
                    )
                    
                    if (evolutionDetail) {
                      return (
                        <div key={`${evolution.name}-${nextEvolution.name}`} className="text-xs text-gray-500 text-center max-w-20">
                          {getEvolutionTriggerDescription(evolutionDetail)}
                        </div>
                      )
                    }
                    return null
                  })
                })}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default EvolutionTree 