import { useEffect, useState } from 'react';
import Button from '../../ui/Button';
import { useLocation, useSearchParams } from 'react-router-dom';
import Modal from '../../ui/Modal';

const ResolveActionBtn = ({ data }) => {
  const [resolveActionModalIsOpen, setResolveActionModalIsOpen] = useState(false);
  const [searchParam, setSearchParam] = useSearchParams();
  const [modalData, setModalData] = useState(null);
  const location = useLocation();

  useEffect(() => {
    if (searchParam.has('modal')) {
      setResolveActionModalIsOpen(true);
    } else {
      setResolveActionModalIsOpen(false);
    }
  }, [location])

  const close = () => {
    setModalData(null);
    setSearchParam({});
  };
  const open = () => {
    setModalData(data);
    setSearchParam(prev => ({ ...prev, modal: 'task-report-resolve' }));
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

      {data.report_no === modalData?.report_no &&
        <Modal isOpen={resolveActionModalIsOpen} className="sp1_mark-as--modal " closeModal={close}>
          <div className="sp1_single_task--modal-panerl-wrapper">
            <div
              className="sp1_mark-as--modal-panel"
              style={{ overflow: "visible", maxWidth: "70rem" }}
            >
              {/* heading bar */}
              <div className="sp1_mark-as--modal-heading">
                <h6 className="mb-0">Resolve or Deny Report : {modalData?.report_no}</h6>

                <Button aria-label="closeModal" onClick={close}>
                  <i className="fa-solid fa-xmark" />
                </Button>
              </div>

              {/* body */}
              <div
                className="sp1_mark-as--modal-body px-3"
                style={{ overflow: "visible" }}
              >
                <div className="alert alert-warning text-center">
                  If you don't submit the daily submission, you
                  won't be able to start any task on next day.
                </div>

                {modalData && < div />}
                <div className="mt-3 d-flex align-items-center">
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