import React, { useState } from "react";

import _, { groupBy, orderBy } from "lodash";
import { paginate } from "../../utils/paginate";
import DailySubmissionWiseTable from "../components/DailySubmission/DailySubmissionWiseTable";
import Tabbar from "../components/Tabbar";

import Loader from "../../global/Loader";
import { useLazyGetAllDailySubmissionQuery } from "../../services/api/dailySubmissionApiSlice";
import { DailySubmissionTableColumn } from "../components/DailySubmission/DailySubmissionTableColumn";
import DailySubmissionTableFilter from "../components/DailySubmission/DailySubmissionTableFilter";
import { RefreshButton } from "../components/RefreshButton";
import "../components/data-table.css";
import "../styles/time-log-history.css";
import "../styles/time-log-table.css";
import { ExportToExcel } from "../components/ExportToExcel";
import { useAuth } from '../../hooks/useAuth';
import Switch from "../../global/Switch";
import DailySubmissionTableExportToExcel from "../export/excel/DailySubmissionTableExporttoExcel";

const DailySubmission_Page = () => {
    const [data, setData] = useState([]);
    const [perPageData, setParPageData] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [renderData, setRenderData] = useState(null);
    const [sortConfig, setSortConfig] = useState([]);
    const [trackedTime, setTractedTime] = useState(0);
    const [getAllDailySubmission, { isLoading, isFetching }] =
        useLazyGetAllDailySubmissionQuery();
    const [filter, setFilter] = useState(null);

    const auth = useAuth();

    // handle data
    const handleData = (data, currentPage, perPageData) => {
        // console.log('handleData',{data,currentPage,perPageData});
        const paginated = paginate(data, currentPage, perPageData);
        const grouped = groupBy(paginated, "employee_name");
        const sorted = Object.entries(grouped).sort(
            ([keyA], [keyB]) => keyB - keyA
        );
        setRenderData([...sorted]);
    };

    // handle fetch data
    const handleFetchData = async (filter) => {
        const queryObject = _.pickBy(filter, Boolean);
        setFilter(queryObject);
        const searchParams = new URLSearchParams(queryObject).toString();
        // console.log(searchParams);
        setCurrentPage(1);
        await getAllDailySubmission(searchParams)
            .unwrap()
            .then(({ dailySubmission }) => {
                const newData = dailySubmission.map((data, i) => ({
                    ...data,
                    unique_id: i,
                }));
                const sortedData = orderBy(
                    newData,
                    ["employee_name"],
                    ["desc"]
                );
                // console.log('handleFetchData',{filter,sortedData,data:newData});
                handleData(sortedData, 1, perPageData);
                setData(sortedData);
                const totalTrackTime = _.sumBy(sortedData, (d) =>
                    Number(d.total_minutes)
                );
                setTractedTime(totalTrackTime);
            });
    };

    // data sort handle
    const handleSorting = (sort) => {
        // console.log('handleSorting',{sort});
        const sortData = orderBy(data, ...sort);
        handleData(sortData, currentPage, perPageData);
    };

    // handle pagination
    const handlePagination = (page) => {
        // console.log('handlePagination',{page});
        setCurrentPage(page);
        handleData(data, page, perPageData);
    };

    // handle par page data change
    const handlePerPageData = (number) => {
        // console.log('handlePerPageData',{number});
        setParPageData(number);
        handleData(data, currentPage, number);
    };

    // console.log(get_submission_table_data());
    // handle refresh button
    const handleRefresh = () => {
        handleFetchData(filter);
    };

    console.log({data})
 

    return (
        <div className="sp1_tlr_container">
            <DailySubmissionTableFilter onFilter={handleFetchData} />
            <div className="sp1_tlr_tbl_container">
                <div className="d-flex align-items-center justify-content-between mb-2">
                    <Tabbar />
                    <div
                        className="d-flex align-items-center"
                        style={{ gap: "10px" }}
                    >
                        <RefreshButton
                            onClick={handleRefresh}
                            isLoading={isFetching}
                        >
                            {isFetching ? (
                                <Loader
                                    title="Refreshing..."
                                    borderRightColor="white"
                                />
                            ) : (
                                "Refresh"
                            )}
                        </RefreshButton>
                        <Switch>
                            <Switch.Case condition={auth.getRoleId() === 1}>
                                <DailySubmissionTableExportToExcel
                                    data={data}
                                    filter={filter}
                                    button={
                                        <ExportToExcel>
                                            <i className="fa-solid fa-download" />
                                            Export to Excel
                                        </ExportToExcel>
                                    }
                                    filename={`time_log_history_table_${filter?.start_date}_to_${filter?.end_date}`}
                                />
                            </Switch.Case>
                        </Switch>
                    </div>
                </div>
                {/* <div className=" w-100 d-flex flex-wrap justify-center align-items-center" style={{ gap: '10px' }}>
                    <span className="mx-auto">
                        Total Tracked Time: <strong>{convertTime(trackedTime)}</strong>
                    </span>
                </div> */}

                <DailySubmissionWiseTable
                    data={isLoading ? [] : renderData}
                    columns={DailySubmissionTableColumn}
                    tableName="daily_submission_wise_table"
                    onSort={handleSorting}
                    height="calc(100vh - 370px)"
                    onPaginate={handlePagination}
                    perpageData={perPageData}
                    handlePerPageData={handlePerPageData}
                    currentPage={currentPage}
                    totalEntry={data.length}
                    isLoading={isFetching}
                />
            </div>
        </div>
    );
};

export default DailySubmission_Page;
