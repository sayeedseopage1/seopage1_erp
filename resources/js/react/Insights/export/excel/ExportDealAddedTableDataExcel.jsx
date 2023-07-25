import dayjs from 'dayjs';
import _ from 'lodash';
import * as React from 'react'
import ReactExport from "react-data-export";
import { useUsers } from '../../hooks/useUsers';
import { stage } from '../../utils/constants';
import './export-deal-table-excel.css';

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet; 


const ExportDealAddedTableDataExcel = ({goal, data}) => {
  const {usersObjects} = useUsers();
  // console.log({goal, data})

  if (!goal || _.isEmpty(goal) || !data.length) return null;

 

  const getData = (data) => {
    let sheetData = []; 
    data?.map(d => {
      const addedBy = d['lead_converted_by'];
      const convertedBy = usersObjects[addedBy];
      const status = d['won_lost'];
      let status_render = '';

      if(!status){
            status_render = 'Open'
      }else if (status === 'Yes') {
        status_render = 'Won';
      } else {
        status_render = "Lost"
      }

      let singleData =  [
        {
          value: dayjs(d['deal_created_at']).format('MMM DD, YYYY'), 
          width: {wpx: 130}, 
          style:{
            alignment: {
              wrapText: true,
              vertical: 'center' 
            }
          }
        },
        {
          value: d['deal_project_name'], 
          width: {wpx: 400}, 
          style:{
            alignment: {
              wrapText: true,
              vertical: 'center' 
            }
          }
        },
        
        {
          value: d['client_username'], 
          width: {wpx: 150}, 
          style:{
            alignment: {
              wrapText: true,
              vertical: 'center' 
            }
          }
        },

        {
          value: `$${Number(d['deal_amount']).toFixed(2)}`, 
          width: {wpx: 180}, 
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
          value: convertedBy?.name, 
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
          value: stage[d['deal_stage']], 
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
      ]

      sheetData.push(singleData)
    })

    return sheetData;
    
  }

  // console.log(getData(data))

   const multiDataSet = [
    {
      columns: [
       { title: 'Deal Created Date', width: {wpx: 130} },
       { title: 'Deal Name', width: {wpx: 400}  },
       { title: 'Client Username', width: {wpx: 150} },
       { title: 'Project Budget (USD)', width: {wpx: 180} },
       { title: 'Currency', width: {wpx: 100} },
       { title: 'Deal Converted By', width: {wpx: 100} },
       { title: 'Current Stage', width: {wpx: 100} },
       { title: 'Deal Status', width: {wpx: 200} },
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

export default ExportDealAddedTableDataExcel