import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { MdOutlineKeyboardBackspace } from "react-icons/md";

// Section component
import SaleRiskAuthorizeHeader from "../components/sections/SaleRiskAuthorizeHeader";
import SaleRiskAuthorizeHeaderForUser from "../components/sections/SaleRiskAuthorizeHeaderForUser";
import NoQuestionsValueAuthorizePage from "../components/sections/NoQuestionsValueAuthorizePage";

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
} from "../../../services/api/salesRiskAnalysisSlice";

// loader
import SaleRiskAuthorizeHeaderLoader from "../components/loader/SaleRiskAuthorizeHeaderLoader";
import Loader from "../components/Loader";
import SaleRiskAuthorizePolicesModal from "../components/modal/SaleRiskAuthorizePolicesModal";

const SalesRiskAuthorize = () => {
    const [status, setStatus] = useState("");
    const [answersPoint, setAnswersPoint] = useState([]);
    const [metaInfo, setMetaInfo] = useState({});
    const [isReportGenerated, setIsReportGenerated] = useState({
        isGenerated: "",
        message: "",
        points: "",
    });

    const pathnames = window.location.pathname.split("/");
    const deal_id = pathnames[pathnames?.length - 1];
    const auth = useAuth();

    // modal state
    const [isSaleRiskAuthorizeModalOpen, setIsSaleRiskAuthorizeModalOpen] =
        useState(false);

    // fetch data
    const { data, isLoading, isSuccess, isFetching } =
        useSaleRiskQuestionDealReportQuery(deal_id);
    useEffect(() => {
        if (data?.data && !isLoading) {
            if (data?.status === "error" && data?.data.points === null) {
                setIsReportGenerated({
                    isGenerated: "pending",
                    message: data?.message,
                    points: data?.data?.points,
                });
                return;
            } else {
                const { pointData, ...rest } = data?.data ?? {};
                const formatData = Object.entries(data?.data?.pointData).map(
                    ([key, value]) => {
                        return {
                            ...value,
                            key: key,
                            id: key,
                        };
                    }
                );
                setMetaInfo({
                    ...rest,
                });
                setAnswersPoint(formatData);
                setIsReportGenerated({
                    isGenerated: "completed",
                    message: data?.message,
                    points: data?.data?.points,
                });
            }
        } else {
        }
    }, [data?.data, isLoading]);

    // project extend images Api call
    const [saleRiskAnalysisActionHandler, { isLoading: isActionLoading }] =
        useSaleRiskAnalysisActionsMutation();

    // handle authorize and deny
    const handleAuthorize = async (status) => {
        try {
            setStatus(status);
            let payload = {
                deal_id: deal_id,
                status: status,
            };
            const res = await saleRiskAnalysisActionHandler(payload);
            if (res?.data) {
                // show success message
                if (status === 1) {
                    toast.success("Sale Risk Analysis Authorized Successfully");
                } else {
                    toast.success("Sale Risk Analysis Denied Successfully");
                }
            }
        } catch (error) {
            toast.error("Something went wrong");
        }
    };

    const handleOpenAuthorizeModal = () => {
        setIsSaleRiskAuthorizeModalOpen(true);
    };

    const handleCloseAuthorizeModal = () => {
        setIsSaleRiskAuthorizeModalOpen(false);
    };

    return (
        <React.Fragment>
            <Switch>
                {/* 
                for loading state

            */}
                <Switch.Case condition={isLoading && !isSuccess}>
                    <div
                        className="d-flex justify-content-center align-items-center"
                        style={{
                            height: "calc(100vh - 275px)",
                        }}
                    >
                        <Loader width="50px" height="50px" title="" />
                    </div>
                </Switch.Case>
                {/* 
                show questions and answers
            */}
                <Switch.Case condition={!isLoading && isSuccess}>
                    {/* 
                    if no questions available
                */}
                    <Switch.Case
                        condition={isReportGenerated.isGenerated === "pending"}
                    >
                        <NoQuestionsValueAuthorizePage />
                    </Switch.Case>

                    {/* 
                    if questions available
                */}
                    <Switch.Case
                        condition={
                            isReportGenerated.isGenerated === "completed"
                        }
                    >
                        <section>
                            <div className="d-flex justify-content-start align-items-center">
                                <button
                                    className="btn btn-primary py-1 d-flex justify-content-center align-items-center"
                                    onClick={() => {
                                        window.history.back();
                                    }}
                                >
                                    <MdOutlineKeyboardBackspace className="mr-2" />
                                    <span>Back</span>
                                </button>
                            </div>
                            <Switch>
                                <Switch.Case condition={isLoading}>
                                    <SaleRiskAuthorizeHeaderLoader />
                                </Switch.Case>
                                <Switch.Case
                                    condition={
                                        auth.getRoleId() === 1 &&
                                        metaInfo?.deal?.status === "pending" &&
                                        !isLoading
                                    }
                                >
                                    <SaleRiskAuthorizeHeader
                                        headerData={metaInfo}
                                        isLoading={isLoading}
                                        handleOpenAuthorizeModal={
                                            handleOpenAuthorizeModal
                                        }
                                    />
                                </Switch.Case>
                                <Switch.Case
                                    condition={
                                        auth.getRoleId() === 1 &&
                                        metaInfo?.deal?.status !== "pending" &&
                                        !isLoading
                                    }
                                >
                                    <SaleRiskAuthorizeHeaderForUser
                                        headerData={metaInfo}
                                        isLoading={isLoading}
                                    />
                                </Switch.Case>
                            </Switch>
                            <div className="sp1_tlr_container">
                                <div className="sp1_tlr_tbl_container mx-0 py-3">
                                    {/* sales risk analysis table */}
                                    <SalesRiskAuthorizeTable
                                        tableColumns={SalesRiskAuthorizeColumns}
                                        tableName="SalesRiskAuthorizeTable"
                                        tableData={answersPoint}
                                        isLoading={isLoading}
                                        isFetching={isFetching}
                                    />
                                    <SaleRiskAuthorizeTotalPointContainer
                                        className="mb-4"
                                        background="#FFDCDC"
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
                                                            metaInfo?.points >=
                                                            0
                                                                ? "#000"
                                                                : "#F66 ",
                                                    }}
                                                >
                                                    {metaInfo?.points}
                                                </span>
                                            )}
                                        </span>
                                    </SaleRiskAuthorizeTotalPointContainer>

                                    {/* Sale risk authorize button */}
                                    <Switch>
                                        <Switch.Case
                                            condition={
                                                auth.getRoleId() === 1 &&
                                                metaInfo?.deal?.status ===
                                                    "pending"
                                            }
                                        >
                                            <div className="d-flex justify-content-center align-items-center">
                                                <SaleRiskAuthorizeButton
                                                    color="#1492E6"
                                                    onClick={() => {
                                                        handleAuthorize(1);
                                                    }}
                                                    disabled={isActionLoading}
                                                >
                                                    {isActionLoading &&
                                                    status == 1
                                                        ? "Authorizing.."
                                                        : "Authorize"}
                                                </SaleRiskAuthorizeButton>
                                                <SaleRiskAuthorizeButton
                                                    className="ml-2"
                                                    border="1px solid #F66"
                                                    textColor="#F66"
                                                    onClick={() => {
                                                        handleAuthorize(0);
                                                    }}
                                                    disabled={isActionLoading}
                                                >
                                                    {isActionLoading &&
                                                    status == 0
                                                        ? "Denying.."
                                                        : "Deny"}
                                                </SaleRiskAuthorizeButton>
                                            </div>
                                        </Switch.Case>
                                        {/* 
                                    
                                        Sale Risk Analysis Action Button for User
                                    */}
                                        <Switch.Case
                                            condition={
                                                auth.getRoleId() === 1 &&
                                                metaInfo?.deal?.status !==
                                                    "pending"
                                            }
                                        >
                                            <div className="d-flex justify-content-center align-items-center">
                                                <SaleRiskAuthorizeButton
                                                    className="ml-2 text-uppercase"
                                                    border={`1px solid ${
                                                        metaInfo?.deal?.status?.includes(
                                                            "accept"
                                                        )
                                                            ? "#218838"
                                                            : "#F66"
                                                    }`}
                                                    textColor="#fff"
                                                    color={
                                                        metaInfo?.deal?.status?.includes(
                                                            "accept"
                                                        )
                                                            ? "#218838"
                                                            : "#F66"
                                                    }
                                                >
                                                    {metaInfo?.deal?.status}
                                                </SaleRiskAuthorizeButton>
                                            </div>
                                        </Switch.Case>
                                    </Switch>
                                </div>
                            </div>
                        </section>
                    </Switch.Case>
                </Switch.Case>
            </Switch>
            {isSaleRiskAuthorizeModalOpen && (
                <SaleRiskAuthorizePolicesModal
                    open={isSaleRiskAuthorizeModalOpen}
                    closeModal={handleCloseAuthorizeModal}
                />
            )}
        </React.Fragment>
    );
};

export default SalesRiskAuthorize;
