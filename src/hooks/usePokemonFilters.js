import { useState, useEffect, useMemo } from 'react'

export const usePokemonFilters = (entries) => {
  const [selectedTypes, setSelectedTypes] = useState([])
  const [exactMatch, setExactMatch] = useState(false)
  const [filterEvolutionStages, setFilterEvolutionStages] = useState([])
  const [filterSpecialCategories, setFilterSpecialCategories] = useState([])
  const [filterGenerations, setFilterGenerations] = useState([])
  const [expandedPokemon, setExpandedPokemon] = useState(null)

  // Filter Pokemon based on all criteria
  const filteredEntries = useMemo(() => {
    let filtered = entries

    // Type filter
    if (selectedTypes.length > 0) {
      filtered = filtered.filter(entry => {
        const entryTypes = entry.type.split('/')
        if (exactMatch) {
          return selectedTypes.length === entryTypes.length &&
                 selectedTypes.every(type => entryTypes.includes(type))
        } else {
          return selectedTypes.some(type => entryTypes.includes(type))
        }
      })
    }

    // Evolution stage filter
    if (filterEvolutionStages.length > 0) {
      filtered = filtered.filter(entry =>
        filterEvolutionStages.includes(entry.evolutionStage)
      )
    }

    // Special category filter
    if (filterSpecialCategories.length > 0) {
      filtered = filtered.filter(entry =>
        entry.specialCategories && entry.specialCategories.some(cat => filterSpecialCategories.includes(cat))
      )
    }

    // Generation filter
    if (filterGenerations.length > 0) {
      filtered = filtered.filter(entry =>
        filterGenerations.includes(entry.generation)
      )
    }

    return filtered
  }, [entries, selectedTypes, exactMatch, filterEvolutionStages, filterSpecialCategories, filterGenerations])

  // Handle Pokemon click for expansion
  const handlePokemonClick = (pokemon) => {
    if (expandedPokemon === pokemon.name) {
      setExpandedPokemon(null)
    } else {
      setExpandedPokemon(pokemon.name)
    }
  }

  // Clear all filters
  const clearAllFilters = () => {
    setSelectedTypes([])
    setFilterEvolutionStages([])
    setFilterSpecialCategories([])
    setFilterGenerations([])
    setExactMatch(false)
  }

  // Get filter summary
  const getFilterSummary = () => {
    const activeFilters = []
    
    if (selectedTypes.length > 0) {
      activeFilters.push(`Types: ${selectedTypes.join(', ')}`)
    }
    if (filterEvolutionStages.length > 0) {
      activeFilters.push(`Evolution: ${filterEvolutionStages.join(', ')}`)
    }
    if (filterSpecialCategories.length > 0) {
      activeFilters.push(`Categories: ${filterSpecialCategories.join(', ')}`)
    }
    if (filterGenerations.length > 0) {
      activeFilters.push(`Generations: ${filterGenerations.join(', ')}`)
    }
    
    return activeFilters
  }

  return {
    // State
    selectedTypes,
    exactMatch,
    filterEvolutionStages,
    filterSpecialCategories,
    filterGenerations,
    expandedPokemon,
    filteredEntries,
    
    // Actions
    setSelectedTypes,
    setExactMatch,
    setFilterEvolutionStages,
    setFilterSpecialCategories,
    setFilterGenerations,
    handlePokemonClick,
    clearAllFilters,
    
    // Computed
    getFilterSummary,
    hasActiveFilters: selectedTypes.length > 0 || 
                     filterEvolutionStages.length > 0 || 
                     filterSpecialCategories.length > 0 || 
                     filterGenerations.length > 0
  }
} 