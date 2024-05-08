import styled from "styled-components";


// container for the project Dashboard
export const SectionWrapper = styled.section`
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
  background-color: ${props => props.theme.colors.sectionBg};
  border-radius: 9px;

  @media (max-width: 768px) {
    padding: 16px;
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
`