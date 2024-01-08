import dayjs from "dayjs";
import _, { forEach } from "lodash";
import React from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Avatar from "../../global/Avatar";
import Button from "../../global/Button";
import Dropdown from "../../global/Dropdown";
import Loader from "../../global/Loader";
import Modal from "../../global/Modal";
import SubmitButton from "../../global/SubmitButton";
import Switch from "../../global/Switch";
import {
    default as DebounceInput,
    default as DebounceTextarea,
} from "../../global/form/DebounceTextarea";
import { useUsers } from "../../hooks/useUsers";
import {
    useAnswerDisputeQuestionMutation,
    useAskDisputeQuestionMutation,
    useDisputeAnswerMakeAsReadMutation,
    useDisputeSubmitToAuthorizationMutation,
} from "../../services/api/SingleTaskPageApi";
import { CompareDate } from "../../utils/dateController";
import { User } from "../../utils/user-details";
import { useDispute } from "../context";
import ResolveBtnPopupText from "./Resolve-Btn/ResolveBtnPopupText";
import "./Resolvebutton.css";
import UserSection from "./UserSection";

const compareDate = new CompareDate();

// reducers
const reducer = (state, action) => {
    const getRandomId = () => {
        return (Math.random() + 1).toString(36).substring(7);
    };

    switch (action.type) {
        case "INIT_QUESTIONS":
            return (state = action.data);

        case "ADD_QUESTION":
            return [
                ...state,
                {
                    question: action.question,
                    answer: "",
                    user: "",
                    id: getRandomId(),
                    isNew: action.isNew,
                },
            ];

        case "UPDATE_QUESTION":
            return _.map(state, (question) =>
                question.id === action.id ? action.data : question
            );

        case "UPDATE_USER":
            return _.map(state, (question) =>
                question.id === action.id
                    ? { ...question, user: action.user }
                    : question
            );

        case "REMOVE_QUESTION":
            return state.filter((question) => question.id !== action.id);

        case "ANSWER_QUESTION":
            return _.map(state, (q) => {
                if (q.id === action.id) {
                    return {
                        ...q,
                        replies: action.answer,
                        replied_by: window?.Laravel?.user?.id,
                    };
                }
                return q;
            });

        case "CLEAR":
            return (state = []);

        default:
            return state;
    }
};

const ResolveModal = ({ state }) => {
    const { users, getUserById, usersIsFetching } = useUsers();
    const [conversations, setConversations] = React.useState([]);
    const [showModalResolveInfo, setShowModalResolveInfo] =
        React.useState(true);
    const {
        showResolveModal,
        rowData: row,
        close: closeModal,
        mode,
        setRowData,
    } = useDispute();

    // form
    const [hasQuestion, setHasQuestion] = React.useState(false);
    const [finishedPartial, setFinishedPartial] = React.useState(false);
    const [winner, setWinner] = React.useState(null);
    const [raisedByPercent, setRaisedByPercent] = React.useState(0);
    const [raisedAgainstPercent, setRaisedAgainstPercent] = React.useState(0);
    const [questions, dispatch] = React.useReducer(reducer, []);
    const [questionFor, setQuestionFor] = React.useState(null);
    const [resolveComment, setResolveComment] = React.useState("");
    const [needAuthorization, setNeedAuthorization] = React.useState(false);
    const [edit, setEdit] = React.useState(true);

    const { updateDisputeConversation, updateDisputeById } = state;

    const auth = new User(window?.Laravel?.user);
    const [disputeAnswerMakeAsRead, { isLoading }] =
        useDisputeAnswerMakeAsReadMutation();

    const rowMemo = JSON.stringify(row);

    // DEFAULT INITIAL
    React.useEffect(() => {
        if (_.includes([1, 8], auth?.getRoleId())) {
            setConversations(row?.conversations);
        } else {
            setConversations(
                _.filter(
                    row?.conversations,
                    (d) => d.question_for === auth?.getId()
                )
            );
        }

        dispatch({
            type: "INIT_QUESTIONS",
            data: _.filter(row?.conversations, (d) =>
                d.replies ? false : true
            ),
        });

        if (row?.need_authrization) {
            setFinishedPartial(true);
            setRaisedAgainstPercent(row?.raised_against_percent);
            setRaisedByPercent(row?.raised_by_percent);
            setNeedAuthorization(row?.need_authrization);
            setEdit(false);
        }
    }, [rowMemo]);

    // handle add question
    const addQuestion = () => {
        setQuestionFor(null);
        dispatch({ type: "ADD_QUESTION", question: "", user: "", isNew: true });
    };

    // add Answer
    const addAnswer = ({ answer, id }) => {
        dispatch({ type: "ANSWER_QUESTION", id, answer });
    };

    // remove question
    const removeQuestion = (id) => {
        dispatch({ type: "REMOVE_QUESTION", id });
    };

    // update question
    const updateQuestion = ({ id, data }) => {
        dispatch({ type: "UPDATE_QUESTION", id, data });
    };

    // clear question
    const clearQuestions = () => {
        dispatch({ type: "CLEAR" });
    };

    // ask question
    const askQuestionTo = (user, question_id) => {
        setQuestionFor(user);
        dispatch({ type: "UPDATE_USER", user, id: question_id });
    };
    // submitQuestion
    const [askDisputeQuestion, { isLoading: questionSubmitting }] =
        useAskDisputeQuestionMutation();

    const handleQuestionSubmittion = async () => {
        const data = {
            questions: _.map(
                _.filter(questions, (q) => q.isNew),
                (q) => ({
                    question: q.question,
                    question_for: q?.user?.id,
                    raised_by: window?.Laravel?.user.id,
                    dispute_id: row?.id,
                })
            ),
            raised_by: window?.Laravel?.user.id,
            dispute_id: row?.id,
        };

        if (!data?.questions) {
            return toast.warn("Please add a question!");
        }

        _.forEach(data?.questions, (q) => {
            if (!q.question) {
                return toast.warn("Please add a question!");
            } else if (!q.question_for) {
                return toast.warn("Please select a person!");
            }
        });

        try {
            const res = await askDisputeQuestion(data).unwrap();
            updateDisputeConversation({
                disputeId: row?.id,
                conversations: res?.data,
            });
            if (_.includes([1, 8], auth?.getRoleId())) {
                setConversations(res?.data);
            } else {
                setConversations(
                    _.filter(res?.data, (d) => d.question_for === auth?.getId())
                );
            }
            dispatch({
                type: "INIT_QUESTIONS",
                data: _.filter(res.data, (d) => (d.replies ? false : true)),
            });
            addQuestion();
            toast.success("Question's successfully added.");
        } catch (err) {
            console.log(err);
        }
    };

    //   handle answer questions
    const [answerDisputeQuestion, { isLoading: answering }] =
        useAnswerDisputeQuestionMutation();

    const handleSubmitAnswer = async () => {
        let err = new Object();
        let ques = _.filter(
            questions,
            (question) => question.question_for === auth?.getId()
        );
        forEach(ques, (question) => {
            if (!question.replies) {
                err.error = true;
                return toast.warn("Please answer all question!");
            }
        });

        if (err?.error) {
            return;
        }

        try {
            const res = await answerDisputeQuestion({
                questions: ques,
            }).unwrap();
            updateDisputeConversation({
                disputeId: row?.id,
                conversations: res?.data,
            });

            if (_.includes([1, 8], auth?.getRoleId())) {
                setConversations(res?.data);
            } else {
                setConversations(
                    _.filter(res?.data, (d) => d.question_for === auth?.getId())
                );
            }
            dispatch({
                type: "INIT_QUESTIONS",
                data: _.filter(res?.data, (d) => (d.replies ? false : true)),
            });
            toast.success("Answer's successfully added.");
        } catch (err) {
            console.log(err);
        }
    };

    //   UPDATE ANSWER READ STATUS
    const answerStatus = async () => {
        const _questions = _.filter(row?.conversations, (q) =>
            q.replies && !q.replied_seen ? 1 : 0
        );

        if (_.size(_questions) > 0) {
            try {
                const res = await disputeAnswerMakeAsRead({
                    questions: [..._questions],
                }).unwrap();

                updateDisputeConversation({
                    disputeId: row?.id,
                    conversations: res?.data,
                });
                setConversations(res?.data);
            } catch (err) {
                console.log(err);
            }
        }
    };

    const close = async () => {
        answerStatus();
        setHasQuestion(false);
        setFinishedPartial(false);
        setWinner(null);
        setNeedAuthorization(false);
        setRaisedByPercent(0);
        setRaisedAgainstPercent(0);
        setResolveComment("")
        closeModal();
    };
    const resolvedBy = new User(getUserById(row?.resolved_by?.id));

    // handle submit for authorization

    const [
        disputeSubmitToAuthorization,
        { isLoading: submittingToAuthorization },
    ] = useDisputeSubmitToAuthorizationMutation();

    const handleSubmitForAuthorization = async () => {
        const data = {
            resolve_comment: row?.need_authrization
                ? row?.resolve_comment
                : resolveComment,
            need_authrization: needAuthorization,
            raised_by_percent: raisedByPercent,
            raised_against_percent: raisedAgainstPercent,
            resolve_by: row?.need_authrization
                ? row?.resolved_by?.id
                : window?.Laravel?.user?.id,
            dispute_id: row?.id,
            authorized: true,
            task_id: row?.task_id,
            authorized_by: row?.need_authrization
                ? window?.Laravel?.user?.id
                : null,
            winner: winner?.id ?? null,
            authorize_comment: row?.need_authrization ? resolveComment : null,
        };

        if (!winner && !finishedPartial) {
            return toast.warn("Please select a person!");
        }

        if (
            finishedPartial &&
            (Number(raisedByPercent) + Number(raisedAgainstPercent) !== 100 ||
                Number(raisedAgainstPercent) === 0 ||
                Number(raisedByPercent) === 0)
        ) {
            return toast.warn(
                "Both parties' percentages must add up to 100% (e.g., 15% & 85%), and each party's percentage must be greater than 1%"
            );
        }

        if (!resolveComment) {
            return toast.warn("Write and comment...");
        }
        // check all question is answered or expand already 24hour
        let error = false;
        _.forEach(conversations, (conv) => {
            const created_date = compareDate.dayjs();
            const hour = compareDate.dayjs().diff(created_date, "hour", true);

            if (!conv.replied_by && hour < 24) {
                return (error = true);
            }
        });

        if (error) {
            return toast.warn(`Some questions are not answered!`);
        }

        if (finishedPartial && needAuthorization && auth?.getRoleId() !== 1) {
            // send for Authorization
            const data = {
                resolve_comment: resolveComment,
                need_authrization: needAuthorization,
                raised_by_percent: raisedByPercent,
                raised_against_percent: raisedAgainstPercent,
                resolve_by: window?.Laravel?.user?.id,
                dispute_id: row?.id,
                task_id: row?.task_id,
                authorized: false,
            };

            try {
                const res = await disputeSubmitToAuthorization(data).unwrap();

                toast.success(`Approval request successfully send!`);
                updateDisputeById({
                    disputeId: row?.id,
                    data: _.head(res),
                });
                setRowData(_.head(res));
                setResolveComment("");
            } catch (err) {
                console.log(err);
            }
        } else {
            //Authorize
            const data = {
                resolve_comment: row?.need_authrization
                    ? row?.resolve_comment
                    : resolveComment,
                need_authrization: needAuthorization,
                raised_by_percent: raisedByPercent,
                raised_against_percent: raisedAgainstPercent,
                resolve_by: row?.need_authrization
                    ? row?.resolved_by?.id
                    : window?.Laravel?.user?.id,
                dispute_id: row?.id,
                authorized: true,
                task_id: row?.task_id,
                authorized_by: row?.need_authrization
                    ? window?.Laravel?.user?.id
                    : null,
                winner: winner?.id ?? null,
                authorize_comment: row?.need_authrization
                    ? resolveComment
                    : null,
            };

            try {
                const res = await disputeSubmitToAuthorization(data).unwrap();

                toast.success(`The dispute has been successfully resolved`);
                updateDisputeById({
                    disputeId: row?.id,
                    data: _.head(res),
                });
                setRowData(_.head(res));
                setResolveComment("");
            } catch (err) {
                console.log(err);
            }
        }
    };

    //   Filter Questions
    const filterQuestion = (questions, userid) =>
        _.filter(questions, (conv) => conv.question_for === userid);

    const task = row?.task?.parent_task ?? row?.task;
    const resolved = row?.status;
    const taskCategory = row?.task?.task_category;
 


    return (
        <React.Fragment>
            <Modal isOpen={showResolveModal}>
                <div className="sp1_modal-content-wrapper">
                    <ResolveBtnPopupText
                        isOpen={showModalResolveInfo}
                        close={() => setShowModalResolveInfo(false)}
                    />
                    <div className="sp1_modal-panel sp1_task_create_modal_panel w-100">
                        {/* header */}
                        <div className="sp1_modal-head">
                            <div className="sp1_modal-title">
                                <strong>Dispute Resolve Form</strong>
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
                        <div
                            className="sp1_modal-body sp1_task_create_modal_body"
                            style={{
                                maxHeight: "calc(100vh - 110px)",
                                overflowY: "auto",
                            }}
                        >
                            <div className="px-3">
                                <div className="alert alert-info">
                                    This dispute is between{" "}
                                    <a
                                        href={`/account/employees/${row?.raised_by?.id}`}
                                        className="badge badge-info"
                                    >
                                        {row?.raised_by?.name}
                                    </a>{" "}
                                    and{" "}
                                    <a
                                        href={`/account/${
                                            row?.dispute_between === "CPR"
                                                ? "clients"
                                                : "employees"
                                        }/${row?.raised_against?.id}`}
                                        className="badge badge-info"
                                    >
                                        {" "}
                                        {row?.raised_against?.name}{" "}
                                    </a>{" "}
                                    and was initiated on{" "}
                                    <span className="badge badge-info">
                                        {dayjs(row?.dispute_created_at).format(
                                            "MMM DD, YYYY"
                                        )}{" "}
                                    </span>{" "}
                                    at{" "}
                                    <span className="badge badge-info">
                                        {dayjs(row?.dispute_created_at).format(
                                            "hh:mm a"
                                        )}
                                    </span>
                                </div>

                                {/* tab */}

                                <div className="sp1-item-center">
                                    <ul className="nav" style={{ gap: "10px" }}>
                                        <li className="nav-item">
                                            <a
                                                href={`/account/projects/${row?.project_id}`}
                                                target="_blank"
                                                className="nav-link badge badge-secondary py-1 px-3"
                                            >
                                                Project Dashboard
                                            </a>
                                        </li>

                                        <li className="nav-item">
                                            <a
                                                href={`/account/projects/${row?.project_id}?tab=deliverables`}
                                                target="_blank"
                                                className="nav-link badge badge-secondary py-1 px-3"
                                            >
                                                Deliverables
                                            </a>
                                        </li>

                                        <li className="nav-item">
                                            <a
                                                href={`/account/tasks/${task?.id}`}
                                                target="_blank"
                                                className="nav-link badge badge-secondary py-1 px-3"
                                            >
                                                Task
                                            </a>
                                        </li>

                                        {row?.task?.parent_task && (
                                            <li className="nav-item">
                                                <a
                                                    href={`/account/tasks/${row?.task?.id}`}
                                                    target="_blank"
                                                    className="nav-link badge badge-secondary py-1 px-3"
                                                >
                                                    Subtasks
                                                </a>
                                            </li>
                                        )}

                                        <li className="nav-item">
                                            <a
                                                href={`/account/projects/${row?.project_id}?tab=tasks`}
                                                target="_blank"
                                                className="nav-link badge badge-secondary py-1 px-3"
                                            >
                                                Task List
                                            </a>
                                        </li>
                                    </ul>
                                </div>

                                <Switch>
                                    <Switch.Case
                                        condition={
                                            row &&
                                            !isLoading &&
                                            row?.raised_against &&
                                            row?.task
                                        }
                                    >
                                        {/* Client */}
                                        <Switch.Case
                                            condition={
                                                row &&
                                                _.includes(
                                                    ["CPR"],
                                                    row?.dispute_between
                                                )
                                            }
                                        >
                                            <UserSection
                                                row={row}
                                                sectionTitle="Client"
                                                user={{
                                                    ...row?.client,
                                                    avatar: row?.client?.image
                                                        ? `/user-uploads/avatar/${row?.client?.image}`
                                                        : null,
                                                }}
                                                comment=""
                                                questions={[
                                                    ...filterQuestion(
                                                        conversations,
                                                        row?.client?.id
                                                    ),
                                                ]}
                                                reason=""
                                                getUserById={getUserById}
                                            />
                                        </Switch.Case>

                                        {/* Sale */}
                                        <Switch.Case
                                            condition={
                                                row &&
                                                _.includes(
                                                    ["SPR"],
                                                    row?.dispute_between
                                                )
                                            }
                                        >
                                            <UserSection
                                                row={row}
                                                sectionTitle="Sale"
                                                user={{
                                                    ...row?.sales_person,
                                                    avatar: row?.sales_person
                                                        ?.image
                                                        ? `/user-uploads/avatar/${row?.sales_person?.image}`
                                                        : null,
                                                }}
                                                comment={row?.pm_comment}
                                                questions={[
                                                    ...filterQuestion(
                                                        conversations,
                                                        row?.sales_person?.id
                                                    ),
                                                ]}
                                                reason={
                                                    row?.dispute_between ===
                                                    "LDR"
                                                        ? row?.revision_acknowledgement
                                                        : row?.deny_reason
                                                }
                                                getUserById={getUserById}
                                            />
                                        </Switch.Case>

                                        {/* Project Manager */}
                                        <Switch.Case
                                            condition={
                                                row &&
                                                _.includes(
                                                    ["SPR", "CPR", "PLR"],
                                                    row?.dispute_between
                                                )
                                            }
                                        >
                                            <UserSection
                                                row={row}
                                                sectionTitle="Project Manager"
                                                user={{
                                                    ...row?.project_manager,
                                                    avatar: row?.project_manager
                                                        ?.image
                                                        ? `/user-uploads/avatar/${row?.project_manager?.image}`
                                                        : null,
                                                }}
                                                comment={row?.pm_comment}
                                                questions={[
                                                    ...filterQuestion(
                                                        conversations,
                                                        row?.project_manager?.id
                                                    ),
                                                ]}
                                                reason={
                                                    row?.revision_acknowledgement
                                                }
                                                getUserById={getUserById}
                                                additionalInformation={{
                                                    amount: row?.additional_amount,
                                                    status: row?.additional_status,
                                                    isDeny: !!row?.additional_deny_comment,
                                                    denyComment: row?.additional_deny_comment,
                                                }}
                                            />
                                        </Switch.Case>

                                        {/* Lead Developer */}
                                        <Switch.Case
                                            condition={
                                                row &&
                                                _.includes(
                                                    ["PLR", "LDR"],
                                                    row?.dispute_between
                                                )
                                            }
                                        >
                                            <UserSection
                                                row={row}
                                                sectionTitle= {_.includes([5, 7], taskCategory) ? "Lead Designer" : "Lead Developer"}
                                                user={{
                                                    ...row?.task
                                                        ?.lead_developer,
                                                    avatar: row?.task
                                                        ?.lead_developer?.image
                                                        ? `/user-uploads/avatar/${row?.task?.lead_developer?.image}`
                                                        : null,
                                                }}
                                                comment={row?.lead_comment}
                                                questions={[
                                                    ...filterQuestion(
                                                        conversations,
                                                        row?.task
                                                            ?.lead_developer?.id
                                                    ),
                                                ]}
                                                reason={
                                                    row?.dispute_between ===
                                                    "LDR"
                                                        ? row?.revision_acknowledgement
                                                        : row?.deny_reason
                                                }
                                                getUserById={getUserById}
                                            />
                                        </Switch.Case>

                                        {/* Developer */}
                                        <Switch.Case
                                            condition={_.includes(
                                                ["LDR"],
                                                row?.dispute_between
                                            )}
                                        >
                                            <UserSection
                                                row={row}
                                                sectionTitle={_.includes([5, 7], taskCategory) ? "Designer" : "Developer"}
                                                user={{
                                                    ...row?.task?.developer,
                                                    avatar: row?.task?.developer
                                                        ?.image
                                                        ? `/user-uploads/avatar/${row?.task?.developer?.image}`
                                                        : null,
                                                }}
                                                comment={row?.dev_comment}
                                                questions={[
                                                    ...filterQuestion(
                                                        conversations,
                                                        row?.task?.developer?.id
                                                    ),
                                                ]}
                                                reason={row?.deny_reason}
                                                getUserById={getUserById}
                                            />
                                        </Switch.Case>
                                    </Switch.Case>
                                </Switch>

                                {/* QUESTION AND ANSWER */}
                                {mode === "QUESTION_AND_ANSWER" ? (
                                    <React.Fragment>
                                        {usersIsFetching ? (
                                            <Loader title="loading..." />
                                        ) : (
                                            <>
                                                <div
                                                    className="d-flex flex-column py-3 px-5 "
                                                    style={{ gap: "16px" }}
                                                >
                                                    {_.size(
                                                        _.filter(
                                                            conversations,
                                                            (c) =>
                                                                c.replies ||
                                                                c.question_for !==
                                                                    auth?.getId()
                                                                    ? false
                                                                    : true
                                                        )
                                                    ) > 0 && (
                                                        <>
                                                            {/* devider */}
                                                            <div className="mt-3 pb-2 py-2 position-relative">
                                                                <hr />
                                                                <span className="badge badge-secondary divider-text">
                                                                    New
                                                                    Questions &
                                                                    Answer
                                                                </span>
                                                            </div>
                                                            {_.map(
                                                                _.filter(
                                                                    conversations,
                                                                    (c) =>
                                                                        c.replies ||
                                                                        c.question_for !==
                                                                            auth?.getId()
                                                                            ? false
                                                                            : true
                                                                ),
                                                                (
                                                                    question,
                                                                    i
                                                                ) => (
                                                                    <div
                                                                        className="form-group"
                                                                        key={i}
                                                                    >
                                                                        <label className="mb-2 d-flex">
                                                                            <span className="d-block mr-2 font-weight-bold text-primary">
                                                                                Q
                                                                                {i +
                                                                                    1}

                                                                                .
                                                                            </span>
                                                                            <span className="d-block">
                                                                                <span className="d-block f-16">
                                                                                    {" "}
                                                                                    <strong>
                                                                                        {
                                                                                            question?.question
                                                                                        }
                                                                                    </strong>{" "}
                                                                                </span>
                                                                                <span
                                                                                    style={{
                                                                                        color: "#999",
                                                                                    }}
                                                                                >
                                                                                    <a
                                                                                        href={`account/employees/${question?.raised_by}`}
                                                                                        className="f-14"
                                                                                        style={{
                                                                                            color: "#999",
                                                                                        }}
                                                                                    >
                                                                                        {" "}
                                                                                        -{" "}
                                                                                        {
                                                                                            getUserById(
                                                                                                question?.raised_by
                                                                                            )
                                                                                                ?.name
                                                                                        }
                                                                                    </a>{" "}
                                                                                    -{" "}
                                                                                    {dayjs(
                                                                                        question?.created_at
                                                                                    ).format(
                                                                                        "MMM DD, YYYY"
                                                                                    )}
                                                                                </span>
                                                                            </span>
                                                                        </label>
                                                                        <div className="w-auto px-4 mx-1">
                                                                            <DebounceInput
                                                                                className="form-control py-2 px-3 w-100"
                                                                                placeholder="Explaine here..."
                                                                                rows={
                                                                                    3
                                                                                }
                                                                                onChange={(
                                                                                    v
                                                                                ) =>
                                                                                    addAnswer(
                                                                                        {
                                                                                            answer: v,
                                                                                            id: question.id,
                                                                                        }
                                                                                    )
                                                                                }
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                )
                                                            )}

                                                            <div className="d-flex align-items-center">
                                                                <Button
                                                                    onClick={
                                                                        close
                                                                    }
                                                                    className="mr-3 ml-auto"
                                                                >
                                                                    {" "}
                                                                    Close{" "}
                                                                </Button>
                                                                <SubmitButton
                                                                    onClick={
                                                                        handleSubmitAnswer
                                                                    }
                                                                    variant="success"
                                                                    title="Submit"
                                                                    className=""
                                                                    isLoading={
                                                                        answering
                                                                    }
                                                                />
                                                            </div>
                                                        </>
                                                    )}
                                                </div>
                                            </>
                                        )}
                                    </React.Fragment>
                                ) : null}
                                {/* END QUESTION AND ANSWER */}

                                {/* RESOLVER */}
                                {/* devider */}
                                {row?.status ||
                                _.includes([1, 8], auth.getRoleId()) ? (
                                    <div className="mt-3 pb-2 py-2 position-relative">
                                        <hr />
                                        <span className="badge badge-secondary divider-text">
                                            Resolve
                                        </span>
                                    </div>
                                ) : null}

                                {(!row?.status && row?.need_authrization) ||
                                row?.status ? (
                                    <table className="dispute-preview-table">
                                        <tbody>
                                            {row?.winner ? (
                                                <>
                                                    <tr>
                                                        <td className="py-2">
                                                            Winner
                                                        </td>
                                                        <td className="px-3 py-2 vertical-center w-100">
                                                            <Person user={row?.winner} />
                                                        </td>
                                                    </tr>


                                                    <tr>
                                                        <td className="py-2"> Loser </td>
                                                        <td className="px-3 py-2 vertical-center w-100">
                                                            <Person user={row?.winner.id === row?.raised_by.id ? row?.raised_against : row?.raised_by} />
                                                        </td>
                                                    </tr>
                                                </>
                                            ) : (
                                                <tr>
                                                    <td className="py-2">
                                                        Partially Responsible
                                                    </td>
                                                    <td className="px-3 py-2 vertical-center w-100">
                                                        <div className="d-flex align-items-center">
                                                            {`${row?.raised_by?.name } - ${row?.raised_by_percent}%`}
                                                        </div>
                                                        <div className="d-flex align-items-center">
                                                            {`${row?.raised_against?.name } - ${row?.raised_against_percent}%`}
                                                        </div>
                                                    </td>
                                                </tr>
                                            )}

                                            <tr>
                                                <td className="py-2">
                                                    Reviewed by
                                                </td>
                                                <td className="px-3 py-2 vertical-center w-100">
                                                    <Person user={row?.resolved_by} />
                                                </td>
                                            </tr>

                                            <tr>
                                                <td className="py-2">
                                                    Comment:
                                                </td>
                                                <td className="px-3 py-2 vertical-center w-100">
                                                    {row?.resolve_comment}
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                ) : null}

                                {mode === "RESOLVE" && !row?.status ? (
                                    <React.Fragment>
                                        {!row?.need_authrization ? (
                                            <table className="dispute-preview-table">
                                                <tbody>
                                                    <tr>
                                                        <td className="py-2">
                                                            Do you have any
                                                            other questions?
                                                        </td>
                                                        <td className="px-3 py-2 vertical-center w-100">
                                                            <div className="d-flex align-items-center">
                                                                <div className="form-check form-check-inline">
                                                                    <input
                                                                        type="radio"
                                                                        name="authrize_question"
                                                                        className="form-check-input"
                                                                        value="yes"
                                                                        onChange={() => {
                                                                            addQuestion();
                                                                            setHasQuestion(
                                                                                true
                                                                            );
                                                                        }}
                                                                    />
                                                                    <label className="form-check-label">
                                                                        Yes
                                                                    </label>
                                                                </div>

                                                                <div className="form-check form-check-inline">
                                                                    <input
                                                                        type="radio"
                                                                        name="authrize_question"
                                                                        className="form-check-input"
                                                                        value="no"
                                                                        defaultChecked={
                                                                            true
                                                                        }
                                                                        onChange={() => {
                                                                            setHasQuestion(
                                                                                false
                                                                            );
                                                                            clearQuestions();
                                                                        }}
                                                                    />
                                                                    <label className="form-check-label">
                                                                        No
                                                                    </label>
                                                                </div>
                                                            </div>

                                                            {/* add question */}

                                                            {hasQuestion && (
                                                                <div>
                                                                    {_.map(
                                                                        _.filter(
                                                                            questions,
                                                                            (
                                                                                q
                                                                            ) =>
                                                                                q.isNew
                                                                        ),
                                                                        (
                                                                            question,
                                                                            index
                                                                        ) => (
                                                                            <div
                                                                                key={
                                                                                    question.id
                                                                                }
                                                                                className="mt-3 w-100"
                                                                            >
                                                                                <div
                                                                                    className="d-flex align-items-center"
                                                                                    style={{
                                                                                        gap: "10px",
                                                                                    }}
                                                                                >
                                                                                    <Dropdown>
                                                                                        <Dropdown.Toggle className="font-weight-bold py-2 px-3 border rounded-sm toggle-light">
                                                                                            {question
                                                                                                ?.user
                                                                                                ?.name ||
                                                                                                "Click to select user"}
                                                                                        </Dropdown.Toggle>
                                                                                        <Dropdown.Menu>
                                                                                            <Dropdown.Item
                                                                                                onClick={() =>
                                                                                                    askQuestionTo(
                                                                                                        row?.raised_by,
                                                                                                        question.id
                                                                                                    )
                                                                                                }
                                                                                            >
                                                                                                {
                                                                                                    row
                                                                                                        ?.raised_by
                                                                                                        ?.name
                                                                                                }
                                                                                                {question
                                                                                                    ?.user
                                                                                                    ?.id ===
                                                                                                row
                                                                                                    ?.raised_by
                                                                                                    ?.id ? (
                                                                                                    <i className="fa-solid fa-check ml-2" />
                                                                                                ) : null}
                                                                                            </Dropdown.Item>
                                                                                            {row?.dispute_between !==
                                                                                            "CPR" ? (
                                                                                                <Dropdown.Item
                                                                                                    onClick={() =>
                                                                                                        askQuestionTo(
                                                                                                            row?.raised_against,
                                                                                                            question.id
                                                                                                        )
                                                                                                    }
                                                                                                >
                                                                                                    {
                                                                                                        row
                                                                                                            ?.raised_against
                                                                                                            ?.name
                                                                                                    }

                                                                                                    {question
                                                                                                        ?.user
                                                                                                        ?.id ===
                                                                                                    row
                                                                                                        ?.raised_against
                                                                                                        .id ? (
                                                                                                        <i className="fa-solid fa-check ml-2" />
                                                                                                    ) : null}
                                                                                                </Dropdown.Item>
                                                                                            ) : null}
                                                                                        </Dropdown.Menu>
                                                                                    </Dropdown>
                                                                                </div>

                                                                                <div className="form-group w-100 py-2">
                                                                                    <label
                                                                                        htmlFor=""
                                                                                        className="d-flex align-items-center justify-content-between"
                                                                                    >
                                                                                        <span>
                                                                                            Q
                                                                                            {index +
                                                                                                1}

                                                                                            :
                                                                                            Write
                                                                                            your
                                                                                            question
                                                                                            here{" "}
                                                                                        </span>
                                                                                        {_.size(
                                                                                            questions
                                                                                        ) >
                                                                                            1 && (
                                                                                            <button
                                                                                                aria-label="removeQuestion"
                                                                                                onClick={() =>
                                                                                                    removeQuestion(
                                                                                                        question.id
                                                                                                    )
                                                                                                }
                                                                                                className="remove-question-btn"
                                                                                            >
                                                                                                <i className="fa-solid fa-trash" />
                                                                                            </button>
                                                                                        )}
                                                                                    </label>
                                                                                    <DebounceTextarea
                                                                                        defaultValue={
                                                                                            question.question
                                                                                        }
                                                                                        className="form-control py-2 px-3 w-100"
                                                                                        placeholder="Write your question"
                                                                                        onChange={(
                                                                                            v
                                                                                        ) => {
                                                                                            updateQuestion(
                                                                                                {
                                                                                                    id: question.id,
                                                                                                    user: questionFor,
                                                                                                    data: {
                                                                                                        ...question,
                                                                                                        question:
                                                                                                            v,
                                                                                                    },
                                                                                                }
                                                                                            );
                                                                                        }}
                                                                                    />
                                                                                </div>
                                                                            </div>
                                                                        )
                                                                    )}
                                                                </div>
                                                            )}

                                                            {hasQuestion && (
                                                                <button
                                                                    onClick={
                                                                        addQuestion
                                                                    }
                                                                    className="bg-transparent"
                                                                >
                                                                    + New
                                                                    Question
                                                                </button>
                                                            )}

                                                            {/* end question adding */}
                                                        </td>
                                                    </tr>

                                                    {!hasQuestion ? (
                                                        <React.Fragment>
                                                            <tr>
                                                                <td className="py-2">
                                                                    <span className="pt-2 d-block">
                                                                        The
                                                                        Winner:{" "}
                                                                    </span>
                                                                </td>
                                                                <td className="px-3 py-2 w-100">
                                                                    <Dropdown>
                                                                        <Dropdown.Toggle className="py-2 px-3 border rounded-sm toggle-light">
                                                                            {finishedPartial
                                                                                ? "Partially Responsible"
                                                                                : winner?.name ??
                                                                                  "--"}
                                                                        </Dropdown.Toggle>
                                                                        <Dropdown.Menu>
                                                                            <Dropdown.Item
                                                                                onClick={() => {
                                                                                    setWinner(
                                                                                        row?.raised_by
                                                                                    );
                                                                                    setFinishedPartial(
                                                                                        false
                                                                                    );
                                                                                }}
                                                                            >
                                                                                {
                                                                                    row
                                                                                        ?.raised_by
                                                                                        ?.name
                                                                                }
                                                                                {winner?.id ===
                                                                                    row
                                                                                        ?.raised_by
                                                                                        ?.id && (
                                                                                    <i className="fa-solid fa-check ml-2" />
                                                                                )}
                                                                            </Dropdown.Item>
                                                                            <Dropdown.Item
                                                                                onClick={() => {
                                                                                    setWinner(
                                                                                        row?.raised_against
                                                                                    );
                                                                                    setFinishedPartial(
                                                                                        false
                                                                                    );
                                                                                }}
                                                                            >
                                                                                {
                                                                                    row
                                                                                        ?.raised_against
                                                                                        ?.name
                                                                                }
                                                                                {winner?.id ===
                                                                                    row
                                                                                        ?.raised_against
                                                                                        ?.id && (
                                                                                    <i className="fa-solid fa-check ml-2" />
                                                                                )}
                                                                            </Dropdown.Item>

                                                                            <Dropdown.Item
                                                                                onClick={() => {
                                                                                    setFinishedPartial(
                                                                                        true
                                                                                    );
                                                                                    setNeedAuthorization(
                                                                                        true
                                                                                    );
                                                                                    setWinner(
                                                                                        false
                                                                                    );
                                                                                }}
                                                                            >
                                                                                Partially
                                                                                Responsible
                                                                                {finishedPartial && (
                                                                                    <i className="fa-solid fa-check ml-2" />
                                                                                )}
                                                                            </Dropdown.Item>
                                                                        </Dropdown.Menu>
                                                                    </Dropdown>

                                                                    {finishedPartial && (
                                                                        <div
                                                                            className="d-flex align-items-center flex-wrap mt-3"
                                                                            style={{
                                                                                gap: "10px",
                                                                            }}
                                                                        >
                                                                            <div className="input-group mb-2">
                                                                                <div className="input-group-prepend">
                                                                                    <span className="input-group-text f-14 singleline-ellipsis">
                                                                                        {
                                                                                            row
                                                                                                ?.raised_by
                                                                                                ?.name
                                                                                        }
                                                                                    </span>
                                                                                </div>
                                                                                <input
                                                                                    type="number"
                                                                                    className="form-control"
                                                                                    placeholder="50"
                                                                                    min={0}
                                                                                    max={100}
                                                                                    value={raisedByPercent}
                                                                                    style={{
                                                                                        minWidth: "80px",
                                                                                    }}
                                                                                    onChange={(e) =>{
                                                                                        if (e.target.value.includes('.')) {
                                                                                            toast.error('Decimal points are not allowed in this field. Please enter a whole number.');
                                                                                        } else {
                                                                                            setRaisedByPercent(e.target.value);
                                                                                        }
                                                                                    }}
                                                                                    onWheel={(e) =>
                                                                                        e.currentTarget.blur()
                                                                                    }
                                                                                />
                                                                                <div className="input-group-append">
                                                                                    <span className="input-group-text">
                                                                                        %
                                                                                    </span>
                                                                                </div>
                                                                            </div>

                                                                            <div className="input-group flex-nowrap mb-2">
                                                                                <div className="input-group-prepend">
                                                                                    <div className="d-block input-group-text f-14 singleline-ellipsis">
                                                                                        {
                                                                                            row
                                                                                                ?.raised_against
                                                                                                ?.name
                                                                                        }
                                                                                    </div>
                                                                                </div>
                                                                                <input
                                                                                    type="number"
                                                                                    className="form-control"
                                                                                    placeholder="50"
                                                                                    min={
                                                                                        0
                                                                                    }
                                                                                    max={
                                                                                        100
                                                                                    }
                                                                                    value={
                                                                                        raisedAgainstPercent
                                                                                    }
                                                                                    style={{
                                                                                        minWidth:
                                                                                            "80px",
                                                                                    }}
                                                                                    onChange={(
                                                                                        e
                                                                                    ) =>{
                                                                                        if(e.target.value.includes('.')){
                                                                                            toast.error('Decimal points are not allowed in this field. Please enter a whole number.')
                                                                                        }else{
                                                                                            setRaisedAgainstPercent(e.target.value)
                                                                                        }
                                                                                    }}
                                                                                    onWheel={(
                                                                                        e
                                                                                    ) =>
                                                                                        e.currentTarget.blur()
                                                                                    }
                                                                                />
                                                                                <div className="input-group-append">
                                                                                    <span className="input-group-text">
                                                                                        %
                                                                                    </span>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    )}
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td className="py-2">
                                                                    <span className="pt-2 d-block">
                                                                        Reason:{" "}
                                                                    </span>
                                                                </td>
                                                                <td className="px-3 py-2 w-100">
                                                                    <textarea
                                                                        rows={4}
                                                                        className="form-control p-2 f-14"
                                                                        value={
                                                                            resolveComment
                                                                        }
                                                                        onChange={(
                                                                            e
                                                                        ) =>
                                                                            setResolveComment(
                                                                                e
                                                                                    .target
                                                                                    .value
                                                                            )
                                                                        }
                                                                        placeholder={`${
                                                                            finishedPartial
                                                                                ? "Explain why you select partial!"
                                                                                : winner?.name
                                                                                ? `Describe why are choosing ${winner?.name}`
                                                                                : "Write a comment here..."
                                                                        }`}
                                                                    />
                                                                </td>
                                                            </tr>
                                                        </React.Fragment>
                                                    ) : null}
                                                </tbody>
                                            </table>
                                        ) : null}
                                    </React.Fragment>
                                ) : null}
                                {/* END RESOLVER */}

                                {/* AUTHORITIES */}

                                {row?.status && row?.need_authrization ? (
                                    <React.Fragment>
                                        {/* divider */}
                                        <div className="mt-3 pb-2 py-2 position-relative">
                                            <hr />
                                            <span className="badge badge-secondary divider-text">
                                                Authorities
                                            </span>
                                        </div>

                                        <table className="dispute-preview-table">
                                            <tbody>

                                                {row?.winner ? (
                                                    <>
                                                        <tr>
                                                            <td className="py-2">
                                                                Winner
                                                            </td>
                                                            <td className="px-3 py-2 vertical-center w-100">
                                                                <Person user={row?.winner} />
                                                            </td>
                                                        </tr>


                                                        <tr>
                                                            <td className="py-2"> Loser </td>
                                                            <td className="px-3 py-2 vertical-center w-100">
                                                                <Person user={row?.winner.id === row?.raised_by.id ? row?.raised_against : row?.raised_by} />
                                                            </td>
                                                        </tr>
                                                    </>
                                                ) : (
                                                    <tr>
                                                        <td className="py-2">
                                                            Partially
                                                            Responsible
                                                        </td>
                                                        <td className="px-3 py-2 vertical-center w-100">
                                                            <div className="d-flex align-items-center">
                                                                {`${row.raised_by?.name} - ${row?.raised_by_percent}%`}
                                                            </div>
                                                            <div className="d-flex align-items-center">
                                                                {`${row.raised_against?.name} - ${row?.raised_against_percent}%`}
                                                            </div>
                                                        </td>
                                                    </tr>
                                                )}

                                                <tr>
                                                    <td className="py-2">
                                                        Review by
                                                    </td>
                                                    <td className="px-3 py-2 vertical-center w-100">
                                                        <Person user={row?.authorized_by} />
                                                    </td>
                                                </tr>

                                                <tr>
                                                    <td className="py-2">
                                                        Comment:
                                                    </td>
                                                    <td className="px-3 py-2 vertical-center w-100">
                                                        {row?.resolve_comment}
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </React.Fragment>
                                ) : null}

                                {!row?.status && mode === "ATHORIZATION" ? (
                                    <React.Fragment>
                                        {row?.need_authrization ? (
                                            <React.Fragment>
                                                {/* devider */}
                                                <div className="mt-3 pb-2 py-2 position-relative">
                                                    <hr />
                                                    <span className="badge badge-secondary divider-text">
                                                        Authorities
                                                    </span>
                                                </div>

                                                <table className="dispute-preview-table">
                                                    <tbody>
                                                        <tr>
                                                            <td className="py-2">
                                                                Do you have any
                                                                other questions?
                                                            </td>
                                                            <td className="px-3 py-2 vertical-center w-100">
                                                                <div className="d-flex align-items-center">
                                                                    <div className="form-check form-check-inline">
                                                                        <input
                                                                            type="radio"
                                                                            name="authrize_question"
                                                                            className="form-check-input"
                                                                            value="yes"
                                                                            onChange={() => {
                                                                                addQuestion();
                                                                                setHasQuestion(
                                                                                    true
                                                                                );
                                                                            }}
                                                                        />
                                                                        <label className="form-check-label">
                                                                            {" "}
                                                                            Yes{" "}
                                                                        </label>
                                                                    </div>

                                                                    <div className="form-check form-check-inline">
                                                                        <input
                                                                            type="radio"
                                                                            name="authrize_question"
                                                                            className="form-check-input"
                                                                            value="no"
                                                                            defaultChecked={
                                                                                true
                                                                            }
                                                                            onChange={() => {
                                                                                setHasQuestion(
                                                                                    false
                                                                                );
                                                                                clearQuestions();
                                                                            }}
                                                                        />
                                                                        <label className="form-check-label">
                                                                            {" "}
                                                                            No{" "}
                                                                        </label>
                                                                    </div>
                                                                </div>

                                                                {/* add question */}

                                                                {hasQuestion && (
                                                                    <div>
                                                                        {_.map(
                                                                            _.filter(
                                                                                questions,
                                                                                (
                                                                                    q
                                                                                ) =>
                                                                                    q.isNew
                                                                            ),
                                                                            (
                                                                                question,
                                                                                index
                                                                            ) => (
                                                                                <div
                                                                                    key={
                                                                                        question.id
                                                                                    }
                                                                                    className="mt-3 w-100"
                                                                                >
                                                                                    <div
                                                                                        className="d-flex align-items-center"
                                                                                        style={{
                                                                                            gap: "10px",
                                                                                        }}
                                                                                    >
                                                                                        <Dropdown>
                                                                                            <Dropdown.Toggle className="font-weight-bold py-2 px-3 border rounded-sm toggle-light">
                                                                                                {question
                                                                                                    ?.user
                                                                                                    ?.name ||
                                                                                                    "Click to select user"}
                                                                                            </Dropdown.Toggle>
                                                                                            <Dropdown.Menu>
                                                                                                <Dropdown.Item
                                                                                                    onClick={() =>
                                                                                                        askQuestionTo(
                                                                                                            row?.raised_by,
                                                                                                            question.id
                                                                                                        )
                                                                                                    }
                                                                                                >
                                                                                                    {
                                                                                                        row
                                                                                                            ?.raised_by
                                                                                                            ?.name
                                                                                                    }
                                                                                                    {question
                                                                                                        ?.user
                                                                                                        ?.id ===
                                                                                                    row
                                                                                                        ?.raised_by
                                                                                                        ?.id ? (
                                                                                                        <i className="fa-solid fa-check ml-2" />
                                                                                                    ) : null}
                                                                                                </Dropdown.Item>
                                                                                                {row?.dispute_between !==
                                                                                                "CPR" ? (
                                                                                                    <Dropdown.Item
                                                                                                        onClick={() =>
                                                                                                            askQuestionTo(
                                                                                                                row?.raised_against,
                                                                                                                question.id
                                                                                                            )
                                                                                                        }
                                                                                                    >
                                                                                                        {
                                                                                                            row
                                                                                                                ?.raised_against
                                                                                                                ?.name
                                                                                                        }

                                                                                                        {question
                                                                                                            ?.user
                                                                                                            ?.id ===
                                                                                                        row
                                                                                                            ?.raised_against
                                                                                                            .id ? (
                                                                                                            <i className="fa-solid fa-check ml-2" />
                                                                                                        ) : null}
                                                                                                    </Dropdown.Item>
                                                                                                ) : null}
                                                                                            </Dropdown.Menu>
                                                                                        </Dropdown>
                                                                                    </div>

                                                                                    <div className="form-group w-100 py-2">
                                                                                        <label
                                                                                            htmlFor=""
                                                                                            className="d-flex align-items-center justify-content-between"
                                                                                        >
                                                                                            <span>
                                                                                                Q
                                                                                                {index +
                                                                                                    1}

                                                                                                :
                                                                                                Write
                                                                                                your
                                                                                                question
                                                                                                here{" "}
                                                                                            </span>
                                                                                            {_.size(
                                                                                                questions
                                                                                            ) >
                                                                                                1 && (
                                                                                                <button
                                                                                                    aria-label="removeQuestion"
                                                                                                    onClick={() =>
                                                                                                        removeQuestion(
                                                                                                            question.id
                                                                                                        )
                                                                                                    }
                                                                                                    className="remove-question-btn"
                                                                                                >
                                                                                                    <i className="fa-solid fa-trash" />
                                                                                                </button>
                                                                                            )}
                                                                                        </label>
                                                                                        <DebounceTextarea
                                                                                            defaultValue={
                                                                                                question.question
                                                                                            }
                                                                                            className="form-control py-2 px-3 w-100"
                                                                                            placeholder="Write your question"
                                                                                            onChange={(
                                                                                                v
                                                                                            ) => {
                                                                                                updateQuestion(
                                                                                                    {
                                                                                                        id: question.id,
                                                                                                        user: questionFor,
                                                                                                        data: {
                                                                                                            ...question,
                                                                                                            question:
                                                                                                                v,
                                                                                                        },
                                                                                                    }
                                                                                                );
                                                                                            }}
                                                                                        />
                                                                                    </div>
                                                                                </div>
                                                                            )
                                                                        )}
                                                                    </div>
                                                                )}

                                                                {hasQuestion && (
                                                                    <button
                                                                        onClick={
                                                                            addQuestion
                                                                        }
                                                                        className="bg-transparent"
                                                                    >
                                                                        + New
                                                                        Question
                                                                    </button>
                                                                )}

                                                                {/* end question adding */}
                                                            </td>
                                                        </tr>

                                                        {!hasQuestion ? (
                                                            <React.Fragment>
                                                                <tr>
                                                                    <td className="py-2">
                                                                        <span className="pt-2 d-block">
                                                                            The
                                                                            Winner:{" "}
                                                                        </span>
                                                                    </td>
                                                                    <td className="px-3 py-2 w-100">
                                                                        <Dropdown>
                                                                            <Dropdown.Toggle className="py-2 px-3 border rounded-sm toggle-light">
                                                                                {finishedPartial
                                                                                    ? "Partially Responsible"
                                                                                    : winner?.name ??
                                                                                      "--"}
                                                                            </Dropdown.Toggle>
                                                                            <Dropdown.Menu>
                                                                                <Dropdown.Item
                                                                                    onClick={() => {
                                                                                        setWinner(
                                                                                            row?.raised_by
                                                                                        );
                                                                                        setFinishedPartial(
                                                                                            false
                                                                                        );
                                                                                    }}
                                                                                >
                                                                                    {
                                                                                        row
                                                                                            ?.raised_by
                                                                                            ?.name
                                                                                    }
                                                                                    {winner?.id ===
                                                                                        row
                                                                                            ?.raised_by
                                                                                            ?.id && (
                                                                                        <i className="fa-solid fa-check ml-2" />
                                                                                    )}
                                                                                </Dropdown.Item>
                                                                                <Dropdown.Item
                                                                                    onClick={() => {
                                                                                        setWinner(
                                                                                            row?.raised_against
                                                                                        );
                                                                                        setFinishedPartial(
                                                                                            false
                                                                                        );
                                                                                    }}
                                                                                >
                                                                                    {
                                                                                        row
                                                                                            ?.raised_against
                                                                                            ?.name
                                                                                    }
                                                                                    {winner?.id ===
                                                                                        row
                                                                                            ?.raised_against
                                                                                            ?.id && (
                                                                                        <i className="fa-solid fa-check ml-2" />
                                                                                    )}
                                                                                </Dropdown.Item>

                                                                                <Dropdown.Item
                                                                                    onClick={() => {
                                                                                        setFinishedPartial(
                                                                                            true
                                                                                        );
                                                                                        setNeedAuthorization(
                                                                                            true
                                                                                        );
                                                                                        setWinner(
                                                                                            false
                                                                                        );
                                                                                    }}
                                                                                >
                                                                                    Partially
                                                                                    Responsible
                                                                                    {finishedPartial && (
                                                                                        <i className="fa-solid fa-check ml-2" />
                                                                                    )}
                                                                                </Dropdown.Item>
                                                                            </Dropdown.Menu>
                                                                        </Dropdown>

                                                                        {finishedPartial && (
                                                                            <div
                                                                                className="d-flex align-items-center flex-wrap mt-3"
                                                                                style={{
                                                                                    gap: "10px",
                                                                                }}
                                                                            >
                                                                                <div className="input-group mb-2">
                                                                                    <div className="input-group-prepend">
                                                                                        <span className="input-group-text f-14 singleline-ellipsis">
                                                                                            {
                                                                                                row
                                                                                                    ?.raised_by
                                                                                                    ?.name
                                                                                            }
                                                                                        </span>
                                                                                    </div>
                                                                                    <input
                                                                                        type="number"
                                                                                        className="form-control"
                                                                                        placeholder="50"
                                                                                        min={
                                                                                            0
                                                                                        }
                                                                                        max={
                                                                                            100
                                                                                        }
                                                                                        value={
                                                                                            raisedByPercent
                                                                                        }
                                                                                        style={{
                                                                                            minWidth:
                                                                                                "80px",
                                                                                        }}
                                                                                        onChange={(
                                                                                            e
                                                                                        ) =>{
                                                                                            if (/^\d*$/.test(e.target.value)) {
                                                                                                setRaisedByPercent(e.target.value)
                                                                                            }
                                                                                        }
                                                                                        }
                                                                                        onWheel={(
                                                                                            e
                                                                                        ) =>
                                                                                            e.currentTarget.blur()
                                                                                        }
                                                                                    />
                                                                                    <div className="input-group-append">
                                                                                        <span className="input-group-text">
                                                                                            %
                                                                                        </span>
                                                                                    </div>
                                                                                </div>

                                                                                <div className="input-group flex-nowrap mb-2">
                                                                                    <div className="input-group-prepend">
                                                                                        <div className="d-block input-group-text f-14 singleline-ellipsis">
                                                                                            {
                                                                                                row
                                                                                                    ?.raised_against
                                                                                                    ?.name
                                                                                            }
                                                                                        </div>
                                                                                    </div>
                                                                                    <input
                                                                                        type="number"
                                                                                        className="form-control"
                                                                                        placeholder="50"
                                                                                        min={
                                                                                            0
                                                                                        }
                                                                                        max={
                                                                                            100
                                                                                        }
                                                                                        value={
                                                                                            raisedAgainstPercent
                                                                                        }
                                                                                        style={{
                                                                                            minWidth:
                                                                                                "80px",
                                                                                        }}
                                                                                        onChange={(
                                                                                            e
                                                                                        ) =>{
                                                                                            if (/^\d*$/.test(e.target.value)) {
                                                                                                setRaisedAgainstPercent(e.target.value)
                                                                                            }
                                                                                        }
                                                                                        }
                                                                                        onWheel={(
                                                                                            e
                                                                                        ) =>
                                                                                            e.currentTarget.blur()
                                                                                        }
                                                                                    />
                                                                                    <div className="input-group-append">
                                                                                        <span className="input-group-text">
                                                                                            %
                                                                                        </span>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        )}
                                                                    </td>
                                                                </tr>
                                                            </React.Fragment>
                                                        ) : null}

                                                        {!hasQuestion ? (
                                                            <tr>
                                                                <td className="py-2">
                                                                    <span className="pt-2 d-block">
                                                                        Reason:{" "}
                                                                    </span>
                                                                </td>
                                                                <td className="px-3 py-2 w-100">
                                                                    <textarea
                                                                        rows={4}
                                                                        className="form-control p-2 f-14"
                                                                        value={
                                                                            resolveComment
                                                                        }
                                                                        onChange={(
                                                                            e
                                                                        ) =>
                                                                            setResolveComment(
                                                                                e
                                                                                    .target
                                                                                    .value
                                                                            )
                                                                        }
                                                                        placeholder="Explain why you select partial!"
                                                                    />
                                                                </td>
                                                            </tr>
                                                        ) : null}
                                                    </tbody>
                                                </table>
                                            </React.Fragment>
                                        ) : null}
                                    </React.Fragment>
                                ) : null}
                                {/* END AUTHORITIES */}

                                {/* status */}
                                {!row?.status &&
                                row?.need_authrization &&
                                auth.getRoleId() !== 1 ? (
                                    <div className="alert alert-success text-center">
                                        <React.Fragment>
                                            Awaiting Authorization
                                        </React.Fragment>
                                    </div>
                                ) : row?.status && row?.need_authrization ? (
                                    <div className="alert alert-success">
                                        <React.Fragment>
                                            This dispute was authorized &
                                            resolved by{" "}
                                            <a
                                                href={`/account/employees/${row?.authorized_by?.id}`}
                                                className="badge badge-success"
                                                style={{
                                                    color: "#fff !important",
                                                }}
                                            >
                                                {row?.authorized_by?.name}
                                            </a>{" "}
                                            on{" "}
                                            <span className="badge badge-success">
                                                {dayjs(
                                                    row?.authorize_on
                                                ).format("MMM DD, YYYY")}
                                            </span>{" "}
                                            at{" "}
                                            <span className="badge badge-success">
                                                {dayjs(
                                                    row?.authorize_on
                                                ).format("hh:mm A")}
                                            </span>{" "}
                                            ( Previously reviewed by{" "}
                                            <a
                                                href={`/account/employees/${row?.resolved_by?.id}`}
                                                className="badge badge-info"
                                            >
                                                {row?.resolved_by?.name}
                                            </a>{" "}
                                            on{" "}
                                            <span className="badge badge-info">
                                                {dayjs(row?.resolved_on).format(
                                                    "MMM DD, YYYY"
                                                )}
                                            </span>{" "}
                                            at{" "}
                                            <span className="badge badge-info">
                                                {dayjs(row?.resolved_on).format(
                                                    "hh:mm A"
                                                )}
                                            </span>{" "}
                                            )
                                        </React.Fragment>
                                    </div>
                                ) : row?.status && !row?.need_authrization ? (
                                    <div className="alert alert-success">
                                        <React.Fragment>
                                            This dispute was authorized &
                                            resolved by{" "}
                                            <a
                                                href={`/account/employees/${row?.resolved_by?.id}`}
                                                className="badge badge-success"
                                                style={{
                                                    color: "#fff !important",
                                                }}
                                            >
                                                {row?.resolved_by?.name}
                                            </a>{" "}
                                            on{" "}
                                            <span className="badge badge-success">
                                                {dayjs(row?.resolved_on).format(
                                                    "MMM DD, YYYY"
                                                )}
                                            </span>{" "}
                                            at{" "}
                                            <span className="badge badge-success">
                                                {dayjs(row?.resolved_on).format(
                                                    "hh:mm A"
                                                )}
                                            </span>
                                        </React.Fragment>
                                    </div>
                                ) : null}

                                {/* submition button */}

                                {!row?.status ? (
                                    <RanderButton
                                        row={row}
                                        auth={auth}
                                        close={close}
                                        hasQuestion={hasQuestion}
                                        finishedPartial={finishedPartial}
                                        handleQuestionSubmittion={
                                            handleQuestionSubmittion
                                        }
                                        isLoading={
                                            questionSubmitting ||
                                            submittingToAuthorization
                                        }
                                        handleSubmitForAuthorization={
                                            handleSubmitForAuthorization
                                        }
                                    />
                                ) : null}
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
        </React.Fragment>
    );
};

export default ResolveModal;

const RanderButton = ({
    row,
    auth,
    close,
    isLoading,
    handleQuestionSubmittion,
    handleSubmitForAuthorization,
    finishedPartial,
    hasQuestion,
}) => {
    let content = null;
    const allowedForAction = _.includes(
        [row?.raised_by?.id, row?.raised_against?.id],
        auth?.getId()
    )
        ? false
        : true;

    if (!allowedForAction || row?.status) {
        return null;
    }

    if (!row?.status) {
        if (hasQuestion) {
            content = (
                <SubmitButton
                    onClick={handleQuestionSubmittion}
                    variant="success"
                    title="Submit to ask question"
                    className="ml-auto"
                    isLoading={isLoading}
                />
            );
        } else if (row && !row.need_authrization) {
            if (finishedPartial) {
                if (auth?.getRoleId() === 1) {
                    content = (
                        <SubmitButton
                            variant="success"
                            onClick={handleSubmitForAuthorization}
                            title="Authorize & Resolve"
                            className="ml-auto"
                            isLoading={isLoading}
                        />
                    );
                } else {
                    content = (
                        <SubmitButton
                            variant="success"
                            onClick={handleSubmitForAuthorization}
                            title="Send for Authorization"
                            className="ml-auto"
                            isLoading={isLoading}
                        />
                    );
                }
            } else {
                content = (
                    <SubmitButton
                        variant="success"
                        onClick={handleSubmitForAuthorization}
                        title="Authorize & Resolve"
                        className="ml-auto"
                        isLoading={isLoading}
                    />
                );
            }
        } else if (row && row.need_authrization && auth?.getRoleId() === 1) {
            content = (
                <SubmitButton
                    variant="success"
                    onClick={handleSubmitForAuthorization}
                    title="Authorize & Resolve"
                    className="ml-auto"
                    isLoading={isLoading}
                />
            );
        } else null;
    }

    return (
        <div className="d-flex w-100 ">
            <div className="ml-auto d-flex align-items-center justify-end pt-3 mb-4">
                {content}
                {!row?.status ? (
                    <Button onClick={close} className="mr-3 ml-2">
                        Close
                    </Button>
                ) : null}
            </div>
        </div>
    );
};

// Person
const Person = ({ user }) => {
    if (!user) return null;

    const imageSrc = `/user-uploads/avatar/${user?.image}`;

    return (
        <div className="d-flex align-items-center">
            <Avatar
                src={user.image ? imageSrc : null}
                alt=""
                name={user.name}
                type="circle"
                width={32}
                height={32}
                fontSize="1.2rem"
            />
            <div className="px-2">
                <a href={`/account/employees/${user.id}`} className="d-block">
                    {user.name}
                </a>

                <span
                    className="d-block f-10"
                    style={{ color: "#777", marginTop: "-0.3rem" }}
                >
                    {user?.designation ?? ""}
                </span>
            </div>
        </div>
    );
};
