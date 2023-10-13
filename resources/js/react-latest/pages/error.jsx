import React from 'react';

const ERROR = ({status_code,error_mssg}) => {
  return (
    <div className='d-flex justify-content-center align-items-center' style={{minHeight:'calc(100vh - 63px)'}}>
      <h2 className='text-secondary'>{status_code} | {error_mssg} </h2>
    </div>
  );
};

export default ERROR;
