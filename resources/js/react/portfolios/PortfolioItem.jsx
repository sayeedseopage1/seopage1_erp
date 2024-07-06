import { usePopper } from "react-popper";
import { useCopyToClipboard } from "react-use";
import React, { useState, useEffect } from "react";
import PortfolioModal from "./components/PortfolioModal";
import { useLazyGetPortfolioDataByIdQuery } from "../services/api/portfolioApiSlice";
import Button from "../global/Button";

const PortfolioItem = ({ id, url, onClick, isLoading }) => {
    const [showModal, setShowModal] = useState(false);
    const [state, copyToClipboard] = useCopyToClipboard();
    const [isCopied, setIsCopied] = useState(false);
    const [refEl, setRefEl] = useState(null);
    const [popperEl, setPopperEl] = useState(null);
    const [arrowElement, setArrowElement] = useState(null);
    const [data, setData] = useState([]);

    useEffect(() => {
        let timer = setTimeout(() => {
            setIsCopied(false);
        }, 1000);

        return () => clearTimeout(timer);
    }, [state]);

    //   popper element
    const { styles, attributes } = usePopper(refEl, popperEl, {
        placement: "top",
        modifiers: [
            { name: "offset", options: { offset: [0, 0] } },
            {
                name: "arrow",
                options: {
                    element: arrowElement,
                },
            },
        ],
    });

    const [getPortfolioDataById, { isFetching }] =
        useLazyGetPortfolioDataByIdQuery();

    const handleToggleModal = async () => {
        setShowModal(true);
        const res = await getPortfolioDataById(id).unwrap();
        setData(res);
    };

    const close = () => setShowModal(false);

    return (
        <>
            <div className="portfolio-item">
                <div
                    className="portfolio-icon"
                    style={{ width: "70px", height: "65px" }}
                >
                    <img
                        src={`https://www.google.com/s2/favicons?domain=${url}&sz=256`}
                        alt=""
                        style={{ width: "100%", height: "100%" }}
                    />
                </div>

                <div
                    className="flex flex-col mb-2"
                    style={{
                        borderRight: "1px dashed #ddd",
                        paddingRight: "15px",
                    }}
                >
                    <div className="singleline-ellipsis mb-2">
                        <span> URL: </span>
                        <span className="portfolio-item-link">
                            {url?.slice(0, 30) + "..."}
                        </span>
                    </div>

                    <div
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            gap: "10px",
                        }}
                    >
                        <Button className="price_quotation_custom_button price_quotation_custom_button_primary">
                            Edit
                        </Button>

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
                    </div>
                </div>

                <div>
                    <span style={{ color: "gold", fontSize: "24px" }}>⭐</span>
                    <span>5/5</span>
                </div>
            </div>

            <PortfolioModal
                isOpen={showModal}
                close={close}
                data={data}
                isLoading={isFetching}
            />
        </>
    );
};

export default PortfolioItem;
