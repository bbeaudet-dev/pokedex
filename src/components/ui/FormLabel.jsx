import React from 'react'

const FormLabel = ({ 
  children, 
  className = '', 
  required = false,
  ...props 
}) => {
  const classes = `text-blue-300 font-semibold min-w-20 text-right ${className}`
  
  return (
    <label className={classes} {...props}>
      {children}
      {required && <span className="text-red-400 ml-1">*</span>}
    </label>
  )
}

export default FormLabel 