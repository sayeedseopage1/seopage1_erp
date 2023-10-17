import React from "react";
import Modal from "../../global/Modal";
import Button from "./Button";
import CKEditorComponent from "../../ckeditor/index";
import SubmitButton from "./SubmitButton";
import { useResolveReportMutation } from "../../services/api/tasksApiSlice";
import _ from "lodash";
import { useDispatch } from "react-redux";
import { updateReportStatus } from "../../services/features/tasksSlice";

const ReportResoveButton = ({ row }) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const [search, setSearch] = React.useState("");
    const [comment, setComment] = React.useState("");
    const [resolveReport, { isLoading }] = useResolveReportMutation();

    const dispatch = useDispatch();

    const handleModal = (e) => {
        setIsOpen(true);
    };

    const close = () => setIsOpen(false);

    const isTopManagement = _.includes([1], window?.Laravel?.user?.role_id);

    const onSubmit = (type) => {
        let data = {
            status: type,
            report_id: row?.id,
            admin_comment: comment,
        };

        if (comment) {
            resolveReport(data)
                .unwrap()
                .then((res) => {
                    if (res.status === 200) {
                        dispatch(
                            updateReportStatus({ id: row?.id, status: type })
                        );
                        const body = document.getElementById("body");
                        body.style.cursor = "default";
                        close();
                    }
                });
        }
    };

    const handleEditor = (e, editor) => {
        const data = editor.getData();
        setComment(data);
    };

    const variant = row?.status === "approved" ? "success" : "tertiary";
    const title =
        row?.status === "approved"
            ? "Resoved"
            : row?.status === "pending"
            ? "Resove"
            : _.startCase(row?.status);

    const badge =
        row?.status === "pending"
            ? "badge-primary"
            : row?.status === "approved"
            ? "badge-success"
            : "badge-warning";

    return (
        <div>
            {!isTopManagement && <span className={`badge ${badge}`}>{row?.status}</span>}

            {isTopManagement && (
                <React.Fragment>
                    <Button
                        onClick={() =>
                            row?.status === "pending" && handleModal()
                        }
                        variant={variant}
                        className={
                            row?.status === "denied"
                                ? "sp1_tasks_tbl_report_btn"
                                : ""
                        }
                    >
                        {title}
                    </Button>

                    <React.Fragment>
                        <Modal isOpen={isOpen}>
                            <div className="sp1_modal-content-wrapper">
                                <div className="sp1_modal-panel">
                                    {/* header */}
                                    <div className="sp1_modal-head">
                                        <div className="sp1_modal-title pl-2">
                                            <strong>Report Details</strong>
                                        </div>
                                        <Button
                                            onClick={close}
                                            aria-label="ModalClose"
                                            variant="tertiary"
                                            className="sp1_modal-close"
                                        >
                                            <i className="fa-solid fa-xmark" />
                                        </Button>
                                    </div>
                                    {/* end header */}

                                    {/* body */}
                                    <div className="sp1_modal-body p-3">
                                        <div className="ck-editor-holder">
                                            <CKEditorComponent
                                                onChange={handleEditor}
                                                placeholder="Write your comment here!"
                                            />
                                        </div>

                                        <div className="mt-3 d-flex align-items-center justify-content-end py-4">
                                            <div
                                                className="ml-auto d-flex align-items-center w-fit"
                                                style={{ gap: "10px" }}
                                            >
                                                <SubmitButton
                                                    variant="success"
                                                    title="Approve & Close"
                                                    onClick={() =>
                                                        onSubmit("approved")
                                                    }
                                                    isLoading={isLoading}
                                                    className="ml-auto mr-2"
                                                />
                                                {!isLoading && (
                                                    <SubmitButton
                                                        title="Deny & Close"
                                                        onClick={() =>
                                                            onSubmit("denied")
                                                        }
                                                        isLoading={isLoading}
                                                        className="deny_button"
                                                    />
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    {/* end body */}
                                </div>
                            </div>
                        </Modal>
                    </React.Fragment>
                </React.Fragment>
            )}
        </div>
    );
};

export default ReportResoveButton;
