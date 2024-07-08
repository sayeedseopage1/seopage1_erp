import React from 'react';
import ProfilePersonalInfoLoader from './ProfilePersonalInfoLoader';
import LgDataCardWithHeaderLoader from './LgDataCardWithHeaderLoader';
import { Skeleton } from 'antd';


const ProfileLeftSectionLoader = () => {
    return (
        <div className='marketplace_profile_left_side'>
            <ProfilePersonalInfoLoader />
            {/* portfolio  */}
            <LgDataCardWithHeaderLoader actionCompo={
                <div className='personal_info_action_wrapper'>
                    <div style={{ maxWidth: '150px', width: '100%' }}>
                        <Skeleton.Button active={true} size={'large'} block={true} shape={'default'} />
                    </div>
                    <div style={{ maxWidth: '150px', width: '100%' }}>
                        <Skeleton.Button active={true} size={'large'} block={true} shape={'default'} />
                    </div>
                </div>
            }>
                <div className='marketplace_profile_portfolio' style={{ gap: '2px' }}>
                    {
                        Array(6).fill(0).map((_, index) => (
                            <Skeleton.Image key={index} active={true} style={{ width: '100%', height: '100%', minHeight: '250px' }} />
                        ))
                    }
                </div>
            </LgDataCardWithHeaderLoader>
            {
                Array(5).fill(0).map((_, index) => (
                    <LgDataCardWithHeaderLoader key={index} actionCompo={
                        <div className='personal_info_action_wrapper'>
                            <div style={{ maxWidth: '150px', width: '100%' }}>
                                <Skeleton.Button active={true} size={'large'} block={true} shape={'default'} />
                            </div>
                            <div style={{ maxWidth: '150px', width: '100%' }}>
                                <Skeleton.Button active={true} size={'large'} block={true} shape={'default'} />
                            </div>
                        </div>
                    }>
                        <Skeleton active={true} size={'small'} paragraph={{ rows: 2 }} shape={'default'} />
                    </LgDataCardWithHeaderLoader>
                ))
            }
        </div>
    );
};

export default ProfileLeftSectionLoader;