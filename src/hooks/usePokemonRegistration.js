import { useState, useCallback } from 'react'

export const usePokemonRegistration = (addPokemon) => {
  const [newName, setNewName] = useState('')
  const [newType, setNewType] = useState([])
  const [newHP, setNewHP] = useState('')
  const [newAttack, setNewAttack] = useState('')
  const [newDefense, setNewDefense] = useState('')
  const [newSpAtk, setNewSpAtk] = useState('')
  const [newSpDef, setNewSpDef] = useState('')
  const [newSpeed, setNewSpeed] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState(null)

  // Handle type selection
  const handleTypeSelection = useCallback((type) => {
    if (newType.includes(type)) {
      setNewType(newType.filter(t => t !== type))
    } else if (newType.length < 3) {
      setNewType([...newType, type])
    }
  }, [newType])

  // Handle form submission
  const handleSubmit = useCallback(async (event) => {
    event.preventDefault()
    
    // Validation
    if (!newName.trim()) {
      setError('Pokemon name is required')
      return
    }
    
    if (newType.length === 0) {
      setError('At least one type is required')
      return
    }

    try {
      setIsSubmitting(true)
      setError(null)

      const pokemonData = {
        name: newName.trim(),
        type: newType.join('/'),
        hp: parseInt(newHP) || 0,
        attack: parseInt(newAttack) || 0,
        defense: parseInt(newDefense) || 0,
        spAtk: parseInt(newSpAtk) || 0,
        spDef: parseInt(newSpDef) || 0,
        speed: parseInt(newSpeed) || 0,
        evolutionStage: 'NONE',
        specialCategories: [],
        description: `A custom Pokemon named ${newName}.`
      }

      await addPokemon(pokemonData)
      
      // Reset form
      resetForm()
      
    } catch (err) {
      setError(err.message || 'Failed to create Pokemon')
    } finally {
      setIsSubmitting(false)
    }
  }, [newName, newType, newHP, newAttack, newDefense, newSpAtk, newSpDef, newSpeed, addPokemon])

  // Reset form to initial state
  const resetForm = useCallback(() => {
    setNewName('')
    setNewType([])
    setNewHP('')
    setNewAttack('')
    setNewDefense('')
    setNewSpAtk('')
    setNewSpDef('')
    setNewSpeed('')
    setError(null)
  }, [])

  // Clear error
  const clearError = useCallback(() => {
    setError(null)
  }, [])

  return {
    // Form state
    newName,
    newType,
    newHP,
    newAttack,
    newDefense,
    newSpAtk,
    newSpDef,
    newSpeed,
    isSubmitting,
    error,
    
    // Actions
    setNewName,
    setNewType,
    setNewHP,
    setNewAttack,
    setNewDefense,
    setNewSpAtk,
    setNewSpDef,
    setNewSpeed,
    handleTypeSelection,
    handleSubmit,
    resetForm,
    clearError,
    
    // Computed
    isValid: newName.trim() && newType.length > 0,
    typeCount: newType.length
  }
} 