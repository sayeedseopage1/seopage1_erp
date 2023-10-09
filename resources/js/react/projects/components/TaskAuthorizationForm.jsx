import React, { useState } from "react";
import styles from "./taskAuthorization.module.css";
import Button from "../../global/Button";
import Modal from "../../global/Modal";
import Card from "../../global/Card";
import dayjs from "dayjs";
import Avatar from "../../global/Avatar";
import { useUpdateAuthorizeTaskMutation } from "../../services/api/projectApiSlice";
import { toast } from "react-toastify";

const TaskAuthorizationForm = ({ data, table }) => {
    const [visible, setVisible] = useState(false);
    const [comment, setComment] = useState("");
    const [err, setErr] = useState(new Object());

    const open = () => setVisible(true);
    const close = () => setVisible(false);

    const [updateAuthorizeTask, { isLoading }] =
        useUpdateAuthorizeTaskMutation();
    const handleSubmission = async (e, status) => {

        const error = new Object();
        const _data = {
            id: data.id,
            status: status,
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

    return (
        <div>
            <div className={styles.action}>
                <Button onClick={open} variant="tertiary">
                    Approve/Deny
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
                                                {data.acknowledgement + " "}{" "}
                                                <strong>
                                                    {data.sub_acknowledgement}
                                                </strong>
                                            </p>
                                        </div>
                                    </div>

                                    <div className={styles.comment_field}>
                                        <label className="task_info__label">
                                            Comment:{" "}
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
                                                   onClick={e => handleSubmission(e,true)}
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
