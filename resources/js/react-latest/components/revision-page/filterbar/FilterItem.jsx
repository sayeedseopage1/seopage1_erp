import React from 'react'
import styles from '../../../styles/filterbar.module.css';
import { } from 'react-use';

const FilterItem = ({children, id, renderOn=""}) => {

  return (
    <div
      id={id}
      className={`
          ${styles.filterItem}
          ${renderOn === 'EXPAND_MENU' ? styles.extendFilterItem: ''}
      `}
    >
        {children}
    </div>
  )
}

export default FilterItem
