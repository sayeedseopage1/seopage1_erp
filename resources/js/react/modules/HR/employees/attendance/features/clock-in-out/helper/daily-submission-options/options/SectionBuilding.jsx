import React, { useEffect, useState } from "react";
import styled from "styled-components";

import {
    FileMainContainer,
    FileMainHeader,
    FilesContainer,
    FlexSectionContainer,
    InputItem,
    InstructionText,
    LinkAndFileContainer,
    Section,
    SectionContainer,
    SectionHeader,
    SectionTitle,
    StyledFileUploadContainer,
    StyledInputItem,
    StyledSection,
} from "../../../DailySubmissionUI";
import FileUpload from "../components/FileUpload";
import FileLists from "../components/FileLists";
import { FileListSection } from "../components/FileListsSection";

const SectionBuilding = ({
    sectionId,
    pageNumber,
    category,
    setSinglePageData,
}) => {
    const [sectionBuildingData, setSectionBuildingData] = useState({
        id: `${sectionId}`,
        pageNumber: `${pageNumber}`,
        categoryId: `${category.id}`,
        categoryName: `${category.name}`,
        sectionName: "",
        webVersionUrl: "",
        mobileVersionUrl: "",
        tabVersionUrl: "",
        webVersionFile: [],
        mobileVersionFile: [],
        tabVersionFile: [],
        comment: "",
    });

    useEffect(() => {
        setSinglePageData((prev) => {
            const index = prev.findIndex(
                (item) => item.id === sectionBuildingData.id
            );
            if (index > -1) {
                // Update existing section
                const updatedData = [...prev];
                updatedData[index] = sectionBuildingData;
                return updatedData;
            } else {
                // Add new section
                return [...prev, sectionBuildingData];
            }
        });
    }, [sectionBuildingData]);
    const handleDataChange = (value, dataName) => {
        const fileDataNames = [
            "webVersionFile",
            "mobileVersionFile",
            "tabVersionFile",
        ];

        if (fileDataNames.includes(dataName)) {
            const fileArray = Array.from(value);
            setSectionBuildingData({
                ...sectionBuildingData,
                [dataName]: fileArray,
            });
        } else {
            setSectionBuildingData({
                ...sectionBuildingData,
                [dataName]: value,
            });
        }
    };

    console.log("section building data", sectionBuildingData);
    return (
        <StyledSection>
            <SectionHeader>Section Name</SectionHeader>
            <StyledInputItem>
                <InputItem
                    width="100%"
                    placeHolder=""
                    onChange={(e) =>
                        handleDataChange(e.target.value, "sectionName")
                    }
                />
            </StyledInputItem>
            <LinkAndFileContainer>
                <InstructionText>
                    Enter screen record for section 1
                </InstructionText>
                <SectionHeader>(i) Web versions</SectionHeader>
                <FlexSectionContainer>
                    <StyledInputItem>
                        <InputItem
                            height="35px"
                            width="100%"
                            placeHolder=""
                            background="#A2CBE8"
                            onChange={(e) =>
                                handleDataChange(
                                    e.target.value,
                                    "webVersionUrl"
                                )
                            }
                        />
                    </StyledInputItem>
                    <StyledFileUploadContainer>
                        <FileUpload
                            handleFileChange={(e) =>
                                handleDataChange(
                                    e.target.files,
                                    "webVersionFile"
                                )
                            }
                        />
                    </StyledFileUploadContainer>
                </FlexSectionContainer>

                <SectionHeader>(ii) Mobile Versions</SectionHeader>
                <FlexSectionContainer>
                    <StyledInputItem>
                        <InputItem
                            height="35px"
                            width="100%"
                            placeHolder=""
                            background="#A2CBE8"
                            onChange={(e) =>
                                handleDataChange(
                                    e.target.value,
                                    "mobileVersionUrl"
                                )
                            }
                        />
                    </StyledInputItem>
                    <StyledFileUploadContainer>
                        <FileUpload
                            handleFileChange={(e) =>
                                handleDataChange(
                                    e.target.files,
                                    "mobileVersionFile"
                                )
                            }
                        />
                    </StyledFileUploadContainer>
                </FlexSectionContainer>

                <SectionHeader>(iii) Tab versions</SectionHeader>
                <FlexSectionContainer>
                    <StyledInputItem>
                        <InputItem
                            height="35px"
                            width="100%"
                            placeHolder=""
                            background="#A2CBE8"
                            onChange={(e) =>
                                handleDataChange(
                                    e.target.value,
                                    "tabVersionUrl"
                                )
                            }
                        />
                    </StyledInputItem>
                    <StyledFileUploadContainer>
                        <FileUpload
                            handleFileChange={(e) =>
                                handleDataChange(
                                    e.target.files,
                                    "tabVersionFile"
                                )
                            }
                        />
                    </StyledFileUploadContainer>
                </FlexSectionContainer>

                <FileMainContainer>
                    <FileMainHeader>Attached Files:</FileMainHeader>
                    <FilesContainer>
                        <FileListSection
                            title="Web Version"
                            links={sectionBuildingData?.webVersionFile}
                        />
                        <FileListSection
                            title="Mobile Version"
                            links={sectionBuildingData?.mobileVersionFile}
                        />
                        <FileListSection
                            title="Tab Version"
                            links={sectionBuildingData?.tabVersionFile}
                        />
                    </FilesContainer>
                </FileMainContainer>
            </LinkAndFileContainer>

            <br />
            <SectionHeader>Comment</SectionHeader>
            <StyledInputItem>
                <InputItem
                    width="100%"
                    placeHolder=""
                    onChange={(e) =>
                        handleDataChange(e.target.value, "comment")
                    }
                />
            </StyledInputItem>
        </StyledSection>
    );
};

export default SectionBuilding;
