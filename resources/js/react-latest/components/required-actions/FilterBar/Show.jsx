import React from 'react';
import style from "../../../styles/required-actions.module.css";
import { usePagination } from '../Pagination';

const Show = ({show,setShow,change}) => {
  const {setPerPageItem} = usePagination();

  return (
    <div className={style.show_container}>
      <span className={style.show_label}>Show:</span>
      <select
        onChange={(e)=>setPerPageItem(e.target.value)}
        className={`${style.show_field} ${change?style.white_bg:style.custom_bg}`}
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