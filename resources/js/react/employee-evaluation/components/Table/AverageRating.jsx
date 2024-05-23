import React, { useState } from "react";
import styles from "../../../../react/tasks/components/PrimaryPageAuthorization.module.css";
import ReactModal from "react-modal";
import { ratingHoverText } from "../../../utils/ratingHoverText";
import RatingSectionStatic from "../modal/RatingSectionStatic";
import Card from "../../../global/Card";
import { useGetTaskListQuery } from "../../../services/api/EvaluationApiSlice";

const AverageRating = ({ data }) => {
    const {
        data: TaskList,
        isLoading,
        isFetching,
    } = useGetTaskListQuery(data?.user_id);
    const Tasks = TaskList?.data;
    const [isRatingModalOpen, setIsRatingModalOpen] = useState(false);

    const calculateAverage = (tasks, property) => {
        if (!tasks || tasks.length === 0) return 0;
        const total = tasks.reduce(
            (acc, task) => acc + (Number(task[property]) || 0),
            0
        );
        return (total / tasks.length).toFixed(2);
    };

    const qw_first_chance_avg = calculateAverage(Tasks, "qw_first_chance");
    const qw_first_revision_avg = calculateAverage(Tasks, "qw_first_revision");
    const qw_second_revision_avg = calculateAverage(
        Tasks,
        "qw_second_revision"
    );
    const speed_of_work_avg = calculateAverage(Tasks, "speed_of_work");
    const understand_instruction_avg = calculateAverage(
        Tasks,
        "understand_instruction"
    );

    const formFields = [
        {
            label: "Quality of work (in the first chance)",
            value: qw_first_chance_avg,
            hoverText: ratingHoverText?.qw_first_chance,
        },
        {
            label: "Quality of work (After 1st revision)",
            value: qw_first_revision_avg,
            hoverText: ratingHoverText?.qw_first_revision,
        },
        {
            label: "Quality of work (After 2nd revision)",
            value: qw_second_revision_avg,
            hoverText: ratingHoverText?.qw_second_revision,
        },
        {
            label: "Speed of work",
            value: speed_of_work_avg,
            hoverText: ratingHoverText?.speed_of_work,
        },
        {
            label: "Ability to understand instruction",
            value: understand_instruction_avg,
            hoverText: ratingHoverText?.understand_instruction,
        },
    ];

    return (
        <>
            <div
                onClick={() => setIsRatingModalOpen(true)}
                className="link_color"
            >
                {data?.lead_dev_avg_rating}
            </div>
            <ReactModal
                style={{
                    overlay: {
                        backgroundColor: "rgba(0, 0, 0, 0.6)",
                        margin: "auto auto",
                        zIndex: 100,
                    },
                    content: {
                        borderRadius: "10px",
                        height: "fit-content",
                        maxHeight: "95vh",
                        maxWidth: "500px",

                        margin: "auto auto",
                        border: "none",
                        padding: "0px",
                        overflowY: "auto",
                    },
                }}
                isOpen={isRatingModalOpen}
                onRequestClose={() => setIsRatingModalOpen(false)}
            >
                <Card className={styles.rating_card}>
                    <Card.Head
                        onClose={() => setIsRatingModalOpen(false)}
                        className={styles.card_head}
                    >
                        <div>
                            <span>Lead Developer Average Rating</span>
                            <span> {`( ${data?.lead_dev_avg_rating})`}</span>
                        </div>
                    </Card.Head>

                    <Card.Body className={styles.card_body}>
                        {formFields.map((field, index) => (
                            <RatingSectionStatic key={index} {...field} />
                        ))}
                    </Card.Body>
                </Card>
            </ReactModal>
        </>
    );
};

export default AverageRating;
