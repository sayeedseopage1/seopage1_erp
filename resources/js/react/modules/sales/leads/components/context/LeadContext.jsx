import * as React from 'react';


const Ctx = React.createContext(null);


export const useLeadContext = () => React.useContext(Ctx);


const LeadContextProvider = ({children}) =>{
    const [isEditFormEnable, setIsEditFormEnable] = React.useState(false);
    const [editLeadData, setEditLeadData] = React.useState(null);
    

    // openEditForm
    const openEditForm = (data) => {
      setIsEditFormEnable(true);
      setEditLeadData(data);
    }
    // closeEditForm
    const closeEditForm = () => {
      setIsEditFormEnable(false);
      setEditLeadData(null);
    }

    return(
      <Ctx.Provider value={{
        isEditFormEnable,
        editLeadData,
        openEditForm,
        closeEditForm
      }}>
        {children}
      </Ctx.Provider>
    )
}

export default LeadContextProvider;