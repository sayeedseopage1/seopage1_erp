import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import dayjs from "dayjs";

// Section component
import SaleRiskAuthorizeHeader from "../components/sections/SaleRiskAuthorizeHeader";
import SaleRiskAuthorizeHeaderForUser from "../components/sections/SaleRiskAuthorizeHeaderForUser";

// ui components
import {
    SaleRiskAuthorizeButton,
    SaleRiskAuthorizeTotalPointContainer,
} from "../components/ui/Styles/ui";

// table components
import SalesRiskAuthorizeTable from "../components/table/SalesRiskAuthorizeTable";
import { SalesRiskAuthorizeColumns } from "../components/table/SalesRiskAuthorizeColumns";

// hooks
import { useAuth } from "../../../hooks/useAuth";

// ui components
import Switch from "../components/Switch";

// constants
import { Placeholder } from "../../../global/Placeholder";

// api
import {
    useSaleRiskQuestionDealReportQuery,
    useSaleRiskAnalysisActionsMutation,
    useSaleRiskQuestionDealReportDataQuery,
} from "../../../services/api/salesRiskAnalysisSlice";

// modal
import SaleRiskAuthorizePolicesModal from "../components/modal/SaleRiskAuthorizePolicesModal";
import RuleActionConfirmationModal from "../components/modal/RuleActionConfirmationModal";
import { SalesRiskAuthorizeTableColumnsForUser } from "../components/table/SalesRiskAuthorizeTableColumnsForUser";
import { message } from "laravel-mix/src/Log";

const SalesRiskAuthorize = () => {
    const [answersPoint, setAnswersPoint] = useState([]);
    const [metaInfo, setMetaInfo] = useState({});
    const [isPointNull, setIsPointNull] = useState(false);
    const pathnames = window.location.pathname.split("/");
    const deal_id = pathnames[pathnames?.length - 1];
    const auth = useAuth();
    const [authorizeComment, setAuthorizeComment] = useState("");

    const pathWiseApiCall = pathnames.includes("contracts")
        ? useSaleRiskQuestionDealReportQuery
        : useSaleRiskQuestionDealReportDataQuery;

    // modal state
    const [isSaleRiskAuthorizeModalOpen, setIsSaleRiskAuthorizeModalOpen] =
        useState(false);

    const [saleRiskActionModalOpen, setSaleRiskActionModalOpen] =
        useState(false);
    const [statusActionData, setStatusActionData] = React.useState({});

    // fetch data
    const { data, isLoading, isSuccess, isFetching } = pathWiseApiCall(deal_id);
    useEffect(() => {
        if (data?.data && !isLoading) {
            if (
                data?.data.points === null &&
                data?.message === "Policy question value not found"
            ) {
                setIsPointNull(true);
                console.log("null data")
            } else {
                const { pointData, questionData, ...rest } = data?.data ?? {};
                if (auth.getRoleId() === 1) {
                    const formatData = Object.entries(
                        data?.data?.pointData
                    ).map(([key, value]) => {
                        return {
                            ...value,
                            key: key,
                            id: key,
                        };
                    });

                    setAnswersPoint(formatData);
                } else {
                    const sortData = [...questionData]?.sort(
                        (a, b) => Number(a.id) - Number(b.id)
                    );
                    setAnswersPoint(sortData);
                }
                setMetaInfo({
                    ...rest,
                    role: auth.getRoleId(),
                });
                setIsPointNull(false);
            }
        }
    }, [data?.data, isLoading]);

    // project extend images Api call
    const [saleRiskAnalysisActionHandler, { isLoading: isActionLoading }] =
        useSaleRiskAnalysisActionsMutation();

    // handle authorize and deny
    const handleAuthorize = async () => {
        try {
            let payload = {
                deal_id: deal_id,
                status: Number(statusActionData.status),
            };
            if (authorizeComment) {
                payload.comment = authorizeComment;
            }
            const res = await saleRiskAnalysisActionHandler(payload);
            if (res?.data) {
                // show success message
                handleCloseSaleRiskActionModal();
                setStatusActionData({});
                if (statusActionData.status === "1") {
                    toast.success("Sale Risk Analysis Authorized Successfully");
                } else {
                    toast.success("Sale Risk Analysis Denied Successfully");
                }
            }
        } catch (error) {
            toast.error("Something went wrong");
        }
    };

    const handleAuthorizeAndDeny = (status) => {
        setStatusActionData({
            status: status,
            modalType: "Deal",
        });
        handleOpenSaleRiskActionModal();
    };

    // handle open and close modal
    const handleOpenAuthorizeModal = () => {
        setIsSaleRiskAuthorizeModalOpen(true);
    };
    const handleCloseAuthorizeModal = () => {
        setIsSaleRiskAuthorizeModalOpen(false);
    };

    const handleOpenSaleRiskActionModal = () => {
        setSaleRiskActionModalOpen(true);
    };
    const handleCloseSaleRiskActionModal = () => {
        setSaleRiskActionModalOpen(false);
    };

    /**
     * Checks if the given status is either "pending" or "analysis".
     *
     * @param {string} status - The status to check.
     * @param {boolean} [shouldExcludePendingAndAnalysis=false] - If true, the function returns true for statuses other than "pending" or "analysis".
     * @returns {boolean} Returns true if the status is "pending" or "analysis" (or the opposite if `shouldExcludePendingAndAnalysis` is true), false otherwise.
     */
    const getDealStatus = (status, shouldExcludePendingAndAnalysis = false) => {
        return shouldExcludePendingAndAnalysis
            ? !["pending", "analysis"].includes(status)
            : ["pending", "analysis"].includes(status);
    };

    const FilterSaleRiskTableColumnByRole = () => {
        if (auth.getRoleId() === 1) {
            return SalesRiskAuthorizeColumns;
        } else {
            return SalesRiskAuthorizeTableColumnsForUser;
        }
    };

    return (
        <React.Fragment>
            <section className="mt-2">
                <div className="d-flex justify-content-start align-items-center">
                    <button
                        className="btn btn-primary py-1 d-flex justify-content-center align-items-center"
                        onClick={() => {
                            window.location.href =
                                "/account/sales-analysis-reports";
                        }}
                    >
                        <MdOutlineKeyboardBackspace className="mr-2" />
                        <span>Back</span>
                    </button>
                </div>
                <Switch>
                    {/* 
                    Sale Risk Analysis Header for before authorize and deny
                */}
                    <Switch.Case condition={auth.getRoleId() === 1}>
                        <SaleRiskAuthorizeHeader
                            headerData={metaInfo}
                            isLoading={isLoading}
                            handleOpenAuthorizeModal={handleOpenAuthorizeModal}
                        />
                    </Switch.Case>
                    {/* 
                    Sale Risk Analysis Header for User after authorize and deny
                */}
                    <Switch.Case condition={auth.getRoleId() === 8}>
                        <SaleRiskAuthorizeHeaderForUser
                            headerData={metaInfo}
                            isLoading={isLoading}
                        />
                    </Switch.Case>
                </Switch>
                {/* Sale Risk Analysis Table */}
                <div className="sp1_tlr_container">
                    <div className="sp1_tlr_tbl_container mx-0 py-3">
                        {/* sales risk analysis table */}
                        <SalesRiskAuthorizeTable
                            tableColumns={FilterSaleRiskTableColumnByRole()}
                            tableName="SalesRiskAuthorizeTable"
                            tableData={answersPoint}
                            isLoading={isLoading}
                            isFetching={isFetching}
                        />

                        {/* Total points achieved container */}

                        <Switch.Case condition={auth.getRoleId() === 1}>
                            <SaleRiskAuthorizeTotalPointContainer
                                background={`${
                                    metaInfo?.points >= 0
                                        ? "#bcf5a1"
                                        : "#FFDCDC "
                                }`}
                            >
                                <p>Total Points Achieved :</p>
                                <span>
                                    {isLoading ? (
                                        <div className="d-flex justify-content-end flex-column align-items-end mr-2">
                                            <Placeholder
                                                width="50px"
                                                height="15px"
                                                className="mb-1"
                                            />
                                        </div>
                                    ) : (
                                        <span
                                            style={{
                                                color:
                                                    metaInfo?.points >= 0
                                                        ? "#000"
                                                        : "#F66 ",
                                            }}
                                        >
                                            {metaInfo?.points}
                                        </span>
                                    )}
                                </span>
                            </SaleRiskAuthorizeTotalPointContainer>
                        </Switch.Case>

                        {/* Sale risk authorize button */}

                        <Switch.Case
                            condition={
                                auth.getRoleId() === 1 &&
                                getDealStatus(
                                    metaInfo?.deal?.sale_analysis_status
                                ) &&
                                !isLoading &&
                                !isFetching
                            }
                        >
                            <div className="d-flex justify-content-center align-items-center mt-4">
                                <SaleRiskAuthorizeButton
                                    color="#1492E6"
                                    onClick={() => {
                                        handleAuthorizeAndDeny("1");
                                    }}
                                    disabled={isActionLoading}
                                >
                                    Authorize
                                </SaleRiskAuthorizeButton>
                                <SaleRiskAuthorizeButton
                                    className="ml-2"
                                    border="1px solid #F66"
                                    textColor="#F66"
                                    onClick={() => {
                                        handleAuthorizeAndDeny("0");
                                    }}
                                    disabled={isActionLoading}
                                >
                                    Deny
                                </SaleRiskAuthorizeButton>
                            </div>
                        </Switch.Case>
                        <Switch.Case
                            condition={
                                auth.getRoleId() === 8 &&
                                getDealStatus(
                                    metaInfo?.deal?.sale_analysis_status
                                )
                            }
                        >
                            <div className="d-flex justify-content-center align-items-center mt-4">
                                <p
                                    style={{
                                        width: "20%",
                                        backgroundColor: "#28a745",
                                        color: "#fff",
                                        cursor: "pointer",
                                        padding: "9px 11px",
                                        borderRadius: "0.25rem",
                                        textAlign: "center",
                                        textTransform: "uppercase",
                                    }}
                                >
                                    in {metaInfo?.deal?.sale_analysis_status}
                                </p>
                            </div>
                        </Switch.Case>

                        {/*  after authorize or den*/}
                        <Switch.Case
                            condition={getDealStatus(
                                metaInfo?.deal?.sale_analysis_status,
                                true
                            )}
                        >
                            <div className="d-flex justify-content-center align-items-center mt-4">
                                <Switch>
                                    <Switch.Case
                                        condition={
                                            metaInfo?.deal
                                                ?.sale_analysis_status ==
                                            "auto-authorized"
                                        }
                                    >
                                        <div className="d-flex flex-column justify-content-center">
                                            <div className="d-flex justify-content-center mb-3">
                                                <p
                                                    style={{
                                                        width: "50%",
                                                        backgroundColor:
                                                            "#28a745",
                                                        color: "#fff",
                                                        cursor: "pointer",
                                                        padding: "9px 11px",
                                                        borderRadius: "0.25rem",
                                                        textAlign: "center",
                                                        textTransform:
                                                            "uppercase",
                                                    }}
                                                >
                                                    {
                                                        metaInfo?.deal
                                                            ?.sale_analysis_status
                                                    }
                                                </p>
                                            </div>
                                            <div className="alert alert-success text-center">
                                                This won deal was{" "}
                                                <a
                                                    href={`/account/employees/${metaInfo?.authorizeBy?.id}`}
                                                    className="badge badge-success"
                                                    style={{
                                                        color: "#fff !important",
                                                    }}
                                                >
                                                    Automatically Authorized
                                                </a>{" "}
                                                on{" "}
                                                <span className="badge badge-success">
                                                    {dayjs(
                                                        metaInfo?.deal
                                                            ?.sale_authorize_on
                                                    ).format("MMM DD, YYYY")}
                                                </span>{" "}
                                                at{" "}
                                                <span className="badge badge-success">
                                                    {dayjs(
                                                        metaInfo?.deal
                                                            ?.sale_authorize_on
                                                    ).format("hh:mm A")}
                                                </span>{" "}
                                            </div>
                                        </div>
                                    </Switch.Case>
                                    <Switch.Case
                                        condition={
                                            metaInfo?.deal
                                                ?.sale_analysis_status ===
                                            "authorized"
                                        }
                                    >
                                        <div className="d-flex flex-column justify-content-center">
                                            <div className="d-flex justify-content-center mb-3">
                                                <div
                                                    style={{
                                                        width: "50%",
                                                        backgroundColor:
                                                            "#28a745",
                                                        color: "#fff",
                                                        cursor: "pointer",
                                                        padding: "9px 11px",
                                                        borderRadius: "0.25rem",
                                                        textAlign: "center",
                                                    }}
                                                >
                                                    Authorized
                                                </div>
                                            </div>
                                            <div className="alert alert-success text-center">
                                                This won deal is Authorized by{" "}
                                                <a
                                                    href={`/account/employees/${metaInfo?.authorizeBy?.id}`}
                                                    className="badge badge-success"
                                                    style={{
                                                        color: "#fff !important",
                                                    }}
                                                >
                                                    {
                                                        metaInfo?.authorizeBy
                                                            ?.name
                                                    }
                                                </a>{" "}
                                                on{" "}
                                                <span className="badge badge-success">
                                                    {dayjs(
                                                        metaInfo?.deal
                                                            ?.sale_authorize_on
                                                    ).format("MMM DD, YYYY")}
                                                </span>{" "}
                                                at{" "}
                                                <span className="badge badge-success">
                                                    {dayjs(
                                                        metaInfo?.deal
                                                            ?.sale_authorize_on
                                                    ).format("hh:mm A")}
                                                </span>{" "}
                                            </div>
                                        </div>
                                    </Switch.Case>
                                    <Switch.Case
                                        condition={
                                            metaInfo?.deal
                                                ?.sale_analysis_status ===
                                            "denied"
                                        }
                                    >
                                        <div className="d-flex flex-column justify-content-center">
                                            <div className="d-flex justify-content-center mb-3">
                                                <div
                                                    style={{
                                                        width: "50%",
                                                        backgroundColor:
                                                            "#D30000",
                                                        color: "#fff",
                                                        cursor: "pointer",
                                                        padding: "9px 11px",
                                                        borderRadius: "0.25rem",
                                                        textAlign: "center",
                                                    }}
                                                >
                                                    Denied
                                                </div>
                                            </div>
                                            <div className="alert alert-danger text-center">
                                                This Deal is Denied by{" "}
                                                <a
                                                    href={`/account/employees/${metaInfo?.authorizeBy?.id}`}
                                                    className="badge badge-danger"
                                                    style={{
                                                        color: "#fff !important",
                                                    }}
                                                >
                                                    {
                                                        metaInfo?.authorizeBy
                                                            ?.name
                                                    }
                                                </a>{" "}
                                                on{" "}
                                                <span className="badge badge-danger">
                                                    {dayjs(
                                                        metaInfo?.deal
                                                            ?.sale_authorize_on
                                                    ).format("MMM DD, YYYY")}
                                                </span>{" "}
                                                at{" "}
                                                <span className="badge badge-danger">
                                                    {dayjs(
                                                        metaInfo?.deal
                                                            ?.sale_authorize_on
                                                    ).format("hh:mm A")}
                                                </span>{" "}
                                            </div>
                                        </div>
                                    </Switch.Case>
                                </Switch>
                            </div>
                        </Switch.Case>
                    </div>
                </div>
            </section>
            {isSaleRiskAuthorizeModalOpen && (
                <SaleRiskAuthorizePolicesModal
                    open={isSaleRiskAuthorizeModalOpen}
                    closeModal={handleCloseAuthorizeModal}
                    salesRiskAnalysisRules={metaInfo}
                    isLoading={isLoading}
                />
            )}
            {saleRiskActionModalOpen && (
                <RuleActionConfirmationModal
                    open={saleRiskActionModalOpen}
                    closeModal={handleCloseSaleRiskActionModal}
                    statusActionData={statusActionData}
                    handleStatusUpdate={handleAuthorize}
                    isLoading={isActionLoading}
                    isInputShow={true}
                    setInputValue={setAuthorizeComment}
                    modalContent={{
                        0: "Deny",
                        1: "Authorize",
                    }}
                />
            )}
        </React.Fragment>
    );
};

export default SalesRiskAuthorize;
