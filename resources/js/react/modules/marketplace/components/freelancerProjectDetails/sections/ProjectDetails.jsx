import React from 'react';
import '../../../styles/freelancerProjectDetails/projectDetails.css'
import { dummy_projects } from '../../../constants/projects';
import flagIcon from '../../../assets/freelancerProjectDetails/flag.svg';
import { Input } from 'antd';
import InfoWithIconTitle from '../ui/InfoWithIconTitle';
import moment from 'moment';
import { FaLocationDot, FaUser } from "react-icons/fa6";
import { GoClockFill } from "react-icons/go";
import { MdPeopleAlt } from "react-icons/md";
import { IoPersonAdd } from "react-icons/io5";
import { RiComputerFill } from "react-icons/ri";
import { PiIdentificationCardFill } from "react-icons/pi";
import { HiMiniShieldCheck } from "react-icons/hi2";
import { PiShoppingBagOpenBold } from "react-icons/pi";
import { TbMailFilled } from "react-icons/tb";
import { IoCall } from "react-icons/io5";
import ClientInfoCard from '../ui/ClientInfoCard';
import FractionalRating from '../../commonComponents/FractionalRating';
import { BiSolidCommentDots } from "react-icons/bi";

const { TextArea } = Input;

// #058430

const ProjectDetails = () => {
  //!! TODO: This is used development only for now, It should be removed in production
  const singleProject = dummy_projects[0];

  const { id, project_id, title, description, details, currency, budget_range, highest_bid_amount, bids_count, average_rating, reviews_count, skills, client_info, created_at, updated_at } = singleProject || {};

  const { profile_image_url, name, location, member_since, client_engagement, client_verification } = client_info || {};

  return (
    <div className='p_d_wrapper'>
      <div className='p_d_content_left'>
        <div className='p_d_content_wrapper'>
          <div className='p_d_title_wrapper'>
            <h4 className='p_d_title_600'>Project Details:</h4>
            <h4 className='p_d_title_600'>{budget_range} {currency}</h4>
          </div>
          {/* project details content */}
          <div className='p_d_wrapper' dangerouslySetInnerHTML={{ __html: details }}></div>
          {/* project details skills */}
          <div className='p_d_skills_wrapper'>
            <div className='p_d_title_wrapper'>
              <h4 className='p_d_title_600'>Skills Required:</h4>
            </div>
            <div className='p_d_skills_contents'>
              {skills.map((skill, index) => (
                <div className='p_d_skill' key={index}>
                  <span className='p_d_skill_text'>{skill}</span>
                </div>
              ))}
            </div>
          </div>
          {/* project details footer */}
          <div className='p_d_footer_wrapper'>
            <div className='p_d_title_wrapper'>
              <div className='sp1_marketplace_default_text'>Project ID: {project_id}</div>
              <button className='p_d_report_btn'>
                <img src={flagIcon} alt="flagIcon" />
                <p>Report Project</p>
              </button>
            </div>
            <div className='p_d_scam_alert_wrapper'>
              <p className='sp1_marketplace_default_text mb-1'>Beware of scams</p>
              <p className='sp1_marketplace_default_text'>If you are being asked to pay a security deposit, or if you are being asked to chat on Telegram, WhatsApp, or another messaging platform,
                it is likely a scam. Report these projects or contact Support for assistance.
              </p>
              <button className='p_d_scam_alert_btn'>Learn more</button>
            </div>
          </div>
        </div>
        {/* project details clarification board */}
        <div className='p_d_content_wrapper'>
          <div className='p_d_title_wrapper'>
            <h4 className='p_d_title_600'>Clarification Board:</h4>
            <h4 className='sp1_marketplace_default_text'>No spam, self-promotion or advertisement is permitted.</h4>
          </div>
          <div className='p_d_clarification_board'>
            <img className='p_d_client_image' src={profile_image_url} alt={name} />
            <div className='p_d_clarification_board_input'>
              <TextArea
                placeholder="Ask a question....."
                autoSize={{ minRows: 2, maxRows: 6 }}
                className='message_input'
              />
            </div>
          </div>
        </div>
      </div>
      {/* about client  */}
      <div className='p_d_content_wrapper p_d_content_right'>
        <ClientInfoCard title="About the Client">
          <InfoWithIconTitle icon={<FaLocationDot />} title={location?.city} />
          <InfoWithIconTitle img_url={`/flags/4x3/${location?.iso}.svg`} title={location?.country} />
          <div className='d-flex align-items-center'>
            <div className='d-flex align-items-center mr-2'>
              <FaUser className='mr-1' />
              <div className='project_card_rating'>
                <FractionalRating stop={5} value={client_info?.average_rating} />
                <p>{client_info?.average_rating}</p>
              </div>
            </div>
            <div className='project_card_rating'>
              <BiSolidCommentDots className='mr-1' />
              <p>{reviews_count}</p>
            </div>
          </div>
          <InfoWithIconTitle icon={<GoClockFill />} title={`Member since ${moment(member_since).format('MMM DD, YYYY')}`} />
        </ClientInfoCard>

        <ClientInfoCard title="Client Engagement">
          <InfoWithIconTitle icon={<MdPeopleAlt />} title={`Contacted ${client_engagement?.contracted_freelancer} freelancers`} />
          <InfoWithIconTitle icon={<IoPersonAdd />} title={`Invited ${client_engagement?.invite_freelancer} freelancers to bid`} />
          <InfoWithIconTitle icon={<RiComputerFill />} title={`Completed ${client_engagement?.completed_project} projects`} />
        </ClientInfoCard>

        <ClientInfoCard title="Client Verification">
          <InfoWithIconTitle icon={<PiIdentificationCardFill color={client_verification?.identity_verified ? '#058430' : '#000'} />} title={`Identify verified`} />
          <InfoWithIconTitle icon={<HiMiniShieldCheck color={client_verification?.payment_verified ? '#058430' : '#000'} />} title={`Payment verified`} />
          <InfoWithIconTitle icon={<PiShoppingBagOpenBold color={client_verification?.deposit_made ? '#058430' : '#000'} />} title={`Deposit made`} />
          <InfoWithIconTitle icon={<TbMailFilled color={client_verification?.email_verified ? '#058430' : '#000'} />} title={`Email verified`} />
          <InfoWithIconTitle icon={<FaUser color={client_verification?.profile_completed ? '#058430' : '#000'} />} title={`Profile completed`} />
          <InfoWithIconTitle icon={<IoCall color={client_verification?.phone_verified ? '#058430' : '#000'} />} title={`Phone verified`} />
        </ClientInfoCard>
      </div>
    </div>
  );
};

export default ProjectDetails;