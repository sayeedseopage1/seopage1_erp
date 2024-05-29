import React from "react";
import PropTypes from "prop-types";
import { BsPinAngle } from "react-icons/bs";
import { LiaEdit } from "react-icons/lia";

// Components - Custom
import Button from "../ui/customComponents/Button/Button";

// Styles
import style from "./styles/dashboardHeaderSection.module.css";

// Components - Modal
import WorkingEnvironmentModal from "../modal/WorkingEnvironmentModal";
import TaskGuidelineNeedsAuthorizedAdmin from "../modal/TaskGuidelineNeedsAuthorizedAdmin";

// ShortName
// WN - WorkingEnvironment;
// TGABA - TaskGuidelineNeedsAuthorizedByAdmin;

const DashboardHeaderSection = ({ projectData, isLoading, setDummyTypeChange }) => {
    const [isWNModalOpen, setIsWNModalOpen] = React.useState(false);
    const [isTGABAModalOpen, setIsTGABAModalOpen] = React.useState(false);

     // Handle Modal Open and Close Function with Action Function as Parameter (if needed)
    const handleModal = (setModalOpenFunc, isOpen, action) => {
        setModalOpenFunc(isOpen);
        if (action) {
            action();
        }
    };


    return (
        <div className="d-flex flex-column flex-md-row justify-content-md-between mb-4">
            <div className="d-flex mb-3 mb-md-0">
                <Button
                    onClick={()  => handleModal(setIsWNModalOpen, true)}
                    className={`${style?.dashboardHeaderButton}`}
                >
                    Working Environment
                </Button>
                <Button
                    onClick={() => {
                        setDummyTypeChange((prev) => (prev === 0 ? 1 : 0));
                    }}
                    className={`${style?.dashboardHeaderForType} ml-2`}
                >
                    Project Type: {projectData.projectType}
                </Button>
            </div>
            <div className="d-flex mb-3 mb-md-0 ">
                <Button
                    onClick={()  => handleModal(setIsTGABAModalOpen, true)}
                    className={`${style?.dashboardHeaderButton}`}
                >
                    Mark as complete
                </Button>
                {/* Action DropDown */}
                <div className={`dropdown ml-2  ${style.actionButtonDropdown}`}>
                    <button
                        className={`btn btn-lg bg-white  f-15 px-2 py-1 text-dark-grey text-capitalize rounded dropdown-toggle ${style?.dashboardHeaderButton} ${style.actionButton}`}
                        type="button"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="true"
                    >
                        Action <i className="icon-options-vertical icons"></i>
                    </button>
                    <div
                        className="dropdown-menu dropdown-menu-right border-grey rounded b-shadow-4 p-0 "
                        aria-labelledby="dropdownMenuLink"
                        style={{
                            position: "absolute",
                            willChange: "transform",
                            top: "0px",
                            left: "0px",
                            transform: "translate3d(-80px, 39px, 0px)",
                        }}
                    >
                        <a
                            className="dropdown-item openRightModal"
                            href="http://localhost:8000/account/projects/1181/edit"
                        >
                            <LiaEdit className="mr-2" />
                            Edit Project
                        </a>
                        <hr className="my-1" />
                        <a
                            className="dropdown-item"
                            id="pinnedItem"
                            data-pinned="unpinned"
                            href="#"
                        >
                            <BsPinAngle className="mr-2" />
                            Pin Project
                        </a>
                    </div>
                </div>
            </div>

            {/* Modal */}

            {/* Working Environment Modal */}
            {isWNModalOpen && (
                <WorkingEnvironmentModal
                    isModalOpen={isWNModalOpen}
                    closeModal={()  => handleModal(setIsWNModalOpen, false)}
                    modalData={projectData?.projectData?.working_environment}
                    isLoading={isLoading}
                />
            )}
            {/* End Working Environment Modal */}

            {/* Top Management Pm Task Guideline Authorization */}
            {isTGABAModalOpen && (
                <TaskGuidelineNeedsAuthorizedAdmin
                    isModalOpen={isTGABAModalOpen}
                    closeModal={() => handleModal(setIsTGABAModalOpen, false)}
                    modalData={
                        projectData?.projectData?.task_guideline_authorization
                    }
                    isLoading={isLoading}
                />
            )}
            {/* End Top Management Pm Task Guideline Authorization */}
        </div>
    );
};

export default DashboardHeaderSection;

DashboardHeaderSection.propTypes = {
    projectData: PropTypes.object,
    isLoading: PropTypes.bool,
    setDummyTypeChange: PropTypes.func,
};
