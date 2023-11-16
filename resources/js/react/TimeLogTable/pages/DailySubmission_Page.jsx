import React, { useState } from 'react';

import { paginate } from '../../utils/paginate';
import _, { groupBy, orderBy } from 'lodash';
import Tabbar from '../components/Tabbar';
import DailySubmissionWiseTable from '../components/DailySubmission/DailySubmissionWiseTable';

import DailySubmissionTableFilter from '../components/DailySubmission/DailySubmissionTableFilter';
import { convertTime } from '../../utils/converTime';
import { DailySubmissionTableColumn } from '../components/DailySubmission/DailySubmissionTableColumn';
import get_submission_table_data from '../components/DailySubmission/fake_data/get_submission_table_data';
import { useEffect } from 'react';
import '../styles/time-log-history.css';
import '../styles/time-log-table.css';
import '../components/data-table.css';
import { useLazyGetAllDailySubmissionQuery } from '../../services/api/dailySubmissionApiSlice';

const DailySubmission_Page = () => {
    const [data, setData] = useState([]);
    const [perPageData, setParPageData] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [renderData, setRenderData] = useState(null);
    const [sortConfig, setSortConfig] = useState([]);
    const [trackedTime, setTractedTime] = useState(0);
    const [getAllDailySubmission,{isLoading}] = useLazyGetAllDailySubmissionQuery();




    // handle data
    const handleData = (data, currentPage, perPageData) => {
        // console.log('handleData',{data,currentPage,perPageData});
        const paginated = paginate(data, currentPage, perPageData);
        const grouped = groupBy(paginated, 'employee_name');
        const sorted = Object.entries(grouped).sort(([keyA], [keyB]) => keyB - keyA);
        setRenderData([...sorted]);
    }

    // handle fetch data
    const handleFetchData = (filter) => {
        const queryObject = _.pickBy(filter, Boolean);
        const searchParams = new URLSearchParams(queryObject).toString();
        // console.log(searchParams);
        setCurrentPage(1);
        getAllDailySubmission(searchParams)
            .unwrap()
            .then(({dailySubmission})=>{
                const newData = dailySubmission.map((data,i)=>({...data,unique_id:i}));
                const sortedData = orderBy(newData, ["employee_name"],["desc"]);
                // console.log('handleFetchData',{filter,sortedData,data:newData});
                handleData(sortedData, 1, perPageData);
                setData(sortedData);
                const totalTrackTime = _.sumBy(sortedData, (d) => Number(d.total_minutes));
                setTractedTime(totalTrackTime);
            });
    }


    // data sort handle 
    const handleSorting = (sort) => {
        // console.log('handleSorting',{sort});
        const sortData = orderBy(data, ...sort);
        handleData(sortData, currentPage, perPageData);
    }

    // handle pagination
    const handlePagination = (page) => {
        // console.log('handlePagination',{page});
        setCurrentPage(page);
        handleData(data, page, perPageData);
    }

    // handle par page data change
    const handlePerPageData = (number) => {
        // console.log('handlePerPageData',{number});
        setParPageData(number);
        handleData(data, currentPage, number);
    }

    // console.log(get_submission_table_data());

    return (
        <div className="sp1_tlr_container">
            <DailySubmissionTableFilter onFilter={handleFetchData} />
            <div className="sp1_tlr_tbl_container">
                <div className="mb-2"> <Tabbar /></div>
                {/* <div className=" w-100 d-flex flex-wrap justify-center align-items-center" style={{ gap: '10px' }}>
                    <span className="mx-auto">
                        Total Tracked Time: <strong>{convertTime(trackedTime)}</strong>
                    </span>
                </div> */}

                <DailySubmissionWiseTable
                    data={isLoading?[]:renderData}
                    columns={DailySubmissionTableColumn}
                    tableName="daily_submission_wise_table"
                    onSort={handleSorting}
                    height="calc(100vh - 370px)"
                    onPaginate={handlePagination}
                    perpageData={perPageData}
                    handlePerPageData={handlePerPageData}
                    currentPage={currentPage}
                    totalEntry={data.length}
                    isLoading={isLoading}
                />
            </div>
        </div>
    )
}

export default DailySubmission_Page;