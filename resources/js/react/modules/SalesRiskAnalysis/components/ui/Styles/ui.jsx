import styled from "styled-components"; 

export const SalesRiskAnalysisContainer = styled.section`
  padding: 20px 34px;
`;


export const SalesPointsContainer = styled.div`
  display: flex;
  align-items: center;
  p {
    font-size: 16px;
    font-family: 'Poppins', sans-serif;
    color: #000000;
    margin-right: 10px;
  }
  div{
    cursor: pointer;
  }
`

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
`

export const ModalTitle = styled.h6`
  font-size: 32px;
  margin-bottom: 10px;
  color: #000000;
  font-family: 'Poppins', sans-serif;
`

export const ModalInputLabel = styled.label`
  font-size: 18px;
  font-family: 'Poppins', sans-serif;
  color: ${props => props.color || "#000000"};
  margin-bottom: 0px;
  padding: 0px !important;
`

export const ModalButton = styled.button`
  padding: 13px 20px;
  border-radius: 8px;
  font-family: Poppins;
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  background-color: ${props => props.color || "#1492E6"};
  color: ${props => props.textColor || "#ffffff"};
  outline: ${props => props.outline || "none"};
  border: ${props => props.border || "none"};
  cursor: pointer;
  width: ${props => props.width || "auto"};
`
export const ModalInput = styled.input`
  padding: 13px 18px;
  border-radius: 8px;
  font-family: Poppins;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  background-color: #F8F8F8;
  color: #8F8F8F;
  outline: none;
  border: 1px solid #B1B1B1;
  border-radius: 9px;
  width: ${props => props.width || "auto"};
`