/**
 * Evolution and category display utilities
 */

// Evolution stage constants
export const EVOLUTION_STAGES = {
  BASE: 'BASE',
  MIDDLE: 'MIDDLE', 
  FINAL: 'FINAL',
  NONE: 'NONE'
}

// Special category constants
export const SPECIAL_CATEGORIES = {
  LEGENDARY: 'LEGENDARY',
  MYTHICAL: 'MYTHICAL',
  PSEUDO_LEGENDARY: 'PSEUDO_LEGENDARY',
  BABY: 'BABY',
  STARTER: 'STARTER',
  REGIONAL_FORM: 'REGIONAL_FORM',
  PARADOX: 'PARADOX',
  ULTRA_BEAST: 'ULTRA_BEAST',
  FOSSIL: 'FOSSIL',
  FORME: 'FORME'
}

/**
 * Parse evolution chain to determine Pokemon's evolution stage
 */
export const parseEvolutionChain = (chain, targetName) => {
  const evolutionChain = []
  
  const traverse = (node, level = 0) => {
    evolutionChain.push({ name: node.species.name, level })
    
    if (node.evolves_to) {
      node.evolves_to.forEach(evolution => traverse(evolution, level + 1))
    }
  }
  
  traverse(chain)
  
  // Find the target Pokemon's level
  const target = evolutionChain.find(pokemon => pokemon.name === targetName)
  if (!target) return EVOLUTION_STAGES.BASE
  
  // Get the maximum level in the chain
  const maxLevel = Math.max(...evolutionChain.map(p => p.level))
  
  // Determine stage based on level
  if (target.level === 0) return EVOLUTION_STAGES.BASE
  if (target.level === maxLevel) return EVOLUTION_STAGES.FINAL
  return EVOLUTION_STAGES.MIDDLE
}

/**
 * Check if Pokemon has evolutions
 */
export const hasEvolution = (chain) => {
  return chain.evolves_to && chain.evolves_to.length > 0
}

/**
 * Get evolution level (how many times Pokemon has evolved)
 */
export const getEvolutionLevel = (chain, targetName) => {
  const evolutionChain = []
  
  const traverse = (node, level = 0) => {
    evolutionChain.push({ name: node.species.name, level })
    if (node.evolves_to) {
      node.evolves_to.forEach(evolution => traverse(evolution, level + 1))
    }
  }
  
  traverse(chain)
  const target = evolutionChain.find(pokemon => pokemon.name === targetName)
  return target ? target.level : 0
}

/**
 * Get number of dots to display for evolution stage
 */
export const getEvolutionDots = (stage, hasEvolutions, evolutionLevel) => {
  if (!hasEvolutions) return 1 // No evolution = 1 outline dot
  if (stage === EVOLUTION_STAGES.BASE) return 1 // First form = 1 filled dot
  if (stage === EVOLUTION_STAGES.MIDDLE) return 2 // Evolved once = 2 dots
  if (stage === EVOLUTION_STAGES.FINAL) return evolutionLevel + 1 // Final = number of evolutions + 1
  return 1
}

/**
 * Get icon color for special categories
 */
export const getCategoryIconColor = (category) => {
  switch (category) {
    case SPECIAL_CATEGORIES.LEGENDARY:
      return 'text-orange-400'
    case SPECIAL_CATEGORIES.MYTHICAL:
      return 'text-purple-400'
    case SPECIAL_CATEGORIES.PSEUDO_LEGENDARY:
      return 'text-orange-400'
    case SPECIAL_CATEGORIES.BABY:
      return 'text-pink-400'
    case SPECIAL_CATEGORIES.STARTER:
      return 'text-green-400'
    case SPECIAL_CATEGORIES.REGIONAL_FORM:
      return 'text-blue-400'
    case SPECIAL_CATEGORIES.PARADOX:
      return 'text-red-400'
    case SPECIAL_CATEGORIES.ULTRA_BEAST:
      return 'text-indigo-400'
    case SPECIAL_CATEGORIES.FOSSIL:
      return 'text-yellow-600'
    case SPECIAL_CATEGORIES.FORME:
      return 'text-cyan-400'
    default:
      return 'text-gray-400'
  }
}

/**
 * Get SVG icon for special categories
 */
export const getCategoryIcon = (category) => {
  const iconColor = getCategoryIconColor(category)
  const isPseudo = category === SPECIAL_CATEGORIES.PSEUDO_LEGENDARY
  
  switch (category) {
    case SPECIAL_CATEGORIES.LEGENDARY:
    case SPECIAL_CATEGORIES.MYTHICAL:
    case SPECIAL_CATEGORIES.PSEUDO_LEGENDARY:
      return {
        className: `w-3 h-3 ${iconColor}`,
        fill: isPseudo ? "none" : "currentColor",
        stroke: isPseudo ? "currentColor" : "none",
        strokeWidth: isPseudo ? "1.5" : "0",
        viewBox: "0 0 20 20",
        path: "M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
      }
    case SPECIAL_CATEGORIES.BABY:
      return {
        className: `w-3 h-3 ${iconColor}`,
        fill: "currentColor",
        viewBox: "0 0 20 20",
        path: "M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 100-2 1 1 0 000 2zm6 0a1 1 0 100-2 1 1 0 000 2z"
      }
    case SPECIAL_CATEGORIES.STARTER:
      return {
        className: `w-3 h-3 ${iconColor}`,
        fill: "currentColor",
        viewBox: "0 0 20 20",
        path: "M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
      }
    case SPECIAL_CATEGORIES.REGIONAL_FORM:
      return {
        className: `w-3 h-3 ${iconColor}`,
        fill: "currentColor",
        viewBox: "0 0 20 20",
        path: "M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"
      }
    case SPECIAL_CATEGORIES.PARADOX:
      return {
        className: `w-3 h-3 ${iconColor}`,
        fill: "currentColor",
        viewBox: "0 0 20 20",
        path: "M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
      }
    case SPECIAL_CATEGORIES.ULTRA_BEAST:
      return {
        className: `w-3 h-3 ${iconColor}`,
        fill: "currentColor",
        viewBox: "0 0 20 20",
        path: "M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"
      }
    case SPECIAL_CATEGORIES.FOSSIL:
      return {
        className: `w-3 h-3 ${iconColor}`,
        fill: "currentColor",
        viewBox: "0 0 20 20",
        path: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
      }
    case SPECIAL_CATEGORIES.FORME:
      return {
        className: `w-3 h-3 ${iconColor}`,
        fill: "currentColor",
        viewBox: "0 0 20 20",
        path: "M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"
      }
    default:
      return {
        className: `w-3 h-3 ${iconColor}`,
        fill: "currentColor",
        viewBox: "0 0 20 20",
        path: "M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
      }
  }
} 