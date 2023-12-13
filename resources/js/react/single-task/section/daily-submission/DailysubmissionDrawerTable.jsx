import { useRef } from "react";
import { useWindowSize } from "react-use";
import Button from "../../components/Button";
import CustomModal from "../../components/CustomModal";
import Modal from "../../components/Modal";
import DailySubmissionItem from "./DailySubmissionItem";

const DailysubmissionDrawerTable = ({ isOpen, close, toggle, data, modalData, setModalData }) => {
    const ref = useRef(null);
    const { width: deviceWidth } = useWindowSize();
    // useClickAway(ref, close);

    // console.log(get_data_dailySubmission());

    const content = () => {
        return (
            <div ref={ref} className="sp1-subtask-form --modal-panel">
                <div className='sp1-subtask-form --modal-panel-header'>
                    <h6>Daily Submission</h6>
                    <Button
                        aria-label="close-modal"
                        className='_close-modal'
                        onClick={close}
                    >
                        <i className="fa-solid fa-xmark" />
                    </Button>
                </div>

                <div className="sp1-subtask-form --modal-panel-body">
                    <table className="mt-3 sp1_tlr_table sp1_tlr_tbody">
                        {/* {deviceWidth > 800 ? <Table data={data} />: <CardView data={data} />} */}
                        {
                            data?.map((singleData) => (
                                <DailySubmissionItem
                                    key={singleData.id}
                                    item={singleData}
                                    setModalData={setModalData}
                                    modalData={modalData}
                                />
                            ))
                        }
                    </table>
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

export default DailysubmissionDrawerTable;
