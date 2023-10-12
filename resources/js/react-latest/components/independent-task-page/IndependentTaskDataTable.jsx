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

const IndependentTaskDataTable = ({ tableData = [] }) => {
  // const [tasksType, setTasksType] = React.useState([]);
  const [filter, setFilter] = React.useState(null);
  const [search, setSearch] = React.useState('');
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



  return (
    <React.Fragment>
      <FilterContainer>
        <Filterbar onFilter={onFilter} />
      </FilterContainer>

      <div className="sp1_tlr_container">
        <div className="sp1_tlr_tbl_container">
          <div className="mb-3 d-flex align-items-center flex-wrap justify-content-between">
            {/* <Tabbar /> */}

            {/* {
              _.includes([1, 8], auth?.getRoleId()) &&
              <Button
                onClick={fetchTasksTypeData}
                className="sp1_tlr_tab active mr-auto ml-2 mb-2 text-white"
              >
                {tasksTypeDataIsFetching ? 'Loading...' : <> Authorize <span className="badge badge-light">{unAuthorizedType?.task_types}</span> </>}
              </Button>
            } */}

            <div className="mb-2" style={{ maxWidth: '300px' }}>
              <SearchBox value={search} onChange={setSearch} />
            </div>
          </div>

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