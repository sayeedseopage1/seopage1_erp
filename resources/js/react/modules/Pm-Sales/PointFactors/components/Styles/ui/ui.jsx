import styled from "styled-components";

export const TopSectionCointainer = styled.div`
padding:20px 35px;
background-color: #fff;
border-radius: 14px;
margin-bottom: 40px;
display: flex;
align-items: center;
justify-content: space-between;
gap: 20px;

@media (max-width: 600px) {
    padding:16px;
}

@media (max-width: 992px) {
        flex-direction: column;
        align-items: flex-start;
    }
`
export const ButtonWrapper = styled.div`
display: inline-flex;
align-items: flex-start;
gap: 24px;
`
export const ButtonComponent = styled.button`
min-width: 145px;
border-radius: 8px;
border: ${(props) => props.border || "1px solid #1492E6"};
background-color: ${(props) => props.color || "transparent"};
padding: 15px 20px;
font-size: ${(props) => props.font || "14px"};
font-weight: 500;
color: ${(props) => props.textColor ? "#fff" : "#1492E6"};

/* &:hover {
    background-color: #1492E6;
    color: #fff;
} */

@media  (max-width: 1400px) {
    min-width: 100px;
  }

@media (min-width: 769px) and (max-width: 1199px) {
font-size: 12px;
padding: 10px 15px;
  }


@media (max-width: 768px) {
font-size: 12px;
padding: 8px 12px;
white-space: nowrap;
overflow: hidden;
text-overflow: ellipsis;
max-width: 100px;
  }

@media (max-width: 576px) {
    min-width: 120px;
  }

@media (max-width:414px) {
    min-width: 100px;
  }

  &:disabled {
        cursor: not-allowed;
    }
`

export const AddNewSectionCointainer = styled.div`
padding:13px 33px;
border: 1px solid #E9E9E9;
background: #E9F4FC;
display: flex;
align-items: center;
justify-content: space-between;
flex-wrap: wrap;
gap: 20px;
margin-top: 12px;

p{
color: #000;
font-family: Poppins;
font-size: 16px;
font-style: normal;
font-weight: 500;
line-height: normal;
}

@media (max-width: 600px) {
    padding:10px 16px;
}
`

export const AddButton = styled.button`
display: flex;
width: 240px;
height: 56px;
padding: 13px 20px;
justify-content: center;
align-items: center;
gap: 10px;
border-radius: 8px;
background: #1492E6;
color: #FFF;
font-family: Poppins;
font-size: 20px;
font-weight: 500;

@media (max-width: 600px) {
width:150px;
height: 48px;
font-size: 14px;
font-weight: 400;
  }
`

// modal 
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

    &:disabled {
        cursor: not-allowed;
    }
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

    &:disabled {
        cursor: not-allowed;
    }
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

// Define the styled component
export const CheckboxContainer = styled.div`
    display: inline-flex;
    align-items: center;
    gap: 9px;
`;

// Define the styled input component
export const StyledInput = styled.input`
    width:20px;
    height:20px;
    /* outline: 1px solid #1492E6; */
    border-radius: 4px;
    /* appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    width: 20px;
    height: 20px;
    border: 2px solid #1492E6;
    border-radius: 4px; */

    &:disabled {
        cursor: not-allowed;
    }
`;

export const StyledLabel = styled.label`
    color: #8F8F8F;
    font-family: Poppins;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    margin-bottom: 0px;
`;

export const SalesPointsContainer = styled.div`
    display: flex;
    align-items: center;
    p {
        font-size: 16px;
        font-family: "Poppins", sans-serif;
        color: #000000;
        margin-right: 10px;
        font-weight: 500;
    }
    /* div {
        cursor: pointer;
    } */
`;