import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

// Components - Styled Components
import { ModalContentContainer } from "../ui/styledComponents";

// Components - Custom
import CustomModalHeader from "../ui/CustomModalHeader/CustomModalHeader";
import CustomAntModal from "../ui/CustomAntModal/CustomAntModal";
import SingleButton from "../ui/CustomButton/SingleButton";
import CustomTextArea from "../ui/CustomTextArea/CustomTextArea";

// Helper
import { handleLoadingComponent, htmlTagRegex } from "../../helper";

// Components - Global
import Loader from "../../../global/Loader";
import Switch from "../../../global/Switch";

// Constants
import { ProjectQualityControlDummyData } from "../../constants";
import { Placeholder } from "../../../global/Placeholder";
import { useAuth } from "../../../hooks/useAuth";
import AuthorizeCommentView from "../shared/AuthorizeCommentView";
import { useAuthorizeQcFormMutation } from "../../../services/api/projectApiSlice";
import { toast } from "react-toastify";

// Dummy Data
const payloadData = {
    status: 200,
    data: {
        qc_data: {
            site_https: 5,
            favicon: 1,
            webmail: 1,
            contact_form: 1,
            social_media: 1,
            login_link: 1,
            scroll_down: 9,
            lorem_text: 1,
            logical_issues: 1,
            loading_speed: 1,
            mobile_speed: 1,
            migration: 1,
            links_working: 1,
            backup_plugin: 1,
            uptime_monitoring: 1,
            final_backup: 1,
            slogan: 1,
            admin_comment: null,
        },
    },
};

/**
 *  Project QC Submission Form Modal
 *  @param {boolean} isModalOpen - Modal Open State
 *  @param {function} closeModal - Close Modal Event Handler
 *  @param {object} modalData - Modal Data
 *  @returns {JSX.Element}
 *  @description Project QC Submission Form Modal Component For Submit Project QC Form Data and Admin Comment
 *
 *  This modal will be used by Admin to submit the project QC form data and admin comment
 */

const ProjectQCSubmissionFormModal = ({
    isModalOpen,
    closeModal,
    modalData,
    isLoading,
}) => {
    const [qcSubmissionFormData, setQCSubmissionFormData] = useState(
        ProjectQualityControlDummyData
    );
    const user = useAuth();
    const [actionType, setActionType] = useState("");
    const [adminComment, setAdminComment] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [authorizeQcForm, { isLoading: isAuthorizeQCFormLoading }] =
        useAuthorizeQcFormMutation();

    // Handle Admin Comment
    const handleAdminComment = async () => {
        setActionType(type);
        try {
            const payload = {
                project_id: modalData.id,
                deny: type === "deny" ? null : "approve",
                adminComment: adminComment,
            };
            const res = await authorizeQcForm(payload).unwrap();
            if (res.status === 200) {
                if (type === "approve") {
                    toast.success("Project QC Approved Successfully");
                } else {
                    toast.success("Project QC Denied Successfully");
                }
                closeModal();
                setAdminComment("");
                setActionType("");
            }
        } catch (error) {
            toast.error("Something went wrong");
        }
    };

    useEffect(() => {
        const formatStep = (step) =>
            step.map((item) => ({
                ...item,
                value: modalData[item.key],
            }));
        setQCSubmissionFormData({
            stepOne: formatStep(qcSubmissionFormData.stepOne),
            stepTwo: formatStep(qcSubmissionFormData.stepTwo),
            admin_comment: modalData.admin_comment,
        });
    }, [modalData, isLoading]);

    // Reset Data
    const resetData = () => {
        setAdminComment("");
    };

    return (
        <CustomAntModal
            isModalOpen={isModalOpen}
            closeModal={closeModal}
            width="956px"
            height="85vh"
            parentClassName="projectQCSubmissionForm"
        >
            <CustomModalHeader
                title="Project QC Submission Form"
                closeModal={closeModal}
                className="customModalHeaderWithSticky"
            />
            <ModalContentContainer
                className="px-0"
                style={{
                    height: "calc(85vh - 100px)",
                    overflowY: "auto",
                }}
            >
                <ModalContentContainer>
                    <div className="stepHeader">
                        <h3>
                            Step – 01: Complete These Checklists Before
                            MigrationStep{" "}
                        </h3>
                    </div>
                    <div className="modalContentTable ">
                        <table className="h-100">
                            <thead>
                                <tr>
                                    <th className="projectQCSModal">SL</th>
                                    <th className="projectQCSModal">Query</th>
                                    <th className="projectQCSModal">
                                        Response From PM
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {qcSubmissionFormData?.stepOne?.map((data) => (
                                    <tr
                                        key={data.id}
                                        className="projectQCSModal"
                                    >
                                        <td className="projectQCSModal">
                                            {data.id}
                                        </td>
                                        <td className="projectQCSModal">
                                            <Switch>
                                                <Switch.Case
                                                    condition={
                                                        data.isDangerHtml
                                                    }
                                                >
                                                    <div
                                                        dangerouslySetInnerHTML={{
                                                            __html: data.title,
                                                        }}
                                                    />
                                                </Switch.Case>
                                                <Switch.Case
                                                    condition={
                                                        !data.isDangerHtml
                                                    }
                                                >
                                                    {data.title}
                                                </Switch.Case>
                                            </Switch>
                                        </td>
                                        <td className="projectQCSModal">
                                            {handleLoadingComponent(
                                                isLoading,
                                                <div className="d-flex justify-content-center">
                                                    <Placeholder
                                                        height={18}
                                                        width="50%"
                                                    />
                                                </div>,
                                                <p className="text-center">
                                                    {data.value === 1
                                                        ? "Yes"
                                                        : "No"}
                                                </p>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="stepHeader mt-3">
                        <h3>
                            Step – 02: Complete These Checklists After Migration
                        </h3>
                    </div>
                    <div className="modalContentTable">
                        <table className="h-100">
                            <thead>
                                <tr className="projectQCSModal">
                                    <th className="projectQCSModal">SL</th>
                                    <th className="projectQCSModal">Query</th>
                                    <th className="projectQCSModal">
                                        Response From PM
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {qcSubmissionFormData?.stepTwo?.map((data) => (
                                    <tr
                                        key={data.id}
                                        className="projectQCSModal"
                                    >
                                        <td className="projectQCSModal">
                                            {data.id}
                                        </td>
                                        <td className="projectQCSModal">
                                            <Switch>
                                                <Switch.Case
                                                    condition={
                                                        data.isDangerHtml
                                                    }
                                                >
                                                    <div
                                                        dangerouslySetInnerHTML={{
                                                            __html: data.title,
                                                        }}
                                                    />
                                                </Switch.Case>
                                                <Switch.Case
                                                    condition={
                                                        !data.isDangerHtml
                                                    }
                                                >
                                                    {data.title}
                                                </Switch.Case>
                                            </Switch>
                                        </td>
                                        <td className="projectQCSModal">
                                            {handleLoadingComponent(
                                                isLoading,
                                                <div className="d-flex justify-content-center">
                                                    <Placeholder
                                                        height={18}
                                                        width="50%"
                                                    />
                                                </div>,

                                                <p className="text-center">
                                                    {data.value === 1
                                                        ? "Yes"
                                                        : "No"}
                                                </p>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <Switch>
                        <Switch.Case
                            condition={modalData?.project_qc_submission?.status}
                        >
                            <AuthorizeCommentView
                                comment={
                                    modalData?.project_qc_submission
                                        ?.admin_comment
                                }
                            />
                        </Switch.Case>
                    </Switch>
                </ModalContentContainer>
                <Switch>
                    <Switch.Case
                        condition={
                            user.getRoleId() === 1 &&
                            modalData.buttons?.project_qc_authorization
                        }
                    >
                        {/* Admin Comment */}
                        <ModalContentContainer>
                            <CustomTextArea
                                label={
                                    modalData?.status === "accepted"
                                        ? "Admin Comment"
                                        : "Comments"
                                }
                                placeholder={"Write your comments here"}
                                name="admin_comment"
                                value={
                                    modalData.project_qc_submission
                                        .admin_comment
                                }
                                onChange={(e) => {
                                    setAdminComment(e.target.value);
                                }}
                                rows={6}
                                cols={50}
                                isDangerHtml={htmlTagRegex.test(
                                    modalData.admin_comment
                                )}
                                isDisabled={
                                    modalData.status === "accepted"
                                        ? true
                                        : false
                                }
                            />
                        </ModalContentContainer>
                    </Switch.Case>
                    {/* Buttons */}
                    <Switch.Case
                        condition={
                            user.getRoleId() === 1 &&
                            modalData.buttons?.project_qc_authorization
                        }
                    >
                        <ModalContentContainer className="pt-0">
                            <div className="modalButtonContainer">
                                <Switch>
                                    <Switch.Case
                                        condition={
                                            modalData?.status !== "accepted"
                                        }
                                    >
                                        <SingleButton
                                            label={
                                                isAuthorizeQCFormLoading &&
                                                actionType === "deny"  ? (
                                                    <Loader title="Authorizing" />
                                                ) : (
                                                    "Authorize"
                                                )
                                            }
                                            onClick={() => handleAdminComment("approve")}
                                            type="primary"
                                        />
                                    </Switch.Case>
                                </Switch>
                                <SingleButton
                                    label={
                                        isAuthorizeQCFormLoading &&
                                        actionType === "deny" ? (
                                            <Loader title="Denying" />
                                        ) : (
                                            "Deny"
                                        )
                                    }
                                    className=""
                                    onClick={() => handleAdminComment("deny")}
                                    type="secondary"
                                    isDisabled={
                                        isAuthorizeQCFormLoading
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

export default ProjectQCSubmissionFormModal;

ProjectQCSubmissionFormModal.propTypes = {
    isModalOpen: PropTypes.bool,
    closeModal: PropTypes.func,
    modalData: PropTypes.object,
};
