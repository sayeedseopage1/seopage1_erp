import React from "react";
import Button from "../../global/Button";

import RatingModal from "./Modal/RatingModal";
import { useAuth } from "../../hooks/useAuth";

const PortfolioButtons = ({
    portfolioData,
    id,
    url,
    copyToClipboard,
    setRefEl,
    setPopperEl,
    setArrowElement,
    isCopied,
    handleToggleModal,
    setIsCopied,
    styles,
    attributes,
}) => {
    const auth = useAuth();
    const [showEditModal, setShowEditModal] = React.useState(false);

    const handleEditButton = () => {
        setShowEditModal(true);
    };
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "row",
                gap: "10px",
            }}
        >
            {_.includes([1], auth.roleId) ||
            (_.includes([8], auth.roleId) &&
                portfolioData?.rating_score === null) ? (
                <Button
                    className="price_quotation_custom_button price_quotation_custom_button_primary"
                    onClick={handleEditButton}
                >
                    {portfolioData?.rating_score ? (
                        <span>Edit</span>
                    ) : (
                        <span>Rate</span>
                    )}
                </Button>
            ) : null}

            <div>
                <button
                    ref={setRefEl}
                    aria-label="copy-text"
                    onClick={(e) => {
                        e.stopPropagation();
                        copyToClipboard(url);
                        setIsCopied(true);
                    }}
                    style={{
                        width: "75px",
                        height: "42px",
                        padding: "5px 10px 5px 10px",
                        display: "inline-block",
                        textAlign: "center",
                        border: "1px solid #1492E6",
                        backgroundColor: "#E3F3FF",
                        borderRadius: "5px",
                        color: "#1492E6",
                    }}
                >
                    {isCopied ? (
                        <i
                            className="fa-solid fa-check"
                            style={{ width: "100%" }}
                        />
                    ) : (
                        <span style={{ width: "100%" }}>Copy</span>
                    )}

                    {isCopied && (
                        <div
                            className="dispute-tooltip"
                            ref={setPopperEl}
                            style={styles.popper}
                            {...attributes.popper}
                        >
                            <div className="dispute-tooltip-content">
                                Copied
                            </div>
                            <div
                                ref={setArrowElement}
                                style={styles.arrow}
                                className="dispute-notif-arrow"
                            />
                        </div>
                    )}
                </button>
            </div>

            <Button
                className="price_quotation_custom_button price_quotation_custom_button_primary"
                onClick={handleToggleModal}
            >
                Open
            </Button>

            <RatingModal
                portfolioData={portfolioData}
                id={id}
                showModal={showEditModal}
                setShowModal={setShowEditModal}
            />
        </div>
    );
};

export default PortfolioButtons;
