import React, {useState} from "react";
import Modal from "./Modal";
import Button from "./Button";
import Loader from "../../single-task/components/Loader";
import { convertTime } from "../../utils/converTime";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
const TimeLogHIstoryModalTable = React.lazy(() => import( "./TimeLogHIstoryModalTable" ));

const TimeLogHistoryModal = ({ row, isOpen, close }) => {
    const {filter} = useSelector(s=>s.timeLogHistory); 

    return (
        <Modal isOpen={isOpen} className="sp1_single_task--modal">
            <div className="sp1_single_task--modal-panerl-wrapper">
                <div className="sp1_single_task--modal-panel sp1_tlr--modal-panel">
                    <div className="border-bottom pb-2 px-3 mb-3 d-flex align-items-center justify-content-between">
                        <div className="font-weight-bold f-14">
                            Date Range: {dayjs(filter?.start_date).format('MMM DD, YYYY')} - {dayjs(filter?.end_date).format('MMM DD, YYYY')}  | Employee: {row?.employee_name} | Missing Hours: {convertTime(row?.missed_hours)}
                        </div>
                        <Button variant="tertiary" onClick={close} className="">
                            <i className="fa-solid fa-xmark" />
                        </Button>
                    </div>

                    <div className="px-3">
                        <React.Suspense fallback={<Loader />} >
                            <TimeLogHIstoryModalTable 
                                tableName="timeLogHistoryModalTable" 
                                row={row} 
                                filter={filter} 
                            />
                        </React.Suspense>
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default TimeLogHistoryModal;
