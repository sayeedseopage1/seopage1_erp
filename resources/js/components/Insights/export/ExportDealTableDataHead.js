import * as React from 'react';

export default function DealTableHead({goal, columns = []}){

    return(
        <div className='export_table_head'>
           {
                columns?.map((column, index) => (
                    <div key={`${column}${index}`}>

                    </div>
                ))
           } 
        </div>
    )
}