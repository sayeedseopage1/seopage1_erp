import { useSelector, useDispatch } from "react-redux";
import {
    openDashboardCreatingModal,
    closeDashboardCreatingModal,
} from "./services/modals/newDashboardCreatingModalSlice";
import Modal from "../UI/Modal";
import Label from "../UI/form/label";
import Input from "../UI/form/Input";
import "./addingNewDashboardModal.css";
import { useState } from "react";
import {
    addDashboard,
    addSection as addDashboardSection,
} from "./services/dashboardsSlice";
import { closeSectionModal } from "./services/modals/sectionModalSlice";

const SectionModal = ({ isOpen }) => {
    const dispatch = useDispatch();
    const { dashboards } = useSelector((s) => s.dashboards);
    const { type } = useSelector((s) => s.sectionModal);

    // form data
    const [sectionName, setSectionName] = useState("");

    // close modal
    const close = () => {
        dispatch(closeSectionModal());
    };

    // handle new dashboard save
    const onSave = () => {
        if (!sectionName) return;
        console.log(type);
        if (type === "dashboard") {
            dispatch(addDashboardSection(sectionName));
        }
        close();
    };

    return (
        <Modal isOpen={isOpen}>
            <div className="sp1_ad--container">
                <div className="card">
                    <div className="card-header">
                        Add new dashboard
                        {/* modal close button */}
                        <button
                            type="button"
                            className="close"
                            aria-label="Close"
                            onClick={close}
                        >
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    {/* card body  */}
                    <div className="card-body">
                        <Label label="Dashboard Name">
                            <Input
                                type="text"
                                value={sectionName}
                                placeholder="Section name"
                                onChange={(e) => setSectionName(e.target.value)}
                            />
                            <div className="d-flex align-items-center justify-end">
                                <span className="sp1_section_modal--input-message">
                                    100 characters
                                </span>
                            </div>
                        </Label>
                    </div>
                    {/* end card body */}

                    {/* card footer */}
                    <div className="card-footer d-flex align-items-center justify-content-end">
                        <button
                            onClick={close}
                            className="btn btn-sm btn-outline-secondary mr-2"
                        >
                            Close
                        </button>
                        <button
                            className="btn btn-sm btn-success"
                            disabled={!sectionName}
                            onClick={onSave}
                        >
                            Save
                        </button>
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default SectionModal;
