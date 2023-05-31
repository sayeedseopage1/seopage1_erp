import * as React from 'react';


export const QualifiedSalesContext = React.createContext(null);



export default function QualifiedSalesContextProvider ({children}){
    const [columns, setColumns] = React.useState([]);
    const [sortConfig, setSortConfig]= React.useState({direction: 'desc', key: 'id'}); 


    return(
        <QualifiedSalesContext.Provider
            value={{
                columns,
                setColumns,
                sortConfig,
                setSortConfig
            }} 
        >
            {children}
        </QualifiedSalesContext.Provider>
    )
}