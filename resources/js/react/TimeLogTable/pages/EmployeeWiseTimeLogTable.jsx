import _, { groupBy, orderBy } from "lodash";
import React, { useContext, useState } from "react";
import Loader from "../../global/Loader";
import { useGetEmployeeWiseDataMutation } from "../../services/api/timeLogTableApiSlice";
import { convertTime } from "../../utils/converTime";
import { paginate } from '../../utils/paginate';
import { EmployeeTableColumn } from "../components/EmployeeTableColumn";
import EmployeeTimeLogDataTable from '../components/EmployeeTimeLogDataTable';
import { RefreshButton } from "../components/RefreshButton";
import Tabbar from "../components/Tabbar";
import TimeLogTableFilterBar from "../components/TimeLogTableFilterBar";
import { EmployeeTableCtx } from "../context/EmployeeTableContext";
import { ExportToExcel } from "../components/ExportToExcel";
import ExportEmployeeWiseTableDataToExcel from "../export/excel/ExportEmployeeWiseTableDataToExcel";
import { useAuth } from '../../hooks/useAuth';
import Switch from '../../global/Switch'


const EmployeeWiseTimeLogTable = () => {
    const [data, setData] = useState([]);
    const [perPageData, setParPageData] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [renderData, setRenderData] = useState(null);
    const [sortConfig, setSortConfig] = useState([]);
    const { filter, setFilter } = useContext(EmployeeTableCtx);
    const [nSession, setNSession] = useState(0);
    const [trackedTime, setTractedTime] = useState(0);

    const [getEmployeeWiseData, {isLoading}] = useGetEmployeeWiseDataMutation();

    // current user
    const auth = useAuth();

    // handle data
    const handleData = (data, currentPage, perPageData) => {
        const paginated = paginate(data, currentPage, perPageData);
        const grouped = groupBy(paginated, 'employee_id');
        const sorted = Object.entries(grouped).sort(([keyA], [keyB]) => keyB - keyA);
        setRenderData([...sorted]);
    }

    // handle fetch data
    const handleFetchData = async (filter) => {
        setFilter(filter);
        await getEmployeeWiseData(filter)
        .unwrap()
        .then(res => {
            setCurrentPage(1);
            const sortedData = orderBy(res?.data, ["employee_id"], ["desc"]);
            const totalSession = _.sumBy(sortedData, (d) => Number(d.number_of_session));
            const totalTrackTime = _.sumBy(sortedData, d => Number(d.total_minutes));
            handleData(sortedData, currentPage, perPageData);
            setData(sortedData);
            setNSession(totalSession);
            setTractedTime(totalTrackTime);
        })
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
    const handlePerPageData=(number)=>{
        setParPageData(number);
        handleData(data, currentPage, number);
    }

    // handle refresh button
    const handleRefresh = () => {
        handleFetchData(filter);
    }

    return (
        <div className="sp1_tlr_container">
        <TimeLogTableFilterBar onFilter={handleFetchData} />
            <div className="sp1_tlr_tbl_container">
                <div className="d-flex align-items-center justify-content-between mb-2">
                    <Tabbar/>
                    <div className="d-flex align-items-center" style={{gap: '10px'}}>
                        <RefreshButton onClick={handleRefresh} isLoading={isLoading} >
                            {isLoading ?
                                <Loader title="Refreshing..."  borderRightColor="white" />
                            : 'Refresh'}
                        </RefreshButton>

                        <Switch>
                            <Switch.Case condition={auth.getRoleId() === 1}>
                                <ExportEmployeeWiseTableDataToExcel
                                    data = {data}
                                    filter={filter}
                                    button = {
                                        <ExportToExcel>
                                            <i className="fa-solid fa-download" />
                                            Export to Excel
                                        </ExportToExcel>
                                    }
                                    filename={`employee_wise_table_${filter?.start_date}_to_${filter?.end_date}`} 
                                />
                            </Switch.Case>
                        </Switch>
                    </div>
                </div>
                <div className=" w-100 d-flex flex-wrap justify-center align-items-center" style={{gap: '10px'}}>
                    <span className="mx-auto">
                        <span>Total No. of Session: <strong> {nSession} </strong> </span> <span className="mx-2">||</span> <span>Total Tracked Time: <strong>{convertTime(trackedTime)}</strong></span>
                    </span>
                </div>

                <EmployeeTimeLogDataTable
                    data={renderData}
                    columns={EmployeeTableColumn}
                    tableName="employee_timelog_report"
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
    );
};

export default EmployeeWiseTimeLogTable;
