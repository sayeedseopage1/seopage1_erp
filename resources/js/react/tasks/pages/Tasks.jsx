import React, {useState, useEffect, useContext} from "react";
import Tabbar from "../components/Tabbar"; 
import TasksTable from "../components/TasksTable";
import FilterContainer from "../components/Filter-bar/FilterContainer";
import Filterbar from "../components/Filter-bar/Filterbar";
import { useDispatch, useSelector } from "react-redux";
import { useLazyGetTasksQuery } from "../../services/api/tasksApiSlice";
import { storeTasks } from "../../services/features/tasksSlice";
import _ from "lodash";

const Tasks = () => {
    const {tasks} = useSelector(s => s.tasks)
    const dispatch = useDispatch(); 
    const [getTasks, {isFetching}] = useLazyGetTasksQuery();
    const [filter, setFilter] = React.useState(null);
   

    const onFilter = (filter) => {
        const queryObject = _.pickBy(filter, Boolean);
        const queryString = new URLSearchParams(queryObject).toString();
        setFilter(queryObject);

        if(filter?.start_date && filter?.end_date){
            getTasks(`?${queryString}`)
            .unwrap()
            .then(res => {
                const data = _.orderBy(res?.tasks, 'due_date', 'desc');
                dispatch(storeTasks({tasks: data}))
            })
            .catch(err => console.log(err))
        }
    }


    return (
        <React.Fragment>
            <FilterContainer>
                <Filterbar onFilter={onFilter} /> 
            </FilterContainer>

            <div className="sp1_tlr_container"> 
                <div className="sp1_tlr_tbl_container">
                    <div className="mb-3">
                        <Tabbar/>
                    </div>
                    
                    <TasksTable 
                        isLoading={isFetching} 
                        filter={filter} 
                        tableName="tasksTable"
                    />
                </div>
            </div>
        </React.Fragment> 
    );
};

export default Tasks;
