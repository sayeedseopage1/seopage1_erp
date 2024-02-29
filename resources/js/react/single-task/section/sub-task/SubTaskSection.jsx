import React from "react";
import SubTask from "./SubTask";
import SubTaskForm from "./SubTaskForm";
import Button from "../../components/Button";
import { useDispatch, useSelector } from "react-redux";
import {
    useGetTaskDetailsQuery,
    useLazyGetInProgressTaskStatusQuery,
    useLazyGetTaskDetailsQuery,
} from "../../../services/api/SingleTaskPageApi";
import { useNavigate } from "react-router-dom";
import { storeSubTasks } from "../../../services/features/subTaskSlice";
import SubTaskEditForm from "./SubTaskEditForm";
import CustomModal from "../../components/CustomModal";
import { useWindowSize } from "react-use";
import Modal from "../../components/Modal";
import _ from "lodash";
import { User } from "../../../utils/user-details";
import { SingleTask } from "../../../utils/single-task";
import { subTaskCreationPermision } from "../../permissions";
import { toast } from "react-toastify";
import Loader from "../../components/Loader";
import SubTaskFormController from "./SubTaskFormModal";
import MySwal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const SubTaskSection = ({ status }) => {
    const { task, subTask } = useSelector((s) => s.subTask);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [edit, setEdit] = React.useState(null);
    const [formMode, setFormMode] = React.useState("add");
    const [isTaskModalOpen, setIsTaskModalOpen] = React.useState(false);
    const [subtaskModalToggleRef, setSubtaskModalToggleRef] =
        React.useState(null);
    const { width } = useWindowSize();
    const auth = new User(window?.Laravel?.user);

    // check in progress task history
    const [getInProgressTaskStatus, { isFetching: inProgressTaskStatus }] =
        useLazyGetInProgressTaskStatusQuery();

    const toggleAddButton = async () => {
        if (status?.id && Number(status.id) === 1) {
            withReactContent(MySwal).fire({
                icon: "error",
                title: "You cannot create any sub task under this parent task now because the parent task is under revision.",
                customClass: {
                    confirmButton: "btn btn-primary px-4",
                },
            });
        } else {
            setIsTaskModalOpen(!isTaskModalOpen);
        }

        // try{
        //     const res = await getInProgressTaskStatus(`/${auth?.getId()}`).unwrap();
        //     if(res.status === 400){
        //         toast.error(res?.message, {theme: 'colored'})
        //     }else{
        //         setIsTaskModalOpen(!isTaskModalOpen);
        //     }

        // }catch(err){
        //     console.log(err)
        // }
    };

    const closeAddModal = () => {
        setIsTaskModalOpen(false);
        setFormMode("add");
        navigate(`/account/tasks/${task?.id}`);
    };
    const toggleEditButton = (e) => {
        setFormMode("edit");
        setIsTaskModalOpen(!isTaskModalOpen);
    };

    // edit modal form control
    const toggleEditForm = (e, id) => {
        e.preventDefault();
        setEdit(id);
        setIsTaskModalOpen(true);
    };

    const closeEditForm = () => {
        setEdit(null);
        setIsTaskModalOpen(false);
    };

    // handle create new subtask
    const handleCreateSubTask = () => {
        // if parent task has not already any subtask
        // show the Working Environment form
        // else create from
    };

    // edit modal form control end
    // const {
    //   data,
    //   isFetching
    // } = useGetTaskDetailsQuery(`/${task?.id}/json?mode=sub_task`, {
    //   skip: subTask?.length
    // });

    // fetch all task
    const [getTaskDetails, { isFetching }] = useLazyGetTaskDetailsQuery("", {
        skip: subTask?.length,
    });

    // if task notes fetch completed store data into redux store
    React.useEffect(() => {
        if (task && task.id) {
            getTaskDetails(`/${task?.id}/json?mode=sub_task`)
                .unwrap()
                .then((res) => {
                    if (res) {
                        dispatch(storeSubTasks(res));
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }, [task]);

    // React.useEffect(() => {
    //   if(!isFetching && data){
    //     dispatch(storeSubTasks(data));
    //   }
    // },[data])

    // console.log({ task });
    const Task = new SingleTask(task);
    // console.log({ Task });

    return (
        <div
            className="sp1_task_right_card mb-3"
            ref={setSubtaskModalToggleRef}
            style={{ zIndex: isTaskModalOpen ? "99" : "" }}
        >
            {width > 1200 ? (
                <React.Fragment>
                    {/* modal */}
                    <CustomModal
                        toggleRef={subtaskModalToggleRef}
                        isOpen={isTaskModalOpen}
                        close={closeAddModal}
                        formMode={formMode}
                    >
                        {!edit ? (
                            <>
                                <SubTaskFormController close={closeAddModal} />
                            </>
                        ) : (
                            <SubTaskEditForm
                                close={closeEditForm}
                                editId={edit}
                            />
                        )}
                    </CustomModal>
                </React.Fragment>
            ) : (
                <React.Fragment>
                    {/* modal */}
                    <Modal isOpen={isTaskModalOpen}>
                        {!edit ? (
                            <SubTaskFormController close={closeAddModal} />
                        ) : (
                            <SubTaskEditForm
                                close={closeEditForm}
                                editId={edit}
                            />
                        )}
                    </Modal>
                </React.Fragment>
            )}

            {/* left dropdown */}

            {isTaskModalOpen && (
                <button
                    aria-label="openCommentModalButton"
                    className="sp1_task_right_dl_toggle"
                    onClick={toggleAddButton}
                    style={{ zIndex: isTaskModalOpen ? "110" : "" }}
                >
                    <i
                        className={`fa-solid fa-circle-chevron-${
                            isTaskModalOpen ? "right" : "left"
                        }`}
                        style={{ color: "#276fec" }}
                    />
                </button>
            )}
            {/* left dropdown */}

            <div className="d-flex border-bottom pb-2 align-items-center justify-content-between mb-2 font-weight-bold">
                <div className="f-16">
                    <span>Sub Task</span>
                    {isFetching && (
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

                {subTaskCreationPermision({ task: Task, auth, status }) && (
                    <Button
                        variant="tertiary"
                        className="sp1_tark_add_item"
                        aria-label="addButton"
                        onClick={toggleAddButton}
                    >
                        {isTaskModalOpen ? (
                            <React.Fragment>
                                <i
                                    className="fa-solid fa-xmark"
                                    style={{ fontSize: "12px" }}
                                />{" "}
                                Close
                            </React.Fragment>
                        ) : (
                            <React.Fragment>
                                {inProgressTaskStatus ? (
                                    <Loader title="Loading..." />
                                ) : (
                                    <>
                                        <i
                                            className="fa-solid fa-plus"
                                            style={{ fontSize: "12px" }}
                                        />{" "}
                                        Sub Task
                                    </>
                                )}
                            </React.Fragment>
                        )}
                    </Button>
                )}
            </div>

            <div className="sp1_task_right_card--body">
                {!isFetching ? (
                    _.size(subTask) !== 0 ? (
                        subTask?.map((sub) => (
                            <SubTask
                                key={sub.id}
                                subTask={sub}
                                task={task}
                                status={status}
                                toggleEditForm={toggleEditForm}
                            />
                        ))
                    ) : (
                        <div
                            className="d-flex align-items-center justify-content-center"
                            style={{
                                color: "#B4BCC4",
                                fontSize: "15px",
                                textAlign: "center",
                                height: "100%",
                                width: "100%",
                            }}
                        >
                            Sub Task is Not Available
                        </div>
                    )
                ) : (
                    <div
                        className="d-flex align-items-center justify-content-center"
                        style={{
                            color: "#5A6169",
                            fontSize: "15px",
                            textAlign: "center",
                            height: "100%",
                            width: "100%",
                        }}
                    >
                        <div
                            className="spinner-border text-dark ml-2"
                            role="status"
                            style={{
                                width: "16px",
                                height: "16px",
                                border: "0.14em solid rgba(0, 0, 0, .25)",
                                borderRightColor: "transparent",
                                marginRight: "10px",
                            }}
                        />
                        Loading...
                    </div>
                )}
            </div>
        </div>
    );
};

export default SubTaskSection;
