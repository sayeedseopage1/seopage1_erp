import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";

import _ from "lodash";

// Components - UI - Custom
import Button from "../Shared/Button";
import DownloadPdf from "../UI/Icons/DownloadPdf";
import Switch from "../../../../../global/Switch";
import CustomModal from "../UI/CustomModal/CustomModal";
import CustomModalHeader from "../UI/CustomModalHeader/CustomModalHeader";

// Components - Shared - Styled Components
import { ContentWrapper, ModalContentContainer } from "../UI/StyledComponents";

// Constants
import { priceQuotationsState } from "../../pages/PriceQuotations";

// Utils
import {
    isStateAllHaveValue,
    markEmptyFieldsValidation,
} from "../../../../../utils/stateValidation";

// Modal Content
import SubmitPriceQuotation from "./ModalContent/SubmitPriceQuotation";
import ViewPriceQuotation from "./ModalContent/ViewPriceQuotation";
import ViewPriceQuotationsInvoice from "./ModalContent/ViewPriceQuotationsInvoice";

// Dummy Data
import {
    PriceQuotationsInvoiceDummyData,
    QuotationDummyData,
} from "../../constant";
import { usePDF } from "react-to-pdf";


const PriceQuotationsGenerateModal = ({
    isModalOpen,
    closeModal,
    modalTitle,
    priceQuotationsInputs,
    setPriceQuotationsInputs,
}) => {
    const { toPDF, targetRef } = usePDF({filename: 'page.pdf'});
    const [isLoading, setIsLoading] = React.useState(false);
    const [selectedPriceQuotation, setSelectedPriceQuotation] =
        React.useState(null);
    const [extraInfoInputsValidation, setExtraInfoInputsValidation] =
        React.useState({
            isError: false,
            errorText: "",
            is_submitting: false,
        });
    const [
        priceQuotationsInputsValidation,
        setPriceQuotationsInputsValidation,
    ] = React.useState(priceQuotationsState.validation);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setPriceQuotationsInputs((prev) => {
            const updatedInputs = { ...prev };
            if (name === "other_works") {
                const isExist = _.filter(
                    updatedInputs?.other_works,
                    (item) => item?.id === value?.id
                );
                if (isExist?.length) {
                    updatedInputs.other_works =
                        updatedInputs.other_works.filter(
                            (item) => item?.id !== value?.id
                        );
                    updatedInputs.other_works_data =
                        updatedInputs.other_works_data.filter(
                            (item) => item?.parent?.id !== value?.id
                        );
                } else {
                    updatedInputs.other_works = [
                        ...updatedInputs.other_works,
                        value,
                    ];
                }
                setExtraInfoInputsValidation({
                    isError: false,
                    errorText: "",
                    is_submitting: false,
                });
            } else if (name === "client") {
                updatedInputs.deal = {};
                updatedInputs[name] = value;
            } else if (name === "major_works" || name === "risk_factors") {
                updatedInputs[name] = value;
                if (value === "NO") {
                    if (name === "major_works") {
                        updatedInputs.number_of_functionalities = null;
                    } else {
                        updatedInputs.risk_percentage = null;
                    }
                }
            } else {
                updatedInputs[name] = value;
            }
            return updatedInputs;
        });
    };

    /**
     * Validate other works data.
     * @param {Object} inputs - The price quotations inputs.
     * @returns {boolean} True if validation fails, otherwise false.
     */
    const validateOtherWorks = (inputs) => {
        const { other_works, other_works_data } = inputs;
        if (other_works.length === 0) return false;
        const filterSpeedOptimization = other_works.filter(
            (item) => item?.name !== "Speed Optimization"
        );
        if (filterSpeedOptimization.length === 0) return false;
        return filterSpeedOptimization.length !== other_works_data.length;
    };

    const dummyPromise = async () => {
        return new Promise((resolve) => {
            setTimeout(() => {
                const data = {
                    message: "Price Quotation has been Generated Successfully.",
                    data: priceQuotationsInputs,
                    status: 200,
                };
                resolve(data);
            }, 5000);
        });
    };

    const handleSubmitPriceQuotations = async () => {
        const {
            major_works,
            risk_factors,
            other_works,
            other_works_data,
            number_of_functionalities,
            risk_percentage,
            ...formData
        } = priceQuotationsInputs;
        const payload = {
            ...formData,
        };

        if (major_works === "Yes" && number_of_functionalities === null) {
            payload.number_of_functionalities = null;
        }
        if (risk_factors === "Yes" && risk_percentage === null) {
            payload.risk_percentage = null;
        }
        const isEmpty = isStateAllHaveValue(payload);
        if (isEmpty) {
            const validation = markEmptyFieldsValidation(payload);
            setPriceQuotationsInputsValidation({
                ...priceQuotationsInputsValidation,
                ...validation,
                other_works: validateOtherWorks(priceQuotationsInputs),
                is_submitting: true,
            });
            return;
        }
        if (validateOtherWorks(priceQuotationsInputs)) {
            setPriceQuotationsInputsValidation({
                ...priceQuotationsInputsValidation,
                other_works: true,
                is_submitting: true,
            });
            return;
        }

        try {
            setIsLoading(true);
            const res = await dummyPromise();
            if (res.status === 200) {
                toast.success(res.message);
                setPriceQuotationsInputs((prev) => {
                    return {
                        ...prev,
                        step: "view-price-quotation",
                    };
                });
                setIsLoading(false);
            }
        } catch (error) {
            toast.error("Something went wrong");
        }
    };

    const handleViewPriceQuotation = async () => {
        setPriceQuotationsInputs((prev) => {
            return {
                ...prev,
                step: "view-price-quotation-invoice",
            };
        });
    };

    const handleDownloadPDF = async () => {
        toPDF()
    };

    useEffect(() => {
        if (priceQuotationsInputsValidation.is_submitting) {
            const validation = markEmptyFieldsValidation(priceQuotationsInputs);
            setPriceQuotationsInputsValidation({
                ...priceQuotationsInputsValidation,
                ...validation,
                other_works: validateOtherWorks(priceQuotationsInputs),
                other_works_data: false,
                risk_percentage:
                    priceQuotationsInputs?.risk_factors === "Yes" &&
                    !priceQuotationsInputs?.risk_percentage,
                number_of_functionalities:
                    priceQuotationsInputs?.major_works === "Yes" &&
                    !priceQuotationsInputs?.number_of_functionalities,
                is_submitting: true,
            });
        }
    }, [
        priceQuotationsInputs,
        priceQuotationsInputsValidation.is_submitting,
        priceQuotationsInputsValidation.risk_percentage,
        priceQuotationsInputsValidation.number_of_functionalities,
    ]);

    /**
     * Handles the action button based on the current step in the price quotation process.
     *
     * @returns {Object} - An object containing the loading title, button label, and button action.
     * @returns {string} return.loadingTitle - The title displayed while the action is loading.
     * @returns {string} return.buttonLabel - The label of the action button.
     * @returns {Function} return.buttonAction - The function to be executed on button click.
     */
    const handleActionButton = (type) => {
        const submitQuotation = {
            "submit-price-quotation": {
                loadingTitle: "Generating...",
                buttonLabel: "Submit & View",
                buttonAction: handleSubmitPriceQuotations,
            },
            "view-price-quotation": {
                loadingTitle: "Confirming...",
                buttonLabel: "Check Quotation",
                buttonAction: handleViewPriceQuotation,
            },
            "view-price-quotation-invoice": {
                loadingTitle: "Downloading...",
                buttonLabel: <DownloadPdf />,
                buttonAction: handleDownloadPDF,
            },
        };
        return submitQuotation[priceQuotationsInputs.step][type];
    };

    const addWidthDynamically = () => {
        const step = priceQuotationsInputs.step;
        switch (step) {
            case "submit-price-quotation":
                return "1100px";
            case "view-price-quotation":
                return "1300px";
            case "view-price-quotation-invoice":
                return "1300px";
        }
    };

    console.log(selectedPriceQuotation);
    return (
        <CustomModal
            isModalOpen={isModalOpen}
            closeModal={closeModal}
            height="95vh"
            width={addWidthDynamically()}
            isCentered
        >
            <CustomModalHeader title={modalTitle} closeModal={closeModal} />
            <ModalContentContainer
                color="var(--primaryLightDarkBlue)"
                style={{
                    maxHeight: "calc(90vh - 50px)",
                    overflowY: "auto",
                }}
            >
                <Switch>
                    <Switch.Case
                        condition={
                            priceQuotationsInputs.step ===
                            "submit-price-quotation"
                        }
                    >
                        <SubmitPriceQuotation
                            handleInputChange={handleInputChange}
                            priceQuotationsInputs={priceQuotationsInputs}
                            setPriceQuotationsInputs={setPriceQuotationsInputs}
                            extraInfoInputsValidation={
                                extraInfoInputsValidation
                            }
                            setExtraInfoInputsValidation={
                                setExtraInfoInputsValidation
                            }
                            priceQuotationsInputsValidation={
                                priceQuotationsInputsValidation
                            }
                        />
                    </Switch.Case>
                    <Switch.Case
                        condition={
                            priceQuotationsInputs.step ===
                            "view-price-quotation"
                        }
                    >
                        <ViewPriceQuotation
                            quotationData={QuotationDummyData}
                            setSelectedPriceQuotation={
                                setSelectedPriceQuotation
                            }
                            selectedPriceQuotation={selectedPriceQuotation}
                        />
                    </Switch.Case>
                    <Switch.Case
                        condition={
                            priceQuotationsInputs.step ===
                            "view-price-quotation-invoice"
                        }
                    >
                        <ViewPriceQuotationsInvoice
                            invoiceData={PriceQuotationsInvoiceDummyData}
                            targetRef={targetRef}
                        />
                    </Switch.Case>
                </Switch>
                <ContentWrapper className="justify-content-center pt-3">
                    <Button
                        className="mr-2 price_quotation_custom_button price_quotation_custom_button_primary"
                        isLoading={isLoading}
                        disabled={isLoading}
                        loaderTitle={handleActionButton("loadingTitle")}
                        onClick={handleActionButton("buttonAction")}
                    >
                        {handleActionButton("buttonLabel")}
                    </Button>
                    <Button
                        className="price_quotation_custom_button price_quotation_custom_button_danger"
                        isLoading={false}
                        onClick={closeModal}
                        size="md"
                    >
                        Close
                    </Button>
                </ContentWrapper>
            </ModalContentContainer>
        </CustomModal>
    );
};

export default PriceQuotationsGenerateModal;

PriceQuotationsGenerateModal.propTypes = {
    isModalOpen: PropTypes.bool,
    closeModal: PropTypes.func,
    modalTitle: PropTypes.string,
    priceQuotationsInputs: PropTypes.object,
    setPriceQuotationsInputs: PropTypes.func,
};
