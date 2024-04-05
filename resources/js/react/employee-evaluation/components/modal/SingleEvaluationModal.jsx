import ReactModal from "react-modal";
import styles from "./SingleEvaluation.module.css";
import { EvalTableTitle } from "../Table/ui";

import { useEffect, useState } from "react";

import ReusableSection from "./ReusableSection";

import { toast } from "react-toastify";

import { BiSolidEditAlt } from "react-icons/bi";

import ReusableSectionTeamLeadAndAdmin from "./ReusableSectionTeamLeadAndAdmin";
import Button from "../../../global/Button";
import CKEditorComponent from "../../../ckeditor";
useStoreTaskRatingMutation;
import { useAuth } from "../../../hooks/useAuth";
import useEmployeeEvaluation from "../../../zustand/store";
import {
    useStoreTaskRatingMutation,
    useUpdateTaskRatingSubmissionMutation,
} from "../../../services/api/EvaluationApiSlice";

const SingleEvaluationModal = ({
    toggleSingleEvaluationModal,
    isSingleEvaluationModalOpen,
    data,
}) => {
    const auth = useAuth();
    const { evaluationObject } = useEmployeeEvaluation();
    const [storeTaskRating] = useStoreTaskRatingMutation();
    const [updateTaskRating] = useUpdateTaskRatingSubmissionMutation();
    const [averageRating, setAverageRating] = useState(
        evaluationObject.lead_dev_avg_rating
    );

    const [formData, setFormData] = useState({
        qw_first_chance: data.qw_first_chance ?? 0,
        qw_first_revision: data.qw_first_revision ?? 0,
        qw_second_revision: data.qw_second_revision ?? 0,
        speed_of_work: data.speed_of_work ?? 0,
        understand_instruction: data.understand_instruction ?? 0,
        communication: data.communication ?? 0,
        professionalism: data.professionalism ?? 0,
        identiey_issues: data.identiey_issues ?? 0,
        dedication: data.dedication ?? 0,
        obedience: data.obedience ?? 0,
        lead_dev_cmnt: data.lead_dev_cmnt ?? "",
    });

    useEffect(() => {
        const calculateAverageRating = (formData) => {
            const ratings = Object.values(formData).filter(
                (value) => typeof value === "number"
            );
            if (ratings.length === 0) return 0;
            const sum = ratings.reduce((acc, curr) => acc + curr, 0);
            return sum / ratings.length;
        };

        setAverageRating(calculateAverageRating(formData).toFixed(2));
    }, [formData]);

    const formFields = [
        {
            label: "Quality of work (in the first chance)",
            value: formData.qw_first_chance,
            onChange: (value) =>
                setFormData({
                    ...formData,

                    qw_first_chance: value,
                }),
        },
        {
            label: "Quality of work (After 1st revision)",
            value: formData.qw_first_revision,
            onChange: (value) =>
                setFormData({
                    ...formData,

                    qw_first_revision: value,
                }),
        },
        {
            label: "Quality of work (After 2nd revision)",
            value: formData.qw_second_revision,
            onChange: (value) =>
                setFormData({
                    ...formData,

                    qw_second_revision: value,
                }),
        },
        {
            label: "Speed of work",
            value: formData.speed_of_work,
            onChange: (value) =>
                setFormData({
                    ...formData,

                    speed_of_work: value,
                }),
        },
        {
            label: "Ability to understand instruction",
            value: formData.understand_instruction,
            onChange: (value) =>
                setFormData({
                    ...formData,

                    understand_instruction: value,
                }),
        },
        {
            label: "Communication",
            value: formData.communication,
            onChange: (value) =>
                setFormData({
                    ...formData,
                    communication: value,
                }),
        },
        {
            label: "Professionalism",
            value: formData.professionalism,
            onChange: (value) =>
                setFormData({
                    ...formData,

                    professionalism: value,
                }),
        },
        {
            label: "Ability to identify issues",
            value: formData.identiey_issues,
            onChange: (value) =>
                setFormData({
                    ...formData,

                    identiey_issues: value,
                }),
        },
        {
            label: "Dedication",
            value: formData.dedication,
            onChange: (value) =>
                setFormData({
                    ...formData,

                    dedication: value,
                }),
        },
        {
            label: "Obedience",
            value: formData.obedience,
            onChange: (value) =>
                setFormData({
                    ...formData,

                    obedience: value,
                }),
        },
    ];

    const handleSubmit = async (e) => {
        e.preventDefault();
        const requiredFields = [
            {
                key: "qw_first_chance",
                label: "Quality of work (in the first chance)",
            },
            {
                key: "qw_first_revision",
                label: "Quality of work (After 1st revision)",
            },
            {
                key: "qw_second_revision",
                label: "Quality of work (After 2nd revision)",
            },
            { key: "speed_of_work", label: "Speed of work" },
            {
                key: "understand_instruction",
                label: "Ability to understand instruction",
            },
            { key: "communication", label: "Communication" },
            { key: "professionalism", label: "Professionalism" },
            {
                key: "identiey_issues",
                label: "Ability to identify issues",
            },
            { key: "dedication", label: "Dedication" },
            { key: "obedience", label: "Obedience" },
            { key: "lead_dev_cmnt", label: "Lead Developers Opinion" },
        ];

        const emptyFields = requiredFields
            .filter((field) => !formData[field.key])
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

        await storeTaskRating({
            ...formData,
            evaluation_id: data.id,
            _token: document
                .querySelector("meta[name='csrf-token']")
                .getAttribute("content"),
        })
            .unwrap()
            .then((response) => {
                toast.success("Rating submitted");
                toggleSingleEvaluationModal();
            })
            .catch((error) => {
                console.error("Error submitting rating:", error);
                toast.error("Rating not submitted");
            });
    };
    const handleEdit = async (e) => {
        e.preventDefault();

        await updateTaskRating({
            ...formData,
            evaluation_id: evaluationObject.id,
            _token: document
                .querySelector("meta[name='csrf-token']")
                .getAttribute("content"),
        })
            .unwrap()
            .then((response) => {
                toast.success("Rating updated");
                toggleSingleEvaluationModal();
            })
            .catch((error) => {
                console.error("Error updating rating:", error);
                toast.error("Error updating rating");
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
                    height: "fit-content",
                    maxHeight: "95vh",
                    maxWidth: "1200px",
                    margin: "auto auto",
                    border: "none",

                    padding: "20px",
                    overflowY: "auto",
                },
            }}
            isOpen={isSingleEvaluationModalOpen}
            onRequestClose={() => toggleSingleEvaluationModal()}
        >
            <EvalTableTitle>
                <span>New Developer Evaluation :</span>
                <span>{evaluationObject.user_name ?? "Tanvir Mitul"}</span>
            </EvalTableTitle>
            <div className={styles.tableContainer}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Task name</th>
                            <th>Assign data</th>
                            <th>Submission Date</th>
                            <th>Total hours tracked</th>
                            <th>Completed work link</th>
                            <th>Revisions needed</th>
                            <th>Average Rating</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{data?.task_name}</td>
                            <td>{data?.assign_date}</td>
                            <td>{data.submission_date}</td>
                            <td>
                                {" "}
                                {`${data?.total_hours || 0} hr ${
                                    data?.total_min || 0
                                }min`}
                            </td>
                            <td>
                                {data?.completed_work &&
                                    JSON.parse(data?.completed_work).map(
                                        (data) => (
                                            <div>
                                                <a href={data}>{data}</a>
                                                <br />
                                            </div>
                                        )
                                    )}
                            </td>
                            <td>{data.revision_number}</td>
                            {evaluationObject.lead_dev_avg_rating ? (
                                <td>{evaluationObject.lead_dev_avg_rating} </td>
                            ) : (
                                <td>{averageRating ?? "N/A"}</td>
                            )}
                        </tr>
                    </tbody>
                </table>
            </div>

            <div>
                <div className={styles.rating_container}>
                    {auth.roleId === 6 &&
                        (evaluationObject.ld_submission_status === 0
                            ? formFields.map((field, index) => (
                                  <ReusableSection key={index} {...field} />
                              ))
                            : evaluationObject.ld_submission_status === 1 &&
                              formFields.map((field, index) => (
                                  <ReusableSectionTeamLeadAndAdmin
                                      key={index}
                                      {...field}
                                  />
                              )))}

                    {(auth.roleId === 8 || auth.roleId === 1) &&
                        formFields.map((field, index) => (
                            <ReusableSectionTeamLeadAndAdmin
                                key={index}
                                {...field}
                            />
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
                    {auth.roleId === 6 &&
                        (evaluationObject.ld_submission_status === 0 ? (
                            <CKEditorComponent
                                placeholder="Write your comment here"
                                data={formData?.lead_dev_cmnt}
                                onChange={(e, editor) => {
                                    const data = editor.getData();
                                    setFormData((prev) => ({
                                        ...prev,
                                        lead_dev_cmnt: data,
                                    }));
                                }}
                            />
                        ) : (
                            <section
                                style={{
                                    height: "auto",
                                    position: "relative",
                                    width: "100%",
                                    padding: "10px",
                                    paddingBottom: "40px",
                                }}
                            >
                                <div
                                    dangerouslySetInnerHTML={{
                                        __html: data?.lead_dev_cmnt,
                                    }}
                                ></div>
                                <div
                                    style={{
                                        position: "absolute",
                                        bottom: "10px",
                                        right: "10px",
                                        padding: "3px",
                                        border: "1px solid grey",
                                    }}
                                >
                                    By{" "}
                                    <a
                                        href="www.LeadDevId.com"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        {evaluationObject.added_by_name}
                                    </a>{" "}
                                    on <span>{data?.updated_at}</span>
                                </div>
                            </section>
                        ))}

                    {(auth.roleId === 8 || auth.roleId === 1) && (
                        <section
                            style={{
                                height: "auto",
                                position: "relative",
                                width: "100%",
                                padding: "10px",
                                paddingBottom: "40px",
                            }}
                        >
                            <div
                                dangerouslySetInnerHTML={{
                                    __html: data?.lead_dev_cmnt,
                                }}
                            ></div>

                            <div
                                style={{
                                    position: "absolute",
                                    bottom: "10px",
                                    right: "10px",
                                    padding: "3px",
                                    border: "1px solid grey",
                                }}
                            >
                                By{" "}
                                <a
                                    href="www.LeadDevId.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    {evaluationObject.added_by_name}
                                </a>{" "}
                                on <span>{data?.updated_at}</span>
                            </div>
                        </section>
                    )}
                </div>
                <div className="d-flex justify-content-center">
                    {auth.roleId === 6 &&
                        evaluationObject.ld_submission_status === 0 &&
                        (data?.avg_rating === null ? (
                            <button
                                className="mr-2 btn btn-primary "
                                onClick={handleSubmit}
                            >
                                Submit Evaluation
                            </button>
                        ) : (
                            <button
                                className="mr-2 btn btn-primary "
                                onClick={handleEdit}
                            >
                                <div>
                                    <BiSolidEditAlt />
                                    <span> Edit Rating</span>
                                </div>
                            </button>
                        ))}
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
