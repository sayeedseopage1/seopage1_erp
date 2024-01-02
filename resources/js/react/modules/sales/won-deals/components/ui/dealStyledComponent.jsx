import styled from 'styled-components'
// styled components
export const DialogPanelWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgb(0 0 0 / 20%);
  z-index: 80;
  overflow-y: auto;

  & > .dialog-panel{
    width: 100%;
    max-width: 800px; 
    margin: 3rem auto 5rem auto;
  }
`;

export const SelectionMenuWrapper = styled.div`
  & > div > .selection{ 
    padding: 8px 10px;
    border: 1px solid rgb(0 0 0 / 8%);
    width: 100%;
    height: 40px;
    border-radius: 6px; 
  }
`;