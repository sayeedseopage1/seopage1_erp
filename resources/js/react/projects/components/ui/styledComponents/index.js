import styled from "styled-components";


// container for the project Dashboard
export const SectionWrapper = styled.div`
  width: 100%;
  padding: 24px;
  background-color: ${props => props.theme.colors.sectionBg};
  border-radius: 9px;

  @media (max-width: 768px) {
    padding: 16px;
  }
`

export const SectionContainer = styled.div`
  width: 100%;
  padding: 24px;
  max-height: ${props => props.maxHeight || "auto"};
  background-color: ${props => props.color || props.theme.colors.sectionBg};
  border-radius: 9px;
  border: ${props => props.border || `1px solid ${props.theme.colors.borderBg}`};
  position: relative;
  scrollbar-width: thin;
  scrollbar-color: #99BCD4 transparent;
  scroll-behavior: smooth !important;
  border-radius: 8px !important;
  -webkit-border-radius: 5px;

  &::-webkit-scrollbar {
    width: 10px !important;
    scroll-behavior: smooth !important;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #ccc !important;
    border-radius: 10px !important;
  }
  ::-webkit-scrollbar-track {
    background-color: transparent !important;
    border-radius: 10px !important;
  } 
  @media (max-width: 768px) {
    padding: 16px;
    overflow: hidden;
  }

`

export const SectionContentContainer = styled.div`
  width: 100%;
  padding: 22px;
  background: ${props => props.color || props.theme.colors.sectionBg};
  border-radius: 9px;
  max-height: ${props => props.maxHeight || "auto"};
  overflow-y: auto;
  position: relative;
  
  .clipboardIcon {
    position: absolute;
    top: 10px;
    right: 10px;
    background-color: #f7f7f7;
    height: 40px;
    width: 40px;
    border-radius: 5px;
    padding: 5px;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    justify-content: center;
    align-items: center;

    svg {
      width: 25px;
      height: 25px;
    }

    &:hover {
      background-color: #efefef;
    }
  }

  scrollbar-width: thin;
  scrollbar-color: #99BCD4 transparent;
  scroll-behavior: smooth !important;
  border-radius: 8px !important;
  -webkit-border-radius: 5px;

  &::-webkit-scrollbar {
    width: 10px !important;
    scroll-behavior: smooth !important;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #ccc !important;
    border-radius: 10px !important;
  }
  ::-webkit-scrollbar-track {
    background-color: transparent !important;
    border-radius: 10px !important;
  }
  ul {

    li {
        margin-left: 20px !important;
        padding: 5px 0 !important;
        list-style-type: disc !important;
    }
  }

  .boldText{
    color: #000;
    font-family: Poppins, sans-serif;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
  }

  @media (max-width: 768px) {
    padding: 16px;

    .clipboardIcon{
      width: 30px;
      height: 30px;

      svg {
        width: 18px;
        height: 18px;
      }
    }
  }
`


// card for the project Dashboard
export const CardWrapper = styled.div`
  width: 100%;
  padding: 20px;
  background-color: ${props => props.color || props.theme.colors.cardBg};
  border-radius: 9px;
  border: 1px solid ${props => props.theme.colors.borderBg};


  .dashboardCardPersonImage{
    width: 40px;
    height: 40px;

    img{
      border-radius: 4px;
    }
  }

  .dashboardCardPersonCountry {
    img {
      width: 20px;
      height: 20px;
      border-radius: 30%;
    }

    span{
      color: #000;
      font-family: Poppins;
      font-size: 12px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
    }
  }

  .dashboardCardPersonName{
    color: #1492E6;
    font-family: Poppins;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    &:hover{
      text-decoration: underline;
    }
  }

  .dashboardProgressData{
    display: flex;
    justify-content: space-between;
    align-items: center;
    .dashboardProgressDataDates{
      height: 150px;
      color: #000;
      p {
        font-weight: 500;
        font-family: Poppins, sans-serif;
        font-size: 14px;
        font-style: normal;
        line-height: normal;
        
      }

      span {
        color: ${props => props.textColor || "#000"};   
        font-family: Poppins;
        font-size: 16px;
        font-style: normal;
        font-weight: 400;
        line-height: normal; 
      }

      @media (max-width: 768px) {
        height: 115px;
      }
    }
    canvas{
      width: 150px;
      height: 150px;
      @media (max-width: 768px) {
        width: 115px;
        height: 115px;
      }
    }
  }


`

export const CardTitle = styled.div`
  font-size: 16px;
  font-style: normal;
  font-family: Poppins, sans-serif;
  font-weight: 600;
  line-height: normal;
  padding-bottom: 9px;
  border-bottom: ${props => props.border};

  .infoPopoverButton {
    margin-left: 10px;
    width: clamp(144px, 100%, 350px);
    cursor: pointer !important;
  }
  .infoPopoverPanel{
    padding: 1rem;
    border-radius: 8px;
    background-color: #fff;
    box-shadow: 0 0 10px rgb(0 0 0 / 15%);
    width: 300px;
  }


`