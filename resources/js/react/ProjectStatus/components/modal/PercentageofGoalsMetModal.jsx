import React from 'react'
import RefreshButton from '../RefreshButton';
import PercentageofGoalsMetTable from './PercentageofGoalsMetTable';
import ReactModal from 'react-modal';
import { PercentageofGMTableColumn } from './PercentageofGoalsMetTableColumn';
import { IoClose } from 'react-icons/io5';

const PercentageofGoalsMetModal = ({
  isOpen, 
  closeModal,
  projectDetails, 
  percentageOfGoalsMet,
  tableName, 
  isLoading, 
  refetchPmGoal}) => {
  return (
    <ReactModal
      style={customStyles}
      isOpen={isOpen}
      ariaHideApp={false}
      onRequestClose={closeModal}
      contentLabel="Percentage of Goals Met"
    >
      
          <div
            className='d-flex justify-content-between align-items-center mb-3'
           >
            <h6 style={{ fontSize: "25px" }}>Percentage of Goals Met</h6>
              <div 
                className='d-flex align-items-center' 
                style={{gap: '10px'}}>
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
