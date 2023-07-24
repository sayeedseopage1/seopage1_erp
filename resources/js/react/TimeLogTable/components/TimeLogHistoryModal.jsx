import React from "react";
import Modal from "./Modal";
import Button from "./Button";
import Loader from "../../single-task/components/Loader";
const TimeLogHIstoryModalTable = React.lazy(() => import( "./TimeLogHIstoryModalTable" ));

const TimeLogHistoryModal = ({ row, isOpen, close }) => {
    return (
        <Modal isOpen={isOpen} className="sp1_single_task--modal">
            <div className="sp1_single_task--modal-panerl-wrapper">
                <div className="sp1_single_task--modal-panel sp1_tlr--modal-panel">
                    <div className="border-bottom pb-2 px-3 mb-3 d-flex align-items-center justify-content-between">
                        <div className="font-weight-bold f-14">
                            Date Range: 07-06-2023 To 15-06-2023 | Employee: Md.
                            Rakib Hossain | Missing Hours: 05 Work Hours
                        </div>
                        <Button variant="tertiary" onClick={close} className="">
                            <i className="fa-solid fa-xmark" />
                        </Button>
                    </div>

                    <div className="px-3">
                        <React.Suspense fallback={<Loader />} >
                            <TimeLogHIstoryModalTable row={row} />
                        </React.Suspense>
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default TimeLogHistoryModal;
