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

/**
 *  Dispute Project Authorize Modal
 *  @param {boolean} isModalOpen - Modal Open State
 *  @param {function} closeModal - Close Modal Event Handler
 *  @param {object} payloadData - Payload Data
 *  @returns {JSX.Element}
 *  @description Dispute Project Authorize Modal component to render dispute project authorize modal
 * 
 */

const DisputeProjectAuthorizeModal = ({
    isModalOpen,
    closeModal,
    payloadData,
}) => {
    const [isLoading, setIsLoading] = React.useState(false);
    const [isSubmitting, setIsSubmitting] = React.useState(false);
    const [adminComment, setAdminComment] = React.useState("");
    const [modalData, setModalData] = React.useState(
        ProjectDisputeAuthorizationsData
    );

    // Fetch all data for the modal
    const fetchAllData = async () => {
        setIsLoading(true);
        try {
            // TODO: Implement the API call to submit the admin comment
            const res = await dataPromise;
            const formatedData = ProjectDisputeAuthorizationsData.map(
                (item) => ({
                    ...item,
                    value: res[item.key],
                })
            );
            setModalData(formatedData);
            setIsLoading(false);
        } catch (error) {
            console.log(error);
        }
    };

    // Handle Admin Comment
    const handleAdminComment = async () => {
        setIsSubmitting(true);
        try {
            setTimeout(() => {
                toast.success("Dispute authorized successfully");
                const updatedData = modalData.map((item) => {
                    if (item.key === "dispute_admin_comment") {
                        return {
                            ...item,
                            value: adminComment,
                        };
                    }
                    return item;
                });
                setModalData(updatedData);
                setIsSubmitting(false);
            }, 3000);
        } catch (error) {
            console.log(error);
            toast.error("Failed to authorize the dispute");
        }
    };

    // Dummy data promise
    const dataPromise = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(payloadData);
        }, 5000);
    });

    // Get Dispute Admin Comment
    const getDisputeAdminComment = () => {
        const adminComment = modalData?.find(
            (item) => item.key === "dispute_admin_comment"
        );
        return adminComment.value;
    };

    // Dummy data Fetch
    useEffect(() => {
        if (isModalOpen) {
            fetchAllData();
        }
    }, [isModalOpen]);

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
                            {modalData
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
                {/* Admin Comment */}
                <ModalContentContainer className="px-0">
                    <CustomTextArea
                        label={
                            getDisputeAdminComment()
                                ? "Admin Comment"
                                : "Comments"
                        }
                        placeholder={"Write your comments here"}
                        name="dispute_admin_comment"
                        value={getDisputeAdminComment() ?? adminComment}
                        onChange={(e) => {
                            setAdminComment(e.target.value);
                        }}
                        rows={6}
                        cols={50}
                        isDangerHtml={htmlTagRegex.test(
                            getDisputeAdminComment()
                        )}
                        isDisabled={getDisputeAdminComment() ?? false}
                    />
                </ModalContentContainer>
                {/* Buttons */}
                <ModalContentContainer className="pt-0 px-0">
                    <div className="modalButtonContainer">
                        <Switch>
                            <Switch.Case condition={!getDisputeAdminComment()}>
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

export default DisputeProjectAuthorizeModal;

DisputeProjectAuthorizeModal.propTypes = {
    isModalOpen: PropTypes.bool.isRequired,
    closeModal: PropTypes.func.isRequired,
    modalData: PropTypes.object,
    isLoading: PropTypes.bool,
};
