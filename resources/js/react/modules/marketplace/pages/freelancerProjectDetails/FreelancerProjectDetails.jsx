import React from 'react';
import '../../styles/freelancerProjectDetails/freelancerProjectDetails.css'
import ProjectDetailsTab from '../../components/freelancerProjectDetails/ui/ProjectDetailsTab';
import bookmarkIcon from '../../assets/freelancerProjectDetails/bookmark.svg';
import shareIcon from '../../assets/freelancerProjectDetails/shareIcon.svg'
import { useLocation } from 'react-router-dom';
import Switch from '../../../../global/Switch';
import ProjectDetails from '../../components/freelancerProjectDetails/sections/ProjectDetails';
import Proposals from '../../components/freelancerProjectDetails/sections/Proposals';
import Payment from '../../components/freelancerProjectDetails/sections/Payment';
import Files from '../../components/freelancerProjectDetails/sections/Files';
import Tasklists from '../../components/freelancerProjectDetails/sections/Tasklists';

const FreelancerProjectDetails = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const activeTab = searchParams.get('tab') || 'Details';

    return (
        <div className='sp1_marketplace_page_wrapper'>
            <div>
                <div className='p_d_header'>
                    <div className='p_d_header_title_wrapper'>
                        <h2 className='p_d_header_title'>Modern Roofing Solutions Online</h2>
                        <span className='p_d_header_title_badge'>Accepted</span>
                    </div>
                    <div className='p_d_header_bids_amount_wrapper'>
                        <div>
                            <p className='p_d_header_bids_amount_title'>Bids</p>
                            <span className='p_d_header_bids_amount'>59</span>
                        </div>
                        <div>
                            <p className='p_d_header_bids_amount_title'>Average bid</p>
                            <span className='p_d_header_bids_amount'>$168 USD</span>
                        </div>
                    </div>
                </div>
                <div className='sp1_marketplace_section_wrapper'>
                    <div className='p_d_tab_wrapper'>
                        <ProjectDetailsTab isAwarded={true} />
                        <div className='p_d_tab_action_wrapper'>
                            <button className='bg-transparent'>
                                <img src={bookmarkIcon} alt="bookmarkIcon" />
                            </button>
                            <button className='bg-transparent'>
                                <img src={shareIcon} alt="shareIcon" />
                            </button>
                        </div>
                    </div>
                    <div className=''>
                        <Switch>
                            <Switch.Case condition={activeTab === 'Details'}>
                                <ProjectDetails />
                            </Switch.Case>
                            <Switch.Case condition={activeTab === 'Proposals'}>
                                <Proposals />
                            </Switch.Case>
                            <Switch.Case condition={activeTab === 'Payment'}>
                                <Payment />
                            </Switch.Case>
                            <Switch.Case condition={activeTab === 'Files'}>
                                <Files />
                            </Switch.Case>
                            <Switch.Case condition={activeTab === 'Task-lists'}>
                                <Tasklists />
                            </Switch.Case>
                        </Switch>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FreelancerProjectDetails;