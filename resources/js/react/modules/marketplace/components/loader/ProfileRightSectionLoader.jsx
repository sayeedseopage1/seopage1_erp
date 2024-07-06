import { Skeleton } from 'antd';
import React from 'react';

const ProfileRightSectionLoader = () => {
    return (
        <div className='marketplace_profile_right_side'>
            {
                Array(4).fill(0).map((_, index) => (
                    <div key={index} className='info_card_with_header'>
                        <div className='info_card_with_header_title'>
                            <div style={{ maxWidth: '120px', width: '100%' }}>
                                <Skeleton.Button active={true} size={'small'} block={true} shape={'default'} />
                            </div>
                        </div>
                        <div className='info_card_with_header_content'>
                            {
                                Array(6).fill(0).map((_, index) => (
                                    <Skeleton.Button key={index} style={{ marginBottom: '10px', height: '20px' }} active={true} size={'small'} block={true} shape={'default'} />
                                ))
                            }
                        </div>
                    </div>
                ))
            }
        </div>
    );
};

export default ProfileRightSectionLoader;