import { IoClose } from "react-icons/io5";

const CloseButton = ({closeModal}) => {
  return (
    <button
      onClick={closeModal}
      className='d-flex justify-content-center align-items-center rounded-circle'
      style={{
        backgroundColor: "gray",
        padding: "2px 4px 2px 4px",
        color: "white",
        width: "24px",
        height: "24px",
      }}
                >
        <IoClose />
    </button>
  )
}

export default CloseButton