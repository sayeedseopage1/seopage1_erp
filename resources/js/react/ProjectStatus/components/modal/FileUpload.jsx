import ReactModal from "react-modal";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import { useState } from "react";
import Button from "../../../global/Button";
import { RiDeleteBin6Line } from "react-icons/ri";
import style from  "../styles/imageViewer.module.css"



import FileInputWithCustomIcon from "./CustomInput";
const FileUpload = ({ selectedFiles, setSelectedFiles }) => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [isZoomed, setIsZoomed] = useState(false);

    // add files to selectedFiles
    const handleFileChange = (e) => {
        const uploadedFiles = e.target.files;
        setSelectedFiles((prev) => [...prev, ...uploadedFiles]);
    };

    // open modal and set selected image
    const handleImageClick = (index) => {
        setSelectedImage(index);
        setModalIsOpen(true);
    };

    // navigate to next image
    const handleNextImage = () => {
        setSelectedImage((prevIndex) =>
            prevIndex === selectedFiles?.length - 1
                ? 0
                : (prevIndex + 1) % selectedFiles?.length
        );
    };

    // navigate to previous image
    const handlePreviousImage = () => {
        setSelectedImage((prevIndex) =>
            prevIndex === 0
                ? selectedFiles?.length - 1
                : (prevIndex - 1 + selectedFiles?.length) %
                  selectedFiles?.length
        );
    };
    // close modal
    const handleModalClose = () => {
        setSelectedImage(null);
        setModalIsOpen(false);
    };

    // delete image from selectedFiles
    const handleDeleteImage = (index) => {
        setSelectedFiles((prevFiles) =>
            prevFiles.filter((_, i) => i !== index)
        );
    };

    // toggle zoom
    const toggleZoom = () => {
        setIsZoomed(!isZoomed);
    };

    return (
        <>
            <div style={containerStyle}>
                <div className="my-2 row">
                    <strong className="col-4 d-flex">Screenshots:</strong>
                    <div className="col-8">
                        <FileInputWithCustomIcon
                            handleFileChange={handleFileChange}
                            
                        />       
                        <div style={previewContainerStyle}>
                            {selectedFiles.map((file, index) => (
                                <div key={index} style={previewItemStyle}>
                                    <img
                                        style={previewImageStyle}
                                        className={style.previewItemStyleOnHover}
                                        src={URL.createObjectURL(file)}
                                        alt={`Preview ${index}`}
                                        onClick={() => handleImageClick(index)}
                                    />

                                    <button
                                        style={{
                                            margin: "2px",
                                            backgroundColor: "transparent",
                                        }}
                                        backgroundColor="white"
                                        onClick={() => handleDeleteImage(index)}
                                    >
                                        <RiDeleteBin6Line color="red" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                      
                </div>
               
                {/* Modal for View Upldoad Image */}
                <ReactModal
                    isOpen={modalIsOpen}
                    onRequestClose={handleModalClose}
                    contentLabel="Image Viewer"
                    style={{
                        overlay: {
                            zIndex: 99999998,
                            backgroundColor: "rgba(0, 0, 0, 0.5)",
                        },
                        content: {
                            zIndex: 99999999,
                            maxWidth: "1000px",
                            maxHeight: "100vh",
                            margin: "auto auto",
                            backgroundColor: "transparent",
                            border: "none",
                            outline: "none",
                            overflow: "auto",
                        },
                    }}
                >
                    <div style={modalContainer}>
                        <Button
                            onClick={handlePreviousImage}
                            aria-label="Previous Image"
                        >
                            <AiOutlineArrowLeft />
                        </Button>

                        {selectedImage !== null && (
                            <div style={{ position: "relative" }}>
                                <img
                                    src={URL.createObjectURL(
                                        selectedFiles[selectedImage]
                                    )}
                                    alt={`Screenshot ${selectedImage}`}
                                    style={{
                                        width: isZoomed ? "auto" : "100%",
                                        height: isZoomed ? "auto" : "100%",
                                        objectFit: isZoomed
                                            ? "unset"
                                            : "contain",
                                        cursor: isZoomed
                                            ? "zoom-out"
                                            : "zoom-in",
                                        maxHeight: isZoomed ? "none" : "100%",
                                        maxWidth: isZoomed ? "none" : "100%",
                                        height: "700px",
                                        width: "800px",
                                    }}
                                    onClick={toggleZoom}
                                />
                                <p
                                    style={{
                                        marginBottom: "100px",
                                        position: "absolute",
                                        bottom: "0",
                                        left: "300px",
                                        color: "white",
                                    }}
                                >
                                    {selectedFiles[selectedImage]?.name}
                                </p>
                            </div>
                        )}

                        <Button
                            onClick={handleNextImage}
                            aria-label="Next Image"
                        >
                            <AiOutlineArrowRight />
                        </Button>
                    </div>
                </ReactModal>
            </div>
        </>
    );
};


// Styles
const containerStyle = {
    // textAlign: "center",
    padding: "10px 0px",
};

const previewContainerStyle = {
    display: "flex",
    justifyContent: "start",
    flexWrap: "wrap",
    marginTop: "10px",
};

const previewItemStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    margin: "0 5px 5px 0",
};

const previewImageStyle = {
    width: "80px",
    height: "80px",
    objectFit: "cover",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "transform 0.2s",
    border: "1px solid #e5e5e5",
};

const modalContainer = {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    gap: "10px",
};

export default FileUpload;
