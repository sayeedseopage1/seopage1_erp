import React, { useState } from 'react';
import '../../styles/listOfMilestones/listOfMilestones.css'
import ListOfMilestonesTable from '../../components/listOfMilestones/sections/ListOfMilestonesTable';
import { ConfigProvider, Select } from 'antd';
import MarketPlaceTableLoader from '../../components/loader/MarketPlaceTableLoader';

const ListOfMileStones = () => {
    const [activeFilterTab, setActiveFilterTab] = useState('incoming');
    // TODO: this loader state come from api later 
    const [isMilestoneDataLoading, setIsMilestoneDataLoading] = useState(false);

    return (
        <ConfigProvider
            theme={{
                components: {
                    Table: {
                        headerBg: 'transparent',
                    },
                    Select: {
                        selectorBg: '#1492E6',
                    },
                },
            }}
        >
            <div className='sp1_marketplace_page_wrapper'>
                <div className='sp1_marketplace_section_wrapper list_of_milestones_page_wrapper'>
                    <div className='list_of_milestones_header'>
                        <button className='list_of_milestones_btn'>Create Milestone Payment</button>
                        <div className='list_of_milestones_btn_wrapper'>
                            <button onClick={() => setActiveFilterTab('incoming')} className={activeFilterTab === 'incoming' ? 'list_of_milestones_btn' : 'list_of_milestones_btn_outline'}>Incoming(145)</button>
                            <button onClick={() => setActiveFilterTab('outgoing')} className={activeFilterTab === 'outgoing' ? 'list_of_milestones_btn' : 'list_of_milestones_btn_outline'}>Outgoing(14)</button>
                        </div>
                    </div>
                    <div className='list_of_milestones_body list_of_milestones_table_wrapper'>
                        {
                            isMilestoneDataLoading ? <MarketPlaceTableLoader tableCol={6} prevItemLength={10} /> : <ListOfMilestonesTable />
                        }
                        <div>
                            <Select
                                className='list_of_milestones_show_pages_select'
                                defaultValue="50"
                                style={{
                                    width: 120,
                                }}
                                // onChange={handleChange}
                                options={[
                                    {
                                        value: '10',
                                        label: 'Show 10',
                                    },
                                    {
                                        value: '20',
                                        label: 'Show 20',
                                    },
                                    {
                                        value: '50',
                                        label: 'Show 50',
                                    },
                                    {
                                        value: '100',
                                        label: 'Show 100',
                                    },
                                ]}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </ConfigProvider>
    );
};

export default ListOfMileStones;