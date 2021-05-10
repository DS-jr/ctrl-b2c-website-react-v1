import React from 'react'
import cn from 'classnames'
import Icon from '../Icon'

import './Feature.scss'

function Feature({ icon, title, info, rtl, onMouseEnter, isActive }) {
  return (
    <div className={cn('Feature', { 'Feature-rtl': rtl, 'Feature-active': isActive })} onMouseEnter={onMouseEnter}>
      <div className="Feature-icon">
        <Icon name={icon} />
      </div>
      <div className="Feature-title">
        {title}
      </div>
      <div className="Feature-info">
        {info}
      </div>
    </div>
  )
}

export default Feature
