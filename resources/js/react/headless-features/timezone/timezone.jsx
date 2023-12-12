import React from 'react';
import ReactDOM from 'react-dom/client';
import Modal from '../../global/Modal';
import { Header, Icon, ModalPanel, Text } from './styled-components';


/**
 * * This component responsible for showing system incorrect clock warning modal. 
 */

export const TimeZone = () => {
  const [localTimezone, setLocalTimezone] = React.useState('');
  // check server time
  React.useEffect(() => {
    const checkLocalTimezone = () => {
      const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      setLocalTimezone(timezone);
    }

    checkLocalTimezone();
  })

    
  
  return(
    <Modal isOpen={localTimezone !== 'Asia/Dhaka'}>
      <ModalPanel>
        <Icon>
          <i className="fa-regular fa-clock" />
        </Icon>

        <Header>
          Your Computer Clock is Wrong
        </Header>

        <Text>
          Please update your computer clock in your system settings to the current date, time and time zone and then refresh the page.
        </Text>
        
      </ModalPanel>
    </Modal>
  )
}
 

// append into container
const container = document.getElementById("react-timezone-modal");

if (container) {
    ReactDOM.createRoot(container).render(
        <React.StrictMode>
          <TimeZone />
        </React.StrictMode>
    );
}
