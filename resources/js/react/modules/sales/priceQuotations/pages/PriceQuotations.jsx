import React, { useContext } from "react";
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

// Context
import {
    PriceQuotationsContext,
    priceQuotationsState,
} from "../context/PriceQuotationsProvider";

// Services
import { useAllPriceQuotationsQuery } from "../../../../services/api/priceQuotationsApiSlice";
import { useCopyToClipboard } from "react-use";
import { getHourWithMin } from "../helper";
import { toast } from "react-toastify";

const PriceQuotations = () => {
    // Context
    const {
        clientsData,
        isClientsLoading,
        userListData,
        priceQuotationsInputs,
        setPriceQuotationsInputs,
        priceQuotationsResponse,
        setPriceQuotationsResponse,
    } = useContext(PriceQuotationsContext);
    const [state, copyToClipboard] = useCopyToClipboard();
    const [isCopyed, setIsCopyed] = React.useState(false);
    const [isPriceQuotationModalOpen, setIsPriceQuotationModalOpen] =
        React.useState(false);
    const [filter, setFilter] = React.useState();
    const [{ pageIndex, pageSize }, setPagination] = React.useState({
        pageIndex: 0,
        pageSize: 10,
    });

    // make query string
    const queryString = (object) => {
        const queryObject = _.pickBy(object, Boolean);
        return new URLSearchParams(queryObject).toString();
    };

    // All Price Quotations Query
    const {
        data: priceQuotationsResponseData,
        isLoading: isPriceQuotationsLoading,
        isFetching: isPriceQuotationsFetching,
        refetch: priceQuotationsRefetch,
    } = useAllPriceQuotationsQuery(
        queryString({
            page: pageIndex + 1,
            limit: pageSize,
            ...filter,
        }),
        {
            refetchOnMountOrArgChange: true,
        }
    );

    // Price Quotations Data
    const priceQuotationsData = priceQuotationsResponseData?.data || {};
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

    const metaAction = {
        viewPDf: (columnData) => {
            setPriceQuotationsInputs((prev) => {
                return {
                    ...prev,
                    step: "view-price-quotation-invoice",
                };
            });
            setPriceQuotationsResponse({
                ...priceQuotationsResponse,
                invoiceData: columnData,
            });
            handleModal(setIsPriceQuotationModalOpen, true);
        },
        copyToClipBoard: (columnData) => {
            handleCopyData(columnData);
        },
    };

    const handleCopyData = (quotationData) => {
        const {
            project_cms,
            project_niche,
            no_of_primary_pages,
            no_of_secondary_pages,
            no_of_major_functionalities,
            hours_of_other_works,
            risk_factor,
            currency,
            usd_budget_with_additional_percent,
            actual_budget_with_additional_percent,
            no_of_days,
            total_calculated_hours,
        } = quotationData || {};

        const formattedData = [
            `CMS Name: ${project_cms?.cms_name}`,
            `Project Category: ${project_niche?.category_name}`,
            `No. Primary Page Need: ${no_of_primary_pages}`,
            `No. Secondary Page Need: ${no_of_secondary_pages}`,
            `Any Major Functionalities Needed: ${
                no_of_major_functionalities || 0
            }`,
            `How Many Hours of Other Works Needed: ${
                hours_of_other_works || 0
            }`,
            `Risk Factors: ${risk_factor || 0}%`,
            `Currency: ${currency?.currency_name}`,
            `Estimated Budget: $${usd_budget_with_additional_percent} USD (Default)`,
            `Amount: ${currency?.currency_symbol}${actual_budget_with_additional_percent} ${currency?.currency_code}  (Client’s Currency)`,
            `Deadline: ${no_of_days} day but not be rigid (${getHourWithMin(
                total_calculated_hours
            )})`,
        ].join(",\n");

        toast.info("Price Quotations Copy on clipboard");
        copyToClipboard(formattedData);
    };

    // Pagination
    const onPageChange = (paginate) => {
        setPagination(paginate);
    };

    return (
        <div className="price_quotations_container">
            {/* Price Quotations Filter */}
            <PriceQuotationFilterBar
                setFilter={setFilter}
                clientsData={clientsData}
                userListData={userListData}
            />

            {/* Price Quotations Table */}
            <div className="sp1_tlr_container">
                <div className="sp1_tlr_tbl_container mx-0 pb-3">
                    <Flex
                        justifyContent="space-between"
                        alignItem="center"
                        className="mb-3 sp1_tlr_tbl_action_buttons"
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
                            isLoading={isPriceQuotationsDataLoading}
                            className="font-weight-normal price_quotation_refresh_button border-0"
                        />
                    </Flex>
                    <DataTable
                        tableName="priceQuotations"
                        tableData={priceQuotationsData}
                        tableColumns={PriceQuotationsTableColumns}
                        tableActions={metaAction}
                        isLoading={isPriceQuotationsDataLoading}
                        justifyStyleColumn={{
                            requested_on: "center",
                            primary_page: "center",
                            secondary_page: "center",
                            other_works_needed: "center",
                            system_suggested_price: "center",
                            project_budget: "center",
                            action: "center",
                        }}
                        onPageChange={onPageChange}
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
                            setPriceQuotationsResponse({
                                ...priceQuotationsResponse,
                                isNotDoAble: false,
                            });
                        })
                    }
                />
            )}
        </div>
    );
};

export default PriceQuotations;
