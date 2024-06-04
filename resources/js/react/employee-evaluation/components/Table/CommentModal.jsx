import React, { useState } from "react";
import ReactModal from "react-modal";
import { RxCrossCircled } from "react-icons/rx";
import styled from "styled-components";
import { useAuth } from "../../../hooks/useAuth";

const CommentModal = ({ comment }) => {
    const auth = useAuth();
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    return (
        <>
            <div>
                <span
                    className="badge bg-info p-2 "
                    onClick={openModal}
                    style={{
                        cursor: "pointer",
                        marginLeft: "50px",
                        color: "white",
                    }}
                >
                    View comment
                </span>
                <ReactModal
                    style={{
                        overlay: {
                            zIndex: 99999998,
                            backgroundColor: "rgba(0, 0, 0, 0.5)",
                            margin: "auto auto",
                        },
                        content: {
                            zIndex: 99999999,
                            height: "fit-content",
                            maxHeight: "fit-content",
                            maxWidth: "600px",
                            margin: "auto auto",
                            padding: "20px",
                            borderRadius: "10px",
                            border: "none",
                            boxShadow: "0px 0px 10px 0px rgba(0, 0, 0, 0.2)",
                            blur: "5px",
                        },
                    }}
                    isOpen={modalIsOpen}
                    onRequestClose={closeModal}
                    contentLabel="Team Lead Comment Modal"
                >
                    <div
                        className="d-flex justify-content-end mb-2"
                        style={{ cursor: "pointer" }}
                    >
                        <span onClick={closeModal}>
                            <RxCrossCircled size={`30px`} />
                        </span>
                    </div>
                    <CommentContainer>
                        {comment ? (
                            <CommentText
                                dangerouslySetInnerHTML={{ __html: comment }}
                            />
                        ) : (
                            <NotProvidedText>
                                No comment provided
                            </NotProvidedText>
                        )}
                    </CommentContainer>
                </ReactModal>
            </div>
        </>
    );
};
// Styled components
const CommentContainer = styled.div`
    width: 100%;
    border: 1px solid #e0e0e0;
    padding: 15px;
    border-radius: 5px;
    background-color: #f9f9f9;
`;

const CommentText = styled.div`
    color: #333;
    font-size: 14px;
    line-height: 1.6;
`;

const NotProvidedText = styled.div`
    color: #999;
    font-style: italic;
`;
export default CommentModal;
