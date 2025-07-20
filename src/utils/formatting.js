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
 * Format Pokemon types for display
 */
export const formatTypes = (types) => {
  if (Array.isArray(types)) {
    return types.map(formatTypeName).join(' / ')
  }
  return formatTypeName(types)
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

/**
 * Format height for display
 */
export const formatHeight = (height) => {
  if (height === null || height === undefined) return 'Unknown'
  return `${height}m`
}

/**
 * Format weight for display
 */
export const formatWeight = (weight) => {
  if (weight === null || weight === undefined) return 'Unknown'
  return `${weight}kg`
} 