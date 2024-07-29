import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import { MdDone } from "react-icons/md";
import { useCopyToClipboard } from "react-use";
import { IoCopyOutline } from "react-icons/io5";
import { BiSolidInfoSquare } from "react-icons/bi";
import { FaCheck } from "react-icons/fa";
import { toast } from "react-toastify";

// Constants
import { PlatformOptions, QuotationTableLabel } from "../../../constant";

// style
import "./platformAccountCard.css";
import Switch from "../../../../../../global/Switch";

// Helper
import { getHourWithMin } from "../../../helper";

// Context
import { PriceQuotationsContext } from "../../../context/PriceQuotationsProvider";

const PlatformAccountCard = ({
    quotationData,
    selectedPriceQuotation,
    setSelectedPriceQuotation,
}) => {
    const [state, copyToClipboard] = useCopyToClipboard();
    const [isShow, setIsShow] = useState(false);
    const { priceQuotationsInputs } = useContext(PriceQuotationsContext);

    const handleCopy = (e) => {
        e.stopPropagation();
        handleCopyData();
        setIsShow(true);
        setTimeout(() => {
            setIsShow(false);
        }, 1000);
    };

    // format data to copy clipboard
    const handleCopyData = () => {
        const {
            project_cms,
            project_niche,
            no_of_primary_pages,
            no_of_secondary_pages,
            no_of_major_functionalities,
            hours_of_other_works,
            risk_factor,
            currency,
            caculated_project_budget_in_usd,
            calculated_project_budget,
            calculated_no_of_days,
            calculated_total_hours,
        } = quotationData || {};

        const formattedData = [
            `CMS Name: ${project_cms?.cms_name}`,
            `Project Category: ${project_niche?.category_name}`,
            `No. Primary Page Need: ${no_of_primary_pages}`,
            `No. Secondary Page Need: ${no_of_secondary_pages}`,
            `Any Major Functionalities Needed: ${
                no_of_major_functionalities || 0
            }`,
            `How Many Hours of Other Works Needed: ${
                hours_of_other_works || 0
            }`,
            `Risk Factors: ${risk_factor || 0}%`,
            `Currency: ${currency?.currency_name}`,
            `Estimated Budget: $ ${caculated_project_budget_in_usd} USD (Default)`,
            `Amount: ${calculated_project_budget} ${currency?.currency_symbol} (Client’s Currency)`,
            `Deadline: ${calculated_no_of_days} day but not be rigid (${getHourWithMin(
                calculated_total_hours
            )})`,
        ].join(",\n");

        toast.info("Price Quotations Copy on clipboard");
        copyToClipboard(formattedData);
    };

    /**
     *
     * @param {string} type  - type will 3 (copy, selectedPriceQuotation, notDoAble)
     * @param {event} e - on this event
     * @return {void} - when type copy then will copy data, if selectedPriceQuotation then data will store, if notDoAble * * then agin will call api
     */
    const handlePlatformAccountCard = (type, e) => {
        if (type === "copy") {
            e.stopPropagation();
            handleCopy(e);
        } else if (type === "selectedPriceQuotation") {
            setSelectedPriceQuotation(quotationData);
        }
    };

    // Helper - for get Platform type
    const getPlatformData = PlatformOptions?.find(
        (item) => item?.id === quotationData?.platform_account?.type
    );

    // Icon Components
    const PlatformIcon = ({ type, icon, color, name }) => {
        if (type === "svg") {
            const Icons = getPlatformData?.icon;
            return <Icons fill={color} size={23} className="mr-1" />;
        } else if (type === "img") {
            return (
                <img
                    src={icon}
                    alt={name}
                    className="mr-1"
                    width={23}
                    height={23}
                />
            );
        }
    };

    const getDeadlineText = (deadlineType) => {
        switch (deadlineType?.name) {
            case "Flexible":
                return "but not be rigid";
            case "Fixed":
                return "but fixed and rigid";
            default:
        }
    };

    return (
        <button
            key={quotationData?.id}
            className={`platform_account_card_wrapper ${
                selectedPriceQuotation?.platform_account?.id ===
                quotationData?.platform_account?.id
                    ? "active"
                    : ""
            }`}
            onClick={(e) =>
                // This condition add for if not doable message true then select will not work
                !quotationData?.not_doable_message &&
                handlePlatformAccountCard("selectedPriceQuotation", e)
            }
        >
            <Switch>
                <div className="platform_account_card_header">
                    <Switch.Case
                        condition={
                            selectedPriceQuotation?.platform_account?.id ===
                            quotationData?.platform_account?.id
                        }
                    >
                        <div className="platform_account_card_selected">
                            <FaCheck size={20} fill="var(--primarySuccess)" />
                        </div>
                    </Switch.Case>
                    <p className="d-flex align-items-center">
                        <PlatformIcon
                            color={getPlatformData?.color}
                            icon={getPlatformData?.icon}
                            name={getPlatformData?.name}
                            type={getPlatformData?.type}
                        />
                        {getPlatformData?.name?.replace(
                            "Freelancer.com",
                            "Freelancer"
                        )}{" "}
                        account: {quotationData?.platform_account?.username}
                    </p>
                    <button
                        onClick={(e) => handlePlatformAccountCard("copy", e)}
                    >
                        {isShow ? <MdDone /> : <IoCopyOutline size={15} />}
                    </button>
                </div>
                <div className="platform_account_card_table">
                    <table>
                        <tbody>
                            <tr>
                                <td>01.</td>
                                <td>{QuotationTableLabel.cms}</td>
                                <td>{quotationData?.project_cms?.cms_name}</td>
                            </tr>
                            <tr>
                                <td>02.</td>
                                <td>{QuotationTableLabel.category}</td>
                                <td>
                                    {
                                        quotationData?.project_niche
                                            ?.category_name
                                    }
                                </td>
                            </tr>
                            <tr>
                                <td>03.</td>
                                <td>{QuotationTableLabel.primary_page}</td>
                                <td>{quotationData?.no_of_primary_pages}</td>
                            </tr>
                            <tr>
                                <td>04.</td>
                                <td>{QuotationTableLabel.secondary_page}</td>
                                <td>{quotationData?.no_of_secondary_pages}</td>
                            </tr>
                            <tr>
                                <td>05.</td>
                                <td>
                                    {QuotationTableLabel.major_functionalities}
                                </td>
                                <td>
                                    {" "}
                                    {quotationData?.no_of_major_functionalities
                                        ? `Yes (${quotationData?.no_of_major_functionalities})`
                                        : "NO"}
                                </td>
                            </tr>
                            <tr>
                                <td>06.</td>
                                <td>{QuotationTableLabel.others_works}</td>
                                <td>
                                    {getHourWithMin(
                                        quotationData?.hours_of_other_works
                                    )}{" "}
                                </td>
                            </tr>
                            <tr>
                                <td>07.</td>
                                <td>{QuotationTableLabel.risk_factors}</td>
                                <td>
                                    {quotationData?.risk_factor
                                        ? `Yes(${quotationData?.risk_factor}%)`
                                        : "No"}
                                </td>
                            </tr>
                            <tr>
                                <td>08.</td>
                                <td>{QuotationTableLabel.currency}</td>
                                <td>
                                    {quotationData?.currency?.currency_name}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <Switch.Case condition={!quotationData?.not_doable_message}>
                    <div className="platform_account_card_footer">
                        <div className="platform_account_card_budget_info">
                            <h5>
                                Estimated Budget:{" "}
                                <span>
                                    $
                                    {
                                        quotationData?.caculated_project_budget_in_usd
                                    }{" "}
                                    USD (Default)
                                </span>
                            </h5>
                            <h6>
                                Amount:{" "}
                                <span>
                                    {quotationData?.currency?.currency_symbol}
                                    {quotationData?.calculated_project_budget}
                                    {
                                        quotationData?.currency?.currency_name
                                    }{" "}
                                    (Client’s Currency)
                                </span>
                            </h6>
                        </div>
                        <div className="platform_account_card_deadline">
                            <p>Deadline</p>
                            <h6>
                                {quotationData?.calculated_no_of_days} day{" "}
                                {getDeadlineText(
                                    priceQuotationsInputs?.deadline_type
                                )}
                                <span>
                                    (
                                    {getHourWithMin(
                                        quotationData?.calculated_total_hours
                                    )}{" "}
                                    )
                                </span>
                            </h6>
                        </div>
                    </div>
                </Switch.Case>
                <Switch.Case condition={quotationData?.not_doable_message}>
                    <div className="platform_account_card_footer_not_doable">
                        <div className="platform_account_card_footer_not_doable_icon">
                            <BiSolidInfoSquare
                                size={25}
                                fill="var(--primaryLightText)"
                                rotate={180}
                            />
                        </div>
                        <p>
                            <span>Error!</span>{" "}
                            {quotationData?.not_doable_message} See price for
                            the same requirements to be delivered in{" "}
                            {quotationData?.calculated_no_of_days} days here.
                        </p>
                    </div>
                </Switch.Case>
            </Switch>
        </button>
    );
};

export default PlatformAccountCard;

PlatformAccountCard.propTypes = {
    quotationData: PropTypes.object,
    selectedPriceQuotation: PropTypes.object,
    setSelectedPriceQuotation: PropTypes.func,
    handleAgainGeneratePriceQuotations: PropTypes.func,
};
