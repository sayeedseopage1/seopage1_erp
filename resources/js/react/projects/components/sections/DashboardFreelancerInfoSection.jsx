import React from "react";
import { AiOutlineMessage } from "react-icons/ai";
import { TbUserSquareRounded } from "react-icons/tb";
import PropTypes from "prop-types";

// Components - UI - Custom
import Switch from "../../../global/Switch";
import { SectionContainer } from "../ui/styledComponents";

// style
import style from "./styles/dashboardFreelancerInfoSection.module.css";
import { handleLoadingComponent } from "../../helper";
import TextLoaderDynamic from "../loader/TextLoaderDynamic";

const DashboardFreelancerInfoSection = ({ projectData, isLoading }) => {
    const dealInfo = projectData?.projectData?.project?.deal;
    return (
        <div className={`${style.dashboardFreelancerInfoSection} mb-4`}>
            <Switch>
                <Switch.Case condition={dealInfo?.message_link?.length > 0}>
                    <SectionContainer
                        color="#D8EDFC"
                        border="1px dashed #1492E6;"
                    >
                        <div
                            className={`${style.dashboardFreelancerInfoContent}`}
                        >
                            <h2>Freelancer Message Link</h2>
                            {handleLoadingComponent(
                                isLoading,
                                <p className="d-flex align-items-center">
                                    <AiOutlineMessage />{" "}
                                    <TextLoaderDynamic
                                        number={1}
                                        widthDeference={20}
                                        hight={16}
                                        parentClassName="w-100 w-md-75 align-items-center"
                                    />
                                </p>,
                                dealInfo?.message_link?.map((message) => (
                                    <p
                                        className="d-flex align-items-center mb-2"
                                        key={message}
                                    >
                                        <AiOutlineMessage />{" "}
                                        <a
                                            href={message}
                                            className="singleline-ellipsis"
                                        >
                                            {message}
                                        </a>
                                    </p>
                                ))
                            )}
                        </div>
                    </SectionContainer>
                </Switch.Case>
            </Switch>
            <SectionContainer color="#D8EDFC" border="1px dashed #1492E6;">
                <div className={`${style.dashboardFreelancerInfoContent}`}>
                    <h2>Freelancer Profile Link</h2>
                    {handleLoadingComponent(
                        isLoading,
                        <p className="d-flex align-items-center">
                            <TbUserSquareRounded />{" "}
                            <TextLoaderDynamic
                                number={1}
                                widthDeference={20}
                                hight={16}
                                parentClassName="w-100 w-md-75 align-items-center"
                            />
                        </p>,
                        <p className="d-flex">
                            <TbUserSquareRounded />{" "}
                            <a
                                href={dealInfo?.profile_link}
                                className="singleline-ellipsis"
                            >
                                {dealInfo?.profile_link}
                            </a>
                        </p>
                    )}
                </div>
            </SectionContainer>
        </div>
    );
};

export default DashboardFreelancerInfoSection;

DashboardFreelancerInfoSection.propTypes = {
    projectData: PropTypes.object,
};
