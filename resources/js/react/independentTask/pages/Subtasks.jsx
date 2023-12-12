import _ from "lodash";
import React from "react";
import { useGetIndependentSubtasksMutation } from "../../services/api/independentTaskApiSlice";
import { User } from "../../utils/user-details";
import FilterContainer from "../components/Filter-bar/FilterContainer";
import Filterbar from "../components/Filter-bar/Filterbar";
import SearchBox from "../components/Searchbox";
import SubTasksTable from "../components/SubtaskTable";
import { SubTasksTableColumns } from "../components/SubtaskTableColumns";
import Tabbar from "../components/Tabbar";
import TableFilter from "../components/table/TableFilter";
import { defaultColumnVisibility } from "../constant";
import { useIndependentTask } from "../context/IndependentTaskProvider";

const Subtasks = () => {
    const { subTaskTableData, setSubtaskTableData } = useIndependentTask();
    const [filter, setFilter] = React.useState(null);
    const [search,setSearch] = React.useState('');
    const auth = new User(window.Laravel.user);
    const [columnVisibility, setColumnVisibility] = React.useState(defaultColumnVisibility)

    // const [getAllSubtask, {isFetching}] = useLazyGetAllSubtaskQuery();
    const [ getIndependentSubtasks, { isLoading, isFetching }] = useGetIndependentSubtasksMutation();

    const onFilter = async (filter) => {
        const queryObject = _.pickBy(filter, Boolean);
        const queryString = new URLSearchParams(queryObject).toString();
        setFilter(queryObject);

        if(!filter?.start_date && !filter?.end_date) return;

        try {
           // fetch independent subtasks
           const res = await getIndependentSubtasks(queryString).unwrap();
           setSubtaskTableData(res.data);

        } catch (error) {
           console.error(error);
        }
    }

    const handleRefresh = () => {
        onFilter(filter);
    }


    let tableColumns = SubTasksTableColumns;

    if(auth?.getRoleId() !== 5){
        tableColumns = _.filter(SubTasksTableColumns, d => d.id !== "action");
    }



    return (
        <React.Fragment>
            <FilterContainer>
                <Filterbar onFilter={onFilter} page="subtasks"/>
            </FilterContainer>
            <div className="sp1_tlr_container">
            <section className="pt-3 pr-3 d-flex justify-content-end">
                    <button
                        onClick={handleRefresh}
                        className="btn btn-primary"
                        type="button"
                        disabled={isLoading}
                        style={{paddingTop:"5px",paddingBottom:"5px"}}
                    >
                        {isLoading && (
                            <span
                                className="spinner-border spinner-border-sm mr-1"
                                role="status"
                                aria-hidden="true"
                            />
                        )}
                        Refresh
                    </button>
                </section>
                <div className="sp1_tlr_tbl_container">
                    <div className="mb-3 d-flex align-items-center flex-wrap justify-content-between">
                        <Tabbar/>
                        <div className="ml-auto" style={{maxWidth: '300px'}}>
                            <SearchBox value={search} onChange={setSearch} />
                        </div>
                        <div className="ml-2" style={{marginTop: '2px'}}>
                            <TableFilter
                                tableName="independent_subtask_table"
                                columns = {_.filter(tableColumns, col => col.id !== 'expend')}
                                columnVisibility={columnVisibility}
                                setColumnVisibility={setColumnVisibility}
                            />
                        </div>
                    </div>

                    <SubTasksTable
                        isLoading={isLoading}
                        filter={filter}
                        tableName="independent_subtask_table"
                        search={search}
                        tableData={subTaskTableData}
                        reportPermission = {[1,8,5]}
                        columnVisibility = {columnVisibility}
                        setColumnVisibility={setColumnVisibility}
                        tableColumns={tableColumns}
                    />
                </div>
            </div>
        </React.Fragment>
    );
};

export default Subtasks;
