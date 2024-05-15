import React, { useEffect, useState } from "react";
import { ColumnContent } from "./ui";
import { IoIosSend } from "react-icons/io";
import ButtonStyles from "./ActionButton.module.css";

import { useAuth } from "../../../hooks/useAuth";
import Popover from "../../../../react-latest/ui/Popover";

import EvaluationRatingPopover from "./EvaluationRatingPopover";
import EvaluationRatingModal from "../modal/EvaluationRatingModal";

const ActionEvaluationTaskTable = ({ data }) => {
    const hideEvaluationButton =
        Number(data?.total_min) < 5 && data?.submission_date === null;
    const auth = useAuth();
    const [isSingleEvaluationModalOpen, setSingleEvaluationModalOpen] =
        useState(false);
    const toggleSingleEvaluationModal = () => {
        setSingleEvaluationModalOpen((prevState) => !prevState);
    };
    return (
        <React.Fragment>
            <ColumnContent>
                {auth.roleId === 6 && (
                    <div>
                        {!hideEvaluationButton ? (
                            <button
                                onClick={() => toggleSingleEvaluationModal()}
                                className={ButtonStyles.sendContainer}
                                // disabled={data?.avg_rating}
                            >
                                {data?.avg_rating ? (
                                    <h4>{data?.avg_rating}</h4>
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
                        ) : (
                            <div
                                style={{ minWidth: "10rem", marginTop: "10px" }}
                            >
                                <Popover>
                                    <Popover.Button>
                                        <span
                                            className=" singleline-ellipsis"
                                            style={{ color: "red" }}
                                        >
                                            Not applicable for rating
                                        </span>
                                    </Popover.Button>

                                    <Popover.Panel>
                                        <EvaluationRatingPopover data={data} />
                                    </Popover.Panel>
                                </Popover>
                            </div>
                        )}
                    </div>
                )}

                {(auth.roleId === 8 || auth.roleId === 1) && (
                    <div>
                        {!hideEvaluationButton ? (
                            <button
                                onClick={() => toggleSingleEvaluationModal()}
                                className={ButtonStyles.sendContainer}
                                style={{ color: "white", fontSize: "16px" }}
                            >
                                {data?.avg_rating}
                            </button>
                        ) : (
                            <div
                                style={{ minWidth: "10rem", marginTop: "10px" }}
                            >
                                <Popover>
                                    <Popover.Button>
                                        <span
                                            className=" singleline-ellipsis"
                                            style={{ color: "red" }}
                                        >
                                            Not applicable for rating
                                        </span>
                                    </Popover.Button>

                                    <Popover.Panel>
                                        <EvaluationRatingPopover data={data} />
                                    </Popover.Panel>
                                </Popover>
                            </div>
                        )}
                    </div>
                )}
            </ColumnContent>

            <EvaluationRatingModal
                isSingleEvaluationModalOpen={isSingleEvaluationModalOpen}
                toggleSingleEvaluationModal={toggleSingleEvaluationModal}
                data={data}
            />
        </React.Fragment>
    );
};

export default ActionEvaluationTaskTable;
