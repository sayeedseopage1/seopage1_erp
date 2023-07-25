import React, {useState, useCallback} from "react";
import TimeLogHistoryTable from "../components/TimeLogHistoryTable";
import Tabbar from "../components/Tabbar";
import { TimeLogHistoryColumn } from "../components/TimeLogHistoryColumn";
import { paginate } from "../../utils/paginate";
import '../styles/time-log-history.css';
import '../components/data-table.css';
import TimeLogTableFilterBar from "../components/TimeLogTableFilterBar";
import { useGetTimeLogHistoryMutation } from "../../services/api/timeLogTableApiSlice";
import TimeLogHistoryTableFilterBar from "../components/TimeLogHistoryFilterBar";
import _ from "lodash";

const TimeLogHistory = () => {
    const [data, setData] = useState([]);
    const [perPageData, setParPageData] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [renderData, setRenderData] = useState([]);
    const [sortConfig, setSortConfig] = useState([]);

    const [getTimeLogHistory, {isLoading}] = useGetTimeLogHistoryMutation();

    // handle data
    const handleData = useCallback((data, currentPage, perPageData) => {
        const paginated = paginate(data, currentPage, perPageData);
        setRenderData([...paginated]);
    }, [data, currentPage, perPageData]);

    // handle fetch data
    const handleFetchData = (filter) => {
        getTimeLogHistory(filter)
        .unwrap()
        .then(res => {
            console.table(res.data)
            const sortedData = _.orderBy(res?.data, ["employee_id"], ["desc"]);
            handleData(sortedData, currentPage, perPageData);
            setData(sortedData);
        })
        .catch(err => console.log(err))
    }

    // data sort handle 
    const handleSorting = (sort) => {
        const sortData = _.orderBy(data, ...sort);
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
            <TimeLogHistoryTableFilterBar onFilter={handleFetchData} />
            <div className="sp1_tlr_tbl_container">
                <div className="">
                    <Tabbar />
                </div>
                <TimeLogHistoryTable
                    data={renderData}
                    columns={TimeLogHistoryColumn}
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

export default TimeLogHistory;
