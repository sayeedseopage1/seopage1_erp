import React from "react";
import { IoAddSharp } from "react-icons/io5";
import Swal from "sweetalert2";
import dayjs from "dayjs";
import { toast } from "react-toastify";

// Components - Global - Styled Components
import { Flex } from "../../../../global/styled-component/Flex";
import Button from "../../../../global/Button";

// Components - Shared
import RefreshButton from "../components/Shared/RefreshButton";

// Table
import { AccountListTableColumns } from "../components/Table/AccountListTableColumns";
import DataTable from "../components/Table/DataTable";

// Modal
import CreatePlatformAccountModal from "../components/Modal/CreatePlatformAccountModal";

// API
import {
    useGetAllPlatformAccountsQuery,
    useUpdateStatusPlatformAccountMutation,
} from "../../../../services/api/platformAccountApiSlice";

const platformAccountState = {
    inputs: {
        type: {},
        username: "",
        name: "",
        user_url: "",
        email: "",
        profile_type: {},
        generated_on: null,
        multiplying_factor: "",
        confirmation_of_data_accuracy: false,
    },
};

const AccountLists = () => {
    const [{ pageIndex, pageSize }, setPagination] = React.useState({
        pageIndex: 0,
        pageSize: 10,
    });
    const [isPlatformAccountUpdate, setIsPlatformAccountUpdate] =
        React.useState(false);
    const [modalTitle, setModalTitle] = React.useState(
        "Create A New Platform Account"
    );
    const [platformAccountInputs, setPlatformAccountInputs] = React.useState(
        platformAccountState.inputs
    );

    // Modal State
    const [isPlatformAccountModalOpen, setIsPlatformAccountModalOpen] =
        React.useState(false);

    // make query string
    const queryString = (object) => {
        const queryObject = _.pickBy(object, Boolean);
        return new URLSearchParams(queryObject).toString();
    };

    const { data, isLoading, isFetching, refetch } =
        useGetAllPlatformAccountsQuery(
            `?${queryString({
                page: pageIndex + 1,
                limit: pageSize,
            })}`,
            {
                refetchOnMountOrArgChange: true,
            }
        );

    const platformAccounts = data?.data || [];
    const isPlatformAccountLoading = isLoading || isFetching;

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
                text: data?.status === 1 ? "Disable" : "Enable",
                data: data,
            });
        },
    };

    // Update Platform Account Mutation
    const [updateStatusPlatformAccount] =
        useUpdateStatusPlatformAccountMutation();

    // Show Confirmation Dialog
    const showConfirmation = ({ text, data }) => {
        let actionText = `Yes, ${text} it!`;
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
                return handleConfirm(data);
            },
        });
    };

    // Handle Status Update
    const handleConfirm = async (data) => {
        try {
            const payload = {
                id: data.id,
                status: data.status === 1 ? 0 : 1,
            };
            const response = await updateStatusPlatformAccount(
                payload
            ).unwrap();
            if (response.status === "success") {
                toast.success(response.message);
            }
        } catch (error) {
            console.log("error", error);
            toast.error("Something went wrong. Please try again later.");
        }
    };

    // Pagination
    const onPageChange = (paginate) => {
        setPagination(paginate);
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
                            className="mb-3 d-flex"
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
                                isLoading={isPlatformAccountLoading}
                                className="font-weight-normal price_quotation_refresh_button border-0"
                            />
                        </Flex>
                        <DataTable
                            tableName="accountLists"
                            tableData={platformAccounts}
                            tableColumns={AccountListTableColumns}
                            isLoading={isPlatformAccountLoading}
                            justifyStyleColumn={{
                                profile_type: "center",
                                generated_on: "center",
                                multiplying_factor: "center",
                                action: "center",
                            }}
                            tableActions={metaAction}
                            onPageChange={onPageChange}
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
