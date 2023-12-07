import React from 'react';
import style from "../../../styles/required-actions.module.css";
import { usePagination } from '../Pagination';
import { useEffect } from 'react';

const perPageItemset = [10,25,50,100,500];

const Show = ({show,setShow,change}) => {

  useEffect(()=>{
    setShow(perPageItemset[0]);
  },[])

  return (
    <div className={style.show_container}>
      <span className={style.show_label}>Show:</span>
      <select
        onChange={(e)=>setShow(Number(e.target.value))}
        className={`${style.show_field} ${change?style.white_bg:style.custom_bg}`}
        defaultValue={perPageItemset[0]}
      >
        {
          perPageItemset.map((itemCount, i)=>{
            return <option key={i} value={itemCount}>{itemCount}</option>
          })
        }
        {/* <option value={8}>8</option> */}
        {/* <option value={12}>12</option> */}
      </select>
    </div>
  );
};

export default Show;