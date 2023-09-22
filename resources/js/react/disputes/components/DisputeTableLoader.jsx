import _ from 'lodash'
import React from 'react'
import {Placeholder} from '../../global/Placeholder';



const PersonLoader = () => {
    return(
        <div className="d-flex" style={{gap:'4px'}}>
            <Placeholder type="circle" width="24px" height="24px" />
            <div>
                <Placeholder width="100px" height={12}  className='mb-1'/>
                <Placeholder width="50px" height={10} className='mb-1' />
            </div>
        </div>
    )
}


const DisputeTableLoader = () => {
  return (
    _.times(10, i => (
        <tr key={i}>
            <td className='sp1-data-table-td'>
                <Placeholder width='50%' height={12}  className='mb-1'/>
            </td>

            <td className='sp1-data-table-td'>
                <Placeholder width="100%" height={12}  className='mb-1'/>
                <Placeholder width="50%" height={12}  className='mb-1'/>
            </td>

            <td className='sp1-data-table-td'>
                <PersonLoader />
            </td>

            
            <td className='sp1-data-table-td'>
                <Placeholder width={100}  height={12} className='mb-1'/>
            </td>

            <td className='sp1-data-table-td'>
                <Placeholder width={100}  height={12} className='mb-1'/>
            </td>

            <td className='sp1-data-table-td'>
                <Placeholder width={100}  height={12} className='mb-1'/>
            </td>

            <td className='sp1-data-table-td'> 
                <PersonLoader />
            </td>

            <td className='sp1-data-table-td'> 
                <PersonLoader />
            </td>
            
            <td className='sp1-data-table-td'> 
                <PersonLoader />
            </td>

            <td className='sp1-data-table-td'> 
                <PersonLoader />
            </td>
            
            <td className='sp1-data-table-td'> 
                <PersonLoader />
            </td>

            <td className='sp1-data-table-td'> 
                <PersonLoader />
            </td>

            <td className='sp1-data-table-td'>
                <Placeholder width={50}  height={12} className='mb-1'/>
            </td>
            
            <td className='sp1-data-table-td'> 
                <PersonLoader />
            </td>
            
            <td className='sp1-data-table-td'> 
                <PersonLoader />
            </td>
            
            <td className='sp1-data-table-td'> 
                <PersonLoader />
            </td>
            
            <td className='sp1-data-table-td'>
                <Placeholder  height={12}  className='mb-1'/>
            </td>
            
            <td className='sp1-data-table-td'> 
                <PersonLoader />
            </td>
            
            <td className='sp1-data-table-td'>
                <Placeholder  height={12}  className='mb-1'/>
            </td>
 
            <td className='sp1-data-table-td'>
                <Placeholder  height={12}  className='mb-1'/>
            </td>
        </tr>
    ))
  )
}

export default DisputeTableLoader