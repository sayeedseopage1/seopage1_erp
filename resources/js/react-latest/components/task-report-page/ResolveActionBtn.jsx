import React from 'react';
import Button from '../../ui/Button';

const ResolveActionBtn = () => {
  return (
    <div>
      <Button
        variant='tertiary'
        onClick={()=>console.log('clicked')}
      >
        Resolve
      </Button>
    </div>
  );
};

export default ResolveActionBtn;