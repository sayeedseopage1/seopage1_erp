import React, {useState, useCallback} from "react";
import TimeLogHistoryTable from "../components/TimeLogHistoryTable";
import Tabbar from "../components/Tabbar";
import { TimeLogHistoryColumn } from "../components/TimeLogHistoryColumn";
import { paginate } from "../../utils/paginate";

const TimeLogHistory = () => {
    const [data, setData] = useState([]);
    const [perPageData, setParPageData] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [renderData, setRenderData] = useState([{id:'demo'}, {id:'demo2'}]);
    const [sortConfig, setSortConfig] = useState([]);

    // const [getEmployeeWiseData, {isLoading}] = useGetEmployeeWiseDataMutation();

    // handle data
    const handleData = useCallback((data, currentPage, perPageData) => {
        const paginated = paginate(data, currentPage, perPageData);
        setRenderData([...paginate]);
    }, [data, currentPage, perPageData]);

    // // handle fetch data
    // const handleFetchData = (filter) => {
    //     getEmployeeWiseData(filter)
    //     .unwrap()
    //     .then(res => {
    //         const sortedData = orderBy(res?.data, ["employee_id"], ["desc"]);
    //         handleData(sortedData, currentPage, perPageData);
    //         setData(sortedData);
    //     })
    // }

    // useEffect(() => {
    //     handleFetchData({});
    // }, []);

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
            <div className="bg-white">Filter bar</div>
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
                />
            </div>
        </div>
    );
};

export default TimeLogHistory;
