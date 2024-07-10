import React, { useEffect, useState } from "react";

import { IoIosSend } from "react-icons/io";
import ButtonStyles from "../../../components/Table/ActionButton.module.css";
import { ColumnContent } from "../../../components/Table/ui";
import { useAuth } from "../../../../hooks/useAuth";
import Popover from "../../../../../react-latest/ui/Popover";
import EvaluationRatingPopover from "../../../components/Table/EvaluationRatingPopover";
import EvaluationRatingModal from "../../../components/modal/EvaluationRatingModal";
import EvaluationRatingModalPM from "../modal/EvaluationRatingModalPM";
const ActionEvaluationTaskTablePM = ({ data }) => {
    const hideEvaluationButton = [1, 2, 3].includes(data?.task_board_column_id);

    const auth = useAuth();
    const [isSingleEvaluationModalOpen, setSingleEvaluationModalOpen] =
        useState(false);
    const toggleSingleEvaluationModal = () => {
        setSingleEvaluationModalOpen((prevState) => !prevState);
    };
    return (
        <React.Fragment>
            <ColumnContent>
                {auth.roleId === 8 && (
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

                {auth.roleId === 1 && (
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

            <EvaluationRatingModalPM
                isSingleEvaluationModalOpen={isSingleEvaluationModalOpen}
                toggleSingleEvaluationModal={toggleSingleEvaluationModal}
                data={data}
            />
        </React.Fragment>
    );
};

export default ActionEvaluationTaskTablePM;
