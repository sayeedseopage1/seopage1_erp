import ReactModal from "react-modal";
import RefreshButton from "../RefreshButton";
import DeadlineExplanationHistoryTable from "./DeadlineExplanationHistoryTable";
import { DeadlineEHColumn } from "./DeadlineExplanationHistoryColumn";
import { GoalExtentionHistoryTableData } from "../../constant";
import { IoClose } from "react-icons/io5";

const DeadlineExplanationHistoryModal = ({
    isOpen,
    closeModal,
    projectDetails,
    isLoading,
    goalExpiredHistory,
    refetchGoalExtensionHistory,
}) => {
    // filter the table header based on the user role
    const tableHeaderFilterByUser = DeadlineEHColumn.filter((item) => {
        if (window?.Laravel?.user.role_id !== 1) {
            return (
                item.accessorKey !== "client_communication_rating" &&
                item.accessorKey !== "negligence_pm_rating"
            );
        }
        return true;
    });


    return (
        <ReactModal
            style={customStyles}
            isOpen={isOpen}
            ariaHideApp={false}
            onRequestClose={closeModal}
            contentLabel="Deadline Explanation History"
        >
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h6 style={{ fontSize: "25px" }}>Goal Expired History</h6>
                <div
                    className="d-flex align-items-center"
                    style={{
                        gap: "10px",
                    }}
                >
                    <RefreshButton
                        onClick={refetchGoalExtensionHistory}
                        isLoading={isLoading}
                    />
                    <button
                        onClick={closeModal}
                        style={{
                            backgroundColor: "gray",
                            padding: "2px 4px 2px 4px",
                            color: "white",
                            borderRadius: "50%",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            width: "24px",
                            height: "24px",
                        }}
                    >
                        <IoClose />
                    </button>
                </div>
            </div>
            {/*
       GoalExtentionHistoryTableData is a constant that is not defined in this file. it's dummy data.
      */}
            <DeadlineExplanationHistoryTable
                tableName="deadlineExplanationHistoryTable"
                projectDetails={projectDetails}
                closeModal={closeModal}
                tableColumns={tableHeaderFilterByUser}
                goalExpiredHistory={goalExpiredHistory}
                isLoading={isLoading}
            />
        </ReactModal>
    );
};

export default DeadlineExplanationHistoryModal;

const customStyles = {
    overlay: {
        zIndex: 9,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        margin: "auto auto",
        padding: "20px",
    },
    content: {
        zIndex: 9999999,
        maxWidth: "75vw",
        maxHeight: "85vh",
        height: "fit-content",
        margin: "auto auto",
        padding: "20px",
    },
};
