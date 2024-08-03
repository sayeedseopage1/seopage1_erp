import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Dialog } from "@headlessui/react";
import { DialogPanelWrapper } from "./ui/dealStyledComponent";
import Card from "../../../../global/Card";
import { Input, InputGroup, Label } from "./ui/form";
import {
    useReassignProjectDetailsQuery,
    useReassignProjectManagerMutation,
} from "../../../../services/api/dealApiSlice";
import Switch from "../../../../global/Switch";
import { Placeholder } from "../../../../global/Placeholder";
import AssignableDropdown from "./AssignableDropdown";
import Button from "../../../../global/Button";
import { toast } from "react-toastify";

const ReassignProjectModal = ({ isOpen, handleClose, dealDetails, refetchData }) => {
    const [formData, setFormData] = React.useState({});
    const [formDataValidation, setFormDataValidation] = useState({
        pm_id: false,
        isSubmitting: false,
    });

    const { data: reassignProjectDetails, isLoading , isFetching } =
        useReassignProjectDetailsQuery(dealDetails?.id, {
            skip: !dealDetails?.id,
            refetchOnMountOrArgChange: true,
        });

    const isReassignProjectDetailsLoading = isLoading || isFetching;

    const [reassignProjectManager, { isLoading: isReassigning }] =
        useReassignProjectManagerMutation();

    const handleSubmit = async () => {
        const { pm_id } = formData;

        if (!pm_id?.id) {
            setFormDataValidation({
                ...formDataValidation,
                pm_id: true,
                isSubmitting: true,
            });
            return;
        }

        try {
            const payload = {
                deal_id: formData?.id,
                pm_id: formData?.pm_id?.pm_id,
            };
            const res = await reassignProjectManager(payload).unwrap();
            if (res?.status === 200) {
                toast.success(res?.data);
                handleClose();
                console.log(refetchData)
                refetchData();
            }
        } catch (error) {
            toast.error("Something went wrong. Please try again later.");
        }
    };

    useEffect(() => {
        if (reassignProjectDetails?.data?.id && !isLoading) {
            setFormData(reassignProjectDetails?.data);
        }
    }, [reassignProjectDetails, isLoading]);

    // Set Validation on Submit
    useEffect(() => {
        if (formDataValidation?.isSubmitting) {
            const { pm_id } = formData;
            const validation = getValidFields({ pm_id }, formDataValidation);
            setFormDataValidation({
                ...formDataValidation,
                ...validation,
            });
        }
    }, [formData]);

    return (
        <Dialog as="div" open={isOpen} onClose={() => null}>
            <DialogPanelWrapper>
                <Dialog.Panel className="dialog-panel">
                    <Card>
                        <Card.Head onClose={handleClose}>
                            Reassign Project
                        </Card.Head>
                        <Card.Body className="p-4 pb-0">
                            <Switch>
                                <form>
                                    <div className="row">
                                        {/* Client Name */}
                                        <div className="col-md-6">
                                            <InputGroup>
                                                <Label> Client Name</Label>
                                                <Switch.Case
                                                    condition={isReassignProjectDetailsLoading}
                                                >
                                                    <Placeholder
                                                        width="100%"
                                                        height="40px"
                                                    />
                                                </Switch.Case>
                                                <Switch.Case
                                                    condition={!isReassignProjectDetailsLoading}
                                                >
                                                    <Input
                                                        type="text"
                                                        name="client_name"
                                                        value={
                                                            formData?.client_name
                                                        }
                                                        readOnly
                                                    />
                                                </Switch.Case>
                                            </InputGroup>
                                        </div>
                                        <div className="col-md-6">
                                            <InputGroup>
                                                <Label> Project Name</Label>
                                                <Switch.Case
                                                    condition={isReassignProjectDetailsLoading}
                                                >
                                                    <Placeholder
                                                        width="100%"
                                                        height="40px"
                                                    />
                                                </Switch.Case>
                                                <Switch.Case
                                                    condition={!isReassignProjectDetailsLoading}
                                                >
                                                    <Input
                                                        type="text"
                                                        name="project_name"
                                                        value={
                                                            formData?.project_name
                                                        }
                                                        readOnly
                                                    />
                                                </Switch.Case>
                                            </InputGroup>
                                        </div>
                                    </div>
                                    <div className="row">
                                        {/* Client Name */}
                                        <div className="col-md-6">
                                            <InputGroup className="mb-0">
                                                <Label>
                                                    {" "}
                                                    Old Project Manager
                                                </Label>
                                                <Switch.Case
                                                    condition={isReassignProjectDetailsLoading}
                                                >
                                                    <Placeholder
                                                        width="100%"
                                                        height="40px"
                                                    />
                                                </Switch.Case>
                                                <Switch.Case
                                                    condition={!isReassignProjectDetailsLoading}
                                                >
                                                    <Input
                                                        type="text"
                                                        name="pm_name"
                                                        value={
                                                            formData?.pm_name
                                                        }
                                                        readOnly
                                                    />
                                                </Switch.Case>
                                            </InputGroup>
                                        </div>
                                        <div className="col-md-6">
                                            <InputGroup className="mb-0">
                                                <Label>
                                                    {" "}
                                                    Assignable Project Managers{" "}
                                                    <sup>*</sup>
                                                </Label>
                                                <Switch.Case
                                                    condition={isReassignProjectDetailsLoading}
                                                >
                                                    <Placeholder
                                                        width="100%"
                                                        height="40px"
                                                    />
                                                </Switch.Case>
                                                <Switch.Case
                                                    condition={!isReassignProjectDetailsLoading}
                                                >
                                                    <AssignableDropdown
                                                        data={
                                                            formData?.assignable_pm
                                                        }
                                                        filedName="pm_id"
                                                        selected={
                                                            formData?.pm_id
                                                        }
                                                        setSelected={(e) => {
                                                            setFormData({
                                                                ...formData,
                                                                pm_id: e.target
                                                                    .value,
                                                            });
                                                        }}
                                                    />
                                                </Switch.Case>
                                                <Switch.Case
                                                    condition={
                                                        formDataValidation?.pm_id
                                                    }
                                                >
                                                    <span className="text-danger mt-2">
                                                        Please select a project
                                                        manager.
                                                    </span>
                                                </Switch.Case>
                                            </InputGroup>
                                        </div>
                                    </div>
                                </form>
                            </Switch>
                        </Card.Body>
                        <Card.Footer className="px-4 pb-4">
                            <Button
                                isLoading={isReassigning}
                                loaderTitle="Processing..."
                                onClick={handleSubmit}
                                disabled={isReassigning || !formData?.pm_id?.id}
                            >
                                Reassign
                            </Button>
                            <Button
                                variant="tertiary"
                                onClick={handleClose}
                            >
                                Close
                            </Button>
                        </Card.Footer>
                    </Card>
                </Dialog.Panel>
            </DialogPanelWrapper>
        </Dialog>
    );
};

export default ReassignProjectModal;

ReassignProjectModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    dealDetails: PropTypes.object,
};
