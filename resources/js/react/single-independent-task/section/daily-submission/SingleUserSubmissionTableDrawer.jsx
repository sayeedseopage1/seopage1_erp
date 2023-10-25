import { useRef } from "react";
import { useClickAway, useWindowSize } from "react-use";
import Button from "../../components/Button";
import CustomModal from "../../components/CustomModal";
import Modal from "../../components/Modal";
import { get_data_dailySubmission } from "./fake-data/data_dailySubmission";
import DailySubmissionItem from "./DailySubmissionItem";
import DataTable from "../../../global/table/DataTable";
import { columnSchema } from "./drawer-table-support/Single_user_submission_table_column";

const SingleUserSubmissionTableDrawer = ({ isOpen, close, toggle, data, setModalData }) => {
    const ref = useRef(null);
    const { width: deviceWidth } = useWindowSize();
    // useClickAway(ref, close);

    const content = () => {
        return (
            <div ref={ref} className="sp1-subtask-form --modal-panel">
                <div className='sp1-subtask-form --modal-panel-header'>
                    <h6>Daily Submission</h6>
                    <Button
                        aria-label="close-modal"
                        className='_close-modal'
                        onClick={() => {
                            setModalData(null);
                        }}
                    >
                        <i className="fa-solid fa-xmark" />
                    </Button>
                </div>

                <div className="sp1-subtask-form --modal-panel-body">
                    <DataTable
                        tableData={data?[data]:[]}
                        tableColumns={columnSchema}
                        tableName="single-user-submission-table"
                    />
                </div>
            </div>
        )
    }



    if (deviceWidth > 1200) {
        return (
            <CustomModal isOpen={isOpen} toggleRef={toggle}>
                {content()}
            </CustomModal>
        );
    } else {
        return (
            <Modal isOpen={isOpen}>
                {content()}
            </Modal>
        );
    }
};

export default SingleUserSubmissionTableDrawer;