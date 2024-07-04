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
                <div className="portfolio-icon">
                    <img
                        src={`https://www.google.com/s2/favicons?domain=${url}&sz=256`}
                        alt=""
                        width={`42px`}
                        height={`42px`}
                    />
                </div>

                <div className="flex flex-col">
                    <div className="singleline-ellipsis">
                        <span> URL: </span>
                        <span className="portfolio-item-link">
                            {" "}
                            {url?.slice(0, 50)}{" "}
                        </span>
                    </div>

                    <div
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            gap: "10px",
                        }}
                    >
                        <Button
                            className="price_quotation_custom_button price_quotation_custom_button_primary"
                            size="md"
                        >
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
                                className="price_quotation_custom_button price_quotation_custom_button_primary"
                            >
                                {isCopied ? (
                                    <i className="fa-solid fa-check" />
                                ) : (
                                    <Button
                                        className="price_quotation_custom_button price_quotation_custom_button_secondary"
                                        size="md"
                                    >
                                        Copy
                                    </Button>
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
                            className="price_quotation_custom_button price_quotation_custom_button_secondary"
                            size="md"
                            onClick={handleToggleModal}
                        >
                            Open
                        </Button>
                    </div>
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
