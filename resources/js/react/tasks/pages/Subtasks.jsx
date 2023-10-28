import React, {useState, useEffect, useContext} from "react";
import Tabbar from "../components/Tabbar";
import SubTasksTable from "../components/SubtaskTable";
import FilterContainer from "../components/Filter-bar/FilterContainer";
import Filterbar from "../components/Filter-bar/Filterbar";
import { useDispatch, useSelector } from "react-redux";
import SearchBox from "../components/Searchbox";
import { useLazyGetAllSubtaskQuery } from "../../services/api/tasksApiSlice";
import { storeSubTasks } from "../../services/features/tasksSlice";
import { SubTasksTableColumns } from "../components/SubtaskTableColumns";
import { User } from "../../utils/user-details";
import TableFilter from "../components/table/TableFilter";
import _ from "lodash";
import { defaultColumnVisibility } from "../constant";


// current user
const auth = new User(window.Laravel.user);

const Subtasks = () => {
    const {tasks} = useSelector(s => s.tasks)
    const dispatch = useDispatch();
    const [filter, setFilter] = React.useState(null);
    const [search,setSearch] = React.useState('');
    const [columnVisibility, setColumnVisibility] = React.useState(new Object(defaultColumnVisibility(auth)))

    const [getAllSubtask, {isFetching}] = useLazyGetAllSubtaskQuery();

    const onFilter = (filter) => {
        const queryObject = _.pickBy(filter, Boolean);
        const queryString = new URLSearchParams(queryObject).toString();
        setFilter(queryObject);


        if(filter?.start_date && filter?.end_date){
            getAllSubtask(`${queryString}`)
            .unwrap()
            .then(res => {

                let _data = res?.tasks
                if(auth.getRoleId() === 4){
                    _data = _.filter(res.tasks, d => Number(d.project_manager_id) === auth.getId());
                }else if(auth.getRoleId() === 6){
                    _data = _.filter(res.tasks, d => Number(d.added_by) === auth.getId());
                }else if(auth.getRoleId() === 9 || auth.getRoleId() === 10){
                    _data = _.filter(res.tasks, d => Number(d.assigned_to_id) === auth.getId());
                }

                const data = _.orderBy(_data, 'due_date', 'desc');
                dispatch(storeSubTasks({subtasks: data}))
            })
            .catch(err => console.log(err))
        }
    }

    // let tableColumns = SubTasksTableColumns;

    const handleFilterColumns = (tableColumns=[],role)=>{
        let newTableColumns;
        if (role === 5) {
            // console.log('if',{role});
            newTableColumns = tableColumns.filter((d)=>{
              return d.id !== "action" && d.id !== "milestone" && d.id !== "deliverable" && d.id !== "project" && d.id !== "assigned_to";
            })
        }else{
            // console.log('else',{role});
            newTableColumns = tableColumns.filter((d)=>{
              return d.id !== "action";
            })
        }

        return newTableColumns;
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
                        <div className="ml-auto" style={{maxWidth: '300px'}}>
                            <SearchBox value={search} onChange={setSearch} />
                        </div>
                        <div className="ml-2" style={{marginTop: '2px'}}>
                            <TableFilter
                                tableName="subTaskTable"
                                columns = {handleFilterColumns(SubTasksTableColumns,auth?.getRoleId())}
                                columnVisibility={columnVisibility}
                                setColumnVisibility={setColumnVisibility}
                            />
                        </div>
                    </div>

                    <SubTasksTable
                        isLoading={isFetching}
                        filter={filter}
                        tableName="subTaskTable"
                        search={search}
                        reportPermission = {[1,8,5]}
                        columnVisibility = {columnVisibility}
                        setColumnVisibility={setColumnVisibility}
                        tableColumns={handleFilterColumns(SubTasksTableColumns,auth?.getRoleId())}
                    />
                </div>
            </div>
        </React.Fragment>
    );
};

export default Subtasks;
