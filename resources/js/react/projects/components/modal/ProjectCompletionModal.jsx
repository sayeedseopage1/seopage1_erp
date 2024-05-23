import React, { useState } from "react";
import PropTypes from "prop-types";

// Components - Custom
import CustomAntModal from "../ui/CustomAntModal/CustomAntModal";
import CustomModalHeader from "../ui/CustomModalHeader/CustomModalHeader";
import CustomTextArea from "../ui/CustomTextArea/CustomTextArea";
import SingleButton from "../ui/CustomButton/SingleButton";

// Components - Styled Components
import { ModalContentContainer } from "../ui/styledComponents";

// Helper
import { handleLoadingComponent, htmlTagRegex } from "../../helper";

// Components - Global
import { Placeholder } from "../../../global/Placeholder";

// Components - UI - Global
import Switch from "../../../global/Switch";
import Loader from "../../../global/Loader";
import { toast } from "react-toastify";

const ProjectCompletionModal = ({
    isModalOpen,
    closeModal,
    modalData,
    isLoading = true,
}) => {
    const [adminComment, setAdminComment] = useState("");
    const { project_submission, project_portfolio } = modalData;
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Handle Admin Comment
    const handleAdminComment = () => {
        setIsSubmitting(true);
        try {
            // TODO: Implement the API call to submit the admin comment
            setTimeout(() => {
                project_submission.admin_comment = adminComment;
                setIsSubmitting(false);
                toast.success("Project Completion Authorized Successfully");
            }, 5000);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <CustomAntModal
            isModalOpen={isModalOpen}
            closeModal={closeModal}
            width="956px"
            height="80vh"
            parentClassName="projectCompletionModal"
        >
            <CustomModalHeader
                title="Project Completion Request Form"
                closeModal={closeModal}
                className="customModalHeaderWithSticky"
            />
            <ModalContentContainer>
                {/* Actual Site Links */}
                <div className="modalContentHeader">
                    <p>
                        Actual Site Link:
                        {handleLoadingComponent(
                            isLoading,
                            <Placeholder
                                height={16}
                                width="50%"
                                className="ml-2"
                            />,
                            <Switch>
                                <Switch.Case
                                    condition={project_submission?.actual_link}
                                >
                                    <a
                                        href={project_submission?.actual_link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="singleline-ellipsis ml-1"
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
                                        className="singleline-ellipsis ml-1"
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
                                                                    className="singleline-ellipsis w-50 ml-1"
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
                                                                className="singleline-ellipsis w-50 ml-1"
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
                                                                className="singleline-ellipsis w-50 ml-1"
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
                            {/* The Work Quality of Technical Team */}
                            <tr>
                                <td>6</td>
                                <td>The Work Quality of Technical Team</td>
                                <td>
                                    {handleLoadingComponent(
                                        isLoading,
                                        <Placeholder height={16} width="50%" />,
                                        <Switch>
                                            <Switch.Case
                                                condition={project_submission}
                                            >
                                                <p>
                                                    {project_submission?.rating}
                                                    /10
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
                            {/* Comments on The Work Quality of Technical Team */}
                            <tr>
                                <td className="verticalAlignTop">7</td>
                                <td className="verticalAlignTop">
                                    The Work Quality of Technical Team
                                </td>
                                <td className="verticalAlignTop">
                                    {handleLoadingComponent(
                                        isLoading,
                                        <Placeholder height={16} width="50%" />,
                                        <Switch>
                                            <Switch.Case
                                                condition={project_submission}
                                            >
                                                <p>
                                                    {
                                                        project_submission?.comments
                                                    }
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
                            {/*  The Work Quality of Sales Team to define requirements*/}
                            <tr>
                                <td>8</td>
                                <td>
                                    The Work Quality of Sales Team to define
                                    requirements
                                </td>
                                <td>
                                    {handleLoadingComponent(
                                        isLoading,
                                        <Placeholder height={16} width="50%" />,
                                        <Switch>
                                            <Switch.Case
                                                condition={project_submission}
                                            >
                                                <p>
                                                    {
                                                        project_submission?.requirements
                                                    }
                                                    /10
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
                            {/* Comments on The Work Quality of Sales Team */}
                            <tr>
                                <td className="verticalAlignTop">9</td>
                                <td className="verticalAlignTop">
                                    The Work Quality of Sales Team
                                </td>
                                <td className="verticalAlignTop">
                                    {handleLoadingComponent(
                                        isLoading,
                                        <Placeholder height={16} width="50%" />,
                                        <Switch>
                                            <Switch.Case
                                                condition={project_submission}
                                            >
                                                <p>
                                                    {
                                                        project_submission?.comments2
                                                    }
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
                            {/* The quality of sales team to define price correctly */}
                            <tr>
                                <td>10</td>
                                <td>
                                    The quality of sales team to define price
                                    correctly
                                </td>
                                <td>
                                    {handleLoadingComponent(
                                        isLoading,
                                        <Placeholder height={16} width="50%" />,
                                        <Switch>
                                            <Switch.Case
                                                condition={project_submission}
                                            >
                                                <p>
                                                    {project_submission?.price}
                                                    /10
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
                            {/* Comments on Price defined Quality of Sales Team */}
                            <tr>
                                <td className="verticalAlignTop">11</td>
                                <td className="verticalAlignTop">
                                    Comments on Price defined Quality of Sales
                                    Team
                                </td>
                                <td className="verticalAlignTop">
                                    {handleLoadingComponent(
                                        isLoading,
                                        <Placeholder height={16} width="50%" />,
                                        <Switch>
                                            <Switch.Case
                                                condition={project_submission}
                                            >
                                                <p>
                                                    {
                                                        project_submission?.comments3
                                                    }
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
                            {/* CMS of the project */}
                            <tr>
                                <td>12</td>
                                <td>CMS of the project</td>
                                <td>
                                    {handleLoadingComponent(
                                        isLoading,
                                        <Placeholder height={16} width="50%" />,
                                        <Switch>
                                            <Switch.Case
                                                condition={project_portfolio}
                                            >
                                                <p>
                                                    {
                                                        project_portfolio?.cms_name
                                                    }
                                                </p>
                                            </Switch.Case>
                                            <Switch.Case
                                                condition={!project_portfolio}
                                            >
                                                <p>--</p>
                                            </Switch.Case>
                                        </Switch>
                                    )}
                                </td>
                            </tr>
                            {/* Website type of the project */}
                            <tr>
                                <td>13</td>
                                <td>Website type of the project</td>
                                <td>
                                    {handleLoadingComponent(
                                        isLoading,
                                        <Placeholder height={16} width="50%" />,
                                        <Switch>
                                            <Switch.Case
                                                condition={project_portfolio}
                                            >
                                                <p>
                                                    {
                                                        project_portfolio?.website_type
                                                    }
                                                </p>
                                            </Switch.Case>
                                            <Switch.Case
                                                condition={!project_portfolio}
                                            >
                                                <p>--</p>
                                            </Switch.Case>
                                        </Switch>
                                    )}
                                </td>
                            </tr>
                            {/* Niche/Category of the Project */}
                            <tr>
                                <td>14</td>
                                <td>Niche/Category of the Project</td>
                                <td>
                                    {handleLoadingComponent(
                                        isLoading,
                                        <Placeholder height={16} width="50%" />,
                                        <Switch>
                                            <Switch.Case
                                                condition={
                                                    project_submission.niche
                                                }
                                            >
                                                <p>
                                                    {
                                                        project_submission.category_name
                                                    }
                                                </p>
                                            </Switch.Case>
                                            <Switch.Case
                                                condition={
                                                    !project_submission.niche
                                                }
                                            >
                                                <Switch.Case
                                                    condition={
                                                        project_portfolio
                                                    }
                                                >
                                                    <p>
                                                        {
                                                            project_portfolio?.category_name
                                                        }
                                                    </p>
                                                </Switch.Case>
                                            </Switch.Case>
                                            <Switch.Case
                                                condition={
                                                    !project_portfolio &&
                                                    !project_submission.niche
                                                }
                                            >
                                                <p>--</p>
                                            </Switch.Case>
                                        </Switch>
                                    )}
                                </td>
                            </tr>
                            {/* Total Primary or Main Pages*/}
                            <tr>
                                <td className="verticalAlignTop">15</td>
                                <td className="verticalAlignTop">
                                    Total Primary or Main Pages
                                </td>
                                <td className="verticalAlignTop">
                                    {handleLoadingComponent(
                                        isLoading,
                                        <Placeholder height={16} width="50%" />,
                                        <Switch>
                                            <Switch.Case
                                                condition={project_portfolio}
                                            >
                                                <p className="mb-1">
                                                    Number of pages:{" "}
                                                    {
                                                        project_portfolio?.main_page_number
                                                    }
                                                </p>
                                                <p>
                                                    Name of pages:{" "}
                                                    {
                                                        project_portfolio?.main_page_name
                                                    }
                                                </p>
                                            </Switch.Case>
                                            <Switch.Case
                                                condition={!project_portfolio}
                                            >
                                                <p>--</p>
                                            </Switch.Case>
                                        </Switch>
                                    )}
                                </td>
                            </tr>
                            {/* Total Secondary Pages */}
                            <tr>
                                <td className="verticalAlignTop">16</td>
                                <td className="verticalAlignTop">
                                    Total Secondary Pages
                                </td>
                                <td className="verticalAlignTop">
                                    {handleLoadingComponent(
                                        isLoading,
                                        <Placeholder height={16} width="50%" />,
                                        <Switch>
                                            <Switch.Case
                                                condition={project_portfolio}
                                            >
                                                <p className="mb-1">
                                                    Number of pages:{" "}
                                                    {
                                                        project_portfolio?.secondary_page_number
                                                    }
                                                </p>
                                                <p>
                                                    Name of pages:{" "}
                                                    {
                                                        project_portfolio?.secondary_page_name
                                                    }
                                                </p>
                                            </Switch.Case>
                                            <Switch.Case
                                                condition={!project_portfolio}
                                            >
                                                <p>--</p>
                                            </Switch.Case>
                                        </Switch>
                                    )}
                                </td>
                            </tr>
                            {/* Backup email address */}
                            <tr>
                                <td>17</td>
                                <td>Backup email address</td>
                                <td>
                                    {handleLoadingComponent(
                                        isLoading,
                                        <Placeholder height={16} width="50%" />,
                                        <Switch>
                                            <Switch.Case
                                                condition={project_portfolio}
                                            >
                                                <p>
                                                    {
                                                        project_portfolio.backup_email_address
                                                    }
                                                </p>
                                            </Switch.Case>
                                            <Switch.Case
                                                condition={!project_portfolio}
                                            >
                                                <p>--</p>
                                            </Switch.Case>
                                        </Switch>
                                    )}
                                </td>
                            </tr>
                            {/* Day Interval */}
                            <tr>
                                <td>18</td>
                                <td>Day Interval</td>
                                <td>
                                    {handleLoadingComponent(
                                        isLoading,
                                        <Placeholder height={16} width="50%" />,
                                        <Switch>
                                            <Switch.Case
                                                condition={project_portfolio}
                                            >
                                                <p>
                                                    {
                                                        project_portfolio.day_interval
                                                    }
                                                </p>
                                            </Switch.Case>
                                            <Switch.Case
                                                condition={!project_portfolio}
                                            >
                                                <p>--</p>
                                            </Switch.Case>
                                        </Switch>
                                    )}
                                </td>
                            </tr>
                            {/* Is There Any Major Functions You Want To Mention  About This Project? */}
                            <tr>
                                <td className="verticalAlignTop">19</td>
                                <td className="verticalAlignTop">
                                    Is There Any Major Functions You Want To
                                    Mention About This Project?
                                </td>
                                <td className="verticalAlignTop">
                                    {handleLoadingComponent(
                                        isLoading,
                                        <Placeholder height={16} width="50%" />,
                                        <Switch>
                                            <Switch.Case
                                                condition={project_portfolio}
                                            >
                                                <p
                                                    dangerouslySetInnerHTML={{
                                                        __html: project_portfolio?.description,
                                                    }}
                                                />
                                            </Switch.Case>
                                            <Switch.Case
                                                condition={!project_portfolio}
                                            >
                                                <p>--</p>
                                            </Switch.Case>
                                        </Switch>
                                    )}
                                </td>
                            </tr>
                            {/* Theme Name And Url */}
                            <tr>
                                <td>20</td>
                                <td>Theme Name And Url</td>
                                <td>
                                    {handleLoadingComponent(
                                        isLoading,
                                        <Placeholder height={16} width="50%" />,
                                        <Switch>
                                            <Switch.Case
                                                condition={project_portfolio}
                                            >
                                                <Switch.Case
                                                    condition={
                                                        project_portfolio?.theme_id
                                                    }
                                                >
                                                    <p>
                                                        {
                                                            project_portfolio
                                                                ?.website_theme
                                                                ?.theme_name
                                                        }
                                                    </p>
                                                    <Switch.Case
                                                        condition={
                                                            project_portfolio
                                                                ?.website_theme
                                                                ?.theme_url
                                                        }
                                                    >
                                                        <a
                                                            href={
                                                                project_portfolio
                                                                    ?.website_theme
                                                                    ?.theme_url
                                                            }
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="singleline-ellipsis"
                                                        >
                                                            {
                                                                project_portfolio
                                                                    ?.website_theme
                                                                    ?.theme_url
                                                            }
                                                        </a>
                                                    </Switch.Case>
                                                </Switch.Case>
                                                <Switch.Case
                                                    condition={
                                                        !project_portfolio?.theme_id
                                                    }
                                                >
                                                    <p>
                                                        {
                                                            project_portfolio?.theme_name
                                                        }
                                                    </p>
                                                    <Switch.Case
                                                        condition={
                                                            project_portfolio?.theme_url
                                                        }
                                                    >
                                                        <a
                                                            href={
                                                                project_portfolio?.theme_url
                                                            }
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="singleline-ellipsis"
                                                        >
                                                            {
                                                                project_portfolio?.theme_url
                                                            }
                                                        </a>
                                                    </Switch.Case>
                                                </Switch.Case>
                                            </Switch.Case>
                                            <Switch.Case
                                                condition={!project_portfolio}
                                            >
                                                <p>--</p>
                                            </Switch.Case>
                                        </Switch>
                                    )}
                                </td>
                            </tr>
                            {/* Use significant plugin for this project */}
                            <tr>
                                <td>21</td>
                                <td>Use significant plugin for this project</td>
                                <td>
                                    {handleLoadingComponent(
                                        isLoading,
                                        <Placeholder height={16} width="50%" />,
                                        <Switch>
                                            <Switch.Case
                                                condition={project_portfolio}
                                            >
                                                <p>
                                                    {project_portfolio?.plugin_information ===
                                                    1
                                                        ? "Yes"
                                                        : "No"}
                                                </p>
                                            </Switch.Case>
                                            <Switch.Case
                                                condition={!project_portfolio}
                                            >
                                                <p>--</p>
                                            </Switch.Case>
                                        </Switch>
                                    )}
                                </td>
                            </tr>
                            {/* Plugin Name And Url */}
                            <tr>
                                <td className="verticalAlignTop">22</td>
                                <td className="verticalAlignTop">
                                    Plugin Name And Url
                                </td>
                                <td className="verticalAlignTop">
                                    {handleLoadingComponent(
                                        isLoading,
                                        <Placeholder height={16} width="50%" />,
                                        <Switch>
                                            <Switch.Case
                                                condition={
                                                    project_portfolio &&
                                                    project_portfolio
                                                        ?.plugin_list?.length
                                                }
                                            >
                                                {project_portfolio?.plugin_list?.map(
                                                    (plugin) => (
                                                        <div
                                                            key={
                                                                plugin.plugin_name
                                                            }
                                                            className="mb-2"
                                                        >
                                                            <p>
                                                                {
                                                                    plugin.plugin_name
                                                                }
                                                            </p>
                                                            <Switch.Case
                                                                condition={
                                                                    plugin.plugin_url
                                                                }
                                                            >
                                                                <a
                                                                    href={
                                                                        plugin.plugin_url
                                                                    }
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                    className="singleline-ellipsis"
                                                                >
                                                                    {
                                                                        plugin.plugin_url
                                                                    }
                                                                </a>
                                                            </Switch.Case>
                                                        </div>
                                                    )
                                                )}
                                            </Switch.Case>
                                            <Switch.Case
                                                condition={!project_portfolio}
                                            >
                                                <p>--</p>
                                            </Switch.Case>
                                        </Switch>
                                    )}
                                </td>
                            </tr>
                            {/* Shared the Dummy/test site with client */}
                            <tr>
                                <td className="verticalAlignTop">23</td>
                                <td className="verticalAlignTop">
                                    Shared the Dummy/test site with client
                                </td>
                                <td className="verticalAlignTop">
                                    {handleLoadingComponent(
                                        isLoading,
                                        <Placeholder height={16} width="50%" />,
                                        <Switch>
                                            <Switch.Case
                                                condition={project_submission}
                                            >
                                                <Switch.Case
                                                    condition={
                                                        project_submission?.dummy_information
                                                    }
                                                >
                                                    <p className="mb-1">Yes</p>

                                                    <p className="d-flex">
                                                        <strong>
                                                            Dummy/Test Site
                                                            link:
                                                        </strong>{" "}
                                                        <a
                                                            href={
                                                                project_submission.dummy_link
                                                            }
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="singleline-ellipsis w-50 ml-1"
                                                        >
                                                            {
                                                                project_submission.dummy_link
                                                            }
                                                        </a>
                                                    </p>
                                                </Switch.Case>
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
                            {/* Notified the client about dummy site removal after 2 weeks */}
                            <tr>
                                <td className="verticalAlignTop">24</td>
                                <td className="verticalAlignTop">
                                    Notified the client about dummy site removal
                                    after 2 weeks
                                </td>
                                <td className="verticalAlignTop">
                                    {handleLoadingComponent(
                                        isLoading,
                                        <Placeholder height={16} width="50%" />,
                                        <Switch>
                                            <Switch.Case
                                                condition={project_submission}
                                            >
                                                <p>
                                                    {project_submission?.notify ===
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
                            {/* Collected the Actual site Information */}
                            <tr>
                                <td className="verticalAlignTop">25</td>
                                <td className="verticalAlignTop">
                                    Collected the Actual site Information
                                </td>
                                <td className="verticalAlignTop">
                                    {handleLoadingComponent(
                                        isLoading,
                                        <Placeholder height={16} width="50%" />,
                                        <Switch>
                                            <Switch.Case
                                                condition={project_submission}
                                            >
                                                <p>
                                                    {project_submission?.actual_yes ===
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
                            {/* Shared the Actual site with client */}
                            <tr>
                                <td className="verticalAlignTop">26</td>
                                <td className="verticalAlignTop">
                                    Shared the Actual site with client
                                </td>
                                <td className="verticalAlignTop">
                                    {handleLoadingComponent(
                                        isLoading,
                                        <Placeholder height={16} width="50%" />,
                                        <Switch>
                                            <Switch.Case
                                                condition={project_submission}
                                            >
                                                <Switch.Case
                                                    condition={
                                                        project_submission?.dummy_information ===
                                                        1
                                                    }
                                                >
                                                    <p className="mb-1">Yes</p>

                                                    <p className="d-flex">
                                                        <strong>
                                                            Actual Site link:
                                                        </strong>{" "}
                                                        <a
                                                            href={
                                                                project_submission.actual_link
                                                            }
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="singleline-ellipsis w-50 ml-1"
                                                        >
                                                            {
                                                                project_submission.actual_link
                                                            }
                                                        </a>
                                                    </p>
                                                </Switch.Case>
                                                <Switch.Case
                                                    condition={
                                                        project_submission?.dummy_information ===
                                                        0
                                                    }
                                                >
                                                    <p>No</p>
                                                </Switch.Case>
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
            {/* Admin Comment */}
            <ModalContentContainer>
                <CustomTextArea
                    label={
                        project_submission.admin_comment
                            ? "Admin Comment"
                            : "Comments"
                    }
                    placeholder={"Write your comments here"}
                    name="admin_comment"
                    value={project_submission.admin_comment ?? adminComment}
                    onChange={(e) => {
                        setAdminComment(e.target.value);
                    }}
                    rows={6}
                    cols={50}
                    isDangerHtml={htmlTagRegex.test(
                        project_submission?.admin_comment
                    )}
                    isDisabled={project_submission?.admin_comment ?? false}
                />
            </ModalContentContainer>
            {/* Buttons */}
            <ModalContentContainer className="pt-0">
                <div className="modalButtonContainer">
                    <Switch>
                        <Switch.Case
                            condition={!project_submission?.admin_comment}
                        >
                            <SingleButton
                                label={
                                    isSubmitting ? (
                                        <Loader title="Authorizing" />
                                    ) : (
                                        "Authorize"
                                    )
                                }
                                onClick={handleAdminComment}
                                type="primary"
                            />
                        </Switch.Case>
                    </Switch>
                    <SingleButton
                        label="Close"
                        className=""
                        onClick={closeModal}
                        type="secondary"
                    />
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
