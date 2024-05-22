import React from "react";
import PropTypes from "prop-types";

// Components - Custom
import CustomAntModal from "../ui/CustomAntModal/CustomAntModal";
import CustomModalHeader from "../ui/CustomModalHeader/CustomModalHeader";
import { ModalContentContainer } from "../ui/styledComponents";

// Helper
import { handleLoadingComponent } from "../../helper";

// Components - Global
import { Placeholder } from "../../../global/Placeholder";
import Switch from "../../../global/Switch";

const ProjectCompletionModal = ({
    isModalOpen,
    closeModal,
    modalData,
    isLoading,
}) => {
    const { project_submission, project_portfolio } = modalData;

    return (
        <CustomAntModal
            isModalOpen={isModalOpen}
            closeModal={closeModal}
            width="956px"
        >
            <CustomModalHeader
                title="Project Completion Request Form"
                closeModal={closeModal}
            />
            <ModalContentContainer>
                {/* Actual Site Links */}
                <div className="modalContentHeader">
                    <p>
                        Actual Site Link:
                        {handleLoadingComponent(
                            isLoading,
                            <Placeholder height={16} width="50%" />,
                            <Switch>
                                <Switch.Case
                                    condition={project_submission?.actual_link}
                                >
                                    <a
                                        href={project_submission?.actual_link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="singleline-ellipsis"
                                    >
                                        {project_submission?.actual_link}
                                    </a>
                                </Switch.Case>
                                <Switch.Case
                                    condition={!project_submission?.dummy_link}
                                >
                                    <a
                                        href={project_submission?.dummy_link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="singleline-ellipsis"
                                    >
                                        {project_submission?.dummy_link}
                                    </a>
                                </Switch.Case>
                            </Switch>
                        )}
                    </p>
                </div>
                {/* End Actual Site Links */}
                <div className="modalContentTable">
                    <table>
                        <thead>
                            <tr>
                                <th>SL</th>
                                <th>Query</th>
                                <th>Response </th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* Complete the QC Protocol */}
                            <tr>
                                <td>1</td>
                                <td>Complete the QC Protocol</td>
                                <td>
                                    {handleLoadingComponent(
                                        isLoading,
                                        <Placeholder height={16} width="50%" />,
                                        <Switch>
                                            <Switch.Case
                                                condition={project_submission}
                                            >
                                                <p>
                                                    {project_submission?.qc_protocol ===
                                                    1
                                                        ? "Yes"
                                                        : "No"}
                                                </p>
                                            </Switch.Case>
                                            <Switch.Case
                                                condition={!project_submission}
                                            >
                                                <p>--</p>
                                            </Switch.Case>
                                        </Switch>
                                    )}
                                </td>
                            </tr>
                            {/* Collected the Login Information*/}
                            <tr>
                                <td>2</td>
                                <td>Collected the Login Information</td>
                                <td>
                                    {handleLoadingComponent(
                                        isLoading,
                                        <Placeholder height={16} width="50%" />,
                                        <Switch>
                                            <Switch.Case
                                                condition={project_submission}
                                            >
                                                <p>
                                                    {project_submission?.qc_protocol ===
                                                    1
                                                        ? "Yes"
                                                        : "No"}
                                                </p>
                                            </Switch.Case>
                                            <Switch.Case
                                                condition={!project_submission}
                                            >
                                                <p>--</p>
                                            </Switch.Case>
                                        </Switch>
                                    )}
                                </td>
                            </tr>
                            {/* Shared the login information with client*/}
                            <tr>
                                <td className="verticalAlignTop">3</td>
                                <td className="verticalAlignTop">
                                    Shared the login information with client
                                </td>
                                <td>
                                    {handleLoadingComponent(
                                        isLoading,
                                        <Placeholder height={16} width="50%" />,
                                        <Switch>
                                            <Switch.Case
                                                condition={project_submission}
                                            >
                                                <div>
                                                    <Switch.Case
                                                        condition={
                                                            project_submission?.login_information ===
                                                            1
                                                        }
                                                    >
                                                        <p className="mb-1">
                                                            Yes
                                                        </p>
                                                        <Switch.Case
                                                            condition={
                                                                project_submission.login_url
                                                            }
                                                        >
                                                            <p className="singleline-ellipsis mb-1 d-flex">
                                                                <strong>
                                                                    Login Url:
                                                                </strong>{" "}
                                                                <a
                                                                    href={
                                                                        project_submission.login_url
                                                                    }
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                    className="singleline-ellipsis w-50"
                                                                >
                                                                    {
                                                                        project_submission.login_url
                                                                    }
                                                                </a>
                                                            </p>
                                                        </Switch.Case>

                                                        <p className="mb-1">
                                                            <strong>
                                                                Login:
                                                            </strong>{" "}
                                                            {
                                                                project_submission.login
                                                            }
                                                        </p>

                                                        <p className="mb-1">
                                                            <strong>
                                                                Password:
                                                            </strong>{" "}
                                                            {
                                                                project_submission.password
                                                            }
                                                        </p>
                                                        <p className="d-flex mb-1">
                                                            <strong>
                                                                Screenshot:
                                                            </strong>{" "}
                                                            <a
                                                                href={
                                                                    project_submission.screenshot
                                                                }
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="singleline-ellipsis w-50"
                                                            >
                                                                {
                                                                    project_submission.screenshot
                                                                }
                                                            </a>
                                                        </p>
                                                    </Switch.Case>
                                                    <Switch.Case
                                                        condition={
                                                            project_submission?.login_information ===
                                                            0
                                                        }
                                                    >
                                                        <p>No</p>
                                                    </Switch.Case>
                                                </div>
                                            </Switch.Case>
                                            <Switch.Case
                                                condition={!project_submission}
                                            >
                                                <p>--</p>
                                            </Switch.Case>
                                        </Switch>
                                    )}
                                </td>
                            </tr>
                            {/* Uploaded Backup Folder in Drive */}
                            <tr>
                                <td>4</td>
                                <td>Uploaded Backup Folder in Drive</td>
                                <td>
                                    {handleLoadingComponent(
                                        isLoading,
                                        <Placeholder height={16} width="50%" />,
                                        <Switch>
                                            <Switch.Case
                                                condition={project_submission}
                                            >
                                                <p>
                                                    {project_submission?.drive_yes ===
                                                    1
                                                        ? "Yes"
                                                        : "No"}
                                                </p>
                                            </Switch.Case>
                                            <Switch.Case
                                                condition={!project_submission}
                                            >
                                                <p>--</p>
                                            </Switch.Case>
                                        </Switch>
                                    )}
                                </td>
                            </tr>
                            {/* Shared the updated the backup folder in google drive*/}
                            <tr>
                                <td className="verticalAlignTop">5</td>
                                <td className="verticalAlignTop">
                                    Shared the updated the backup folder in
                                    google drive
                                </td>
                                <td>
                                    {handleLoadingComponent(
                                        isLoading,
                                        <Placeholder height={16} width="50%" />,
                                        <Switch>
                                            <Switch.Case
                                                condition={project_submission}
                                            >
                                                <div>
                                                    <Switch.Case
                                                        condition={
                                                            project_submission?.drive_information ===
                                                            1
                                                        }
                                                    >
                                                        <p className="mb-1">
                                                            Yes
                                                        </p>
                                                        <p className="d-flex">
                                                            <strong>
                                                                Google Drive
                                                                Link :
                                                            </strong>{" "}
                                                            <a
                                                                href={
                                                                    project_submission.google_link
                                                                }
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="singleline-ellipsis w-50"
                                                            >
                                                                {
                                                                    project_submission.google_link
                                                                }
                                                            </a>
                                                        </p>
                                                    </Switch.Case>
                                                    <Switch.Case
                                                        condition={
                                                            project_submission?.drive_information ===
                                                            0
                                                        }
                                                    >
                                                        <p>No</p>
                                                    </Switch.Case>
                                                </div>
                                            </Switch.Case>
                                            <Switch.Case
                                                condition={!project_submission}
                                            >
                                                <p>--</p>
                                            </Switch.Case>
                                        </Switch>
                                    )}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </ModalContentContainer>
        </CustomAntModal>
    );
};

export default ProjectCompletionModal;

ProjectCompletionModal.propTypes = {
    isModalOpen: PropTypes.bool.isRequired,
    closeModal: PropTypes.func.isRequired,
    modalData: PropTypes.object,
    isLoading: PropTypes.bool,
};
