import React from 'react';
import DataTable from '../../ui/basic-table/DataTable';
import { taskReportTableData } from '../../__fake_data__/task-report-page/data';
import { TaskReportDataTableColumn } from './TaskReportDataTableColumn';
import TaskReportTableLoader from './TaskReportTableLoader';
import _ from 'lodash';

const TaskReportDataTable = ({isLoading,tableData}) => {

  return (
    <div className='sp1_tlr_container'>

      <section className="sp1_tlr_tbl_container">
        <DataTable
          tableData={_.orderBy([...tableData],["report_date"],["desc"])}
          tableColumns={TaskReportDataTableColumn}
          isLoading={isLoading}
          tableName='task-report-table'
          loader={<TaskReportTableLoader/>}
        />
      </section>
    </div>
  );
};

export default TaskReportDataTable;