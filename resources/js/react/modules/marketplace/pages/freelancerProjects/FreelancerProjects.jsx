import React from 'react';
import '../../styles/freelancerProjects/freelancerProjects.css';
import { ConfigProvider } from 'antd';
import ProjectContents from '../../components/freelancerProjects/sections/ProjectContents';
import ProjectsFilterBar from '../../components/freelancerProjects/sections/ProjectsFilterBar';

const FreelancerProjects = () => {
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
                    <ProjectsFilterBar />
                    <ProjectContents />
                </div>
            </div>
        </ConfigProvider>
    );
};

export default FreelancerProjects;