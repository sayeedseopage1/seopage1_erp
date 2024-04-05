import { color } from "framer-motion";
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
    padding: 30px;
    padding-bottom: 0;
    border-radius: 16px;
    overflow-y: auto;
    box-shadow: 0 0 10px rgb(0 0 0 / 10%);
`;

export const SalesRiskAnalysisQuestionTitleContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 16px;
    border-bottom: 1px solid #b1b1b1;

    h5 {
        font-size: 24px;
        font-family: "Poppins", sans-serif;
        color: #000000;
        margin-bottom: 12px;
    }

    @media (max-width: 768px) {
        h5 {
            font-size: 20px;
        }
    }
`;

export const CustomInputsTextArea = styled.textarea`
    border-radius: 9px;
    background: #f6f9ff;
    padding: 16px 20px;
    width: ${(props) => props.width || "60%"};
    resize: none;
    border: ${(props) => props.border || "none"};
    font-family: Poppins;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    &::placeholder {
        color: ${(props) => (props.value ? "#000000" : "#B1B1B1")};
    }

    @media (max-width: 768px) {
        width: 100%;
        font-size: 14px;
    }
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

    @media (max-width: 768px) {
        width: 100%;
        font-size: 14px;
    }
`;

export const CustomInputsLabel = styled.label`
    color: ${(props) => props.color || "#000000"};
    font-family: Poppins;
    font-size: 18px;
    font-style: normal;
    font-weight: 500;
    display: flex;
    margin-bottom: 12px;
    line-height: normal;
    @media (max-width: 768px) {
        font-size: 16px;
    }
`;

export const CustomInputCheckbox = styled.input`
    margin-top: 7px;
    margin-right: 10px;
    transform: scale(1.2);
    border-radius: 4px; /* Optional: Add some border-radius for a rounded look */
    &:not(:checked) {
        border-color: #1492e6; /* Change border color when not checked */
    }
    &:checked {
        border-color: green; /* Change border color when checked */
    }
`;

// Sale Risk Analysis Authorize Styles

export const SaleRiskAuthorizeHeaderWrapper = styled.div`
    background: #fff;
    padding: 25px 30px;
    border-radius: 16px;
    overflow-y: auto;
    box-shadow: 0 0 10px rgb(0 0 0 / 10%);

    div {
        display: flex;
        justify-content: center;
        align-items: center;
        color: #000;
        font-family: Poppins;
        font-size: 14px;
        font-style: normal;
        font-weight: 500;
        line-height: normal;
        text-align: center;
        border-right: 1px solid #b1b1b1;
        span {
            color: #1492e6;
        }

        @media screen and (max-width: 768px) {
            border-right: none;
            border-bottom: 1px solid #b1b1b1;
            padding: 10px 0;
        }
    }
    div:first-child {
        justify-content: flex-start;
        text-align: left;
        @media screen and (max-width: 768px) {
            justify-content: center;
            align-items: center;
            text-align: center;
        }
    }
    div:last-child {
        border-right: none;
        @media screen and (max-width: 768px) {
            border-right: none;
            border-bottom: none;
            padding: 10px 0;
        }
    }
    .lastLoader {
        border-right: none !important;
        @media screen and (max-width: 768px) {
            border-right: none !important;
            border-bottom: none !important;
            padding: 10px 0;
        }
    
    }
`;

export const SaleRiskAuthorizeHeaderButton = styled.button`
    display: flex;
    width: 100%;
    padding: 25px 40px;
    justify-content: center;
    align-items: center;
    gap: 10px;
    border-radius: 8px;
    background: #1492e6;
    color: #fff;
    font-family: Poppins;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;

    @media (min-width: 1201px) and (max-width: 1440px) {
        padding: 25px 20px;
    }
    @media (min-width: 991px) and (max-width: 1200px){
        padding: 16px 20px;
    }
`;

export const SaleRiskAuthorizeTotalPointContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    width: 100%;
    background: ${(props) => props.background || "#fff"};
    p {
        color: #000;
        font-family: Poppins;
        font-size: 20px;
        font-style: normal;
        font-weight: 600;
        line-height: normal;
        @media screen and (max-width: 768px) {
            font-size: 16px;
        }
    }
    span {
        color: ${(props) => props.textColor || "#000"};
        font-family: Poppins;
        font-size: 20px;
        font-style: normal;
        font-weight: 700;
        line-height: normal;
        @media screen and (max-width: 768px) {
            font-size: 16px;
        }
    }
`;

export const SaleRiskAuthorizeButton = styled.button`
    background-color: ${(props) => props.color || "transparent"};
    color: ${(props) => props.textColor || "#ffffff"};
    border-radius: 8px;
    width: 254px;
    padding: 13px 20px;
    border: ${(props) => props.border || "none"};
    font-family: Poppins;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
`;
