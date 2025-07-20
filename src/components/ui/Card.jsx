import React from 'react'

const Card = ({ 
  children, 
  className = '', 
  variant = 'dark',
  padding = 'md',
  ...props 
}) => {
  const variants = {
    dark: 'bg-pokedex-dark',
    gray: 'bg-pokedex-gray text-white'
  }
  
  const paddings = {
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-5'
  }
  
  const classes = `${variants[variant]} ${paddings[padding]} rounded-lg ${className}`
  
  return (
    <div className={classes} {...props}>
      {children}
    </div>
  )
}

export default Card 