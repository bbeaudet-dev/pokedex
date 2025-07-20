import React from 'react'

const SectionHeader = ({ 
  children, 
  className = '', 
  size = 'lg',
  ...props 
}) => {
  const sizes = {
    sm: 'text-lg',
    md: 'text-xl', 
    lg: 'text-2xl'
  }
  
  const classes = `${sizes[size]} font-bold text-white mb-4 border-b-2 border-blue-500 pb-2 ${className}`
  
  return (
    <h2 className={classes} {...props}>
      {children}
    </h2>
  )
}

export default SectionHeader 