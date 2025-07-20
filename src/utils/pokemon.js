import { TYPES, GENERATIONS } from '../constants'

/**
 * Capitalize the first letter of a string
 */
export const capitalize = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

/**
 * Format a Pokemon type name for display
 */
export const formatTypeName = (type) => {
  return capitalize(type)
}

/**
 * Get the color for a Pokemon type
 */
export const getTypeColor = (type) => {
  return TYPES[type]?.color || '#888888'
}

/**
 * Check if a type is valid
 */
export const isValidType = (type) => {
  return type in TYPES
}

/**
 * Parse Pokemon types from a string (e.g., "fire/water")
 */
export const parseTypes = (typeString) => {
  if (!typeString) return []
  return typeString.split('/').filter(isValidType)
}

/**
 * Format Pokemon types for display
 */
export const formatTypes = (types) => {
  if (Array.isArray(types)) {
    return types.map(formatTypeName).join(' / ')
  }
  return formatTypeName(types)
}

/**
 * Get Pokemon image URL from name
 */
export const getPokemonImageUrl = (name) => {
  // Handle special cases where names don't match PokeAPI format
  const nameMap = {
    'nidoran♀': 'nidoran-f',
    'nidoran♂': 'nidoran-m',
    'mr. mime': 'mr-mime',
    'mime jr.': 'mime-jr',
    'porygon-z': 'porygon-z',
    'ho-oh': 'ho-oh',
    'jangmo-o': 'jangmo-o',
    'hakamo-o': 'hakamo-o',
    'kommo-o': 'kommo-o',
    'type: null': 'type-null',
    'porygon-z': 'porygon-z'
  }
  
  const normalizedName = nameMap[name.toLowerCase()] || name.toLowerCase()
  return `https://pokeapi.co/api/v2/pokemon/${normalizedName}/`
}

/**
 * Get Pokemon cry URL from name
 */
export const getPokemonCryUrl = (name) => {
  return `https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}/`
}

/**
 * Get type information by type key
 */
export const getTypeInfo = (type) => {
  return TYPES[type] || null
}

/**
 * Get all type names
 */
export const getTypeNames = () => {
  return Object.values(TYPES).map(type => type.name)
}

/**
 * Get type description
 */
export const getTypeDescription = (type) => {
  return TYPES[type]?.description || 'No description available.'
}

/**
 * Get generation information by generation number
 */
export const getGenerationInfo = (generationId) => {
  return GENERATIONS[generationId] || null
}

/**
 * Get all generation IDs
 */
export const getGenerationIds = () => {
  return Object.keys(GENERATIONS).map(Number)
}

/**
 * Get all generation objects
 */
export const getAllGenerations = () => {
  return Object.values(GENERATIONS)
}

/**
 * Get generation display name by ID
 */
export const getGenerationDisplayName = (generationId) => {
  return GENERATIONS[generationId]?.displayName || `Gen ${generationId}`
}

/**
 * Get generation region by ID
 */
export const getGenerationRegion = (generationId) => {
  return GENERATIONS[generationId]?.region || 'Unknown'
}

/**
 * Format Pokemon name for display
 */
export const formatPokemonName = (name) => {
  if (!name) return ''
  
  // Special cases that need specific formatting
  const specialCases = {
    'mr mime': 'Mr. Mime',
    'mr. mime': 'Mr. Mime',
    'mime jr': 'Mime Jr.',
    'mime jr.': 'Mime Jr.',
    'ho oh': 'Ho-Oh',
    'ho-oh': 'Ho-Oh',
    'porygon z': 'Porygon-Z',
    'porygon-z': 'Porygon-Z',
    'jangmo o': 'Jangmo-o',
    'jangmo-o': 'Jangmo-o',
    'hakamo o': 'Hakamo-o',
    'hakamo-o': 'Hakamo-o',
    'kommo o': 'Kommo-o',
    'kommo-o': 'Kommo-o',
    'type null': 'Type: Null',
    'type: null': 'Type: Null',
    'type:null': 'Type: Null',
    'nidoran♀': 'Nidoran♀',
    'nidoran♂': 'Nidoran♂',
    'farfetchd': 'Farfetch\'d',
    'farfetch\'d': 'Farfetch\'d',
    'sirfetchd': 'Sirfetch\'d',
    'sirfetch\'d': 'Sirfetch\'d'
  }
  
  const lowerName = name.toLowerCase()
  
  // Check for special cases first
  if (specialCases[lowerName]) {
    return specialCases[lowerName]
  }
  
  // Handle Iron Pokemon (keep hyphen)
  if (lowerName.startsWith('iron-')) {
    return name
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join('-')
  }
  
  // Default formatting: replace hyphens with spaces and capitalize
  return name
    .replace(/-/g, ' ')
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ')
} 