import React from 'react'

const EmptyTable = () => {
  return (  
        <div className='d-flex flex-column align-items-center justify-content-center' style={{height: '30vh'}}>
            <div><svg width="130" height="130" viewBox="0 0 80 80"><g fill="none" fillRule="evenodd"><path d="M0 0h80v80H0z"></path><g stroke="#CBCCCD" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"><path d="M75 21.5V30M75 37v30.5a1.5 1.5 0 0 1-1.5 1.5h-67A1.5 1.5 0 0 1 5 67.5V41M5 36.264v-2.57M13 33h12M13 46h12M13 59h12"></path><g><path d="M34 33h12M34 46h12M34 59h12"></path></g><g><path d="M55 33h12M55 46h12M55 59h12"></path></g><path fill="#CBCCCD" d="M6.5 12h67a1.5 1.5 0 0 1 1.5 1.5V22H5v-8.5A1.5 1.5 0 0 1 6.5 12z"></path></g></g></svg></div>
            <div className='font-weight-bold' style={{color: '#CBCCCD'}}>Data Not Available</div>
        </div>
  )
}

export default EmptyTable