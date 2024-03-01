import React, { useState } from "react";
import Button from "../../../components/Button";
import RevisionView from "./RevisionView";
import { RevisionAcceptAndContinue } from "./RevisionAcceptAndContinue";
import AssigneeRevisionToDev from "./AssigneeRevisionToDev";
import DenyAndContinue from "./DenyAndContinue";
import {
    useGetRevisionDetailsQuery,
    useRevisionAcceptOrDenyMutation,
} from "../../../../services/api/SingleTaskPageApi";
import { useDispatch } from "react-redux";
import { setTaskStatus } from "../../../../services/features/subTaskSlice";
import { User } from "../../../../utils/user-details";
import { toast } from "react-toastify";
import _ from "lodash";

const DeveloperRevisionView = ({ task, close }) => {
    const [show, setShow] = useState("REVISION");
    const [accept, setAccept] = useState("");
    const dispatch = useDispatch();
    const { data: revision, isFetching: isFetchingRevision } =
        useGetRevisionDetailsQuery(task?.id);
    const [revisionAcceptOrDeny, { isLoading: isLoadingRevisionReview }] =
        useRevisionAcceptOrDenyMutation();
    const auth = new User(window?.Laravel?.user);

    // handle Accept and continue submission
    const handleAcceptAndContinueSubmission = async (data, type) => {
        const _data = {
            comment: data?.comment ?? "",
            deny_reason: data?.denyReason ?? "",
            task_id: task?.id,
            user_id: auth?.getId(),
            revision_id: revision?.id,
            mode: data?.continue ? "continue" : accept,
        };

        await revisionAcceptOrDeny(_data)
            .unwrap()
            .then((res) => {
                if (_.includes([4, 6], auth?.getRoleId())) {
                    setShow(type);
                } else {
                    toast.success(
                        "Your request has been successfully processed"
                    );
                    dispatch(setTaskStatus(res?.task_status));
                    close();
                }
            })
            .catch((err) => console.log(err));
    };

    // generate modal title by user role id

    const isTaskTypeDesign = _.includes([5, 7], task?.category?.id);

    const _text = isTaskTypeDesign ? "Designer" : "Developer";

    const generateModalTitle = () => {
        if (auth.getRoleId() === 4) {
            return show === "ASSIGNEE_TO_DEV"
                ? `Revision For Lead ${_text}`
                : "Revision By Project Manager";
        } else if (auth.getRoleId() === 6) {
            return show === "ASSIGNEE_TO_DEV"
                ? `Revision For ${_text}`
                : "Revision By Project Manager";
        } else if (
            (auth.getRoleId() === 9 || auth.getRoleId() === 10) &&
            !auth.isHasRolePermission(13)
        ) {
            if (
                revision?.revision_status === "Project Manager Revision" ||
                revision?.revision_status === "Client Has Revision"
            ) {
                return "Revision By Project Manager";
            } else {
                return "Revision By Lead Designer";
            }
        } else return "Revision By Lead Developer";
    };

    return (
        <React.Fragment>
            <div
                className="sp1_single_task--modal-panel"
                style={{ maxWidth: "550px" }}
            >
                <div className="border-bottom pb-2 px-3 mb-3 d-flex align-items-center justify-content-between">
                    <div className="font-weight-bold f-16">
                        Task#{task?.id}: {generateModalTitle()}
                    </div>
                    <Button onClick={close} className="">
                        <i className="fa-solid fa-xmark" />
                    </Button>
                </div>

                <div className="px-3">
                    {show === "REVISION" && (
                        <RevisionView
                            revision={revision}
                            isLoading={isFetchingRevision}
                            isContinue={isLoadingRevisionReview}
                            onAccept={() => {
                                setAccept("accept");
                                setShow("ACCEPT_AND_CONTINUE");
                            }}
                            onDeny={() => {
                                setAccept("deny");
                                setShow("DENY_AND_CONTINUE");
                            }}
                            onContinue={() => {
                                setAccept("continue");
                                handleAcceptAndContinueSubmission(
                                    { continue: true },
                                    ""
                                );
                            }}
                        />
                    )}

                    {show === "ACCEPT_AND_CONTINUE" && (
                        <RevisionAcceptAndContinue
                            task={task}
                            isSubmitting={isLoadingRevisionReview}
                            onSubmit={(data) =>
                                handleAcceptAndContinueSubmission(
                                    data,
                                    "ASSIGNEE_TO_DEV"
                                )
                            }
                            close={() => setShow("REVISION")}
                        />
                    )}

                    {show === "DENY_AND_CONTINUE" && (
                        <DenyAndContinue
                            task={task}
                            onSubmit={(data) =>
                                handleAcceptAndContinueSubmission(
                                    data,
                                    "DENY_ASSIGNEE_TO_DEV"
                                )
                            }
                            isSubmitting={isLoadingRevisionReview}
                            onBack={() => setShow("REVISION")}
                        />
                    )}
                </div>
            </div>
        </React.Fragment>
    );
};

export default DeveloperRevisionView;
