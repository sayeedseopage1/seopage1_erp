import React from 'react'
import Pagination from './Pagination'

const TableFooter = ({
  onPaginate,
  perpageData,
  currentPage,
  handlePerPageData,
  totalEntry,
  
}) => {

  const showingFrom = (currentPage - 1) * perpageData;

  return (
    <div className="cnx__table_footer mt-3">
        <div className="__show_entries">
            <span>Show</span>
            <select
                className="py-1 border rounded-sm"
                onChange={(e) => handlePerPageData(Number(e.target.value))}
            >
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="30">30</option>
                <option value="50">50</option>
            </select>

            <span>entries</span>
        </div>

        <div className="__total_entries">
            Showing {showingFrom + 1} to {showingFrom + perpageData} of {totalEntry} entries
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