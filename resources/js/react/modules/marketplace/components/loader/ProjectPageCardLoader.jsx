import { Skeleton } from 'antd';
import React from 'react';

const ProjectPageCardLoader = () => {
    return (
        <div className='projects_content_body'>
            {
                Array(4).fill(0).map((_, index) => (
                    <div key={index} className='project_card_wrapper'>
                        <div className='project_card_header align-items-center'>
                            <h2 className='project_card_title'>
                                <Skeleton.Button active={true} size={'default'} block={true} shape={'default'} />
                            </h2>
                            <div className='project_card_bids_wrapper justify-content-end'>
                                <div style={{ maxWidth: '70px', width: '100%' }}>
                                    <Skeleton.Button active={true} size={'small'} block={true} shape={'default'} />
                                </div>
                                <div style={{ maxWidth: '70px', width: '100%' }}>
                                    <Skeleton.Button active={true} size={'small'} block={true} shape={'default'} />
                                </div>
                            </div>
                        </div>
                        <div className='project_card_body'>
                            <Skeleton active={true} size={'small'} paragraph={{ rows: 4 }} shape={'default'} />
                        </div>
                        <div className='project_card_footer'>
                            <div style={{ maxWidth: '150px', width: '100%' }}>
                                <Skeleton.Button active={true} size={'small'} block={true} shape={'default'} />
                            </div>
                            <div style={{ maxWidth: '150px', width: '100%' }}>
                                <Skeleton.Button active={true} size={'small'} block={true} shape={'default'} />
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
    );
};

export default ProjectPageCardLoader;