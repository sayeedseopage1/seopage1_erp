import * as React from 'react';
import dayjs from 'dayjs';
import ReactExport from 'react-data-export'; 
import _ from 'lodash';


const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;

const ExportProjectWiseTableDataToExcel = ({data, button, filter, filename}) => {
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
          value: d['project_name'] ?? '--',
          style: fieldStyle,
        },
        {
          value: d['client_name'] ?? '--',
          style: fieldStyle,
        },
        {
          value: d['pm_name'] ?? '--',
          style: fieldStyle,
        },
        {
          value: d['employee_name'] ?? '--',
          style: fieldStyle,
        },
        {
          value: d["number_of_session"] ?? '--',
          style: fieldStyle,
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
    {title: 'Project Name', width: {wpx: 300}},
    {title: 'Client Name', width: {wpx: 200}},
    {title: 'Project Manager', width: {wpx: 200}},
    {title: 'Employee Name', width: {wpx: 200}},
    {title: 'Number of Session', width: {wpx: 200}},
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
      />
    </ExcelFile>
  )
}

export default ExportProjectWiseTableDataToExcel