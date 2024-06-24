import React from 'react';
import '../../styles/freelancerProjects/freelancerProjects.css';
import { ConfigProvider, Select } from 'antd';
import ProjectCard from '../../components/freelancerProjects/ui/ProjectCard';
import { dummy_projects } from '../../constants/projects';

const FreelancerProjects = () => {
    const handleSortChange = (value) => {
        console.log(`selected ${value}`);
    };
    return (
        <ConfigProvider
            theme={{
                components: {
                    Select: {
                        selectorBg: 'transparent',
                    },
                },
            }}
        >
            <div className='sp1_marketplace_page_wrapper'>
                <div className='sp1_marketplace_section_wrapper projects_page_wrapper'>
                    <div className='projects_page_filter_bar'>filter bar</div>
                    <div className='projects_page_contents'>
                        <div className='projects_content_header'>
                            <div className='projects_content_header_title'>
                                <p className='header_title'>Top results</p>
                                <p className='header_results'>1-20 of 56 results</p>
                            </div>
                            <div>
                                <p className='projects_content_alert_title'>Receive alerts for this search</p>
                            </div>
                            <div>
                                <span className='projects_content_header_sort_label'>Sort by</span>
                                <Select
                                    className='projects_content_header_sort'
                                    defaultValue="latest"
                                    style={{
                                        width: 120,
                                    }}
                                    onChange={handleSortChange}
                                    options={[
                                        {
                                            value: 'latest',
                                            label: 'Latest',
                                        },
                                        {
                                            value: 'oldest',
                                            label: 'Oldest',
                                        },
                                    ]}
                                />
                            </div>
                        </div>
                        <div className='projects_content_body'>
                            {
                                dummy_projects?.map(item => <ProjectCard key={item?.id} item={item} />)
                            }
                        </div>
                    </div>
                </div>
            </div>
        </ConfigProvider>
    );
};

export default FreelancerProjects;