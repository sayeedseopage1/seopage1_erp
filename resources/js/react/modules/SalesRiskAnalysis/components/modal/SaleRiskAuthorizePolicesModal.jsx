import React from "react";
import PropTypes from "prop-types";
import CustomModal from "../ui/CustomModal/CustomModal";
const SaleRiskAuthorizePolicesModal = ({ open, closeModal }) => {
    return (
        <CustomModal
            open={open}
            closeModal={closeModal}
            contentLabel="Add New Policy"
            width="500px"
            height="fit-content"
            maxHeight="fit-content"
            isCloseButtonShow={true}
        >
            SaleRiskAuthorizePolicesModal
        </CustomModal>
    );
};

export default SaleRiskAuthorizePolicesModal;

SaleRiskAuthorizePolicesModal.propTypes = {
    open: PropTypes.bool,
    closeModal: PropTypes.func,
};
