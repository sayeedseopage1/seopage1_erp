import React from "react";
import PropTypes from "prop-types";

// Components - Custom
import CustomAntModal from "../ui/CustomAntModal/CustomAntModal";
import { Placeholder } from "../../../global/Placeholder";
import Switch from "../../../global/Switch";

const PMTaskGuidelineModal = ({
    isModalOpen,
    closeModal,
    modalData,
    isLoading,
}) => {
    return (
        <CustomAntModal isModalOpen={isModalOpen} closeModal={closeModal}>
            <div className="dashboardModalTableContainer mt-4">
                <div className="row dashboardModalTableItem flex-column flex-md-row ">
                    <div className="col-12 col-md-6">
                        Provide Theme Details : :
                    </div>
                    <div className="col-12 col-md-6">
                        {handleLoadingComponent(
                            isLoading,
                            <Placeholder width="80%" height="16px" />,
                            <p>
                                {modalData?.theme_details === 1 ? "Yes" : "No"}
                            </p>
                        )}
                    </div>
                </div>
                <div className="row dashboardModalTableItem flex-column flex-md-row ">
                    <div className="col-12 col-md-6">Theme Name :</div>
                    <div className="col-12 col-md-6">
                        {handleLoadingComponent(
                            isLoading,
                            <Placeholder width="80%" height="16px" />,
                            <Switch>
                                <Switch.Case condition={modalData?.theme_name}>
                                    <p>{modalData?.theme_name}</p>
                                </Switch.Case>
                                <Switch.Case condition={!modalData?.theme_name}>
                                    <p>Not Shared</p>
                                </Switch.Case>
                            </Switch>
                        )}
                    </div>
                </div>
                <div className="row dashboardModalTableItem flex-column flex-md-row ">
                    <div className="col-12 col-md-6">Theme Url :</div>
                    <div className="col-12 col-md-6">
                        {handleLoadingComponent(
                            isLoading,
                            <Placeholder width="80%" height="16px" />,
                            <Switch>
                                <Switch.Case condition={modalData.theme_url}>
                                    <a
                                        target="_blank"
                                        rel="noreferrer"
                                        href={modalData.theme_url}
                                    >
                                        View On New Tab
                                    </a>
                                </Switch.Case>
                                <Switch.Case condition={!modalData.theme_url}>
                                    <p>Not Shared</p>
                                </Switch.Case>
                            </Switch>
                        )}
                    </div>
                </div>
                <div className="row dashboardModalTableItem flex-column flex-md-row ">
                    <div className="col-12 col-md-6">Design:</div>
                    <div className="col-12 col-md-6">
                        {" "}
                        {handleLoadingComponent(
                            isLoading,
                            <Placeholder width="80%" height="16px" />,
                            <Switch>
                                <Switch.Case condition={modalData?.design}>
                                    <p>{modalData?.design}</p>
                                </Switch.Case>
                                <Switch.Case condition={!modalData.theme_url}>
                                    <p>Not Shared</p>
                                </Switch.Case>
                            </Switch>
                        )}
                    </div>
                </div>
                <div className="row dashboardModalTableItem flex-column flex-md-row ">
                    <div className="col-12 col-md-6">Input XD/Figma URL:</div>
                    <div className="col-12 col-md-6">
                        {" "}
                        {handleLoadingComponent(
                            isLoading,
                            <Placeholder width="80%" height="16px" />,
                            <Switch>
                                <Switch.Case condition={modalData?.xd_url}>
                                    <a
                                        target="_blank"
                                        rel="noreferrer"
                                        href={modalData.xd_url}
                                    >
                                        View On New Tab
                                    </a>
                                </Switch.Case>
                                <Switch.Case condition={!modalData.xd_url}>
                                    <p>Not Shared</p>
                                </Switch.Case>
                            </Switch>
                        )}
                    </div>
                </div>
                <div className="row dashboardModalTableItem flex-column flex-md-row ">
                    <div className="col-12 col-md-6">Reference Site Link :</div>
                    <div className="col-12 col-md-6">
                        {" "}
                        {handleLoadingComponent(
                            isLoading,
                            <Placeholder width="80%" height="16px" />,
                            <Switch>
                                <Switch.Case
                                    condition={modalData?.reference_link > 0}
                                >
                                    {modalData.reference_link.map((link) => (
                                        <a
                                            target="_blank"
                                            rel="noreferrer"
                                            href={link}
                                        >
                                            View On New Tab
                                        </a>
                                    ))}
                                </Switch.Case>
                                <Switch.Case
                                    condition={modalData.reference_link === 0}
                                >
                                    <p>Not Shared</p>
                                </Switch.Case>
                            </Switch>
                        )}
                    </div>
                </div>
                <div className="row dashboardModalTableItem flex-column flex-md-row ">
                    <div className="col-12 col-md-6">Instruction :</div>
                    <div className="col-12 col-md-6">
                        {" "}
                        {handleLoadingComponent(
                            isLoading,
                            <Placeholder width="80%" height="16px" />,
                            <Switch>
                                <Switch.Case condition={modalData?.instruction}>
                                    <p
                                        dangerouslySetInnerHTML={{
                                            __html: modalData?.instruction,
                                        }}
                                    />
                                </Switch.Case>
                                <Switch.Case condition={!modalData.instruction}>
                                    <p>Not Shared</p>
                                </Switch.Case>
                            </Switch>
                        )}
                    </div>
                </div>
                <div className="row dashboardModalTableItem flex-column flex-md-row ">
                    <div className="col-12 col-md-6">Primary Color :</div>
                    <div className="col-12 col-md-6">
                        {" "}
                        {handleLoadingComponent(
                            isLoading,
                            <Placeholder width="80%" height="16px" />,
                            <Switch>
                                <Switch.Case
                                    condition={modalData?.primary_color}
                                >
                                    <p
                                        style={{
                                            backgroundColor:
                                                modalData?.primary_color,
                                            width: "100px",
                                            height: "20px",
                                            display: "inline-block",
                                            borderRadius: "5px",
                                        }}
                                    >
                                        {modalData?.primary_color}
                                    </p>
                                </Switch.Case>
                                <Switch.Case
                                    condition={!modalData.primary_color}
                                >
                                    <p>Not Shared</p>
                                </Switch.Case>
                            </Switch>
                        )}
                    </div>
                </div>
                <div className="row dashboardModalTableItem flex-column flex-md-row ">
                    <div className="col-12 col-md-6">Developers Use This Color :</div>
                    <div className="col-12 col-md-6">
                        {" "}
                        {handleLoadingComponent(
                            isLoading,
                            <Placeholder width="80%" height="16px" />,
                            <Switch>
                                <Switch.Case
                                    condition={modalData?.primary_color}
                                >
                                    <p
                                        style={{
                                            backgroundColor:
                                                modalData?.primary_color,
                                            width: "100px",
                                            height: "20px",
                                            display: "inline-block",
                                            borderRadius: "5px",
                                        }}
                                    >
                                        {modalData?.primary_color}
                                    </p>
                                </Switch.Case>
                                <Switch.Case
                                    condition={!modalData.primary_color}
                                >
                                    <p>Not Shared</p>
                                </Switch.Case>
                            </Switch>
                        )}
                    </div>
                </div>
            </div>
        </CustomAntModal>
    );
};

export default PMTaskGuidelineModal;

PMTaskGuidelineModal.propTypes = {
    isModalOpen: PropTypes.bool,
    closeModal: PropTypes.func,
    modalData: PropTypes.object,
    isLoading: PropTypes.bool,
};
