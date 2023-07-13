import React, {useState, useEffect} from "react";
import DataTable from "../components/table/DataTable";
import { EmployeeTableColumn } from "../components/EmployeeTableColumn";
import { useGetEmployeeWiseDataMutation } from "../../services/api/timeLogTableApiSlice";
import { paginate, sort } from '../utils';

const EmployeeWiseTimeLogTable = () => {
    const [data, setData] = useState([]);
    const [perPageData, setParPageData] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [renderData, setRenderData] = useState([]);

    const [getEmployeeWiseData, {isLoading}] = useGetEmployeeWiseDataMutation();

    // sort data

    // handle data
    const handleData = (data) => {
        const sortedData = sort(data, {sortBy: 'employee_id', direction: 'dece'});
        const paginated = paginate(sortedData, currentPage, perPageData);
        setData([...sortedData]);
        setRenderData([...paginated]); 
        console.log({sortedData, paginated})
    }

    // handle fetch data
    const handleFetchData = (filter) => {
        getEmployeeWiseData(filter)
        .unwrap()
        .then(res => {
            handleData(res?.data)
        })
    }

    useEffect(() => {
        handleFetchData({});
    }, []);


    // handle pagination
    const handlePagination = (e) => {

    }

    
    return (
        <div className="sp1_tlr_container">
            <div className="bg-white">Filter bar</div>
            <div className="sp1_tlr_tbl_container">
                <div className="p-3">
                    <DataTable
                        data={renderData}
                        columns={EmployeeTableColumn}
                        tableName="employee_timelog_report"
                        sortBy="employee_id"
                        height="calc(100vh - 240px)"
                        onPaginate={handlePagination}
                    />
                </div>
            </div>
        </div>
    );
};

export default EmployeeWiseTimeLogTable;
