import { useState } from "react";
// import { Button } from "react-bootstrap";
import CKEditorComponent from "../../../ckeditor";
import FileUploader from "../../../file-upload/FileUploader";
import Modal from "../../components/Modal";
import Button from "../../components/Button";
import SubmitButton from "../../components/SubmitButton";
import TodaysUpdateModalTable from "../daily-submission/TodaysUpdateModalTable";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const DailySubmissionControl = () => {
    const [todaysUpdateModalisOpen, setTodaysUpdateModalisOpen] = useState(false);
    const [files, setFiles] = useState([]);
    const [comment, setComment] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    // console.log(location);

    const close = () => setTodaysUpdateModalisOpen(false);
    const open = () => setTodaysUpdateModalisOpen(true);

    const handleSubmit = () => {
        setIsSubmitting(true);


        setTimeout(() => {
            setIsSubmitting(false);
        }, 3000);
    }

    useEffect(()=>{
        const url = new URLSearchParams(location.search);
        // console.log(location);
        // console.log(url.get('modal'));
        if (url.get('modal')==='daily-submission') {
            open();
        }else{
            close();
        }
    },[location])


    return (
        <div>
            <Button
                variant="tertiary"
                // onClick={toggle}
                onClick={()=>navigate(`${location.pathname}?modal=daily-submission`)}
                className="d-flex align-items-center btn-outline-dark text-dark"
            >
                {/* {isFetching ? <Loader title="Processing..." /> : <i className="fa-solid fa-check" />} */}
                <span className="d-inline ml-1"> Submit Today's Update </span>
            </Button>

            <Modal isOpen={todaysUpdateModalisOpen} className="sp1_mark-as--modal ">
                <div className="sp1_single_task--modal-panerl-wrapper" >

                    <div className="sp1_mark-as--modal-panel" style={{ overflow:'visible', maxWidth:'70rem'}}>
                        {/* heading bar */}
                        <div className="sp1_mark-as--modal-heading">
                            <h6 className="mb-0">Submit Today's Update</h6>

                            <Button aria-label="closeModal" onClick={()=>navigate(`${location.pathname}`)}>
                                <i className="fa-solid fa-xmark" />
                            </Button>
                        </div>

                        {/* body */}
                        <div className="sp1_mark-as--modal-body px-3" style={{ overflow: 'visible'}}>
                            {todaysUpdateModalisOpen && <TodaysUpdateModalTable />}
                            <div className="mt-3 d-flex align-items-center">
                                <Button
                                    variant="tertiary"
                                    className="ml-auto mr-2"
                                    onClick={()=>navigate(`${location.pathname}`)}
                                >
                                    Close
                                </Button>
                                {/* <SubmitButton onClick={handleSubmit} isLoading={isSubmitting} title="Submit" /> */}
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default DailySubmissionControl;