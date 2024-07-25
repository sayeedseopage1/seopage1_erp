import React, { useContext, useEffect } from "react";

// Components - Modal
import PriceQuotationsGenerateModal from "../components/Modal/PriceQuotationsGenerateModal";

// Context
import { PriceQuotationsContext, priceQuotationsState } from "../context/PriceQuotationsProvider";

const DealStagePriceQuotations = () => {
    // Context
    const {
        priceQuotationsInputs,
        setPriceQuotationsInputs,
        priceQuotationsResponse,
        setPriceQuotationsResponse,
    } = useContext(PriceQuotationsContext);

    const [isPriceQuotationModalOpen, setIsPriceQuotationModalOpen] =
        React.useState(false);

    const pathName = window?.location?.pathname?.split("deals/")?.pop();

    /**
     * Toggles the state of a modal and optionally executes an additional action.
     *
     * @param {Function} setModalOpenFunc - Function to set the modal open state.
     * @param {boolean} isOpen - Boolean indicating whether the modal should be open (true) or closed (false).
     * @param {Function} [action] - Optional function to execute after setting the modal state.
     * @returns - void
     */
    const handleModal = (setModalOpenFunc, isOpen, action) => {
        setModalOpenFunc(isOpen);
        if (action) {
            action();
        }
    };

    // first get id then access to Deal name and client name on modal to auto fill up
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

    // Helper function for
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
            {/* This button show when deal stage === 2 */}
            <div className="text-center">
                <button
                    className="btn btn-success w-40"
                    onClick={() =>
                        handleModal(setIsPriceQuotationModalOpen, true)
                    }
                >
                    Generate Price Quotation
                </button>
            </div>

            {/* This modal will open on   */}
            {isPriceQuotationModalOpen && (
                <PriceQuotationsGenerateModal
                    isModalOpen={isPriceQuotationModalOpen}
                    closeModal={() =>
                        handleModal(setIsPriceQuotationModalOpen, false, () => {
                            setPriceQuotationsInputs(
                                priceQuotationsState.inputs
                            );
                            setPriceQuotationsResponse({
                                ...priceQuotationsResponse,
                                isNotDoAble: false,
                            });
                        })
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
