import ReactModal from "react-modal";
import styles from "../../../components/modal/EvaluationRating.module.css";
import {
    CommentLeadDevSection,
    EvalTableTitle,
    LeadDevComment,
    LeadDevName,
    RatingButtonSection,
    RatingLeadDevSection,
    RatingSectionLeadDev,
    RatingTitleAndTableSection,
    TeamLeadComment,
    TeamLeadName,
} from "../../../components/Table/ui.jsx";

import { useEffect, useState } from "react";

import { toast } from "react-toastify";

import { BiSolidEditAlt } from "react-icons/bi";

import {
    useStoreTaskRatingMutation,
    useUpdateTaskRatingSubmissionMutation,
} from "../../../../services/api/EvaluationApiSlice.js";

import { Button } from "react-bootstrap";
import axios from "axios";

import CKEditorComponent from "../../../../ckeditor/index.jsx";
import { useAuth } from "../../../../hooks/useAuth.jsx";
import useEmployeeEvaluation from "../../../../zustand/store.js";
import FormatDate from "../../../../utils/FormateDate.js";
import RatingSection from "../../../components/modal/RatingSection.jsx";
import RatingSectionStatic from "../../../components/modal/RatingSectionStatic.jsx";
import EvaluationRatingTable from "../../../components/Table/EvaluationRatingTable.jsx";
import { ratingHoverText } from "../../../../utils/ratingHoverText.js";

const EvaluationRatingModalPM = ({
    toggleSingleEvaluationModal,
    isSingleEvaluationModalOpen,
    data,
}) => {
    // console.log("data in evaluation rating modal", data);
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

        team_lead_cmnt: data.team_lead_cmnt ?? "",
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
            hoverText: ratingHoverText?.qw_first_chance,
            onChange: (value) =>
                setFormData({
                    ...formData,

                    qw_first_chance: value,
                }),
        },
        {
            label: "Quality of work (After 1st revision)",
            value: formData.qw_first_revision,
            hoverText: ratingHoverText?.qw_first_revision,
            onChange: (value) =>
                setFormData({
                    ...formData,

                    qw_first_revision: value,
                }),
        },
        {
            label: "Quality of work (After 2nd revision)",
            value: formData.qw_second_revision,
            hoverText: ratingHoverText?.qw_second_revision,
            onChange: (value) =>
                setFormData({
                    ...formData,

                    qw_second_revision: value,
                }),
        },
        {
            label: "Speed of work",
            value: formData.speed_of_work,
            hoverText: ratingHoverText?.speed_of_work,
            onChange: (value) =>
                setFormData({
                    ...formData,

                    speed_of_work: value,
                }),
        },
        {
            label: "Ability to understand instruction",
            value: formData.understand_instruction,
            hoverText: ratingHoverText?.understand_instruction,
            onChange: (value) =>
                setFormData({
                    ...formData,

                    understand_instruction: value,
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
            { key: "team_lead_cmnt", label: "Lead Developers Opinion" },
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
            evaluation_id: data?.id,
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
            evaluation_id: data?.id,
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
                    maxWidth: "1000px",
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
            <RatingTitleAndTableSection>
                <EvalTableTitle>
                    <span>New Developer Evaluation :</span>
                    <span>{evaluationObject?.user_name}</span>
                </EvalTableTitle>
                <EvaluationRatingTable
                    data={data}
                    averageRating={averageRating}
                />
            </RatingTitleAndTableSection>

            <RatingSectionLeadDev className={styles.rating_container}>
                {auth.roleId === 8 &&
                    (evaluationObject?.team_lead_submission_status === 0
                        ? formFields.map((field, index) => (
                              <RatingSection key={index} {...field} />
                          ))
                        : evaluationObject?.team_lead_submission_status === 1 &&
                          formFields.map((field, index) => (
                              <RatingSectionStatic key={index} {...field} />
                          )))}

                {auth.roleId === 1 &&
                    formFields.map((field, index) => (
                        <RatingSectionStatic key={index} {...field} />
                    ))}
            </RatingSectionLeadDev>

            <CommentLeadDevSection>
                <div className={styles.lead_dev_opinion}>
                    Team Lead's Opinion
                </div>
                <div
                    style={{
                        border: "2px solid rgba(0, 0, 0, 0.2)",
                        marginBottom: "20px",
                        marginTop: "10px",
                    }}
                >
                    {auth.roleId === 8 &&
                        (evaluationObject?.team_lead_submission_status === 0 ? (
                            <CKEditorComponent
                                placeholder="Write your comment here"
                                data={formData?.team_lead_cmnt}
                                onChange={(e, editor) => {
                                    const data = editor.getData();
                                    setFormData((prev) => ({
                                        ...prev,
                                        team_lead_cmnt: data,
                                    }));
                                }}
                            />
                        ) : (
                            <TeamLeadComment>
                                <div
                                    dangerouslySetInnerHTML={{
                                        __html: data?.team_lead_cmnt,
                                    }}
                                ></div>
                                <TeamLeadName>
                                    By{" "}
                                    <a
                                        href={`/account/employees/${data?.addedById}`}
                                        target="_blank"
                                    >
                                        {data?.addedByName}
                                    </a>{" "}
                                    on{" "}
                                    <span>{FormatDate(data?.updated_at)}</span>
                                </TeamLeadName>
                            </TeamLeadComment>
                        ))}

                    {auth.roleId === 1 && (
                        <TeamLeadComment>
                            <div
                                dangerouslySetInnerHTML={{
                                    __html: data?.team_lead_cmnt,
                                }}
                            ></div>

                            <TeamLeadName>
                                By{" "}
                                <a
                                    href={`/account/employees/${data?.addedById}`}
                                    target="_blank"
                                >
                                    {data?.addedByName}
                                </a>{" "}
                                on <span>{FormatDate(data?.updated_at)}</span>
                            </TeamLeadName>
                        </TeamLeadComment>
                    )}
                </div>
            </CommentLeadDevSection>
            <RatingButtonSection>
                <div className="d-flex justify-content-center">
                    {auth.roleId === 8 &&
                        evaluationObject?.team_lead_submission_status === 0 &&
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
            </RatingButtonSection>
        </ReactModal>
    );
};

export default EvaluationRatingModalPM;
