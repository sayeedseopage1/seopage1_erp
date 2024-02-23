import React from 'react'
import ReactModal from 'react-modal'
import GoalExtensionHistoryTable from './GoalExtensionHistoryTable'
import { GoalExtensionHistoryTableColumn } from './GoalExtensionHistoryTableColumn'
import { GoalExtentionHistoryTableData } from '../../constant'
import RefreshButton from '../RefreshButton'


const GoalExtensionHistoryModal = ({
  projectDetails,
  isOpen,
  closeModal,
  goalExtensionHistoryData,
  refetchPmGoal,
  isLoading,
}) => {


  return (
    <ReactModal
      style={customStyles}
      isOpen={isOpen}
      ariaHideApp={false}
      onRequestClose={closeModal}
      contentLabel="Goal Extension History"
    >
        <div
          className='d-flex justify-content-between align-items-center mb-3'
        >
          <h6 style={{ fontSize: "25px" }}>Goal Extension History</h6>
            <RefreshButton
              onClick={refetchPmGoal}
              isLoading={isLoading}
            />
        </div>
        {/* Goal Extention History Table */}
        <GoalExtensionHistoryTable
          projectDetails={projectDetails}
          closeModal={closeModal}     
          tableName="goalExtensionHistoryTable"   
          tableColumns={GoalExtensionHistoryTableColumn}
          goalExtensionHistoryData={GoalExtentionHistoryTableData}
          isLoading={isLoading}
        />
    </ReactModal>
  )
}

export default GoalExtensionHistoryModal


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
