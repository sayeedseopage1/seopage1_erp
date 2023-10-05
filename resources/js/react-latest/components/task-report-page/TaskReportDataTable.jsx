import React from 'react';
import DataTable from '../../ui/basic-table/DataTable';
import { taskReportTableData } from '../../__fake_data__/task-report-page/data';
import { TaskReportDataTableColumn } from './TaskReportDataTableColumn';

const TaskReportDataTable = () => {

  return (
    <div className='p-5'>
      <DataTable
        tableData={[...taskReportTableData()]}
        tableColumns={TaskReportDataTableColumn}
        isLoading={false}
        tableName='task-report-table'
      />
    </div>
  );
};

export default TaskReportDataTable;