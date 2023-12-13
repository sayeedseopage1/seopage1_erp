import { useState } from "react";
// import { Button } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Button from "../../components/Button";
import Modal from "../../components/Modal";
import TodaysUpdateModalTable from "../daily-submission/TodaysUpdateModalTable";

const DailySubmissionControl = () => {
    const [todaysUpdateModalisOpen, setTodaysUpdateModalisOpen] =
        useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const url = new URLSearchParams(location.search);


    const isOpen = url.get("modal") === "daily-submission";
 

    // console.log(location);

    const close = () => {
        if(url.get('trigger') === 'stop-button'){
            Swal.fire({
                icon: "warning",
                title: "If you don't submit the daily submission, you won't be able to start any task on next day.",
                showConfirmButton: true,
            });
        }

        navigate(`${location.pathname}`);
        setTodaysUpdateModalisOpen(false);
    };
    const open = () => navigate(`${location.pathname}?modal=daily-submission&data_type=today`);

    return (
        <div>
            <Button
                variant="tertiary"
                // onClick={toggle}
                onClick={open}
                className="d-flex align-items-center btn-outline-dark text-dark"
            >
                {/* {isFetching ? <Loader title="Processing..." /> : <i className="fa-solid fa-check" />} */}
                <span className="d-inline ml-1"> Submit Today's Update </span>
            </Button>

            <Modal isOpen={isOpen} className="sp1_mark-as--modal ">
                <div className="sp1_single_task--modal-panerl-wrapper">
                    <div
                        className="sp1_mark-as--modal-panel"
                        style={{ overflow: "visible", maxWidth: "70rem" }}
                    >
                        {/* heading bar */}
                        <div className="sp1_mark-as--modal-heading">
                            <h6 className="mb-0">Submit Today's Update</h6>

                            <Button aria-label="closeModal" onClick={close}>
                                <i className="fa-solid fa-xmark" />
                            </Button>
                        </div>

                        {/* body */}
                        <div
                            className="sp1_mark-as--modal-body px-3"
                            style={{ overflow: "visible" }}
                        >
                            <div className="alert alert-warning text-center">
                                If you don't submit the daily submission, you
                                won't be able to start any task on next day.
                            </div>

                            {isOpen && <TodaysUpdateModalTable />}
                            <div className="mt-3 d-flex align-items-center">
                                <Button
                                    variant="tertiary"
                                    className="ml-auto mr-2"
                                    onClick={close}
                                >
                                    Close
                                </Button>
                                {/* <SubmitButton onClick={handleSubmit} isLoading={isSubmitting} title="Submit" /> */}
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default DailySubmissionControl;
