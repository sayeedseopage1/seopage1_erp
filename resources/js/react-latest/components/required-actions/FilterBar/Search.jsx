import React, { useEffect, useRef, useState } from 'react';
import style from '../../../styles/required-actions.module.css'
import { AiOutlineSearch } from 'react-icons/ai'

const Search = ({search,setSearch,change}) => {
  // const [text,setText] = useState('');
  // const TimeOutRef = useRef();

  // useEffect(()=>{
  //   if (text) {
  //     if (TimeOutRef.current) {
  //       clearTimeout(TimeOutRef.current);
  //       TimeOutRef.current = null;
  //     };
  //     TimeOutRef.current = setTimeout(() => {
  //       setSearch(text);
  //       TimeOutRef.current = null;
  //     }, 1000);
  //     setSearch(text);
  //   }
  // },[text])

  return (
    <div className={style.search_bar}>
      <AiOutlineSearch className={style.search_icon} />
      <input
        value={search}
        placeholder='Search Project what you need'
        type="text"
        onChange={(e)=>setSearch(e.target.value)}
        className={change?style.white_bg:style.custom_bg}
        />
    </div>
  );
};

export default Search;