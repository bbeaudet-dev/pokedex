import { TYPES } from '../constants/types'

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