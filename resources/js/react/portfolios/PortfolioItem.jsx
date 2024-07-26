import { usePopper } from "react-popper";
import { useCopyToClipboard } from "react-use";
import React, { useState, useEffect } from "react";
import PortfolioModal from "./components/PortfolioModal";
import { useLazyGetPortfolioDataByIdQuery } from "../services/api/portfolioApiSlice";
import Button from "../global/Button";
import PortfolioButtons from "./components/PortfolioButtons";
import FractionalRating from "../global/FractionalRating";

const PortfolioItem = ({ portfolioData, id, url, onClick, isLoading }) => {
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
                        <a
                            href={url}
                            target="_blank"
                            className="portfolio-item-link"
                        >
                            {url?.slice(0, 30) + "..."}
                        </a>
                    </div>

                    <PortfolioButtons
                        portfolioData={portfolioData}
                        id={id}
                        url={url}
                        copyToClipboard={copyToClipboard}
                        setRefEl={setRefEl}
                        setPopperEl={setPopperEl}
                        setArrowElement={setArrowElement}
                        handleToggleModal={handleToggleModal}
                        isCopied={isCopied}
                        setIsCopied={setIsCopied}
                        styles={styles}
                        attributes={attributes}
                    />
                </div>

                <div>
                    {portfolioData?.rating_score ? (
                        <>
                            <FractionalRating
                                value={Number(portfolioData?.rating_score) / 6}
                                stop={1}
                                IconColor={"gold"}
                                readonly={true}
                                // fractions={10}
                            />
                            <span> {portfolioData?.rating_score}/5</span>
                        </>
                    ) : (
                        <span>N/A</span>
                    )}
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
