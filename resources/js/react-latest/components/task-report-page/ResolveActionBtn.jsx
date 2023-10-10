import { useEffect, useState } from 'react';
import Button from '../../ui/Button';
import Modal from '../../ui/Modal';
import CKEditorComponent from '../../ui/ckeditor';
import { useSubmitTaskReportMutation } from '../../services/api/taskReportApiSlice';
import { toast } from 'react-toastify';
import { useContext } from 'react';
import { RefetchContext } from '../../pages/task-report';

const ResolveActionBtn = ({ data }) => {
  const [modalData, setModalData] = useState(null);
  const [text, setText] = useState('');
  const [submitReport, { isLoading }] = useSubmitTaskReportMutation();
  const [showError, setShowError] = useState(true);
  const {setRefetch} = useContext(RefetchContext);

  useEffect(() => {
    if (text) {
      setShowError(false);
    } else {
      setShowError(true);
    }
  }, [text]);

  // submit handler function
  const handleSubmit = (status) => {
    let data = {
      status: status,
      report_id: modalData?.id,
      admin_comment: text,
      resolved_by: window.Laravel.user.id,
    };

    submitReport(data)
      .unwrap()
      .then((res) => {
        if (res.status === 200) {
          toast.success(`Report ${status} successfully`);
          close();
          setText('');
          setRefetch(prev=>!prev);
        }
      });
    // toast.success(`Report ${status} successfully`,{theme:"dark"});
    // console.log(data);
  }

  const close = () => setModalData(null);
  const open = () => setModalData(data);

  return (
    <div>
      <Button
        variant="tertiary"
        // onClick={toggle}
        onClick={open}
        className="d-flex align-items-center btn-outline-dark text-dark"
      >
        <span className="d-inline ml-1"> Resolve </span>
      </Button>

      {data.id === modalData?.id &&
        <Modal isOpen={true} className="sp1_mark-as--modal " closeModal={close}>
          <div className="sp1_single_task--modal-panerl-wrapper">
            <div
              className="sp1_mark-as--modal-panel"
              style={{ overflow: "visible", maxWidth: "70rem" }}
            >
              {/* heading bar */}
              <div className="sp1_mark-as--modal-heading">
                <h6 className="mb-0">Resolve or Deny Report : {modalData?.id}</h6>

                <Button aria-label="closeModal" onClick={close}>
                  <i className="fa-solid fa-xmark" />
                </Button>
              </div>

              {/* body */}
              <div
                className="sp1_mark-as--modal-body px-3"
                style={{ overflow: "visible" }}
              >
                {/* <div className="alert alert-warning text-center">
                  If you don't submit the daily submission, you
                  won't be able to start any task on next day.
                </div> */}

                <div style={{border:'solid 1px gray', borderRadius:'2px'}}>
                <CKEditorComponent
                  onChange={(e, editor) => setText(editor.getData())}
                  placeholder='Write your comment here!' />
                </div>
                {
                  showError &&
                  <div className="alert alert-danger mt-3" role="alert">
                    Please write a comment
                  </div>

                }
                <div className="mt-3 d-flex justify-content-between align-items-center">
                  <section style={{ display: 'inline-flex', alignItems: 'center', gap: '1rem' }}>
                    <Button variant="success" disabled={!text} isLoading={isLoading} onClick={() => handleSubmit("approved")}>Resolve Report</Button>
                    <Button variant="danger" disabled={!text} isLoading={isLoading} onClick={() => handleSubmit("denied")}>Deny Report</Button>
                  </section>

                  <Button
                    variant="tertiary"
                    className="ml-auto mr-2"
                    onClick={close}
                  >
                    Close
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Modal>
      }
    </div>
  );
};

export default ResolveActionBtn;