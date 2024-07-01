import React, { useState } from 'react';
import PortfolioDetailsModal from '../modals/PortfolioDetailsModal';

const PortfolioCard = ({ item, profileData }) => {
    const [isPortfolioModalOpen, setIsPortfolioModalOpen] = useState(false);

    const showPortfolioModal = () => {
        setIsPortfolioModalOpen(!isPortfolioModalOpen);
    };

    const { id, thumbnails, skills, category, img_url } = item || {};

    return (
        <div
            className='marketplace_portfolio_item'
        // style={{ backgroundImage: `url(${img_url})`, backgroundPosition: "center", backgroundSize: "cover" }}
        >
            <img onClick={showPortfolioModal} src={img_url} alt="" className='marketplace_portfolio_item_img' style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            <div className='marketplace_portfolio_item_content'>
                <p>{category}</p>
            </div>
            <PortfolioDetailsModal item={item} isOpen={isPortfolioModalOpen} setIsOpen={setIsPortfolioModalOpen} profileData={profileData} />
        </div>
    );
};

export default PortfolioCard;