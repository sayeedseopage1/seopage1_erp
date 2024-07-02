import React, { useState } from 'react';
import { Carousel } from 'antd';
import PortfolioDetailsModal from '../modals/PortfolioDetailsModal';

const ProfilePortfolioSection = ({ portfolio, profileData }) => {
    const [isPortfolioModalOpen, setIsPortfolioModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState({});

    const showPortfolioModal = (item) => {
        setIsPortfolioModalOpen(!isPortfolioModalOpen);
        setSelectedItem(item);
    };
    return (
        <div className='marketplace_profile_portfolio'>
            {portfolio?.map((item) => {
                return <div className="marketplace_portfolio_item" key={item?.id}>
                    <Carousel dots={false} draggable arrows infinite={false} speed={1000}>
                        {item?.thumbnails?.map((thumbnail) => (
                            <div key={thumbnail?.id}>
                                <img onClick={() => showPortfolioModal(item)} className='marketplace_portfolio_item_img' src={thumbnail?.url} alt={`Thumbnail ${thumbnail?.id}`} />

                            </div>
                        ))}
                    </Carousel>
                    <div className='marketplace_portfolio_item_content'>
                        <p>{item?.category}</p>
                    </div>
                    <PortfolioDetailsModal item={selectedItem} isOpen={isPortfolioModalOpen} setIsOpen={setIsPortfolioModalOpen} profileData={profileData} />
                </div>
            })}
        </div>
    );
};

export default ProfilePortfolioSection;