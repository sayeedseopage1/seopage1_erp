import React, { useEffect } from "react";
import styled from "styled-components";
import validator from "validator";

const AnchorModal = ({ selectedText, callback }) => {
    const [url, setUrl] = React.useState("");
    const [text, setText] = React.useState("");

    useEffect(() => {
        setText(selectedText);
    }, [selectedText]);

    const handleSubmit = (e) => {
        e.preventDefault();
        callback(url, text);
    };

    return (
        <div className="pt-3">
            <h3>Insert Link</h3>
            <FormGroup className="mb-3">
                <Label>Text: </Label>
                <Input
                    type="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />
            </FormGroup>

            <FormGroup>
                <Label>Write URL: </Label>
                <Input
                    type="text"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                />
            </FormGroup>

            <ModalButton
                disabled={!validator.isURL(url)}
                onClick={handleSubmit}
            > 
                Insert
            </ModalButton>
        </div>
    );
};

export default AnchorModal;

const Modal = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 10;
    background-color: rgb(0 0 0 / 5%);
`;

const Panel = styled.div`
    width: 300px;
    padding: 16px;
    border-radius: 10px;
    background: #fff;
    margin: 2rem auto;
    box-shadow: 0 0 20px rgb(0 0 0 / 10%);
`;

const FormGroup = styled.div`
    width: 100%;
    box-sizing: border-box;
    text-align: left;
`;

const Label = styled.label`
    display: block;
    font-size: 14px;
    font-weight: 600;
    color: #777;
    margin-bottom: 6px;
`;

const Input = styled.input`
    padding: 10px;
    border-radius: 6px;
    border: 1px solid #ddd;
    width: 100%;
    box-sizing: border-box;
`;

const Flex = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
`;
const ModalButton = styled.button`
    padding: 0.5rem 1rem;
    border-radius: 6px;
    margin-right: 10px;
    cursor: pointer;
    margin-top: 1.5rem;
    background: #1d82f5;
    color: #fff;
    &:hover {
        background: #0964cc;
    }

    &:active {
        padding: 0.4rem 0.9rem;
    }

    &:disabled{
      opacity: 0.6;
      cursor: not-allowed;
    }
`;