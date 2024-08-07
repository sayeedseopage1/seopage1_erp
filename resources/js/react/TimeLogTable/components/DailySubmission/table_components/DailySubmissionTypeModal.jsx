import React from "react";
import ReactModal from "react-modal";
import DataTable from "../../../../portfolios/components/Table/DataTable";

import { IoMdCloseCircle } from "react-icons/io";

const DailySubmissionTypeModal = ({
    data,
    sectionName,
    isOpen,
    closeModal,
}) => {
    const submissionData = [
        {
            section_id: 1,
            section_name: "Daily Submission",
            screenshotUrl: "https://example.com/daily_submission.png",
            comment: "Daily submission of time logs",
        },
        {
            section_id: 2,
            section_name: "Daily Submission",
            screenshotUrl: "https://example.com/daily_submission.png",
            comment: "Daily submission of time logs",
        },
        {
            section_id: 3,
            section_name: "Daily Submission",
            screenshotUrl: "https://example.com/daily_submission.png",
            comment: "Daily submission of time logs",
        },
    ];
    const getSubmissionTypeColumns = (dataType) => {
        if (dataType === "sectionBuilding") {
            return SubmissionTypeColumns;
        }
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
                    borderRadius: "15px",
                    maxWidth: "1000px",
                    height: "fit-content",
                    maxHeight: "100%",
                    margin: "auto auto",
                    padding: "0px",
                    overflowY: "auto",
                },
            }}
            ariaHideApp={false}
            closeTimeoutMS={500}
            isOpen={isOpen}
            onRequestClose={closeModal}
        >
            <div style={{ padding: "20px", paddingBottom: "50px" }}>
                <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                >
                    <h2>{sectionName}</h2>

                    <div onClick={closeModal} style={{ cursor: "pointer" }}>
                        <IoMdCloseCircle size={50} color="red" />
                    </div>
                </div>

                <div style={{ marginTop: "20px" }}>
                    <DataTable
                        tableData={submissionData}
                        tableColumns={getSubmissionTypeColumns(
                            "sectionBuilding"
                        )}
                        isLoading={false}
                        tableName="Submission Type Table"
                    />
                </div>
            </div>
        </ReactModal>
    );
};

export default DailySubmissionTypeModal;

const SubmissionTypeColumns = [
    {
        id: "section_id",
        header: "Sections",
        accessorKey: "section_id",

        cell: ({ cell }) => {
            return (
                <div className="sp1_tlr_td sp1_tlr_td_border">
                    Section {cell.getValue()}
                </div>
            );
        },
    },
    {
        id: "section_name",
        header: "Section Name",
        accessorKey: "section_name",

        cell: ({ cell }) => {
            return (
                <div className="sp1_tlr_td sp1_tlr_td_border">
                    {cell.getValue()}
                </div>
            );
        },
    },
    {
        id: "screenshotUrl",
        header: "Screenshot URL",
        accessorKey: "screenshotUrl",
        cell: ({ cell }) => {
            return (
                <a
                    href={cell.getValue()}
                    title={cell.getValue()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="sp1_tlr_td sp1_tlr_td_border"
                >
                    {cell.getValue().slice(0, 30) + "..."}
                </a>
            );
        },
    },
    {
        id: "comment",
        header: "Comment",
        accessorKey: "comment",
        cell: ({ cell }) => {
            return (
                <div className="sp1_tlr_td sp1_tlr_td_border">
                    {cell.getValue()}
                </div>
            );
        },
    },
];
