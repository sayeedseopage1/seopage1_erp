import dayjs from "dayjs";
import React from "react";
import { useWindowSize } from 'react-use';
import FileUploader from "../../../file-upload/FileUploader";
import Button from "../../components/Button";
import CustomModal from "../../components/CustomModal";
import Modal from "../../components/Modal";

const SubmitionView = ({ isOpen, close, toggle, data, isLoading }) => {
    const links = _.compact(_.split(data?.links, ','));
    const attaches = _.compact(_.split(data?.attaches, ','));
    const { width: deviceWidth } = useWindowSize();

    const content = () => {
        return(
            <div className="sp1-subtask-form --modal-panel --modal-submitted">
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
                    <div className="mt-3 d-flex flex-column" style={{ gap: "10px" }} >
                        <div>
                            <span className="fs-14 font-weight-bold d-block mb-3" style={{ color: "#767581" }} >
                                Submitted By
                            </span>

                            <div className="d-flex align-items-center">
                                <div>
                                    {
                                        data?.image ? (
                                            <img
                                            src={`/user-uploads/avatar/${data?.image}`}
                                            alt={data?.name}
                                            width={32}
                                            height={32}
                                            className="rounded-circle"
                                        />):(
                                            <div className="sp1-item-center rounded-circle border" style={{ width: '32px', height: '32px' }} >
                                                <span className="font-weight-bold" style={{fontSize:'1.2rem'}}>{data?.name?.slice(0,1)}</span>
                                            </div>
                                        )
                                    }
                                </div>
                                <div className="d-flex flex-column px-2">
                                    <a className="text-underline text-primary" href={`/account/employees/${data?.user_id}`} style={{ color: "#767581" }} > {data?.name} </a>
                                    <span className="d-block" style={{ color: "#767581" }}>
                                        {dayjs(data?.submission_date).format( "MMM DD, YYYY" )} at {dayjs(data?.submission_date).format("hh:mm a" )}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="d-flex flex-column mt-3" style={{ gap: "10px" }} >
                            <span className="d-block fs-14 font-weight-bold" style={{ color: "#767581" }} > Links </span>
                            <ul style={{  listStyle: "unset", marginLeft: "30px"}} >
                                {links?.map((link, i) => (
                                    <li style={{ listStyle: "unset" }}  key={link + i} >
                                        <a className="hover-underline text-primary" target="_blank" href={link} > {link} </a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="mt-2 mt-3">
                            <span className="d-block fs-12 font-weight-bold mb-2" style={{ color: "#767581" }}>
                                Description
                            </span>
                            {data?.text ? (
                                <div className="sp1_ck_content" dangerouslySetInnerHTML={{ __html: data?.text }} />
                            ) : (
                                <span style={{ color: "rgb(180, 188, 196)" }}>
                                    No description is available
                                </span>
                            )}
                        </div>

                        <div className="mt-3">
                            <span className="d-block fs-12 font-weight-bold mb-2" style={{ color: "#767581" }}>
                                Attached Files
                            </span>

                            {_.size(attaches) > 0 ? (
                                <FileUploader>
                                    {_.map(attaches, (file, index) => (
                                        <FileUploader.Preview
                                            key={`${file}_${index}`}
                                            fileName={file}
                                            downloadAble={true}
                                            deleteAble={false}
                                            downloadUrl={file}
                                            previewUrl={file}
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
        )
    }

    if(deviceWidth > 1200){
        return (
            <CustomModal isOpen={isOpen} toggleRef={toggle}>
                {content()}
            </CustomModal>
        )
    }else{
        return (
            <React.Fragment>
                <Modal isOpen={isOpen}> { content() } </Modal>
            </React.Fragment>
        );
    }
};

export default SubmitionView;
