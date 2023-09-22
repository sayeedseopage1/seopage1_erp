import React from 'react'
import styles from '../../styles/filterbar.module.css';
import { } from 'react-use';

const FilterItem = ({children, id, renderOn=""}) => {

  return (
    <div 
      id={id} 
      className={`
          ${styles.filterbar_item} 
          ${renderOn === 'EXPAND_MENU' ? styles.expande_menu_item : ''}
      `}
    >
        {children}
    </div>
  )
}

export default FilterItem