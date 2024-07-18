import React, { useContext, useEffect } from "react";
import PropTypes from "prop-types";
import { useSearchParams } from "react-router-dom";

// Components - Modal
import PriceQuotationsGenerateModal from "../components/Modal/PriceQuotationsGenerateModal";

// Context
import { PriceQuotationsContext } from "../context/PriceQuotationsProvider";

const DealStagePriceQuotations = () => {
    // Context
    const { priceQuotationsInputs, setPriceQuotationsInputs } = useContext(
        PriceQuotationsContext
    );

    const [isPriceQuotationModalOpen, setIsPriceQuotationModalOpen] =
        React.useState(false);

    const pathName = window?.location?.pathname?.split("deals/")?.pop();

    /**
     * Toggles the state of a modal and optionally executes an additional action.
     *
     * @param {Function} setModalOpenFunc - Function to set the modal open state.
     * @param {boolean} isOpen - Boolean indicating whether the modal should be open (true) or closed (false).
     * @param {Function} [action] - Optional function to execute after setting the modal state.
     */
    const handleModal = (setModalOpenFunc, isOpen, action) => {
        setModalOpenFunc(isOpen);
        if (action) {
            action();
        }
    };

    const container = document.getElementById("priceQuotationForm");

    useEffect(() => {
        if (container) {
            const dealName = container.getAttribute("data-deal_name");
            const clientName = container.getAttribute("data-client_name");

            const clientData = {
                id: 1,
                name: clientName,
            };

            const dealStageData = {
                id: pathName,
                name: dealName,
            };
            setPriceQuotationsInputs((prevState) => ({
                ...prevState,
                client: clientData,
                deal_stage_id: dealStageData,
            }));
        }
    }, []);

    const handleModalTitle = () => {
        const titleList = {
            "submit-price-quotation": "Get A Price Quotations",
            "view-price-quotation": "View Price Quotations",
            "view-price-quotation-invoice":
                "View & Download Price Quotations Invoice",
        };
        return titleList[priceQuotationsInputs.step];
    };

    return (
        <>
            <div class="text-center">
                <button
                    class="btn btn-success w-40"
                    onClick={() =>
                        handleModal(setIsPriceQuotationModalOpen, true)
                    }
                >
                    Generate Price Quotation
                </button>
            </div>
            {isPriceQuotationModalOpen && (
                <PriceQuotationsGenerateModal
                    isModalOpen={isPriceQuotationModalOpen}
                    closeModal={() =>
                        handleModal(setIsPriceQuotationModalOpen, false)
                    }
                    modalTitle={handleModalTitle()}
                    priceQuotationsInputs={priceQuotationsInputs}
                    setPriceQuotationsInputs={setPriceQuotationsInputs}
                    isDealStagePage
                />
            )}
        </>
    );
};

export default DealStagePriceQuotations;

DealStagePriceQuotations.propTypes = {};
