import styled from "styled-components";

export const ModalContainer = styled.div`
    width: 100%;
`;
export const ModalHeader = styled.div`
    color: white;
    background: #1d82f5;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem 1rem 1rem 1rem;
    border-radius: 29px 10px 0px 0px;
`;

export const HeaderLabel = styled.div`
    font-size: 18px;
    font-weight: bold;
    margin-top: 10px;
`;
export const CloseButton = styled.button`
    background: none;
    border: none;
    cursor: pointer;
`;

export const ModalBody = styled.div`
    background: white;
    margin: 18px 44px 18px 44px;
    height: 100%;

    border-radius: 24px;
    border: 1px solid #e0e9ef;
    padding: 31px 34px;
    background: #f2f9fe;
`;

export const FrontendPassword = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    flex-direction: column;
    color: #7b7b7b;
    font-size: 18px;
    font-weight: 400;
    width: 100%;
`;

export const ItemTitle = styled.div`
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 10px;
`;
const InputContainer = styled.div`
    display: flex;
    flex-direction: column; /* Add this line */
    margin-bottom: 20px;
`;

export const NumberOfPages = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    gap: 10px;
`;

export const InputItem = ({
    value,
    onChange,
    placeHolder = "",
    label = "",
    width = "531px",
    height = "53px",
    inputType = "text",
}) => (
    <InputContainer>
        <label>{label}</label>
        <input
            type={inputType}
            value={value}
            onChange={onChange}
            placeholder={placeHolder}
            style={{
                borderRadius: "6px",
                background: "#d8edfc",
                width, // set the width dynamically
                height,
                border: "none",
                padding: "10px",
            }}
        />
    </InputContainer>
);
