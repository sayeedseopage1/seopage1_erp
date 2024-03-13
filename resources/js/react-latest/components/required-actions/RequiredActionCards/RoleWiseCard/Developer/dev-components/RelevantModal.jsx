//mitul work start

import WarningIcon from "../../../../../../assest/warning.svg";
import { RxCrossCircled } from "react-icons/rx";
import ReactModal from "react-modal";
const RelevantModal = ({ isRelevantModal, setIsRelevantModal }) => {
    const submitHandler = (e) => {
        e.preventDefault();
        console.log(e);
    };
    return (
        <ReactModal
            style={{
                overlay: {
                    backgroundColor: "rgba(0, 0, 0, 0.6)",
                    margin: "auto auto",
                    zIndex: 100,
                },
                content: {
                    borderRadius: "10px",
                    maxWidth: "800px",
                    height: "260px",
                    margin: "auto auto",
                    border: "none",
                    overflow: "hidden",
                    padding: "10px",
                },
            }}
            isOpen={isRelevantModal}
            onRequestClose={() => setIsRelevantModal(false)}
        >
            <div
                onClick={() => setIsRelevantModal(false)}
                className="d-flex justify-content-end"
                style={{ cursor: "pointer" }}
            >
                <RxCrossCircled size={`30px`} />
            </div>
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "15px",
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: "50px",
                }}
            >
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: "15px",
                    }}
                >
                    <img
                        src={WarningIcon}
                        width={`40px`}
                        style={{
                            marginBottom: "2px",
                        }}
                    />

                    <h3
                        style={{
                            textAlign: "center",
                        }}
                    >
                        Are You sure this comment is not relevant to you?
                    </h3>
                </div>

                <div style={{}}>
                    <button
                        style={{
                            paddingLeft: "40px",
                            paddingRight: "40px",
                            fontSize: "18px",
                        }}
                        type="button"
                        class="btn btn-primary"
                        onClick={submitHandler}
                    >
                        Yes
                    </button>
                </div>
            </div>
        </ReactModal>
    );
};

export default RelevantModal;

//mitul work end
