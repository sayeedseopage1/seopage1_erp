import { RxCrossCircled } from "react-icons/rx";
import ReactModal from "react-modal";
import styles from "./SingleEvaluation.module.css";
import { EvalTableTitle } from "../Table/ui";
import FractionalRating from "../../../../../../react/global/FractionalRating";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Button from "../../../../../../react/global/Button";
import ReusableSection from "./ReusableSection";
import CKEditorComponent from "../../../../../ui/ckeditor";

const SingleEvaluationModal = ({
    toggleSingleEvaluationModal,
    isSingleEvaluationModalOpen,
    data,
}) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const [formData, setFormData] = useState({
        work_quality_first_chance_rating: null,
        work_quality_first_revision_rating: null,
        work_quality_second_revision_rating: null,
        work_speed_rating: null,
        instruction_understanding_ability_rating: null,
        communication_rating: null,
        professionalism_rating: null,
        issues_identifications_ability_rating: null,
        dedication_rating: null,
        obedience_rating: null,
        reporting_boss_comment: "",
    });
    const formFields = [
        {
            label: "Quality of work (in the first chance)",
            value: formData.work_quality_first_chance_rating,
            onChange: (value) =>
                setFormData({
                    ...formData,
                    work_quality_first_chance_rating: value,
                }),
            error:
                errors.work_quality_first_chance_rating &&
                "Rating is required.",
        },
        {
            label: "Quality of work (After 1st revision)",
            value: formData.work_quality_first_revision_rating,
            onChange: (value) =>
                setFormData({
                    ...formData,
                    work_quality_first_revision_rating: value,
                }),
            error:
                errors.work_quality_first_revision_rating &&
                "Rating is required.",
        },
        {
            label: "Quality of work (After 2nd revision)",
            value: formData.work_quality_second_revision_rating,
            onChange: (value) =>
                setFormData({
                    ...formData,
                    work_quality_second_revision_rating: value,
                }),
            error:
                errors.work_quality_second_revision_rating &&
                "Rating is required.",
        },
        {
            label: "Speed of work",
            value: formData.work_speed_rating,
            onChange: (value) =>
                setFormData({
                    ...formData,
                    work_speed_rating: value,
                }),
            error: errors.work_speed_rating && "Rating is required.",
        },
        {
            label: "Ability to understand instruction",
            value: formData.instruction_understanding_ability_rating,
            onChange: (value) =>
                setFormData({
                    ...formData,
                    instruction_understanding_ability_rating: value,
                }),
            error:
                errors.instruction_understanding_ability_rating &&
                "Rating is required.",
        },
        {
            label: "Communication",
            value: formData.communication_rating,
            onChange: (value) =>
                setFormData({
                    ...formData,
                    communication_rating: value,
                }),
            error: errors.communication_rating && "Rating is required.",
        },
        {
            label: "Professionalism",
            value: formData.professionalism_rating,
            onChange: (value) =>
                setFormData({
                    ...formData,
                    professionalism_rating: value,
                }),
            error: errors.professionalism_rating && "Rating is required.",
        },
        {
            label: "Ability to identify issues",
            value: formData.issues_identifications_ability_rating,
            onChange: (value) =>
                setFormData({
                    ...formData,
                    issues_identifications_ability_rating: value,
                }),
            error:
                errors.issues_identifications_ability_rating &&
                "Rating is required.",
        },
        {
            label: "Dedication",
            value: formData.dedication_rating,
            onChange: (value) =>
                setFormData({
                    ...formData,
                    dedication_rating: value,
                }),
            error: errors.dedication_rating && "Rating is required.",
        },
        {
            label: "Obedience",
            value: formData.obedience_rating,
            onChange: (value) =>
                setFormData({
                    ...formData,
                    obedience_rating: value,
                }),
            error: errors.obedience_rating && "Rating is required.",
        },
    ];

    const onSubmit = () => {
        console.log("form data", formData);
    };

    console.log("submit data", formData);

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
                    maxHeight: "900px",
                    maxWidth: "900px",
                    margin: "auto auto",
                    border: "none",
                    overflow: "hidden",
                    padding: "20px",
                    overflowY: "auto",
                },
            }}
            isOpen={isSingleEvaluationModalOpen}
            onRequestClose={() => toggleSingleEvaluationModal()}
        >
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

            <form onSubmit={onSubmit}>
                <div className={styles.rating_container}>
                    {formFields.map((field, index) => (
                        <ReusableSection key={index} {...field} />
                    ))}
                </div>
                <div
                    style={{
                        border: "2px solid rgba(0, 0, 0, 0.5)",
                        marginBottom: "20px",
                        marginTop: "20px",
                    }}
                >
                    <CKEditorComponent
                        placeholder="Write your comment here"
                        onChange={(e, editor) => {
                            const data = editor.getData();
                            setFormData((prev) => ({
                                ...prev,
                                reporting_boss_comment: data,
                            }));
                        }}
                    />
                </div>
                <div className="d-flex justify-content-center">
                    <Button className="mr-2" type="submit">
                        Submit Evaluation
                    </Button>
                    <Button
                        onClick={() => toggleSingleEvaluationModal()}
                        className="ml-2"
                        variant="secondary"
                    >
                        Close
                    </Button>
                </div>
            </form>
        </ReactModal>
    );
};

export default SingleEvaluationModal;
