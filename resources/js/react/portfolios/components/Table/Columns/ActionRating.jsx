import React from "react";
import RatingModal from "../../Modal/RatingModal";
import { useAuth } from "../../../../hooks/useAuth";
import _ from "lodash";

const ActionRating = ({ data }) => {
    const auth = useAuth();
    const [showModal, setShowModal] = React.useState(false);
    return (
        <div>
            {_.includes([1, 8], auth?.getRoleId()) ? (
                data?.rating_score > 0 ? (
                    <div> ⭐{data?.rating_score}/5</div>
                ) : (
                    <button
                        className="portfolio_table_action_rating_button"
                        onClick={() => setShowModal(true)}
                    >
                        Rate
                    </button>
                )
            ) : (
                <div> ⭐{data?.rating_score ?? 0}/5</div>
            )}

            <RatingModal
                portfolioData={data}
                id={data?.id}
                showModal={showModal}
                setShowModal={setShowModal}
            />
        </div>
    );
};

export default ActionRating;
