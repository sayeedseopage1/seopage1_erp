import React, { useEffect } from "react";
import PropTypes from "prop-types";

// Components - Custom
import CustomAntModal from "../ui/CustomAntModal/CustomAntModal";

// components - UI - Loader
import { Placeholder } from "../../../global/Placeholder";

// helper
import { handleLoadingComponent } from "../../helper";

/**
 *  Working Environment Modal
 *  @param {boolean} isModalOpen - Modal Open State
 *  @param {function} closeModal - Close Modal Event Handler
 *  @param {object} modalData - Modal Data
 *  @returns {JSX.Element}
 *  @description Working Environment Modal component to render working environment modal
 * 
 *  This modal will be used by Admin to view working environment details
 */

const WorkingEnvironmentModal = ({ isModalOpen, closeModal, modalData }) => {
    const [workingEnvironmentData, setWorkingEnvironmentData] =
        React.useState();
    const [isLoading, setIsLoading] = React.useState(true);

    // Dummy Fetch Data
    const dataPromise = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(modalData);
        }, 5000);
    });

    // Fetch Data Deadline Change History
    const fetchData = async () => {
        setIsLoading(true);
        try {
            const data = await dataPromise;
            setWorkingEnvironmentData(data);
            setIsLoading(false);
        } catch (error) {
            console.error("Error fetching data: ", error);
        }
    };

    useEffect(() => {
        if (isModalOpen) {
            fetchData();
        }
    }, []);

    return (
        <CustomAntModal
            title="Working Environment"
            isModalOpen={isModalOpen}
            closeModal={closeModal}
            width="956.781px"
        >
            <div className="dashboardModalTableContainer mt-4">
                <div className="row dashboardModalTableItem flex-column flex-md-row ">
                    <div className="col-12 col-md-6">Site Url :</div>
                    <div className="col-12 col-md-6">
                        {handleLoadingComponent(
                            isLoading,
                            <Placeholder width="80%" height="16px" />,
                            <a
                                href={workingEnvironmentData?.site_url}
                                target="_blank"
                                rel="noreferrer"
                            >
                                {workingEnvironmentData?.site_url}
                            </a>
                        )}
                    </div>
                </div>
                <div className="row dashboardModalTableItem flex-column flex-md-row ">
                    <div className="col-12 col-md-6">Login Url :</div>
                    <div className="col-12 col-md-6">
                        {handleLoadingComponent(
                            isLoading,
                            <Placeholder width="80%" height="16px" />,
                            <a
                                href={workingEnvironmentData?.login_url}
                                target="_blank"
                                rel="noreferrer"
                            >
                                {workingEnvironmentData?.login_url}
                            </a>
                        )}
                    </div>
                </div>
                <div className="row dashboardModalTableItem flex-column flex-md-row ">
                    <div className="col-12 col-md-6">Frontend Password :</div>
                    <div className="col-12 col-md-6">
                        {" "}
                        {handleLoadingComponent(
                            isLoading,
                            <Placeholder width="80%" height="16px" />,
                            <span className="singleline-ellipses">
                                {workingEnvironmentData?.frontend_password}
                            </span>
                        )}
                    </div>
                </div>
                <div className="row dashboardModalTableItem flex-column flex-md-row ">
                    <div className="col-12 col-md-6">Email:</div>
                    <div className="col-12 col-md-6">
                        {" "}
                        {handleLoadingComponent(
                            isLoading,
                            <Placeholder width="80%" height="16px" />,
                            <span className="singleline-ellipses">
                                {workingEnvironmentData?.email}
                            </span>
                        )}
                    </div>
                </div>
                <div className="row dashboardModalTableItem flex-column flex-md-row ">
                    <div className="col-12 col-md-6">Password:</div>
                    <div className="col-12 col-md-6">
                        {" "}
                        {handleLoadingComponent(
                            isLoading,
                            <Placeholder width="80%" height="16px" />,
                            <span className="singleline-ellipses">
                                {workingEnvironmentData?.password}
                            </span>
                        )}
                    </div>
                </div>
            </div>
        </CustomAntModal>
    );
};

export default WorkingEnvironmentModal;

WorkingEnvironmentModal.propTypes = {
    isModalOpen: PropTypes.bool,
    closeModal: PropTypes.func,
    modalData: PropTypes.object,
};
