import React, { useState } from "react";
import styles from "./taskAuthorization.module.css";
import Button from "../../global/Button";
import Modal from "../../global/Modal";
import Card from "../../global/Card";
import dayjs from "dayjs";
import Avatar from "../../global/Avatar";
import { useUpdateAuthorizeTaskMutation } from "../../services/api/projectApiSlice";
import { toast } from "react-toastify";
import QuestionAnswer from "./QuestionAnswer";
import TaskAuthorizationQuestionAnswers from "./TaskAuthorizationQuestionAnswers";
import { User } from "../../utils/user-details";
import _ from "lodash";

const TaskAuthorizationForm = ({ data, table }) => {
    const [visible, setVisible] = useState(false);
    const [comment, setComment] = useState("");
    const [hasQuestion, setHasQuestion] = useState(false);
    const [err, setErr] = useState(new Object());

    const [conversations, setConversations] = React.useState(data.conversations);

    const updateConversation = (entry) => {
        setConversations([...entry])
    };

    const open = () => setVisible(true);
    const close = () => setVisible(false);

    const [updateAuthorizeTask, { isLoading }] =
        useUpdateAuthorizeTaskMutation();
    const handleSubmission = async (e, status) => {

        const error = new Object();
        const _data = {
            id: data.id,
            status: status,
            comment
        };

        if (comment) {
            await updateAuthorizeTask(_data)
                .unwrap()
                .then((res) => {
                    toast.success("Success! Your request has been completed.");
                    close();
                });
        } else {
            toast.warn("Please write a comment before submitting.");
            error.comment = "Please write a comment before submitting.";
            setErr(error);
        }
    };

    const user = new User(window.Laravel.user);

    const notAnswered = _.filter(conversations, c => !c.replied_by)
    const auth = _.includes([1, 8], user.getRoleId());

    return (
        <div>
            <div className={styles.action}>
                <Button onClick={open} variant={data.approval_status === null ? 'tertiary': data.approval_status === 1 ? 'success' : 'danger'}>
                    {data.approval_status === null ?
                        (!auth ? _.size(notAnswered) ? `${_.size(notAnswered)} Questions` : 'View' : 'Approve/Deny') :
                        "View"
                    }
                </Button>

                <Modal isOpen={visible}>
                    <div className={styles.modal_overlay}>
                        <Card className={styles.card_task_details}>
                            <Card.Head
                                onClose={close}
                                className={styles.task_info__card_head}
                            ></Card.Head>

                            <Card.Body className={styles.card_body}>
                                <div className={styles.task_project}>
                                    <h6>{data.project_name}</h6>
                                    <span className="d-block">
                                        {data.client_name}
                                    </span>
                                </div>

                                <div className={styles.task_info}>
                                    <div className={styles.inline_flex}>
                                        <div
                                            className={styles.task_info__label}
                                        >
                                            Creation Date{" "}
                                        </div>
                                        <div
                                            className={styles.task_info__text}
                                            style={{ gap: "6px" }}
                                        >
                                            <strong>
                                                {dayjs(data.created_at).format(
                                                    "MMM DD, YYYY"
                                                )}
                                            </strong>
                                            at
                                            <strong>
                                                {dayjs(data.created_at).format(
                                                    "hh:mm A"
                                                )}
                                            </strong>
                                        </div>
                                    </div>

                                    <div className={styles.inline_flex}>
                                        <div
                                            className={styles.task_info__label}
                                        >
                                            Status
                                        </div>
                                        <div className={styles.task_info__text}>
                                            {data.approval_status === null ?<span className="badge badge-warning">Pending</span> : data.approval_status === 1 ? <span className="badge badge-success">Approved</span> : <span className="badge badge-danger">Rejected</span> }
                                        </div>
                                    </div>

                                    <div className={styles.inline_flex}>
                                        <div
                                            className={styles.task_info__label}
                                        >
                                            Task Name{" "}
                                        </div>
                                        <div className={styles.task_info__text}>
                                            {data.heading}
                                        </div>
                                    </div>

                                    <div className={styles.inline_flex}>
                                        <div
                                            className={styles.task_info__label}
                                        >
                                            Assigned By{" "}
                                        </div>
                                        <div className={styles.task_info__text}>
                                            <Avatar
                                                name={data.assignee_by_name}
                                                src={
                                                    data.assignee_by_avatar
                                                        ? `/user-uploads/avatar/${data.assignee_by_avatar}`
                                                        : null
                                                }
                                                type="circle"
                                                width={32}
                                                height={32}
                                            />
                                            <a
                                                href={`/account/employees/${data.assignee_by_id}`}
                                            >
                                                {data.assignee_by_name}
                                            </a>
                                        </div>
                                    </div>

                                    <div className={styles.inline_flex}>
                                        <div
                                            className={styles.task_info__label}
                                        >
                                            Assigned To{" "}
                                        </div>
                                        <div className={styles.task_info__text}>
                                            <Avatar
                                                name={data.assignee_by_name}
                                                src={
                                                    data.assignee_by_avatar
                                                        ? `/user-uploads/avatar/${data.assignee_by_avatar}`
                                                        : null
                                                }
                                                type="circle"
                                                width={32}
                                                height={32}
                                            />
                                            <a
                                                href={`/account/employees/${data.assignee_to_id}`}
                                            >
                                                {data.assignee_to_name}
                                            </a>
                                        </div>
                                    </div>

                                    <div className={styles.inline_flex}>
                                        <div
                                            className={styles.task_info__label}
                                        >
                                            Acknowledgement{" "}
                                        </div>
                                        <div className={styles.task_info__text}>
                                            <p>
                                                {data.acknowledgement + " "}
                                                <strong>
                                                    {data.sub_acknowledgement}
                                                </strong>
                                            </p>
                                        </div>
                                    </div>


                                     <TaskAuthorizationQuestionAnswers
                                        data={conversations}
                                        updateConversations={updateConversation}
                                    />

                                    {
                                        (auth && data.approval_status === null) && <React.Fragment>
                                             <div className={styles.section_divider}>
                                                    <span className="badge badge-secondary"> Authority </span>
                                                </div>

                                                <div className={styles.inline_flex}>
                                                    <div
                                                        className={styles.task_info__label}
                                                    >
                                                    Has Question
                                                    </div>
                                                    <div className={styles.task_info__text}>
                                                    <label>
                                                            <input
                                                                onChange={e => setHasQuestion(true)}
                                                                value={true}
                                                                type="radio"
                                                                name="has_question"
                                                            /> Yes
                                                        </label>
                                                    <label>
                                                            <input
                                                                onChange={e => setHasQuestion(false)}
                                                                value={false}
                                                                type="radio"
                                                                defaultChecked={true}
                                                                name="has_question"
                                                            /> No
                                                        </label>
                                                    </div>
                                                </div>



                                                {
                                                    hasQuestion ?
                                                        <QuestionAnswer
                                                            data={data}
                                                            conversations={conversations}
                                                            setConversations={updateConversation}
                                                        />
                                                    :
                                                    <>
                                                    <div className={styles.comment_field}>
                                                        <label className="task_info__label">
                                                            Comment:
                                                        </label>
                                                        <textarea
                                                            rows={6}
                                                            value={comment}
                                                            onChange={(e) =>
                                                                setComment(e.target.value)
                                                            }
                                                            placeholder="Write your comment here."
                                                        />

                                                        {err?.comment && (
                                                            <span className="text-danger">
                                                                <small>{err?.comment}</small>
                                                            </span>
                                                        )}
                                                    </div>

                                                    <div className={styles.button_group}>
                                                        {isLoading ? (
                                                            <Button isLoading={isLoading} variant="primary">
                                                                Loading
                                                            </Button>
                                                        ) : (
                                                            <>
                                                                <Button
                                                                    variant="danger"
                                                                onClick={e => handleSubmission(e,false)}
                                                                >
                                                                    Deny
                                                                </Button>
                                                                <Button
                                                                    variant="success"
                                                                    onClick={(e) =>
                                                                        handleSubmission(e,true)
                                                                    }
                                                                >
                                                                    Approve
                                                                </Button>
                                                            </>
                                                        )}
                                                    </div>
                                                    </>
                                                }
                                        </React.Fragment>
                                    }

                                   {data.approval_status !== null &&  <div className={`alert ${data.approval_status=== 1 ? 'alert-success' : 'alert-danger'} text-center`}>
                                            Authorized by <a href={`/account/employees/${data.authorized_by}`}>
                                            {data.approved_by_name} </a> at {dayjs(data.updated_at).format('MMM DD, YYYY hh:mm A')}
                                    </div>}
                                </div>
                            </Card.Body>
                        </Card>
                    </div>
                </Modal>
            </div>
        </div>
    );
};

export default TaskAuthorizationForm;
