import { RxCrossCircled } from "react-icons/rx";
import ReactModal from "react-modal";
import styles from "./SingleEvaluation.module.css";
import { EvalTableTitle } from "../Table/ui";

import React, { useState } from "react";

import Button from "../../../../../../react/global/Button";

import ReusableSectionTeamLeadAndAdmin from "./ReusableSectionTeamLeadAndAdmin";
import FormatDate from "../../../../../../react/UI/comments/utils/FormatDate";
const SingleEvaluationModal = ({
    toggleSingleEvaluationModal,
    isSingleEvaluationModalOpen,
    data,
    singleEvaluation,
}) => {
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
                <span>New Developer Evaluation </span>
                {/* <span>{singleEvaluation?.user_name}</span> */}
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
                            <td>{data?.submission_date}</td>
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
                            <td>{data?.revision_number}</td>

                            <td>{data?.avg_rating} </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div>
                <div className={styles.rating_container}>
                    {formFields.map((field, index) => (
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
                                {singleEvaluation?.added_by_name ??
                                    "Hasnain Islam Dolon"}
                            </a>{" "}
                            on <span>{FormatDate(data?.updated_at)}</span>
                        </div>
                    </section>
                </div>
                <div className="d-flex justify-content-center">
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
