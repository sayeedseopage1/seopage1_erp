import "../styles/Incentive.css"
import pointIcon from '../assets/pointIcon.svg'
import takaIcon from '../assets/takaIcon.svg'

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
                        <div className="point_details_wrapper">
                            <p style={{ fontWeight: "500", fontSize: "18px" }}>{item?.title}:</p>
                            <span style={{ fontWeight: "600", fontSize: "20px" }}>{item?.value} {item?.value_type == 'point' ? 'pt' : 'Taka'}</span>
                        </div>
                    </div>
                ))
            }
        </div>
    );
};

export default PointBanner;