import React from "react";
import PropTypes from "prop-types";

// Components - Custom
import CustomAntModal from "../ui/CustomAntModal/CustomAntModal";
import CustomModalHeader from "../ui/CustomModalHeader/CustomModalHeader";

// Components - Table
import { ModalContentContainer } from "../ui/styledComponents";
import CustomButton from "../ui/CustomButton/CustomButton";

/**
 *  TaskGuidelineNeedsAuthorizedAdmin component
 *  @param {boolean} isModalOpen - Modal Open State
 *  @param {function} closeModal - Close Modal Event Handler
 *  @param {array} modalData - Modal Data
 *  @returns {JSX.Element}
 *  @description TaskGuidelineNeedsAuthorizedAdmin component to render task guideline needs authorized by admin modal
 * 
 *  This modal will be used by Admin to authorize the task guideline
 */

const TaskGuidelineNeedsAuthorizedAdmin = ({
    isModalOpen,
    closeModal,
    modalData,
}) => {
    const [inputData, setInputData] = React.useState(modalData);

    // Handle Input Change
    const handleInputChange = (item, value) => {
        const updatedData = inputData.map((data) => {
            if (data.id === item.id) {
                return { ...data, status: value };
            }
            return data;
        });
        setInputData(updatedData);
    };

    return (
        <CustomAntModal
            isModalOpen={isModalOpen}
            closeModal={closeModal}
            width="956px"
        >
            <CustomModalHeader
                title="Task Guideline Needs to be Authorized by Admin"
                closeModal={closeModal}
            />
            <ModalContentContainer className="mt-2 borderRadiusBottom">
                <div className="d-flex justify-content-center align-items-center TGABAHeaderContainer">
                    <h6>Submitted Information</h6>
                </div>
                <div className="w-100 overflow-auto">
                    <div className="dashboardModalTableContainer TGABAContentContainer">
                        {inputData.map((item) => (
                            <div
                                className="row m-0 dashboardModalTableItem"
                                key={item.id}
                            >
                                <div className="col-6 align-items-center d-flex">
                                    {item.name}
                                </div>
                                <div className="col-2 d-flex align-items-center">
                                    No
                                </div>
                                <div className="col-4">
                                    <CustomButton
                                        value={item.status}
                                        onChange={(value) =>
                                            handleInputChange(item, value)
                                        }
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </ModalContentContainer>
        </CustomAntModal>
    );
};

export default TaskGuidelineNeedsAuthorizedAdmin;

TaskGuidelineNeedsAuthorizedAdmin.propTypes = {
    isModalOpen: PropTypes.bool,
    closeModal: PropTypes.func,
    modalData: PropTypes.arrayOf(PropTypes.object),
};
