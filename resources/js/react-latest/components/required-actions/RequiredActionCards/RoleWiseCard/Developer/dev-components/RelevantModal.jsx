//mitul work start
import RelevantBg from "../../../../../../../react/UI/comments/media/comments_body_bg.svg";
import WarningIcon from "../../../../../../assest/warning.svg";
import { RxCrossCircled } from "react-icons/rx";
import ReactModal from "react-modal";
import { Flex } from "../../../EmployeeEvaluation/Table/ui";
import { useSelector } from "react-redux";
import { usePendingActionsIdMutation } from "../../../../../../services/api/pendingActionsApiSlice";
import { useEffect, useState } from "react";
import React from "react";
import useCounterStore from "../../../../../Zustand/store";

const RelevantModal = ({ isRelevantModal, setIsRelevantModal }) => {
    const { increaseCount } = useCounterStore();
    const pendingActionId = useSelector(
        (state) => state.pendingActions.pendingActionId
    );

    const [updatePendingAction] = usePendingActionsIdMutation();

    const submitHandler = (e) => {
        e.preventDefault();

        updatePendingAction({
            id: pendingActionId,
        });
        // .unwrap()
        // .then((res) => {
        //     setIsRelevantModal(false);
        //     increaseCount();
        // })
        // .catch((err) => {
        //     console.log(err);
        // });

        setIsRelevantModal(false);
        increaseCount();
    };
    return (
        <ReactModal
            style={{
                overlay: {
                    backgroundColor: "rgba(0, 0, 0, 0.3)",
                    margin: "auto auto",
                    zIndex: 100,
                },
                content: {
                    borderRadius: "10px",
                    maxWidth: "800px",
                    height: "260px",
                    margin: "auto auto",
                    border: "none",
                    overflow: "hidden",
                    padding: "10px",
                    backgroundImage: `url(${RelevantBg})`,
                    backgroundSize: "cover",
                    border: "1px solid #85CBFF",
                },
            }}
            isOpen={isRelevantModal}
            onRequestClose={() => setIsRelevantModal(false)}
        >
            <div
                onClick={() => setIsRelevantModal(false)}
                className="d-flex justify-content-end"
                style={{ cursor: "pointer" }}
            >
                <RxCrossCircled size={`30px`} />
            </div>
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "15px",
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: "50px",
                }}
            >
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: "15px",
                    }}
                >
                    <img
                        src={WarningIcon}
                        width={`40px`}
                        style={{
                            marginBottom: "2px",
                        }}
                    />

                    <h3
                        style={{
                            textAlign: "center",
                        }}
                    >
                        Are You sure this comment is not relevant to you?
                    </h3>
                </div>

                <Flex>
                    <button
                        style={{
                            paddingLeft: "40px",
                            paddingRight: "40px",
                            fontSize: "18px",
                        }}
                        type="button"
                        class="btn btn-secondary"
                        onClick={() => setIsRelevantModal(false)}
                    >
                        No
                    </button>
                    <button
                        style={{
                            paddingLeft: "40px",
                            paddingRight: "40px",
                            fontSize: "18px",
                        }}
                        type="button"
                        class="btn btn-primary"
                        onClick={submitHandler}
                    >
                        Yes
                    </button>
                </Flex>
            </div>
        </ReactModal>
    );
};

export default RelevantModal;

//mitul work end
