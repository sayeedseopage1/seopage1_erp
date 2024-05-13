import ReactModal from "react-modal";
import styles from "./SingleEvaluation.module.css";
import { EvalTableTitle } from "../Table/ui";

import { useEffect, useState } from "react";

import { toast } from "react-toastify";

import { BiSolidEditAlt } from "react-icons/bi";

import CKEditorComponent from "../../../ckeditor";
useStoreTaskRatingMutation;
import { useAuth } from "../../../hooks/useAuth";
import useEmployeeEvaluation from "../../../zustand/store";
import {
    useStoreTaskRatingMutation,
    useUpdateTaskRatingSubmissionMutation,
} from "../../../services/api/EvaluationApiSlice";
import FormatDate from "../../../UI/comments/utils/FormatDate";
import { Button } from "react-bootstrap";
import axios from "axios";
import { convertTime } from "../../../utils/converTime";
import Popover from "../../../../react-latest/ui/Popover";
import RatingSection from "./RatingSection";
import RatingSectionStatic from "./RatingSectionStatic";

const SingleEvaluationModal = ({
    toggleSingleEvaluationModal,
    isSingleEvaluationModalOpen,
    data,
}) => {
    const { evaluationObject, setEvaluationObject } = useEmployeeEvaluation();
    const userIdFromParam = new URLSearchParams(location.search).get("user_id");

    const auth = useAuth();
    const [storeTaskRating, { isLoading: isLoadingReview }] =
        useStoreTaskRatingMutation();
    const [updateTaskRating, { isLoading: isLoadingUpdateTaskRating }] =
        useUpdateTaskRatingSubmissionMutation();
    const [averageRating, setAverageRating] = useState(data?.avg_rating);

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
        const fetchData = async () => {
            if (!userIdFromParam) return;
            try {
                const response = await axios.get(
                    `/account/employee-evaluation-user/${userIdFromParam}`
                );

                setEvaluationObject(response.data.data);
            } catch (error) {
                console.error("Error fetching evaluations:", error);
            }
        };

        fetchData();
    }, [userIdFromParam]);

    // console.log("evaluation object", evaluationObject);
    // console.log("average rating", averageRating);
    // console.log("data", data);

    useEffect(() => {
        const calculateAverageRating = (formData) => {
            const ratings = Object.values(formData).filter(
                (value) => typeof value === "number"
            );
            if (ratings.length === 0) return 0;
            const sum = ratings.reduce((acc, curr) => acc + curr, 0);
            return (sum / ratings.length).toFixed(2);
        };

        // Calculate average rating based on form data initially
        let newAverageRating = calculateAverageRating(formData);

        // If data.avg_rating is available and greater than zero, consider the form submitted
        if (data.avg_rating && data.avg_rating > 0) {
            newAverageRating = data.avg_rating;
        }

        // Update the state with the new average rating
        setAverageRating(newAverageRating);
    }, [formData, data.avg_rating]);

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
            .then(() => {
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
            ariaHideApp={false}
        >
            <EvalTableTitle>
                <span>New Developer Evaluation :</span>
                <span>{evaluationObject?.user_name}</span>
            </EvalTableTitle>
            <div className={styles.tableContainer}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Task name</th>
                            <th>Assign date</th>
                            <th>Submission date</th>
                            <th>Total hours tracked</th>
                            <th>Completed work URL</th>
                            <th>Revisions needed</th>
                            <th>Average rating</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                {data?.task_name ? (
                                    <div style={{ minWidth: "10rem" }}>
                                        <Popover>
                                            <Popover.Button>
                                                <span className=" singleline-ellipsis link_color">
                                                    <span className="link_color">
                                                        {data?.task_name}
                                                    </span>
                                                </span>
                                            </Popover.Button>

                                            <Popover.Panel>
                                                <div className="revision_popover_panel">
                                                    <a
                                                        href={`/account/tasks/${data.task_id}`}
                                                    >
                                                        <span className="link_color hover-underline">
                                                            {data?.task_name}
                                                        </span>
                                                    </a>
                                                </div>
                                            </Popover.Panel>
                                        </Popover>
                                    </div>
                                ) : (
                                    <span>Not Available</span>
                                )}
                            </td>
                            <td>{data?.assign_date}</td>
                            <td>{data.submission_date}</td>
                            <td>{convertTime(data?.total_min)}</td>
                            <td>
                                {data?.completed_work ? (
                                    <div style={{ minWidth: "10rem" }}>
                                        <Popover>
                                            <Popover.Button>
                                                <span className=" singleline-ellipsis link_color hover-underline">
                                                    {JSON.parse(
                                                        data?.completed_work
                                                    ).map((data) => (
                                                        <div>
                                                            <a
                                                                className="link_color"
                                                                href={data}
                                                            >
                                                                {data}
                                                            </a>
                                                            <br />
                                                        </div>
                                                    ))}
                                                </span>
                                            </Popover.Button>

                                            <Popover.Panel>
                                                <div className="revision_popover_panel">
                                                    {JSON.parse(
                                                        data.completed_work
                                                    ).map((data) => (
                                                        <div>
                                                            <a
                                                                className="hover-underline"
                                                                href={data}
                                                            >
                                                                {data}
                                                            </a>
                                                            <br />
                                                        </div>
                                                    ))}
                                                </div>
                                            </Popover.Panel>
                                        </Popover>
                                    </div>
                                ) : (
                                    <span>Not Available</span>
                                )}
                            </td>
                            <td>{data.revision_number}</td>

                            <td>{averageRating ?? "N/A"}</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div>
                <div className={styles.rating_container}>
                    {auth.roleId === 6 &&
                        (evaluationObject?.ld_submission_status === 0
                            ? formFields.map((field, index) => (
                                  <RatingSection key={index} {...field} />
                              ))
                            : evaluationObject?.ld_submission_status === 1 &&
                              formFields.map((field, index) => (
                                  <RatingSectionStatic key={index} {...field} />
                              )))}

                    {(auth.roleId === 8 || auth.roleId === 1) &&
                        formFields.map((field, index) => (
                            <RatingSectionStatic key={index} {...field} />
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
                        (evaluationObject?.ld_submission_status === 0 ? (
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
                                        {evaluationObject?.added_by_name}
                                    </a>{" "}
                                    on{" "}
                                    <span>{FormatDate(data?.updated_at)}</span>
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
                                    {evaluationObject?.added_by_name}
                                </a>{" "}
                                on <span>{FormatDate(data?.updated_at)}</span>
                            </div>
                        </section>
                    )}
                </div>
                <div className="d-flex justify-content-center">
                    {auth.roleId === 6 &&
                        evaluationObject?.ld_submission_status === 0 &&
                        (data?.avg_rating === null ? (
                            <Button
                                onClick={handleSubmit}
                                size="md"
                                className="ml-2"
                                disabled={isLoadingReview}
                            >
                                {isLoadingReview
                                    ? "Submitting"
                                    : "Submit Evaluation"}
                            </Button>
                        ) : (
                            <Button
                                className="mr-2 btn btn-primary "
                                onClick={handleEdit}
                                disabled={isLoadingUpdateTaskRating}
                            >
                                <div>
                                    <BiSolidEditAlt />
                                    <span>
                                        {" "}
                                        {isLoadingUpdateTaskRating
                                            ? "Updating"
                                            : "Update Rating"}
                                    </span>
                                </div>
                            </Button>
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
