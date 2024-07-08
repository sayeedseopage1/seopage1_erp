import React from "react";
import ReactModal from "react-modal";
import { IoIosStar } from "react-icons/io";
import { FaQuestion } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
import FractionalRating from "../../../global/FractionalRating";
import Button from "../../../global/Button";
const RatingModal = ({ showModal, setShowModal }) => {
    const [rating, setRating] = React.useState(0);
    const handleRatingChange = (newRating) => {
        setRating(newRating);
    };
    return (
        <div>
            <ReactModal
                style={{
                    overlay: {
                        backgroundColor: "rgba(0, 0, 0, 0.7)",
                        margin: "auto auto",
                        zIndex: 100,
                    },
                    content: {
                        borderRadius: "16px",
                        width: "525px",
                        // height: "303px",
                        margin: "auto auto",
                        border: "none",
                        overflow: "hidden",
                        backgroundColor: "transparent",
                    },
                }}
                isOpen={showModal}
                onRequestClose={() => setShowModal(false)}
            >
                <div>
                    <div className="portfolio_modal_header">
                        <div className="portfolio_star_icon">
                            <IoIosStar color="gold" size={"80px"} />
                        </div>
                        <div className="portfolio_question_icon">
                            <FaQuestion color="white" size={"20px"} />
                        </div>
                        <div
                            onClick={() => setShowEditModal(false)}
                            className="portfolio_close_icon"
                        >
                            <RxCross2 color="white" size={"25px"} />
                        </div>
                    </div>

                    <div className="portfolio_modal_content">
                        <div className="portfolio_rating_section">
                            <div>Rate This</div>
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                }}
                            >
                                <FractionalRating
                                    value={rating}
                                    onChange={handleRatingChange}
                                    stop={5}
                                    IconColor={"white"}
                                />
                                <span
                                    style={{ marginLeft: "5px" }}
                                >{` (${rating}/5)`}</span>
                            </div>
                        </div>

                        <textarea
                            placeholder="Write a comment..."
                            className="portfolio_comment_box"
                        ></textarea>

                        <div>
                            <button className="portfolio_rating_submission_button">
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            </ReactModal>
        </div>
    );
};

export default RatingModal;
