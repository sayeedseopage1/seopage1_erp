import React, { useEffect } from "react";
import styles from "./taskAuthorization.module.css";
import { User } from "../../utils/user-details";
import _ from "lodash";
import Button from "../../global/Button";
import { useUpdatePendingTaskAuthorizationConversationMutation } from "../../services/api/projectApiSlice";
import { toast } from "react-toastify";
import dayjs from "dayjs";

const TaskAuthorizationQuestionAnswers = ({ data, updateConversations }) => {
    const [conversations, setConversations] = React.useState([]);
    const [err, setErr] = React.useState(null);

    const user = new User(window.Laravel.user);
    const auth = _.includes([1, 8], user.getRoleId());

    useEffect(() => {
        setConversations(data);
    }, [data])


   const [
        updatePendingTaskAuthorizationConversation,
        {isLoading}
   ] = useUpdatePendingTaskAuthorizationConversationMutation();

    const updateConversation = (e, prevData) => {
        const shadow = _.map(conversations, (c) => {
            if (c.id === prevData.id) {
                return { ...c, answer: e.target.value };
            } else return c;
        });
        setConversations(shadow);
        updateConversations(shadow);
    };


    const handleSubmission = async (e) => {
        e.preventDefault();
        let error = new Object();
        let count = 0;

        _.forEach(conversations, c => {
            if(!c.answer){
                error[c.id] = "Please answer the above question, as your response is essential."
                count++;
            }
        })

        setErr(error ?? null);

        if(count === 0){
            await updatePendingTaskAuthorizationConversation(conversations)
            .unwrap()
            .then(res => {
                toast.success('Your answer has been submitted successfully.');
                setConversations(res.data);
            })
        }

    }

    const countNotAnsweredQuestion = _.size(_.filter(conversations, c => !c.replied_by));

    if(!conversations.length) return null;

    return (
        <div className={styles.question_answer_container}>
            <div className={styles.section_divider}>
                <span className="badge badge-secondary">
                    Questions & Answers
                </span>
            </div>

            <div className={styles.ques_ans_container}>
                {_.map(conversations, (conversation, index) => (
                    <div
                        className={styles.ques_ans_wrapper}
                        key={conversation.id}
                    >
                        <div className={styles.ques}>
                            <span>
                                Q{index + 1}. {conversation.question}
                                <span className={styles.ques_by}>
                                    -by
                                    <strong>{" " + conversation.created_by_name + " "}</strong>
                                    (<span>{dayjs(conversation.created_date).format('MMM DD, YYYY hh:mm A')}</span>)
                                </span>
                            </span>
                        </div>
                        <div className={styles.ans}>
                            {conversation.replied_by ? (
                                <>
                                    <p><span className="text-success"><strong>Answer: </strong></span> {conversation.answer}</p>
                                    <span className={styles.ques_by}>
                                    -by
                                    <strong>{" " + conversation.replied_by_name + " "}</strong>
                                    (<span>{dayjs(conversation.replied_date).format('MMM DD, YYYY hh:mm A')}</span>)
                                </span>
                                </>
                            ) : auth ? (
                                <i> Not Answered Yet! </i>
                            ) : (
                                <Answer
                                    conversation={conversation}
                                    updateConversation={updateConversation}
                                    error = {err}
                                />
                            )}
                        </div>
                    </div>
                ))}

                {
                    countNotAnsweredQuestion && !auth ?
                    <div className={styles.comment_field}>
                        <div className={styles.button_group}>
                            <Button isLoading={isLoading} variant="success" onClick={handleSubmission}>
                                <i className="fa-solid fa-paper-plane" />
                                Submit Answers
                            </Button>
                        </div>
                    </div> : null
                }
                {/* end item */}
            </div>
        </div>
    );
};

export default TaskAuthorizationQuestionAnswers;

const Answer = ({ conversation, updateConversation, error }) => {
    return (
        <div className={styles.comment_field}>
            <label className="task_info__label mt-2">Answer:</label>
            <textarea
                rows={3}
                value={conversation.answer || ""}
                onChange={(e) => updateConversation(e, conversation)}
                placeholder="Write your answer here."
            />
            {error && error[conversation.id] && (
                    <span className="text-danger">
                       {error[conversation.id]}
                    </span>
            )}
        </div>
    );
};
