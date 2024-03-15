import React from "react";
import PropTypes from "prop-types";

// Custom Components
import CustomModal from "../ui/CustomModal/CustomModal";

const EditPolicyModal = ({ open, closeModal }) => {
    return (
        <CustomModal
            open={open}
            closeModal={closeModal}
            contentLabel="Add New Policy"
            width="700px"
            height="550px"
            maxHeight="550px"
            isCloseButtonShow={true}
        >
            EditPolicyModal
        </CustomModal>
    );
};

export default EditPolicyModal;

EditPolicyModal.propTypes = {
    open: PropTypes.bool,
    closeModal: PropTypes.func,
};
