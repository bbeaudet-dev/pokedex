import React from 'react'
import { getCategoryIcon } from '../../utils/evolutionDisplay'

const CategoryIcon = ({ category }) => {
  const iconData = getCategoryIcon(category)
  
  return (
    <div className="flex items-center justify-center" title={category}>
      <svg 
        className={iconData.className}
        fill={iconData.fill}
        stroke={iconData.stroke}
        strokeWidth={iconData.strokeWidth}
        viewBox={iconData.viewBox}
      >
        <path d={iconData.path} />
      </svg>
    </div>
  )
}

export default CategoryIcon 