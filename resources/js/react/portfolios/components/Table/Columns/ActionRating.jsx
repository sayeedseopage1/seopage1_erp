import React, { useEffect } from "react";
import RatingModal from "../../Modal/RatingModal";
import { useAuth } from "../../../../hooks/useAuth";
import _ from "lodash";
import FractionalRating from "../../../../global/FractionalRating";

const ActionRating = ({ data }) => {
    const [showModal, setShowModal] = React.useState(false);

    const auth = useAuth();
    return (
        <div>
            {_.includes([1, 8], auth?.getRoleId()) ? (
                data?.rating_score > 0 ? (
                    <div>
                        {" "}
                        <FractionalRating
                            value={Number(data?.rating_score) / 6}
                            stop={1}
                            IconColor={"gold"}
                            readonly={true}
                            fractions={8}
                        />
                        {data?.rating_score}/5
                    </div>
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
                    {data?.rating_score ? (
                        <span>
                            <FractionalRating
                                value={Number(data?.rating_score) / 6}
                                stop={1}
                                IconColor={"gold"}
                                readonly={true}
                                fractions={8}
                            />
                            {data?.rating_score}/5{" "}
                        </span>
                    ) : (
                        "N/A"
                    )}
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
