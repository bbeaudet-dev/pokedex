import React from 'react'

const Checkbox = ({ 
  checked = false, 
  onChange, 
  label = '', 
  disabled = false,
  className = '',
  required = false,
  ...props 
}) => {
  const baseClasses = 'flex items-center'
  const checkboxClasses = 'w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded-lg focus:ring-blue-500 focus:ring-2 disabled:opacity-50 disabled:cursor-not-allowed'
  const labelClasses = 'ml-2 text-sm font-medium text-white'
  
  const classes = `${baseClasses} ${className}`
  
  return (
    <label className={classes}>
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        required={required}
        className={checkboxClasses}
        {...props}
      />
      {label && (
        <span className={labelClasses}>
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </span>
      )}
    </label>
  )
}

export default Checkbox 