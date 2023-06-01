import * as React from 'react';


export const QualifiedSalesContext = React.createContext(null);



export default function QualifiedSalesContextProvider ({children}){
    const [columns, setColumns] = React.useState([]);
    const [sortConfig, setSortConfig]= React.useState({direction: 'desc', key: 'id'}); 
    const [activePage, setActivePage] = React.useState(1);
    const [parPageRow, setParPageRow] = React.useState(10);


    return(
        <QualifiedSalesContext.Provider
            value={{
                columns,
                setColumns,
                sortConfig,
                setSortConfig,
                activePage,
                setActivePage,
                parPageRow,
                setParPageRow
            }} 
        >
            {children}
        </QualifiedSalesContext.Provider>
    )
}