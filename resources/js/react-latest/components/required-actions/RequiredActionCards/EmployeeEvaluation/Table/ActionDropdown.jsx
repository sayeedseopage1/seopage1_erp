import React, { useState } from "react";
import { ColumnContent } from "./ui";
import { IoIosSend } from "react-icons/io";
import ButtonStyles from "./ActionButton.module.css";
import SingleEvaluationModal from "../modal/SingleEvaluationModal";

const ActionDropdown = ({ data, table }) => {
    const [isSingleEvaluationModalOpen, setSingleEvaluationModalOpen] =
        useState(false);
    const toggleSingleEvaluationModal = () => {
        setSingleEvaluationModalOpen((prevState) => !prevState);
    };
    return (
        <React.Fragment>
            <ColumnContent onClick={() => toggleSingleEvaluationModal()}>
                <button className={ButtonStyles.sendContainer}>
                    {data?.evaluationStatus === "completed" ? (
                        <h4>{data?.averageRating}</h4>
                    ) : (
                        <div>
                            <IoIosSend
                                className={ButtonStyles.send}
                                color="#fff"
                                size={`20px`}
                            />
                            <IoIosSend
                                className={ButtonStyles.send2}
                                color="#696666"
                                size={`20px`}
                            />
                            <p>Evaluate</p>
                        </div>
                    )}
                </button>
            </ColumnContent>

            <SingleEvaluationModal
                isSingleEvaluationModalOpen={isSingleEvaluationModalOpen}
                toggleSingleEvaluationModal={toggleSingleEvaluationModal}
                data={data}
            />
        </React.Fragment>
    );
};

export default ActionDropdown;
