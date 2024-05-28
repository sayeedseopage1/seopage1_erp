import React from "react";
import PropTypes from "prop-types";

// style
import "./dashboardCardPricingInfo.css";

// helper
import { handleLoadingComponent } from "../../../helper";

// loader
import TextLoaderDynamic from "../../loader/TextLoaderDynamic";

const DashboardCardPricingInfo = ({
    title,
    amount,
    currency,
    currency_symbol,
    icon,
    className = "",
    isLoading,
    loaderInformation,
}) => {
    return (
        <div className={`dashboardCardPricingInfo ${className}`}>
            {title && (
                <div className="mr-2">
                    <h5>
                        {title} {currency && `(${currency})`}
                    </h5>
                </div>
            )}
            <div className="dashboardCardCurrencyInfo">
                {icon && <img src={icon} alt={title} />}
                {handleLoadingComponent(
                    isLoading,
                    <TextLoaderDynamic
                        number={loaderInformation?.number}
                        height={loaderInformation?.height}
                        parentClassName={loaderInformation?.parentClassName}
                        className={loaderInformation?.className}
                        fullSizeCount={loaderInformation?.fullSizeCount}
                        widthDeference={loaderInformation?.widthDeference}
                    />,
                    <p className="mb-0">
                        <span>{currency_symbol}</span> {amount}
                    </p>
                )}
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
    isLoading: PropTypes.bool,
    loaderInformation: PropTypes.object,
};
