import { Select } from 'antd';
import userIcon from '../../assets/tag-user.svg'
import { Placeholder } from '../../../../../global/Placeholder';

const EmployeeFilter = ({ pmByDeptData, handleChange, isFetching }) => {

    return (
        <div className='point_selector_container'>
            <div className='point_selector_label_container'>
                <img src={userIcon} alt="User Icon" style={{ width: '17px', height: '17px' }} />
                <span className='point_selector_label'>Employee:</span>
            </div>
            {
                isFetching ? <div className='ml-1'><Placeholder width="100px" height={18} /></div> : pmByDeptData?.length > 0 ? <Select
                    className='points_selector'
                    defaultValue={{ value: pmByDeptData[0]?.id, label: pmByDeptData[0]?.name }}
                    style={{ width: 120 }}
                    onChange={handleChange}
                    options={pmByDeptData?.map(item => ({
                        value: item?.id,
                        label: item?.name,
                        key: item?.id
                    }))}
                /> : <div className='ml-1 point_selector_item' style={{ color: '#ff0000' }}>No employee found</div>
            }

        </div>
    );
};

export default EmployeeFilter;