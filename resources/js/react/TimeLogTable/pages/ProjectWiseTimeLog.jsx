import React, {useState, useEffect} from "react";
import { useGetProjectWiseDataMutation } from "../../services/api/timeLogTableApiSlice";
import { paginate } from '../../utils/paginate';
import { groupBy, orderBy } from "lodash";
import Tabbar from "../components/Tabbar";
import ProjectWiseTable from '../components/ProjectWiseTable'
import TimeLogTableFilterBar from "../../TimeLogTable-backup/components/TimeLogTableFilterBar";
import { ProjectWiseTableColumn } from "../components/ProjectWiseTableColumn";

const ProjectWiseTimeLog = () => {
    const [data, setData] = useState([]);
    const [perPageData, setParPageData] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [renderData, setRenderData] = useState(null);
    const [sortConfig, setSortConfig] = useState([]);

    const [getProjectWiseData, {isLoading}] = useGetProjectWiseDataMutation();

    // handle data
    const handleData = (data, currentPage, perPageData) => {
        const paginated = paginate(data, currentPage, perPageData);
        const grouped = groupBy(paginated, 'project_id');
        const sorted = Object.entries(grouped).sort(([keyA], [keyB]) => keyB - keyA);
        setRenderData([...sorted]);
    }

    // handle fetch data
    const handleFetchData = (filter) => {
        getProjectWiseData(filter)
        .unwrap()
        .then(res => {
            const sortedData = orderBy(res?.data, ["project_id"], ["desc"]);
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
console.log({data})
    return (
        <div className="sp1_tlr_container">
            <TimeLogTableFilterBar onFilter={handleFetchData} />
            <div className="sp1_tlr_tbl_container">
                <div className="">
                    <Tabbar/>
                </div>
                <ProjectWiseTable
                    data={renderData}
                    columns={ProjectWiseTableColumn}
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

export default ProjectWiseTimeLog;
