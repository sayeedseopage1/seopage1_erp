import { Select } from 'antd';
import userIcon from '../../assets/tag-user.svg'
import { Placeholder } from '../../../../../global/Placeholder';

const EmployeeFilter = ({ depAndEmployees, handleChange }) => {
    return (
        <div className='point_selector_container'>
            <div className='point_selector_label_container'>
                <img src={userIcon} alt="User Icon" style={{ width: '17px', height: '17px', marginBottom: '4px' }} />
                <span className='point_selector_label'>Employee:</span>
            </div>
            {
                isFetching ? <div className='ml-1'><Placeholder width="100px" height={18} /></div> : <Select
                    className='points_selector'
                    // defaultValue={{ value: 1, label: 'Web Development' }}
                    style={{ width: 150 }}
                    onChange={handleChange}
                    options={depAndEmployees?.department?.map(item => ({
                        value: item?.id,
                        label: item?.team_name,
                        key: item?.id
                    }))}
                />
            }

        </div>
    );
};

export default EmployeeFilter;