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

const DailySubmission_Page = () => {
    const [data, setData] = useState([]);
    const [perPageData, setParPageData] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [renderData, setRenderData] = useState(null);
    const [sortConfig, setSortConfig] = useState([]);
    const [trackedTime, setTractedTime] = useState(0);
    // const [getTaskWiseData, {isLoading}] = useGetTaskWiseDataMutation();

    
    // useEffect(() => {
    //     const d = get_submission_table_data();
    //     console.log(d);
    //     setData(d);
    // }, [])


    // useEffect(()=>{
    //     console.log(renderData);
    // },[renderData])

    // handle data
    const handleData = (data, currentPage, perPageData) => {
        const paginated = paginate(data, currentPage, perPageData);
        const grouped = groupBy(paginated, 'task_id');
        const sorted = Object.entries(grouped).sort(([keyA], [keyB]) => keyB - keyA);
        setRenderData([...sorted]);
    }

    // handle fetch data
    const handleFetchData = (filter) => {

        // getTaskWiseData(filter)
        // .unwrap()
        // .then(res => {
        //     setCurrentPage(1);
        //     const sortedData = orderBy(res?.data, ["task_id"], ["desc"]);
        //     handleData(sortedData, 1, perPageData);
        //     setData(sortedData);
        //     const totalTrackTime = _.sumBy(sortedData, (d) => Number(d.total_minutes));
        //     setTractedTime(totalTrackTime);
        // })

        setCurrentPage(1);
        const sortedData = orderBy(get_submission_table_data(), ["task_id"], ["desc"]);
        handleData(sortedData, 1, perPageData);
        setData(sortedData);
        const totalTrackTime = _.sumBy(sortedData, (d) => Number(d.total_minutes));
        setTractedTime(totalTrackTime);
    }


    // data sort handle 
    const handleSorting = (sort) => {
        const sortData = orderBy(data, ...sort);
        handleData(sortData, currentPage, perPageData);
    }

    // handle pagination
    const handlePagination = (page) => {
        setCurrentPage(page);
        handleData(data, page, perPageData);
    }

    // handle par page data change
    const handlePerPageData = (number) => {
        setParPageData(number);
        handleData(data, currentPage, number);
    }

    // console.log(get_submission_table_data());

    return (
        <div className="sp1_tlr_container">
            <DailySubmissionTableFilter onFilter={handleFetchData} />
            <div className="sp1_tlr_tbl_container">
                <div className="mb-2"> <Tabbar /></div>
                <div className=" w-100 d-flex flex-wrap justify-center align-items-center" style={{ gap: '10px' }}>
                    <span className="mx-auto">
                        Total Tracked Time: <strong>{convertTime(trackedTime)}</strong>
                    </span>
                </div>

                <DailySubmissionWiseTable
                    data={renderData}
                    columns={DailySubmissionTableColumn}
                    tableName="daily_submission_wise_table"
                    onSort={handleSorting}
                    height="calc(100vh - 370px)"
                    onPaginate={handlePagination}
                    perpageData={perPageData}
                    handlePerPageData={handlePerPageData}
                    currentPage={currentPage}
                    totalEntry={data.length}
                    isLoading={false}
                />
            </div>
        </div>
    )
}

export default DailySubmission_Page;