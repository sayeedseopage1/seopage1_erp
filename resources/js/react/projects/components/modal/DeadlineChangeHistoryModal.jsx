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

const DeadlineChangeHistoryModal = ({ isModalOpen, closeModal }) => {
    const [projectDeadlineHistory, setProjectDeadlineHistory] = React.useState(
        []
    );
    const [isLoading, setIsLoading] = React.useState(true);

    // Dummy Fetch Data
    const dataPromise = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(ProjectDeadlineHistoryDummyData);
        }, 5000);
    });

    // Fetch Data Deadline Change History
    const fetchData = async () => {
        setIsLoading(true);
        try {
            const data = await dataPromise;
            setProjectDeadlineHistory(data);
            setIsLoading(false);
        } catch (error) {
            console.error("Error fetching data: ", error);
        }
    };

    useEffect(() => {
        if (isModalOpen) {
            fetchData();
        }
    }, [isModalOpen]);

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
                        tableData={projectDeadlineHistory}
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
};
