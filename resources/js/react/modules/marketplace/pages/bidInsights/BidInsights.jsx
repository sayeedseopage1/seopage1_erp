import React from 'react';
import '../../styles/bidInsights/bidInsights.css'
import { ConfigProvider } from 'antd';
import BidInsightsTable from '../../components/bidInsights/sections/BidInsightsTable';

const BidInsights = () => {
    return (
        <ConfigProvider
            theme={{
                components: {
                    Table: {
                        headerBg: 'transparent',
                    },
                },
            }}
        >
            <div className='sp1_marketplace_page_wrapper'>
                <div className='sp1_marketplace_section_wrapper list_of_milestones_page_wrapper'>
                    <div className='list_of_milestones_body list_of_milestones_table_wrapper'>
                        <BidInsightsTable />
                    </div>
                </div>
            </div>
        </ConfigProvider>
    );
};

export default BidInsights;