import React from "react";
import PropTypes from "prop-types";

// Components - UI - Custom
import PlatformAccountCard from "../../UI/PlatformAccountCard/PlatformAccountCard";

const ViewPriceQuotation = ({
    quotationData,
    selectedPriceQuotation,
    setSelectedPriceQuotation,
    handleAgainGeneratePriceQuotations 
}) => {
    return (
        <div className="view_price_Quotation_wrapper">
            {quotationData?.data?.map((quotation) => {
                return (
                    <PlatformAccountCard
                        quotationData={quotation}
                        setSelectedPriceQuotation={setSelectedPriceQuotation}
                        selectedPriceQuotation={selectedPriceQuotation}
                        handleAgainGeneratePriceQuotations={handleAgainGeneratePriceQuotations}
                    />
                );
            })}
        </div>
    );
};

export default ViewPriceQuotation;

ViewPriceQuotation.propTypes = {
    quotationData: PropTypes.object,
    selectedPriceQuotation: PropTypes.object,
    setSelectedPriceQuotation: PropTypes.func,
    handleAgainGeneratePriceQuotations: PropTypes.func
};
