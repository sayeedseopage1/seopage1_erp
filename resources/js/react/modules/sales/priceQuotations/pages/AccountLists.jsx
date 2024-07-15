import React, { useEffect } from "react";
import { IoAddSharp } from "react-icons/io5";
import Swal from "sweetalert2";
import dayjs from "dayjs";

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

const platformAccountState = {
    inputs: {
        type: {},
        user_name: "",
        user_url: "",
        account_email: "",
        profile_type: {},
        generated_on: null,
        multiplying_factor: "",
        is_information_accurate: false,
    },
};

const AccountLists = () => {
    const [isPlatformAccountUpdate, setIsPlatformAccountUpdate] =
        React.useState(false);
    const [modalTitle, setModalTitle] = React.useState(
        "Create A New Platform Account"
    );
    const [platformAccountInputs, setPlatformAccountInputs] = React.useState(
        platformAccountState.inputs
    );
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

    // table actions
    const metaAction = {
        editPlatformAccount: (data) => {
            setIsPlatformAccountUpdate(true);
            setPlatformAccountInputs({
                ...data,
                generated_on: dayjs(data.generated_on, "YYYY/MM/DD"),
                is_information_accurate: true,
            });
            setModalTitle("Update Platform Account");
            handleModal(setIsPlatformAccountModalOpen, true);
        },
        disablePlatformAccount: (data) => {
            showConfirmation({
                text:  data.is_active ? "Disable" : "Enable",
            });
        },
    };

    const showConfirmation = ({text}) => {
        let actionText  = `Yes, ${text} it!`
        Swal.fire({
            title: "Are you sure?",
            text: `You want to ${text} this account.`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "var(--primaryBlue)",
            cancelButtonColor: "var(--primaryDanger)",
            confirmButtonText: actionText,
            preConfirm: () => {
                Swal.showLoading();
                return handleConfirm()
            }
        })
    };

    const handleConfirm = async () => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(true);
                Swal.fire({
                    icon: "success",
                    title: "Account has been disabled",
                    showConfirmButton: false,
                    timer: 1500,
                });
            }, 1500);
        });
    }

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
                            tableActions={metaAction}
                        />
                    </div>
                </div>
            </div>

            {/* Modal */}

            {isPlatformAccountModalOpen && (
                <CreatePlatformAccountModal
                    isModalOpen={isPlatformAccountModalOpen}
                    closeModal={() =>
                        handleModal(
                            setIsPlatformAccountModalOpen,
                            false,
                            () => {
                                setIsPlatformAccountUpdate(false);
                                setPlatformAccountInputs(
                                    platformAccountState.inputs
                                );
                                setModalTitle("Create A New Platform Account");
                            }
                        )
                    }
                    setPlatformAccountInputs={setPlatformAccountInputs}
                    platformAccountInputs={platformAccountInputs}
                    isPlatformAccountUpdate={isPlatformAccountUpdate}
                    modalTitle={modalTitle}
                />
            )}
        </React.Fragment>
    );
};

export default AccountLists;
