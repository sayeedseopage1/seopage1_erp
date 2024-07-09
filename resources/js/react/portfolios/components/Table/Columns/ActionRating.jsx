import React, { useEffect } from "react";
import RatingModal from "../../Modal/RatingModal";
import { useAuth } from "../../../../hooks/useAuth";
import _ from "lodash";
import { useLocation } from "react-router-dom";

const ActionRating = ({ data }) => {
    const [showModal, setShowModal] = React.useState(false);
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const portfolio_id = queryParams.get("portfolio_id");
    console.log(
        "portfolio id from param",
        portfolio_id,
        "state portfolio id",
        data?.id
    );
    useEffect(() => {
        if (portfolio_id == data?.id) {
            setShowModal(true);
        }
    }, [portfolio_id]);

    console.log("show modal", showModal);
    const auth = useAuth();
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
                <div>
                    {" "}
                    {data?.rating_score ? `⭐${data?.rating_score}/5` : "N/A"}
                </div>
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
