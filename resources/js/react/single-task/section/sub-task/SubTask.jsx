import _ from "lodash";
import React, { useEffect, useState } from "react";
import { useCheckEditableSubTaskQuery, useLazyCheckSubTaskTimerQuery } from "../../../services/api/SingleTaskPageApi";
import { SingleTask } from "../../../utils/single-task";
import { User } from "../../../utils/user-details";
import Button from "../../components/Button";
import Modal from "../../components/Modal";
import PreviewSubtask from "./PreviewSubtask";
import ApproveTask from "../task-actions/approve-task/ApproveTask";

const SubTask = ({ subTask, task, status, toggleEditForm }) => {
    const [isOpen, setIsOpen] = useState(false);
    const auth = new User(window?.Laravel?.user);


    const [checkSubTaskTimer, {isFetching}] = useLazyCheckSubTaskTimerQuery()
      // check task edit

        const { data } = useCheckEditableSubTaskQuery(subTask?.id);
        const isEditable = data?.task === 0;

    const toggle = (e) => {
      e.preventDefault();
      e.stopPropagation();
      setIsOpen(true);
    }


    const hasEditPermission = () => {
        return Number(subTask?.added_by) === auth?.getId() && _.includes([1,2,3], status?.id);
    }

    const onEdit = (e) => {
        e.preventDefault();
        checkSubTaskTimer(subTask?.id)
        .unwrap()
        .then(res=>{
            if(res?.status === 200){
                toggleEditForm(e, subTask?.id)
            }else{
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'You cannot edit the task because timer is already running',
                })
            }
        })
    }

    const onModalEditButtonClick = (e) => {
        e.preventDefault();
        checkSubTaskTimer(subTask?.id)
        .unwrap()
        .then(res=>{
            if(res?.status === 200){
                window.location = `/account/tasks/${subTask?.id}/edit`
            }else{
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'You cannot edit the task because timer is already running',
                })
            }
        })
    }


    return (
        <div
            className="d-flex align-items-center justify-content-between sp1_tark_right_item"
            style={{ gap: "16px" }}
        >
            <div className="w-100 text-ellipsis">
                <div onClick={toggle} className="hover-underline" style={{cursor: 'pointer'}}>
                    {subTask?.title}
                </div>
            </div>

            <div className="d-flex align-items-center">
                <div
                    onClick={toggle}
                    className="mr-2 py-2 sp1_task_righ_action_btn"
                    style={{cursor: 'pointer'}}
                >
                    <i className="fa-regular fa-eye"></i>
                </div>
                {
                    isEditable && hasEditPermission() && <div
                        onClick={onEdit}
                        className="mr-2 py-2 sp1_task_righ_action_btn"
                        style={{cursor: 'pointer'}}
                    >
                        {isFetching ?  <div
                            className="spinner-border text-dark ml-2"
                            role="status"
                            style={{
                                width: "16px",
                                height: "16px",
                                border: "0.14em solid rgba(0, 0, 0, .25)",
                                borderRightColor: "transparent",
                            }}
                        /> :<i className="fa-regular fa-pen-to-square"></i>}
                    </div>
                }

            </div>


            {/* task Preview Modal */}
            <React.Fragment>
                <Modal
                    className={`sp1_subtask_offsetcanvas--modal`}
                    isOpen={isOpen}
                >
                    <div
                        className={`sp1_subtask_offsetcanvas ${
                            isOpen ? "open" : ""
                        }`}
                    >
                        <div className="d-flex align-items-center justify-content-between p-2 sp1_subtask_offsetcanvas--bar">
                            <div className="pl-3">
                                <span className="font-weight-bold f-16">
                                    Sub Task # {subTask?.id} :{" "}
                                    <span className="font-weight-normal">
                                        {subTask?.title}
                                    </span>{" "}
                                </span>
                            </div>
                            <div className="d-flex align-items-center ml-auto">
                                {/* <ApproveTask
                                    task={subTask}
                                    auth={auth}
                                />

                                <Button variant="success" onClick={() => setIsOpen(false)} className="mr-2 bg-danger">
                                    Revision
                                </Button> */}

                                {isEditable && hasEditPermission() && <a href="#" onClick={onModalEditButtonClick} className="border text-dark mr-2 py-1 px-2">
                                    {isFetching ?  <div
                                        className="spinner-border text-dark ml-2"
                                        role="status"
                                        style={{
                                            width: "16px",
                                            height: "16px",
                                            border: "0.14em solid rgba(0, 0, 0, .25)",
                                            borderRightColor: "transparent",
                                        }}
                                    /> :<i className="fa-regular fa-pen-to-square"></i>}
                                </a>}
                                <a
                                    href={`/account/tasks/${subTask?.id}`}
                                    target="_blank"
                                    className="border text-dark mr-2 py-1 px-2"
                                >
                                    {/* <i className="fa-solid fa-up-right-and-down-left-from-center" /> */}
                                    <i className="fa-solid fa-arrow-up-right-from-square"></i>
                                </a>
                                <Button onClick={() => setIsOpen(false)} className="">
                                    <i className="fa-solid fa-xmark" />
                                </Button>
                            </div>
                        </div>

                        <div className="sp1_subtask_offsetcanvas--body">
                            <PreviewSubtask
                                parentTask={task}
                                subTask={subTask}
                            />
                        </div>
                    </div>
                </Modal>
            </React.Fragment>
        </div>
    );
};

export default SubTask;
