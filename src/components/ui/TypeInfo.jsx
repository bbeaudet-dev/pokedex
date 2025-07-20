import React from 'react'
import { TYPES } from '../../constants'
import { getTypeInfo, getTypeDescription } from '../../utils'

const TypeInfo = ({ type, showDescription = false, className = '' }) => {
  const typeInfo = getTypeInfo(type)
  
  if (!typeInfo) {
    return <span className="text-gray-500">Unknown type</span>
  }
  
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <img 
        src={typeInfo.icon} 
        alt={typeInfo.name}
        className="w-4 h-4"
      />
      <span 
        className="font-medium"
        style={{ color: typeInfo.color }}
      >
        {typeInfo.name}
      </span>
      {showDescription && (
        <span className="text-sm text-gray-600">
          {typeInfo.description}
        </span>
      )}
    </div>
  )
}

export default TypeInfo 