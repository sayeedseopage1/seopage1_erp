import React, {useState, useEffect, useContext} from "react";
import Tabbar from "../components/Tabbar";
import SubTasksTable from "../components/SubtaskTable";
import FilterContainer from "../components/Filter-bar/FilterContainer";
import Filterbar from "../components/Filter-bar/Filterbar";
import { useDispatch, useSelector } from "react-redux";
import SearchBox from "../components/Searchbox";
import { useLazyGetAllSubtaskQuery } from "../../services/api/tasksApiSlice";
import { storeSubTasks } from "../../services/features/tasksSlice";

const Subtasks = () => {
    const {tasks} = useSelector(s => s.tasks)
    const dispatch = useDispatch(); 
    const [filter, setFilter] = React.useState(null);
    const [search,setSearch] = React.useState('');

    const [getAllSubtask, {isFetching}] = useLazyGetAllSubtaskQuery();

    const onFilter = (filter) => {
        const queryObject = _.pickBy(filter, Boolean);
        const queryString = new URLSearchParams(queryObject).toString();
        setFilter(queryObject);


        if(filter?.start_date && filter?.end_date){
            getAllSubtask(`${queryString}`)
            .unwrap()
            .then(res => {
                const data = _.orderBy(res?.tasks, 'due_date', 'desc');
                dispatch(storeSubTasks({subtasks: data}))
            })
            .catch(err => console.log(err))
        }
    }




    return (
        <React.Fragment>
            <FilterContainer>
                <Filterbar onFilter={onFilter} page="subtasks"/> 
            </FilterContainer>
            <div className="sp1_tlr_container">
                <div className="sp1_tlr_tbl_container">
                    <div className="mb-3 d-flex align-items-center flex-wrap justify-content-between">
                        <Tabbar/>
                        <div style={{maxWidth: '300px'}}>
                            <SearchBox value={search} onChange={setSearch} />
                        </div>
                    </div>
                     
                    <SubTasksTable 
                        isLoading={isFetching} 
                        filter={filter} 
                        tableName="tasksTable"
                        search={search}
                        reportPermission = {[1,8,5]}
                    />
                </div>
            </div>
        </React.Fragment>
    );
};

export default Subtasks;
