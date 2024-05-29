import React from "react";
import PropTypes from "prop-types";

// Components - Local - Custom
import CustomAntModal from "../ui/CustomAntModal/CustomAntModal";
import CustomModalHeader from "../ui/CustomModalHeader/CustomModalHeader";
import ColorItem from "../ColorItem";

// Components - Global - Loaders
import { Placeholder } from "../../../global/Placeholder";

// Components - Global - Switch
import Switch from "../../../global/Switch";

// Helper
import { handleLoadingComponent } from "../../helper";

// Components - Styled Components
import { ModalContentContainer } from "../ui/styledComponents";

const PMTaskGuidelineModal = ({ isModalOpen, closeModal, modalData }) => {
    const [isLoading, setIsLoading] = React.useState(false);
    const [pmTaskGuidelineData, setPmTaskGuidelineData] = React.useState();

    // Dummy Data
    const dataPromise = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(modalData);
        }, 5000);
    });

    // Fetch Data Pm Task Guideline Dummy Data
    const fetchData = async () => {
        setIsLoading(true);
        try {
            const data = await dataPromise;
            setPmTaskGuidelineData(data);
            setIsLoading(false);
        } catch (error) {
            console.error("Error fetching data: ", error);
        }
    };

    // Fetch Data Pm Task Guideline
    React.useEffect(() => {
        if (isModalOpen) {
            fetchData();
        }
    }, [isModalOpen]);

    console.log(pmTaskGuidelineData);

    return (
        <CustomAntModal
            isModalOpen={isModalOpen}
            closeModal={closeModal}
            width="956px"
            height="auto"
        >
            <CustomModalHeader
                title="Parent Task Guideline"
                closeModal={closeModal}
            />
            <ModalContentContainer
                style={{
                    borderRadius: "0 0 8px 8px",
                }}
            >
                <div className="modalContentWrapper">
                    {/* Theme Details */}
                    <div>
                        <h6 className="modalSectionHeader">Theme</h6>
                        <div className="dashboardModalTableContainer my-3">
                            <div className="row dashboardModalTableItem flex-column flex-md-row ">
                                <div className="col-12 col-md-6">
                                    Provide Theme Details :
                                </div>
                                <div className="col-12 col-md-6">
                                    {handleLoadingComponent(
                                        isLoading,
                                        <Placeholder
                                            width="80%"
                                            height="16px"
                                        />,
                                        <p className="p-0">
                                            {pmTaskGuidelineData?.theme_details ===
                                            1
                                                ? "Yes"
                                                : "No"}
                                        </p>
                                    )}
                                </div>
                            </div>
                            <div className="row dashboardModalTableItem flex-column flex-md-row ">
                                <div className="col-12 col-md-6">
                                    Theme Name :
                                </div>
                                <div className="col-12 col-md-6">
                                    {handleLoadingComponent(
                                        isLoading,
                                        <Placeholder
                                            width="80%"
                                            height="16px"
                                        />,
                                        <Switch>
                                            <Switch.Case
                                                condition={
                                                    pmTaskGuidelineData?.theme_name
                                                }
                                            >
                                                <p className="p-0">
                                                    {
                                                        pmTaskGuidelineData?.theme_name
                                                    }
                                                </p>
                                            </Switch.Case>
                                            <Switch.Case
                                                condition={
                                                    !pmTaskGuidelineData?.theme_name
                                                }
                                            >
                                                <p className="p-0">
                                                    Not Shared
                                                </p>
                                            </Switch.Case>
                                        </Switch>
                                    )}
                                </div>
                            </div>
                            <div className="row dashboardModalTableItem flex-column flex-md-row ">
                                <div className="col-12 col-md-6">
                                    Theme Url :
                                </div>
                                <div className="col-12 col-md-6">
                                    {handleLoadingComponent(
                                        isLoading,
                                        <Placeholder
                                            width="80%"
                                            height="16px"
                                        />,
                                        <Switch>
                                            <Switch.Case
                                                condition={
                                                    pmTaskGuidelineData?.theme_url
                                                }
                                            >
                                                <a
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    href={
                                                        pmTaskGuidelineData?.theme_url
                                                    }
                                                >
                                                    View On New Tab
                                                </a>
                                            </Switch.Case>
                                            <Switch.Case
                                                condition={
                                                    !pmTaskGuidelineData?.theme_url
                                                }
                                            >
                                                <p className="p-0">
                                                    Not Shared
                                                </p>
                                            </Switch.Case>
                                        </Switch>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Color Details */}
                    <div>
                        <h6 className="modalSectionHeader">Color</h6>
                        <div className="dashboardModalTableContainer my-3">
                            <div className="row dashboardModalTableItem flex-column flex-md-row ">
                                <div className="col-12 col-md-6">
                                    Color Scheme Details :
                                </div>
                                <div className="col-12 col-md-6">
                                    {handleLoadingComponent(
                                        isLoading,
                                        <Placeholder
                                            width="80%"
                                            height="16px"
                                        />,
                                        <p className="p-0">
                                            {pmTaskGuidelineData?.color_schema ===
                                            1
                                                ? "Yes"
                                                : "No"}
                                        </p>
                                    )}
                                </div>
                            </div>
                            <div className="row dashboardModalTableItem flex-column flex-md-row ">
                                <div className="col-12 col-md-6">
                                    Primary Color :
                                </div>
                                <div className="col-12 col-md-6">
                                    {" "}
                                    {handleLoadingComponent(
                                        isLoading,
                                        <Placeholder
                                            width="80%"
                                            height="16px"
                                        />,
                                        <Switch>
                                            <Switch.Case
                                                condition={
                                                    pmTaskGuidelineData?.primary_color
                                                }
                                            >
                                                <ColorItem
                                                    color={
                                                        pmTaskGuidelineData?.primary_color
                                                    }
                                                />
                                            </Switch.Case>
                                            <Switch.Case
                                                condition={
                                                    !pmTaskGuidelineData?.primary_color
                                                }
                                            >
                                                <p>Not Shared</p>
                                            </Switch.Case>
                                        </Switch>
                                    )}
                                </div>
                            </div>
                            <div className="row dashboardModalTableItem flex-column flex-md-row ">
                                <div className="col-12 col-md-6">
                                    Where Should Developer Use this Color: :
                                </div>
                                <div className="col-12 col-md-6 dangerouslySetInnerStyle">
                                    {" "}
                                    {handleLoadingComponent(
                                        isLoading,
                                        <Placeholder
                                            width="80%"
                                            height="16px"
                                        />,
                                        <Switch>
                                            <Switch.Case
                                                condition={
                                                    pmTaskGuidelineData?.primary_color_description
                                                }
                                            >
                                                <ColorItem
                                                    desc={
                                                        pmTaskGuidelineData?.primary_color_description
                                                    }
                                                    isDescUse={true}
                                                    isColorUse={false}
                                                />
                                            </Switch.Case>
                                            <Switch.Case
                                                condition={
                                                    !pmTaskGuidelineData?.primary_color_description
                                                }
                                            >
                                                <p>Not Shared</p>
                                            </Switch.Case>
                                        </Switch>
                                    )}
                                </div>
                            </div>
                            <div className="row dashboardModalTableItem flex-column flex-md-row ">
                                <div className="col-12 col-md-6">
                                    Secondary Color:
                                </div>
                                <div className="col-12 col-md-6">
                                    {" "}
                                    {handleLoadingComponent(
                                        isLoading,
                                        <Placeholder
                                            width="80%"
                                            height="16px"
                                        />,
                                        <Switch>
                                            <Switch.Case
                                                condition={
                                                    pmTaskGuidelineData?.color
                                                        ?.length > 0
                                                }
                                            >
                                                <ol className="d-flex flex-wrap">
                                                    {pmTaskGuidelineData?.color?.map(
                                                        (color, i) => {
                                                            return (
                                                                <li key={color}>
                                                                    <ColorItem
                                                                        color={
                                                                            color
                                                                        }
                                                                        isDescUse={
                                                                            false
                                                                        }
                                                                    />
                                                                </li>
                                                            );
                                                        }
                                                    )}
                                                </ol>
                                            </Switch.Case>
                                            <Switch.Case
                                                condition={
                                                    pmTaskGuidelineData?.color
                                                        ?.length === 0 ||
                                                    !pmTaskGuidelineData?.color
                                                }
                                            >
                                                <p>Not Shared</p>
                                            </Switch.Case>
                                        </Switch>
                                    )}
                                </div>
                            </div>
                            <div className="row dashboardModalTableItem flex-column flex-md-row ">
                                <div className="col-12 col-md-6">
                                    Where Should Developer Use this Color:
                                </div>
                                <div className="col-12 col-md-6 dangerouslySetInnerStyle">
                                    {" "}
                                    {handleLoadingComponent(
                                        isLoading,
                                        <Placeholder
                                            width="80%"
                                            height="16px"
                                        />,
                                        <Switch>
                                            <Switch.Case
                                                condition={
                                                    pmTaskGuidelineData?.color_description
                                                }
                                            >
                                                <ol className="d-flex flex-column">
                                                    {pmTaskGuidelineData?.color_description?.map(
                                                        (desc, i) => {
                                                            return (
                                                                <li key={desc}>
                                                                    <ColorItem
                                                                        desc={
                                                                            desc
                                                                        }
                                                                        isDescUse={
                                                                            true
                                                                        }
                                                                        isColorUse={
                                                                            false
                                                                        }
                                                                    />
                                                                </li>
                                                            );
                                                        }
                                                    )}
                                                </ol>
                                            </Switch.Case>
                                            <Switch.Case
                                                condition={
                                                    !pmTaskGuidelineData?.color_description
                                                }
                                            >
                                                <p>Not Shared</p>
                                            </Switch.Case>
                                        </Switch>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Design Details */}
                    <div>
                        <h6 className="modalSectionHeader">Design</h6>
                        <div className="dashboardModalTableContainer my-3">
                            <div className="row dashboardModalTableItem flex-column flex-md-row ">
                                <div className="col-12 col-md-6">
                                    Design Details Provided:
                                </div>
                                <div className="col-12 col-md-6">
                                    {" "}
                                    {handleLoadingComponent(
                                        isLoading,
                                        <Placeholder
                                            width="80%"
                                            height="16px"
                                        />,
                                        <p className="p-0">
                                            {pmTaskGuidelineData?.design_details ===
                                            1
                                                ? "Yes"
                                                : "No"}
                                        </p>
                                    )}
                                </div>
                            </div>
                            <div className="row dashboardModalTableItem flex-column flex-md-row ">
                                <div className="col-12 col-md-6">
                                    Design Reference Type :
                                </div>
                                <div className="col-12 col-md-6">
                                    {" "}
                                    {handleLoadingComponent(
                                        isLoading,
                                        <Placeholder
                                            width="80%"
                                            height="16px"
                                        />,
                                        <Switch>
                                            <Switch.Case
                                                condition={
                                                    pmTaskGuidelineData?.design
                                                }
                                            >
                                                <p className="p-0">
                                                    {
                                                        pmTaskGuidelineData?.design
                                                    }
                                                </p>
                                            </Switch.Case>
                                            <Switch.Case
                                                condition={
                                                    !pmTaskGuidelineData?.design
                                                }
                                            >
                                                <p className="p-0">
                                                    Not Shared
                                                </p>
                                            </Switch.Case>
                                        </Switch>
                                    )}
                                </div>
                            </div>
                            <div className="row dashboardModalTableItem flex-column flex-md-row ">
                                <div className="col-12 col-md-6">
                                    Reference Site Link :
                                </div>
                                <div className="col-12 col-md-6">
                                    {handleLoadingComponent(
                                        isLoading,
                                        <Placeholder
                                            width="80%"
                                            height="16px"
                                        />,
                                        <Switch>
                                            <Switch.Case
                                                condition={
                                                    pmTaskGuidelineData
                                                        ?.reference_link
                                                        ?.length > 0
                                                }
                                            >
                                                <ol className="orderListItem">
                                                    {pmTaskGuidelineData?.reference_link?.map(
                                                        (link) => {
                                                            return (
                                                                <li key={link}>
                                                                    <a
                                                                        target="_blank"
                                                                        rel="noreferrer"
                                                                        href={
                                                                            link
                                                                        }
                                                                        key={
                                                                            link
                                                                        }
                                                                    >
                                                                        View On
                                                                        New Tab
                                                                    </a>
                                                                </li>
                                                            );
                                                        }
                                                    )}
                                                </ol>
                                            </Switch.Case>
                                            <Switch.Case
                                                condition={
                                                    pmTaskGuidelineData
                                                        ?.reference_link
                                                        ?.length === 0 ||
                                                    !pmTaskGuidelineData?.reference_link
                                                }
                                            >
                                                <p>Not Shared</p>
                                            </Switch.Case>
                                        </Switch>
                                    )}
                                </div>
                            </div>
                            <div className="row dashboardModalTableItem flex-column flex-md-row ">
                                <div className="col-12 col-md-6">
                                    Instruction :
                                </div>
                                <div className="col-12 col-md-6 dangerouslySetInnerStyle">
                                    {" "}
                                    {handleLoadingComponent(
                                        isLoading,
                                        <Placeholder
                                            width="80%"
                                            height="16px"
                                        />,
                                        <Switch>
                                            <Switch.Case
                                                condition={
                                                    pmTaskGuidelineData?.instruction
                                                }
                                            >
                                                <p
                                                    dangerouslySetInnerHTML={{
                                                        __html: pmTaskGuidelineData?.instruction,
                                                    }}
                                                />
                                            </Switch.Case>
                                            <Switch.Case
                                                condition={
                                                    !pmTaskGuidelineData?.instruction
                                                }
                                            >
                                                <p>Not Shared</p>
                                            </Switch.Case>
                                        </Switch>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Plugin Details */}
                    <div>
                        <h6 className="modalSectionHeader">Plugin</h6>
                        <div className="dashboardModalTableContainer my-3">
                            <div className="row dashboardModalTableItem flex-column flex-md-row ">
                                <div className="col-12 col-md-6">
                                    Plugin Research :
                                </div>
                                <div className="col-12 col-md-6">
                                    {handleLoadingComponent(
                                        isLoading,
                                        <Placeholder
                                            width="80%"
                                            height="16px"
                                        />,
                                        <p className="p-0">
                                            {pmTaskGuidelineData?.plugin_research ===
                                            1
                                                ? "Yes"
                                                : "No"}
                                        </p>
                                    )}
                                </div>
                            </div>
                            <div className="row dashboardModalTableItem flex-column flex-md-row ">
                                <div className="col-12 col-md-6">
                                    Plugin Name :
                                </div>
                                <div className="col-12 col-md-6">
                                    {handleLoadingComponent(
                                        isLoading,
                                        <Placeholder
                                            width="80%"
                                            height="16px"
                                        />,
                                        <Switch>
                                            <Switch.Case
                                                condition={
                                                    pmTaskGuidelineData?.plugin_name
                                                }
                                            >
                                                <p className="p-0">
                                                    {
                                                        pmTaskGuidelineData?.plugin_name
                                                    }
                                                </p>
                                            </Switch.Case>
                                            <Switch.Case
                                                condition={
                                                    !pmTaskGuidelineData?.plugin_name
                                                }
                                            >
                                                <p>Not Shared</p>
                                            </Switch.Case>
                                        </Switch>
                                    )}
                                </div>
                            </div>
                            <div className="row dashboardModalTableItem flex-column flex-md-row ">
                                <div className="col-12 col-md-6">
                                    Plugin Url :
                                </div>
                                <div className="col-12 col-md-6">
                                    {handleLoadingComponent(
                                        isLoading,
                                        <Placeholder
                                            width="80%"
                                            height="16px"
                                        />,
                                        <Switch>
                                            <Switch.Case
                                                condition={
                                                    pmTaskGuidelineData?.plugin_url
                                                }
                                            >
                                                <a
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    href={
                                                        pmTaskGuidelineData?.plugin_url
                                                    }
                                                >
                                                    View On New Tab
                                                </a>
                                            </Switch.Case>
                                            <Switch.Case
                                                condition={
                                                    !pmTaskGuidelineData?.plugin_url
                                                }
                                            >
                                                <p>Not Shared</p>
                                            </Switch.Case>
                                        </Switch>
                                    )}
                                </div>
                            </div>
                            <div className="row dashboardModalTableItem flex-column flex-md-row ">
                                <div className="col-12 col-md-6">
                                    Instructions for Using This Plugin :
                                </div>
                                <div className="col-12 col-md-6 dangerouslySetInnerStyle">
                                    {" "}
                                    {handleLoadingComponent(
                                        isLoading,
                                        <Placeholder
                                            width="80%"
                                            height="16px"
                                        />,
                                        <Switch>
                                            <Switch.Case
                                                condition={
                                                    pmTaskGuidelineData?.instruction_plugin
                                                }
                                            >
                                                <p
                                                    dangerouslySetInnerHTML={{
                                                        __html: pmTaskGuidelineData?.instruction_plugin,
                                                    }}
                                                />
                                            </Switch.Case>
                                            <Switch.Case
                                                condition={
                                                    !pmTaskGuidelineData?.instruction_plugin
                                                }
                                            >
                                                <p>Not Shared</p>
                                            </Switch.Case>
                                        </Switch>
                                    )}
                                </div>
                            </div>
                            <div className="row dashboardModalTableItem flex-column flex-md-row ">
                                <div className="col-12 col-md-6">
                                    Google Drive Link :{" "}
                                </div>
                                <div className="col-12 col-md-6">
                                    {handleLoadingComponent(
                                        isLoading,
                                        <Placeholder
                                            width="80%"
                                            height="16px"
                                        />,
                                        <Switch>
                                            <Switch.Case
                                                condition={
                                                    pmTaskGuidelineData?.google_drive_link
                                                }
                                            >
                                                <a
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    href={
                                                        pmTaskGuidelineData?.google_drive_link
                                                    }
                                                >
                                                    View On New Tab
                                                </a>
                                            </Switch.Case>
                                            <Switch.Case
                                                condition={
                                                    !pmTaskGuidelineData?.google_drive_link
                                                }
                                            >
                                                <p>Not Shared</p>
                                            </Switch.Case>
                                        </Switch>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </ModalContentContainer>
        </CustomAntModal>
    );
};

export default PMTaskGuidelineModal;

PMTaskGuidelineModal.propTypes = {
    isModalOpen: PropTypes.bool,
    closeModal: PropTypes.func,
    modalData: PropTypes.object,
};
