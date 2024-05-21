import ReactModal from "react-modal";
import styles from "./EvaluationRating.module.css";
import {
    CommentLeadDevSection,
    EvalTableTitle,
    LeadDevComment,
    LeadDevName,
    RatingButtonSection,
    RatingLeadDevSection,
    RatingSectionLeadDev,
    RatingTitleAndTableSection,
} from "../Table/ui";

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
import EvaluationRatingTable from "../Table/EvaluationRatingTable";

const EvaluationRatingModal = ({
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
        // communication: data.communication ?? 0,
        // professionalism: data.professionalism ?? 0,
        // identiey_issues: data.identiey_issues ?? 0,
        // dedication: data.dedication ?? 0,
        // obedience: data.obedience ?? 0,
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
            hoverText:
                "If someone's quality of work is in line with our expectation or in line with what was asked in the brief, he will get 10 out of 10.",
            onChange: (value) =>
                setFormData({
                    ...formData,

                    qw_first_chance: value,
                }),
        },
        {
            label: "Quality of work (After 1st revision)",
            value: formData.qw_first_revision,
            hoverText:
                "If someone's quality of work is in line with our expectation or in line with what was asked in the brief, he will get 10 out of 10.",
            onChange: (value) =>
                setFormData({
                    ...formData,

                    qw_first_revision: value,
                }),
        },
        {
            label: "Quality of work (After 2nd revision)",
            value: formData.qw_second_revision,
            hoverText:
                "If someone's quality of work is in line with our expectation or in line with what was asked in the brief, he will get 10 out of 10.",
            onChange: (value) =>
                setFormData({
                    ...formData,

                    qw_second_revision: value,
                }),
        },
        {
            label: "Speed of work",
            value: formData.speed_of_work,
            hoverText:
                "How fast can someone finish his assigned work and if that is okay as per his/her experience level. For example, if someone with very SEO knowledge can do yoast for a page in half an hour (properly), that should be good and he should get a good score here. Alternatively, if someone with 3 years of SEO knowledge wants to get a good score here, he/she should be able to complete yoast optimization for a page in 15-20 minutes. It's a relative score and depends on the experience/expertise level.",
            onChange: (value) =>
                setFormData({
                    ...formData,

                    speed_of_work: value,
                }),
        },
        {
            label: "Ability to understand instruction",
            value: formData.understand_instruction,
            hoverText:
                "A smart employee will always share the problems/issues he/she notices when working on something problematic. For example, someone is working on collecting topics for the blog section and that's why he needs to open the blog sitemap to see what topics were covered previously. Now, after opening the sitemap, he found there are various unnecessary sitemaps that should be removed immediately. His primary job which is collecting blog topics doesnt require him to discuss this issue with his reporting boss. But if he has serious to his job and smart, he will go the extra mile and will share this problem with the top authority. Here, we need to rate employees based on their ability to identify problems and their willingness to share those with top authorities.",
            onChange: (value) =>
                setFormData({
                    ...formData,

                    understand_instruction: value,
                }),
        },
        // {
        //     label: "Communication",
        //     value: formData.communication,
        //     onChange: (value) =>
        //         setFormData({
        //             ...formData,
        //             communication: value,
        //         }),
        // },
        // {
        //     label: "Professionalism",
        //     value: formData.professionalism,
        //     onChange: (value) =>
        //         setFormData({
        //             ...formData,

        //             professionalism: value,
        //         }),
        // },
        // {
        //     label: "Ability to identify issues",
        //     value: formData.identiey_issues,
        //     onChange: (value) =>
        //         setFormData({
        //             ...formData,

        //             identiey_issues: value,
        //         }),
        // },
        // {
        //     label: "Dedication",
        //     value: formData.dedication,
        //     onChange: (value) =>
        //         setFormData({
        //             ...formData,

        //             dedication: value,
        //         }),
        // },
        // {
        //     label: "Obedience",
        //     value: formData.obedience,
        //     onChange: (value) =>
        //         setFormData({
        //             ...formData,

        //             obedience: value,
        //         }),
        // },
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
            </RatingSectionLeadDev>

            <CommentLeadDevSection>
                <div className={styles.lead_dev_opinion}>
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
                            <LeadDevComment>
                                <div
                                    dangerouslySetInnerHTML={{
                                        __html: data?.lead_dev_cmnt,
                                    }}
                                ></div>
                                <LeadDevName>
                                    By{" "}
                                    <a
                                        href={`/account/employees/${evaluationObject?.added_by_id}`}
                                        target="_blank"
                                    >
                                        {evaluationObject?.added_by_name}
                                    </a>{" "}
                                    on{" "}
                                    <span>{FormatDate(data?.updated_at)}</span>
                                </LeadDevName>
                            </LeadDevComment>
                        ))}

                    {(auth.roleId === 8 || auth.roleId === 1) && (
                        <LeadDevComment>
                            <div
                                dangerouslySetInnerHTML={{
                                    __html: data?.lead_dev_cmnt,
                                }}
                            ></div>

                            <LeadDevName>
                                By{" "}
                                <a
                                    href={`/account/employees/${evaluationObject?.added_by_id}`}
                                    target="_blank"
                                >
                                    {evaluationObject?.added_by_name}
                                </a>{" "}
                                on <span>{FormatDate(data?.updated_at)}</span>
                            </LeadDevName>
                        </LeadDevComment>
                    )}
                </div>
            </CommentLeadDevSection>
            <RatingButtonSection>
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
            </RatingButtonSection>
        </ReactModal>
    );
};

export default EvaluationRatingModal;
