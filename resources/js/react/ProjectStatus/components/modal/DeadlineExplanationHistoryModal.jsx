import ReactModal from "react-modal"
import RefreshButton from "../RefreshButton"
import DeadlineExplanationHistoryTable from "./DeadlineExplanationHistoryTable"
import { DeadlineEHColumn } from "./DeadlineExplanationHistoryColumn"
import { GoalExtentionHistoryTableData } from "../../constant"

const DeadlineExplanationHistoryModal = ({
  isOpen,
  closeModal,
  projectDetails,
  isLoading,
  refetchPmGoal,
  deadlineExplanationHistoryData
}) => {
  const tableHeaderFilterByUser = DeadlineEHColumn.filter(item => {
    if (window?.Laravel?.user.role_id !== 1) {
        return item.accessorKey !== 'client_communication_rating' && item.accessorKey !== 'negligence_pm_rating';
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
      <div
        className='d-flex justify-content-between align-items-center mb-3'
      >
        <h6 style={{ fontSize: "25px" }}>Deadline Explanation History </h6>
        <RefreshButton
        onClick={refetchPmGoal}
        isLoading={isLoading}
        />
      </div>
      {/* 
       GoalExtentionHistoryTableData is a constant that is not defined in this file. it's dummy data.
      */}
      <DeadlineExplanationHistoryTable
        tableName="deadlineExplanationHistoryTable"
        projectDetails={projectDetails}
        closeModal={closeModal}     
        tableColumns={tableHeaderFilterByUser}
        deadlineExplanationHistoryData={GoalExtentionHistoryTableData}
        isLoading={isLoading}
      
      />
          
    </ReactModal>
  )
}

export default DeadlineExplanationHistoryModal

const customStyles = {
  overlay: {
      zIndex: 9999998,
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      margin: "auto auto",
      padding: "20px",
  },
  content: {
      zIndex: 9999999,
      maxWidth: "90%",
      maxHeight: "fit-content",
      height: "fit-content",
      margin: "auto auto",
      padding: "20px",
  },
};
