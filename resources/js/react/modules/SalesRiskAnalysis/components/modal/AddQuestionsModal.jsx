import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

// ui components
import CustomModal from "../ui/CustomModal/CustomModal";
import {
    ModalButton,
    ModalInput,
    ModalTitle,
    ModalInputLabel,
    ModalSelectContainer,
} from "../ui/Styles/ui";
import CustomDropDown from "../CustomDropDown";
import DepartmentSelect from "../DepartmentSelect";

// Constants
import { QuestionsTypes } from "../../constant";
import { Flex } from "../../../../global/styled-component/Flex";
import QuestionsSelect from "../QuestionsSelect";

const AddQuestionsModal = ({
    open,
    closeModal,
    addQuestionsData,
    handleChange,
    questionInputFields,
}) => {
    const { departments } = useSelector((state) => state.filterOptions);

    // Formatting dta for dropdown reuse component
    const QuestionsList =
        questionInputFields?.length > 0 &&
        questionInputFields?.find((item) => item?.label === "Parent Question");
    const updateQuestionsList = {
        label: "Parent Questions",
        emptyOptionsLabel: "Select Parent Question",
        id: "parentQuestion",
        data: QuestionsList?.structure,
    };


    return (
        <CustomModal
            open={open}
            closeModal={closeModal}
            contentLabel="Add New Policy"
            width="700px"
            height="fit-content"
            maxHeight="fit-content"
            isCloseButtonShow={true}
        >
            {/* Modal Content */}
            <div className="d-flex flex-column">
                <div className="d-flex justify-content-center align-items-center mb-4">
                    <ModalTitle>Questions</ModalTitle>
                </div>
                <div className="d-flex flex-column mb-4 px-3  w-100">
                    <div className="row mb-4 align-items-center">
                        <ModalInputLabel className="col-4">
                            Title <sup>*</sup>{" "}
                        </ModalInputLabel>
                        <div className="col-8 flex-column px-0">
                            <ModalInput
                                type="text"
                                className="w-100"
                                name="title"
                                onChange={handleChange}
                                placeholder="Write Here"
                            />
                        </div>
                    </div>
                    <div className="row mb-4 align-items-center">
                        <ModalInputLabel className="col-4">
                            Type<sup>*</sup>
                        </ModalInputLabel>
                        <div className="col-8 px-0 flex-column">
                            <ModalSelectContainer>
                                <CustomDropDown
                                    filedName="type"
                                    data={QuestionsTypes}
                                    selected={{}}
                                    setSelected={handleChange}
                                />
                            </ModalSelectContainer>
                        </div>
                    </div>
                    <div className="row mb-4 align-items-center">
                        <ModalInputLabel className="col-4">
                            Parent Question<sup>*</sup>
                        </ModalInputLabel>
                        <div className="col-8 px-0 flex-column">
                            <ModalSelectContainer>
                                <QuestionsSelect
                                    filedName="parent_id"
                                    data={updateQuestionsList}
                                    selected={{}}
                                    setSelected={handleChange}
                                />
                            </ModalSelectContainer>
                        </div>
                    </div>
                    <div className="row mb-4 align-items-center">
                        <ModalInputLabel className="col-4">
                            Placeholder <sup>*</sup>{" "}
                        </ModalInputLabel>
                        <div className="col-8 flex-column px-0">
                            <ModalInput
                                type="text"
                                className="w-100"
                                name="placeholder"
                                onChange={handleChange}
                                placeholder="Write Here"
                            />
                        </div>
                    </div>
                    <div className="row mb-4 align-items-center">
                        <ModalInputLabel className="col-4">
                            Sequence <sup>*</sup>{" "}
                        </ModalInputLabel>
                        <div className="col-8 flex-column px-0">
                            <ModalInput
                                type="text"
                                className="w-100"
                                name="sequence"
                                onChange={handleChange}
                                placeholder="Write Here"
                            />
                        </div>
                    </div>
                    <div className="row mb-4 align-items-center">
                        <ModalInputLabel className="col-4">
                            Department Name<sup>*</sup>
                        </ModalInputLabel>
                        <div className="col-8 px-0 flex-column">
                            <ModalSelectContainer>
                                <DepartmentSelect
                                    data={departments}
                                    selected={{}}
                                    setSelectedDept={handleChange}
                                />
                            </ModalSelectContainer>
                        </div>
                    </div>
                </div>
                <Flex gap="10px" justifyContent="center">
                    <ModalButton width="177px">Add Question</ModalButton>
                    <ModalButton
                        onClick={closeModal}
                        width="177px"
                        color="white"
                        border="1px solid #1492E6"
                        textColor="#1492E6"
                    >
                        Do it latter
                    </ModalButton>
                </Flex>
            </div>
        </CustomModal>
    );
};

export default AddQuestionsModal;
