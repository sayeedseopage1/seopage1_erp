import React from "react";
import PropTypes from "prop-types";
import { BsPinAngle } from "react-icons/bs";
import { LiaEdit } from "react-icons/lia";

// Components - Custom
import Button from "../ui/customComponents/Button/Button";
import CustomAntModal from "../ui/CustomAntModal/CustomAntModal";

// Styles
import style from "./styles/dashboardHeaderSection.module.css";
import WorkingEnvironmentModal from "../modal/WorkingEnvironmentModal";


// ShortName
// WN - WorkingEnvironment;

const DashboardHeaderSection = ({ projectData, isLoading }) => {
    const [isWNModalOpen, setIsWNModalOpen] = React.useState(false);

    const handleOpenWNModal = () => {
        setIsWNModalOpen(true);
    };
    const handleCloseWNModal = () => {
        setIsWNModalOpen(false);
    };

    return (
        <div className="d-flex flex-column flex-md-row justify-content-md-between mb-4">
            <div className="d-flex mb-3 mb-md-0">
                <Button
                    onClick={handleOpenWNModal}
                    className={`${style?.dashboardHeaderButton} `}
                >
                    Working Environment
                </Button>
                <Button
                    onClick={() => {}}
                    className={`${style?.dashboardHeaderForType} ml-2`}
                >
                    Project Type: {projectData.projectType}
                </Button>
            </div>
            <div className="d-flex mb-3 mb-md-0 ">
                <Button
                    onClick={() => {}}
                    className={`${style?.dashboardHeaderButton}`}
                >
                    Mark as complete
                </Button>
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
                        tabIndex="0"
                        x-placement="bottom-end"
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
                        >
                            <BsPinAngle className="mr-2" />
                            Pin Project
                        </a>
                    </div>
                </div>
            </div>

            {/* Modal */}
            {isWNModalOpen && (
                <WorkingEnvironmentModal
                    isModalOpen={isWNModalOpen}
                    closeModal={handleCloseWNModal}
                    modalData={projectData?.projectData?.working_environment}
                    isLoading={isLoading}
                />
            )}
        </div>
    );
};

export default DashboardHeaderSection;

DashboardHeaderSection.propTypes = {
    projectData: PropTypes.object,
};
