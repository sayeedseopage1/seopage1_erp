/* eslint-disable react/prop-types */
import _ from 'lodash';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Placeholder } from '../Placeholder';
import { DragLayer } from './DragLayer';
import EmptyTable from './EmptyTable';
import Paginate from './Paginate';
import TableColumn from './TableColumn';
import styles from './table.module.css';
import { paginate } from './utils';


const DataTable = ({
    data = [],
    columns,
    groupBy,
    tableName= 'data-table',
    margeRow= false,
    pageIndex = 1,
    perPageRow = 10,
    onPageRowChange,
    total,
    onPageChange,
    tableClass="",
    tableContainerClass="",
    isLoading = false,
    navbar,
    uniq_id = 'id',
    state = {}
}) => {
  const [mainData, setMainData] = useState([]);
  const [tableData, setTableData] = useState(null);
  const [tableColumns, setTableColumns] = useState([...columns]);
  const [columnOrder, setColumnOrder] = useState(_.map(columns, col => col.id));
  const [sort, setSort] = useState(null);
  const [search, setSearch] = useState("");

  // ref
  const tableRef = useRef(null);
  const tHeadRef = useRef(null);


  // prepare data
    const prepareTableData = (data) => {
        let paginated = paginate(data, pageIndex, perPageRow);

        if(margeRow){
            const groupedData = groupBy(paginated) ;
            let _data = _.entries(groupedData);
            setTableData(_data);
        }else{
            setTableData({data: paginated});
        }
    }

  useEffect(() => {
    onPageChange(1);
    const sortedData = _.orderBy(data, 'id', 'desc');
    setMainData([...sortedData]);
    prepareTableData(sortedData);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, margeRow])

  /********* PAGEINATE ************/
  const _pI = useMemo(() => pageIndex, [pageIndex])
  const _ppr = useMemo(() => perPageRow, [perPageRow])
  useEffect(() => {
    if(mainData.length){
        const _d = _.orderBy(mainData, 'id', 'desc')
        prepareTableData(_d);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [_pI, _ppr])


  /******** PREPARE TABLE COLUMNS ********* */
  const colOrder = useMemo(() => columnOrder , [columnOrder])
  useEffect(() => {
    // get data from local storage
    const localData = JSON.parse(localStorage.getItem(tableName));

    if(localData && localData._columnOrders){
        const _columns = _.sortBy(columns, (item) =>
            _.indexOf(localData._columnOrders, item.id)
        );
        setTableColumns(_columns);
    }else{
        const _columns = _.sortBy(columns, (item) =>
            _.indexOf(colOrder, item.id)
        );
        setTableColumns(_columns);
    }
  }, [columns, colOrder, tableName])
  /******** PREPARE TABLE COLUMNS ********* */



  /******* GLOBAL SEARCH ********/
  const globalSearch = (row, columns, search) => {
    let isEqual = false;

    const check = (col) => {
        if(col.subHeading){
            return _.map(col.subHeading, c => check(c))
        }else if (col.searchText){
            let compaireText = col?.searchText(row);
            if(_.includes(_.lowerCase(compaireText), _.lowerCase(search))){
                return isEqual = true;
            }
        }
    }
    columns.map((col) => check(col))
    return isEqual;
  };


  useEffect(() => {
    const s = _.trim(search);
    if(s){
        let _data = _.filter(mainData, d =>  globalSearch(d, columns, s));
        prepareTableData(_data);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search])
  /******* ENd GLOBAL SEARCH ********/


  /******* SORT ********* */
  const onSort = (_sort) => {
    const { key, order, col } = _sort;
    setSort(_sort);

    if(col && col.sort){
        let p = paginate(mainData, 1, perPageRow);
        let d = _.orderBy(p, d => col.sort(d), order);
        prepareTableData(d);
    }
  }


  const table = {
    table: tableRef,
    head: tHeadRef,
    data: tableData,
    state: {
        visibleColumns: tableColumns,
        columns,
        search,
        tableName,
        columnOrder,
        sort,
        ...state
    },
    onSortChange: onSort,
    columnOrderChange: setColumnOrder,
  }




  /********** CREATE TABLE HEAD ************ */
  const tableHead = (columns) => {
    const subhead = []
    columns.forEach(col => {
        if(col.subHeading){
            _.map(col.subHeading, s => subhead.push({...s, moveable: false}))
        }
    });

    const parentHeads = columns;

    return [
        parentHeads,
        subhead
    ]
  }

  const columnsSize = () => {
    let size = 0;
    tableHead(tableColumns).map(i => size += _.size(i))
    return size;
  }



  /********** END CREATE TABLE HEAD ************ */



  /********** RENDER MARGE ROWS ************ */
  const renderMargeRows = (data) => {
    const rows = [];

    /*** MARGE COL ***/
    const margeCol = ({value, row, col, index}) => {
        if(col?.marge){
            return index === 0 && (
                <React.Fragment>
                    <td rowSpan={_.size(value)}>
                        {col.row({row, table, parent: value})}
                    </td>
                </React.Fragment>
            );
        }else{
            return (
                <React.Fragment>
                    <td> {col.row({row, table, parent: value})} </td>
                </React.Fragment>
            )
        }
    }


    if(data){
        // console.log({data})
        for(const [, value] of data){

            _.map(value, (row, index)=>{

                rows.push(
                    <React.Fragment key={ row[uniq_id] ?? `${row?.id}${index*100}`}>
                        <tr>
                            {
                                _.map(tableColumns, (col, i) => {

                                    if(col.subHeading){
                                        return _.map(col.subHeading, c => (
                                            <React.Fragment key={c.id}>
                                                {margeCol({value, row, col: c, index, i})}
                                            </React.Fragment>
                                        ))
                                    }else{
                                        return (
                                            <React.Fragment key={col.id}>
                                                {margeCol({value, row, col, index, i})}
                                            </React.Fragment>
                                        )
                                    }
                                })
                            }
                        </tr>
                    </React.Fragment>
                )
            })
        }
    }

    return rows;
  }
  /********** END RENDER MARGE ROWS ************ */

  /********** RENDER ROWS ************ */
  const renderRows = (data) => {
    // const tData = _.filter(data, (d) => globalSearch(d, search));
    const rows = []
        data?.forEach(row => {
            rows.push(
                <React.Fragment key={row[uniq_id]}>
                    <tr >
                        {_.map(tableColumns, col =>{
                            if(col.subHeading){
                                return _.map(col.subHeading, s => (
                                    <td key={s.id}>
                                        {s.row({row, table})}
                                    </td>
                                ))
                            }else{
                                return <td key={col.id}>
                                    {col.row({row, table})}
                                </td>
                            }
                        })}
                    </tr>
                </React.Fragment>
            )
        });

    return rows;
  }
  /********** END RENDER ROWS ************ */


  return (
    <React.Fragment>
        <div className=''>
            <div className={styles.table_navigation}>
                {navbar}

                {/* <div className={styles.search_bar} >
                    <span className={styles.search_bar__icon}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height="1em"
                            viewBox="0 0 512 512"
                        >
                            <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"/>
                        </svg>
                    </span>
                    <input
                        type='search'
                        placeholder='Search...'
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                    />
                </div> */}
            </div>

            {/* table */}
            <div className={`${styles.table_container} ${styles.scrollbar}  ${tableContainerClass}`}>
                <table ref={tableRef} className={`${styles.sp1_table} ${tableClass}`}>
                    <thead ref={tHeadRef} className={styles.sp1_table_thead}>
                        {
                            _.map([...tableHead(tableColumns)], (head, index) =>
                                <tr key={index}>
                                    { _.map(head, col => (
                                        <TableColumn
                                            key={col.id}
                                            col={col}
                                            table={table}
                                        />
                                    ))}
                                </tr>
                            )
                        }
                    </thead>

                    <tbody className={styles.sp1_table_tbody}>
                        {   !isLoading ?
                            (_.size(data) > 0 &&
                            margeRow ?
                            renderMargeRows(tableData) :
                            renderRows(tableData?.data ?? [])) :null
                        }

                        {
                            !isLoading && _.size(data) === 0 ?
                                <tr>
                                    <td aria-colspan="true" colSpan={columnsSize()} >
                                        <EmptyTable />
                                    </td>
                                </tr> : null
                        }

                        {
                            isLoading  ?
                            _.times(perPageRow, item => (
                                <tr key={item}>
                                    {_.map( tableColumns, (head) =>{
                                        if(head.subHeading){
                                           return _.map(head.subHeading, (subHead) => (
                                                <td key={subHead.id}>
                                                    {subHead.loader ? subHead.loader () : <Placeholder />}
                                                </td>
                                           ))
                                        }else{
                                            return <td key={head.id}>
                                                {head.loader ? head.loader() : <Placeholder />}
                                            </td>
                                        }
                                    })}
                                </tr>
                            ))
                            :null
                        }
                    </tbody>
                </table>
            </div>
            <DragLayer/>
        </div>
        <Paginate
            total={total}
            pageIndex={pageIndex}
            perPageRow={perPageRow}
            onPageChange={onPageChange}
            onPageRowChange={onPageRowChange}
        />
    </React.Fragment>
  )
}



export default DataTable


