import * as React from 'react';
import dayjs from 'dayjs';
import ReactExport from 'react-data-export'; 
import _ from 'lodash';


const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;

const ExportTaskWiseTableDataToExcel = ({data, button, filter, filename}) => {
  const fieldStyle = {
    alignment: {
      wrapText: true,
      vertical: 'center',
      horizontal: 'top'
    }
  }
 
 
  // get data
  const getData = (data) => {
    let rows = [];
    _.forEach(data, d  => {
      let row = [ 
        {
          value: d['task_name'] ?? '--', 
          style: fieldStyle
        },
        {
          value: d['project_name'] ?? '--',
          style: fieldStyle,
        },
        {
          value: d['pm_name'] ?? '--',
          style: fieldStyle,
        },
        {
          value: d['client_name'] ?? '--',
          style: fieldStyle,
        },
        {
          value: d['employee_name'] ?? '--',
          style: fieldStyle,
        },
        {
          value: d["start_time"] ?? '--',
          style: fieldStyle,
        },
        {
          value: d["end_time"] ?? "active",
          style: {
            ...fieldStyle,
            font:{
              color: d["end_time"] ?{ rgb: "00000000" }  :{ rgb: "FF00AA00" }
            }
          },
        },
        {
          value: d["hours"] ?? '--',
          style: fieldStyle,
        } 
      ]

      rows.push(row);
    })
    return rows;
  }

  // columns 
  const columns = [
    {title: 'Task Name', width: {wpx: 300}},
    {title: 'Project Name', width: {wpx: 300}},
    {title: 'Project Manager', width: {wpx: 200}},
    {title: 'Client Name', width: {wpx: 200}},
    {title: 'Employee Name', width: {wpx: 200}},
    {title: 'Start Time', width: {wpx: 200}},
    {title: 'End Time', width: {wpx: 200}},
    {title: 'Total Track Time', width: {wpx: 200}},
  ]


  // multi data set
  const multiDataSet = [
    {
      columns: [
        {title: "Filter"},
        {title: 'Date'},
        {title: 'Status'}
      ],
      data: [[
        {
          value: `--`,
        },
        {
          value: `${dayjs(filter?.start_date).format('MMM-DD-YYYY')} to ${dayjs(filter?.end_date).format('MMM-DD-YYYY')}`,
          style: {
            font:{
              bold: true,
            }
          }
        },
        {
          value: _.startCase(filter?.status),
          style:{ 
            font: {
              bold: true,
              color: '#ffffff'
            }
          } 
        }
      ]]
    },
    {
      xSteps:0,
      ySteps:2,
      columns: columns,
      data: getData(data),
    },
  ]


  return(
    <ExcelFile
      filename={filename}
      element={button}
    >
      <ExcelSheet
        dataSet={multiDataSet}
        name={filename} 
        name="Organization"
      />
    </ExcelFile>
  )
}

export default ExportTaskWiseTableDataToExcel