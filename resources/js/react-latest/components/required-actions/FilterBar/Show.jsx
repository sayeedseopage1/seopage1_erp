import React from 'react';
import style from "../../../styles/required-actions.module.css";

const Show = ({show,setShow}) => {

  return (
    <div className={style.show_container}>
      <span className={style.show_label}>Show:</span>
      <select
        onChange={(e)=>setShow(e.target.value)}
        className={style.show_field}
        defaultValue={6}
      >
        <option value={6}>6</option>
        <option value={8}>8</option>
        <option value={12}>12</option>
      </select>
    </div>
  );
};

export default Show;