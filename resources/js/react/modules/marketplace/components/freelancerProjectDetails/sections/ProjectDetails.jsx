import React from 'react';
import '../../../styles/freelancerProjectDetails/projectDetails.css'
import { dummy_projects } from '../../../constants/projects';
import flagIcon from '../../../assets/freelancerProjectDetails/flag.svg';

const ProjectDetails = () => {
  //!! TODO: This is used development only for now, It should be removed in production
  const singleProject = dummy_projects[0];

  const { id, project_id, title, description, details, currency, budget_range, highest_bid_amount, bids_count, average_rating, reviews_count, skills, created_at, updated_at } = singleProject || {};

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
          </div>
        </div>
        <div className='p_d_content_wrapper'>
          bottom section
        </div>
      </div>
      <div className='p_d_content_wrapper p_d_content_right'> side bar</div>
    </div>
  );
};

export default ProjectDetails;