import React from 'react';
import style from '../../../../../../styles/required-action-card.module.css';
import bg_pattern from '../../../../media/comments_body_bg.svg';

const ConfirmCancellation = ({message=""}) => {
  return (
    <div style={{
      backgroundImage: `url(${bg_pattern})`,
    }} className={`${style.comment_cancellation_modal_container}`}>
      
    </div>
  );
};

export default ConfirmCancellation;