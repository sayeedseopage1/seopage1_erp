import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";

// UI Components - Custom
import CustomAntModal from "../ui/CustomAntModal/CustomAntModal";
import SingleButton from "../ui/CustomButton/SingleButton";
import CustomModalHeader from "../ui/CustomModalHeader/CustomModalHeader";
import CustomTextArea from "../ui/CustomTextArea/CustomTextArea";

// Components - Global
import Switch from "../../../global/Switch";
import Loader from "../../../global/Loader";
import { Placeholder } from "../../../global/Placeholder";

// UI Components - Styled Components
import { ModalContentContainer } from "../ui/styledComponents";

// Helper
import { handleLoadingComponent, htmlTagRegex } from "../../helper";

// Constants
import { ProjectDisputeAuthorizationsData } from "../../constants";
import { useDisputeProjectAuthorizationMutation } from "../../../services/api/projectApiSlice";
import dayjs from "dayjs";
import { useAuth } from "../../../hooks/useAuth";
import {
    isStateAllHaveValue,
    markEmptyFieldsValidation,
} from "../../../utils/stateValidation";
import AuthorizeCommentView from "../shared/AuthorizeCommentView";

/**
 *  Dispute Project Authorize Modal
 *  @param {boolean} isModalOpen - Modal Open State
 *  @param {function} closeModal - Close Modal Event Handler
 *  @param {object} payloadData - Payload Data
 *  @returns {JSX.Element}
 *  @description Dispute Project Authorize Modal component to render dispute project authorize modal
 *
 *  This modal will be used by Admin to authorize the dispute
 */

const DisputeProjectAuthorizeModal = ({
    isModalOpen,
    closeModal,
    modalData,
    isLoading,
}) => {
    const user = useAuth();
    const [adminComment, setAdminComment] = React.useState("");
    const [
        disputeAuthorizationDataValidation,
        setDisputeAuthorizationDataValidation,
    ] = React.useState({
        adminComment: false,
        isSubmitting: false,
    });
    const [
        projectDisputeAuthorizationsData,
        setProjectDisputeAuthorizationsData,
    ] = React.useState(ProjectDisputeAuthorizationsData);

    //

    const [
        disputeProjectAuthorization,
        { isLoading: isDisputeProjectAuthorizationLoading },
    ] = useDisputeProjectAuthorizationMutation();

    // Handle Admin Comment
    const handleAdminComment = async () => {
        const isEmpty = isStateAllHaveValue({ adminComment });
        if (isEmpty) {
            const validation = markEmptyFieldsValidation({ adminComment });
            setDisputeAuthorizationDataValidation({
                ...disputeAuthorizationDataValidation,
                ...validation,
                isSubmitting: true,
            });
            return;
        }
        try {
            const payload = {
                dispute_admin_comment: adminComment,
                project_id: modalData?.projectData?.id,
            };

            const res = await disputeProjectAuthorization(payload).unwrap();
            if (res.status === 200) {
                toast.success("Dispute authorized successfully");
                closeModal();
                setAdminComment("");
            }
        } catch (error) {
            console.log(error);
            toast.error("Failed to authorize the dispute");
        }
    };

    // Get Dispute Admin Comment
    const getDisputeAdminComment = () => {
        const adminComment = projectDisputeAuthorizationsData?.find(
            (item) => item.key === "dispute_admin_comment"
        );
        return adminComment?.value;
    };

    useEffect(() => {
        if (modalData?.disputeData) {
            const formattedData = ProjectDisputeAuthorizationsData.map(
                (item) => {
                    let value;

                    if (item.key === "project_value") {
                        value = `${modalData?.projectData?.currency?.currency_symbol} ${modalData?.projectData?.project_budget} ${modalData?.projectData?.currency?.currency_code}`;
                    } else if (item.key === "created_at") {
                        value = dayjs(modalData?.disputeData[item.key]).format(
                            "DD-MM-YYYY"
                        );
                    } else {
                        value = modalData?.disputeData[item.key];
                    }
                    return {
                        ...item,
                        value: value,
                    };
                }
            );
            setProjectDisputeAuthorizationsData(formattedData);
        }
    }, [modalData?.disputeData]);

    // Validation on Submit
    useEffect(() => {
        if (disputeAuthorizationDataValidation.isSubmitting) {
            const validation = markEmptyFieldsValidation({ adminComment });
            setDisputeAuthorizationDataValidation({
                ...disputeAuthorizationDataValidation,
                ...validation,
            });
        }
    }, [adminComment, disputeAuthorizationDataValidation.isSubmitting]);

    return (
        <CustomAntModal
            isModalOpen={isModalOpen}
            closeModal={closeModal}
            width="956px"
            height="85vh"
            isCentered={true}
            parentClassName="disputeAuthorizationForm"
        >
            <CustomModalHeader
                title="Dispute Authorization Form"
                closeModal={closeModal}
                className="customModalHeaderWithSticky"
            />
            <ModalContentContainer
                style={{
                    overflowY: "auto",
                    height: "calc(86vh - 70px)",
                    borderRadius: "0 0 8px 8px",
                }}
            >
                <div className="modalContentTable">
                    <table className="h-100">
                        <thead>
                            <tr>
                                <th className="projectDisputeModal">SL</th>
                                <th className="projectDisputeModal">Query</th>
                                <th className="projectDisputeModal">
                                    Response From PM
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {projectDisputeAuthorizationsData
                                ?.filter(
                                    (item) =>
                                        item.key !== "dispute_admin_comment"
                                )
                                .map((data) => (
                                    <tr
                                        key={data?.id}
                                        className="projectDisputeModal"
                                    >
                                        <td className="projectDisputeModal verticalAlignTop">
                                            {data?.id}
                                        </td>
                                        <td className="projectDisputeModal verticalAlignTop">
                                            {data?.title}
                                        </td>
                                        <td className="projectDisputeModal verticalAlignTop">
                                            {handleLoadingComponent(
                                                isLoading,
                                                <div className="d-flex justify-content-center">
                                                    <Placeholder
                                                        height={18}
                                                        width="50%"
                                                    />
                                                </div>,
                                                <Switch>
                                                    <Switch.Case
                                                        condition={
                                                            htmlTagRegex.test(
                                                                data?.value
                                                            ) == true
                                                        }
                                                    >
                                                        <div
                                                            dangerouslySetInnerHTML={{
                                                                __html: data?.value,
                                                            }}
                                                        />
                                                    </Switch.Case>
                                                    <Switch.Case
                                                        condition={
                                                            htmlTagRegex.test(
                                                                data?.value
                                                            ) == false
                                                        }
                                                    >
                                                        {/* Condition For Email Show */}
                                                        <Switch.Case
                                                            condition={
                                                                data.key ===
                                                                "pm_email"
                                                            }
                                                        >
                                                            <a
                                                                href={`mailto:${data?.value}`}
                                                            >
                                                                {data?.value}
                                                            </a>
                                                        </Switch.Case>
                                                        <Switch.Case
                                                            condition={
                                                                data.key !==
                                                                "pm_email"
                                                            }
                                                        >
                                                            {data?.value ??
                                                                "N/A"}
                                                        </Switch.Case>
                                                    </Switch.Case>
                                                </Switch>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>
                <Switch>
                    {/* Admin Comment */}
                    <Switch.Case
                        condition={
                            user.getRoleId() === 1 &&
                            modalData.buttons?.project_dispute_authorization
                        }
                    >
                        <ModalContentContainer className="px-0">
                            <CustomTextArea
                                label={
                                    getDisputeAdminComment()
                                        ? "Admin Comment"
                                        : "Comments"
                                }
                                placeholder={"Write your comments here"}
                                name="dispute_admin_comment"
                                value={
                                    modalData?.projectData
                                        ?.dispute_admin_comment ?? adminComment
                                }
                                onChange={(e) => {
                                    setAdminComment(e.target.value);
                                }}
                                rows={6}
                                cols={50}
                                isDangerHtml={htmlTagRegex.test(
                                    getDisputeAdminComment()
                                )}
                                isRequired={true}
                                isDisabled={getDisputeAdminComment() ?? false}
                            />
                            {disputeAuthorizationDataValidation.adminComment && (
                                <span className="text-danger">
                                    Admin Comment is required
                                </span>
                            )}
                        </ModalContentContainer>
                    </Switch.Case>
                    {/* Admin Comment */}
                    <Switch.Case
                        condition={
                            modalData?.projectData?.dispute_admin_comment
                        }
                    >
                        <ModalContentContainer className="px-0">
                            <AuthorizeCommentView
                                comment={
                                    modalData?.projectData
                                        ?.dispute_admin_comment
                                }
                            />
                        </ModalContentContainer>
                    </Switch.Case>
                    {/* Buttons */}
                    <Switch.Case
                        condition={
                            user.getRoleId() === 1 &&
                            modalData.buttons?.project_dispute_authorization
                        }
                    >
                        <ModalContentContainer className="pt-0 px-0">
                            <div className="modalButtonContainer">
                                <Switch>
                                    <Switch.Case
                                        condition={!getDisputeAdminComment()}
                                    >
                                        <SingleButton
                                            label={
                                                isDisputeProjectAuthorizationLoading ? (
                                                    <Loader title="Authorizing" />
                                                ) : (
                                                    "Authorize"
                                                )
                                            }
                                            onClick={handleAdminComment}
                                            type="primary"
                                            isDisabled={
                                                isDisputeProjectAuthorizationLoading
                                            }
                                        />
                                    </Switch.Case>
                                </Switch>
                                <SingleButton
                                    label="Close"
                                    className=""
                                    onClick={closeModal}
                                    type="secondary"
                                    isDisabled={
                                        isDisputeProjectAuthorizationLoading
                                    }
                                />
                            </div>
                        </ModalContentContainer>
                    </Switch.Case>
                </Switch>
            </ModalContentContainer>
        </CustomAntModal>
    );
};

export default DisputeProjectAuthorizeModal;

DisputeProjectAuthorizeModal.propTypes = {
    isModalOpen: PropTypes.bool.isRequired,
    closeModal: PropTypes.func.isRequired,
    modalData: PropTypes.object,
    isLoading: PropTypes.bool,
};
