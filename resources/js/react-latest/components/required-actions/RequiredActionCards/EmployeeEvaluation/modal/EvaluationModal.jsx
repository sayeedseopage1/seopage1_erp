//mitul work start

import { RxCrossCircled } from "react-icons/rx";
import ReactModal from "react-modal";

import { EvaluationTableColumns } from "../Table/EvaluationTableColumns";
import { useState } from "react";
import { EvalTableTitle, FooterButtons } from "../Table/ui";
import DataTable from "../Table/EvaluationTable";
import Button from "../../../../../ui/Button";

const EvaluationModal = ({ isEvaluationModal, setIsEvaluationModal }) => {
    const developerEvaluation = {
        developerId: 1,
        developerName: "Tanvir Mitul",
        tasks: [
            {
                individualTaskName: "Design homepage layout",
                id: 1,
                assignDate: "2024-03-01",
                submissionDate: "2024-03-10",
                totalHoursTracked: 15,
                linkToTheCompletedWork: "https://example.com/homepage",
                numberOfRevisionsNeeded: 2,
                action: "Review",
            },
            {
                individualTaskName: "Write product descriptions",
                id: 2,
                assignDate: "2024-03-02",
                submissionDate: "2024-03-08",
                totalHoursTracked: 12,
                linkToTheCompletedWork:
                    "https://example.com/product-descriptions",
                numberOfRevisionsNeeded: 1,
                action: "Approve",
            },
            {
                individualTaskName: "Code login functionality",
                id: 3,
                assignDate: "2024-03-03",
                submissionDate: "2024-03-12",
                totalHoursTracked: 20,
                linkToTheCompletedWork:
                    "https://example.com/login-functionality",
                numberOfRevisionsNeeded: 0,
                action: "Approve",
            },
            {
                individualTaskName: "Create marketing banners",
                id: 4,
                assignDate: "2024-03-04",
                submissionDate: "2024-03-09",
                totalHoursTracked: 18,
                linkToTheCompletedWork: "https://example.com/marketing-banners",
                numberOfRevisionsNeeded: 3,
                action: "Review",
            },
            {
                individualTaskName: "Test website on mobile devices",
                id: 5,
                assignDate: "2024-03-05",
                submissionDate: "2024-03-11",
                totalHoursTracked: 10,
                linkToTheCompletedWork: "https://example.com/mobile-testing",
                numberOfRevisionsNeeded: 1,
                action: "Approve",
            },
            {
                individualTaskName: "Optimize website performance",
                id: 6,
                assignDate: "2024-03-06",
                submissionDate: "2024-03-13",
                totalHoursTracked: 25,
                linkToTheCompletedWork:
                    "https://example.com/performance-optimization",
                numberOfRevisionsNeeded: 2,
                action: "Review",
            },
            {
                individualTaskName: "Update contact information",
                id: 7,
                assignDate: "2024-03-07",
                submissionDate: "2024-03-14",
                totalHoursTracked: 8,
                linkToTheCompletedWork:
                    "https://example.com/contact-info-update",
                numberOfRevisionsNeeded: 0,
                action: "Approve",
            },
            // {
            //     individualTaskName: "Fix broken links",
            //     id: 8,
            //     assignDate: "2024-03-08",
            //     submissionDate: "2024-03-15",
            //     totalHoursTracked: 10,
            //     linkToTheCompletedWork: "https://example.com/broken-links-fix",
            //     numberOfRevisionsNeeded: 1,
            //     action: "Review",
            // },
            // {
            //     individualTaskName: "Implement user feedback",
            //     id: 9,
            //     assignDate: "2024-03-09",
            //     submissionDate: "2024-03-16",
            //     totalHoursTracked: 14,
            //     linkToTheCompletedWork:
            //         "https://example.com/user-feedback-implementation",
            //     numberOfRevisionsNeeded: 2,
            //     action: "Review",
            // },
            // {
            //     individualTaskName: "Generate weekly report",
            //     id: 10,
            //     assignDate: "2024-03-10",
            //     submissionDate: "2024-03-17",
            //     totalHoursTracked: 6,
            //     linkToTheCompletedWork: "https://example.com/weekly-report",
            //     numberOfRevisionsNeeded: 0,
            //     action: "Approve",
            // },
        ],
    };
    const [sorting, setSorting] = useState([]);

    const [{ pageIndex, pageSize }, setPagination] = useState({
        pageIndex: 0,
        pageSize: 10,
    });

    const onPageChange = (paginate) => {
        setPagination(paginate);
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
                    height: "auto",
                    maxHeight: "800px",
                    maxWidth: "80vw",
                    margin: "auto auto",
                    border: "none",
                    overflow: "hidden",
                    padding: "20px",
                },
            }}
            isOpen={isEvaluationModal}
            onRequestClose={() => setIsEvaluationModal(false)}
        >
            <EvalTableTitle>
                <span>New Developer Evaluation :</span>
                <span>{developerEvaluation?.developerName}</span>
            </EvalTableTitle>
            <DataTable
                data={developerEvaluation?.tasks}
                columns={[...EvaluationTableColumns]}
                isLoading={false}
                onPageChange={onPageChange}
                sorting={sorting}
                tableName="Evaluation Table"
                setSorting={setSorting}
            />

            <FooterButtons>
                <Button
                    onClick={() => setIsEvaluationModal(false)}
                    variant="secondary"
                    size="md"
                >
                    Close
                </Button>
                <Button size="md" className="ml-2" disabled="true">
                    Confirm Submission
                </Button>
            </FooterButtons>
        </ReactModal>
    );
};

export default EvaluationModal;

//mitul work end
