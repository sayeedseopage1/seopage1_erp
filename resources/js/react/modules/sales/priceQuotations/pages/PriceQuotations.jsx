import React, { useContext, useEffect } from "react";
import { MdFormatListBulletedAdd } from "react-icons/md";

// Section Components
import PriceQuotationFilterBar from "../components/Section/PriceQuotationFilterBar";

// Components - Global - Styled Components
import { Flex } from "../../../../global/styled-component/Flex";

// Components - Shared
import Button from "../components/Shared/Button";
import RefreshButton from "../components/Shared/RefreshButton";
import PriceQuotationsGenerateModal from "../components/Modal/PriceQuotationsGenerateModal";

// Table Components
import { PriceQuotationsTableColumns } from "../components/Table/PriceQuotationsTableColumns";
import DataTable from "../components/Table/DataTable";

// testing
import useWhyDidYouRender from "../../../../hooks/useWhyDidYouRender";

// Context
import {
    PriceQuotationsContext,
    priceQuotationsState,
} from "../context/PriceQuotationsProvider";

// Services
import { useAllPriceQuotationsQuery } from "../../../../services/api/priceQuotationsApiSlice";

const PriceQuotations = () => {
    useWhyDidYouRender("PriceQuotations");

    // Context
    const { priceQuotationsInputs, setPriceQuotationsInputs } = useContext(
        PriceQuotationsContext
    );

    const [isPriceQuotationModalOpen, setIsPriceQuotationModalOpen] =
        React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);
    const [, /*filter*/ setFilter] = React.useState();


    // All Price Quotations Query
    const {
        data: priceQuotationsResponse,
        isLoading: isPriceQuotationsLoading,
        isFetching: isPriceQuotationsFetching,
        refetch: priceQuotationsRefetch,
    } = useAllPriceQuotationsQuery();

    // Price Quotations Data
    const priceQuotationsData = priceQuotationsResponse?.data || {};
    // price quotations data loading
    const isPriceQuotationsDataLoading =
        isPriceQuotationsLoading || isPriceQuotationsFetching;

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

    // Modal Title
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
                            onClick={priceQuotationsRefetch}
                            isLoading={isLoading}
                            className="font-weight-normal price_quotation_refresh_button border-0"
                        />
                    </Flex>
                    <DataTable
                        tableName="priceQuotations"
                        tableData={priceQuotationsData}
                        tableColumns={PriceQuotationsTableColumns}
                        tableActions={{}}
                        isLoading={isPriceQuotationsDataLoading}
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
