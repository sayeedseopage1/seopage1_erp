import "../styles/Incentive.css"
import pointIcon from '../assets/pointIcon.svg'
import takaIcon from '../assets/takaIcon.svg'
import IncentiveEditButton from "./ui/IncentiveEditButton";

const obtainPoints = [
    {
        id: 1,
        title: 'Your obtained points',
        value: 500,
        value_type: 'point'
    },
    {
        id: 2,
        title: 'Cash value for every regular point',
        value: 600,
        value_type: 'taka'
    }
]

const PointBanner = () => {
    return (
        <div className="point_banner">
            {
                obtainPoints?.map(item => (
                    <div key={item?.id} className="point_card">
                        <span className="point_card_image_wrapper">
                            <img src={`${item?.value_type == 'point' ? pointIcon : takaIcon}`} style={{ width: "24px", height: "24px" }} alt="pointIcon" />
                        </span>
                        <div className="">
                            <p className='point_title point_details_wrapper'>
                                {item?.title}: <span className='point_score'>{item?.value} {item?.value_type == 'point' ? 'pt' : 'Taka'}</span>
                                {
                                    item?.value_type == 'point' ? '' :

                                        <IncentiveEditButton className={`chart_button`}>Edit</IncentiveEditButton>
                                }
                            </p>

                        </div>
                    </div>
                ))
            }
        </div>
    );
};

export default PointBanner;