import React, {useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import PreviewSubtask from "./PreviewSubtask";
import Modal from "../../components/Modal";
import Button from "../../components/Button";

const SubTask = ({ subTask, task, toggleEditForm }) => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate()

    const toggle = (e) => {
      e.preventDefault();
      e.stopPropagation();

      setIsOpen(true);
    }

    return (
        <div
            className="d-flex align-items-center justify-content-between sp1_tark_right_item"
            style={{ gap: "16px" }}
        >
            <div className="w-100 text-ellipsis">
                <Link to="#" onClick={toggle} >
                    {subTask?.title}
                </Link>
            </div>

            <div className="d-flex align-items-center">
                <Link
                    to="#"
                    onClick={toggle}
                    className="mr-2 py-2 sp1_task_righ_action_btn"
                >
                    <i className="fa-regular fa-eye"></i>
                </Link>
                <Link
                    to="#"
                    onClick={(e) => toggleEditForm(e, subTask?.id)}
                    className="mr-2 py-2 sp1_task_righ_action_btn"
                >
                    <i className="fa-regular fa-pen-to-square"></i>
                </Link>
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
                                <a href={`/account/tasks/${subTask?.id}`} target="__blank" className="border text-dark mr-2 px-2">
                                    <i className="fa-solid fa-up-right-and-down-left-from-center" />
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
