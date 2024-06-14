import React from 'react';
import '../../../styles/freelancerProjectDetails/projectDetails.css'

const htmlContent = `
  <div>
    <p>I'm looking for a skilled designer to create a layout for my website that targets professionals and businesses.</p>
    <strong>Key Points:</strong>
    <ul>
      <li>I need a professional and clean design that resonates with my target audience.</li>
      <li>The layout should be user-friendly, easy to navigate, and create a positive impression for visitors.</li>
      <li>The design should be versatile to accommodate various content types and call-to-actions.</li>
    </ul>
    <strong>Ideal Skills:</strong>
    <ul>
      <li>Proven experience in website design, particularly for business-focused sites.</li>
      <li>Ability to create designs that are both aesthetically pleasing and functional.</li>
      <li>Understanding of user experience principles to create a layout that is easy and intuitive to use.</li>
    </ul>
  </div>
`;

const ProjectDetails = () => {
    return (
        <div className='p_d_wrapper'>
            <div>
                <div className='p_d_content_wrapper'>
                    <div className='p_d_title_wrapper'>
                        <h4 className='p_d_title_600'>Project Details:</h4>
                        <h4 className='p_d_title_600'>$250.00-750.00 USD</h4>
                    </div>
                    <div dangerouslySetInnerHTML={{ __html: htmlContent }}></div>
                </div>
                <div className='p_d_content_wrapper'></div>
            </div>
            <div className='p_d_content_wrapper'></div>
        </div>
    );
};

export default ProjectDetails;