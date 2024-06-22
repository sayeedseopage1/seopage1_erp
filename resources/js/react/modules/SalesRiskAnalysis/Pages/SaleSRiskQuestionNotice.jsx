import React, { useEffect, useState } from "react";
import { IoCloseCircle } from "react-icons/io5";

// Icons
import InfoIcon from "../components/ui/InfoIcon";

// ui components
import Switch from "../components/Switch";

const SaleSRiskQuestionNotice = () => {
    const isLoading = false;
    const [redirectUrl, setRedirectUrl] = useState("");
    const [dealStatus, setDealStatus] = useState("");

    useEffect(() => {
        const getAttribute = document.getElementById("salePolicyData");
        const salePolicyData = getAttribute.getAttribute("data-redirect-url");
        setRedirectUrl(salePolicyData);
    }, []);

    useEffect(() => {
        const getAttribute = document.getElementById(
            "salePolicyQuestionNotice"
        );
        const dealStatus = getAttribute.getAttribute("data-status");
        setDealStatus(dealStatus);
    }, []);

    // move to next page
    const handleSaveQuestionAnswer = () => {
        window.location.href = redirectUrl;
    };

    return (
        <div
            className="d-flex align-items-center justify-content-center flex-column py-4 px-3 px-md-5"
            style={{
                height: "calc(100vh - 190px)",
            }}
        >
            <Switch>
                <Switch.Case condition={dealStatus !== "denied"}>
                    <InfoIcon />
                    <p
                        className="text-center py-4 w-50 w-md-100"
                        style={{
                            textAlign: "center",
                            fontFamily: "Poppins",
                            fontSize: "16px",
                            fontStyle: "normal",
                            fontWeight: 400,
                            lineHeight: "normal",
                        }}
                    >
                        This won deal has a negative risk analysis score hence
                        it has to be authorized by the top management. You can
                        still submit the larger form and it will be assigned to
                        a project manager right after it will be authorized.
                    </p>
                    <button
                        className="btn btn-primary"
                        style={{
                            width: "250px",
                        }}
                        onClick={handleSaveQuestionAnswer}
                        disabled={isLoading}
                    >
                        {isLoading ? "Saving..." : "Continue"}
                    </button>
                </Switch.Case>
                <Switch.Case condition={dealStatus === "denied"}>
                    <IoCloseCircle
                        size={94}
                        fill="#FF0000"
                    />
                    <p
                        className="text-center py-2 w-50 w-md-100 mt-2"
                        style={{
                            textAlign: "center",
                            fontFamily: "Poppins",
                            fontSize: "16px",
                            fontStyle: "normal",
                            fontWeight: 400,
                            lineHeight: "normal",
                        }}
                    >
                        This won deal had a negative risk analysis score and after careful considerations, it was denied by the top management.
                    </p>
                </Switch.Case>
            </Switch>
        </div>
    );
};

export default SaleSRiskQuestionNotice;
