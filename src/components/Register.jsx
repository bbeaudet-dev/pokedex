import React from 'react'
import { TypeIcon, Button, Input, Card, SectionHeader, FormLabel } from './ui'
import { POKEMON_TYPES } from '../constants'



const Register = ({ 
  newName, 
  setNewName, 
  newType, 
  setNewType,
  newHP,
  setNewHP,
  newAttack,
  setNewAttack,
  newDefense,
  setNewDefense,
  newSpAtk,
  setNewSpAtk,
  newSpDef,
  setNewSpDef,
  newSpeed,
  setNewSpeed,
  onSubmit,
  isSubmitting = false,
  error = null,
  onClearError = () => {}
}) => {
  const handleTypeSelection = (type) => {
    if (newType.includes(type)) {
      setNewType(newType.filter(t => t !== type))
    } else if (newType.length < 3) {
      setNewType([...newType, type])
    }
  }

  return (
    <Card variant="gray" padding="lg">
      <SectionHeader size="md">
        Register New Pokemon
      </SectionHeader>
      
      <form onSubmit={onSubmit}>
        <div className="flex items-center gap-4 mb-4">
          <FormLabel>
            Name:
          </FormLabel>
          <Input 
            value={newName} 
            onChange={(e) => setNewName(e.target.value)} 
            placeholder="Pokemon name"
            className="w-48"
          />
        </div>
        
        <div className="flex items-center gap-4 mb-4">
          <FormLabel>
            Type(s):
          </FormLabel>
          <div className="grid grid-cols-6 gap-2 p-4 bg-pokedex-gray rounded-lg justify-items-end">
                              {POKEMON_TYPES.map(type => (
                    <TypeIcon
                      key={type}
                      type={type}
                      selected={newType.includes(type)}
                      onClick={handleTypeSelection}
                    />
                  ))}
          </div>
        </div>
        
        <div className="flex items-center gap-4 mb-4">
          <FormLabel>
            HP:
          </FormLabel>
          <input 
            type="number" 
            min="0" 
            max="1000" 
            value={newHP} 
            onChange={e => setNewHP(e.target.value)}
            placeholder="0"
            className="px-3 py-2 rounded border border-gray-600 bg-gray-700 text-white w-16 text-left focus:border-blue-500 focus:outline-none"
          />
          <FormLabel>
            Attack:
          </FormLabel>
          <input 
            type="number" 
            min="0" 
            max="1000" 
            value={newAttack} 
            onChange={e => setNewAttack(e.target.value)}
            placeholder="0"
            className="px-3 py-2 rounded border border-gray-600 bg-gray-700 text-white w-16 text-left focus:border-blue-500 focus:outline-none"
          />
          <FormLabel>
            Defense:
          </FormLabel>
          <input 
            type="number" 
            min="0" 
            max="1000" 
            value={newDefense} 
            onChange={e => setNewDefense(e.target.value)}
            placeholder="0"
            className="px-3 py-2 rounded border border-gray-600 bg-gray-700 text-white w-16 text-left focus:border-blue-500 focus:outline-none"
          />
        </div>
        
        <div className="flex items-center gap-4 mb-4">
          <FormLabel>
            Sp. Atk:
          </FormLabel>
          <input 
            type="number" 
            min="0" 
            max="1000" 
            value={newSpAtk} 
            onChange={e => setNewSpAtk(e.target.value)}
            placeholder="0"
            className="px-3 py-2 rounded border border-gray-600 bg-gray-700 text-white w-16 text-left focus:border-blue-500 focus:outline-none"
          />
          <FormLabel>
            Sp. Def:
          </FormLabel>
          <input 
            type="number" 
            min="0" 
            max="1000" 
            value={newSpDef} 
            onChange={e => setNewSpDef(e.target.value)}
            placeholder="0"
            className="px-3 py-2 rounded border border-gray-600 bg-gray-700 text-white w-16 text-left focus:border-blue-500 focus:outline-none"
          />
          <FormLabel>
            Speed:
          </FormLabel>
          <input 
            type="number" 
            min="0" 
            max="1000" 
            value={newSpeed} 
            onChange={e => setNewSpeed(e.target.value)}
            placeholder="0"
            className="px-3 py-2 rounded border border-gray-600 bg-gray-700 text-white w-16 text-left focus:border-blue-500 focus:outline-none"
          />
        </div>
        
        {error && (
          <div className="text-red-400 text-sm mt-2 p-2 bg-red-900 bg-opacity-20 rounded">
            {error}
            <button 
              onClick={onClearError}
              className="ml-2 text-red-300 hover:text-red-100"
            >
              ×
            </button>
          </div>
        )}
        
        <Button 
          type="submit"
          variant="success"
          className="mt-4"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Creating...' : 'Register New Pokemon'}
        </Button>
      </form>
    </Card>
  )
}

export default Register 