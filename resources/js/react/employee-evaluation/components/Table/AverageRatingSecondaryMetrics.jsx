import React, { useState } from "react";
import styles from "../../../../react/tasks/components/PrimaryPageAuthorization.module.css";
import ReactModal from "react-modal";
import { ratingHoverText } from "../../../utils/ratingHoverText";
import RatingSectionStatic from "../modal/RatingSectionStatic";
import Card from "../../../global/Card";
const AverageRatingSecondaryMetrics = ({ data }) => {
    const [isRatingModalOpen, setIsRatingModalOpen] = useState(false);
    const formFields = [
        {
            label: "Communication",
            value: data?.communication,
            hoverText: ratingHoverText?.communication,
        },
        {
            label: "Professionalism",
            value: data?.professionalism,
            hoverText: ratingHoverText?.professionalism,
        },
        {
            label: "Ability to identify issues",
            value: data?.identiey_issues,
            hoverText: ratingHoverText?.identiey_issues,
        },
        {
            label: "Dedication",
            value: data?.dedication,
            hoverText: ratingHoverText?.dedication,
        },
        {
            label: "Obedience",
            value: data?.obedience,
            hoverText: ratingHoverText?.obedience,
        },
    ];
    const averageRating =
        (Number(data?.communication) +
            Number(data?.professionalism) +
            Number(data?.identiey_issues) +
            Number(data?.dedication) +
            Number(data?.obedience)) /
        5;

    return (
        <>
            <div
                onClick={() => setIsRatingModalOpen(true)}
                className="link_color"
            >
                {averageRating?.toFixed(2)}
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
                            <span>Secondary Metrics Average Rating</span>
                            <span> {`( ${averageRating?.toFixed(2)})`}</span>
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

export default AverageRatingSecondaryMetrics;
