// import * as React from 'react';


// const DataTableContext = React.createContext();



const DataTable = () => {

    return(
        <div className='cnx__table'>
            {/* header */}
            <div className="cnx__table_head">
               <div className="cnx__table_tr">
                    <div className="cnx__table_th">
                        Subject
                    </div>
                    <div className="cnx__table_th">
                        Type
                    </div>
                    
                    <div className="cnx__table_th">
                    Assigned to user 
                    </div>
                </div> 
            </div>
            {/* end header */}

            {/* table body */}

            <div className="cnx__table_body">
               {[...Array(20)].map(i => (
                    <div key={i} className="cnx__table_tr">
                        <div className="cnx__table_td">
                            Subject
                        </div>
                        <div className="cnx__table_td">
                            Type
                        </div>
                        
                        <div className="cnx__table_td">
                        Assigned to user 
                        </div>
                    </div> 
               ))}
            </div>
            {/* end table body  */}
        </div>
    )
}


export default DataTable;