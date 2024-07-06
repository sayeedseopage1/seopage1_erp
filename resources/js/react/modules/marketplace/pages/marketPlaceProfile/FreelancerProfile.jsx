import React, { useState } from 'react';
import '../../styles/marketPlaceProfile/marketPlaceProfile.css';
import { user_profile } from '../../constants/userProfile';
import ProfileLeftSection from '../../components/marketPlaceProfile/sections/ProfileLeftSection';
import ProfileRightSection from '../../components/marketPlaceProfile/sections/ProfileRightSection';
import { ConfigProvider } from 'antd';
import ProfileRightSectionLoader from '../../components/loader/ProfileRightSectionLoader';

const FreelancerProfile = () => {
    const { cover_image } = user_profile || {}
    const [isProfileLoading, setIsProfileLoading] = useState(true);
    return (
        <ConfigProvider
            theme={{
                components: {
                    Pagination: {
                        itemActiveBg: '#095AC6',
                    },
                },
            }}
        >
            <div className='sp1_marketplace_page_wrapper'>
                <div className='marketplace_profile_wrapper'>
                    <img className='marketplace_cover_image' src={cover_image} alt="cover_image" />
                    <div className='marketplace_profile_body'>
                        <div className='marketplace_profile_body_contents'>
                            <ProfileLeftSection profileData={user_profile} />
                            {
                                isProfileLoading ? <ProfileRightSectionLoader /> : <ProfileRightSection profileData={user_profile} />
                            }
                        </div>
                    </div>
                </div>
            </div>
        </ConfigProvider>
    );
};

export default FreelancerProfile;