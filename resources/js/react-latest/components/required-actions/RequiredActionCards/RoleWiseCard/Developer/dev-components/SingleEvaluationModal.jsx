//mitul work start
import { RxCrossCircled } from "react-icons/rx";
import { EvalTableTitle } from "./Table/ui";
import ReactModal from "react-modal";
import styles from "./SingleEvaluation.module.css";
const SingleEvaluationModal = ({
    toggleSingleEvaluationModal,
    isSingleEvaluationModalOpen,
    data,
}) => {
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
                    maxHeight: "100vh",
                    maxWidth: "80vw",
                    margin: "auto auto",
                    border: "none",
                    overflow: "hidden",
                    padding: "20px",
                },
            }}
            isOpen={isSingleEvaluationModalOpen}
            onRequestClose={() => toggleSingleEvaluationModal()}
        >
            <div className="d-flex justify-content-end mb-4">
                <div
                    onClick={() => toggleSingleEvaluationModal()}
                    style={{ cursor: "pointer" }}
                >
                    <RxCrossCircled size={`30px`} />
                </div>
            </div>
            <EvalTableTitle>
                <span>New Developer Evaluation :</span>
                <span>{data?.developerName ?? "Tanvir Mitul"}</span>
            </EvalTableTitle>
            <div className={styles.tableContainer}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Individual task name</th>
                            <th>Assign data</th>
                            <th>Submission Date</th>
                            <th>Total hours tracked</th>
                            <th>Link to the completed work</th>
                            <th>Number of Revisions needed</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{data?.individualTaskName}</td>
                            <td>{data?.assignDate}</td>
                            <td>{data.submissionDate}</td>
                            <td>{data?.totalHoursTracked}</td>
                            <td>
                                <a href="#">{data?.linkToTheCompletedWork}</a>
                            </td>
                            <td>{data.numberOfRevisionsNeeded}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </ReactModal>
    );
};

export default SingleEvaluationModal;

//mitul work end
