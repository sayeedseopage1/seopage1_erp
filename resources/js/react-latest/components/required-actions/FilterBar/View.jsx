import React from 'react';
import style from '../../../styles/required-actions.module.css'

const View = ({view,setView}) => {

  return (
    <div className={style.view_container}>
      <span className={style.view_label}>View:</span>
      <select
        onChange={(e)=>setView(e.target.value)}
        className={style.view_field}
        defaultValue={'ALL'}
      >
        <option value={'all'}>ALL</option>
        <option value={'--'}>--</option>
        <option value={'---'}>---</option>
      </select>
    </div>
  );
};

export default View;