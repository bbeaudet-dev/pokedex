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