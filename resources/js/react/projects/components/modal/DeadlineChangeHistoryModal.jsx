import React, { useEffect } from "react";
import PropTypes from "prop-types";

// UI Components - Custom
import CustomAntModal from "../ui/CustomAntModal/CustomAntModal";

// Constants
import { ProjectDeadlineHistoryDummyData } from "../../constants";

// Components - Table
import DashboardDataTable from "../Table/DashboardDataTable";
import { DashBoardDeadlineHistoryModalColumns } from "../Table/DashBoardDeadlineHistoryModalColumns";

// style
import "./styles/deadlineChangeHistoryModal.css";



/**
 * Deadline Change History Modal
 * @param {boolean} isModalOpen - Is Modal Open
 * @param {function} closeModal - Close Modal
 * @param {boolean} isLoading - Is Loading
 * @param {array} modalData - Modal Data
 * @returns {JSX.Element}
 * @description - Deadline Change History Modal Component For Show Deadline Change History
 * 
 * This modal will be used by Admin
 * 
 */

const DeadlineChangeHistoryModal = ({ isModalOpen, closeModal , isLoading, modalData  }) => {

   

    return (
        <CustomAntModal
            isModalOpen={isModalOpen}
            closeModal={closeModal}
            title="Deadline Change History"
            width="1188px"
        >
            <div className="sp1_tlr_container deadlineChangeHistoryModalTable">
                <div className="sp1_tlr_tbl_container mx-0 py-3">
                    {/* Dashboard Deadline Change History Table */}
                    <DashboardDataTable
                        tableColumns={DashBoardDeadlineHistoryModalColumns}
                        tableName="Deadline Change History"
                        tableData={modalData}
                        isLoading={isLoading}
                        tableHight="50vh"
                    />
                </div>
            </div>
        </CustomAntModal>
    );
};

export default DeadlineChangeHistoryModal;

DeadlineChangeHistoryModal.propTypes = {
    isModalOpen: PropTypes.bool.isRequired,
    closeModal: PropTypes.func.isRequired,
    isLoading: PropTypes.bool,
    modalData: PropTypes.array,
};
