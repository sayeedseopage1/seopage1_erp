import React from 'react';
import CustomAntdModal from '../../ui/CustomAntdModal';
import PropTypes from "prop-types";

const EditChartDataModal = ({ antdModalOpen, setAntdModalOpen }) => {

    return (
        <div>
            <CustomAntdModal
                title="Ideal Vs Achieved"
                antdModalOpen={antdModalOpen}
                modalWidth={817}
                setAntdModalOpen={setAntdModalOpen}
            >

                <>
                    <div className="modal_point_row">
                        <p>Points: </p>{" "}
                        <span className="text-sm">00</span>
                    </div>
                    <div className="modal_point_row">
                        <p>Total incentive average: </p>{" "}
                        <span className="text-sm">00%</span>
                    </div>
                    <hr />
                    <div className="modal_point_row">
                        <p>Your final points: <span>(00*00)</span></p>{" "}
                        <span className="text-sm">00%</span>
                    </div>
                </>

                <p className="modal_point_note">
                    <span style={{ color: '#FF6666' }}>**</span>If you fail to maintain
                    the minimum incentive slab for any of the criteria, your overall
                    incentive percentage will be zero.{" "}
                </p>
            </CustomAntdModal>
        </div>
    );
};

export default EditChartDataModal;

EditChartDataModal.propTypes = {
    antdModalOpen: PropTypes.bool,
    setAntdModalOpen: PropTypes.func
};