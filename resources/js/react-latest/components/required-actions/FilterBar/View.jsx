import React from 'react';
import style from '../../../styles/required-actions.module.css'

const View = ({view,setView,change}) => {

  return (
    <div className={style.view_container}>
      <span className={style.view_label}>View:</span>
      <select
        value={view}
        onChange={(e)=>setView(e.target.value)}
        className={`${style.view_field} ${change?style.white_bg:style.custom_bg}`}
        // defaultValue={'ALL'}
      >
        <option value={'all'}>ALL</option>
        <option value={'--'}>--</option>
        <option value={'---'}>---</option>
      </select>
    </div>
  );
};

export default View;