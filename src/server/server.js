import express from 'express'
import cors from 'cors'
import fs from 'fs'

const app = express()
const port = 3333
app.use(cors())
app.use(express.json())

// GET all Pokemon entries
app.get('/pokemon', (request, response) => {
    const database  = JSON.parse(fs.readFileSync('db.json')).pokemon
    response.send(database)
    console.log('All entries sent to client:', database)
})

// GET one Pokemon entry by id
app.get('/pokemon/:id', (request, response) => {
    const database = JSON.parse(fs.readFileSync('db.json')).pokemon
    const pokemon = database.find(pokemon => pokemon.id === parseInt(request.params.id))
    if (pokemon) {
        response.send(pokemon)
    } else {
        response.status(404).send('Pokemon not found')
    }
    console.log('Entry',request.params.id,'sent to client:',pokemon)
})

// POST new Pokemon entry
app.post('/pokemon', (request, response) => {
    const existingDatabase = JSON.parse(fs.readFileSync('db.json')).pokemon
    const newEntryData = request.body
    const newPokemon = {
        id: existingDatabase.length + 1,
        name: newEntryData.name,
        type: newEntryData.type
    }
    const newDatabase = JSON.stringify({ pokemon: [...existingDatabase, newPokemon] })
    fs.writeFileSync('db.json', newDatabase)
    console.log('Added new entry:',newPokemon)
    response.status(201).send(newPokemon)
})

// PUT update Pokemon entry
app.put('/pokemon/:id', (request, response) => {
    const database = JSON.parse(fs.readFileSync('db.json')).pokemon
    const pokemonId = parseInt(request.params.id)
    const pokemonIndex = database.findIndex(pokemon => pokemon.id === pokemonId)
    
    if (pokemonIndex === -1) {
        return response.status(404).send('Pokemon not found')
    }
    
    const updatedPokemon = {
        ...database[pokemonIndex],
        ...request.body,
        id: pokemonId // Ensure ID doesn't change
    }
    
    database[pokemonIndex] = updatedPokemon
    fs.writeFileSync('db.json', JSON.stringify({ pokemon: database }))
    response.send(updatedPokemon)
    console.log('Updated entry:',updatedPokemon)
})

// DELETE Pokemon entry
app.delete('/pokemon/:id', (request, response) => {
    const database = JSON.parse(fs.readFileSync('db.json')).pokemon
    const pokemonId = parseInt(request.params.id)
    const filteredDatabase = database.filter(pokemon => pokemon.id !== pokemonId)
    
    if (filteredDatabase.length === database.length) {
        return response.status(404).send('Pokemon not found')
    }
    console.log('Deleted entry:',filteredDatabase)
    fs.writeFileSync('db.json', JSON.stringify({ pokemon: filteredDatabase }))
    response.status(204).send()
})

app.listen(port, () => console.log(`Server running on port ${port}`))