import React from 'react'
import ReactModal from 'react-modal'
import GoalExtensionHistoryTable from './GoalExtensionHistoryTable'
import { GoalExtensionHistoryTableColumn } from './GoalExtensionHistoryTableColumn'
import { GoalExtentionHistoryTableData } from '../../constant'
import RefreshButton from '../RefreshButton'
import { IoClose } from 'react-icons/io5'


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
          <h5 style={{ fontSize: "20px" , marginBottom: "0"}}>Goal Extension History</h5>
          <div className='d-flex align-items-center' style={{
            gap: "10px"
          }}>
            <RefreshButton
              onClick={refetchPmGoal}
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
