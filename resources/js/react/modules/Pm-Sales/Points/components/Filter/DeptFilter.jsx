import { Select } from 'antd';
import userIcon from '../../assets/group1.svg'
import { Placeholder } from '../../../../../global/Placeholder';

const DeptFilter = ({ department, handleChange, isFetching }) => {
    return (
        <div className='point_selector_container'>
            <div className='point_selector_label_container'>
                <img src={userIcon} alt="User Icon" style={{ width: '17px', height: '17px', marginBottom: '4px' }} />
                <span className='point_selector_label'>Department:</span>
            </div>
            {
                isFetching ? <div className='ml-1'><Placeholder width="100px" height={18} /></div> : department?.length > 0 ? <Select
                    className='points_selector'
                    defaultValue={{ value: 1, label: 'Web Development' }}
                    style={{ width: 150 }}
                    popupMatchSelectWidth={false}
                    onChange={handleChange}
                    options={department?.map(item => ({
                        value: item?.id,
                        label: item?.team_name,
                        key: item?.id,
                        disabled: item?.id != 1
                    }))}
                /> : <div className='ml-1 point_selector_item' style={{ color: '#ff0000' }}>No department found</div>
            }
        </div>
    );
};

export default DeptFilter;