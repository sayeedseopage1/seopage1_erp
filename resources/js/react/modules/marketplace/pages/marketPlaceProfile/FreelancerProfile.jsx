import React, { useEffect, useState } from 'react';
import '../../styles/marketPlaceProfile/marketPlaceProfile.css';
import { user_profile } from '../../constants/userProfile';
import ProfileLeftSection from '../../components/marketPlaceProfile/sections/ProfileLeftSection';
import ProfileRightSection from '../../components/marketPlaceProfile/sections/ProfileRightSection';
import { ConfigProvider, Skeleton } from 'antd';
import ProfileRightSectionLoader from '../../components/loader/ProfileRightSectionLoader';
import ProfileLeftSectionLoader from '../../components/loader/ProfileLeftSectionLoader';

const FreelancerProfile = () => {
    const { cover_image } = user_profile || {}
    const [isProfileLoading, setIsProfileLoading] = useState(true);

    //! TODO: This is used for development purpose only
    useEffect(() => {
        setTimeout(() => {
            setIsProfileLoading(false);
        }, 3000);
    }, [])

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

                    {
                        isProfileLoading ? <div className='marketplace_cover_image'>
                            <Skeleton.Image block active={true} style={{ width: '100%', height: '366px' }} />
                        </div> : <img className='marketplace_cover_image' src={cover_image} alt="cover_image" />
                    }
                    <div className='marketplace_profile_body'>
                        <div className='marketplace_profile_body_contents'>
                            {
                                isProfileLoading ? <ProfileLeftSectionLoader /> : <ProfileLeftSection profileData={user_profile} />
                            }

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