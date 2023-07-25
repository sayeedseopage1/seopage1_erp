import dayjs from 'dayjs';
import _ from 'lodash';
import * as React from 'react'
import ReactExport from "react-data-export";
import { useUsers } from '../../hooks/useUsers';
import './export-deal-table-excel.css';

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet; 


const ExportDealTableDataExcel = ({goal, data}) => {
  const {usersObjects} = useUsers();
  // console.log({goal, data})

  if (!goal || _.isEmpty(goal) || !data.length) return null;

 

  const getData = (data) => {
    let sheetData = []; 
    data?.map(d => {
      const addedBy = d['added_by'];
      const pm_id = d['pm_id'];
      const wonBy = usersObjects[addedBy];
      const pm = usersObjects[pm_id];
      const status = d['status'];
      const trackingType = goal.trackingType;

      const dollarSign = _.lowerCase(trackingType) === 'value' ? '$' : ''

      let status_render = '';

      if (status === 'Accepted') {
        status_render = 'Won';
      } else if(status === 'pending') {
        status_render = "Open"
      }else {
        status_render = 'Lost'
      }

      let singleData =  [
        {
          value: dayjs(d['created_at']).format('MMM DD, YYYY'), 
          width: {wpx: 130}, 
          style:{
            alignment: {
              wrapText: true,
              vertical: 'center' 
            }
          }
        },
        {
          value: d['project_name'], 
          width: {wpx: 400}, 
          style:{
            alignment: {
              wrapText: true,
              vertical: 'center' 
            }
          }
        },
        
        {
          value: d['client_name'], 
          width: {wpx: 150}, 
          style:{
            alignment: {
              wrapText: true,
              vertical: 'center' 
            }
          }
        },

        {
          value: `${dollarSign}${Number(d['amount']).toFixed(2)}`, 
          width: {wpx: 100}, 
          style:{
            font:{
              bold: true
            },
            alignment: {
              wrapText: true,
              vertical: 'center',
              horizontal: 'top'
            }
          }
        },

        {
          value: `${dollarSign}${Number(d['team_total_amount']).toFixed(2)}`, 
          width: {wpx: 150}, 
          style:{
            font:{
              bold: true
            },
            alignment: {
              wrapText: true,
              vertical: 'center',
              horizontal: 'top'
            }
          }
        },
        {
          value: wonBy?.name, 
          width: {wpx: 250}, 
          style:{
            alignment: {
              wrapText: true,
              vertical: 'center',
              horizontal: 'top'
            }
          }
        },
        {
          value: 'USD', 
          width: {wpx: 100}, 
          style:{
            alignment: {
              wrapText: true,
              vertical: 'center',
              horizontal: 'top'
            }
          }
        },
        {
          value: 'Pipeline', 
          width: {wpx: 100}, 
          style:{
            alignment: {
              wrapText: true,
              vertical: 'center',
              horizontal: 'top'
            }
          }
        },
        {
          value: status_render, 
          width: {wpx: 100}, 
          style:{
            alignment: {
              wrapText: true,
              vertical: 'center',
              horizontal: 'top'
            }
          }
        },
        {
          value: d['submission_status'], 
          width: {wpx: 200}, 
          style:{
            alignment: {
              wrapText: true,
              vertical: 'center',
              horizontal: 'top'
            }
          }
        },
        {
          value: pm?.name, 
          width: {wpx: 250}, 
          style:{
            alignment: {
              wrapText: true,
              vertical: 'center',
              horizontal: 'top'
            }
          }
        },
      ]

      sheetData.push(singleData)
    })

    return sheetData;
    
  }

  // console.log(getData(data))

   const multiDataSet = [
    {
      columns: [
       { title: 'Project Award Time', width: {wpx: 130}  },
       { title: 'Deal Name', width: {wpx: 400}  },
       { title: 'Client Name', width: {wpx: 150} },
       { title: 'Actual Amount', width: {wpx: 100} },
       { title: 'Contributed Amount', width: {wpx: 150} },
       { title: 'Deal Won By', width: {wpx: 250} },
       { title: 'Currency', width: {wpx: 100} },
       { title: 'Pipeline', width: {wpx: 100} },
       { title: 'Deal Status', width: {wpx: 100} },
       { title: 'Client Contact Form', width: {wpx: 200} },
       { title: 'Project Manager', width: {wpx: 250} },
      ],
 
      data: getData  (data)
    }
   ]

   const filename = (goal?.title || '').replace(/\s/g, '_') + '_' + dayjs().format('MMM_DD_YYYY');
    return (
      <ExcelFile filename={filename || 'document'} element={<button className='export_to_excel_btn'>Export Excel (.xlsx)</button>} >
          <ExcelSheet  dataSet={multiDataSet} name="Deals" /> 
      </ExcelFile>
    ) 
}

export default ExportDealTableDataExcel