import React from 'react';

const InfoWithIconTitle = ({ icon, img_url, title }) => {
    return (
        <div className='info_with_icon'>
            {icon && <span className='icon'>{icon}</span>}
            {img_url && <img src={img_url} alt='image' className='info_with_icon_img' />}
            <p className='sp1_marketplace_default_text'>{title}</p>
        </div>
    );
};

export default InfoWithIconTitle;