import React, { useState } from "react";
import styles from "../../../../react/tasks/components/PrimaryPageAuthorization.module.css";
import ReactModal from "react-modal";
import { ratingHoverText } from "../../../utils/ratingHoverText";
import RatingSectionStatic from "../modal/RatingSectionStatic";
import Card from "../../../global/Card";
import { useGetSingleTaskQuery } from "../../../services/api/EvaluationApiSlice";

const AverageRatingRevision = ({ data }) => {
    const {
        data: Task,
        isLoading,
        isFetching,
    } = useGetSingleTaskQuery(data?.task_id);
    const singleTask = Task?.data[0];
    const [isRatingModalOpen, setIsRatingModalOpen] = useState(false);

    // console.log("single task", singleTask);
    const formFields = [
        {
            label: "Quality of work (in the first chance)",
            value: singleTask?.qw_first_chance,
            hoverText: ratingHoverText?.qw_first_chance,
        },
        {
            label: "Quality of work (After 1st revision)",
            value: singleTask?.qw_first_revision,
            hoverText: ratingHoverText?.qw_first_revision,
        },
        {
            label: "Quality of work (After 2nd revision)",
            value: singleTask?.qw_second_revision,
            hoverText: ratingHoverText?.qw_second_revision,
        },
        {
            label: "Speed of work",
            value: singleTask?.speed_of_work,
            hoverText: ratingHoverText?.speed_of_work,
        },
        {
            label: "Ability to understand instruction",
            value: singleTask?.understand_instruction,
            hoverText: ratingHoverText?.understand_instruction,
        },
    ];

    return (
        <>
            <div
                onClick={() => setIsRatingModalOpen(true)}
                className="link_color"
            >
                {singleTask?.avg_rating}
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
                            <span> {`( ${singleTask?.avg_rating})`}</span>
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

export default AverageRatingRevision;
