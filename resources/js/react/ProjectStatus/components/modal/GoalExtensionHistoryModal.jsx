import React from 'react'
import ReactModal from 'react-modal'
import GoalExtensionHistoryTable from './GoalExtensionHistoryTable'
import { GoalExtensionHistoryTableColumn } from './GoalExtensionHistoryTableColumn'
import { GoalExtentionHistoryTableData } from '../../constant'
import RefreshButton from '../RefreshButton'
import _ from 'lodash'

const GoalExtensionHistoryModal = ({
  projectDetails,
  isOpen,
  closeModal,
  goalExtensionHistoryData,
  refetchPmGoal,
  isLoading,
}) => {
  const tableHeaderFilterByUser = GoalExtensionHistoryTableColumn.filter(item => {
    if (window?.Laravel?.user.role_id !== 1) {
        return item.accessorKey !== 'client_communication_rating' && item.accessorKey !== 'negligence_pm_rating';
    }
    return true; // Include all columns if user role ID is 1
  });



  console.log('tableHeaderFilterByUser', tableHeaderFilterByUser)


  return (
    <ReactModal
      style={customStyles}
      isOpen={isOpen}
      ariaHideApp={false}
      onRequestClose={closeModal}
      contentLabel="Goal Extension History"
    >
              <div
                className='d-flex justify-content-between mb-3'
              >
                  <div style={{ fontSize: "25px" }}>Goal Extension History</div>
                  <RefreshButton
                    onClick={refetchPmGoal}
                    isLoading={isLoading}
                  />
              </div>
        <GoalExtensionHistoryTable
          projectDetails={projectDetails}
          closeModal={closeModal}     
          tableName="goalExtensionHistoryTable"   
          tableColumns={tableHeaderFilterByUser}
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
