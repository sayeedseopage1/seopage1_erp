import React, { useEffect } from 'react';
import CustomAntdModal from '../ui/CustomAntdModal';
import { useDispatch, useSelector } from 'react-redux';
import { regularPointAverage } from '../../../../../services/features/Pm-Sales/PmIncentiveSlice';

const AveragePointModal = ({ antdModalOpen, setAntdModalOpen, item: statsInfoData }) => {
    const dispatch = useDispatch();
    const pmIncentive = useSelector((state) => state.pmIncentive)
    // Destructure incentive_criterias from statsInfoData, or set it to an empty object if statsInfoData is undefined
    const { incentive_criterias } = statsInfoData || {};

    useEffect(() => {
        // Only run the effect if incentive_criterias is defined
        if (incentive_criterias) {
            // Calculate the total incentive by summing up the obtained_incentive of each item
            const totalIncentive = incentive_criterias?.reduce((acc, item) => acc + parseFloat(item?.obtained_incentive), 0);
            // Check if there is any item with an obtained_incentive less than or equal to 0
            const failMinimumSlab = incentive_criterias?.some((item) => parseFloat(item?.obtained_incentive) <= 0);

            // If any item failed the minimum slab, set average points to 0, otherwise calculate the average
            if (failMinimumSlab) {
                dispatch(regularPointAverage(0));
            } else {
                dispatch(regularPointAverage(totalIncentive / incentive_criterias?.length));
            }
        }
    }, [incentive_criterias]); // Depend on incentive_criterias and setAveragePoints

    return (
        <div>
            {/* Render a custom Ant Design modal with the title "Total incentive average:" */}
            <CustomAntdModal
                title="Total incentive average:"
                antdModalOpen={antdModalOpen}
                setAntdModalOpen={setAntdModalOpen}
            >
                <div style={{ marginTop: '32px' }}>
                    {/* Map over incentive_criterias and render each item's title and obtained_incentive */}
                    {incentive_criterias?.map((item) => (
                        <div key={item?.id} className="modal_point_row">
                            <p>{item?.title}: </p>{" "}
                            {/* Apply a class based on whether the obtained_incentive is positive or not */}
                            <span className={`${parseFloat(item?.obtained_incentive) > 0 ? 'progress_card_desc_pos' : 'progress_card_desc_neg'}`}>
                                {parseFloat(item?.obtained_incentive)}%
                            </span>
                        </div>
                    ))}
                    <hr />
                    {/* Render the total incentive average calculation */}
                    <div className="modal_point_row">
                        <p>Total incentive average:
                            <span>
                                ({incentive_criterias?.map(item => `${parseFloat(item?.obtained_incentive)}%`).join(' + ')})
                                / {incentive_criterias?.length}
                            </span>
                        </p>
                        {/* Apply a class based on whether the averagePoints is positive or not */}
                        <span className={`${pmIncentive?.regularPointAverage > 0 ? 'progress_card_desc_pos' : 'progress_card_desc_neg'}`}>{pmIncentive?.regularPointAverage}%</span>
                    </div>
                </div>
                {/* Render a note about the incentive slab rule */}
                <p className="modal_point_note">
                    <span style={{ color: '#FF6666' }}>**</span>For regular points, if you fail to maintain the minimum incentive slab for any of the criteria, your overall incentive percentage will be zero
                </p>
            </CustomAntdModal>
        </div>
    );
};

export default AveragePointModal;
