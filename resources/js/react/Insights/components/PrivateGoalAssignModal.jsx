import React from "react";
import PropTypes from "prop-types";
import Modal from "../ui/Modal";
import _ from "lodash";
import Button from "../ui/Button";
import Card from "../ui/Card";
import { useGoals } from "../hooks/useGoals";
import { toast } from "react-toastify";

const PrivateGoalAssignModal = ({
    isPrivateGoalAssignModalOpen,
    handleClosePrivateGoalAssignModal,
    filter
}) => {
    const { makeGoalPublic, isGoalPublicIsLoading, fetchGoals } =
        useGoals();

    const handleSubmit = async () => {
        try {
            const res = await makeGoalPublic();
            if (res?.data?.status === 200) {
                toast.success(res?.data?.data);
                fetchGoals(filter)
                handleClosePrivateGoalAssignModal();
            }
        } catch (error) {
            toast.error("Something went wrong, try again");
        }
    };

    return (
        <Modal isOpen={isPrivateGoalAssignModalOpen}>
            <div className="cnx_ins__goal_modal__container">
                <Card className="cnx_ins__goal_modal__card">
                    <Card.Header
                        className="cnx_ins__goal_modal__card_header"
                        // onClose={close}
                    >
                        <div className="cnx_ins__goal_modal__card_header_title">
                            Assign goals to teams
                        </div>
                    </Card.Header>

                    <Card.Body
                        className={`cnx_ins__goal_modal cnx_ins__goal_form_modal`}
                    >
                        <h6>Are you sure you want to assign these goal?</h6>
                    </Card.Body>
                    <Card.Footer>
                        <div className="cnx_ins__goal_modal__card_footer">
                            {isGoalPublicIsLoading ? (
                                <Button variant="success">Assigning...</Button>
                            ) : (
                                <Button
                                    onClick={handleSubmit}
                                    variant="success"
                                >
                                    Yes, Assign
                                </Button>
                            )}
                            <Button
                                onClick={handleClosePrivateGoalAssignModal}
                                className="cnx_ins__goal_modal__card_footer_cancel"
                                variant="tertiary"
                            >
                                Cancel
                            </Button>
                        </div>
                    </Card.Footer>
                </Card>
            </div>
        </Modal>
    );
};

export default PrivateGoalAssignModal;

PrivateGoalAssignModal.propTypes = {};
