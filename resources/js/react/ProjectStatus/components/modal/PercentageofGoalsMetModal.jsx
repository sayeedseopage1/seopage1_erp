import React from 'react'
import RefreshButton from '../RefreshButton';
import PercentageofGoalsMetTable from './PercentageofGoalsMetTable';
import ReactModal from 'react-modal';
import { PercentageofGMTableColumn } from './PercentageofGoalsMetTableColumn';

const PercentageofGoalsMetModal = ({isOpen, closeModal,projectDetails, percentageOfGoalsMet,tableName, isLoading}) => {
  return (
    <ReactModal
      style={customStyles}
      isOpen={isOpen}
      ariaHideApp={false}
      onRequestClose={closeModal}
      contentLabel="Percentage of Goals Met"
    >
                <div
                  className='d-flex justify-content-between mb-3'
                >
                    <div style={{ fontSize: "25px" }}>Percentage of Goals Met</div>

                    <RefreshButton
                    />
                </div>
          <PercentageofGoalsMetTable
            projectDetails={projectDetails}
            closeModal={closeModal}     
            tableName="percentageGoalsMetTable"   
            tableColumns={PercentageofGMTableColumn}
            percentageOfGoalsMet={percentageOfGoalsMet}
            isLoading={isLoading}
          />
    </ReactModal>
  )
}

export default PercentageofGoalsMetModal



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
