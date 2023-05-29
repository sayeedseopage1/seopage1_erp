import * as React from 'react'
import { columns as defaultColumns } from './Columns';
import _ from 'lodash';
import { QualifiedSalesContext } from '../context';
import DragableHeader from './DragableHeader';

const QualifiedSalesTable = ({data = []}) => {
    const {
        columns,
        sortConfig,
        setColumns,
        setSortConfig,
    } = React.useContext(QualifiedSalesContext);


    // initial state
    React.useEffect(() => {
        setColumns([...defaultColumns]);
    }, []);


    // config sort
    const sortedData = (data, sortConfig) => {
        if(sortConfig.key){
            return [...data].sort((a, b) => {
                if (a[sortConfig.key] < b[sortConfig.key]) {
                    return sortConfig.direction === "asc" ? -1 : 1;
                }
                if (a[sortConfig.key] > b[sortConfig.key]) {
                    return sortConfig.direction === "asc" ? 1 : -1;
                }
                return 0;
            });
        }

        return data;
    }


    // sort request 
    const requestSort = (key) => {
        
        let direction = "asc";
        if (
            sortConfig &&
            sortConfig.key === key &&
            sortConfig.direction === "asc"
        ) {
            direction = "desc";
        } else direction = "asc"; 

        setSortConfig({ key, direction });
    };


  return (
    <div className="sp1_qs_table">
        {/* head */}
        <div className='sp1_qs_table_tr'>
            {columns?.map(column => {
                return(
                    <DragableHeader 
                        key={column.id} 
                        column={column} 
                        columns={columns}
                        setColumns={setColumns}
                        sortConfig={sortConfig}
                        setSortConfig={setSortConfig}
                    />
                )
            })}
        </div>


        {/* body */}
        {/* head */}
        <div className='sp1_qs_table_tr'>
            {columns?.map(column => {
                return(
                    <div key={column.id} className={`sp1_qs_table_td sp1_qs_table_td_${column.id} ${column?.headClass}`}>
                        {column?.cell([])}
                    </div>
                )
            })}
        </div>

    </div>
  )
}

export default QualifiedSalesTable