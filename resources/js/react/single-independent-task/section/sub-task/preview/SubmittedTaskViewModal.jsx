import React from "react";
import Modal from "../../../components/Modal";
import Button from "../../../components/Button";
import FileUploader from '../../../../file-upload/FileUploader';
import _ from 'lodash';
import Avatar from "../../../../global/Avatar";

const SubmittedTaskViewModal = ({
    isOpen,
    close,
    submittedTask,
    user,
    isLoading,
}) => {
    const sub = submittedTask; 

    return (
        <React.Fragment>
            <Modal className="d-flex align-items-center justify-content-center" isOpen={isOpen}>
                <React.Fragment>
                    <div className="sp1-subtask-form --modal-panel --modal-submitted sp1-sumittion_task_modal-view">
                        <div className="sp1-subtask-form --modal-panel-header">
                            <div className="d-flex align-items-center">
                                <h6>Submitted Task </h6>
                                {isLoading && (
                                    <div
                                        className="spinner-border text-dark ml-2"
                                        role="status"
                                        style={{
                                            width: "16px",
                                            height: "16px",
                                            border: "0.14em solid rgba(0, 0, 0, .25)",
                                            borderRightColor: "transparent",
                                        }}
                                    />
                                )}
                            </div>
                            <Button
                                aria-label="close-modal"
                                className="_close-modal"
                                onClick={close}
                            >
                                <i className="fa-solid fa-xmark" />
                            </Button>
                        </div>

                        <div className="sp1-subtask-form --modal-panel-body --modal-submitted-body">
                            <div
                                className="mt-3 d-flex flex-column"
                                style={{ gap: "10px" }}
                            >
                                <div>
                                    <span
                                        className="fs-14 font-weight-bold d-block mb-3"
                                        style={{ color: "#767581" }}
                                    >
                                        Submitted By
                                    </span>
                                    <div className="d-flex align-items-center">
                                        <div>
                                            <Avatar
                                                type="circle"
                                                src={user?.avatar}
                                                alt={user?.name}
                                                name={user?.name}
                                            />
                                        </div>
                                        <div className="d-flex flex-column px-2">
                                            <a
                                                className="text-underline text-primary"
                                                href={user?.profile}
                                                style={{ color: "#767581" }}
                                            >
                                                {user?.name}
                                            </a>
                                            <span
                                                className="d-block"
                                                style={{ color: "#767581" }}
                                            >
                                                {sub?.getSubmittionDate()} at{" "}
                                                {sub?.getSubmittionDate("hh:mm a")}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div
                                    className="d-flex flex-column mt-3"
                                    style={{ gap: "10px" }}
                                >
                                    <span
                                        className="d-block fs-14 font-weight-bold"
                                        style={{ color: "#767581" }}
                                    >
                                        Links
                                    </span>
                                    <ul
                                        style={{
                                            listStyle: "unset",
                                            marginLeft: "30px",
                                        }}
                                    >
                                        {sub?.submittedLinkes?.map(
                                            (link, i) => (
                                                <li
                                                    style={{
                                                        listStyle: "unset",
                                                    }}
                                                    key={`${link}-${i}`}
                                                >
                                                    <a
                                                        href={link}
                                                        className="hover-underline text-primary"
                                                        target="_blank"
                                                    >
                                                        {link}
                                                    </a>
                                                </li>
                                            )
                                        )}
                                    </ul>
                                </div>

                                <div className="mt-2 mt-3">
                                    <span
                                        className="d-block fs-12 font-weight-bold mb-2"
                                        style={{ color: "#767581" }}
                                    >
                                        Description
                                    </span>
                                    {sub?.explaination ? (
                                        <div
                                            className="sp1_ck_content"
                                            dangerouslySetInnerHTML={{
                                                __html: sub?.explaination,
                                            }}
                                        />
                                    ) : (
                                        <span
                                            style={{
                                                color: "rgb(180, 188, 196)",
                                            }}
                                        >
                                            No description is available
                                        </span>
                                    )}
                                </div>

                                <div className="mt-3">
                                    <span
                                        className="d-block fs-12 font-weight-bold mb-2"
                                        style={{ color: "#767581" }}
                                    >
                                        Attached Files
                                    </span>
                                    {_.size(sub?.attaches)> 0 ? ( 
                                     <FileUploader>
                                        {_.map(sub?.attaches, (file, index) => (
                                            <FileUploader.Preview
                                                key={`${file}_${index}`}
                                                fileName={file}
                                                downloadAble={true}
                                                deleteAble={false}
                                                downloadUrl={`/storage/TaskSubmission/${file}`}
                                                previewUrl={`/storage/TaskSubmission/${file}`}
                                                fileType={_.includes(["png","jpg", "jpeg", "gif", "svg"], _.last(_.split(file, '.'))) ? 'images' : 'others'}
                                                ext=""
                                            />
                                        ))}
                                    </FileUploader>
                                    ) : (
                                        <span
                                            className=""
                                            style={{ color: "rgb(180, 188, 196)" }}
                                        >
                                            No Attachment is available
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </React.Fragment>
            </Modal>
        </React.Fragment>
    );
};

export default SubmittedTaskViewModal;
