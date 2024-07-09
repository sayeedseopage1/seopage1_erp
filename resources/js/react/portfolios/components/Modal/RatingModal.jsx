import React from "react";
import ReactModal from "react-modal";
import { IoIosStar } from "react-icons/io";
import { FaQuestion } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
import FractionalRating from "../../../global/FractionalRating";

import {
    useStorePortfolioRatingMutation,
    useUpdatePortfolioRatingMutation,
} from "../../../services/api/portfolioApiSlice";

import { useAuth } from "../../../hooks/useAuth";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

const RatingModal = ({ portfolioData, id, showModal, setShowModal }) => {
    const auth = useAuth();
    const [updatePortfolioRating, { isLoading }] =
        useUpdatePortfolioRatingMutation();
    const [storePortfolioRating, { isLoading: storeLoading }] =
        useStorePortfolioRatingMutation();
    const [rating, setRating] = React.useState(
        portfolioData?.rating_score ?? 0
    );
    const [comment, setComment] = React.useState(
        portfolioData?.added_by_comment ?? ""
    );

    const handleRatingChange = (newRating) => {
        setRating(newRating);
    };

    const handleCommentSubmit = async () => {
        if (!comment) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Please write a comment!",
            });
            return;
        }
        if (rating <= 0) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Please rate the website!",
            });
            return;
        }
        try {
            if (portfolioData?.rating_score) {
                await updatePortfolioRating({
                    portfolio_id: id,
                    rating_score: rating,
                    added_by_comment: comment,
                    rating_updated_by: auth.userId,
                }).unwrap();
                toast.success("Rating update successful.");
            } else {
                await storePortfolioRating({
                    portfolio_id: id,
                    rating_score: rating,
                    added_by_comment: comment,
                    rating_updated_by: auth.userId,
                }).unwrap();
                toast.success("Rating submission successful.");
            }
            setShowModal(false);
        } catch (error) {
            console.error(error);
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Something went wrong!",
            });
        }
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
                ariaHideApp={false}
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
                            onClick={() => setShowModal(false)}
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
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            placeholder="Write a comment..."
                            className="portfolio_comment_box"
                        ></textarea>

                        <div>
                            <button
                                className="portfolio_rating_submission_button"
                                onClick={handleCommentSubmit}
                            >
                                {isLoading || storeLoading
                                    ? "Submitting..."
                                    : `${
                                          portfolioData?.rating_score
                                              ? "Update"
                                              : "Submit"
                                      }`}
                            </button>
                        </div>
                    </div>
                </div>
            </ReactModal>
        </div>
    );
};

export default RatingModal;
