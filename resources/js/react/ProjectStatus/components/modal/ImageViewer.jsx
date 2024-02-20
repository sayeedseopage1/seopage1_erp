import ReactModal from "react-modal";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import { useState } from "react";
import Button from "../../../global/Button";
import style from  "../styles/imageViewer.module.css"


const ImageViewer = ({ imageData }) => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);

    const handleImageClick = (index) => {
        setSelectedImage(index);
        setModalIsOpen(true);
    };
    
    if (imageData) {
    }
    const handleNextImage = () => {
        setSelectedImage((prevIndex) =>
            prevIndex === imageData?.length - 1
                ? 0
                : (prevIndex + 1) % imageData?.length
        );
    };

    const handlePreviousImage = () => {
        setSelectedImage((prevIndex) =>
            prevIndex === 0
                ? imageData?.length - 1
                : (prevIndex - 1 + imageData?.length) % imageData?.length
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
                    {imageData?.map((file, index) => (
                        <div key={index} style={previewItemStyle}>
                            <img
                                style={previewImageStyle}
                                className={style.previewItemStyleOnHover}
                                src={`https://seopage1storage.s3.ap-southeast-1.amazonaws.com/${file.file_name}`}
                                alt={`Preview ${index}`}
                                onClick={() => handleImageClick(index)}
                            />
                        </div>
                    ))}
                </div>

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
                            disabled={selectedImage === 0 || imageData?.length === 0}
                            aria-label="Previous Image"
                        >
                            <AiOutlineArrowLeft />
                        </Button>

                        {selectedImage !== null && (
                            <div style={{ position: "relative" }}>
                                <img
                                    src={`https://seopage1storage.s3.ap-southeast-1.amazonaws.com/${imageData[selectedImage].file_name}`}
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
                                        borderRadius: "5px",
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
                                    {imageData[selectedImage]?.file_name}
                                </p>
                            </div>
                        )}

                        <Button
                            onClick={handleNextImage}
                            disabled={selectedImage === imageData?.length - 1 || imageData?.length === 0}
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
    paddingBottom: "10px",
};

const previewContainerStyle = {
    display: "flex",
    justifyContent: "start",
    flexWrap: "wrap",
    marginTop: "20px",
};

const previewItemStyle = {
    margin: "0 10px 10px 0",
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
export default ImageViewer;
