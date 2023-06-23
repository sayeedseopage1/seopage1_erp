
import React from 'react'
import UploadedFile from './UploadedFile'


const UploadedFiles = ({title}) => {
  return (
    <div className='sp1-uploaded-files'>
        <div className='__title mb-3'>{title}</div>

        <div className='__files_list'>
            {[...Array(15)].map((_,i) => (
                <UploadedFile key={i}/>
            ))}
        </div>
    </div>
  )
}

export default UploadedFiles