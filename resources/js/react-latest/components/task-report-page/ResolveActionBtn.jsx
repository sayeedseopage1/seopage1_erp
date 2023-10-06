import { useEffect, useState } from 'react';
import Button from '../../ui/Button';
import Modal from '../../ui/Modal';
import CKEditorComponent from '../../ui/ckeditor';

const ResolveActionBtn = ({ data }) => {
  const [modalData, setModalData] = useState(null);
  const [text, setText] = useState('');


  // resolve handler function
  const handleResolve = () =>{

    close();
    setText('');
  }


  // deny handler function
  const handleDeny = () =>{

    close();
    setText('');
  }

  const close = () => {
    setModalData(null);
  };
  const open = () => {
    setModalData(data);
  };

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

                <CKEditorComponent
                  onChange={(e, editor) => setText(editor.getData())}
                  placeholder='Write your comment here!' />

                <div className="mt-3 d-flex justify-content-between align-items-center">
                  <section style={{ display: 'inline-flex', alignItems: 'center', gap: '1rem' }}>
                    <Button variant="success" disabled={!text} isLoading={false} onClick={handleResolve}>Resolve Report</Button>
                    <Button variant="danger" onClick={handleDeny} >Deny Report</Button>
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