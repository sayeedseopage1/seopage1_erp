import { Table, Tooltip } from 'antd';
import React from 'react';
import { bid_insights_Data } from '../../../constants/bids';
import greenCircle from '../../../assets/bigInsights/green_circle.png';
import eyeIcon from '../../../assets/bigInsights/eye.png';
import tagUserIcon from '../../../assets/bigInsights/tag-user.svg';
import checkIcon from '../../../assets/bigInsights/check-1.png';
import starIcon from '../../../assets/bigInsights/pink-star.svg';
import blackStarIcon from '../../../assets/bigInsights/black-star.svg';
import messageIcon from '../../../assets/bigInsights/orange-message.svg';
import blackMessageIcon from '../../../assets/bigInsights/black-message.svg';
import blackCircle from '../../../assets/bigInsights/black-circle.svg';

const BidInsightsTable = () => {

    const columns = [
        {
            title: 'Project',
            dataIndex: 'project',
            key: 'project',
            width: "260px",
            render: (text) => (
                <Tooltip placement="topLeft" title={text}>
                    <div className='sp1_marketplace_default_text bid_insights_project_name'>
                        <img src={greenCircle} alt="greenCircle" />
                        <span>{text?.length > 20 ? text?.slice(0, 20) + '...' : text}</span>
                    </div>
                </Tooltip>
            ),
        },
        {
            title: 'Time to bid',
            dataIndex: 'time_to_bid',
            key: 'time_to_bid',
            width: "258px",
            render: (text) => <div className='sp1_marketplace_default_text'>{text}</div>,
        },
        {
            title: 'Bid Rank',
            dataIndex: 'bid_rank',
            key: 'bid_rank',
            render: (text) => <div className='sp1_marketplace_default_text'>{text}</div>,
        },
        {
            title: 'Winning Bid',
            dataIndex: 'winning_bid',
            key: 'winning_bid',
            align: "center",
            render: (text) => <div className='sp1_marketplace_default_text'>{`${text ? text : "-"}`}</div>,
        },
        {
            title: 'Your Bid',
            dataIndex: 'your_bid',
            key: 'your_bid',
            align: "center",
            render: (text, record) => <div className='sp1_marketplace_default_text'>{`${record?.currency?.symbol}${text} ${record?.currency?.code}`}</div>,
        },
        {
            title: 'Actions Taken',
            key: 'action',
            align: "center",
            render: (_) => <div className='bid_insights_actions'>
                <button><img src={eyeIcon} alt="eye" /></button>
                <button><img src={tagUserIcon} alt="tag" /></button>
                <button><img src={checkIcon} alt="check" /></button>
            </div>,
        },
        {
            title: 'Client Information',
            dataIndex: 'client_info',
            key: 'client_info',
            render: (text, record) => <div className='sp1_marketplace_default_text bid_insights_client_info'>
                <img src={`/flags/4x3/${text?.location?.iso}.svg`} className='info_with_icon_img' alt={text?.location?.country} />
                <div className='bid_insights_client_info_inner'>
                    <img src={text?.average_rating ? starIcon : blackStarIcon} alt="star icon" />
                    <span>{`${text?.average_rating ? text?.average_rating : " - "}`}</span>
                </div>
                <div className='bid_insights_client_info_inner'>
                    <img src={!record?.chat_initiated ? blackMessageIcon : messageIcon} alt="messageIcon" />
                    <span>{text?.reviews_count}</span>
                </div>
            </div>,
        },
        {
            title: 'Chat Initiated',
            dataIndex: 'chat_initiated',
            key: 'chat_initiated',
            render: (text) => <div className='sp1_marketplace_default_text'>
                <button className='bid_insights_chat_btn'><img src={!text ? blackCircle : greenCircle} style={{ width: '8px', height: '8px' }} alt="circle" /> <span>Chat</span></button>
            </div>,
        },
    ];

    const rowClassName = (_record, index) => (index % 2 === 0 ? 'table-row-odd' : '');

    return (
        <Table
            rowKey="id"
            columns={columns}
            dataSource={bid_insights_Data}
            scroll={{ x: 1200 }}
            pagination={false}
            rowClassName={rowClassName}
        />
    );
};

export default BidInsightsTable;