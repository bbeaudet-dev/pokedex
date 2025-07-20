import { formatPokemonName, formatTypeName } from './formatting'

/**
 * Parse evolution chain data from PokeAPI
 */
export const parseEvolutionChain = (evolutionChain) => {
  if (!evolutionChain) return []
  
  const evolutions = []
  
  const traverseChain = (chain, level = 0) => {
    if (!chain) return
    
    const pokemonName = chain.species?.name
    if (pokemonName) {
      evolutions.push({
        name: pokemonName,
        level: level,
        evolutionDetails: chain.evolution_details || []
      })
    }
    
    // Traverse evolution details
    if (chain.evolution_details && chain.evolution_details.length > 0) {
      chain.evolution_details.forEach(detail => {
        if (detail.trigger?.name) {
          evolutions.push({
            name: pokemonName,
            level: level,
            evolutionDetails: [detail]
          })
        }
      })
    }
    
    // Traverse evolves_to
    if (chain.evolves_to && chain.evolves_to.length > 0) {
      chain.evolves_to.forEach(evolution => {
        traverseChain(evolution, level + 1)
      })
    }
  }
  
  traverseChain(evolutionChain.chain)
  return evolutions
}

/**
 * Get evolution trigger description
 */
export const getEvolutionTriggerDescription = (detail) => {
  if (!detail) return ''
  
  const trigger = detail.trigger?.name
  const minLevel = detail.min_level
  const item = detail.item?.name
  const heldItem = detail.held_item?.name
  const timeOfDay = detail.time_of_day
  const knownMove = detail.known_move?.name
  const knownMoveType = detail.known_move_type?.name
  const minHappiness = detail.min_happiness
  const minAffection = detail.min_affection
  const relativePhysicalStats = detail.relative_physical_stats
  const partySpecies = detail.party_species?.name
  const partyType = detail.party_type?.name
  const tradeSpecies = detail.trade_species?.name
  const needsOverworldRain = detail.needs_overworld_rain
  const turnUpsideDown = detail.turn_upside_down
  
  if (trigger === 'level-up') {
    if (minLevel) {
      return `Level ${minLevel}`
    }
    if (minHappiness) {
      return `High friendship`
    }
    if (minAffection) {
      return `High affection`
    }
    if (knownMove) {
      return `Knows ${formatPokemonName(knownMove)}`
    }
    if (knownMoveType) {
      return `Knows ${formatTypeName(knownMoveType)} move`
    }
    if (relativePhysicalStats === 1) {
      return `Attack > Defense`
    }
    if (relativePhysicalStats === -1) {
      return `Defense > Attack`
    }
    if (relativePhysicalStats === 0) {
      return `Attack = Defense`
    }
    return 'Level up'
  }
  
  if (trigger === 'trade') {
    if (item) {
      return `Trade holding ${formatPokemonName(item)}`
    }
    if (tradeSpecies) {
      return `Trade for ${formatPokemonName(tradeSpecies)}`
    }
    return 'Trade'
  }
  
  if (trigger === 'use-item') {
    return `Use ${formatPokemonName(item)}`
  }
  
  if (trigger === 'shed') {
    return 'Level 20 with empty party slot'
  }
  
  if (trigger === 'spin') {
    return 'Spin while walking'
  }
  
  if (trigger === 'tower-of-darkness') {
    return 'Tower of Darkness'
  }
  
  if (trigger === 'tower-of-waters') {
    return 'Tower of Waters'
  }
  
  if (trigger === 'three-critical-hits') {
    return '3 critical hits in battle'
  }
  
  if (trigger === 'take-damage') {
    return 'Take damage and survive'
  }
  
  if (trigger === 'other') {
    if (timeOfDay === 'day') {
      return 'During day'
    }
    if (timeOfDay === 'night') {
      return 'During night'
    }
    if (needsOverworldRain) {
      return 'During rain'
    }
    if (turnUpsideDown) {
      return 'Turn device upside down'
    }
    return 'Special condition'
  }
  
  return 'Unknown'
} 