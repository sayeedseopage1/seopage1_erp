import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import { usePDF } from "react-to-pdf";

import _ from "lodash";

// Components - UI - Custom
import Button from "../Shared/Button";
import DownloadPdf from "../UI/Icons/DownloadPdf";
import Switch from "../../../../../global/Switch";
import CustomModal from "../UI/CustomModal/CustomModal";
import CustomModalHeader from "../UI/CustomModalHeader/CustomModalHeader";

// Components - Shared - Styled Components
import { ContentWrapper, ModalContentContainer } from "../UI/StyledComponents";

// Utils
import {
    isStateAllHaveValue,
    markEmptyFieldsValidation,
} from "../../../../../utils/stateValidation";

// Modal Content
import SubmitPriceQuotation from "./ModalContent/SubmitPriceQuotation";
import ViewPriceQuotation from "./ModalContent/ViewPriceQuotation";
import ViewPriceQuotationsInvoice from "./ModalContent/ViewPriceQuotationsInvoice";

// Context
import {
    PriceQuotationsContext,
    priceQuotationsState,
} from "../../context/PriceQuotationsProvider";

// Helper
import {
    formatInvoiceData,
    formatPriceQuotationsForPayload,
} from "../../helper/formatData";
import { useCreatePriceQuotationMutation } from "../../../../../services/api/priceQuotationsApiSlice";
import { useReactToPrint } from "react-to-print";

const PriceQuotationsGenerateModal = ({
    isModalOpen,
    closeModal,
    modalTitle,
    isDealStagePage = false,
    priceQuotationsInputs,
    setPriceQuotationsInputs,
}) => {
    const { priceQuotationsResponse, setPriceQuotationsResponse } = useContext(
        PriceQuotationsContext
    );
    const [printPreparing, setPrintPreparing] = React.useState(false);
    const [isPDFDownloading, setIsPDFDownloading] = useState(false);
    const { toPDF, targetRef } = usePDF();
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
                updatedInputs.deal_stage_id = {};
                updatedInputs[name] = value;
            } else if (name === "major_works" || name === "risk_factor") {
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

    const [createPriceQuotation, { isLoading: isCreatingPriceQuotation }] =
        useCreatePriceQuotationMutation();

    const handleSubmitPriceQuotations = async () => {
        const {
            major_works,
            risk_factor,
            other_works,
            other_works_data,
            no_of_major_functionalities,
            risk_percentage,
            no_of_days,
            ...formData
        } = priceQuotationsInputs;
        const payload = {
            ...formData,
        };

        if (major_works === "Yes" && no_of_major_functionalities === null) {
            payload.no_of_major_functionalities = null;
        }
        if (risk_factor === "Yes" && risk_percentage === null) {
            payload.risk_percentage = null;
        }

        if (formData?.deadline_type?.name === "Fixed" && no_of_days === null) {
            payload.no_of_days = null;
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
            const payload = {
                ...formatPriceQuotationsForPayload(priceQuotationsInputs),
                is_selected: 0,
            };
            const res = await createPriceQuotation(payload).unwrap();
            if (res.status === 200) {
                toast.success(res.message);
                setPriceQuotationsInputs((prev) => {
                    return {
                        ...prev,
                        step: "view-price-quotation",
                    };
                });
                const formatPayload = {
                    data: res.data,
                    previous_payloads: res.previous_payloads,
                    mainData: payload,
                    isNotDoAble: res?.data?.some(
                        (item) => item?.not_doable_message
                    ),
                };
                setPriceQuotationsResponse(formatPayload);
            }
        } catch (error) {
            toast.error("Something went wrong");
        }
    };

    // Check Price Quotation
    const handleViewPriceQuotation = async () => {
        try {
            const payload = {
                ...priceQuotationsResponse.previous_payloads,
                is_selected: 1,
                platform_account_id:
                    selectedPriceQuotation?.platform_account?.id,
            };
            const res = await createPriceQuotation(payload).unwrap();
            if (res.status === 200) {
                setPriceQuotationsResponse((prev) => {
                    return {
                        ...prev,
                        invoiceData: res?.data,
                    };
                });
                setPriceQuotationsInputs((prev) => {
                    return {
                        ...prev,
                        step: "view-price-quotation-invoice",
                    };
                });
            }
        } catch (error) {
            toast.error("Something went wrong");
        }
    };

    const handleAgainGeneratePriceQuotations = async (priceQuotations) => {
        try {
            const payload = {
                ...priceQuotationsResponse.previous_payloads,
                is_selected: 0,
                no_of_days: priceQuotations?.calculated_no_of_days,
            };
            const res = await createPriceQuotation(payload).unwrap();
            if (res.status === 200) {
                setPriceQuotationsResponse((prev) => {
                    return {
                        ...prev,
                        data: res?.data,
                        isNotDoAble: res?.data?.some(
                            (item) => item?.not_doable_message
                        ),
                    };
                });
                setPriceQuotationsInputs((prev) => {
                    return {
                        ...prev,
                        step: "view-price-quotation",
                    };
                });
            }
        } catch (error) {
            toast.error("Something went wrong");
        }
    };

    // Download PDF Function
    const handleDownloadPDF = async () => {
        setIsPDFDownloading(true);

         toPDF({
            filename: `Invoice-${priceQuotationsResponse?.invoiceData.serial_no}.pdf`,
        });

        setIsPDFDownloading(false);
    };

    // Validation
    useEffect(() => {
        if (priceQuotationsInputsValidation.is_submitting) {
            const validation = markEmptyFieldsValidation(priceQuotationsInputs);
            setPriceQuotationsInputsValidation({
                ...priceQuotationsInputsValidation,
                ...validation,
                other_works: validateOtherWorks(priceQuotationsInputs),
                other_works_data: false,
                risk_percentage:
                    priceQuotationsInputs?.risk_factor === "Yes" &&
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
                // Here add condition for if is not do able true then it will show this
                loadingTitle: priceQuotationsResponse?.isNotDoAble
                    ? "Generating..."
                    : "Confirming...",
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
                return "1450px";
            case "view-price-quotation-invoice":
                return "1300px";
        }
    };

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
                            priceQuotationsInputs?.step ===
                            "submit-price-quotation"
                        }
                    >
                        <SubmitPriceQuotation
                            handleInputChange={handleInputChange}
                            isDealStagePage={isDealStagePage}
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
                            priceQuotationsInputs?.step ===
                            "view-price-quotation"
                        }
                    >
                        <ViewPriceQuotation
                            quotationData={priceQuotationsResponse}
                            setSelectedPriceQuotation={
                                setSelectedPriceQuotation
                            }
                            handleAgainGeneratePriceQuotations={
                                handleAgainGeneratePriceQuotations
                            }
                            selectedPriceQuotation={selectedPriceQuotation}
                        />
                    </Switch.Case>
                    <Switch.Case
                        condition={
                            priceQuotationsInputs?.step ===
                                "view-price-quotation-invoice" &&
                            priceQuotationsResponse?.invoiceData !== null
                        }
                    >
                        <ViewPriceQuotationsInvoice
                            invoiceData={formatInvoiceData(
                                priceQuotationsResponse?.invoiceData
                            )}
                            targetRef={targetRef}
                        />
                    </Switch.Case>
                </Switch>
                <ContentWrapper className="justify-content-center pt-3">
                    <Button
                        className="mr-2 price_quotation_custom_button price_quotation_custom_button_primary"
                        isLoading={isCreatingPriceQuotation || isPDFDownloading}
                        disabled={
                            isCreatingPriceQuotation ||
                            priceQuotationsResponse?.isNotDoAble ||
                            (priceQuotationsInputs?.step ===
                                "view-price-quotation" &&
                                !selectedPriceQuotation?.platform_account
                                    ?.id) ||
                            isPDFDownloading
                        }
                        loaderTitle={handleActionButton("loadingTitle")}
                        onClick={handleActionButton("buttonAction")}
                    >
                        {handleActionButton("buttonLabel")}
                    </Button>
                    <Button
                        className="price_quotation_custom_button price_quotation_custom_button_danger d-flex align-items-center justify-content-center"
                        isLoading={false}
                        onClick={closeModal}
                        size="md"
                        style={{ minWidth: "220px" }}
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
    isDealStagePage: PropTypes.bool,
    priceQuotationsInputs: PropTypes.object,
    setPriceQuotationsInputs: PropTypes.func,
};
