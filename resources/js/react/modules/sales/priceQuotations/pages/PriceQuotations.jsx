import React, { useEffect } from "react";
import { MdFormatListBulletedAdd } from "react-icons/md";

// Section Components
import PriceQuotationFilterBar from "../components/Section/PriceQuotationFilterBar";

// Components - Global - Styled Components
import { Flex } from "../../../../global/styled-component/Flex";

// Components - Shared
import RefreshButton from "../components/Shared/RefreshButton";
import PriceQuotationsGenerateModal from "../components/Modal/PriceQuotationsGenerateModal";
import Button from "../components/Shared/Button";

// Table Components
import { PriceQuotationsTableColumns } from "../components/Table/PriceQuotationsTableColumns";
import DataTable from "../components/Table/DataTable";

// Dummy Data
import { PriceQuotationsDummyData } from "../constant";
import useWhyDidYouRender from "../../../../hooks/useWhyDidYouRender";

export const priceQuotationsState = {
    inputs: {
        cms: {},
        category: {},
        primary_page: null,
        secondary_page: null,
        major_works: null,
        number_of_functionalities: null,
        other_works: [],
        risk_factors: null,
        risk_percentage: null,
        other_works_data: [],
        client: {},
        deal: {},
        client_currency: {},
        deadline: null,
        platform_account: {},
        step: "view-price-quotation-invoice",
    },
    validation: {
        cms: false,
        category: false,
        primary_page: false,
        client: false,
        deal: false,
        secondary_page: false,
        major_works: false,
        other_works: false,
        risk_factors: false,
        client_currency: false,
        deadline: false,
        platform_account: false,
        is_submitting: false,
    },
};

const PriceQuotations = () => {
    useWhyDidYouRender("PriceQuotations");

    const [priceQuotationsInputs, setPriceQuotationsInputs] = React.useState(
        priceQuotationsState.inputs
    );
    const [isPriceQuotationModalOpen, setIsPriceQuotationModalOpen] =
        React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);
    const [, /*filter*/ setFilter] = React.useState();

    // Dummy  refetch
    const refetch = () => {
        setIsLoading(true);
    };

    // Dummy filter
    useEffect(() => {
        if (isLoading) {
            setTimeout(() => {
                setIsLoading(false);
            }, 3000);
        }
    }, [isLoading]);

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
        <div className="price_quotations_container">
            {/* Price Quotations Filter */}
            <PriceQuotationFilterBar setFilter={setFilter} />

            {/* Price Quotations Table */}
            <div className="sp1_tlr_container">
                <div className="sp1_tlr_tbl_container mx-0 pb-3">
                    <Flex
                        justifyContent="space-between"
                        alignItem="center"
                        className="mb-3"
                    >
                        <div className="d-flex flex-wrap flex-md-nowrap">
                            <Button
                                className="bg-success border-0 font-weight-normal"
                                size="md"
                                onClick={() =>
                                    handleModal(
                                        setIsPriceQuotationModalOpen,
                                        true
                                    )
                                }
                            >
                                <MdFormatListBulletedAdd /> Get Price Quotations
                            </Button>
                        </div>
                        {/* refresh */}
                        <RefreshButton
                            onClick={refetch}
                            isLoading={isLoading}
                            className="font-weight-normal price_quotation_refresh_button border-0"
                        />
                    </Flex>
                    <DataTable
                        tableName="priceQuotations"
                        tableData={{
                            data: PriceQuotationsDummyData,
                            from: 1,
                            to: 10,
                            total: 10,
                            last_page: 1,
                            pageSize: 10,
                            pageIndex: 0,
                        }}
                        tableColumns={PriceQuotationsTableColumns}
                        tableActions={{}}
                        isLoading={isLoading}
                        justifyStyleColumn={{
                            requested_on: "center",
                            primary_page: "center",
                            secondary_page: "center",
                            other_works_needed: "center",
                            system_suggested_price: "center",
                            project_budget: "center",
                        }}
                        sortingColumn={["clients"]}
                    />
                </div>
            </div>

            {/* Modal */}

            {/* Gat Price Quotations Modal */}
            {isPriceQuotationModalOpen && (
                <PriceQuotationsGenerateModal
                    modalTitle={handleModalTitle()}
                    isModalOpen={isPriceQuotationModalOpen}
                    priceQuotationsInputs={priceQuotationsInputs}
                    setPriceQuotationsInputs={setPriceQuotationsInputs}
                    closeModal={() =>
                        handleModal(setIsPriceQuotationModalOpen, false, () => {
                            setPriceQuotationsInputs(
                                priceQuotationsState.inputs
                            );
                        })
                    }
                />
            )}
        </div>
    );
};

export default PriceQuotations;
