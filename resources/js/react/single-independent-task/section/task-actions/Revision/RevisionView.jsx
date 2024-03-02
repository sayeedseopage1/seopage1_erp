import React from "react";
import Button from "../../../components/Button";
import { AcceptAndContinueButton } from "./RevisionAcceptAndContinue";
import { Placeholder } from "../../../../global/Placeholder";
import { User } from "../../../../utils/user-details";
import SubmitButton from "../../../components/SubmitButton";

const RevisionView = ({
    revision,
    isLoading,
    onAccept,
    onDeny,
    onContinue,
    isContinue,
}) => {
    const auth = new User(window?.Laravel?.user);

    // const getComment = () => {
    //     if (
    //         auth?.isHasRolePermission(6) ||
    //         auth?.isHasRolePermission(13) ||
    //         auth?.isHasRolePermission(9) ||
    //         auth?.isHasRolePermission(10)
    //     ) {
    //         return revision?.pm_comment;
    //     } else {
    //         return revision?.lead_comment;
    //     }
    // };

    //new logic

    const getComment = () => {
        if (auth?.isHasRolePermission(6) || auth?.isHasRolePermission(13)) {
            return revision?.pm_comment;
        } else if (
            auth?.isHasRolePermission(9) ||
            auth?.isHasRolePermission(10) ||
            auth?.isHasRolePermission(5)
        ) {
            if (
                revision?.revision_status === "Project Manager Revision" ||
                revision?.revision_status === "Client Has Revision"
            ) {
                return revision?.pm_comment;
            } else {
                return revision?.lead_comment;
            }
        } else {
            return revision?.pm_comment;
        }
    };

    const comment = getComment();
    if (isLoading) {
        return (
            <React.Fragment>
                <div>
                    <div>
                        <Placeholder width="450px" className="mb-2" />
                        <Placeholder width="100px" className="mb-3" />
                    </div>
                </div>

                <div className="st_revision_comment mb-4">
                    {isLoading && (
                        <div>
                            <Placeholder width="100%" className="mb-2" />
                            <Placeholder width="100%" className="mb-2" />
                            <Placeholder width="30%" className="mb-2" />
                        </div>
                    )}
                </div>
            </React.Fragment>
        );
    } else if (!comment && !isLoading) {
        return null;
    } else {
        return (
            <React.Fragment>
                {revision?.revision_acknowledgement && (
                    <div>
                        {!isLoading ? (
                            <p>
                                <span className="font-weight-bold text-danger f-16">
                                    Reason:{" "}
                                </span>
                                {revision?.revision_acknowledgement ??
                                    revision?.revision_reason}
                            </p>
                        ) : (
                            <div>
                                <Placeholder width="450px" className="mb-2" />
                                <Placeholder width="100px" className="mb-3" />
                            </div>
                        )}
                    </div>
                )}

                <div className="st_revision_comment">
                    {!isLoading && (
                        <div
                            className="sp1_ck_content"
                            dangerouslySetInnerHTML={{ __html: comment }}
                        />
                    )}

                    {isLoading && (
                        <div>
                            <Placeholder width="100%" className="mb-2" />
                            <Placeholder width="100%" className="mb-2" />
                            <Placeholder width="30%" className="mb-2" />
                        </div>
                    )}
                </div>
                <div className="mt-4 mb-2 d-flex align-items-center">
                    {!isLoading &&
                        (revision?.is_deniable ? (
                            <React.Fragment>
                                <Button
                                    onClick={onDeny}
                                    variant="tertiary"
                                    className="ml-auto mr-2"
                                >
                                    Deny & Continue
                                </Button>

                                <AcceptAndContinueButton
                                    onClick={onAccept}
                                    isLoading={false}
                                />
                            </React.Fragment>
                        ) : (
                            <React.Fragment>
                                <div className="ml-auto">
                                    <SubmitButton
                                        onClick={onContinue}
                                        variant="primary"
                                        isLoading={isContinue}
                                        title="Continue"
                                    />
                                </div>
                            </React.Fragment>
                        ))}
                </div>
            </React.Fragment>
        );
    }
};

export default RevisionView;
