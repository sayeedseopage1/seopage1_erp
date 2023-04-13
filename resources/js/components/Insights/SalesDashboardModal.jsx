import Modal from "../UI/Modal";
import { useDispatch, useSelector } from "react-redux";
import { openModal, closeModal } from "./services/salesDashboardModalSlice";
import { useEffect, useState } from "react";
import SalesDashboardForm from "./SalesDashboardForm";

const SellsDashboardModal = () => {
    const { isOpen, modalData, type } = useSelector(
        (state) => state.salesDashboardModal
    );
    const [activeEntry, setActiveEntry] = useState("");
    const [activeType, setActiveType] = useState("");
    const [step, setStep] = useState(1);
    const [isOpenForm, setIsOpenForm] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        if (modalData) {
            setActiveEntry(modalData[0].entry.name);
        }
    }, [modalData]);

    // close modal
    const close = () => {
        dispatch(closeModal());
        setActiveEntry("");
        setActiveType("");
        setIsOpenForm(false);
    };

    // get entries
    const getEntries = (data) => {
        if (!data) return;
        const entries = data.map((d) => ({ ...d.entry }));
        return entries;
    };
    // get types by entries
    const getTypeByEntry = (data, entry) => {
        if (!data && !entry) return [];
        const filteredData = data.filter((d) => d.entry.name === entry);
        return filteredData[0]?.types;
    };

    const renderIcon = (type) => {
        switch (type) {
            case "deal":
                return (
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        width={24}
                        height={24}
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                    </svg>
                );
            case "forecast":
                return <i className="bi bi-arrow-repeat" />;
            case "leads":
                return <i className="fa-solid fa-location-crosshairs" />;
            case "activity":
                return <i className="bi bi-calendar-event" />;
        }
    };

    return (
        <Modal isOpen={isOpen}>
            <div className="sp1_ins_sell_dm--container">
                <div>
                    <div className="card sp1_ins_sell_dm--card">
                        {/* header */}
                        <div className="card-header">
                            Add {type}{" "}
                            {type === "goal"
                                ? `${
                                      isOpenForm
                                          ? `2/2 - ${activeEntry} ${activeType}`
                                          : "1/2"
                                  }`
                                : ""}
                            <button
                                type="button"
                                className="close"
                                aria-label="Close"
                                onClick={close}
                            >
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        {/* end header */}
                        <div className="card-body sp1_ins_sell_dm--card_body">
                            {isOpenForm ? (
                                <SalesDashboardForm
                                    entry={activeEntry}
                                    entryType={activeType}
                                />
                            ) : (
                                <div className="row">
                                    {/* entities  */}
                                    <div className="col p-0">
                                        <div className="sp1_ins_sell_dm--entities">
                                            <span>CHOOSE ENTRIES</span>
                                            {getEntries(modalData)?.map(
                                                (entry) => (
                                                    <div
                                                        key={`${
                                                            entry.name
                                                        }-${Math.random()}`}
                                                        className={`sp1_ins_sell_dm--entity${
                                                            activeEntry ===
                                                            entry.name
                                                                ? " active"
                                                                : ""
                                                        }`}
                                                        onClick={() => {
                                                            setActiveEntry(
                                                                entry.name
                                                            );
                                                            setActiveType("");
                                                        }}
                                                    >
                                                        {renderIcon(entry.type)}
                                                        <span>
                                                            {entry.name}
                                                        </span>
                                                        {activeEntry ===
                                                        entry.name ? (
                                                            <i
                                                                className="fa-solid fa-chevron-right ml-auto "
                                                                style={{
                                                                    fontSize:
                                                                        "14px",
                                                                }}
                                                            />
                                                        ) : null}
                                                    </div>
                                                )
                                            )}
                                        </div>
                                    </div>
                                    {/* end entity */}

                                    {/* choose type */}
                                    <div className="col p-0">
                                        <div className="sp1_ins_sell_dm--types">
                                            <span>
                                                CHOOSE{" "}
                                                {activeEntry.toUpperCase()}{" "}
                                                TYPES
                                            </span>
                                            {activeEntry &&
                                                getTypeByEntry(
                                                    modalData,
                                                    activeEntry
                                                )?.map((type) => (
                                                    <div
                                                        key={Math.random()}
                                                        onClick={() =>
                                                            setActiveType(
                                                                type.title
                                                            )
                                                        }
                                                        className={`sp1_ins_sell_dm--type${
                                                            activeType ===
                                                            type.title
                                                                ? " active"
                                                                : ""
                                                        }`}
                                                    >
                                                        <div>
                                                            <span>
                                                                {type.title}
                                                            </span>
                                                            <div>
                                                                {type.subtitle}
                                                            </div>
                                                        </div>

                                                        <i
                                                            className={`fa-solid fa-check`}
                                                            style={{
                                                                opacity:
                                                                    activeType ===
                                                                    type.title
                                                                        ? "1"
                                                                        : "0",
                                                            }}
                                                        />
                                                    </div>
                                                ))}
                                        </div>
                                    </div>
                                    {/* end choose type */}
                                </div>
                            )}
                        </div>

                        <div className="card-footer d-flex align-items-center justify-content-end">
                            {type === "goal" && isOpenForm ? (
                                <button
                                    onClick={() => setIsOpenForm(false)}
                                    className="btn btn-sm btn-outline-secondary mr-auto d-flex align-items-center"
                                >
                                    <i
                                        className="bi bi-arrow-left-short"
                                        style={{ fontSize: "18px" }}
                                    ></i>
                                    Previous
                                </button>
                            ) : null}
                            <button
                                onClick={close}
                                className="btn btn-sm btn-outline-secondary mr-2"
                            >
                                Close
                            </button>
                            {type === "goal" ? (
                                isOpenForm ? (
                                    <button
                                        className="btn btn-sm btn-success"
                                        disabled={!activeType}
                                    >
                                        Save
                                    </button>
                                ) : (
                                    <button
                                        onClick={() => setIsOpenForm(true)}
                                        className="btn btn-sm btn-success"
                                        disabled={!activeType}
                                    >
                                        Continue
                                    </button>
                                )
                            ) : (
                                <button
                                    className="btn btn-sm btn-success"
                                    disabled={!activeType}
                                >
                                    Continue
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default SellsDashboardModal;
