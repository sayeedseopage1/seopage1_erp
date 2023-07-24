import React from 'react'

const Loading = ({isLoading}) => {
    if(!isLoading) return null;
    return (
        <div className='d-flex align-items-center justify-content-center' style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: '9999999',
            background: '#fff',
        }}>
            <div className='d-flex align-items-center cursor-processing fs-16 mr-2'>
                <div 
                    className="spinner-border mr-2" 
                    role="status" 
                    style={{ width: '20px',height: '20px'}}
                />
                Loading...
            </div>
        </div>
  )
}

export default Loading