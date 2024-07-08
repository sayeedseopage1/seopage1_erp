import { Skeleton } from 'antd';
import React from 'react';

const ProfilePersonalInfoLoader = () => {
    return (
        <div className='personal_info_wrapper'>
            <div className='personal_info_left'>
                {/* <img className='user_profile_image' src={profile_image_url} alt={name} /> */}
                <Skeleton.Image style={{ width: '100%', minWidth: '250px', minHeight: '250px', height: '100%' }} active={true} />
                <div className='personal_info_left_content'>
                    <div style={{ maxWidth: '250px', width: '100%', marginBottom: '10px' }}>
                        <Skeleton.Button active={true} size={'small'} block={true} shape={'default'} />
                    </div>
                    <div style={{ maxWidth: '250px', width: '100%', marginBottom: '10px' }}>
                        <Skeleton.Button active={true} size={'small'} block={true} shape={'default'} />
                    </div>
                    <div style={{ maxWidth: '250px', width: '100%', marginBottom: '10px' }}>
                        <Skeleton.Button active={true} size={'small'} block={true} shape={'default'} />
                    </div>
                    <div style={{ maxWidth: '250px', width: '100%', marginBottom: '10px' }}>
                        <Skeleton.Button active={true} size={'small'} block={true} shape={'default'} />
                    </div>
                </div>
            </div>
            <div className='personal_info_right'>
                <div>
                    <div className=' freelancer_name_wrapper'>
                        <div style={{ maxWidth: '250px', width: '100%', marginBottom: '10px' }}>
                            <Skeleton.Button active={true} size={'large'} block={true} shape={'default'} />
                        </div>
                        <div style={{ maxWidth: '450px', width: '100%' }}>
                            <Skeleton.Button active={true} size={'small'} block={true} shape={'default'} />
                        </div>
                    </div>
                    <div className='profile_stats'>
                        <div style={{ maxWidth: '600px', width: '100%' }}>
                            <Skeleton.Button active={true} size={'small'} block={true} shape={'default'} />
                        </div>
                    </div>
                    <div className='profile_job_success'>
                        <Skeleton.Button active={true} size={'small'} block={true} shape={'default'} />
                        <Skeleton.Button active={true} size={'small'} block={true} shape={'default'} />
                        <Skeleton.Button active={true} size={'small'} block={true} shape={'default'} />
                        <Skeleton.Button active={true} size={'small'} block={true} shape={'default'} />
                    </div>
                </div>
                <div className='profile_general_description'>
                    <Skeleton active={true} size={'small'} paragraph={{ rows: 2 }} shape={'default'} />
                </div>
            </div>
        </div>
    );
};

export default ProfilePersonalInfoLoader;