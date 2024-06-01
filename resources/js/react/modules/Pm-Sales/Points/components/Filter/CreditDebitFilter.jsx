import { Select } from 'antd';
import cardIcon from '../../assets/card.svg'

const CreditDebitFilter = ({ handleChange }) => {
    const creditOrDebit = [
        {
            id: 0,
            value: '',
            label: 'All'
        },
        {
            id: 1,
            value: 1,
            label: 'Point Earned'
        },
        {
            id: 2,
            value: 2,
            label: 'Point Lost'
        }
    ];

    return (
        <div className='point_selector_container'>
            <div className='point_selector_label_container'>
                <img src={cardIcon} alt="User Icon" style={{ width: '17px', height: '17px' }} />
                <span className='point_selector_label'>Credit/Debit:</span>
            </div>
            {
                creditOrDebit?.length > 0 ? <Select
                    className='points_selector'
                    defaultValue={{ value: creditOrDebit[0]?.value, label: creditOrDebit[0]?.label }}
                    style={{ width: 100 }}
                    popupMatchSelectWidth={false}
                    onChange={handleChange}
                    options={creditOrDebit?.map(item => ({
                        value: item?.value,
                        label: item?.label,
                        key: item?.id
                    }))}
                /> : <div className='ml-1 point_selector_item' style={{ color: '#ff0000' }}>Not found</div>
            }
        </div>
    );
};

export default CreditDebitFilter;