import React, { useEffect } from "react";
import { MdFormatListBulletedAdd } from "react-icons/md";

// Section Components
import PriceQuotationFilterBar from "../components/Section/PriceQuotationFilterBar";

// Components - Global - Styled Components
import { Flex } from "../../../../global/styled-component/Flex";
import Button from "../../../../global/Button";

// Components - Shared
import RefreshButton from "../components/Shared/RefreshButton";

// Table Components
import { PriceQuotationsTableColumns } from "../components/Table/PriceQuotationsTableColumns";
import DataTable from "../components/Table/DataTable";

// Dummy Data
import { PriceQuotationsDummyData } from "../constant";

const PriceQuotations = () => {
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
        </div>
    );
};

export default PriceQuotations;
