import React from "react";
import PropTypes from "prop-types";

//icons
import { IoClose } from "react-icons/io5";

// modal
import CustomModal from "../ui/CustomModal/CustomModal";

// table
import { SaleRiskAuthorizePolicesModalTableColumns } from "../table/SaleRiskAuthorizePolicesModalTableColumns";
import SaleRiskAuthorizePolicesModalTable from "../table/SaleRiskAuthorizePolicesModalTable";

// ui components
import { ModalCloseButton } from "../ui/Styles/ui";

const SaleRiskAuthorizePolicesModal = ({
    open,
    closeModal,
    salesRiskAnalysisRules,
    isLoading,
}) => {
    return (
        <CustomModal
            open={open}
            closeModal={closeModal}
            contentLabel="Add New Policy"
            width="80vw"
            maxHeight="80dvh"
            paddingTop="7px"
            isCloseButtonShow={false}
        >
            <React.Fragment>
                <div
                    className="d-flex justify-content-between align-items-center"
                    style={{
                        padding: "10px 10px",
                        borderRadius: "10px",
                        backdropFilter: "blur(30px)",
                        backgroundColor: "#e9e9e9",
                        border: "1px solid rgba(255, 255, 255, 0.089)",
                        cursor: "pointer",
                    }}
                >
                    <h6 className="mb-0">Sale Risk Policies</h6>
                    <div className="d-flex justify-content-end align-items-center">
                        <ModalCloseButton onClick={closeModal}>
                            <IoClose />
                        </ModalCloseButton>
                    </div>
                </div>
                <div className="sp1_tlr_container">
                    <div className="sp1_tlr_tbl_container mx-0 py-3">
                        {/* sales risk analysis table */}
                        <SaleRiskAuthorizePolicesModalTable
                            tableColumns={
                                SaleRiskAuthorizePolicesModalTableColumns
                            }
                            tableName="SalesRiskAnalysisModalTable"
                            tableData={salesRiskAnalysisRules}
                            isLoading={isLoading}
                        />
                    </div>
                </div>
            </React.Fragment>
        </CustomModal>
    );
};

export default SaleRiskAuthorizePolicesModal;

SaleRiskAuthorizePolicesModal.propTypes = {
    open: PropTypes.bool,
    closeModal: PropTypes.func,
    salesRiskAnalysisRules: PropTypes.object,
    isLoading: PropTypes.bool,
};
