import { Skeleton } from 'antd';
import React from 'react';

const ProjectDetailsSkeleton = () => {
    return (
        <div className='p_d_wrapper'>
            <div className='p_d_content_left'>
                <div className='p_d_content_wrapper'>
                    <div className='p_d_title_wrapper'>
                        <div style={{ maxWidth: '80px', width: '100%' }}>
                            <Skeleton.Button active={true} size={'small'} block={true} shape={'default'} />
                        </div>
                        <div style={{ maxWidth: '80px', width: '100%' }}>
                            <Skeleton.Button active={true} size={'small'} block={true} shape={'default'} />
                        </div>
                    </div>
                    {/* project details content */}
                    <Skeleton active={true} size={'small'} paragraph={{ rows: 4 }} shape={'default'} />
                    {/* project details skills */}
                    <div className='p_d_skills_wrapper'>
                        <div style={{ maxWidth: '200px', width: '100%', marginBottom: '10px' }}>
                            <Skeleton.Button active={true} size={'small'} block={true} shape={'default'} />
                        </div>
                        <div className='p_d_skills_contents'>
                            {
                                Array(4).fill(0).map((_, index) => (
                                    <div key={index} style={{ maxWidth: '80px', width: '100%' }}>
                                        <Skeleton.Button active={true} size={'small'} block={true} shape={'default'} />
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                    {/* project details footer */}
                    <div className='p_d_footer_wrapper'>
                        <div className='p_d_title_wrapper'>
                            <div style={{ maxWidth: '80px', width: '100%' }}>
                                <Skeleton.Button active={true} size={'small'} block={true} shape={'default'} />
                            </div>
                            <div style={{ maxWidth: '80px', width: '100%' }}>
                                <Skeleton.Button active={true} size={'small'} block={true} shape={'default'} />
                            </div>
                        </div>
                        <div className='p_d_scam_alert_wrapper'>
                            <Skeleton active={true} size={'small'} paragraph={{ rows: 2 }} shape={'default'} />
                        </div>
                    </div>
                </div>
                {/* project details clarification board */}
                <div className='p_d_content_wrapper mt-3'>
                    <div className='p_d_title_wrapper'>
                        <div style={{ maxWidth: '70px', width: '100%' }}>
                            <Skeleton.Button active={true} size={'small'} block={true} shape={'default'} />
                        </div>
                        <div style={{ maxWidth: '280px', width: '100%' }}>
                            <Skeleton.Button active={true} size={'small'} block={true} shape={'default'} />
                        </div>
                    </div>
                    <div className='p_d_clarification_board'>
                        <div>
                            <Skeleton.Button style={{ height: '42px' }} active={true} size={'small'} block={true} shape={'default'} />
                        </div>

                        <div className='p_d_clarification_board_input'>
                            <Skeleton.Button style={{ height: '70px' }} active={true} size={'default'} block={true} shape={'default'} />
                        </div>
                    </div>
                </div>
            </div>
            {/* about client  */}
            <div className='p_d_content_wrapper p_d_content_right'>
                {
                    Array(3).fill(0).map((_, index) => (
                        <div key={index} className='p_d_about_client_section mb-4'>
                            <div className='p_d_title_wrapper'>
                                <div style={{ maxWidth: '80px', width: '100%' }}>
                                    <Skeleton.Button active={true} size={'small'} block={true} shape={'default'} />
                                </div>
                            </div>
                            <div>
                                {
                                    Array(3).fill(0).map((_, index) => (
                                        <Skeleton.Button key={index} style={{ height: '18px', maxWidth: '200px', width: '100%' }} active={true} size={'small'} block={true} shape={'default'} />
                                    ))
                                }
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default ProjectDetailsSkeleton;