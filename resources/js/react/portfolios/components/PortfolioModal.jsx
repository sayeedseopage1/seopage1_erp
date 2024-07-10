import React from "react";
import Modal from "../../global/Modal";

import Avatar from "../../global/Avatar";
import { convertTime } from "../../utils/converTime";
import { Placeholder } from "../../global/Placeholder";
import { RxCross2 } from "react-icons/rx";

import DataComponent from "./DataComponent";
import FractionalRating from "../../global/FractionalRating";
import { useStorePortfolioRatingMutation } from "../../services/api/portfolioApiSlice";
import { LuExternalLink } from "react-icons/lu";
import Button from "../../global/Button";
import { useAuth } from "../../hooks/useAuth";
import { toast } from "react-toastify";
const PortfolioModal = ({ isOpen, close, data, isLoading }) => {
    const auth = useAuth();
    const [storePortfolioRating, { isLoading: storeLoading }] =
        useStorePortfolioRatingMutation();
    const [rating, setRating] = React.useState(data?.rating_score ?? null);
    const [comment, setComment] = React.useState(
        data?.added_by_comment ?? null
    );

    const handleRatingChange = (newRating) => {
        setRating(newRating);
    };

    const handleCommentSubmit = async () => {
        if (!comment) {
            toast.error("Please write a comment!");
            return;
        }
        if (rating <= 0) {
            toast.error("Please rate the website!");
            return;
        }
        try {
            await storePortfolioRating({
                portfolio_id: data?.id,
                rating_score: rating,
                added_by_comment: comment,
                rating_updated_by: auth.userId,
            }).unwrap();
            toast.success("Rating submission successful.");

            setShowModal(false);
        } catch (error) {
            console.error(error);
            // toast.error("Something went wrong!");
        }
    };
    return (
        <div>
            <Modal isOpen={isOpen}>
                <div className="sp1_modal-content-wrapper">
                    <div className="sp1_modal-panel sp1_task_create_modal_panel w-100">
                        {/* header */}
                        <div className="sp1_modal-head">
                            <div className="sp1_modal-title">View Category</div>
                            <div onClick={close} className="sp1_modal-close">
                                <RxCross2 color="white" size={"25px"} />
                            </div>
                        </div>
                        {/* end header */}

                        {/* body */}
                        <div className="sp1_modal-body sp1_task_create_modal_body px-5">
                            {isLoading ? (
                                <Loader />
                            ) : (
                                <div style={{ overflowY: "auto" }}>
                                    <div className="portfolio_item_background">
                                        <DataComponent
                                            label={`Project Name:`}
                                            value={data?.project_name}
                                            color="#1492E6"
                                            backgroundColor="#D8EDFC"
                                            width="49%"
                                        />
                                        <DataComponent
                                            label={`ClientName:`}
                                            value={data?.client_name}
                                            color="#1492E6"
                                            backgroundColor="#D8EDFC"
                                            width="49%"
                                        >
                                            <Avatar
                                                src={
                                                    data?.client_image
                                                        ? `/user-uploads/avatar/${data?.client_image}`
                                                        : null
                                                }
                                                alt={data?.client_name}
                                                name={data?.client_name}
                                                type="circle"
                                                width={32}
                                                height={32}
                                            />
                                        </DataComponent>
                                    </div>
                                    <br />
                                    <div className="portfolio_item_background">
                                        <DataComponent
                                            label={`Website Link:`}
                                            value={data?.actual_link}
                                            width="80%"
                                        />
                                        <DataComponent
                                            label={` `}
                                            value={``}
                                            width="18%"
                                            marginTop={"30px"}
                                            backgroundColor="#1D82F5"
                                        >
                                            <a
                                                href={data?.actual_link}
                                                target="_blank"
                                                style={{
                                                    margin: "0 auto",
                                                    cursor: "pointer",
                                                }}
                                            >
                                                <LuExternalLink
                                                    color="white"
                                                    size={30}
                                                />
                                            </a>
                                        </DataComponent>

                                        <DataComponent
                                            label={`Niche Category:`}
                                            value={data?.niche?.category_name}
                                            width="49%"
                                        />
                                        <DataComponent
                                            label={`Sub Niche Category:`}
                                            value={
                                                data?.sub_niche?.category_name
                                            }
                                            width="49%"
                                        />
                                        <DataComponent
                                            label={`Agree Price:`}
                                            value={
                                                data?.project_budget ?? "0.00"
                                            }
                                            width="49%"
                                        />
                                        <DataComponent
                                            label={`Theme Name:`}
                                            value={data?.theme_name ?? "--"}
                                            width="49%"
                                        />
                                    </div>

                                    <br />

                                    <div className="portfolio_item_background">
                                        <DataComponent
                                            label={`Total estimated hours:`}
                                            value={
                                                data?.estimated_total_minutes
                                                    ? convertTime(
                                                          data?.estimated_total_minutes
                                                      )
                                                    : "00 min"
                                            }
                                            fontSize="16px"
                                            color="#8198AA"
                                            backgroundColor="#DFE8EF"
                                            width="49%"
                                        />
                                        <DataComponent
                                            label={`Total logged hours:`}
                                            value={
                                                data?.total_logged_time
                                                    ? convertTime(
                                                          data?.total_logged_time
                                                      )
                                                    : "00 min"
                                            }
                                            fontSize="16px"
                                            color="#8198AA"
                                            backgroundColor="#DFE8EF"
                                            width="49%"
                                        />

                                        <DataComponent
                                            label={`Average hourly price based on the
                                               final logged hours:`}
                                            value={data?.hourly_budget ?? 0}
                                            fontSize="16px"
                                            color="#8198AA"
                                            backgroundColor="#DFE8EF"
                                            width="98%"
                                        />

                                        <DataComponent
                                            label={`Total number of pages with page numbers:`}
                                            value={data?.main_page_number ?? 0}
                                            fontSize="16px"
                                            color="#8198AA"
                                            backgroundColor="#DFE8EF"
                                            width="50%"
                                        >
                                            {" "}
                                            Main page name and number:
                                        </DataComponent>
                                        <DataComponent
                                            label={`  `}
                                            value={
                                                data?.secondary_page_number ?? 0
                                            }
                                            fontSize="16px"
                                            color="#8198AA"
                                            backgroundColor="#DFE8EF"
                                            width="48%"
                                            marginTop={"30px"}
                                        >
                                            Secondary page name and number:{" "}
                                        </DataComponent>
                                    </div>

                                    <br />

                                    <div className="portfolio_modal_rating_section">
                                        {(_.includes([1, 8], auth.roleId) ||
                                            data?.rating_score) && (
                                            <div
                                                style={{
                                                    display: "flex",
                                                    flexDirection: "column",
                                                    justifyContent: "center",
                                                    alignItems: "center",
                                                }}
                                            >
                                                <div>
                                                    Rate ⭐{" "}
                                                    {rating ||
                                                        data?.rating_score}
                                                    /5
                                                </div>

                                                {data?.rating_score ? (
                                                    <FractionalRating
                                                        value={
                                                            data?.rating_score
                                                        }
                                                        onChange={
                                                            handleRatingChange
                                                        }
                                                        stop={5}
                                                        IconColor={"#1492E6"}
                                                        readonly={true}
                                                    />
                                                ) : (
                                                    <FractionalRating
                                                        value={rating}
                                                        onChange={
                                                            handleRatingChange
                                                        }
                                                        stop={5}
                                                        IconColor={"#1492E6"}
                                                    />
                                                )}
                                            </div>
                                        )}

                                        {(_.includes([1, 8], auth.roleId) ||
                                            data?.rating_score) && (
                                            <div
                                                style={{
                                                    display: "flex",
                                                    flexDirection: "column",
                                                    gap: "5px",
                                                    alignItems: "flex-start",
                                                    borderTop:
                                                        "1px dashed #B5B5B5",
                                                    paddingTop: "10px",
                                                    marginTop: "20px",
                                                }}
                                            >
                                                <div
                                                    style={{
                                                        alignSelf: "flex-start",
                                                    }}
                                                >
                                                    Comments
                                                </div>

                                                {data?.added_by_comment ? (
                                                    <div
                                                        style={{
                                                            padding:
                                                                "15px 25px",
                                                            width: "660px",
                                                            borderRadius: "8px",
                                                            color: "black",
                                                            backgroundColor:
                                                                "#D8EDFC",
                                                            height: "95px",
                                                            border: "1px solid #F2F9FE",
                                                        }}
                                                    >
                                                        {data?.added_by_comment}
                                                    </div>
                                                ) : (
                                                    <textarea
                                                        value={comment}
                                                        onChange={(e) =>
                                                            setComment(
                                                                e.target.value
                                                            )
                                                        }
                                                        placeholder="Write a comment..."
                                                        style={{
                                                            padding:
                                                                "15px 25px",
                                                            width: "660px",
                                                            borderRadius: "8px",
                                                            color: "black",
                                                            backgroundColor:
                                                                "#D8EDFC",
                                                            height: "95px",
                                                            border: "1px solid #F2F9FE",
                                                        }}
                                                    />
                                                )}
                                            </div>
                                        )}
                                    </div>

                                    {/* button section */}
                                    <div
                                        style={{
                                            display: "flex",
                                            gap: "10px",
                                            marginTop: "20px",
                                            marginBottom: "40px",
                                            justifyContent: "center",
                                            alignItems: "center",
                                        }}
                                    >
                                        {_.includes([1, 8], auth.roleId) &&
                                            !data?.rating_score && (
                                                <button
                                                    className="portfolio_modal_submission_button"
                                                    onClick={
                                                        handleCommentSubmit
                                                    }
                                                >
                                                    {storeLoading
                                                        ? "Submitting..."
                                                        : "Submit"}
                                                </button>
                                            )}
                                        {_.includes([1, 8], auth.roleId) && (
                                            <Button
                                                variant="tertiary"
                                                className="portfolio_modal_close_button"
                                                onClick={close}
                                            >
                                                {data?.rating_score
                                                    ? "Close"
                                                    : "Do it later"}
                                            </Button>
                                        )}

                                        {/* //sales executive */}
                                        {!_.includes([1, 8], auth.roleId) && (
                                            <Button
                                                variant="tertiary"
                                                className="portfolio_modal_close_button"
                                                onClick={close}
                                            >
                                                Close
                                            </Button>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default PortfolioModal;

// loader
const Loader = () => {
    return (
        <div className="row">
            <div className="col-12 mb-3">
                <div className="">
                    <Placeholder
                        width="200px"
                        height={14}
                        className="font-weight-bold f-14 mb-2"
                    />
                    <Placeholder height={12} width="80%" />
                </div>
            </div>

            <div className="col-12 col-md-6 col-lg-4 mb-3">
                <Placeholder
                    width="200px"
                    height={14}
                    className="font-weight-bold f-14 mb-2"
                />
                <div className="d-flex align-items-center">
                    <Placeholder width={32} height={32} type="circle" />
                    <Placeholder height={14} width="200px" className="ml-2" />
                </div>
            </div>

            <div className="col-12 col-md-6 col-lg-4 mb-3">
                <Placeholder
                    width="200px"
                    height={14}
                    className="font-weight-bold f-14 mb-2"
                />
                <Placeholder height={12} width="80%" />
            </div>

            <div className="col-12 col-md-6 col-lg-4 mb-3">
                <Placeholder
                    width="200px"
                    height={14}
                    className="font-weight-bold f-14 mb-2"
                />
                <Placeholder height={12} width="80%" />
            </div>

            <div className="col-12 mb-3">
                <Placeholder
                    width="200px"
                    height={14}
                    className="font-weight-bold f-14 mb-2"
                />
                <div className="d-flex align-items-center">
                    <Placeholder height={12} width="80%" />
                </div>
            </div>

            <div className="col-12 mb-3">
                <Placeholder
                    width="200px"
                    height={14}
                    className="font-weight-bold f-14 mb-2"
                />
                <div className="d-flex align-items-center">
                    <Placeholder height={12} width="150px" />
                </div>
            </div>

            <div className="col-12 mb-3">
                <Placeholder
                    width="200px"
                    height={14}
                    className="font-weight-bold f-14 mb-2"
                />
                <div className="d-flex align-items-center">
                    <Placeholder height={12} width="80%" />
                </div>
            </div>

            <div className="col-12 col-md-6 mb-3">
                <Placeholder
                    width="200px"
                    height={14}
                    className="font-weight-bold f-14 mb-2"
                />
                <div className="d-flex align-items-center">
                    <Placeholder height={12} width="80%" />
                </div>
            </div>

            <div className="col-12 col-md-6 mb-3">
                <Placeholder
                    width="200px"
                    height={14}
                    className="font-weight-bold f-14 mb-2"
                />
                <div className="d-flex align-items-center">
                    <Placeholder height={12} width="80%" />
                </div>
            </div>

            <div className="col-12 col-md-6 mb-3">
                <Placeholder
                    width="200px"
                    height={14}
                    className="font-weight-bold f-14 mb-2"
                />
                <div className="d-flex align-items-center">
                    <Placeholder height={12} width="80%" />
                </div>
            </div>

            <div className="col-12 col-md-6 mb-3">
                <Placeholder
                    width="80%"
                    height={14}
                    className="font-weight-bold f-14 mb-2"
                />
                <div className="d-flex align-items-center">
                    <Placeholder height={12} width="80%" />
                </div>
            </div>

            <div className="col-12 mb-3">
                <Placeholder
                    width="80%"
                    height={14}
                    className="font-weight-bold f-14 mb-2"
                />
                <Placeholder
                    width="50%"
                    height={14}
                    className="font-weight-bold f-14 mb-2"
                />

                <div className="d-flex align-items-center">
                    <Placeholder
                        width="80%"
                        height={14}
                        className="font-weight-bold f-14 mb-2"
                    />
                    <Placeholder
                        width="50%"
                        height={14}
                        className="font-weight-bold f-14 mb-2"
                    />
                </div>
            </div>
        </div>
    );
};
