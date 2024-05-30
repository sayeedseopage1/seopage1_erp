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
            admin_comment_qc: null,
        },
    },
};



/**
 *  Project QC Submission Form Modal
 *  @param {boolean} isModalOpen - Modal Open State
 *  @param {function} closeModal - Close Modal Event Handler
 *  @returns {JSX.Element}
 *  @description Project QC Submission Form Modal Component For Submit Project QC Form Data and Admin Comment 
 * 
 *  This modal will be used by Admin to submit the project QC form data and admin comment
 */

const ProjectQCSubmissionFormModal = ({ isModalOpen, closeModal }) => {
    const [modalData, setModalData] = useState(ProjectQualityControlDummyData);
    const [adminComment, setAdminComment] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Handle Admin Comment
    const handleAdminComment = async () => {
        setIsSubmitting(true);
        try {
            // TODO: Implement the API call to submit the admin comment
            await new Promise((resolve) => setTimeout(resolve, 2000));
            setModalData({
                ...modalData,
                admin_comment_qc: adminComment,
            });
            setIsSubmitting(false);
            toast.success("Project QC Authorized Successfully");
            resetData();
        } catch (error) {
            console.log(error);
            toast.error("Failed to authorize the project QC");
        }
    };

    // Dummy Fetch Data
    const dataPromise = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(payloadData);
        }, 5000);
    });

    // Fetch All Data Dummy
    const fetchAllData = async () => {
        setIsLoading(true);
        try {
            // TODO: Implement the API call to submit the admin comment
            const res = await dataPromise;
            const resData = res.data.qc_data;
            const formatStep = (step) =>
                step.map((item) => ({
                    ...item,
                    value: resData[item.key],
                }));
            setModalData({
                stepOne: formatStep(modalData.stepOne),
                stepTwo: formatStep(modalData.stepTwo),
                admin_comment_qc: resData.admin_comment_qc,
            });

            setIsLoading(false);
        } catch (error) {
            console.log(error);
        }
    };

    // Fetch Data
    useEffect(() => {
        if (isModalOpen) {
            fetchAllData();
        }
    }, [isModalOpen]);

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
            <ModalContentContainer className="px-0" style={{
                height: "calc(85vh - 100px)",
                overflowY: "auto",
            }}>
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
                                {modalData?.stepOne?.map((data) => (
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
                                {modalData?.stepTwo?.map((data) => (
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
                </ModalContentContainer>
                {/* Admin Comment */}
                <ModalContentContainer>
                    <CustomTextArea
                        label={
                            modalData.admin_comment_qc
                                ? "Admin Comment"
                                : "Comments"
                        }
                        placeholder={"Write your comments here"}
                        name="admin_comment"
                        value={modalData.admin_comment_qc}
                        onChange={(e) => {
                            setAdminComment(e.target.value);
                        }}
                        rows={6}
                        cols={50}
                        isDangerHtml={htmlTagRegex.test(
                            modalData.admin_comment_qc
                        )}
                        isDisabled={modalData.admin_comment_qc ?? false}
                    />
                </ModalContentContainer>
                {/* Buttons */}
                <ModalContentContainer className="pt-0">
                    <div className="modalButtonContainer">
                        <Switch>
                            <Switch.Case
                                condition={!modalData.admin_comment_qc}
                            >
                                <SingleButton
                                    label={
                                        isSubmitting ? (
                                            <Loader title="Authorizing" />
                                        ) : (
                                            "Authorize"
                                        )
                                    }
                                    onClick={handleAdminComment}
                                    type="primary"
                                />
                            </Switch.Case>
                        </Switch>
                        <SingleButton
                            label="Close"
                            className=""
                            onClick={closeModal}
                            type="secondary"
                        />
                    </div>
                </ModalContentContainer>
            </ModalContentContainer>
        </CustomAntModal>
    );
};

export default ProjectQCSubmissionFormModal;

ProjectQCSubmissionFormModal.propTypes = {
    isModalOpen: PropTypes.bool,
    closeModal: PropTypes.func
};
