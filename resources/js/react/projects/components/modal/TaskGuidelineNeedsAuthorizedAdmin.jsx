import React, { useContext, useEffect } from "react";
import PropTypes from "prop-types";

// Components - Custom
import CustomAntModal from "../ui/CustomAntModal/CustomAntModal";
import CustomModalHeader from "../ui/CustomModalHeader/CustomModalHeader";

// Components - Table
import { ModalContentContainer } from "../ui/styledComponents";
import CustomButton from "../ui/CustomButton/CustomButton";
import {
    useLazyAuthorizeTaskApprovedGuidelineQuery,
    useLazyAuthorizeTaskRejectGuidelineQuery,
} from "../../../services/api/projectApiSlice";
import { handleLoadingComponent } from "../../helper";
import _ from "lodash";
import TaskGuidelineAuthorizeLoader from "../loader/TaskGuidlineAuthorizeLoader";
import ProjectDashboard from "../../pages/ProjectDashboard";
import { ProjectDashboardContext } from "../../context/ProjectDashboardProvider";
import { toast } from "react-toastify";

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
    isLoading,
}) => {
    const { projectData, refetchProjectDetails } = useContext(
        ProjectDashboardContext
    );
    const [authorizedData, setAuthorizedData] = React.useState(null);
    const [inputData, setInputData] = React.useState(
        modalData || projectData?.pm_task_guideline_authorizations
    );

    const [
        taskGuidelineApproved,
        {
            isLoading: isTaskGuidelineApprovedLoading,
            status: taskGuidelineApprovedStatus,
        },
    ] = useLazyAuthorizeTaskApprovedGuidelineQuery();

    const [
        taskGuidelineReject,
        {
            isLoading: isTaskGuidelineRejectLoading,
            status: taskGuidelineRejectStatus,
        },
    ] = useLazyAuthorizeTaskRejectGuidelineQuery();

    // Handle Input Change
    const handleTaskGuideline = async (item, value) => {
        try {
            setAuthorizedData({
                value: value,
                id: item.id,
            });
            const requestItem =
                value === 0 ? taskGuidelineReject : taskGuidelineApproved;
            const response = await requestItem(item.id);
            if (response?.data?.success === 200) {
                if (value === 1) {
                    toast.success(`${item.name} Approved Successfully`);
                } else {
                    toast.success(`${item.name} Rejected Successfully`);
                }
                refetchProjectDetails();
                setAuthorizedData();
            }
        } catch (error) {
            toast.error("Something went wrong");
        }
    };

    useEffect(() => {
        if (!isLoading && projectData) {
            setInputData(projectData?.pm_task_guideline_authorizations);
        }
    }, [isLoading, projectData]);

    useEffect(() => {
        if (inputData) {
            const isAllStatusUpdate = inputData.every(
                (item) => item.status !== 0
            );
            if (isAllStatusUpdate) {
                closeModal();
            }
        }
    }, [inputData]);

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
                        {handleLoadingComponent(
                            isLoading,
                            <TaskGuidelineAuthorizeLoader
                                dataLength={
                                    inputData?.filter(
                                        (item) => item?.status === 0
                                    )?.length
                                }
                            />,
                            inputData
                                ?.filter((item) => item?.status === 0)
                                .map((item) => (
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
                                                //  TODO: Need to add loading state
                                                isDisabled={
                                                    isTaskGuidelineApprovedLoading ||
                                                    isTaskGuidelineRejectLoading ||
                                                    taskGuidelineApprovedStatus ===
                                                        "pending" ||
                                                    taskGuidelineRejectStatus ===
                                                        "pending"
                                                }
                                                value={
                                                    item?.id ===
                                                        authorizedData?.id &&
                                                    authorizedData?.value
                                                }
                                                onChange={(value) =>
                                                    handleTaskGuideline(
                                                        item,
                                                        value
                                                    )
                                                }
                                            />
                                        </div>
                                    </div>
                                ))
                        )}
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
    isLoading: PropTypes.bool,
};
