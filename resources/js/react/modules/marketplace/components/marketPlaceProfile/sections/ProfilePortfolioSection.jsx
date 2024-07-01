import React from 'react';
import PortfolioCard from '../ui/PortfolioCard';

const ProfilePortfolioSection = ({ portfolio, profileData }) => {
    return (
        <div className='marketplace_profile_portfolio'>
            {
                portfolio?.map((item) => {
                    return <PortfolioCard key={item?.id} item={item} profileData={profileData} />
                })
            }
        </div>
    );
};

export default ProfilePortfolioSection;