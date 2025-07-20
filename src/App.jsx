import Header from './components/Header'
import Sort from './components/Sort'
import Register from './components/Register'
import Entries from './components/Entries'
import { usePokemon, usePokemonFilters, usePokemonRegistration } from './hooks'

function App() {
  // Use custom hooks for state management
  const pokemonData = usePokemon()
  const filterData = usePokemonFilters(pokemonData.entries)
  const registrationData = usePokemonRegistration(pokemonData.addPokemon)

  // Set document title once
  document.title = "Ben's Pokedex"

  // Enhanced Pokemon click handler that plays cry
  const handlePokemonClickWithCry = (pokemon) => {
    filterData.handlePokemonClick(pokemon)
    if (filterData.expandedPokemon !== pokemon.name) {
      pokemonData.playPokemonCry(pokemon.name)
    }
  }

  // Show loading state
  if (pokemonData.loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="text-2xl font-bold text-gray-700">Loading Pokemon data...</div>
      </div>
    )
  }

  // Show error state
  if (pokemonData.error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="text-2xl font-bold text-red-600">Error loading Pokemon data</div>
        <div className="text-gray-600 mt-2">{pokemonData.error}</div>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-0">
      <div className="bg-pokedex-red rounded-3xl shadow-2xl p-0 flex flex-col items-stretch mx-4 lg:mx-8 mt-4 mb-8 w-full max-w-7xl">
        <Header />
        
        <div className="flex gap-4 lg:gap-8 p-4 lg:p-8 items-stretch">
          <div className="flex-1 min-w-0">
            <Entries 
              filteredEntries={filterData.filteredEntries}
              pokemonImages={pokemonData.pokemonImages}
              selectedTypes={filterData.selectedTypes}
              expandedPokemon={filterData.expandedPokemon}
              onPokemonClick={handlePokemonClickWithCry}
            />
          </div>
          
          <div className="w-64 lg:w-80 flex flex-col gap-4 lg:gap-8">
            <Sort 
              selectedTypes={filterData.selectedTypes}
              setSelectedTypes={filterData.setSelectedTypes}
              exactMatch={filterData.exactMatch}
              setExactMatch={filterData.setExactMatch}
              filterEvolutionStages={filterData.filterEvolutionStages}
              setFilterEvolutionStages={filterData.setFilterEvolutionStages}
              filterSpecialCategories={filterData.filterSpecialCategories}
              setFilterSpecialCategories={filterData.setFilterSpecialCategories}
              filterGenerations={filterData.filterGenerations}
              setFilterGenerations={filterData.setFilterGenerations}
            />
            
            <Register 
              newName={registrationData.newName}
              setNewName={registrationData.setNewName}
              newType={registrationData.newType}
              setNewType={registrationData.setNewType}
              newHP={registrationData.newHP}
              setNewHP={registrationData.setNewHP}
              newAttack={registrationData.newAttack}
              setNewAttack={registrationData.setNewAttack}
              newDefense={registrationData.newDefense}
              setNewDefense={registrationData.setNewDefense}
              newSpAtk={registrationData.newSpAtk}
              setNewSpAtk={registrationData.setNewSpAtk}
              newSpDef={registrationData.newSpDef}
              setNewSpDef={registrationData.setNewSpDef}
              newSpeed={registrationData.newSpeed}
              setNewSpeed={registrationData.setNewSpeed}
              onSubmit={registrationData.handleSubmit}
              isSubmitting={registrationData.isSubmitting}
              error={registrationData.error}
              onClearError={registrationData.clearError}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default App