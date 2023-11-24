import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useCreateIndependentTaskAuthorizationConversationMutation } from "../../../services/api/independentTaskApiSlice";
import Button from "../Button";
import styles from "./taskAuthorization.module.css";

const QuestionAnswer = ({ data, refresh }) => {
    const [question, setQuestion] = useState("");
    const [err, setErr] = useState("");

    const [
        createIndependentTaskAuthorizationConversation,
        {isLoading}
    ] = useCreateIndependentTaskAuthorizationConversationMutation();


    useEffect(()=>{
      if (!question) {
        setErr("Question is required.");
      }else{
        setErr("");
      }
    },[question])

    const handleSubmission = async (e) => {
        e.preventDefault();

        // console.log({question, data});
        if (!question) {
            // toast.warning("Please enter your question.");
            Swal.fire({
                icon:"warning",
                title:"Please enter your question.",
                timer:'2000',
                timerProgressBar:true,
            })
            return ;
        }

        await createIndependentTaskAuthorizationConversation({
            question,
            pending_parent_task_id: data?.id
        })
        .unwrap()
        .then(res => {
            if(res?.status === 200){
                toast.success('Your question has been submitted successfully.');
                // setConversations([...res.data]);
                setQuestion('');
                refresh();
            }
        })
        .catch(err => console.log(err))
    }

    return (
        <div>
            <div className={styles.comment_field}>
                <label className="task_info__label">Question: <span className="text-danger">*</span>{err && (
                    <span className="text-danger">
                        <small>{err}</small>
                    </span>
                )}</label>

                <textarea
                    rows={3}
                    value={question}
                    style={{overflowY:'auto'}}
                    onChange={(e) => setQuestion(e.target.value)}
                    placeholder="Write your question here."
                />


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
                                // disabled
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
