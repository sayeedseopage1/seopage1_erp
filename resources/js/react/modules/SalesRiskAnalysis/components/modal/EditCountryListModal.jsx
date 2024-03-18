import React from "react";
import PropTypes from "prop-types";

// ui components
import CustomModal from "../ui/CustomModal/CustomModal";

const EditCountryListModal = ({ open, closeModal }) => {
    return (
        <CustomModal
            closeModal={closeModal}
            contentLabel="Edit Rule Table"
            open={open}
            isCloseButtonShow
            width="700px"
        >
            EditCountryListModal
        </CustomModal>
    );
};

export default EditCountryListModal;



EditCountryListModal.propTypes = {
    open: PropTypes.bool,
    closeModal: PropTypes.func,
}
