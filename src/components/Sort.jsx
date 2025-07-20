import React from 'react'
import { TypeIcon, Button, Checkbox, Card, SectionHeader, CheckboxList } from './ui'
import { 
  POKEMON_TYPES, 
  EVOLUTION_STAGES, 
  SPECIAL_CATEGORIES,
  EVOLUTION_STAGE_NAMES,
  SPECIAL_CATEGORY_NAMES,
  GENERATIONS
} from '../constants'



const Sort = ({ 
  selectedTypes, 
  setSelectedTypes, 
  exactMatch, 
  setExactMatch,
  filterEvolutionStages,
  setFilterEvolutionStages,
  filterSpecialCategories,
  setFilterSpecialCategories,
  filterGenerations,
  setFilterGenerations
}) => {
  const handleTypeSelection = (type) => {
    if (exactMatch) {
      // In exact match mode, limit to 3 types
      if (selectedTypes.includes(type)) {
        setSelectedTypes(selectedTypes.filter(t => t !== type))
      } else if (selectedTypes.length < 3) {
        setSelectedTypes([...selectedTypes, type])
      }
    } else {
      // In partial match mode, allow unlimited types
      if (selectedTypes.includes(type)) {
        setSelectedTypes(selectedTypes.filter(t => t !== type))
      } else {
        setSelectedTypes([...selectedTypes, type])
      }
    }
  }

  const handleExactMatchChange = (e) => {
    setExactMatch(e.target.checked)
    if (e.target.checked && selectedTypes.length > 3) {
      setSelectedTypes([])
    }
  }

  return (
    <Card variant="gray" className="flex flex-col ">
      <SectionHeader size="md">
        Sort & Filter
      </SectionHeader>
      
      <div className="flex items-center justify-between gap-4">
        <Checkbox
          checked={exactMatch}
          onChange={handleExactMatchChange}
          label="Exact Match"
          className="text-white"
        />
        
        <Button
          variant="secondary"
          size="sm"
          onClick={() => setSelectedTypes([])}
        >
          Clear Selections
        </Button>
      </div>
      
      {/* Type Selection */}
      <div className="grid grid-cols-6  py-1 bg-pokedex-gray rounded-lg justify-items-center">
        {POKEMON_TYPES.map(type => (
          <TypeIcon
            key={type}
            type={type}
            selected={selectedTypes.includes(type)}
            onClick={handleTypeSelection}
          />
        ))}
      </div>
      
      {/* Evolution Stage Filter */}
      <CheckboxList
        title="Evolution Stage"
        items={Object.keys(EVOLUTION_STAGES).map(stage => ({
          key: stage,
          label: EVOLUTION_STAGE_NAMES[stage]
        }))}
        selectedItems={filterEvolutionStages}
        onItemChange={(key, checked) => {
          setFilterEvolutionStages(f =>
            checked
              ? [...f, key]
              : f.filter(s => s !== key)
          )
        }}
      />
      
      {/* Special Category Filter */}
      <CheckboxList
        title="Special Category"
        items={Object.keys(SPECIAL_CATEGORIES).map(cat => ({
          key: cat,
          label: SPECIAL_CATEGORY_NAMES[cat]
        }))}
        selectedItems={filterSpecialCategories}
        onItemChange={(key, checked) => {
          setFilterSpecialCategories(f =>
            checked
              ? [...f, key]
              : f.filter(c => c !== key)
          )
        }}
      />
      
      {/* Generation Filter */}
      <CheckboxList
        title="Generation"
        items={Object.keys(GENERATIONS).map(gen => ({
          key: parseInt(gen),
          label: `${GENERATIONS[gen].displayName} (${GENERATIONS[gen].region})`
        }))}
        selectedItems={filterGenerations}
        onItemChange={(key, checked) => {
          setFilterGenerations(f =>
            checked
              ? [...f, key]
              : f.filter(g => g !== key)
          )
        }}
      />
    </Card>
  )
}

export default Sort 