import React from "react";
import PropTypes from "prop-types";


import './dashboardCardPricingInfo.css'

const DashboardCardPricingInfo = ({
    title,
    amount,
    currency,
    currency_symbol,
    icon,
    className = "",
}) => {
    return (
        <div className={`dashboardCardPricingInfo ${className}`}>
            <div className="mr-2">
                <h5 className="mb-0">
                    {title} {currency && `(${currency})`}
                </h5>
            </div>
            <div className="dashboardCardCurrencyInfo">
                <img src={icon} alt={title} />
                <p className="mb-0">
                    <span>{currency_symbol}</span> {amount}
                </p>
            </div>
        </div>
    );
};

export default DashboardCardPricingInfo;

DashboardCardPricingInfo.propTypes = {
    title: PropTypes.string,
    amount: PropTypes.string.isRequired,
    currency: PropTypes.string,
    currency_symbol: PropTypes.string,
    icon: PropTypes.string,
    className: PropTypes.string,
};
