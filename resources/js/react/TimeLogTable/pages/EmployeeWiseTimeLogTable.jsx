import React, {useState, useEffect, useContext} from "react";
import { EmployeeTableColumn } from "../components/EmployeeTableColumn";
import EmployeeTimeLogDataTable from '../components/EmployeeTimeLogDataTable';
import { useGetEmployeeWiseDataMutation } from "../../services/api/timeLogTableApiSlice";
import { paginate } from '../../utils/paginate';
import { groupBy, orderBy } from "lodash";
import Tabbar from "../components/Tabbar"; 
import { EmployeeTableCtx } from "../context/EmployeeTableContext";
import TimeLogTableFilterBar from "../../TimeLogTable-backup/components/TimeLogTableFilterBar";



const EmployeeWiseTimeLogTable = () => {
    const [data, setData] = useState([]);
    const [perPageData, setParPageData] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [renderData, setRenderData] = useState(null);
    const [sortConfig, setSortConfig] = useState([]);
    const { setFilter } = useContext(EmployeeTableCtx)

    const [getEmployeeWiseData, {isLoading}] = useGetEmployeeWiseDataMutation();

    // handle data
    const handleData = (data, currentPage, perPageData) => {
        const paginated = paginate(data, currentPage, perPageData);
        const grouped = groupBy(paginated, 'employee_id');
        const sorted = Object.entries(grouped).sort(([keyA], [keyB]) => keyB - keyA);
        setRenderData([...sorted]);
    }

    // handle fetch data
    const handleFetchData = (filter) => {
        setFilter(filter);
        getEmployeeWiseData(filter)
        .unwrap()
        .then(res => {
            const sortedData = orderBy(res?.data, ["employee_id"], ["desc"]);
            handleData(sortedData, currentPage, perPageData);
            setData(sortedData);
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

    return (
        <div className="sp1_tlr_container">
        <TimeLogTableFilterBar onFilter={handleFetchData} />
            <div className="sp1_tlr_tbl_container">
                <div className="">
                    <Tabbar/>
                </div>
                <EmployeeTimeLogDataTable
                    data={renderData}
                    columns={EmployeeTableColumn}
                    tableName="employee_timelog_report"
                    onSort={handleSorting}
                    height="calc(100vh - 325px)"
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
