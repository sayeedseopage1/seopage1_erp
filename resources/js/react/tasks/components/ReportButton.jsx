import React from 'react'
import Modal from './Modal';
import Button from './Button';
import Loader from './Loader'; 
import { useLazyGetTasksReportsQuery } from '../../services/api/tasksApiSlice';
import { useDispatch, useSelector } from 'react-redux';
import { storeReport } from '../../services/features/tasksSlice';

const ReportTable = React.lazy(() => import('./ReportTableModal'));


const ReportButton = ({row}) => {
  const {reports} = useSelector(s => s.tasks);
  const [isOpen, setIsOpen] = React.useState(false);
  const [search, setSearch] = React.useState('');
  const dispatch = useDispatch();
   
  const [
    getTasksReports,
    {isFetching}
  ] = useLazyGetTasksReportsQuery();


  const handleModal = (e) => {
    e.preventDefault();
    const type = row?.subtask_id ? 'subtask' : 'parent';
     
    getTasksReports({taskId: row?.id, type})
    .unwrap()
    .then(res => {
        if(res.status === 200){
            dispatch(storeReport( {reports: [...res?.tasks]}))
        }
    })
    .catch(err =>console.log(err))


    setIsOpen(true);
  }
 
  const close = () => setIsOpen(false)
  const reportCount = row?.subtasks_reports_count;

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
                                <span><strong>Task Name:</strong> Single Product Page</span>
                                <span><strong>Project:</strong> Single Product Ecommerce Website Design</span>
                                <span><strong>Project Manager:</strong> Farhan Rahman</span>
                                <span><strong>Client:</strong> Joana Mathew</span>
                            </div>


                            <div>
                                <React.Suspense fallback={<div className='py-3 d-flex align-items-center justify-content-center'><Loader title='Loader...'/> </div>}>
                                    <ReportTable
                                        reports = {[...reports]}
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