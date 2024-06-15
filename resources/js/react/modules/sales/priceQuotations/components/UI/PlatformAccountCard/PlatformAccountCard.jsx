import React, { useState } from "react";
import PropTypes from "prop-types";
import { MdDone } from "react-icons/md";
import { useCopyToClipboard } from "react-use";
import { IoCopyOutline } from "react-icons/io5";

// Constants
import { QuotationTableLabel } from "../../../constant";

// style
import "./platformAccountCard.css";

const PlatformAccountCard = ({
    quotationData,
    selectedPriceQuotation,
    setSelectedPriceQuotation,
}) => {
    const [state, copyToClipboard] = useCopyToClipboard();
    const [isShow, setIsShow] = useState(false);

    const handleCopy = (e) => {
        e.stopPropagation();
        handleCopyData();
        setIsShow(true);
        setTimeout(() => {
            setIsShow(false);
        }, 1000);
    };

    const handleCopyData = () => {
        const formattedData = [
            `CMS Name: ${quotationData?.cms}`,
            `Project Category: ${quotationData?.category}`,
            `No. Primary Page Need: ${quotationData?.primary_page}`,
            `No. Secondary Page Need: ${quotationData?.secondary_page}`,
            `Any Major Functionalities Needed: ${quotationData?.major_functionalities}`,
            `How Many Hours of Other Works Needed: ${quotationData?.others_works}`,
            `Risk Factors: ${quotationData?.risk_factors}`,
            `Currency: ${quotationData?.currency}`,
            `Estimated Budget: $ ${quotationData?.estimated_budget} USD (Default)`,
            `Amount: ${quotationData?.client_currency_amount} ${quotationData?.currency} (Client’s Currency)`,
            `Deadline: ${quotationData.deadline} but not be rigid (${quotationData.deadline_hours} hours)`,
        ].join(",\n");

        copyToClipboard(formattedData);
    };

    const handlePlatformAccountCard = (type, e) => {
        if (type === "copy") {
            e.stopPropagation();
            handleCopy(e);
        } else if (type === "selectedPriceQuotation") {
            setSelectedPriceQuotation(quotationData);
        }
    };

    return (
        <button
            key={quotationData?.id}
            className={`platform_account_card_wrapper ${
                selectedPriceQuotation?.id === quotationData?.id ? "active" : ""
            }`}
            onClick={(e) =>
                handlePlatformAccountCard("selectedPriceQuotation", e)
            }
        >
            <div className="platform_account_card_header">
                <p>Freelancer account: {quotationData?.platform_account}</p>
                <button onClick={(e) => handlePlatformAccountCard("copy", e)}>
                    {isShow ? <MdDone /> : <IoCopyOutline size={15} />}
                </button>
            </div>
            <div className="platform_account_card_table">
                <table>
                    <tbody>
                        <tr>
                            <td>01.</td>
                            <td>{QuotationTableLabel.cms}</td>
                            <td>{quotationData?.cms}</td>
                        </tr>
                        <tr>
                            <td>02.</td>
                            <td>{QuotationTableLabel.category}</td>
                            <td>{quotationData?.category}</td>
                        </tr>
                        <tr>
                            <td>03.</td>
                            <td>{QuotationTableLabel.primary_page}</td>
                            <td>{quotationData?.primary_page}</td>
                        </tr>
                        <tr>
                            <td>04.</td>
                            <td>{QuotationTableLabel.secondary_page}</td>
                            <td>{quotationData?.secondary_page}</td>
                        </tr>
                        <tr>
                            <td>05.</td>
                            <td>{QuotationTableLabel.major_functionalities}</td>
                            <td>{quotationData?.major_functionalities}</td>
                        </tr>
                        <tr>
                            <td>06.</td>
                            <td>{QuotationTableLabel.others_works}</td>
                            <td>{quotationData?.others_works}</td>
                        </tr>
                        <tr>
                            <td>07.</td>
                            <td>{QuotationTableLabel.risk_factors}</td>
                            <td>{quotationData?.risk_factors}</td>
                        </tr>
                        <tr>
                            <td>07.</td>
                            <td>{QuotationTableLabel.currency}</td>
                            <td>{quotationData?.currency}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="platform_account_card_footer">
                <div className="platform_account_card_budget_info">
                    <h6>
                        Estimated Budget:{" "}
                        <span>
                            $ {quotationData?.estimated_budget} USD (Default)
                        </span>
                    </h6>
                    <h6>
                        Amount:{" "}
                        <span>
                            {" "}
                            {quotationData?.client_currency_amount}{" "}
                            {quotationData?.currency} (Client’s Currency)
                        </span>
                    </h6>
                </div>
                <div className="platform_account_card_deadline">
                    <p>Deadline</p>
                    <h6>
                        {quotationData.deadline} but not be rigid{" "}
                        <span>({quotationData.deadline_hours} hr)</span>
                    </h6>
                </div>
            </div>
        </button>
    );
};

export default PlatformAccountCard;

PlatformAccountCard.propTypes = {
    quotationData: PropTypes.object,
    selectedPriceQuotation: PropTypes.object,
    setSelectedPriceQuotation: PropTypes.func,
};
