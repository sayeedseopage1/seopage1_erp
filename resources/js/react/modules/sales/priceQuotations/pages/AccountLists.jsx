import React, { useEffect } from "react";
import { IoAddSharp } from "react-icons/io5";

// Components - Global - Styled Components
import { Flex } from "../../../../global/styled-component/Flex";
import Button from "../../../../global/Button";

// Components - Shared
import RefreshButton from "../components/Shared/RefreshButton";

// Table
import { AccountListTableColumns } from "../components/Table/AccountListTableColumns";
import DataTable from "../components/Table/DataTable";

// Dummy Data
import { AccountListDummyData } from "../constant";

// Modal
import CreatePlatformAccountModal from "../components/Modal/CreatePlatformAccountModal";

const AccountLists = () => {
    const [isLoading, setIsLoading] = React.useState(true);
    const [, /*filter*/ setFilter] = React.useState();
    // Modal State
    const [isPlatformAccountModalOpen, setIsPlatformAccountModalOpen] =
        React.useState(false);

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

    // Handle Modal Open and Close Function with Action Function as Parameter (if needed)
    const handleModal = (setModalOpenFunc, isOpen, action) => {
        setModalOpenFunc(isOpen);
        if (action) {
            action();
        }
    };

    return (
        <React.Fragment>
            <div className="price_quotations_container">
                {/* Price Quotations Table */}
                <div className="sp1_tlr_container">
                    <div className="sp1_tlr_tbl_container platform_account_table mx-0 pb-3">
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
                                            setIsPlatformAccountModalOpen,
                                            true
                                        )
                                    }
                                >
                                    <IoAddSharp /> Create Account
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
                            tableName="accountLists"
                            tableData={{
                                data: AccountListDummyData,
                                from: 1,
                                to: 10,
                                total: 10,
                                last_page: 1,
                                pageSize: 10,
                                pageIndex: 0,
                            }}
                            tableColumns={AccountListTableColumns}
                            isLoading={isLoading}
                            justifyStyleColumn={{
                                profile_type: "center",
                                generated_on: "center",
                                multiplying_factor: "center",
                                action: "center",
                            }}
                        />
                    </div>
                </div>
            </div>

            {/* Modal */}

            {isPlatformAccountModalOpen && (
                <CreatePlatformAccountModal
                    isModalOpen={isPlatformAccountModalOpen}
                    closeModal={() =>
                        handleModal(setIsPlatformAccountModalOpen, false)
                    }
                />
            )}
        </React.Fragment>
    );
};

export default AccountLists;
