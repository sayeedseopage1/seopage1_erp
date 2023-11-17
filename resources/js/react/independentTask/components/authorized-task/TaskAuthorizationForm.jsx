import React, { useState } from "react";
import styles from "./taskAuthorization.module.css";
import dayjs from "dayjs";
import { toast } from "react-toastify";
import QuestionAnswer from "./QuestionAnswer";
import TaskAuthorizationQuestionAnswers from "./TaskAuthorizationQuestionAnswers";
import _ from "lodash";
import Button from "../Button";
import Modal from "../Modal";
import Card from "../../../global/Card";
import Avatar from "../../../global/Avatar";
import { User } from "../../../utils/user-details";
import { CompareDate } from "../../../utils/dateController";
import DatePickerComponent from "./DatePicker";
import { useEffect } from "react";
import Input from "../form/Input";
import UserSelectionList from "./UserSelectionList";
import {
    useGetIndependentTaskAuthorizationConversationsQuery,
    usePutIndependentTaskMutation,
} from "../../../services/api/independentTaskApiSlice";
import Swal from "sweetalert2";
import Loader from "../Loader";
import { useRefresh } from "../../index";

const day = new CompareDate();

const clientRadio = [
    {
        id: "existingClient",
        title: "Existing Client",
    },
    {
        id: "newClient",
        title: "New Client",
    },
    {
        id: "inHouseWork",
        title: "In House Work",
    },
];

const TaskAuthorizationForm = ({ data, table, refreshing }) => {
    const { refresh, handleRefresh } = useRefresh();

    const [startDate, setStartDate] = useState(new Date(data?.start_date));
    const [showless, setShowless] = useState(true);
    const [client, setClient] = useState("");
    const [dueDate, setDueDate] = useState(new Date(data?.due_date));
    const [radio, setRadio] = useState("");
    const [visible, setVisible] = useState(false);
    const [comment, setComment] = useState("");
    const [hasQuestion, setHasQuestion] = useState(false);

    // get conversation
    const {
        data: conversationData,
        isLoading: isConversationLoading,
        isFetching,
        refetch,
    } = useGetIndependentTaskAuthorizationConversationsQuery(data.id);

    // console.log({ conversationData, isConversationLoading });

    useEffect(() => {
        // console.log({ radio });
        if (radio === "inHouseWork") {
            setClient("SEOPAGE1");
        } else {
            setClient("");
        }
    }, [radio]);

    // console.log({ chat: data?.conversations });
    // const [conversations, setConversations] = React.useState(data.conversations);

    // const updateConversation = (entry) => {
    //     setConversations([...entry])
    // };

    const open = () => setVisible(true);
    const close = () => {
        setVisible(false);
        setRadio("");
    };

    const [putIndependentAuthorizeTask, { isLoading }] =
        usePutIndependentTaskMutation();

    const handleSubmission = async (e, status) => {
        if (status) {
            if (!client) {
                toast.warning("Client is required");
                return;
            } else if (!comment) {
                toast.warning("Comment is required");
                return;
            }
        } else {
            if (!comment) {
                toast.warning("Comment is required");
                return;
            }
        }

        const _data = {
            u_id: data.u_id,
            id: data.id,
            start_date: dayjs(startDate.toString()).format("YYYY-MM-DD"),
            due_date: dayjs(dueDate.toString()).format("YYYY-MM-DD"),
            approval_status: status ? 1 : 2,
            // status: status,
            comment,
            _token: document
                .querySelector("meta[name='csrf-token']")
                .getAttribute("content"),
        };

        if (client instanceof Object) {
            _data.client_id = client.id;
        } else {
            _data.client = client;
        }
        // console.log(_data);

        // if (comment) {
        await putIndependentAuthorizeTask(_data)
            .unwrap()
            .then((res) => {
                // console.log(res);
                if (status) {
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Independent task creation request has been authorized and the task has been created successfully!",
                        showConfirmButton: false,
                        timer: 3000,
                    });
                } else {
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Independent task creation request denied successfully",
                        showConfirmButton: false,
                        timer: 3000,
                    });
                }
                close();
                refreshing();
                handleRefresh();
            });
        // } else {
        // Swal.fire({
        //     position: "center",
        //     icon: "error",
        //     title: "Task authorization unsuccessfull",
        //     showConfirmButton: true,
        // });
        // }
    };

    const user = new User(window.Laravel.user);

    const notAnswered = _.filter(conversationData?.data, (c) => !c.replied_by);
    const auth = _.includes([1, 8], user.getRoleId());

    // console.log(data.heading);
    // console.log({ data, table });

    return (
        <div>
            <div className={styles.action}>
                <Button
                    onClick={open}
                    variant={
                        data?.approval_status === null
                            ? "tertiary"
                            : data?.approval_status === 1
                            ? "success"
                            : "danger"
                    }
                >
                    {data?.approval_status === null
                        ? !auth
                            ? _.size(notAnswered)
                                ? `${_.size(notAnswered)} Questions`
                                : "View"
                            : "Approve/Deny"
                        : "View"}
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
                                    <h2>
                                        {auth
                                            ? data?.approval_status
                                                ? "Authorization Completed"
                                                : "Need to Authorization"
                                            : data?.approval_status
                                            ? "Authorization Completed"
                                            : "Wait for Authorization"}
                                    </h2>
                                </div>

                                <div className={styles.task_info}>
                                    {/* start_date */}
                                    <div
                                        className={styles.inline_flex}
                                        style={{ alignItems: "center" }}
                                    >
                                        <div
                                            className={styles.task_info__label}
                                        >
                                            Start Date{" "}
                                        </div>
                                        {!data?.approval_status && auth ? (
                                            <div
                                                className={`${styles.task_info__text} w-100 bg-white py-1 pl-2 pr-1 border d-flex align-items-center justify-content-between`}
                                            >
                                                <DatePickerComponent
                                                    placeholderText={day
                                                        .dayjs()
                                                        .format("DD-MM-YYYY")}
                                                    minDate={
                                                        new Date(
                                                            data?.start_date
                                                        )
                                                    }
                                                    maxDate={dueDate}
                                                    date={startDate}
                                                    setDate={setStartDate}
                                                />
                                            </div>
                                        ) : (
                                            <div
                                                className={
                                                    styles.task_info__text
                                                }
                                            >
                                                {data?.start_date}
                                            </div>
                                        )}
                                    </div>

                                    {/* due_date */}
                                    <div
                                        className={styles.inline_flex}
                                        style={{ alignItems: "center" }}
                                    >
                                        <div
                                            className={styles.task_info__label}
                                        >
                                            Due Date{" "}
                                        </div>
                                        {!data?.approval_status && auth ? (
                                            <div
                                                className={`${styles.task_info__text} w-100 bg-white py-1 pl-2 pr-1 border d-flex align-items-center justify-content-between`}
                                            >
                                                <DatePickerComponent
                                                    placeholderText={day
                                                        .dayjs()
                                                        .format("DD-MM-YYYY")}
                                                    minDate={
                                                        new Date(
                                                            data?.start_date
                                                        )
                                                    }
                                                    maxDate={null}
                                                    date={dueDate}
                                                    setDate={setDueDate}
                                                />
                                            </div>
                                        ) : (
                                            <div
                                                className={
                                                    styles.task_info__text
                                                }
                                            >
                                                {data?.due_date}
                                            </div>
                                        )}
                                    </div>

                                    {/* creation_date */}
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
                                                {dayjs(
                                                    data.creation_date
                                                ).format("MMM DD, YYYY")}
                                            </strong>
                                            at
                                            <strong>
                                                {dayjs(
                                                    data.creation_date
                                                ).format("hh:mm A")}
                                            </strong>
                                        </div>
                                    </div>

                                    {/* approval_status */}
                                    <div className={styles.inline_flex}>
                                        <div
                                            className={styles.task_info__label}
                                        >
                                            Status
                                        </div>
                                        <div className={styles.task_info__text}>
                                            {data?.approval_status === null ? (
                                                <span className="badge badge-warning">
                                                    Pending
                                                </span>
                                            ) : data?.approval_status === 1 ? (
                                                <span className="badge badge-success">
                                                    Approved
                                                </span>
                                            ) : (
                                                <span className="badge badge-danger">
                                                    Rejected
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    {/* heading */}
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

                                    {/* description */}
                                    <div
                                        style={{
                                            display: "flex",
                                            flexFlow: "column nowrap",
                                            gap: "5px",
                                        }}
                                    >
                                        <div
                                            className={styles.task_info__label}
                                            style={{ width: "135px" }}
                                        >
                                            Task Description{" "}
                                        </div>
                                        {/* <div dangerouslySetInnerHTML={{__html:data.description}}/> */}
                                        <div
                                            className={`${styles.task_info__text} bg-additional-grey`}
                                            style={{
                                                flexBasis: "100%",
                                                padding: "10px",
                                                borderRadius: "2px",
                                                flexFlow: "column nowrap",
                                            }}
                                        >
                                            <div
                                                dangerouslySetInnerHTML={{
                                                    __html: data.description,
                                                }}
                                                style={{
                                                    maxHeight: `${
                                                        showless
                                                            ? "100px"
                                                            : "none"
                                                    }`,
                                                    overflow: "hidden",
                                                    transition: "height 3s",
                                                    textAlign: "left",
                                                    alignSelf: "stretch",
                                                }}
                                            ></div>
                                            <button
                                                className="btn btn-dark btn-sm"
                                                onClick={() =>
                                                    setShowless((prev) => !prev)
                                                }
                                            >
                                                {showless
                                                    ? "Show More"
                                                    : "Show Less"}
                                            </button>
                                        </div>
                                    </div>

                                    {/* assign_by */}
                                    <div className={styles.inline_flex}>
                                        <div
                                            className={styles.task_info__label}
                                        >
                                            Assigned By{" "}
                                        </div>
                                        <div className={styles.task_info__text}>
                                            <Avatar
                                                name={data.assign_by_name}
                                                src={
                                                    data.assign_by_avator
                                                        ? `/user-uploads/avatar/${data.assign_by_avator}`
                                                        : null
                                                }
                                                type="circle"
                                                width={32}
                                                height={32}
                                            />
                                            <a
                                                href={`/account/employees/${data.assign_by_id}`}
                                            >
                                                {data.assign_by_name}
                                            </a>
                                        </div>
                                    </div>

                                    {/* assign_to */}
                                    <div className={styles.inline_flex}>
                                        <div
                                            className={styles.task_info__label}
                                        >
                                            Assigned To{" "}
                                        </div>
                                        <div className={styles.task_info__text}>
                                            <Avatar
                                                name={data.assign_to_name}
                                                src={
                                                    data.assign_to_avator
                                                        ? `/user-uploads/avatar/${data.assign_to_avator}`
                                                        : null
                                                }
                                                type="circle"
                                                width={32}
                                                height={32}
                                            />
                                            <a
                                                href={`/account/employees/${data.assign_to_id}`}
                                            >
                                                {data.assign_to_name}
                                            </a>
                                        </div>
                                    </div>

                                    {/* client_name */}
                                    <div className={styles.inline_flex}>
                                        <div
                                            className={styles.task_info__label}
                                        >
                                            Client Name{" "}
                                        </div>

                                        {!data?.approval_status && auth ? (
                                            <div
                                                className={`${styles.task_info__text} ${styles.radio_container}`}
                                            >
                                                {clientRadio.map((radio) => {
                                                    return (
                                                        <label
                                                            key={radio.id}
                                                            htmlFor={radio.id}
                                                        >
                                                            <input
                                                                required
                                                                onClick={() =>
                                                                    setRadio(
                                                                        radio.id
                                                                    )
                                                                }
                                                                type="radio"
                                                                name="client_name"
                                                                id={radio.id}
                                                            />
                                                            <span>
                                                                {radio.title}
                                                            </span>
                                                        </label>
                                                    );
                                                })}
                                            </div>
                                        ) : (
                                            <div
                                                className={
                                                    styles.task_info__text
                                                }
                                            >
                                                {(data.existing_client_id ||
                                                    data.new_client) && (
                                                    <>
                                                        <Avatar
                                                            name={
                                                                data.existing_client_id
                                                                    ? data.existing_client_name
                                                                    : data.new_client
                                                            }
                                                            src={
                                                                data.existing_client_avator
                                                                    ? `/user-uploads/avatar/${data.existing_client_avator}`
                                                                    : null
                                                            }
                                                            type="circle"
                                                            width={32}
                                                            height={32}
                                                        />
                                                        <a
                                                            href={
                                                                data.existing_client_id
                                                                    ? `/account/employees/${data.existing_client_id}`
                                                                    : ""
                                                            }
                                                        >
                                                            {data.existing_client_id
                                                                ? data.existing_client_name
                                                                : data.new_client}
                                                        </a>
                                                    </>
                                                )}
                                            </div>
                                        )}
                                    </div>

                                    {/* client_field_according_to_radio */}
                                    <div className={styles.inline_flex}>
                                        <div className={""}> </div>
                                        {!data?.approval_status && auth ? (
                                            <div
                                                className={
                                                    styles.task_info__text
                                                }
                                            >
                                                {radio === "inHouseWork" && (
                                                    <input
                                                        className={`w-100 bg-white py-2 pl-2 pr-1 border d-flex align-items-center justify-content-between mb-3`}
                                                        type="text"
                                                        value={client}
                                                        readOnly
                                                        disabled
                                                    />
                                                )}
                                                {radio === "newClient" && (
                                                    <input
                                                        placeholder="Write client name here..."
                                                        className={`w-100 bg-white py-2 pl-2 pr-1 border d-flex align-items-center  justify-content-between mb-3`}
                                                        type="text"
                                                        value={client}
                                                        onChange={(e) =>
                                                            setClient(
                                                                e.target.value
                                                            )
                                                        }
                                                    />
                                                )}
                                                {radio === "existingClient" && (
                                                    <UserSelectionList
                                                        person={client}
                                                        setPerson={setClient}
                                                        filter={"client"}
                                                    />
                                                )}
                                            </div>
                                        ) : (
                                            ""
                                        )}
                                    </div>

                                    {data?.approval_status && (
                                        <>
                                            <div className={styles.inline_flex}>
                                                <div
                                                    className={
                                                        styles.task_info__label
                                                    }
                                                >
                                                    Authorized By
                                                </div>
                                                <div
                                                    className={
                                                        styles.task_info__text
                                                    }
                                                >
                                                    <Avatar
                                                        name={
                                                            data.authorize_by_name
                                                        }
                                                        src={
                                                            data.authorize_by_avatar
                                                                ? `/user-uploads/avatar/${data.authorize_by_avator}`
                                                                : null
                                                        }
                                                        type="circle"
                                                        width={32}
                                                        height={32}
                                                    />
                                                    <a
                                                        href={`/account/employees/${data.authorize_by_id}`}
                                                    >
                                                        {data.authorize_by_name}
                                                    </a>
                                                </div>
                                            </div>

                                            <div className={styles.inline_flex}>
                                                <div
                                                    className={
                                                        styles.task_info__label
                                                    }
                                                >
                                                    Authorities' Comment
                                                </div>
                                                <div
                                                    className={
                                                        styles.task_info__text
                                                    }
                                                >
                                                    <p>{data.comment}</p>
                                                </div>
                                            </div>
                                        </>
                                    )}

                                    <TaskAuthorizationQuestionAnswers
                                        data={conversationData?.data}
                                        isConversationLoading={
                                            isConversationLoading || isFetching
                                        }
                                        refresh={() => {
                                            setRefresh();
                                            refreshing();
                                            refetch();
                                        }}
                                        // updateConversations={updateConversation}
                                    />

                                    <div className="d-flex my-3 justify-content-center">
                                        {(isConversationLoading ||
                                            isFetching) && (
                                            <Loader title="Loading..." />
                                        )}
                                    </div>

                                    {auth && data?.approval_status === null && (
                                        <React.Fragment>
                                            <div
                                                className={
                                                    styles.section_divider
                                                }
                                            >
                                                <span className="badge badge-secondary">
                                                    {" "}
                                                    Authority{" "}
                                                </span>
                                            </div>

                                            <div className={styles.inline_flex}>
                                                <div
                                                    className={
                                                        styles.task_info__label
                                                    }
                                                >
                                                    Has Question
                                                </div>
                                                <div
                                                    className={
                                                        styles.task_info__text
                                                    }
                                                >
                                                    <label>
                                                        <input
                                                            onChange={(e) =>
                                                                setHasQuestion(
                                                                    true
                                                                )
                                                            }
                                                            value={true}
                                                            type="radio"
                                                            name="has_question"
                                                        />{" "}
                                                        Yes
                                                    </label>
                                                    <label>
                                                        <input
                                                            onChange={(e) =>
                                                                setHasQuestion(
                                                                    false
                                                                )
                                                            }
                                                            value={false}
                                                            type="radio"
                                                            defaultChecked={
                                                                true
                                                            }
                                                            name="has_question"
                                                        />{" "}
                                                        No
                                                    </label>
                                                </div>
                                            </div>

                                            {hasQuestion ? (
                                                <QuestionAnswer
                                                    data={data}
                                                    refresh={() => {
                                                        setRefresh();
                                                        refreshing();
                                                        refetch();
                                                    }}
                                                    // conversations={conversationData?.data}
                                                    // setConversations={updateConversation}
                                                />
                                            ) : (
                                                <>
                                                    <div
                                                        className={
                                                            styles.comment_field
                                                        }
                                                    >
                                                        <label className="task_info__label">
                                                            Comment :{" "}
                                                            <span className="text-danger">
                                                                *
                                                            </span>
                                                        </label>
                                                        <textarea
                                                            // rows={6}
                                                            value={comment}
                                                            style={{
                                                                // resize:'none',
                                                                minHeight:
                                                                    "10rem",
                                                                height: "auto",
                                                                overflowY:
                                                                    "auto",
                                                            }}
                                                            onChange={(e) =>
                                                                setComment(
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                            placeholder="Write your comment here."
                                                        />
                                                    </div>

                                                    <div
                                                        className={
                                                            styles.button_group
                                                        }
                                                    >
                                                        {isLoading ? (
                                                            <Button
                                                                isLoading={
                                                                    isLoading
                                                                }
                                                                variant="primary"
                                                            >
                                                                Loading
                                                            </Button>
                                                        ) : (
                                                            <>
                                                                <Button
                                                                    variant="danger"
                                                                    onClick={(
                                                                        e
                                                                    ) =>
                                                                        handleSubmission(
                                                                            e,
                                                                            false
                                                                        )
                                                                    }
                                                                >
                                                                    Deny
                                                                </Button>
                                                                <Button
                                                                    variant="success"
                                                                    onClick={(
                                                                        e
                                                                    ) =>
                                                                        handleSubmission(
                                                                            e,
                                                                            true
                                                                        )
                                                                    }
                                                                >
                                                                    Approve
                                                                </Button>
                                                            </>
                                                        )}
                                                    </div>
                                                </>
                                            )}
                                        </React.Fragment>
                                    )}

                                    {data?.approval_status !== null && (
                                        <div
                                            className={`alert ${
                                                data?.approval_status === 1
                                                    ? "alert-success"
                                                    : "alert-danger"
                                            } text-center`}
                                        >
                                            Authorized by{" "}
                                            <a
                                                href={`/account/employees/${data.authorize_by_id}`}
                                                className="badge badge-success text-white"
                                            >
                                                {data.authorize_by_name}{" "}
                                            </a>{" "}
                                            on{" "}
                                            <span className="badge badge-success">
                                                {dayjs(data.updated_at).format(
                                                    "MMM DD, YYYY hh:mm A"
                                                )}
                                            </span>{" "}
                                            <span className="badge badge-success">
                                                {dayjs(data.updated_at).format(
                                                    "hh:mm A"
                                                )}
                                            </span>
                                        </div>
                                    )}
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
