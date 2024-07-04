import React, { useState } from 'react';
import '../../styles/bidInsights/bidInsights.css'
import { ConfigProvider } from 'antd';
import BidInsightsTable from '../../components/bidInsights/sections/BidInsightsTable';
import MarketPlaceTableLoader from '../../components/loader/MarketPlaceTableLoader';

const BidInsights = () => {
    // TODO: it will be updated in future by api
    const [isBidInsightsTableLoading, setIsBidInsightsTableLoading] = useState(false);
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
                        {
                            isBidInsightsTableLoading ? <MarketPlaceTableLoader tableCol={8} prevItemLength={8} /> : <BidInsightsTable />
                        }
                    </div>
                </div>
            </div>
        </ConfigProvider>
    );
};

export default BidInsights;