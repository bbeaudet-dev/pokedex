import React from 'react'

const EvolutionStageIcon = ({ 
  stage, 
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
  
  const dotSizes = {
    sm: 'w-1 h-1',
    md: 'w-1.5 h-1.5',
    lg: 'w-2 h-2'
  }
  
  const baseClasses = `${sizes[size]} rounded-full border-2 cursor-pointer flex items-center justify-center transition-all duration-200`
  const dotClasses = `${dotSizes[size]} rounded-full bg-white`
  
  const classes = `${baseClasses} ${className} ${
    selected 
      ? 'border-green-400 bg-green-400/20 scale-110' 
      : 'border-gray-400 hover:border-gray-300 hover:scale-105'
  }`
  
  const getDots = (stage) => {
    switch (stage) {
      case 'BASE':
        return 1
      case 'MIDDLE':
        return 2
      case 'FINAL':
        return 3
      default:
        return 0
    }
  }
  
  const dots = getDots(stage)
  
  const handleClick = () => {
    if (onClick) {
      onClick(stage)
    }
  }
  
  return (
    <button
      className={classes}
      onClick={handleClick}
      title={stage}
      type="button"
      {...props}
    >
      <div className="flex items-center justify-center gap-0.5">
        {Array.from({ length: dots }, (_, i) => (
          <div key={i} className={dotClasses} />
        ))}
      </div>
    </button>
  )
}

export default EvolutionStageIcon 