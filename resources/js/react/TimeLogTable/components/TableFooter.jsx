import React, { useEffect } from 'react'
import Pagination from './Pagination'
import { useLocalStorage } from 'react-use';

const TableFooter = ({
  onPaginate,
  perpageData,
  currentPage,
  handlePerPageData,
  totalEntry,
  
}) => {
  const [value,setValue] = useLocalStorage('daily-submission-table-per-page-data');
  const showingFrom = (currentPage - 1) * perpageData;
  let showingTo = showingFrom + perpageData;
  if(showingTo > totalEntry) showingTo = totalEntry;

  useEffect(()=>{
    handlePerPageData(value);
    if (!value) {
      setValue(10);
    }
  },[value])

  return (
    <div className="cnx__table_footer mt-3">
        <div className="__show_entries">
            <span>Show</span>
            <select
                className="py-1 border rounded-sm"
                value={value}
                onChange={(e) => setValue(Number(e.target.value))}
            >
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="30">30</option>
                <option value="50">50</option>
            </select>

            <span>entries</span>
        </div>

        <div className="__total_entries">
           {totalEntry > 0 ? `Showing ${showingFrom + 1} to ${showingTo} of ${totalEntry} entries`: `Showing 0 to 0 of 0 entries`} 
        </div>

        {/* pagination */}
        <Pagination
            onPaginate={onPaginate}
            currentPage={currentPage}
            perpageRow={perpageData}
            totalEntry={totalEntry}
        />
        {/* end pagination */}
    </div>
  )
}

export default TableFooter