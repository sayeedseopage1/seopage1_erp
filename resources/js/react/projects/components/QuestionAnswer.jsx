import React, { useState } from "react";
import styles from "./taskAuthorization.module.css";
import Button from "../../global/Button";

const QuestionAnswer = ({ data }) => {
    const [question, setQuestion] = useState("");
    const [err, setErr] = useState(new Object());

    const handleSubmission = (e) => {
        e.preventDefault();
        console.log({question})
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

                <div className={styles.button_group}>
                    {false ? (
                        <Button isLoading={false} variant="primary">
                            Loading
                        </Button>
                    ) : (
                        <>
                            <Button
                                variant="success"
                                onClick={handleSubmission}
                            >
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
