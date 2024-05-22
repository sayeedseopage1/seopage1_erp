import "../../../styles/Incentive.css"
import pointIcon from '../../../assets/pointIcon.svg'
import takaIcon from '../../../assets/takaIcon.svg'
import IncentiveEditButton from "../../ui/IncentiveEditButton";
import CashValuePointEditModal from "../../Modals/Incentives/CashValuePointEditModal";
import { useState } from "react";
import { Placeholder } from "../../../../../../global/Placeholder";
import useIncentiveTypes from "../../../hooks/useIncentiveTypes";
import { auth } from "../../../constants";

const PointBanner = () => {
    const [editPointDataModalOpen, setEditPointDataModalOpen] = useState(false);
    const { allIncentiveTypes, regularIncentiveTypes, incentiveTypesLoading } = useIncentiveTypes();

    return (
        <div className="point_banner">
            <div className="point_card">
                <span className="point_card_image_wrapper">
                    <img src={pointIcon} style={{ width: "24px", height: "24px" }} alt="pointIcon" />
                </span>
                <p className='point_title point_details_wrapper'>
                    Your obtained points: <span className='point_score'>{parseFloat(allIncentiveTypes?.data?.total_points)} pt</span> &nbsp;
                </p>
            </div>

            <div className="point_card">
                <span className="point_card_image_wrapper">
                    <img src={takaIcon} style={{ width: "24px", height: "24px" }} alt="takaIcon" />
                </span>
                {incentiveTypesLoading ? <Placeholder width="60%" height={28} /> :
                    <p className='point_title point_details_wrapper'>
                        Cash value for every regular point: <span className='point_score'>
                            {regularIncentiveTypes?.cash_value} Taka
                        </span> &nbsp; {auth?.isHasRolePermission(1) && (
                            <IncentiveEditButton onClick={() => setEditPointDataModalOpen(true)} className="chart_button">
                            </IncentiveEditButton>
                        )}
                    </p>
                }
            </div>
            <CashValuePointEditModal regularIncentiveTypes={regularIncentiveTypes} antdModalOpen={editPointDataModalOpen} setAntdModalOpen={setEditPointDataModalOpen} />
        </div>
    );
};

export default PointBanner;