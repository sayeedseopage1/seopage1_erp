import { useState } from "react";
import Modal from "../../components/Modal";
import Button from "../../components/Button";
import GuideLineText from "./subtask_creation_guide/GuideLineText";

export default function SubtaskCreationControl({ task, className }) {
    const [subtaskCreationModalIsOpen, setSubtaskCreationModalIsOpen] =
        useState(false);

    const close = () => setSubtaskCreationModalIsOpen(false);
    const open = () => setSubtaskCreationModalIsOpen(true);

    return (
        <div className={` ${className}`}>
            <Button
                variant="tertiary"
                // onClick={toggle}
                onClick={open}
                className="d-flex align-items-center btn-outline-dark text-dark"
            >
                {/* {isFetching ? <Loader title="Processing..." /> : <i className="fa-solid fa-check" />} */}
                <span className="d-inline ml-1"> Subtask creation guide </span>
            </Button>

            <Modal
                isOpen={subtaskCreationModalIsOpen}
                className="sp1_mark-as--modal "
            >
                <div className="sp1_single_task--modal-panerl-wrapper">
                    <div
                        className="sp1_mark-as--modal-panel"
                        style={{ overflow: "visible", maxWidth: "70rem" }}
                    >
                        {/* heading bar */}
                        <div className="sp1_mark-as--modal-heading">
                            <h6
                                className="mb-0 ml-2"
                                style={{
                                    fontStyle: "normal",
                                    fontWeight: "bold",
                                }}
                            >
                                Subtask creation guide
                            </h6>

                            <Button aria-label="closeModal" onClick={close}>
                                <i className="fa-solid fa-xmark" />
                            </Button>
                        </div>

                        {/* body */}
                        <div
                            className="sp1_mark-as--modal-body px-3"
                            style={{ overflow: "visible" }}
                        >
                            <div
                                style={{
                                    maxHeight: "80vh",
                                    overflow: "auto",
                                    padding: "0 20px 0 0",
                                }}
                            >
                                <GuideLineText task={task} />
                            </div>

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
}
