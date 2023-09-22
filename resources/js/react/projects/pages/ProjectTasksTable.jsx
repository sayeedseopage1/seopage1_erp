import _ from "lodash";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useProject } from "../../hooks/useProject";
import {
    useLazyGetAllSubtaskQuery,
    useLazyGetTasksQuery,
} from "../../services/api/tasksApiSlice";
import {
    setFilterOption,
    storeSubTasks,
    storeTasks,
} from "../../services/features/tasksSlice";
import Dropdown from "../../tasks/components/Dropdown";
import SearchBox from "../../tasks/components/Searchbox";
import SubmitButton from "../../tasks/components/SubmitButton";
import SubTasksTable from "../../tasks/components/SubtaskTable";
import TasksTable from "../../tasks/components/TasksTable";
import { User } from "../../utils/user-details";
import JqueryDateRangePicker from "../components/JqueryDateRangePicker";
import ProjectManagerGuideline from "../components/ProjectManagerGuideline";
import { ProjectTableColumns } from "../components/ProjectTaskTableColumns";
import ProjectTasksFilterBar from "../components/ProjectTasksFilterBar";
import { SubTasksTableColumns } from "../components/SubtaskTableColumns";
import TaskCreationForm from "../components/TaskCreationForm";

const ProjectTasks = () => {
    const { tasks } = useSelector((s) => s.tasks);
    const [tableType, setTableType] = React.useState("Tasks");
    const dispatch = useDispatch();
    const [getTasks, { isFetching: taskFetching }] = useLazyGetTasksQuery();
    const [filter, setFilter] = React.useState(null);
    const [search, setSearch] = React.useState("");
    const [startDate, setStartDate] = React.useState(null);
    const [endDate, setEndDate] = React.useState(null);
    const [showTaskCreationForm, setShowTaskCreationForm] =
        React.useState(false);
    const [showProjectGuidelineForm, setShowProjectGuidelineForm] =
        React.useState(false);
    const [hasPMGuideline, setHasPMGuideline] = React.useState(false);
    const [getAllSubtask, { isFetching: subtaskFetching }] =
        useLazyGetAllSubtaskQuery();
    const params = useParams();
    const {
        isDeliverable,
        getProjectGuidelineStaus,
        projectDeliverableStatusIsLoading,
        projectGuidelineStatusIsLoading,
        isTaskGuidelineAuthorized,
    } = useProject();

    const projectId = params?.projectId;
    const auth = new User(window?.Laravel?.user);

    // handle table filter
    const onFilter = (query) => {
        let filter = {
            start_date: startDate,
            end_date: endDate,
            project_id: params?.projectId,
            ...query,
        };

        const queryObject = _.pickBy(filter, Boolean);
        const queryString = new URLSearchParams(queryObject).toString();
        setFilter(queryObject);

        dispatch(setFilterOption({ filter: queryObject }));

        if (startDate && endDate) {
            if (tableType.toLowerCase() === "tasks") {
                getTasks(`?${queryString}`)
                    .unwrap()
                    .then((res) => {
                        const data = _.orderBy(res?.tasks, "due_date", "desc");
                        dispatch(storeTasks({ tasks: data }));
                    })
                    .catch((err) => console.log(err));
            } else {
                getAllSubtask(`${queryString}`)
                    .unwrap()
                    .then((res) => {
                        const data = _.orderBy(res?.tasks, "due_date", "desc");
                        dispatch(storeSubTasks({ subtasks: data }));
                    })
                    .catch((err) => console.log(err));
            }
        }
    };

    const start_date = React.useMemo(() => startDate, [startDate]);
    const end_date = React.useMemo(() => endDate, [endDate]);

    // on date change filter
    React.useEffect(() => {
        if ((end_date, start_date)) {
            const _f = { ...filter, end_date, start_date };
            onFilter(_f);
        }
    }, [start_date, end_date, tableType]);

    // hanlde task add form
    const handleTaskAddForm = async (e) => {
        e.preventDefault();
        const deliverable = await isDeliverable(projectId);
        console.log({deliverable})
        if (deliverable) {
            const guideline = await getProjectGuidelineStaus(projectId); 
            console.log({guideline})
            if (guideline) {
                const isAuthorized = await isTaskGuidelineAuthorized(projectId);
                console.log({isAuthorized})
                if(isAuthorized){
                    setShowTaskCreationForm(true);
                }
            } else setShowProjectGuidelineForm(true);
        }
    };

    const isFetching = subtaskFetching || taskFetching;

    const singleTask = _.head(tasks);

    return (
        <React.Fragment>
            {/* task creation form */}
            <TaskCreationForm
                isOpen={showTaskCreationForm}
                close={() => setShowTaskCreationForm(false)}
                projectName={singleTask?.project_name}
                onSuccess={() => onFilter({})}
            />
            {/* project manager guideline creation form */}
            <ProjectManagerGuideline
                projectId={params.projectId}
                isOpen={showProjectGuidelineForm}
                openTaskForm={() => setShowTaskCreationForm(true)}
                close={() => setShowProjectGuidelineForm(false)}
            />

            {/* end task creation form */}
            <div className="sp1_tlr_container">
                <div className="sp1_tlr_tbl_container pt-1">
                    {/* table navbar */}
                    <div className="sp1_table-navbar">
                        <div
                            className="d-flex align-items-center flex-wrap"
                            style={{ gap: "10px" }}
                        >
                            {/* table selection */}
                            <Dropdown className="">
                                <Dropdown.Toggle
                                    icon={false}
                                    className="sp1_table_tab--dd-toggle"
                                >
                                    <i className="fa-solid fa-table"></i>
                                    <span> {tableType} </span>
                                    <i className="fa-solid fa-chevron-down f-12"></i>
                                </Dropdown.Toggle>
                                <Dropdown.Menu className="sp1_table_tab--dd-menu">
                                    <Dropdown.Item
                                        onClick={() => setTableType("Tasks")}
                                        className={`sp1_table_tab--dd-item ${
                                            tableType === "Tasks" && "active"
                                        }`}
                                    >
                                        Tasks
                                    </Dropdown.Item>
                                    <Dropdown.Item
                                        onClick={() => setTableType("Subtasks")}
                                        className={`sp1_table_tab--dd-item ${
                                            tableType === "Subtasks" && "active"
                                        }`}
                                    >
                                        Subtasks
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                            {/* end Table selection */}

                            {!isFetching &&
                                tableType.toLowerCase() === "tasks" &&
                                _.includes([1, 4], auth?.getRoleId()) && (
                                    <SubmitButton
                                        onClick={handleTaskAddForm}
                                        isLoading={
                                            projectDeliverableStatusIsLoading ||
                                            projectGuidelineStatusIsLoading
                                        }
                                    >
                                        + Add Task
                                    </SubmitButton>
                                )}
                        </div>

                        <div className="sp1_table_tab">
                            <ProjectTasksFilterBar
                                onFilter={onFilter}
                                page={tableType.toLowerCase()}
                            />

                            <JqueryDateRangePicker
                                startDate={startDate}
                                endDate={endDate}
                                setEndDate={setEndDate}
                                setStartDate={setStartDate}
                            />

                            <div className="">
                                <SearchBox
                                    value={search}
                                    onChange={setSearch}
                                    className="mb-1"
                                />
                            </div>
                        </div>
                    </div>
                    {/* table nav bar */}
                    <div className="d-flex w-100 align-items-center justify-content-center flex-wrap">
                        <div
                            className="d-flex align-items-center justify-content-center border p-2"
                            style={{ gap: "10px", width: "fit-content" }}
                        >
                            <span>
                                <span style={{ color: "#5c5e60" }}>
                                    Project Manager:
                                </span>
                                <a
                                    href={`/account/employee/${singleTask?.project_manager_id}`}
                                    className="text-success hover-underline"
                                >
                                    <strong>{singleTask?.pm_id_name}</strong>
                                </a>
                                ,
                            </span>
                            <span>
                                <span style={{ color: "#5c5e60" }}>
                                    
                                    Client:
                                </span>
                                <a
                                    href={`/account/clients/${singleTask?.client_id}`}
                                    className="text-success hover-underline"
                                >
                                    <strong>{singleTask?.client_name}</strong>
                                </a>
                            </span>
                        </div>
                    </div>

                    <div className="mt-3">
                        {tableType.toLowerCase() === "tasks" ? (
                            <TasksTable
                                isLoading={isFetching}
                                filter={filter}
                                tableName="projectTasksTable"
                                search={search}
                                reportPermission={[5, 1, 8]}
                                hideColumns={[
                                    "project",
                                    "client",
                                    "project_manager",
                                ]}
                                tableColumns={ProjectTableColumns}
                            />
                        ) : (
                            <SubTasksTable
                                isLoading={isFetching}
                                filter={filter}
                                tableName="projectSubTasksTable"
                                search={search}
                                reportPermission={[5, 1, 8]}
                                hideColumns={[
                                    "project",
                                    "client",
                                    "project_manager",
                                ]}
                                tableColumns={SubTasksTableColumns}
                            />
                        )}
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};

export default ProjectTasks;
