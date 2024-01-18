import ReactModal from "react-modal";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import { useState } from "react";
import Button from "../../../global/Button";

const FileUpload = ({ selectedFiles, setSelectedFiles }) => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        setSelectedFiles(files);
    };

    console.log(selectedFiles);
    const handleImageClick = (index) => {
        setSelectedImage(index);
        setModalIsOpen(true);
    };

    const handleNextImage = () => {
        setSelectedImage((prevIndex) =>
            prevIndex === selectedFiles?.length - 1
                ? 0
                : (prevIndex + 1) % selectedFiles?.length
        );
    };

    const handlePreviousImage = () => {
        setSelectedImage((prevIndex) =>
            prevIndex === 0
                ? selectedFiles?.length - 1
                : (prevIndex - 1 + selectedFiles?.length) %
                  selectedFiles?.length
        );
    };

    const handleModalClose = () => {
        setSelectedImage(null);
        setModalIsOpen(false);
    };

    const [isZoomed, setIsZoomed] = useState(false);

    const toggleZoom = () => {
        setIsZoomed(!isZoomed);
    };

    return (
        <>
            <div style={containerStyle}>
                <div style={previewContainerStyle}>
                    {selectedFiles.map((file, index) => (
                        <div key={index} style={previewItemStyle}>
                            <img
                                style={previewImageStyle}
                                src={URL.createObjectURL(file)}
                                alt={`Preview ${index}`}
                                onClick={() => handleImageClick(index)}
                            />
                            <p style={previewText}>
                                {file.name.length >= 6
                                    ? file.name.slice(0, 6)
                                    : file.name}
                                ...
                            </p>
                        </div>
                    ))}
                </div>

                <input
                    type="file"
                    multiple
                    onChange={handleFileChange}
                    accept="image/*"
                    style={fileInputStyle}
                />

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

const containerStyle = {
    textAlign: "center",
    padding: "10px",
};

const previewContainerStyle = {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    marginTop: "20px",
};

const previewItemStyle = {
    margin: "0 5px 5px 0",
};

const previewImageStyle = {
    width: "50px",
    height: "50px",
    objectFit: "cover",
    borderRadius: "5px",
    cursor: "pointer",
};

const previewText = {
    marginTop: "5px",
    fontSize: "14px",
};

const fileInputStyle = {
    border: "1px solid #ccc",
    borderRadius: "5px",
    width: "180px",
    fontSize: "12px",
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
