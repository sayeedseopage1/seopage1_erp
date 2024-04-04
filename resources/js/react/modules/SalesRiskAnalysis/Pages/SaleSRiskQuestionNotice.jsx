import React from "react";
import InfoIcon from "../components/ui/InfoIcon";

const SaleSRiskQuestionNotice = () => {
    const handleSaveQuestionAnswer = () => {}
    const isLoading = false;
    return (
        <div
            className="d-flex align-items-center justify-content-center flex-column py-4 px-3 px-md-5"
            style={{
                height: "calc(100vh - 190px)",
            }}
        >
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
                This won deal has a negative risk analysis score hence it has to
                be authorized by the top management. You can still submit the
                larger form and it will be assigned to a project manager right
                after it will be authorized.
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
        </div>
    );
};

export default SaleSRiskQuestionNotice;
