import React from "react";
import PropTypes from "prop-types";

// Components - UI - Custom
import PlatformAccountCard from "../../UI/PlatformAccountCard/PlatformAccountCard";

const ViewPriceQuotation = ({
    quotationData,
    selectedPriceQuotation,
    setSelectedPriceQuotation,
}) => {
    return (
        <div className="view_price_Quotation_wrapper">
            {quotationData.map((quotation) => {
                return (
                    <PlatformAccountCard
                        quotationData={quotation}
                        setSelectedPriceQuotation={setSelectedPriceQuotation}
                        selectedPriceQuotation={selectedPriceQuotation}
                    />
                );
            })}
        </div>
    );
};

export default ViewPriceQuotation;

ViewPriceQuotation.propTypes = {
    quotationData: PropTypes.array,
    selectedPriceQuotation: PropTypes.object,
    setSelectedPriceQuotation: PropTypes.func,
};
