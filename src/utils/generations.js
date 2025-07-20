import { GENERATIONS } from '../constants/generations'

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