import styled from "styled-components";

export const SalesRiskAnalysisContainer = styled.section`
    padding: 20px 34px;
`;

export const SalesPointsContainer = styled.div`
    display: flex;
    align-items: center;
    p {
        font-size: 16px;
        font-family: "Poppins", sans-serif;
        color: #000000;
        margin-right: 10px;
    }
    div {
        cursor: pointer;
    }
`;

export const ModalCloseButton = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    background-color: gray;
    padding: 2px 4px 2px 4px;
    color: white;
    width: 24px;
    height: 24px;
`;

export const ModalTitle = styled.h6`
    font-size: 32px;
    margin-bottom: 10px;
    color: #000000;
    font-family: "Poppins", sans-serif;
`;

export const ModalInputLabel = styled.label`
    font-size: ${(props) => props.fontSize || "18px"};
    font-family: "Poppins", sans-serif;
    color: ${(props) => props.color || "#000000"};
    margin-bottom: 0px;
    padding: 0px !important;
`;

export const ModalButton = styled.button`
    padding: 13px 20px;
    border-radius: 8px;
    font-family: Poppins;
    font-size: 18px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    background-color: ${(props) => props.color || "#1492E6"};
    color: ${(props) => props.textColor || "#ffffff"};
    outline: ${(props) => props.outline || "none"};
    border: ${(props) => props.border || "none"};
    cursor: pointer;
    width: ${(props) => props.width || "auto"};
`;
export const ModalInput = styled.input`
    padding: 13px 18px;
    border-radius: 8px;
    font-family: Poppins;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    background-color: #f8f8f8;
    color: ${(props) => (props.value ? "#000000" : "#8F8F8F")};
    outline: none;
    border: 1px solid #b1b1b1;
    border-radius: 9px;
    width: ${(props) => props.width || "auto"};
`;

export const ModalSelectContainer = styled.div`
    font-family: Poppins;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    color: #8f8f8f;
    outline: none;
    width: auto;

    #select-department-sal-risk {
        font-family: Poppins;
        font-size: 16px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        span {
            color: #000000;
        }
    }
    .cnx_dropdown__dd__toggle {
        padding: 11px 18px;
        border-radius: 8px;
        background-color: #f8f8f8;
        border: 1px solid #b1b1b1;
        border-radius: 9px;
    }
`;

export const ModalSelect = styled.select`
    padding: 13px 18px;
    border-radius: 8px;
    font-family: Poppins;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    background-color: #f8f8f8;
    color: #8f8f8f;
    outline: none;
    border: 1px solid #b1b1b1;
    border-radius: 9px;
    width: ${(props) => props.width || "auto"};
`;

// Sale Risk Analysis Question Styles
export const SalesRiskAnalysisQuestionWrapper = styled.section`
    padding: 34px;
`;

export const SalesRiskAnalysisQuestionContainer = styled.div`
    background: #fff;
    padding: 66px;
    padding-bottom: 0;
    border-radius: 16px;
    overflow-y: auto;
    box-shadow: 0 0 10px rgb(0 0 0 / 10%);
`;

export const CustomInputsTextArea = styled.textarea`
    border-radius: 9px;
    background: #f6f9ff;
    padding: 16px 20px;
    width: ${(props) => props.width || "60%"};
    resize: none;
    border: ${(props) => props.border || "none"};
    color: #b1b1b1;
    font-family: Poppins;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
`;

export const CustomInputsInput = styled.input`
    border-radius: 9px;
    background: #f6f9ff;
    padding: 16px 20px;
    width: ${(props) => props.width || "60%"};
    border: ${(props) => props.border || "none"};
    font-family: Poppins;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    &::placeholder {
        color: ${(props) => (props.value ? "#000000" : "#B1B1B1")};
    }
`;

export const CustomInputsLabel = styled.label`
    color: ${(props) => props.color || "#000000"};
    font-family: Poppins;
    font-size: 18px;
    font-style: normal;
    font-weight: 500;
    margin-bottom: 12px;
    line-height: normal;
`;
