import React from 'react'
import { TYPES } from '../../constants'
import { formatTypeName } from '../../utils'

const TypeIcon = ({ 
  type, 
  selected = false, 
  onClick, 
  size = 'md',
  className = '',
  showTooltip = true,
  ...props 
}) => {
  const sizes = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  }
  
  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8'
  }
  
  const circleSizes = {
    sm: 'w-7 h-7',
    md: 'w-10 h-10',
    lg: 'w-14 h-14'
  }
  
  const baseClasses = `${sizes[size]} rounded-full border-none cursor-pointer p-0 relative bg-transparent flex items-center justify-center transition-transform duration-200`
  const circleClasses = `${circleSizes[size]} rounded-full flex items-center justify-center relative z-10`
  const iconClasses = `${iconSizes[size]} block mx-auto`
  
  const classes = `${baseClasses} ${className}`
  
  const handleClick = () => {
    if (onClick) {
      onClick(type)
    }
  }
  
  // Get the type color from TYPES object
  const typeColor = TYPES[type]?.color || '#888888'
  
  return (
    <button
      className={`${classes} ${selected ? 'scale-110' : 'hover:scale-105'}`}
      onClick={handleClick}
      title={showTooltip ? formatTypeName(type) : ''}
      type="button"
      style={{
        '--type-color': typeColor
      }}
      {...props}
    >
      <span 
        className={circleClasses}
        style={{ backgroundColor: typeColor }}
      >
        <img 
          className={`${iconClasses} object-contain`}
          src={TYPES[type]?.icon} 
          alt={type} 
          style={{ maxWidth: '100%', maxHeight: '100%' }}
          onError={(e) => {
            console.error(`Failed to load icon for type ${type}:`, e.target.src)
            e.target.style.display = 'none'
          }}
        />
      </span>
      {selected && (
        <div className="absolute inset-0 rounded-full bg-green-400/35 animate-pulse shadow-lg shadow-green-400 -z-10" />
      )}
    </button>
  )
}

export default TypeIcon 