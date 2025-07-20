import React from 'react'
import Checkbox from './Checkbox'

const CheckboxList = ({ 
  title,
  items,
  selectedItems,
  onItemChange,
  className = '',
  titleClassName = ''
}) => {
  return (
    <div className={`mt-4 ${className}`}>
      <div className={`font-bold text-white mb-2 ${titleClassName}`}>
        {title}
      </div>
      <div className="space-y-1">
        {items.map(item => (
          <Checkbox
            key={item.key}
            checked={selectedItems.includes(item.key)}
            onChange={(e) => onItemChange(item.key, e.target.checked)}
            label={item.label}
            className="text-white"
          />
        ))}
      </div>
    </div>
  )
}

export default CheckboxList 