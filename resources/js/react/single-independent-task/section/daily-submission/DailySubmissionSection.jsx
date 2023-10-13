import { useEffect, useState } from "react";
import DailysubmissionDrawerTable from "./DailysubmissionDrawerTable";
import DailySubmissionItem from "./DailySubmissionItem";
import SingleUserSubmissionTableDrawer from "./SingleUserSubmissionTableDrawer";
import { useGetDailyTasksSubmissionQuery } from "../../../services/api/dailySubmissionApiSlice";


const DailySubmissionSection = ({ task }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalTableIsOpen, setModalTableIsOpen] = useState(false);
  const [modalRefButton, setModalRefButton] = useState(null);
  const [singleUserSubmissionTableDrawerRef, setSingleUserSubmissionTableDrawerRef] = useState(null);
  const [modalData, setModalData] = useState(null);


  const { data, isLoading } = useGetDailyTasksSubmissionQuery(task?.id);
    // control modal
  const toggle = () => setIsOpen(prev => !prev);
  const close = () => setIsOpen(false);

  // const modalTableToggle = () => setModalTableIsOpen(prev=> !prev);
  const modalTableOpen = () => setModalTableIsOpen(true);
  const modalTableClose = () => setModalTableIsOpen(false);

  useEffect(() => {
    if (modalData) {
      modalTableOpen();
    } else {
      modalTableClose();
    }
  }, [modalData])

  const handleModalRef = (ref) => {
    setModalRefButton(ref);
    setSingleUserSubmissionTableDrawerRef(ref);
  }

  return (
    <div
      className='sp1_task_right_card mb-3'
      ref={handleModalRef}
      style={{ zIndex: isOpen ? '99' : '' }}>

      <div className='d-flex border-bottom pb-2 align-items-center justify-content-between mb-2 font-weight-bold'>
        <span className="f-16">Daily Submission</span>
        {isLoading &&
          <div
            className="spinner-border text-dark ml-2 mr-auto"
            role="status"
            style={{
              width: '16px',
              height: '16px',
              border: '0.14em solid rgba(0, 0, 0, .25)',
              borderRightColor: 'transparent'
            }}
          />
        }
      </div>


      {/* side drop toggle button */}
      {/* {_.size(timeLogs) > 0 && } */}
      <button
        aria-label='openCommentModalButton'
        className='sp1_task_right_dl_toggle'
        onClick={toggle}
        style={{ zIndex: isOpen ? 110 : '' }}
      >
        <i
          className={`fa-solid fa-circle-chevron-${isOpen ? 'right' : 'left'}`}
          style={{ color: "#276fec" }}
        />
      </button>
      {/* side drop toggle button end */}


      <DailysubmissionDrawerTable
        isOpen={isOpen}
        close={close}
        toggle={modalRefButton}
        data={data?.daily_submissions}
        modalData={modalData}
        setModalData={setModalData} />

      <SingleUserSubmissionTableDrawer
        isOpen={modalTableIsOpen}
        close={modalTableClose}
        toggle={singleUserSubmissionTableDrawerRef}
        data={modalData}
        setModalData={setModalData} />


      <div className="sp1_task_right_card--body">
        {data?.daily_submissions.length > 0 ?
          <table className="sp1_tlr_table">
            <tbody className="sp1_tlr_tbody">
              {!isLoading &&
                data?.daily_submissions?.map((singleData) => (
                  <DailySubmissionItem key={singleData.id} item={singleData} setModalData={setModalData} modalData={modalData} />
                ))
              }
            </tbody>
          </table>
          :
          <div
            className="d-flex align-items-center justify-content-center"
            style={{
              color: "#B4BCC4",
              fontSize: "15px",
              textAlign: "center",
              height: "100%",
              width: "100%",
            }}
          >
            No Submission is Available
          </div>
        }
      </div>

    </div>
  );
};

export default DailySubmissionSection;