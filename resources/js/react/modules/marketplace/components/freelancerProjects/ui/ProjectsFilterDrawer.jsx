import React, { useState } from 'react';
import { Button, Drawer } from 'antd';
import { FaFilter } from "react-icons/fa";
import ProjectsFilterBar from '../sections/ProjectsFilterBar';
const ProjectsFilterDrawer = () => {
    const [open, setOpen] = useState(false);
    const showDrawer = () => {
        setOpen(true);
    };
    const onClose = () => {
        setOpen(false);
    };
    return (
        <>
            <button className='projects_filter_btn' onClick={showDrawer}>
                <FaFilter /> <span>Filters</span>
            </button>
            <Drawer title="" onClose={onClose} open={open}>
                <ProjectsFilterBar />
            </Drawer>
        </>
    );
};
export default ProjectsFilterDrawer;