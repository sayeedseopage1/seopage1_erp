import _ from "lodash";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import Loader from "../../global/Loader";
import TaskAuthorization from "../../projects/components/TaskAuthorization";
import { useCheckUnAuthorizedTaskTypeQuery, useLazyGetTasksQuery } from "../../services/api/tasksApiSlice";
import { storeTasks } from "../../services/features/tasksSlice";
import { User } from "../../utils/user-details";
import Button from "../components/Button";
import FilterContainer from "../components/Filter-bar/FilterContainer";
import Filterbar from "../components/Filter-bar/Filterbar";
import PrimaryPageAuthorizationTable from "../components/PrimaryPageAuthorizationTable";
import SearchBox from "../components/Searchbox";
import Tabbar from "../components/Tabbar";
import { TaskTableColumns } from "../components/TaskTableColumns";
import TasksTable from "../components/TasksTable";
import TableFilter from "../components/table/TableFilter";
import { defaultColumnVisibility } from "../constant";

const auth = new User(window.Laravel.user);

const Tasks = () => {
    const {tasks} = useSelector(s => s.tasks)
    const dispatch = useDispatch();
    const [getTasks, {isFetching, isLoading}] = useLazyGetTasksQuery();
    const [filter, setFilter] = React.useState(null);
    const [search,setSearch] = React.useState('');
    const [columnVisibility, setColumnVisibility] = React.useState(new Object(defaultColumnVisibility(auth)))

    // api function
    const { data: unAuthorizedType } = useCheckUnAuthorizedTaskTypeQuery();

    const [searchParams, setSearchParams] = useSearchParams();

    const onFilter = async (filter) => {

        const queryObject = _.pickBy(filter, Boolean);
        const queryString = new URLSearchParams(queryObject).toString();
        setFilter(queryObject);

        if(filter?.start_date && filter?.end_date){
            await getTasks(`?${queryString}`)
            .unwrap()
            .then(res => {
                let _data = res?.tasks
                if(auth.getRoleId() === 4){
                    _data = _.filter(res.tasks, d => Number(d.project_manager_id) === auth.getId());
                }else if(auth.getRoleId() === 6 || auth.getRoleId() === 9 || auth.getRoleId() === 10){
                    _data = _.filter(res.tasks, d => Number(d.assigned_to_id) === auth.getId());
                }

                const data = _.orderBy(_data, 'due_date', 'desc');
                dispatch(storeTasks({tasks: data}))
            })
            .catch(err => console.log(err))
        }
    }

    // handle refresh button
    const onRefreshButtonClick = (e) => {
        e.preventDefault();
        onFilter(filter);
    }


    // fetch table data
    const fetchTasksTypeData = () => {
        searchParams.set('modal', 'primary_task_authorization');
        searchParams.set('show', 'pending');
        setSearchParams(searchParams)
    }


    let tableColumns = TaskTableColumns;

    if(auth?.getRoleId() !== 6){
        tableColumns = _.filter(TaskTableColumns, d => d.id !== "action");
    }

    const isProjectManager = auth.getRoleId() === 4 ? true : false;

    const primaryPageButton = isProjectManager
        ? "Primary Page [Awaiting Authorization]"
        : "Primary Page [Need Authorization]";


    return (
        <React.Fragment>
            <FilterContainer>
                <Filterbar onFilter={onFilter} />
            </FilterContainer>

            <div className="sp1_tlr_container">
                <div className="sp1_tlr_tbl_container">
                    <div className="mb-3 d-flex align-items-center flex-wrap justify-content-between">
                        <Tabbar/>

                        {
                            _.includes([1, 8], auth?.getRoleId()) &&
                            <Button
                                onClick={fetchTasksTypeData}
                                className="sp1_tlr_tab active ml-2 mb-2 text-white"
                            >

                                    <i className="fa-solid fa-hourglass-half" />
                                      {primaryPageButton}
                                    <span className="badge badge-light">{unAuthorizedType?.task_types}</span>

                            </Button>
                        }

                        <div className="mr-auto ml-2 mb-2 ">
                            <TaskAuthorization  />
                        </div>

                        <div className="mr-2 mb-2">
                            <Button onClick={onRefreshButtonClick}>
                                {isFetching ? <Loader title="Loading..." borderRightColor="white" /> : 'Refresh'}
                            </Button>
                        </div>
                        <div className="mr-2 mb-2" style={{maxWidth: '300px'}}>
                            <SearchBox
                                value={search}
                                onChange={setSearch}
                                className="tasks_search_bar"
                            />
                        </div>

                        <div className="mb-2" style={{marginTop: '3px'}}>
                            <TableFilter
                                tableName="tasksTable"
                                columns = {tableColumns}
                                columnVisibility={columnVisibility}
                                setColumnVisibility={setColumnVisibility}
                            />
                        </div>

                    </div>


                    <TasksTable
                        isLoading={isFetching}
                        filter={filter}
                        tableName="tasksTable"
                        search={search}
                        reportPermission={[6, 5, 1, 8]}
                        tableColumns={tableColumns}
                        columnVisibility = {columnVisibility}
                        setColumnVisibility = {setColumnVisibility}
                    />

                    
                </div>
            </div>
            <PrimaryPageAuthorizationTable />
        </React.Fragment>
    );
};

export default Tasks;
