import React from 'react'
import { TypeIcon, ScrollableContainer } from './ui'
import { EVOLUTION_STAGES, SPECIAL_CATEGORIES } from '../constants'
import { parseTypes, formatPokemonName } from '../utils'



const EvolutionStage = ({ stage }) => {
  const stageColors = {
    base: 'text-green-600',
    middle: 'text-blue-600', 
    final: 'text-red-600',
    none: 'text-gray-500'
  }
  
  return (
    <div className={`font-mono text-base ${stageColors[stage.toLowerCase()] || stageColors.none}`}>
      {EVOLUTION_STAGES[stage]}
    </div>
  )
}

const SpecialCategory = ({ category }) => (
  <div className="text-sm text-yellow-500" title={category}>
    {SPECIAL_CATEGORIES[category]}
  </div>
)

const Entries = ({ 
  filteredEntries, 
  pokemonImages, 
  selectedTypes, 
  expandedPokemon, 
  onPokemonClick 
}) => {
  return (
    <div className="h-full">
      <ScrollableContainer 
        className="bg-white rounded-lg p-3 lg:p-4 shadow-inner min-h-[500px] lg:min-h-[700px] max-h-[500px] lg:max-h-[700px]"
      >
        {filteredEntries.length === 0 ? (
          <div className="flex items-center justify-center h-full text-gray-500 text-lg">
            <div className="text-center">
              <div className="text-4xl mb-4">🔍</div>
              <div>No Pokemon found matching your criteria</div>
              <div className="text-sm mt-2">Try adjusting your filters</div>
            </div>
          </div>
        ) : (
          <ol>
            {filteredEntries.map((entry) => {
              const pokemonName = entry.name.toLowerCase()
              return (
                <li 
                  key={entry.id} 
                  className={`bg-gray-100 border-2 border-gray-300 rounded-lg p-2 m-1 text-left transition-all duration-300 ease-out flex items-center gap-4 cursor-pointer hover:scale-[1.04] hover:shadow-lg ${
                    expandedPokemon === entry.name ? 'scale-105 bg-white shadow-xl' : ''
                  }`}
                  onClick={() => onPokemonClick(entry)}
                >
                <div className="flex items-center gap-5">
                                  <div className="flex flex-col gap-1 min-w-8 px-2">
                  <EvolutionStage stage={entry.evolutionStage || 'NONE'} />
                  {(entry.specialCategories || []).map(category => (
                    <SpecialCategory key={category} category={category} />
                  ))}
                </div>
                  
                                  <div className="w-20 h-20 bg-white rounded-2xl p-1 flex items-center justify-center">
                  {pokemonImages[pokemonName] ? (
                    <img 
                      src={pokemonImages[pokemonName]} 
                      alt={entry.name}
                      className="w-full h-full object-contain"
                      onError={(e) => {
                        e.target.style.display = 'none'
                        e.target.nextSibling.style.display = 'flex'
                        console.log(`Failed to load image for ${entry.name}`)
                      }}
                    />
                  ) : null}
                  <div className="hidden w-full h-full items-center justify-center text-gray-400 text-xs font-bold">
                    {entry.id}
                  </div>
                </div>
                  
                                  <span className="text-gray-800 font-bold text-lg truncate min-w-0 flex-shrink-0">
                  {formatPokemonName(entry.name)}
                </span>
                  
                                  <div className="flex items-center">
                  {parseTypes(entry.type).map(type => (
                    <TypeIcon
                      key={type}
                      type={type}
                      selected={selectedTypes.includes(type)}
                      onClick={() => {}}
                      showTooltip={false}
                      size="md"
                    />
                  ))}
                </div>
                </div>
                
                              <div className={`max-h-0 overflow-hidden transition-all duration-1000 ease-out mt-0 ${
                expandedPokemon === entry.name ? 'max-h-48 mt-4 pt-4 px-4 pb-4 border-t border-gray-300' : ''
              }`}>
                <p className="text-sm text-gray-600 leading-relaxed">{entry.description || 'No description available.'}</p>
              </div>
              </li>
            )
          })}
        </ol>
        )}
      </ScrollableContainer>
    </div>
  )
}

export default Entries 