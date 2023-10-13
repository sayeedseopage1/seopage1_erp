import React, { useEffect } from 'react'
import styles from './TableFilter.module.css'
import Dropdown from '../Dropdown'
import {PiGearDuotone} from 'react-icons/pi';
import _, { filter } from 'lodash';
import { useLocalStorage } from 'react-use';

const TableFilter = ({
    columns,
    columnVisibility,
    tableName="demo-table",
    setColumnVisibility
}) => {
  const [value , setValue] = useLocalStorage(tableName);

  useEffect(() => {
    if(value?.columnVisibility){
        setColumnVisibility(value?.columnVisibility);
    }
  }, [])


  const updateFilter = (e, column) => {
    const checked = e.target.checked;
    const _columnVisibility = {...columnVisibility}
    _columnVisibility[column] = !checked;

    if(value){
      setValue({...value, columnVisibility: _columnVisibility});
    }else{
      setValue({ columnVisibility: _columnVisibility});
    }
    setColumnVisibility(_columnVisibility);
  }

  const updateAll = (e, columns) => {
    let checked = e.target.checked;
    const _columnVisibility = {...columnVisibility}
    _.map(columns, column => (
        _columnVisibility[column] = !checked
    ))

    if(value){
      setValue({...value, columnVisibility: _columnVisibility});
    }else{
      setValue({ columnVisibility: _columnVisibility});
    }
    setColumnVisibility(_columnVisibility);
  }


  const _columns = _.filter(columns, col => col.header !== '');
  const _ids = _.map(_columns, col => col.id);


  const _col = _.pickBy(columnVisibility, value => value);


  const filtered = _.difference(_ids, _.keys(columnVisibility))


  const size = _.size(filtered) + _.size(_col);


  return (
    <div className={styles.table_filter}>
        <Dropdown>
            <Dropdown.Toggle icon={false} className={styles.filter_button}>
                <PiGearDuotone className={styles.gear_icon}/>
            </Dropdown.Toggle>
            <Dropdown.Menu placement='bottom-end' className={styles.filter_menu}>
                <ul className={styles.list}>
                  <li className={styles.list_item}>
                    <label htmlFor="all">
                        <input
                            type='checkbox'
                            name='column_filter'
                            checked={_.size(columnVisibility) === 0 ? false : size === 0 }
                            id="all"
                            onChange={e => updateAll(e, _ids)}
                        /> Select All
                    </label>
                  </li>
                  {_.map(columns, col => (
                      col.header && (
                        <li key={col.id} className={styles.list_item}>
                            <label htmlFor={col.id}>
                                <input
                                    type='checkbox'
                                    name='column_filter'
                                    id={col.id}
                                    checked={columnVisibility[col.id] === false ?? false}
                                    onChange={e => updateFilter(e, col.id)}
                                /> {col.header}
                            </label>
                        </li>
                      )
                  ))}
                </ul>
            </Dropdown.Menu>
        </Dropdown>
    </div>
  )
}

export default TableFilter
