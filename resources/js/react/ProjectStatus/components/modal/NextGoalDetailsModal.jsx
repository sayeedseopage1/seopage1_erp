import React from 'react'
import ReactModal from 'react-modal'
import { IoClose } from 'react-icons/io5';

const NextGoalDetailsModal = ({isOpen, closeModal, projectDetails}) => {
  return (

    <ReactModal
    isOpen={isOpen}
    style={customStyles}
    ariaHideApp={false}
    onRequestClose={closeModal}
    contentLabel="Percentage of Goals Met"
    >
       <div
            className='d-flex justify-content-between align-items-center mb-3'
           >
            <h5 style={{ fontSize: "20px" }}>Next Goal Details</h5>
              <div 
                className='d-flex align-items-center' 
                style={{gap: '10px'}}>
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
          <div>
            <p>{projectDetails?.goal_description ?? "All goals are completed!"}</p>
          </div>
      </ReactModal>
  )
}

export default NextGoalDetailsModal



const customStyles = {
  overlay: {
      zIndex: 9999998,
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      margin: "auto auto",
      padding: "20px",
  },
  content: {
      zIndex: 9999999,
      maxWidth: "30%",
      height: "fit-content",
      textAlign: "center",
      margin: "auto auto",
      padding: "20px",
  },
};
