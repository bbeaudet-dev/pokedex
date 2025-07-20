import React from 'react'

const ScrollableContainer = ({ 
  children, 
  className = '', 
  variant = 'default',
  maxHeight = 'auto',
  ...props 
}) => {
  const variants = {
    default: {
      '--scrollbar-width': '8px',
      '--scrollbar-track': '#e5e7eb',
      '--scrollbar-thumb': '#9ca3af',
      '--scrollbar-thumb-hover': '#6b7280'
    },
    dark: {
      '--scrollbar-width': '8px',
      '--scrollbar-track': '#1f2937',
      '--scrollbar-thumb': '#4b5563',
      '--scrollbar-thumb-hover': '#6b7280'
    },
    light: {
      '--scrollbar-width': '8px',
      '--scrollbar-track': '#f3f4f6',
      '--scrollbar-thumb': '#d1d5db',
      '--scrollbar-thumb-hover': '#9ca3af'
    }
  }
  
  const baseClasses = 'overflow-y-auto'
  const classes = `${baseClasses} ${className}`
  
  const scrollbarStyles = {
    scrollbarWidth: 'thin',
    ...variants[variant],
    ...(maxHeight !== 'auto' ? { maxHeight } : {})
  }
  
  return (
    <div 
      className={classes} 
      style={scrollbarStyles} 
      {...props}
    >
      {children}
    </div>
  )
}

export default ScrollableContainer 