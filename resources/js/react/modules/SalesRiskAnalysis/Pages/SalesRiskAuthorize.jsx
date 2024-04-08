import React, { useEffect, useState } from "react";

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
import { DummyHeaderData, DummyQuestionsPoints } from "../constant";
import { Placeholder } from "../../../global/Placeholder";

// api
import {
    useLazySaleRiskAnalysisActionsQuery,
    useSaleRiskQuestionDealReportQuery,
} from "../../../services/api/salesRiskAnalysisSlice";
import Toaster from "../../../global/Toaster";

const SalesRiskAuthorize = () => {
    const [status, setStatus] = useState("");
    const [answersPoint, setAnswersPoint] = useState([]);
    const [metaInfo, setMetaInfo] = useState({});
    const pathnames = window.location.pathname.split("/");
    const deal_id = pathnames[pathnames?.length - 1];
    const auth = useAuth();

    // fetch data
    const { data, isLoading } = useSaleRiskQuestionDealReportQuery(deal_id);
    useEffect(() => {
        if (data?.data && !isLoading) {
            const { pointData, ...rest } = data?.data;
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
        }
    }, [data?.data, isLoading]);

    const [] = useLazySaleRiskAnalysisActionsQuery();

    // project extend images Api call
    const [
        saleRiskAnalysisActionHandler,
        {
            data: saleRiskAnalysisActions,
            isLoading: saleRiskAnalysisActionsLoading,
        },
    ] = useLazySaleRiskAnalysisActionsQuery();

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
                if (status === "authorize") {
                    toast.success("Sale Risk Analysis Authorized Successfully");
                } else {
                    toast.success("Sale Risk Analysis Denied Successfully");
                }
            }
        } catch (error) {}
    };

    return (
        <section>
            <Switch>
                <Switch.Case condition={auth.getRoleId() === 1}>
                    <SaleRiskAuthorizeHeader
                        headerData={metaInfo}
                        isLoading={isLoading}
                    />
                </Switch.Case>
                <Switch.Case condition={auth.getRoleId() === 7}>
                    <SaleRiskAuthorizeHeaderForUser
                        headerData={DummyHeaderData}
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
                                            metaInfo?.points > 0
                                                ? "#000"
                                                : "#F66",
                                    }}
                                >
                                    {metaInfo?.points}
                                </span>
                            )}
                        </span>
                    </SaleRiskAuthorizeTotalPointContainer>

                    {/* Sale risk authorize button */}
                    <Switch>
                        <Switch.Case condition={auth.getRoleId() === 1}>
                            <div className="d-flex justify-content-center align-items-center">
                                <SaleRiskAuthorizeButton
                                    color="#1492E6"
                                    onClick={() => {
                                        handleAuthorize(1);
                                    }}
                                    disabled={isLoading}
                                >
                                    {isLoading && status === 1
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
                                    disabled={isLoading}
                                >
                                    {isLoading && status === 1
                                        ? "Saving.."
                                        : "Deny"}
                                </SaleRiskAuthorizeButton>
                            </div>
                        </Switch.Case>
                    </Switch>
                </div>
            </div>
        </section>
    );
};

export default SalesRiskAuthorize;
