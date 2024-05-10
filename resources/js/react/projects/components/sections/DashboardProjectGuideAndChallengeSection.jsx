import React, { useEffect } from "react";
import PropTypes from "prop-types";
import Swal from "sweetalert2";

// Components - UI - Shared
import DashboardCardTitle from "../ui/DashboardCardTitle/DashboardCardTitle";

// Components - custom
import {
    SectionContainer,
    SectionContentContainer,
} from "../ui/styledComponents";

// Styles
import style from "./styles/dashboardProjectGuideAndChallengeSection.module.css";

// Helper
import { formatHttp } from "../../helper";
import { htmlToPreservedText } from "../../../UI/comments/utils/getTextContent";

const MdOutlineContentCopy = `<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24v24H0V0z"></path><path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"></path></svg>`;

const MdDone = `<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24v24H0z"></path><path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"></path></svg>`;

const DashboardProjectGuideAndChallengeSection = ({ projectData }) => {
    const projectInfo = projectData.projectData.project;
    const [isCopied, setIsCopied] = React.useState(false);

    const handleCopy = () => {
        const allSelectedCommentsString = htmlToPreservedText(projectInfo.project_summary)
        window.navigator.clipboard
            .writeText(allSelectedCommentsString)
            .then(() => {
                Swal.fire({
                    icon: "success",
                    title: "Project General Guidelines copied successfully",
                    timer: 2000,
                    showConfirmButton: true,
                    timerProgressBar: true,
                });
            })
            .catch(() => {
                Swal.fire({
                    icon: "error",
                    title: "Project General Guidelines didn't copied",
                    timer: 2000,
                    showConfirmButton: true,
                    timerProgressBar: true,
                });
            })
            .finally(() => {
                //   setIsLoading(false);
            });
        setIsCopied(true);
        setTimeout(() => {
            setIsCopied(false);
        }, 1000);
    };

    useEffect(() => {
        const clipboardIcon = document.querySelector(".clipboardIcon");
        if (clipboardIcon) {
            if (!isCopied) {
                clipboardIcon.innerHTML = MdOutlineContentCopy;
            } else {
                clipboardIcon.innerHTML = MdDone;
            }
            clipboardIcon.addEventListener("click", handleCopy);
        }
    }, [isCopied]);

    return (
        <div
            className={`${style.dashboardProjectGuideAndChallengeSection} mb-4`}
        >
            <SectionContainer>
                <DashboardCardTitle
                    title="Project General Guidelines"
                    isBorderUse={false}
                />
                <SectionContentContainer
                    color="#FFF"
                    maxHeight="35vh"
                    dangerouslySetInnerHTML={{
                        __html: `
                            ${formatHttp(projectInfo.project_summary)}
                            <button class="clipboardIcon">
                                
                            </button>
                        `,
                    }}
                />
            </SectionContainer>
            <SectionContainer>
                <DashboardCardTitle
                    title="Project Challenge"
                    isBorderUse={false}
                />
                <SectionContentContainer color="#FFF" maxHeight="35vh">
                    <p>
                        {projectInfo.project_challenges ?? projectInfo.comment}
                    </p>
                </SectionContentContainer>
            </SectionContainer>
        </div>
    );
};

export default DashboardProjectGuideAndChallengeSection;

DashboardProjectGuideAndChallengeSection.propTypes = {
    projectData: PropTypes.object,
};
