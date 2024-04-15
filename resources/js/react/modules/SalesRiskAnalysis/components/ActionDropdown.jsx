import React from "react";
import Button from "./Button";
import Dropdown from "./Dropdown";
import ReportForm from "../../single-task/section/task-actions/report/ReportForm";
import { SingleTask } from "../../utils/single-task";
import { useDispatch, useSelector } from "react-redux";
import Modal from "./Modal";
import Loader from "./Loader";

// Action Dropdown
const ActionDropdown = ({row}) => { 
    const [reportModalOpen, setReportModalOpen] = React.useState(false);
    const singleTask = new SingleTask(row); 
    const close = () => setReportModalOpen(false);  
    const { subtasks } = useSelector(s => s.tasks);
    const dispatch = useDispatch();
    // handle report
    const handleReport = () => {
      // find the index of current task
      const _index = _.findIndex(subtasks, {id: row?.id});
      // create new instance of this row with updated report count;
      const instance = [...subtasks];
      instance[_index] = {...row, subtasks_reports_count: Number(row.subtasks_reports_count) + 1}
      dispatch(storeSubTasks({subtasks: [...instance]}))
    }
    
    return (
      <React.Fragment>
        <Dropdown>
            <Dropdown.Toggle icon={false}>
              <Button variant='tertiary'>
                <i className="fa-solid fa-ellipsis-vertical"></i>
              </Button>
            </Dropdown.Toggle>
            <Dropdown.Menu placement="bottom-end" className="py-2 sp1_tasks_tbl_action_dd_menu">
              <Dropdown.Item onClick={() => setReportModalOpen(true)} className="sp1_tasks_tbl_del">
                <i className="fa-solid fa-bug mr-2"></i> Report
              </Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown> 
  
        {/* report form modal */}
        <Modal isOpen={reportModalOpen} className="sp1_single_task--modal">
            <div className="sp1_single_task--modal-panerl-wrapper">
                <div className="sp1_single_task--modal-panel task-report-form--modal-panel">
                    <div className="border-bottom pb-2 px-3 mb-3 d-flex align-items-center justify-content-between">
                        <div className="font-weight-bold f-14">
                            Task#{row?.id} : Report
                        </div>
                        <Button onClick={close} className="">
                            <i className="fa-solid fa-xmark" />
                        </Button>
                    </div>
                    <React.Suspense 
                        fallback={
                            <div className="py-3 d-flex align-items-center justify-content-center" >
                                <Loader />
                            </div>
                        }
                    >
                        <ReportForm task={singleTask} close={close} onSuccess={handleReport} />
                    </React.Suspense>
                </div>
            </div>
        </Modal>
      </React.Fragment>
    )
  }

  export default ActionDropdown