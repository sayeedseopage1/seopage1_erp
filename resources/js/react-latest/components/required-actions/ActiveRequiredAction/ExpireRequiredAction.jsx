import React from 'react';
import getCardData from '../../../__fake_data__/required-actions/data';
import RequiredActionsCard from '../RequiredActionCards/RequiredActionsCard';

const ExpireRequiredAction = () => {
  return (
    <div>
      {
        getCardData(12).map((data,i)=>{
          return <RequiredActionsCard key={i} data={data}/>
        })
      }
    </div>
  );
};

export default ExpireRequiredAction;