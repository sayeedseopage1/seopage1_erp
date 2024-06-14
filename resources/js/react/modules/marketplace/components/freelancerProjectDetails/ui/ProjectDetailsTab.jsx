import { Tabs } from 'antd';
import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';


const items = [
    {
        key: 'Details',
        label: 'Details',
    },
    {
        key: 'Proposals',
        label: 'Proposals',
    },
    {
        key: 'Payment',
        label: 'Payment',
    },
    {
        key: 'Files',
        label: 'Files',
    },
    {
        key: 'Task-lists',
        label: 'Task lists',
    },
];

const ProjectDetailsTab = ({ isAwarded }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const searchParams = new URLSearchParams(location.search);
    const activeTab = searchParams.get('tab') || 'Details';

    useEffect(() => {
        // If the URL doesn't have the 'tab' parameter, set it to 'Details' by default
        if (!searchParams.get('tab')) {
            navigate(`/?tab=Details`, { replace: true });
        }
    }, [navigate, searchParams]);

    const onChange = (key) => {
        navigate(`/?tab=${key}`);
    };
    return (
        <Tabs activeKey={activeTab} items={items} onChange={onChange} />
    );
};

export default ProjectDetailsTab;