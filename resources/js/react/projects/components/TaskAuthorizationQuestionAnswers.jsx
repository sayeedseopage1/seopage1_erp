import React from "react";
import styles from "./taskAuthorization.module.css";
import {User} from '../../utils/user-details'

const TaskAuthorizationQuestionAnswers = ({ question, answer }) => {
    return (
        <div className={styles.question_answer_container}>
            <div className={styles.section_divider}>
                <span className="badge badge-secondary">
                    Questions & Answers
                </span>
            </div>

           <div className={styles.ques_ans_container}>
             {/* item */}
             <div className={styles.ques_ans_wrapper}>
                <div className={styles.ques}>
                    <span>Q1. What is your refund policy? </span>
                </div>
                <div className={styles.ans}>
                    <span> - </span>
                    <span>If you're unhappy with your purchase for any reason, email
                    us within 90 days and we'll refund you in full, no questions
                    asked.</span>
                </div>
            </div>
            {/* end item */}

             {/* item */}
             <div className={styles.ques_ans_wrapper}>
                <div className={styles.ques}>
                    <span>Q2. What is your refund policy? </span>
                </div>
                <div className={styles.ans}>
                    <span> - </span>
                    <span>If you're unhappy with your purchase for any reason, email
                    us within 90 days and we'll refund you in full, no questions
                    asked.</span>
                </div>
            </div>
            {/* end item */}

             {/* item */}
             <div className={styles.ques_ans_wrapper}>
                <div className={styles.ques}>
                    <span>Q3. What is your refund policy? </span>
                </div>
                <div className={styles.ans}>

                    <i> - Not Answered Yet!</i>
                </div>
            </div>
            {/* end item */}
           </div>

        </div>
    );
};

export default TaskAuthorizationQuestionAnswers;



