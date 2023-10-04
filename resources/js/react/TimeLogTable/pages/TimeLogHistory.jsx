import _ from "lodash";
import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetTimeLogHistoryMutation } from "../../services/api/timeLogTableApiSlice";
import { setFilterOption, storeData } from "../../services/features/timeLogHistorySlice";
import { paginate } from "../../utils/paginate";
import Tabbar from "../components/Tabbar";
import { TimeLogHistoryColumn } from "../components/TimeLogHistoryColumn";
import TimeLogHistoryTableFilterBar from "../components/TimeLogHistoryFilterBar";
import TimeLogHistoryTable from "../components/TimeLogHistoryTable";
import '../components/data-table.css';
import '../styles/time-log-history.css';
import { User } from "../../utils/user-details";

const TimeLogHistory = () => {
    // const [data, setData] = useState([]);
    const {data} = useSelector(s=> s.timeLogHistory);
    const [perPageData, setParPageData] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [renderData, setRenderData] = useState([]);
    const [sortConfig, setSortConfig] = useState([]);
    const dispatch = useDispatch();
    const auth = new User(window?.Laravel?.user);

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
            const sortedData = _.orderBy(res?.data, ["employee_id"], ["desc"]);
            handleData(sortedData, currentPage, perPageData);
            // setData(sortedData);
            dispatch(storeData({data: sortedData}));
            dispatch(setFilterOption({filter}));
            setCurrentPage(1); 
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
                    tableName="timeLogHistory"
                    onSort={handleSorting}
                    height="calc(100vh - 325px)"
                    onPaginate={handlePagination}
                    perpageData={perPageData}
                    handlePerPageData={handlePerPageData}
                    currentPage={currentPage}
                    totalEntry={_.size(data)}
                    isLoading={isLoading}
                />
            </div>
        </div>
    );
};

export default TimeLogHistory;
