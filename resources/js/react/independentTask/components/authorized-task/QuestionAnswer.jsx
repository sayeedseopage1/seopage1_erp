import React, { useState } from "react";
import styles from "./taskAuthorization.module.css";
import { toast } from "react-toastify";
import { useCreatePendingTaskAuthorizationConversationMutation } from "../../../services/api/projectApiSlice";
import Button from "../Button";

const QuestionAnswer = ({ data, conversations, setConversations }) => {
    const [question, setQuestion] = useState("");
    const [err, setErr] = useState(new Object());

    const [
        createPendingTaskAuthorizationConversation,
        {isLoading}
    ] = useCreatePendingTaskAuthorizationConversationMutation();


    const handleSubmission = async (e) => {
        e.preventDefault();
        await createPendingTaskAuthorizationConversation({
            question,
            pending_parent_task_id: data.id
        })
        .unwrap()
        .then(res => {
            if(res?.status === 200){
                toast.success('Your question has been submitted successfully.');
                setConversations([...res.data]);
                setQuestion('');
            }
        })
        .catch(err => console.log(err))
    }

    return (
        <div>
            <div className={styles.comment_field}>
                <label className="task_info__label">Question:</label>
                <textarea
                    rows={3}
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    placeholder="Write your question here."
                />

                {err?.comment && (
                    <span className="text-danger">
                        <small>{err?.comment}</small>
                    </span>
                )}

                <div className={`${styles.button_group} mt-2`}>
                    {false ? (
                        <Button isLoading={false} variant="primary">
                            Loading
                        </Button>
                    ) : (
                        <>
                            <Button
                                variant="success"
                                isLoading={isLoading}
                                onClick={handleSubmission}
                            >
                                <i className="fa-solid fa-paper-plane" />
                                Send
                            </Button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default QuestionAnswer;
