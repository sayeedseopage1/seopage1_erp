import React from 'react';
import CustomAntdModal from '../../ui/CustomModal/CustomAntdModal';
import { statsInfoData } from '../../constants';

const AveragePointModal = ({ antdModalOpen, setAntdModalOpen }) => {

    return (
        <div>
            <CustomAntdModal
                title="Total incentive average:"
                antdModalOpen={antdModalOpen}
                setAntdModalOpen={setAntdModalOpen}
            >
                <>
                    {
                        statsInfoData?.stats_info?.map((item) => <div className="modal_point_row">
                            <p>{item?.title}: </p>{" "}
                            <span className="text-sm">{item?.achieved}%</span>
                        </div>)
                    }
                    <hr />
                    <div className="modal_point_row">
                        <p>Total incentive average: <span>(80% +00%+ 100%+29%+03%+100%+80%+80%) /3</span></p>{" "}
                        <span className="text-sm">00%</span>
                    </div>
                </>

                <p className="modal_point_note">
                    <span style={{ color: '#FF6666' }}>**</span>For regular points, if you fail to maintain the minimum incentive slab for any of the criteria, your overall incentive percentage will zero
                </p>
            </CustomAntdModal>
        </div>
    );
};

export default AveragePointModal;