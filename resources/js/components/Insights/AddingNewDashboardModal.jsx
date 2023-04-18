import { useSelector, useDispatch } from "react-redux";
import {
    openDashboardCreatingModal,
    closeDashboardCreatingModal,
} from "./services/modals/newDashboardCreatingModalSlice";
import Modal from "../UI/Modal";
import Label from "../UI/form/label";
import Input from "../UI/form/Input";
import Selection from "../UI/form/Selection";
import "./addingNewDashboardModal.css";
import { useState } from "react";
import { addDashboard, addSection } from "./services/dashboardsSlice";

const AddingNewDashboardModal = ({ isOpen }) => {
    const dispatch = useDispatch();
    const { dashboards } = useSelector((s) => s.dashboards);
    const [sectionModal, setSectionModal] = useState(false);

    // form data
    const [section, setSection] = useState("");
    const [dashboardName, setDashboardName] = useState("");

    // close modal
    const close = () => {
        dispatch(closeDashboardCreatingModal());
    };

    // get only sections from dashboards
    const getSections = (dashboards) => {
        return [...dashboards.map((d) => d.section)];
    };

    // handle new dashboard save
    const onSave = () => {
        if (!dashboardName || !section) return;
        dispatch(addDashboard({ section, dashboard: dashboardName }));
        close();
    };

    // handle section save
    const SaveSection = (e) => {
        e.preventDefault();
        dispatch(addSection(section));
        setSectionModal(false);
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
                        {sectionModal ? (
                            <Label label="Section name">
                                <Input
                                    type="text"
                                    value={section}
                                    placeholder="Section name"
                                    onChange={(e) => setSection(e.target.value)}
                                />
                                <div className="d-flex justify-content-end">
                                    <span className="sp1_section_modal--input-message">
                                        100 characters
                                    </span>
                                </div>
                            </Label>
                        ) : (
                            <>
                                <Label label="Dashboard Name">
                                    <Input
                                        type="text"
                                        value={dashboardName}
                                        placeholder="Dashboard name"
                                        onChange={(e) =>
                                            setDashboardName(e.target.value)
                                        }
                                    />
                                </Label>

                                <Label label="Section">
                                    <Selection
                                        value={section}
                                        onSelected={setSection}
                                        placeholder="Example Section"
                                        options={[...getSections(dashboards)]}
                                    >
                                        {(
                                            setDefaultHoverEffect,
                                            defaultHoverEffect
                                        ) => (
                                            <>
                                                <div
                                                    className={`sp1_ad--add-section${
                                                        defaultHoverEffect ===
                                                        "add section"
                                                            ? " hover"
                                                            : ""
                                                    }`}
                                                    onMouseOver={() =>
                                                        setDefaultHoverEffect(
                                                            "add section"
                                                        )
                                                    }
                                                >
                                                    <div
                                                        onClick={() =>
                                                            setSectionModal(
                                                                true
                                                            )
                                                        }
                                                    >
                                                        + Add Section
                                                    </div>
                                                </div>
                                            </>
                                        )}
                                    </Selection>
                                </Label>
                            </>
                        )}
                    </div>
                    {/* end card body */}

                    {/* card footer */}

                    {sectionModal ? (
                        <div className="card-footer d-flex align-items-center justify-content-end">
                            <button
                                onClick={() => setSectionModal(false)}
                                className="btn btn-sm btn-outline-secondary mr-2"
                            >
                                Back
                            </button>
                            <button
                                className="btn btn-sm btn-success"
                                disabled={!section}
                                onClick={SaveSection}
                            >
                                Save
                            </button>
                        </div>
                    ) : (
                        <div className="card-footer d-flex align-items-center justify-content-end">
                            <button
                                onClick={close}
                                className="btn btn-sm btn-outline-secondary mr-2"
                            >
                                Close
                            </button>
                            <button
                                className="btn btn-sm btn-success"
                                disabled={!dashboardName || !section}
                                onClick={onSave}
                            >
                                Save
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </Modal>
    );
};

export default AddingNewDashboardModal;
