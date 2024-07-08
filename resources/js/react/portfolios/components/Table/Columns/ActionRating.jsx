import React from "react";
import RatingModal from "../../Modal/RatingModal";

const ActionRating = ({ data }) => {
    const [showModal, setShowModal] = React.useState(false);
    return (
        <div>
            <button
                className="portfolio_table_action_rating_button"
                onClick={() => setShowModal(true)}
            >
                Rate
            </button>

            <RatingModal showModal={showModal} setShowModal={setShowModal} />
        </div>
    );
};

export default ActionRating;
