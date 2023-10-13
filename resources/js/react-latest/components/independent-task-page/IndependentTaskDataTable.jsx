import React, { useState } from 'react';
import _ from "lodash";
// import { useDispatch, useSelector } from "react-redux";
// import { useCheckUnAuthorizedTaskTypeQuery, useLazyGetTaskTypeDataQuery, useLazyGetTasksQuery, useUpdateTasktypeAuthStatusMutation } from "../../services/api/tasksApiSlice";
// import { storeTasks } from "../../services/features/tasksSlice";
import Button from "../independent-task-page/tasks/components/Button";
import FilterContainer from "../independent-task-page/tasks/components/Filter-bar/FilterContainer";
import Filterbar from "../independent-task-page/tasks/components/Filter-bar/Filterbar";
import Modal from "../independent-task-page/tasks/components/Modal";
import SearchBox from "../independent-task-page/tasks/components/Searchbox";
import Tabbar from "../independent-task-page/tasks/components/Tabbar";
import { TaskTableColumns } from "../independent-task-page/tasks/components/TaskTableColumns";
import TasksTable from "../independent-task-page/tasks/components/TasksTable";
import Loader from "../independent-task-page/tasks/components/Loader";
import { User } from '../../utils/user-details';
import CKEditorComponent from '../../ui/ckeditor';
import SubmitButton from './tasks/components/SubmitButton';
import IndependentTaskCreationForm from './IndependentTaskCreationForm';
import TaskAuthorization from './tasks/components/TaskAuthorization';

const IndependentTaskDataTable = ({ tableData = [] }) => {
  // const [tasksType, setTasksType] = React.useState([]);
  const [filter, setFilter] = React.useState(null);
  const [search, setSearch] = React.useState('');
  const [showIndividualTaskCreationForm, setShowIndividualTaskCreationForm] = useState(false);
  // const [activeModalTaskTypeData, setActiveModalTaskTypeData] = React.useState(null);
  // const [comment, setComment] = React.useState('');

  // api function
  // const [updateTasktypeAuthStatus, { isLoading:taskTypeLoading }] = useUpdateTasktypeAuthStatusMutation();
  // const { data: unAuthorizedType } = useCheckUnAuthorizedTaskTypeQuery();
  const auth = new User(window.Laravel.user);

  const onFilter = (filter) => {
    const queryObject = _.pickBy(filter, Boolean);
    const queryString = new URLSearchParams(queryObject).toString();
    setFilter(queryString);
  }

  // test variable
  const isLoading = false;


  // handle table filter
  const onIndependentTaskCreationFilter = (query) => {
    // let filter = {
    //     start_date: startDate,
    //     end_date: endDate,
    //     project_id: params?.projectId,
    //     ...query,
    // };

    // const queryObject = _.pickBy(filter, Boolean);
    // const queryString = new URLSearchParams(queryObject).toString();
    // setFilter(queryObject);

    // dispatch(setFilterOption({ filter: queryObject }));

    // if (startDate && endDate) {
    //     if (tableType.toLowerCase() === "tasks") {
    //         getTasks(`?${queryString}`)
    //             .unwrap()
    //             .then((res) => {
    //                 const data = _.orderBy(res?.tasks, "due_date", "desc");
    //                 dispatch(storeTasks({ tasks: data }));
    //             })
    //             .catch((err) => console.log(err));
    //     } else {
    //         getAllSubtask(`${queryString}`)
    //             .unwrap()
    //             .then((res) => {
    //                 const data = _.orderBy(res?.tasks, "due_date", "desc");
    //                 dispatch(storeSubTasks({ subtasks: data }));
    //             })
    //             .catch((err) => console.log(err));
    //     }
    // }
    console.log('independent task filter');
  };



  // const [getTaskTypeData,{ isFetching: tasksTypeDataIsFetching }] = useLazyGetTaskTypeDataQuery();


  // fetch table data
  // const fetchTasksTypeData = async () => {
  //   try {
  //     const res = await getTaskTypeData().unwrap();
  //     setTasksType(res.data);

  //     setShowAuthorizationTableModal(true)
  //   } catch (err) {
  //     console.log(err)
  //   }
  // }

  // update tasks-type authorization status
  // const handleUpdateTaskTypeAuthorizationStatus = async (e, type, task_type_id) => {
  //   e.preventDefault();
  //   try {
  //     const res = await updateTasktypeAuthStatus({ status: type, task_type_id, comment }).unwrap();
  //     // console.log(res)
  //     if (res) {
  //       setTasksType(prev => _.map(prev, d => d.id === task_type_id ? { ...prev, authorization_status: res.authorization_status } : prev))
  //       setActiveModalTaskTypeData(null);
  //       close();
  //     }
  //   } catch (err) {
  //     console.log(err)
  //   }
  // }

  // const closeTable = () => setShowAuthorizationTableModal(false);
  // const close = () => setShowAuthorizationModal(false);


  const handleTaskAddForm = () => {
    setShowIndividualTaskCreationForm(true);
  }


  return (
    <React.Fragment>
      <FilterContainer>
        <Filterbar onFilter={onFilter} />
      </FilterContainer>

      <div className="sp1_tlr_container">
        <div className="sp1_tlr_tbl_container">
          <div className="mb-3 d-flex align-items-center flex-wrap justify-content-between">
            {/* <Tabbar /> */}

            {/* table navbar */}
            <div className="sp1_table-navbar">
              <div
                className="d-flex align-items-center flex-wrap"
                style={{ gap: "10px" }}
              >
                {/* table selection */}
                {/* <Dropdown className="">
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
                      className={`sp1_table_tab--dd-item ${tableType === "Tasks" && "active"
                        }`}
                    >
                      Tasks
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() => setTableType("Subtasks")}
                      className={`sp1_table_tab--dd-item ${tableType === "Subtasks" && "active"
                        }`}
                    >
                      Subtasks
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown> */}
                {/* end Table selection */}

                {_.includes([1, 4], auth?.getRoleId()) && (
                  <SubmitButton
                    onClick={handleTaskAddForm}
                    isLoading={isLoading}
                  >
                    + Add Task
                  </SubmitButton>
                )}
              </div>


            </div>
            {/* table nav bar */}

            <div className="mr-auto ml-2 mb-2 ">
              <TaskAuthorization />
            </div>

            <div className="mb-2" style={{ maxWidth: '300px' }}>
              <SearchBox value={search} onChange={setSearch} />
            </div>

          </div>

          <IndependentTaskCreationForm
            isOpen={showIndividualTaskCreationForm}
            close={() => setShowIndividualTaskCreationForm(false)}
            projectName={'Demo Project Name'}
            onSuccess={() => onIndependentTaskCreationFilter({})}
          />

          <TasksTable
            tableData={tableData}
            isLoading={isLoading}
            filter={filter}
            tableName="tasksTable"
            search={search}
            // reportPermission={[6, 5, 1, 8]}
            reportPermission={null}
            tableColumns={TaskTableColumns}
            // hideColumns={auth?.getRoleId() !== 6 ? ["action"] : []}
            hideColumns={[]}
          />
        </div>
      </div>
    </React.Fragment>
  );
};

export default IndependentTaskDataTable;