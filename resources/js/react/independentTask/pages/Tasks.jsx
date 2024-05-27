import _ from "lodash";
import React, { useEffect } from "react";

// import { useDispatch, useSelector } from "react-redux";
// import { useCheckUnAuthorizedTaskTypeQuery, useLazyGetTaskTypeDataQuery, useLazyGetTasksQuery, useUpdateTasktypeAuthStatusMutation } from "../../services/api/tasksApiSlice";
// import { storeTasks } from "../../services/features/tasksSlice";
import { useState } from "react";
import CKEditorComponent from "../../ckeditor";
import { User } from "../../utils/user-details";
import Button from "../components/Button";
import FilterContainer from "../components/Filter-bar/FilterContainer";
import Filterbar from "../components/Filter-bar/Filterbar";
import Loader from "../components/Loader";
import Modal from "../components/Modal";
import SearchBox from "../components/Searchbox";
import SubmitButton from "../components/SubmitButton";
import Tabbar from "../components/Tabbar";
import { TaskTableColumns } from "../components/TaskTableColumns";
import TasksTable from "../components/TasksTable";
import IndependentTaskCreationForm from "../components/authorized-task/IndependentTaskCreationForm";
import TaskAuthorization from "../components/authorized-task/TaskAuthorization";
import TableFilter from "../components/table/TableFilter";
import { defaultColumnVisibility } from "../constant";
import { useRefresh } from "../index";
import { useLocation } from "react-router-dom";
import IndependentTaskExportButton from "../components/IndependentTasksExportButton";

const Tasks = ({ tableData, isLoading, onFilter, filter }) => {
    const [userId, setUserId] = useState(null);
    // Custom hook to parse query parameters
    const useQuery = () => {
        return new URLSearchParams(useLocation().search);
    };

    const query = useQuery();

    useEffect(() => {
        const status = query.get("status");
        const user_id = query.get("user_id");

        if (status === "one_more_week" && user_id) {
            // Save the user_id in state
            setUserId(user_id);
            setShowIndividualTaskCreationForm(true);
        }
    }, []);

    const [search, setSearch] = useState("");
    const { refresh, handleRefresh } = useRefresh();
    const [showIndividualTaskCreationForm, setShowIndividualTaskCreationForm] =
        useState(false);

    const [columnVisibility, setColumnVisibility] = useState(
        defaultColumnVisibility
    );

    const auth = new User(window.Laravel.user);

    let tableColumns = TaskTableColumns;

    if (true) {
        tableColumns = _.filter(TaskTableColumns, (d) => d.id !== "action");
    }

    const handleTaskAddForm = () => {
        setShowIndividualTaskCreationForm(true);
    };

    return (
        <React.Fragment>
            <FilterContainer>
                <Filterbar onFilter={onFilter} />
            </FilterContainer>

            <div className="sp1_tlr_container">
                <section className="pt-3 pr-3 d-flex justify-content-between">
                    <IndependentTaskExportButton filter={filter} />

                    <Button
                        onClick={handleRefresh}
                        variant="primary"
                        disabled={refresh}
                        style={{ paddingTop: "5px", paddingBottom: "5px" }}
                    >
                        {refresh && (
                            <span
                                className="spinner-border spinner-border-sm mr-1"
                                role="status"
                                aria-hidden="true"
                            ></span>
                        )}
                        Refresh
                    </Button>
                </section>
                <div className="sp1_tlr_tbl_container">
                    <div className="mb-3 d-flex align-items-center flex-wrap justify-content-between">
                        <Tabbar />

                        <div
                            className="d-flex align-items-center flex-wrap mb-2"
                            style={{ gap: "10px" }}
                        >
                            {_.includes([1, 4, 8], auth?.getRoleId()) && (
                                <SubmitButton
                                    onClick={handleTaskAddForm}
                                    isLoading={false}
                                >
                                    + Add Task
                                </SubmitButton>
                            )}

                            <TaskAuthorization />
                        </div>

                        <div className="mr-auto ml-2 mb-2 " />

                        <div
                            className="mr-2 mb-2"
                            style={{ maxWidth: "300px" }}
                        >
                            <SearchBox
                                value={search}
                                onChange={setSearch}
                                className="tasks_search_bar"
                            />
                        </div>

                        <div className="mb-2" style={{ marginTop: "2px" }}>
                            <TableFilter
                                tableName="tasksTable"
                                columns={tableColumns}
                                columnVisibility={columnVisibility}
                                setColumnVisibility={setColumnVisibility}
                            />
                        </div>
                    </div>

                    <IndependentTaskCreationForm
                        userId={userId}
                        isOpen={showIndividualTaskCreationForm}
                        close={() => setShowIndividualTaskCreationForm(false)}
                        projectName={"independent-task-creation-form"}
                        onSuccess={() => onFilter({})}
                    />

                    <TasksTable
                        tasks={_.orderBy(
                            tableData,
                            ["creation_date"],
                            ["desc"]
                        )}
                        isLoading={isLoading}
                        filter={filter}
                        tableName="independent-task-table"
                        search={search}
                        // reportPermission={[6, 5, 1, 8]}
                        reportPermission={[]}
                        tableColumns={tableColumns}
                        columnVisibility={columnVisibility}
                        setColumnVisibility={setColumnVisibility}
                    />
                </div>
            </div>
        </React.Fragment>
    );
};

export default Tasks;

const ShowAuthorizationTableModalComponent = () => {
    return (
        <Modal isOpen={showAuthorizationTableModal}>
            <div className="sp1_modal-content-wrapper">
                <div className="sp1_modal-panel sp1_task_auth_modal_table ">
                    {/* header */}
                    <div className="sp1_modal-head">
                        <div className="sp1_modal-title pl-2">
                            <strong>Primary Page Development</strong>
                        </div>
                        <Button
                            onClick={closeTable}
                            aria-label="ModalClose"
                            variant="tertiary"
                            className="sp1_modal-close"
                        >
                            <i className="fa-solid fa-xmark" />
                        </Button>
                    </div>
                    {/* end header */}

                    {/* body */}
                    <div className="sp1_modal-body p-3">
                        <div className="sp1_tasks_table_wrapper">
                            <table className="sp1_tasks_table">
                                <thead className="sp1_tasks_thead">
                                    <tr className="sp1_tasks_tr">
                                        <th className="sp1_tasks_th px-2">
                                            Page Name
                                        </th>
                                        <th className="sp1_tasks_th px-2">
                                            Page URL
                                        </th>
                                        <th className="sp1_tasks_th px-2">
                                            Task
                                        </th>
                                        <th className="sp1_tasks_th px-2">
                                            SubTask
                                        </th>
                                        <th className="sp1_tasks_th px-2">
                                            Assigned By
                                        </th>
                                        <th className="sp1_tasks_th px-2">
                                            Assigned To
                                        </th>
                                        <th className="sp1_tasks_th px-2">
                                            Project
                                        </th>
                                        <th className="sp1_tasks_th px-2">
                                            Client
                                        </th>
                                        <th className="sp1_tasks_th px-2">
                                            Action
                                        </th>
                                    </tr>
                                </thead>

                                <tbody className="sp1_tasks_tbody">
                                    {_.map(tasksType, (data, index) => (
                                        <tr
                                            className="sp1_tasks_tr"
                                            key={index}
                                        >
                                            <td className="sp1_tasks_td">
                                                <span className="multiline-ellipsis">
                                                    {data?.page_name}
                                                </span>
                                            </td>

                                            <td className="sp1_tasks_td ">
                                                ({" "}
                                                <a
                                                    href={data?.page_url}
                                                    style={{
                                                        color: "#4285F4 !important",
                                                    }}
                                                >
                                                    <abbr
                                                        title={data?.page_url}
                                                    >
                                                        view
                                                    </abbr>
                                                </a>{" "}
                                                )
                                            </td>
                                            <td className="sp1_tasks_td ">
                                                <abbr title={data?.task}>
                                                    <a
                                                        href={`/account/tasks/${data?.task_id}`}
                                                        className="multiline-ellipsis"
                                                    >
                                                        {data?.task}
                                                    </a>
                                                </abbr>
                                            </td>
                                            <td className="sp1_tasks_td ">
                                                <abbr title={data?.sub_task}>
                                                    <a
                                                        href={`/account/tasks/${data?.sub_task_id}`}
                                                        className="multiline-ellipsis"
                                                    >
                                                        {data?.sub_task}
                                                    </a>
                                                </abbr>
                                            </td>
                                            <td className="sp1_tasks_td ">
                                                <abbr
                                                    title={data?.added_by_name}
                                                >
                                                    <a
                                                        href={`/account/employees/${data?.added_by_id}`}
                                                        className="multiline-ellipsis"
                                                    >
                                                        {data?.added_by_name}
                                                    </a>
                                                </abbr>
                                            </td>
                                            <td className="sp1_tasks_td">
                                                <abbr
                                                    title={
                                                        data?.assigned_to_name
                                                    }
                                                >
                                                    <a
                                                        href={`/account/employees/${data?.assigned_to_id}`}
                                                        className="multiline-ellipsis"
                                                    >
                                                        {data?.assigned_to_name}
                                                    </a>
                                                </abbr>
                                            </td>
                                            <td className="sp1_tasks_td ">
                                                <abbr
                                                    title={data?.project_name}
                                                >
                                                    <a
                                                        href={`/account/tasks/${data?.project_id}`}
                                                        className="multiline-ellipsis"
                                                    >
                                                        {data?.project_name}
                                                    </a>
                                                </abbr>
                                            </td>
                                            <td className="sp1_tasks_td ">
                                                <abbr title={data?.client_name}>
                                                    <a
                                                        href={`/account/employees/${data?.client_id}`}
                                                        className="multiline-ellipsis"
                                                    >
                                                        {data?.client_name}
                                                    </a>
                                                </abbr>
                                            </td>
                                            <td className="sp1_tasks_td ">
                                                <div
                                                    className="w-fit d-flex align-items-center ml-auto"
                                                    style={{ gap: "10px" }}
                                                >
                                                    {data?.authorization_status ===
                                                    0 ? (
                                                        <React.Fragment>
                                                            <Button
                                                                onClick={() => {
                                                                    setShowAuthorizationModal(
                                                                        true
                                                                    );
                                                                    setActiveModalTaskTypeData(
                                                                        data
                                                                    );
                                                                }}
                                                                variant="success"
                                                                className="font-weight-normal py-1"
                                                            >
                                                                Authorize
                                                            </Button>
                                                            <Button
                                                                onClick={() => {
                                                                    setShowAuthorizationModal(
                                                                        true
                                                                    );
                                                                    setActiveModalTaskTypeData(
                                                                        data
                                                                    );
                                                                }}
                                                                variant="danger"
                                                                className="font-weight-normal py-1"
                                                            >
                                                                Deny
                                                            </Button>
                                                        </React.Fragment>
                                                    ) : (
                                                        <div>
                                                            {data?.authorization_status ===
                                                                1 && (
                                                                <span className="badge badge-success py-2 px-2">
                                                                    Approved
                                                                </span>
                                                            )}
                                                            {data?.authorization_status ===
                                                                2 && (
                                                                <span className="badge badge-danger py-2 px-2">
                                                                    {" "}
                                                                    Denied{" "}
                                                                </span>
                                                            )}
                                                        </div>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    {/* end body */}
                </div>
            </div>
        </Modal>
    );
};

{
    /* Flyover */
}
const ActiveModalTaskTypeData = () => {
    return (
        <Modal
            isOpen={
                showAuthorizationModal &&
                (activeModalTaskTypeData !== null ? true : false)
            }
        >
            <div className="sp1_modal-content-wrapper">
                <div className="sp1_modal-panel sp1_task_auth_modal ">
                    {/* header */}
                    <div className="sp1_modal-head">
                        <div className="sp1_modal-title pl-2">
                            <strong>Primary Page Development</strong>
                        </div>
                        <Button
                            onClick={close}
                            aria-label="ModalClose"
                            variant="tertiary"
                            className="sp1_modal-close"
                        >
                            <i className="fa-solid fa-xmark" />
                        </Button>
                    </div>
                    {/* end header */}

                    {/* body */}
                    <div className="sp1_modal-body p-3">
                        <ul className="sp1_modal_items px-3">
                            <li>
                                <b>Page name: </b>{" "}
                                {activeModalTaskTypeData?.page_name}
                            </li>
                            <li>
                                <b>Page URL: </b>{" "}
                                {activeModalTaskTypeData?.page_url}
                            </li>
                            <li>
                                <b>Task: </b> {activeModalTaskTypeData?.task}
                            </li>
                            <li>
                                <b>Sub-Task: </b>{" "}
                                {activeModalTaskTypeData?.sub_task}
                            </li>
                            <li>
                                <b> Assigned By: </b>{" "}
                                {activeModalTaskTypeData?.added_by_name}
                            </li>
                            <li>
                                <b> Assigned To: </b>{" "}
                                {activeModalTaskTypeData?.assigned_to_name}
                            </li>
                            <li>
                                <b> Project: </b>{" "}
                                {activeModalTaskTypeData?.project_name}
                            </li>
                            <li>
                                <b> Client: </b>{" "}
                                {activeModalTaskTypeData?.client_name}
                            </li>
                        </ul>

                        <div className="form-group py-3">
                            <label className="font-weight-bold">
                                {" "}
                                Comment: <sup>*</sup>{" "}
                            </label>
                            <div className="ck-editor-holder stop-timer-options">
                                <CKEditorComponent
                                    onChange={(e, editor) => {
                                        const d = editor.getData();
                                        setComment(d);
                                    }}
                                />
                            </div>
                        </div>

                        <div className="w-100 mt-3">
                            <div
                                className="w-fit d-flex align-items-center ml-auto"
                                style={{ gap: "10px" }}
                            >
                                {isLoading ? (
                                    <span className="badge badge-light py-2 px-2 f-14 ml-auto">
                                        <Loader />
                                    </span>
                                ) : activeModalTaskTypeData?.authorization_status ===
                                  0 ? (
                                    <React.Fragment>
                                        <Button
                                            onClick={(e) =>
                                                handleUpdateTaskTypeAuthorizationStatus(
                                                    e,
                                                    "approved",
                                                    activeModalTaskTypeData?.id
                                                )
                                            }
                                            variant="success"
                                            className="ml-auto"
                                        >
                                            Authorize
                                        </Button>
                                        <Button
                                            onClick={(e) =>
                                                handleUpdateTaskTypeAuthorizationStatus(
                                                    e,
                                                    "denied",
                                                    activeModalTaskTypeData?.id
                                                )
                                            }
                                            variant="danger"
                                        >
                                            Deny
                                        </Button>
                                    </React.Fragment>
                                ) : (
                                    <div>
                                        {activeModalTaskTypeData?.authorization_status ===
                                            1 && (
                                            <span className="badge badge-success py-2 px-2 f-14">
                                                Approved
                                            </span>
                                        )}
                                        {activeModalTaskTypeData?.authorization_status ===
                                            2 && (
                                            <span className="badge badge-danger py-2 px-2 f-14">
                                                {" "}
                                                Denied{" "}
                                            </span>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    {/* end body */}
                </div>
            </div>
        </Modal>
    );
};
