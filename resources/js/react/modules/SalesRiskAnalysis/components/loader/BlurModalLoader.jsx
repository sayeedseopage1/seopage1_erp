import React from "react";
import PropTypes from "prop-types";

import { ModalButton } from "../ui/Styles/ui";
import { Flex } from "../../../../global/styled-component/Flex";
import Switch from "../Switch";

// styles
import "../Styles/salesRiskAnalysisTableColumns.css";

const BlurModalLoader = ({
    handleCloseAddQuestionsModal,
    disableAddOtherRuleQuestion,
    setDisableAddOtherRuleQuestion,
}) => {
    const pathName = window.location.pathname;
    return (
        <div
            style={{
                position: "absolute",
                top: 0,
                left: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                height: "60vh",
                fontSize: "20px",
                fontWeight: "bold",
                zIndex: 1,
                background: "rgba(255, 255, 255, 0.8)",
                padding: "0 30px",
            }}
        >
            <div
                style={{
                    padding: "25px",
                    background: "#fff",
                    boxShadow: "0 0 6px rgba(0, 0, 0, .1)",
                    borderRadius: "15px",
                    fontFamily: "Poppins, sans-serif",
                    textAlign: "center",
                }}
            >
                <h6>
                    No <span className="badge badge-warning">Yes No rule</span>{" "}
                    currently exists for adding questions. Please add a new
                    rule first.
                </h6>
                <Flex gap="10px" className="mt-4" justifyContent="center">
                    <Switch>
                        <Switch.Case
                            condition={
                                pathName !== "/account/sales-risk-policies"
                            }
                        >
                            <ModalButton
                                onClick={() => {
                                    window.open("/account/sales-risk-policies", "_blank");
                                }}
                                width="200px"
                                color="#1492E6"
                                border="1px solid #1492E6"
                                textColor="white"
                            >
                                Add Rule
                            </ModalButton>
                        </Switch.Case>
                    </Switch>
                    <ModalButton
                        onClick={handleCloseAddQuestionsModal}
                        width="200px"
                        color="white"
                        border="1px solid #1492E6"
                        textColor="#1492E6"
                    >
                        Do it latter
                    </ModalButton>
                </Flex>
                {/* <Flex gap="10px" className="mt-4" justifyContent="center">
                    <div
                        className={`custom-control custom-switch`}
                        style={{
                            cursor: "pointer",
                        }}
                    >
                        <input
                            type="checkbox"
                            checked={!disableAddOtherRuleQuestion}
                            readOnly
                            onClick={() => {
                                setDisableAddOtherRuleQuestion(
                                    !disableAddOtherRuleQuestion
                                );
                            }}
                            id="customSwitch2"
                            className="custom-control-input"
                        />
                        <label
                            className={`custom-control-label ${
                                disableAddOtherRuleQuestion
                                    ? "sales_risk_status_toggle_not_checked"
                                    : "sales_risk_status_toggle_checked"
                            }`}
                            title={
                                disableAddOtherRuleQuestion
                                    ? "Enable Now"
                                    : "Disable Now"
                            }
                            htmlFor="customSwitch2"
                            style={{
                                cursor: "pointer",
                            }}
                        >
                            Enable to Add Other Rule Question
                        </label>{" "}
                    </div>
                </Flex> */}
            </div>
        </div>
    );
};

export default BlurModalLoader;

BlurModalLoader.propTypes = {
    handleCloseAddQuestionsModal: PropTypes.func,
};
