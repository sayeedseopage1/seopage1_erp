import React from "react";
import PropTypes from "prop-types";

// Components - UI - Modal
import AntdModal from "../../UI/AntdModal/AntdModal";
import CustomModalHeader from "../../UI/CustomModalHeader/CustomModalHeader";

const LeadDeveloperDataModal = ({ isModalOpen, closeModal, modalData }) => {
    return (
        <AntdModal
            isModalOpen={isModalOpen}
            closeModal={closeModal}
            parentClassName="sp1_lead_developer_data_modal"
            isCentered
            width="80%"
        >
            <CustomModalHeader title="Lead Developer" />
        </AntdModal>
    );
};

export default LeadDeveloperDataModal;

LeadDeveloperDataModal.propTypes = {
    isModalOpen: PropTypes.bool,
    closeModal: PropTypes.func,
    modalData: PropTypes.object,
};
