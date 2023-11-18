import React from 'react'
import Modal from '../../global/Modal';
import Button from './Button';
import Loader from './Loader'; 
import { useLazyGetTasksReportsQuery } from '../../services/api/tasksApiSlice';
import { useDispatch, useSelector } from 'react-redux';
import { storeReport } from '../../services/features/tasksSlice';
import _ from 'lodash';
import { User } from '../../utils/user-details';

const ReportTable = React.lazy(() => import('./ReportTableModal'));


const ReportButton = ({row}) => {
  const {reports} = useSelector(s => s.tasks);
  const [isOpen, setIsOpen] = React.useState(false);
  const [search, setSearch] = React.useState('');
  const dispatch = useDispatch();
  const auth = new User(window?.Laravel?.user);
   
  const [
    getTasksReports,
    {isFetching}
  ] = useLazyGetTasksReportsQuery();


  // handle report table modal
  const handleModal = (e) => {
    e.preventDefault();
    const type = row?.subtask_id ? 'subtask' : 'parent';
     
    // get tasks reports
    getTasksReports({taskId: row?.id, type})
    .unwrap()
    .then(res => {
        if(res.status === 200){
            // console.log(res.tasks)
            dispatch(storeReport( {reports: [...res?.tasks]}))
        }
    })
    .catch(err =>console.log(err))

    setIsOpen(true);
  }

 
 
  const close = () => setIsOpen(false)
  const reportCount = row?.subtasks_reports_count;


  let reportsData = reports; 

  if(auth?.getRoleId() === 6  || auth?.getRoleId() === 5){
    reportsData = _.filter(reports, report => report?.added_by && Number(report.added_by) === auth?.getId())
  }
  

  return (
    <div>
        {Number(reportCount) > 0 ?
            <button onClick={handleModal} className='sp1_tasks_tbl_report_btn'>
                {row?.subtasks_reports_count ?? 0} Reports
            </button> : 
            <span style={{color: '#9EA6B0'}}>No Report</span>
        }
        <React.Fragment>
            <Modal isOpen={isOpen}> 
                <div className="sp1_modal-content-wrapper">
                    <div className="sp1_modal-panel sp1_task_report_modal">
                        {/* header */}
                        <div className="sp1_modal-head">
                            <div className="sp1_modal-title pl-2"><strong>Report Details</strong></div>
                            <Button onClick={close} aria-label="ModalClose" variant='tertiary' className='sp1_modal-close'>
                                <i className='fa-solid fa-xmark'/>
                            </Button>
                        </div>
                        {/* end header */}

                        {/* body */}
                        <div className="sp1_modal-body py-3">
                            <div className='d-flex align-items-center justify-content-between flex-column'>
                                <div className='text-left py-2 px-3' style={{background: '#fcfcfc', border: '1px dashed #ccc'}}>
                                    <div><strong>Project:</strong> <a href={`/account/projects/${row.project_id}`}>{row?.project_name}</a> </div>
                                    <div><strong>Task Name:</strong> <a href={`/account/tasks/${row?.id}`}>{row?.heading}</a> </div>
                                    <div><strong>Project Manager:</strong> <a href={`/account/employees/${row?.project_manager_id}`}>{row?.pm_id_name}</a> </div>
                                    <div><strong>Client:</strong> <a href={`/account/clients/${row?.client_id}`}>{row?.client_name}</a> </div>
                                </div>
                            </div>


                            <div>
                                <React.Suspense fallback={<div className='py-3 d-flex align-items-center justify-content-center'><Loader title='Loader...'/> </div>}>
                                    <ReportTable
                                        reports = {[...reportsData]}
                                        search={search}
                                        task={row}
                                        isLoading={isFetching}
                                        tableName='TaskReportModalTable'
                                    />
                                </React.Suspense>
                            </div>

                            <div>
                            </div>                           
                        </div>
                        {/* end body */}
                    </div>  
                </div>
            </Modal>
        </React.Fragment>
    </div>
  )
}

export default ReportButton