import React from 'react';
import DataTable from '../../ui/basic-table/DataTable';
import { taskReportTableData } from '../../__fake_data__/task-report-page/data';
import { TaskReportDataTableColumn } from './TaskReportDataTableColumn';

const TaskReportDataTable = () => {

  return (
    <div className='sp1_tlr_container' style={{border:'solid transparent'}}>

      <section className="sp1_tlr_tbl_container">
        <DataTable
          tableData={[...taskReportTableData()]}
          tableColumns={TaskReportDataTableColumn}
          isLoading={false}
          tableName='task-report-table'
        />
      </section>
    </div>
  );
};

export default TaskReportDataTable;