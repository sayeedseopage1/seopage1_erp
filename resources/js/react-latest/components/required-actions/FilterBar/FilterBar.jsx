import React, { useEffect, useState } from 'react';
import style from "../../../styles/required-actions.module.css";
import Search from './Search';
import Show from './Show';
import DateField from './DateField';
import View from './View';

const FilterBar = ({onFilter,change=false}) => {
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
       <Search setSearch={setSearch} change={change} />
       <DateField setDate={setDate} change={change} />
       <Show show={show} setShow={setShow} change={change} />
       <View view={view} setView={setView} change={change} />
    </div>
  );
};

export default FilterBar;