import React from "react";

// UI Components - Custom
import CustomAntModal from "../ui/CustomAntModal/CustomAntModal";


// Constants
import { ProjectDeadlineHistoryDummyData } from "../../constants";

// Components - Table
import DashboardDataTable from "../Table/DashboardDataTable";
import { DashBoardDeadlineHistoryModalColumns } from "../Table/DashBoardDeadlineHistoryModalColumns";


// style
import "./styles/deadlineChangeHistoryModal.css";

const DeadlineChangeHistoryModal = ({
    isModalOpen,
    closeModal,
    modalData,
    isLoading,
}) => {
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
                        tableData={ProjectDeadlineHistoryDummyData}
                        isLoading={isLoading}
                    />
                </div>
            </div>
        </CustomAntModal>
    );
};

export default DeadlineChangeHistoryModal;
