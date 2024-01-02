import * as React from 'react';


const Ctx = React.createContext(null);


export const useDealContext = () => React.useContext(Ctx);


const DealContextProvider = ({children}) =>{
    const [isEditFormEnable, setIsEditFormEnable] = React.useState(false);
    const [editDealData, setEditDealData] = React.useState(null);
    

    // openEditForm
    const openEditForm = (data) => {
      setIsEditFormEnable(true);
      setEditDealData(data);
    }
    // closeEditForm
    const closeEditForm = () => {
      setIsEditFormEnable(false);
      setEditDealData(null);
    }

    return(
      <Ctx.Provider value={{
        isEditFormEnable,
        editDealData,
        openEditForm,
        closeEditForm
      }}>
        {children}
      </Ctx.Provider>
    )
}

export default DealContextProvider;