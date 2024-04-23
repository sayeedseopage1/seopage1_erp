import React, { useState } from "react";
import { ColumnContent } from "./ui";
import { IoIosSend } from "react-icons/io";
import ButtonStyles from "./ActionButton.module.css";
import SingleEvaluationModal from "../modal/SingleEvaluationModal";
import { useAuth } from "../../../../../../react/hooks/useAuth";

const ActionDropdown = ({ data, table }) => {
    const auth = useAuth();
    const [isSingleEvaluationModalOpen, setSingleEvaluationModalOpen] =
        useState(false);
    const toggleSingleEvaluationModal = () => {
        setSingleEvaluationModalOpen((prevState) => !prevState);
    };
    return (
        <React.Fragment>
            <ColumnContent onClick={() => toggleSingleEvaluationModal()}>
                {auth.roleId === 6 && (
                    <button
                        className={ButtonStyles.sendContainer}
                        disabled={data.finalSubmissionStatus}
                    >
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
                )}

                {(auth.roleId === 8 || auth.roleId === 1) && (
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
                )}
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
