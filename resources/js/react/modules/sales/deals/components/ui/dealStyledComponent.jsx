import styled from 'styled-components'
// styled components
export const DialogPanelWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgb(0 0 0 / 20%);
  z-index: 9999;
  overflow-y: auto;

  & > .dialog-panel{
    width: 100%;
    max-width: 800px; 
    margin: 2rem auto;
  }
`;

