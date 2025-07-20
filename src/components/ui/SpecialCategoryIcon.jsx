import React from 'react'

const SpecialCategoryIcon = ({ 
  category, 
  selected = false, 
  onClick, 
  size = 'md',
  className = '',
  ...props 
}) => {
  const sizes = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-10 h-10'
  }
  
  const baseClasses = `${sizes[size]} rounded-full border-2 cursor-pointer flex items-center justify-center transition-all duration-200`
  
  const classes = `${baseClasses} ${className} ${
    selected 
      ? 'border-yellow-400 bg-yellow-400/20 scale-110' 
      : 'border-gray-400 hover:border-yellow-300 hover:scale-105'
  }`
  
  const getStarColor = (category) => {
    switch (category) {
      case 'LEGENDARY':
        return 'text-yellow-400'
      case 'MYTHICAL':
        return 'text-purple-400'
      case 'PSEUDO_LEGENDARY':
        return 'text-orange-400'
      default:
        return 'text-gray-400'
    }
  }
  
  const starColor = getStarColor(category)
  
  const handleClick = () => {
    if (onClick) {
      onClick(category)
    }
  }
  
  return (
    <button
      className={classes}
      onClick={handleClick}
      title={category}
      type="button"
      {...props}
    >
      <svg 
        className={`w-4 h-4 ${starColor}`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    </button>
  )
}

export default SpecialCategoryIcon 