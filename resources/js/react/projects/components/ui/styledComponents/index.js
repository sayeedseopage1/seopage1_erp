import styled from "styled-components";


// container for the project Dashboard
export const SectionWrapper = styled.div`
  width: 100%;
  padding: 24px;
  background-color: ${props => props.theme.colors.sectionBg};
  border-radius: 9px;


  &.projectHourlyContainer{
    display: flex;
  }

  
  @media (min-width: 769px) and (max-width: 1459px) {
    &.projectHourlyContainer {
      display: flex;
      flex-direction: column;
    }
    .projectHourlyRightContainer{
      padding-left: 0px !important;
      padding-top: 16px !important;
      flex-direction: row !important;
    }
  }

  @media screen and (max-width: 768px) {
    .projectHourlyRightContainer{
      padding-left: 0px !important;
      padding-top: 16px !important;
      flex-direction: column !important;
    }
    &.projectHourlyContainer {
      display: flex;
      flex-direction: column;
    }
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
  overflow: hidden;

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
  font-family: Poppins, sans-serif;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;

  
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
    padding: 14px;

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
  gap: ${props => props.gap || "0"};


  .questionAnswerDashboard{
    color: #000;
    font-family: Poppins;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    margin: 16px 0;
  }

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

      button{
        background: none;
        border: none;
        padding: 0;
        cursor: pointer;
        font-family: Poppins, sans-serif;
        font-size: 16px;
        font-style: normal;
        font-weight: 400;
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

    .projectDashboardProgressLoader{
        height: 150px !important;
        width: 150px !important;
        border-radius: 50% !important;

        @media (max-width: 768px) {
          height: 115px !important;
          width: 100% !important;
        }
    }
  }

  &.estimateHourlyRateContainer{
      display: flex;
      flex-direction: row !important;
  }



  @media (min-width: 1590px) and (max-width: 1920px) {
    &.earningExpensesCard{
       .dashboardCardPricingInfo:nth-child(3){
        margin-top: 14px !important;
       }
    }

  }
  @media screen and (max-width: 1890px) {
    &.estimateHourlyRateContainer{
      display: flex;
      flex-direction: column !important;
    }
  }


  @media (min-width: 1069px) and (max-width: 1589px) {
    &.estimatedTimeHoursLoggedCard{
      flex: 0 0 34%;
      max-width: 36%;
    }
    &.earningExpensesCard{
      flex: 0 0 65%;
      max-width: 66%;
    }
  }

  @media (min-width: 769px) and (max-width: 1068px) {
    &.estimatedTimeHoursLoggedCard{
      flex: 0 0 40%;
      max-width: 42%;
    }
    &.earningExpensesCard{
      flex: 0 0 58%;
      max-width: 60%;
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

  @media (max-width: 768px) {
    font-size: 14px;
  }

  @media screen and (max-width: 375px) {
    font-size: 14px;
  }

`

export const ModalContentContainer = styled.div`
  padding: ${props => props.padding || "16px 30px"};
  background: ${props => props.color || "#F3FAFF"};
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


  .modalContentWrapper{
    max-height: 70vh;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    scrollbar-width: thin;
    scrollbar-color: #99BCD4 transparent;
    scroll-behavior: smooth !important;
    &::-webkit-scrollbar {
      width: 10px !important;
      scroll-behavior: smooth !important;
    }
    &::-webkit-scrollbar-thumb {
      background-color: #ccc !important;
      border-radius: 10px !important;
    }
    &::-webkit-scrollbar-track {
      background-color: transparent !important;
    }
    .modalSectionHeader{
      color: #000;
      font-family: Poppins, sans-serif;
      font-size: 16px;
      font-style: normal;
      font-weight: 500;
      line-height: normal;
    }

    
  }

  .authorizeCommentViewWrapper{
    display: flex;
    flex-direction: column;
    gap: 10px;
    font-family: Poppins, sans-serif !important;

    h6{
      color: #000;
      font-size: 16px;
      font-style: normal;
      font-family: Poppins, sans-serif !important;
      font-weight: 500;
      line-height: normal;
      margin-bottom: 0;
    }

    p{
      color: #000;
      font-family: Poppins, sans-serif;
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
    }

    div{
      color: #000;
      font-family: Poppins, sans-serif;
      font-style: normal;
      line-height: normal;
    }
  }
  
  .TGABAHeaderContainer{
      border-top: 1px solid #DDDCDC;
      background: #1D82F5;
      width: 100%;
      padding: 17px 0;

      h6 {
        color: #FFF;
        font-family: Poppins, sans-serif;
        font-size: 16px;
        font-style: normal;
        font-weight: 500;
        line-height: normal;
        margin-bottom: 0;
      }
    }
  .TGABAContentContainer{
    @media screen and (max-width: 768px) {
      width: 896px;
      max-width: 896px;
      scrollbar-width: thin;
      scrollbar-color: #99BCD4 transparent;
      scroll-behavior: smooth !important;
      -webkit-border-radius: 5px;
      overflow: hidden;

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
      .col-6{
        flex: 0 0 35% !important;
        max-width: 35% !important;
      }
      .col-2{
        flex: 0 0 15% !important;
        max-width: 15% !important;
      }
      .col-4{
        flex: 0 0 50% !important;
        max-width: 50% !important; 
        display: flex;
        justify-content: center;
      }
    }

  }

  .confirmationModalContentWrapper{
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      gap: 10px;

      svg{
        width: 8em;
        height: 8em;
        fill: #f8bb86;
        animation: svgAnimation 0.5s ease-in-out;
      }
      .confirmationModalContent{
        gap: 10px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        text-align: center;
        h2{
          color: #000;
          font-family: Poppins, sans-serif;
          font-size: 18px;
          font-style: normal;
          font-weight: 500;
          line-height: normal;
          margin-bottom: 0 !important;
        }

        p{
          color: #000;
          font-family: Poppins, sans-serif;
          font-size: 14px;
          font-style: normal;
          font-weight: 400;
          line-height: normal;
        }
      }
  }

  @keyframes svgAnimation {
  0% {
    transform: scale(0.5);
    opacity: 0;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

  .modalContentHeader{
    border-radius: 8px;
    border: 1px dashed #1492E6;
    background: #D8EDFC;
    color: #1492E6;
    font-family: Poppins , sans-serif;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    padding: 19px 30px;
    mask-border: 1px solid #1492E6;
    margin-bottom: 24px;


    p {
      display: flex;
      align-items: center;
      margin-bottom: 0;
      a{
        color: #1492E6;
        text-decoration: underline;
        margin-left: 5px;
      }

      @media screen and (max-width: 768px) {
        font-size: 14px;
        a {
          width: 55%;
        }
      }
    }

    @media screen  and (max-width: 768px) {
      padding: 19px 20px;
    }

  }
  .modalContentTable{
    border-radius: 21px;
    border: 1px solid #D8D8D8;
    background: #F3FAFF;
    padding: 19px 30px;


    table {
      border-collapse: collapse;
      display: block;
      height: 52vh;
      overflow: auto;
      scrollbar-width: thin;
      scrollbar-color: #99BCD4 transparent;
      scroll-behavior: smooth !important;
      border-radius: 10px !important;
      -webkit-border-radius: 5px;

      &::-webkit-scrollbar {
        width: 10px !important;
        scroll-behavior: smooth !important;
      }

      &::-webkit-scrollbar-thumb {
        border-radius: 10px !important;
        background-color: #ccc !important;
        box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
      }
      ::-webkit-scrollbar-track {
        background-color: transparent !important;
        border-radius: 10px !important;
        box-shadow: inset 0 0 5px grey; 
      }

      thead{
        tr {
          color: #000;
          font-family: Poppins, sans-serif;
          font-size: 14px;
          font-style: normal;
          font-weight: 500;
          line-height: normal;
        
          th{
            padding:  15px;
            border-bottom: 1px solid #D8D8D8;
            position: sticky; 
            background-color: #F3FAFF;
            top: -1px;
            z-index: 1;
          }
          th:nth-child(1){
            width: 5%;
          }
          th:nth-child(2){
            width: 45%;
          }
          th:nth-child(3){
            width: 50%;
          }
          .projectQCSModal:nth-child(1)  {
            width: 5% !important;

          }
          .projectQCSModal:nth-child(2) {
            width: 70% !important;
          
          }
          .projectQCSModal:nth-child(3) {
              width: 25% !important;
          }
          .projectDisputeModal:nth-child(1)  {
            width: 5% !important;

          }
          .projectDisputeModal:nth-child(2) {
            width: 60% !important;
          
          }
          .projectDisputeModal:nth-child(3) {
              width: 35% !important;
          }
        }
      }
      tbody{
        tr {
          color: #000;
          font-family: Poppins, sans-serif;
          font-size: 14px;
          font-style: normal;
          font-weight: 400;
          line-height: normal;
          border-collapse: collapse;
          td{
            padding:  15px;
            border-bottom: 1px solid #D8D8D8;
          }
          td:nth-child(1){
            width: 5%;
          }
          td:nth-child(2){
            width: 45%;
          }
          td:nth-child(3){
            width: 50%;
          }
          .projectQCSModal:nth-child(1)  {
            
              width: 5% !important;
          
          }
          .projectQCSModal:nth-child(2) {
           
            width: 70% !important;
          
          }
          .projectQCSModal:nth-child(3) {
              width: 25% !important;
            
          }
          .projectDisputeModal:nth-child(1)  {
            width: 5% !important;

          }
          .projectDisputeModal:nth-child(2) {
            width: 60% !important;
          
          }
          .projectDisputeModal:nth-child(3) {
              width: 35% !important;
          }

          &:nth-child(odd){
            background: #D8EDFC;
          }
          &:nth-child(even){
            background: #F3FAFF;
          }
          &:hover{
            background: #D8EDFC;
          }
         
        }
        tr:last-child{
          td{
            border-bottom: none;
          }
        
        }
      }
    }

    @media screen  and (max-width: 768px) {
      padding: 19px 20px;
    }
    
  }

  .modalButtonContainer{
    display: flex;
    justify-content: flex-start;
    gap: 10px;
  }


  /* Project Deadline modal */
  .deadlineInfo{
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 20px;
    margin-bottom: 20px;

    .deadlineInfo__deadline{
      display: flex;
      flex-direction: column;
      gap: 10px;
      width: 100%;

      label{
        color: #000;
        font-family: Poppins, sans-serif;
        font-size: 16px;
        font-style: normal;
        font-weight: 500;
        line-height: normal;
        sup{
          color: red;
        }
      }

      input{
        border-radius: 3px;
        border: 1px solid #DDDCDC;
        background: #FFF;
        padding: 10px;
        color: #626262;
        font-family: Poppins, sans-serif;
        font-size: 16px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
      }
      .isDisabled{
        background: #F1F1F1;
      }
      .ant-picker{
        padding: 0px 10px 0px;;
        border-radius: 3px;
        input{
          border: none;
          padding: 10px 0;
        }
      }
    }

    @media screen and (max-width: 768px) {
      flex-direction: column;
      gap: 10px;
    }
  
  }

  .deadlineExtensionOptions{
    h6{
      color: #000;
      font-family: Poppins , sans-serif;
      font-size: 16px;
      font-style: normal;
      font-weight: 500;
      line-height: normal;
      sup{
        color: red;
      }
    }
    span{
      color: #000;
      font-family: Poppins, sans-serif;
      font-size: 16px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
    }
  }


  .stepHeader{
    h3 {
      color: #000;
      font-family: Poppins, sans-serif;
      font-size: 16px;
      font-style: normal;
      font-weight: 500;
      line-height: normal;
    }
    margin-bottom: 20px;
  }

  /* Dispute Project */

  .disputeProjectInfoHeader{ 
    text-align: center;
    margin-bottom: 24px;
    h6{
      color: #000;
      font-family: Poppins, sans-serif;
      font-size: 22px;
      font-style: normal;
      font-weight: 500;
      line-height: normal;
      margin-bottom: 12px;
    }
    p{
      color: #F00;
      font-family: Poppins, sans-serif;
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
    }
  
  }
  .modalInputContainer{
    display: flex;
    gap: 10px;
    flex: 1;

    div{
      width: 50%;
    }

    @media screen and (max-width: 768px) {
      flex-direction: column;
      gap: 10px;
       
      div{
        width: 100%;
      
      }
    }
  }

  /* Utility Class */
  .verticalAlignTop{
    vertical-align: top;
  }
  .w-65{
    width: 65% !important;
  }

  &.borderRadiusBottom{
    border-radius: 0 0 8px 8px;
  }


  @media screen and (max-width: 768px) {
    padding: 16px 20px;
  }
  
`