import React, { useState, lazy, Suspense } from "react";
import Button from "../../../components/Button";
import Modal from "../../../components/Modal";
import { SingleTask } from "../../../../utils/single-task";
import Loader from "../../../components/Loader";
const ReportForm = lazy(() => import("./ReportForm"));

const ReportControl = ({ task }) => {
    const [reportModalOpen, setReportModalOpen] = useState(false); 

    const close = () => setReportModalOpen(false);

    return (
        <React.Fragment>
            <Button
                variant="tertiary"
                onClick={() => setReportModalOpen(true)}
                className="ml-auto d-flex align-items-center sp1-st-revision-btn --view-revision sp1_report_btn"
            >
                <i className="fa-solid fa-flag"></i>
                <span className="d-inline ml-1">Report</span>
            </Button>

            <Modal isOpen={reportModalOpen} className="sp1_single_task--modal">
                <div className="sp1_single_task--modal-panerl-wrapper">
                    <div
                        className="sp1_single_task--modal-panel task-report-form--modal-panel"
                    >
                        <div className="border-bottom pb-2 px-3 mb-3 d-flex align-items-center justify-content-between">
                            <div className="font-weight-bold f-14">
                                Task#{task?.id} : Report
                            </div>
                            <Button onClick={close} className="">
                                <i className="fa-solid fa-xmark" />
                            </Button>
                        </div>
                        <Suspense fallback={<div className="py-3 d-flex align-items-center justify-content-center"><Loader /></div>}>
                            <ReportForm task={task} close={close} />
                        </Suspense>
                    </div>
                </div>
            </Modal>
        </React.Fragment>
    );
};

export default ReportControl;
