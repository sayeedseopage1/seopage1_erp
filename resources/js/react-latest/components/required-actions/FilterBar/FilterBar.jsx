import React, { useEffect, useState } from 'react';
import style from "../../../styles/required-actions.module.css";
import Search from './Search';
import Show from './Show';
import DateField from './DateField';
import View from './View';

const FilterBar = ({onFilter}) => {
  // ------- filter state (start) -------
  const [search,setSearch] = useState('');
  const [date,setDate] = useState('');
  const [show,setShow] = useState(6);
  const [view,setView] = useState('all');
  // ------- filter state (end) -------


  useEffect(()=>{
    onFilter({
      search,
      date,
      show,
      view
    })
  },[search,date,show,view]);


  return (
    <div className={style.filterbar_container}>
       <Search setSearch={setSearch} />
       <DateField setDate={setDate} />
       <Show show={show} setShow={setShow} />
       <View view={view} setView={setView} />
    </div>
  );
};

export default FilterBar;