import React, { useEffect, useState } from 'react';
import style from "../../../styles/required-actions.module.css";
import Search from './Search';
import Show from './Show';
import DateField from './DateField';
import View from './View';
import { usePagination } from '../Pagination';

const FilterBar = ({onFilter,change=false}) => {
  const {setPerPageItem} = usePagination();

  // ------- filter state (start) -------
  const [search,setSearch] = useState('');
  const [date,setDate] = useState({});
  const [show,setShow] = useState(6);
  const [view,setView] = useState('all');
  // ------- filter state (end) -------


  useEffect(()=>{
    // console.log({search});
    onFilter({
      search,
      date,
      view
    })
  },[search,date,view]);


  useEffect(()=>{
    if (search) {
      setView('all');
    }
  },[search])

  useEffect(()=>{
    setSearch('');
    setView('all');
  },[date])

  useEffect(()=>{
    setSearch('');
  },[view])


  useEffect(()=>{
    setPerPageItem(show);
  },[show])


  return (
    <div className={style.filterbar_container}>
       <Search search={search} setSearch={setSearch} change={change} />
       <DateField setDate={setDate} change={change} />
       <Show show={show} setShow={setShow} change={change} />
       {/* <View view={view} setView={setView} change={change} /> */}
    </div>
  );
};

export default FilterBar;