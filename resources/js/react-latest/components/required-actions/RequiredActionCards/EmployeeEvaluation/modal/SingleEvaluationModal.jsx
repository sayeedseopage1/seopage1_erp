import { RxCrossCircled } from "react-icons/rx";
import ReactModal from "react-modal";
import styles from "./SingleEvaluation.module.css";
import { EvalTableTitle } from "../Table/ui";
import FractionalRating from "../../../../../../react/global/FractionalRating";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Button from "../../../../../../react/global/Button";
import ReusableSection from "./ReusableSection";
import CKEditorComponent from "../../../../../ui/ckeditor";
import { toast } from "react-toastify";
import { useUpdateTaskMutation } from "../../../../../services/api/EvaluationApiSlice";
useUpdateTaskMutation;
const SingleEvaluationModal = ({
    toggleSingleEvaluationModal,
    isSingleEvaluationModalOpen,
    data,
}) => {
    const [putTask] = useUpdateTaskMutation();

    console.log("update task mutation", useUpdateTaskMutation());
    const [averageRating, setAverageRating] = useState(data.averageRating);
    const [formData, setFormData] = useState({
        averageRating: data?.averageRating ?? 0,
        rating: {
            work_quality_first_chance_rating:
                data.rating?.work_quality_first_chance_rating ?? 0,
            work_quality_first_revision_rating:
                data.rating?.work_quality_first_chance_rating ?? 0,
            work_quality_second_revision_rating:
                data.rating?.work_quality_second_revision_rating ?? 0,
            work_speed_rating: data.rating.work_speed_rating ?? 0,
            instruction_understanding_ability_rating:
                data.rating.instruction_understanding_ability_rating ?? 0,
            communication_rating: data.rating.communication_rating ?? 0,
            professionalism_rating: data.rating.professionalism_rating ?? 0,
            issues_identifications_ability_rating:
                data.rating.issues_identifications_ability_rating ?? 0,
            dedication_rating: data.rating.dedication_rating ?? 0,
            obedience_rating: data.rating.obedience_rating ?? 0,
            reporting_boss_comment: data.rating.reporting_boss_comment ?? "",
        },
    });

    useEffect(() => {
        const calculateAverageRating = () => {
            const ratings = Object.values(formData.rating).filter((value) =>
                /^[+-]?\d+(\.\d+)?$/.test(value)
            );
            const sum = ratings.reduce((total, rating) => total + rating, 0);
            return (sum / ratings.length).toFixed(2);
        };
        setAverageRating(calculateAverageRating());

        console.log(formData);
    }, [formData.rating]);

    const formFields = [
        {
            label: "Quality of work (in the first chance)",
            value: formData.rating.work_quality_first_chance_rating,
            onChange: (value) =>
                setFormData({
                    ...formData,
                    averageRating: averageRating,
                    rating: {
                        ...formData.rating,
                        work_quality_first_chance_rating: value,
                    },
                }),
        },
        {
            label: "Quality of work (After 1st revision)",
            value: formData.rating.work_quality_first_revision_rating,
            onChange: (value) =>
                setFormData({
                    ...formData,
                    rating: {
                        ...formData.rating,
                        work_quality_first_revision_rating: value,
                    },
                }),
        },
        {
            label: "Quality of work (After 2nd revision)",
            value: formData.rating.work_quality_second_revision_rating,
            onChange: (value) =>
                setFormData({
                    ...formData,
                    rating: {
                        ...formData.rating,
                        work_quality_second_revision_rating: value,
                    },
                }),
        },
        {
            label: "Speed of work",
            value: formData.rating.work_speed_rating,
            onChange: (value) =>
                setFormData({
                    ...formData,
                    rating: {
                        ...formData.rating,
                        work_speed_rating: value,
                    },
                }),
        },
        {
            label: "Ability to understand instruction",
            value: formData.rating.instruction_understanding_ability_rating,
            onChange: (value) =>
                setFormData({
                    ...formData,
                    rating: {
                        ...formData.rating,
                        instruction_understanding_ability_rating: value,
                    },
                }),
        },
        {
            label: "Communication",
            value: formData.rating.communication_rating,
            onChange: (value) =>
                setFormData({
                    ...formData,
                    rating: {
                        ...formData.rating,
                        communication_rating: value,
                    },
                }),
        },
        {
            label: "Professionalism",
            value: formData.rating.professionalism_rating,
            onChange: (value) =>
                setFormData({
                    ...formData,
                    rating: {
                        ...formData.rating,
                        professionalism_rating: value,
                    },
                }),
        },
        {
            label: "Ability to identify issues",
            value: formData.rating.issues_identifications_ability_rating,
            onChange: (value) =>
                setFormData({
                    ...formData,
                    rating: {
                        ...formData.rating,
                        issues_identifications_ability_rating: value,
                    },
                }),
        },
        {
            label: "Dedication",
            value: formData.rating.dedication_rating,
            onChange: (value) =>
                setFormData({
                    ...formData,
                    rating: {
                        ...formData.rating,
                        dedication_rating: value,
                    },
                }),
        },
        {
            label: "Obedience",
            value: formData.rating.obedience_rating,
            onChange: (value) =>
                setFormData({
                    ...formData,
                    rating: {
                        ...formData.rating,
                        obedience_rating: value,
                    },
                }),
        },
    ];

    const handleSubmit = async () => {
        const requiredFields = [
            {
                key: "work_quality_first_chance_rating",
                label: "Quality of work (in the first chance)",
            },
            {
                key: "work_quality_first_revision_rating",
                label: "Quality of work (After 1st revision)",
            },
            {
                key: "work_quality_second_revision_rating",
                label: "Quality of work (After 2nd revision)",
            },
            { key: "work_speed_rating", label: "Speed of work" },
            {
                key: "instruction_understanding_ability_rating",
                label: "Ability to understand instruction",
            },
            { key: "communication_rating", label: "Communication" },
            { key: "professionalism_rating", label: "Professionalism" },
            {
                key: "issues_identifications_ability_rating",
                label: "Ability to identify issues",
            },
            { key: "dedication_rating", label: "Dedication" },
            { key: "obedience_rating", label: "Obedience" },
            { key: "reporting_boss_comment", label: "Lead Developers Opinion" },
        ];

        const emptyFields = requiredFields
            .filter((field) => !formData.rating[field.key])
            .map((field) => field.label);

        if (emptyFields.length > 0) {
            const errorMessage = (
                <div>
                    <div style={{ fontWeight: "bold" }}>
                        {" "}
                        Please fill in the following fields:
                    </div>
                    <div>
                        {emptyFields.map((field, index) => (
                            <p key={index}>{field}</p>
                        ))}
                    </div>
                </div>
            );

            toast.error(errorMessage);
            return;
        }

        const fd = new FormData();
        fd.append("averageRating", averageRating);
        fd.append("evaluationStatus", "completed");
        Object.entries(formData.rating).forEach(([key, value]) => {
            fd.append(`rating[${key}]`, value);
        });

        putTask({ taskId: data._id, data: fd })
            .unwrap()
            .then((response) => {
                toast.success("Rating submitted");
                toggleSingleEvaluationModal();
            })
            .catch((error) => {
                toast.error("Rating not submitted");
            });
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
                    maxHeight: "900px",
                    maxWidth: "1000px",
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
                            <th>Average Rating</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{data?.taskName}</td>
                            <td>{data?.assignDate}</td>
                            <td>{data.submissionDate}</td>
                            <td>{data?.totalHoursTracked}</td>
                            <td>
                                <a href="#">{data?.completedWorkLink}</a>
                            </td>
                            <td>{data.numberOfRevisions}</td>
                            <td>{averageRating ?? "N/A"}</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div>
                <div className={styles.rating_container}>
                    {formFields.map((field, index) => (
                        <ReusableSection key={index} {...field} />
                    ))}
                </div>

                <div
                    style={{
                        marginTop: "30px",
                        fontWeight: "bold",
                    }}
                >
                    Lead Developers Opinion
                </div>
                <div
                    style={{
                        border: "2px solid rgba(0, 0, 0, 0.2)",
                        marginBottom: "20px",
                        marginTop: "10px",
                    }}
                >
                    <CKEditorComponent
                        placeholder="Write your comment here"
                        data={formData?.rating?.reporting_boss_comment}
                        onChange={(e, editor) => {
                            const data = editor.getData();
                            setFormData((prev) => ({
                                ...prev,
                                averageRating: averageRating,
                                rating: {
                                    ...formData.rating,
                                    reporting_boss_comment: data,
                                },
                            }));
                        }}
                    />
                </div>
                <div className="d-flex justify-content-center">
                    <button
                        className="mr-2 btn btn-primary "
                        onClick={handleSubmit}
                    >
                        Submit Evaluation
                    </button>
                    <Button
                        size="md"
                        onClick={() => toggleSingleEvaluationModal()}
                        className="ml-2"
                        variant="secondary"
                    >
                        Close
                    </Button>
                </div>
            </div>
        </ReactModal>
    );
};

export default SingleEvaluationModal;
