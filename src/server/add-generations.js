import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { GENERATIONS } from '../constants/pokemon.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Generation ranges based on Pokemon ID (using data from constants)
const GENERATION_RANGES = {
  1: { start: 1, end: 151 },
  2: { start: 152, end: 251 },
  3: { start: 252, end: 386 },
  4: { start: 387, end: 493 },
  5: { start: 494, end: 649 },
  6: { start: 650, end: 721 },
  7: { start: 722, end: 809 },
  8: { start: 810, end: 898 },
  9: { start: 899, end: 1025 }
}

function getGeneration(id) {
  for (const [genNum, range] of Object.entries(GENERATION_RANGES)) {
    if (id >= range.start && id <= range.end) {
      const generation = GENERATIONS[genNum]
      return {
        id: parseInt(genNum),
        name: generation.name,
        region: generation.region
      }
    }
  }
  return { id: 1, name: GENERATIONS[1].name, region: GENERATIONS[1].region } // fallback
}

// Read the current database
const dbPath = path.join(__dirname, 'db.json')
const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'))

// Add generation data to each Pokemon
db.pokemon = db.pokemon.map(pokemon => {
  const generation = getGeneration(pokemon.id)
  return {
    ...pokemon,
    generation: generation.id,
    generationName: generation.name,
    region: generation.region
  }
})

// Write back to file
fs.writeFileSync(dbPath, JSON.stringify(db, null, 2))

console.log('Successfully added generation data to all Pokemon!')
console.log(`Updated ${db.pokemon.length} Pokemon entries`)

// Also copy to root for server access
const rootDbPath = path.join(__dirname, '..', '..', 'db.json')
fs.writeFileSync(rootDbPath, JSON.stringify(db, null, 2))
console.log('Copied updated database to root directory') 