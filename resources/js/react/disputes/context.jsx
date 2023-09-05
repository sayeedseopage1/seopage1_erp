import * as React from 'react';

export const DisputeContext = React.createContext();

export default function DisputeContextProvider ({children}){
    const [showResolveModal, setShowResolveModal] = React.useState(false);
    const [rowData, setRowData] = React.useState(null);
    const [mode, setMode] = React.useState('view');

    const toggleModal = (data, mode) => {
        setShowResolveModal(!showResolveModal);
        setRowData(data);
        setMode(mode);
    }

    const close = () => setShowResolveModal(false);


    return(
        <DisputeContext.Provider value={{
            showResolveModal,
            setShowResolveModal,
            toggleModal,
            rowData,
            close,
            setRowData,
            mode, 
            setMode
        }}>
            {children}
        </DisputeContext.Provider>
    )
}


export const useDispute = () => React.useContext(DisputeContext);