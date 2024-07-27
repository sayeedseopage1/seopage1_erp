import React from "react";
import PropTypes from "prop-types";
import Modal from "../ui/Modal";
import _ from "lodash";
import Button from "../ui/Button";
import Card from "../ui/Card";

const PrivateGoalAssignModal = ({
    isPrivateGoalAssignModalOpen,
    setIsPrivateGoalAssignModalOpen,
}) => {
    return (
        <Modal isOpen={isPrivateGoalAssignModalOpen}>
            <div className="cnx_ins__goal_modal__container">
                <Card className="cnx_ins__goal_modal__card">
                    <Card.Header
                        className="cnx_ins__goal_modal__card_header"
                        // onClose={close}
                    >
                        <div className="cnx_ins__goal_modal__card_header_title">
                            
                        </div>
                    </Card.Header>
                    {/* card body */}
                    <Card.Body
                        className={`cnx_ins__goal_modal cnx_ins__goal_form_modal`}
                    ></Card.Body>
                    {/* <Card.Footer>
                        <div className="cnx_ins__goal_modal__card_footer">
                            <Button
                                onClick={close}
                                className="cnx_ins__goal_modal__card_footer_cancel"
                                variant="tertiary"
                            >
                                Cancel
                            </Button>

                            {formStatus === "idle" ? (
                                <Button onClick={() => {}} variant="success">
                                    Yes, Assign
                                </Button>
                            ) : formStatus === "saving" ? (
                                <Button variant="success">Saving...</Button>
                            ) : formStatus === "saved" ? (
                                <Button variant="success">Saved</Button>
                            ) : null}
                        </div>
                    </Card.Footer> */}
                </Card>
            </div>
        </Modal>
    );
};

export default PrivateGoalAssignModal;

PrivateGoalAssignModal.propTypes = {};
