import _ from "lodash";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useCheckUnAuthorizedTaskTypeQuery, useLazyGetTaskTypeDataQuery, useLazyGetTasksQuery, useUpdateTasktypeAuthStatusMutation } from "../../services/api/tasksApiSlice";
import { storeTasks } from "../../services/features/tasksSlice";
import Button from "../components/Button";
import FilterContainer from "../components/Filter-bar/FilterContainer";
import Filterbar from "../components/Filter-bar/Filterbar";
import Modal from "../components/Modal";
import SearchBox from "../components/Searchbox";
import Tabbar from "../components/Tabbar";
import { TaskTableColumns } from "../components/TaskTableColumns";
import TasksTable from "../components/TasksTable";
import { User } from "../../utils/user-details";
import CKEditorComponent from "../../ckeditor";
import Loader from "../components/Loader";
import TaskAuthorization from "../../projects/components/TaskAuthorization";

const Tasks = () => {
    const {tasks} = useSelector(s => s.tasks)
    const [tasksType, setTasksType] = React.useState([]);
    const dispatch = useDispatch();
    const [getTasks, {isFetching}] = useLazyGetTasksQuery();
    const [filter, setFilter] = React.useState(null);
    const [search,setSearch] = React.useState('');
    const [showAuthorizationModal, setShowAuthorizationModal] = React.useState(false);
    const [showAuthorizationTableModal, setShowAuthorizationTableModal] = React.useState(false);
    const [activeModalTaskTypeData, setActiveModalTaskTypeData] = React.useState(null);
    const [comment, setComment] = React.useState('');

    // api function
    const [updateTasktypeAuthStatus, {isLoading}] = useUpdateTasktypeAuthStatusMutation();
    const { data: unAuthorizedType } = useCheckUnAuthorizedTaskTypeQuery();
    const auth = new User(window.Laravel.user);

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


    const [
        getTaskTypeData,
        {isFetching: tasksTypeDataIsFetching}
    ] = useLazyGetTaskTypeDataQuery();


    // fetch table data
    const fetchTasksTypeData = async () => {
        try{
            const res = await getTaskTypeData().unwrap();
            setTasksType(res.data);

            setShowAuthorizationTableModal(true)
        }catch(err){
            console.log(err)
        }
    }

    // update tasks-type authorization status
    const handleUpdateTaskTypeAuthorizationStatus = async (e, type, task_type_id) => {
        e.preventDefault();
        try{
            const res = await updateTasktypeAuthStatus({status: type, task_type_id, comment }).unwrap();
            // console.log(res)
            if(res){
                setTasksType(prev => _.map(prev, d => d.id === task_type_id ? {...prev, authorization_status: res.authorization_status} : prev ))
                setActiveModalTaskTypeData(null);
                close();
            }
        }catch(err){
            console.log(err)
        }
    }

    const closeTable = () => setShowAuthorizationTableModal(false);
    const close = () => setShowAuthorizationModal(false);



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
                                {tasksTypeDataIsFetching ? 'Loading...' : <> Authorize <span className="badge badge-light">{unAuthorizedType?.task_types}</span> </>}
                            </Button>
                        }

                        <div className="mr-auto ml-2 mb-2 ">
                        <TaskAuthorization  />
                        </div>

                        <div className="mb-2" style={{maxWidth: '300px'}}>
                            <SearchBox value={search} onChange={setSearch} />
                        </div>
                    </div>

                    <TasksTable
                        isLoading={isFetching}
                        filter={filter}
                        tableName="tasksTable"
                        search={search}
                        reportPermission={[6, 5, 1, 8]}
                        tableColumns={TaskTableColumns}
                        hideColumns={auth?.getRoleId() !== 6 ? ["action"] : [] }
                    />
                </div>
            </div>

                <Modal isOpen={showAuthorizationTableModal}>
                    <div className="sp1_modal-content-wrapper">
                        <div className="sp1_modal-panel sp1_task_auth_modal_table ">
                            {/* header */}
                            <div className="sp1_modal-head">
                                <div className="sp1_modal-title pl-2"><strong>Primary Page Development</strong></div>
                                <Button
                                    onClick={closeTable}
                                    aria-label="ModalClose"
                                    variant='tertiary'
                                    className='sp1_modal-close'
                                >
                                    <i className='fa-solid fa-xmark'/>
                                </Button>
                            </div>
                            {/* end header */}

                            {/* body */}
                            <div className="sp1_modal-body p-3">
                                <div className="sp1_tasks_table_wrapper">
                                    <table className="sp1_tasks_table">
                                        <thead className="sp1_tasks_thead">
                                            <tr className="sp1_tasks_tr">
                                                <th className="sp1_tasks_th px-2">Page Name</th>
                                                <th className="sp1_tasks_th px-2">Page URL</th>
                                                <th className="sp1_tasks_th px-2">Task</th>
                                                <th className="sp1_tasks_th px-2">SubTask</th>
                                                <th className="sp1_tasks_th px-2">Assigned By</th>
                                                <th className="sp1_tasks_th px-2">Assigned To</th>
                                                <th className="sp1_tasks_th px-2">Project</th>
                                                <th className="sp1_tasks_th px-2">Client</th>
                                                <th className="sp1_tasks_th px-2">Action</th>
                                            </tr>
                                        </thead>

                                        <tbody className="sp1_tasks_tbody">
                                            {_.map(tasksType, (data, index) => (
                                                <tr className="sp1_tasks_tr" key={index}>
                                                    <td className="sp1_tasks_td">
                                                        <span className="multiline-ellipsis">
                                                            {data?.page_name}
                                                        </span>
                                                    </td>

                                                    <td className="sp1_tasks_td ">
                                                        ( <a href={data?.page_url} style={{color: '#4285F4 !important'}}>
                                                         <abbr title={data?.page_url}>
                                                            view
                                                         </abbr>
                                                        </a> )
                                                    </td>
                                                    <td className="sp1_tasks_td ">
                                                       <abbr title={data?.task}>
                                                            <a href={`/account/tasks/${data?.task_id}`} className="multiline-ellipsis">
                                                                {data?.task}
                                                            </a>
                                                       </abbr>
                                                    </td>
                                                    <td className="sp1_tasks_td ">
                                                        <abbr title={data?.sub_task}>
                                                            <a href={`/account/tasks/${data?.sub_task_id}`} className="multiline-ellipsis">
                                                                {data?.sub_task}
                                                            </a>
                                                        </abbr>
                                                    </td>
                                                    <td className="sp1_tasks_td ">
                                                        <abbr title={data?.added_by_name}>
                                                            <a href={`/account/employees/${data?.added_by_id}`} className="multiline-ellipsis">
                                                                {data?.added_by_name}
                                                            </a>
                                                        </abbr>
                                                    </td>
                                                    <td className="sp1_tasks_td">
                                                        <abbr title={data?.assigned_to_name}>
                                                            <a href={`/account/employees/${data?.assigned_to_id}`} className="multiline-ellipsis">
                                                                {data?.assigned_to_name}
                                                            </a>
                                                        </abbr>
                                                    </td>
                                                    <td className="sp1_tasks_td ">
                                                        <abbr title={data?.project_name} >
                                                        <a href={`/account/tasks/${data?.project_id}`} className="multiline-ellipsis">
                                                            {data?.project_name}
                                                        </a>
                                                        </abbr>
                                                    </td>
                                                    <td className="sp1_tasks_td ">
                                                       <abbr title={data?.client_name}>
                                                       <a href={`/account/employees/${data?.client_id}`} className="multiline-ellipsis">
                                                            {data?.client_name}
                                                        </a>
                                                       </abbr>
                                                    </td>
                                                    <td className="sp1_tasks_td ">
                                                        <div className="w-fit d-flex align-items-center ml-auto" style={{gap: '10px'}}>
                                                            {
                                                                data?.authorization_status  === 0 ?
                                                                    <React.Fragment>
                                                                        <Button
                                                                            onClick={() => {
                                                                                setShowAuthorizationModal(true);
                                                                                setActiveModalTaskTypeData(data);
                                                                            }}
                                                                            variant="success"
                                                                            className="font-weight-normal py-1"
                                                                        >
                                                                            Authorize
                                                                        </Button>
                                                                        <Button
                                                                            onClick={() => {
                                                                                setShowAuthorizationModal(true);
                                                                                setActiveModalTaskTypeData(data);
                                                                            }}
                                                                            variant="danger"
                                                                            className="font-weight-normal py-1"
                                                                        >
                                                                            Deny
                                                                        </Button>
                                                                    </React.Fragment>
                                                                    :
                                                                    <div>
                                                                        {data?.authorization_status  === 1 && <span className="badge badge-success py-2 px-2">Approved</span>}
                                                                        {data?.authorization_status  === 2 && <span className="badge badge-danger py-2 px-2"> Denied </span>}
                                                                    </div>
                                                            }
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


            {/* Flyover */}
            <Modal isOpen={showAuthorizationModal && (activeModalTaskTypeData !== null ? true : false)}>
                    <div className="sp1_modal-content-wrapper">
                        <div className="sp1_modal-panel sp1_task_auth_modal ">
                            {/* header */}
                            <div className="sp1_modal-head">
                                <div className="sp1_modal-title pl-2"><strong>Primary Page Development</strong></div>
                                <Button onClick={close} aria-label="ModalClose" variant='tertiary' className='sp1_modal-close'>
                                    <i className='fa-solid fa-xmark'/>
                                </Button>
                            </div>
                            {/* end header */}

                            {/* body */}
                            <div className="sp1_modal-body p-3">
                                <ul className="sp1_modal_items px-3">
                                  <li><b>Page name: </b> {activeModalTaskTypeData?.page_name}</li>
                                  <li><b>Page URL: </b> {activeModalTaskTypeData?.page_url}</li>
                                  <li><b>Task: </b> {activeModalTaskTypeData?.task}</li>
                                  <li><b>Sub-Task: </b> {activeModalTaskTypeData?.sub_task}</li>
                                  <li><b> Assigned By: </b> {activeModalTaskTypeData?.added_by_name}</li>
                                  <li><b> Assigned To: </b> {activeModalTaskTypeData?.assigned_to_name}</li>
                                  <li><b> Project: </b> {activeModalTaskTypeData?.project_name}</li>
                                  <li><b> Client: </b> {activeModalTaskTypeData?.client_name}</li>
                                </ul>



                                <div className="form-group py-3">
                                    <label className="font-weight-bold"> Comment: <sup>*</sup>  </label>
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
                                    <div className="w-fit d-flex align-items-center ml-auto" style={{gap: '10px'}}>
                                        {
                                            isLoading ?
                                              <span className="badge badge-light py-2 px-2 f-14 ml-auto">
                                                <Loader />
                                                </span>
                                            :
                                            activeModalTaskTypeData?.authorization_status  === 0 ?
                                            <React.Fragment>
                                                <Button
                                                    onClick={(e) => handleUpdateTaskTypeAuthorizationStatus(e, 'approved', activeModalTaskTypeData?.id)}
                                                    variant="success"
                                                    className="ml-auto"
                                                >Authorize</Button>
                                                <Button
                                                    onClick={(e) => handleUpdateTaskTypeAuthorizationStatus(e, 'denied', activeModalTaskTypeData?.id)}
                                                    variant="danger"
                                                >Deny</Button>
                                            </React.Fragment>:
                                            <div>
                                                {activeModalTaskTypeData?.authorization_status  === 1 && <span className="badge badge-success py-2 px-2 f-14">Approved</span>}
                                                {activeModalTaskTypeData?.authorization_status  === 2 && <span className="badge badge-danger py-2 px-2 f-14"> Denied </span>}
                                            </div>
                                        }

                                    </div>
                                </div>
                            </div>
                            {/* end body */}
                        </div>
                    </div>
                </Modal>
        </React.Fragment>
    );
};

export default Tasks;
