import React from "react";
import PropTypes from "prop-types";

// Components - Custom
import CustomAntModal from "../ui/CustomAntModal/CustomAntModal";

// components - UI - Loader
import { Placeholder } from "../../../global/Placeholder";

// helper
import { handleLoadingComponent } from "../../helper";

const WorkingEnvironmentModal = ({
    isModalOpen,
    closeModal,
    modalData,
    isLoading,
}) => {
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
                                href={modalData?.site_url}
                                target="_blank"
                                rel="noreferrer"
                            >
                                {modalData?.site_url}
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
                                href={modalData?.login_url}
                                target="_blank"
                                rel="noreferrer"
                            >
                                {modalData?.login_url}
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
                                {modalData?.frontend_password}
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
                                {modalData?.email}
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
                                {modalData?.password}
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
    isLoading: PropTypes.bool,
};
