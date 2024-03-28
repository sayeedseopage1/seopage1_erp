import styled from "styled-components";

export const TopSectionCointainer = styled.div`
padding:20px 35px;
background-color: #fff;
border-radius: 14px;
margin-bottom: 40px;
display: flex;
align-items: center;
justify-content: space-between;
flex-wrap: wrap;
gap: 20px;
`
export const ButtonWrapper = styled.div`
display: inline-flex;
align-items: flex-start;
gap: 24px;
`
export const ButtonComponent = styled.button`
border-radius: 8px;
border: 1px solid #1492E6;
background-color: ${(props) => props.color || "transparent"};
padding: 20px 40px;
font-size: 14px;
font-weight: 500;
color: ${(props) => props.textColor ? "#fff" : "#1492E6"};
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
`

export const AddButton = styled.button`
display: flex;
width: 240px;
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