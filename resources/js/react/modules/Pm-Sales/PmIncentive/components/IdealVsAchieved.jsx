import React from 'react';
import '../styles/IdealVsAchieved.css'

const IdealVsAchieved = () => {
    return (
        <div className='ideal_vs_achieved_wrapper'>
            <p className="section_title">
                Ideal vs achieved :
            </p>
            {/* revesion task ratio */}
            <div className="chart_row_wrapper">
                {/* chart 1  */}
                <div className="chart_wrapper">
                    Revision Task Bar Chart will added here
                </div>
                {/* chart 2  */}
                <div className="chart_wrapper">
                    Revision Task Thik Chart will added here
                </div>
            </div>
        </div>
    );
};

export default IdealVsAchieved;