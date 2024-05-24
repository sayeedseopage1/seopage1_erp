import React, { useState } from "react";
import PropTypes from "prop-types";
import { ModalContentContainer } from "../ui/styledComponents";
import CustomModalHeader from "../ui/CustomModalHeader/CustomModalHeader";
import CustomAntModal from "../ui/CustomAntModal/CustomAntModal";
import Switch from "../../../global/Switch";
import SingleButton from "../ui/CustomButton/SingleButton";
import CustomTextArea from "../ui/CustomTextArea/CustomTextArea";
import { htmlTagRegex } from "../../helper";
import Loader from "../../../global/Loader";

const ProjectQCSubmissionFormModal = ({
    isModalOpen,
    closeModal,
    modalData,
}) => {
  const [adminComment, setAdminComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle Admin Comment
  const handleAdminComment = () => {
      setIsSubmitting(true);
      try {
          // TODO: Implement the API call to submit the admin comment
          setTimeout(() => {
              setIsSubmitting(false);
              toast.success("Project QC Authorized Successfully");
          }, 5000);
      } catch (error) {
          console.log(error);
      }
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
            />
            <ModalContentContainer>
                <div className="stepHeader">
                    <h3>
                        Step – 01: Complete These Checklists Before
                        MigrationStep{" "}
                    </h3>
                </div>
                <div className="modalContentTable ">
                    <table>
                        <thead>
                            <tr>
                                <th className="projectQCSModal">SL</th>
                                <th className="projectQCSModal">Query</th>
                                <th className="projectQCSModal">Response From PM</th>
                            </tr>
                        </thead>
                        <tbody>
                            {modalData?.stepOne?.map((data) => (
                                <tr key={data.id} className="projectQCSModal">
                                    <td className="projectQCSModal">{data.id}</td>
                                    <td className="projectQCSModal">
                                        <Switch>
                                            <Switch.Case
                                                condition={data.isDangerHtml}
                                            >
                                                <div
                                                    dangerouslySetInnerHTML={{
                                                        __html: data.title,
                                                    }}
                                                />
                                            </Switch.Case>
                                            <Switch.Case
                                                condition={!data.isDangerHtml}
                                            >
                                                {data.title}
                                            </Switch.Case>
                                        </Switch>
                                    </td>
                                    <td className="projectQCSModal">{data.value}</td>
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
                    <table>
                        <thead>
                            <tr className="projectQCSModal">
                                <th className="projectQCSModal">SL</th>
                                <th className="projectQCSModal">Query</th>
                                <th className="projectQCSModal">Response From PM</th>
                            </tr>
                        </thead>
                        <tbody>
                            {modalData?.stepTwo?.map((data) => (
                                <tr key={data.id} className="projectQCSModal">
                                    <td className="projectQCSModal">{data.id}</td>
                                    <td className="projectQCSModal">{data.title}</td>
                                    <td className="projectQCSModal">{data.value ?? "--"}</td>
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
                      adminComment
                            ? "Admin Comment"
                            : "Comments"
                    }
                    placeholder={"Write your comments here"}
                    name="admin_comment"
                    value={adminComment ?? adminComment}
                    onChange={(e) => {
                        setAdminComment(e.target.value);
                    }}
                    rows={6}
                    cols={50}
                    isDangerHtml={htmlTagRegex.test(
                      adminComment
                    )}
                    isDisabled={adminComment ?? false}
                />
            </ModalContentContainer>
            {/* Buttons */}
            <ModalContentContainer className="pt-0">
                <div className="modalButtonContainer">
                    <Switch>
                        <Switch.Case
                            condition={!adminComment}
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
        </CustomAntModal>
    );
};

export default ProjectQCSubmissionFormModal;

ProjectQCSubmissionFormModal.propTypes = {
    isModalOpen: PropTypes.bool,
    closeModal: PropTypes.func,
    modalData: PropTypes.object,
};
