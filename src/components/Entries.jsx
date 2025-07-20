import React, { useState, useEffect } from 'react'
import { TypeIcon, ScrollableContainer, EvolutionDots, CategoryIcon } from './ui'
import { SPECIAL_CATEGORIES } from '../constants/evolution'
import { parseTypes } from '../utils/types'
import { formatPokemonName, formatHeight, formatWeight } from '../utils/formatting'
import { pokemonAPI } from '../services/api'
import EvolutionTree from './EvolutionTree'

// Simple wrapper components that use the utility functions
const EvolutionStage = ({ pokemonName }) => {
  return <EvolutionDots pokemonName={pokemonName} />
}

const SpecialCategory = ({ category }) => {
  return <CategoryIcon category={category} />
}

const Entries = ({ 
  filteredEntries, 
  pokemonImages, 
  selectedTypes, 
  expandedPokemon, 
  onPokemonClick 
}) => {
  const [pokemonDetails, setPokemonDetails] = useState({})

  useEffect(() => {
    const loadPokemonDetails = async (pokemonName) => {
      if (pokemonDetails[pokemonName]) return

      try {
        const details = await pokemonAPI.getPokemonDetails(pokemonName)
        setPokemonDetails(prev => ({
          ...prev,
          [pokemonName]: details
        }))
      } catch (error) {
        console.error(`Error loading details for ${pokemonName}:`, error)
      }
    }

    // Load details for expanded Pokemon
    if (expandedPokemon) {
      loadPokemonDetails(expandedPokemon)
    }
  }, [expandedPokemon, pokemonDetails])

  const getSpecialCategories = (pokemon) => {
    return pokemon.specialCategories || []
  }

  return (
    <ScrollableContainer className="flex-1 min-h-0">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4">
        {filteredEntries.map((pokemon) => {
          const isExpanded = expandedPokemon === pokemon.name
          const details = pokemonDetails[pokemon.name]
          const specialCategories = getSpecialCategories(pokemon)
          
          return (
            <div
              key={pokemon.name}
              className={`bg-white rounded-lg shadow-md border-2 cursor-pointer transition-all duration-200 hover:shadow-lg ${
                isExpanded ? 'border-blue-500 shadow-lg' : 'border-gray-200'
              }`}
              onClick={() => onPokemonClick(pokemon.name)}
            >
              {/* Pokemon Header */}
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {formatPokemonName(pokemon.name)}
                  </h3>
                  <span className="text-sm text-gray-500">#{pokemon.id}</span>
                </div>
                
                {/* Evolution Dots (Line 1) */}
                <div className="flex justify-center mb-2">
                  <EvolutionStage pokemonName={pokemon.name} />
                </div>
                
                {/* Special Category Icons (Line 2) */}
                {specialCategories.length > 0 && (
                  <div className="flex justify-center gap-1 mb-2">
                    {specialCategories.map((category, index) => (
                      <SpecialCategory key={index} category={category} />
                    ))}
                  </div>
                )}
                
                {/* Type Icons */}
                <div className="flex justify-center gap-2 mb-3">
                  {pokemon.type && pokemon.type.split('/').map((type, index) => (
                    <TypeIcon key={index} type={type} />
                  ))}
                </div>
                
                {/* Pokemon Image */}
                <div className="flex justify-center mb-3">
                  <div className="w-24 h-24 bg-gray-100 rounded-lg flex items-center justify-center">
                    {pokemonImages[pokemon.name] ? (
                      <img
                        src={pokemonImages[pokemon.name]}
                        alt={pokemon.name}
                        className="w-20 h-20 object-contain"
                        onError={(e) => {
                          e.target.style.display = 'none'
                          e.target.nextSibling.style.display = 'flex'
                        }}
                      />
                    ) : (
                      <div className="w-20 h-20 bg-gray-200 rounded flex items-center justify-center">
                        <span className="text-gray-400 text-xs">Loading...</span>
                      </div>
                    )}
                    <div 
                      className="w-20 h-20 bg-gray-200 rounded flex items-center justify-center hidden"
                      style={{ display: 'none' }}
                    >
                      <span className="text-gray-400 text-xs">No Image</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Expanded Details */}
              {isExpanded && details && (
                <div className="border-t border-gray-200 p-4 bg-gray-50">
                  <div className="space-y-3">
                    {/* Height and Weight */}
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Height:</span>
                      <span className="font-medium">{formatHeight(details.height)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Weight:</span>
                      <span className="font-medium">{formatWeight(details.weight)}</span>
                    </div>
                    
                    {/* Abilities */}
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 mb-1">Abilities:</h4>
                      <div className="space-y-1">
                        {details.abilities.map((ability, index) => (
                          <div key={index} className="flex justify-between text-xs">
                            <span className="text-gray-600 capitalize">
                              {ability.ability.name.replace('-', ' ')}
                            </span>
                            {ability.is_hidden && (
                              <span className="text-blue-600 text-xs">(Hidden)</span>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Stats */}
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 mb-1">Stats:</h4>
                      <div className="space-y-1">
                        {details.stats.map((stat, index) => (
                          <div key={index} className="flex justify-between text-xs">
                            <span className="text-gray-600 capitalize">
                              {stat.stat.name.replace('-', ' ')}:
                            </span>
                            <span className="font-medium">{stat.base_stat}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </ScrollableContainer>
  )
}

export default Entries 