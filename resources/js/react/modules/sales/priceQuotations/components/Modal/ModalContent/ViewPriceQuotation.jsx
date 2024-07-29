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
            {quotationData?.data?.map((quotation) => {
                return (
                    <PlatformAccountCard
                        key={quotation.id}
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
    quotationData: PropTypes.object,
    selectedPriceQuotation: PropTypes.object,
    setSelectedPriceQuotation: PropTypes.func,
};
