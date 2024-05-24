import React, { useState } from 'react';
import { dummyUserRole, heldAmountsData, heldAmountsDataTableHeaders } from '../../../constants';
import Pagination from '../../ui/Pagination';

const HeldAmounts = () => {
    const [currentPage, setCurrentPage] = useState(1)
    const [currentPageData, setCurrentPageData] = useState([]);
    const [numberOfRowPerPage, setNumberOfRowPerPage] = useState(10);

    return (
        <div className='held_amount_table_wrapper'>
            <table className="held_amount_table">
                <thead>
                    <tr>
                        {
                            dummyUserRole == 1 ?
                                heldAmountsDataTableHeaders?.map(item => <th key={item?.key}>
                                    {item?.label}
                                    <div>{item?.description && `(${item?.description})`}</div>
                                </th>)
                                :
                                heldAmountsDataTableHeaders?.slice(0, -1)?.map(item => <th key={item?.key}>
                                    {item?.label}
                                    <div>{item?.description && `(${item?.description})`}</div>
                                </th>)
                        }
                    </tr>
                </thead>
                <tbody>
                    {
                        currentPageData?.map((item, ind) => <tr key={ind}>
                            <td>{item?.month}</td>
                            <td>
                                {item?.title}
                                <div>(For the month of {item?.month})</div>
                            </td>
                            <td>{item?.total_amount}</td>
                            <td>{item?.disbursed_amount}</td>
                            <td>{item?.held_amount}</td>
                            <td>{item?.held_amount_balance}</td>
                            <td>
                                {
                                    dummyUserRole == 1 && item?.status == 1 ? <button className='incentive_success_btn'>Paid</button> : <button className='incentive_danger_btn'>Pending</button>
                                }
                            </td>
                        </tr>)
                    }
                </tbody>
            </table>

            {/* table footer  */}
            <div className="cnx__table_footer">
                <div className="__show_entries">
                    <span>Show</span>
                    <select onChange={(e) => setNumberOfRowPerPage(e.target.value)}>
                        <option value="10">10</option>
                        <option value="20">20</option>
                        <option value="30">30</option>
                        <option value="50">50</option>
                        <option value="100">100</option>
                        <option value="500">500</option>
                    </select>

                    <span>entries</span>
                </div>
                <div className='__total_entries'>
                    Showing {currentPageData.length > 0 ? 1 : 0} to {currentPageData.length} of {heldAmountsData?.length} entries
                </div>

                {/* pagination */}
                <Pagination
                    data={heldAmountsData}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    setCurrentPageData={(v) => setCurrentPageData(v)}
                    numOfPerPageRow={Number(numberOfRowPerPage)}
                />
                {/* end pagination */}
            </div>
        </div>
    );
};

export default HeldAmounts;

// table table-striped table-bordered table-hover 