import * as React from 'react'
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import { Icon } from '../utils/Icon';
import Dropdown from '../ui/Dropdown';
import Button from '../ui/Button';
import RangeDatePicker from '../ui/RangeDatePicker';
import RelativeTimePeriod from './RelativeTimePeriod';
import _ from 'lodash';



const PeriodFilter = ({filterValue, setFilterValue}) => {
    const [title, setTitle] = React.useState('Period');
    const [endDate, setEndDate] = React.useState(new Date());
    const [startDate, setStartDate] = React.useState(new Date());
    const [selectedPeriod, setSelectedPeriod] = React.useState('Today');


    // handle relative time period
    const handleRelativeTimePeriod = (value) => {
        setTitle(value);
        setSelectedPeriod(value);
        if ( value === 'Today'){
            setFilterValue({
                start: dayjs().startOf('day').format(),
                end: dayjs().endOf('day').format(),
            });
        }else if ( value === 'Yesterday'){
            setFilterValue({
                start: dayjs().subtract(1, 'day').startOf('day').format(),
                end: dayjs().subtract(1, 'day').endOf('day').format(),
            });
        }else if ( value === 'This Week'){
            setFilterValue({
                start: dayjs().startOf('week').format(),
                end: dayjs().endOf('week').format(),
            });
        }else if ( value === 'Last Week'){
            setFilterValue({
                start: dayjs().subtract(1, 'week').startOf('week').format(),
                end: dayjs().subtract(1, 'week').endOf('week').format(),
            });
        }else if ( value === 'This Month'){
            setFilterValue({
                start: dayjs().startOf('month').format(),
                end: dayjs().endOf('month').format(),
            });
        } else if ( value === 'Last Month'){
            setFilterValue({
                start: dayjs().subtract(1, 'month').startOf('month').format(),
                end: dayjs().subtract(1, 'month').endOf('month').format(),
            });
        } else if ( value === 'This Quarter'){
            setFilterValue({
                start: dayjs().startOf('quarter').format(),
                end: dayjs().endOf('quarter').format(),
            });
        } else if ( value === 'Last Quarter'){
            setFilterValue({
                start: dayjs().subtract(1, 'quarter').startOf('quarter').format(),
                end: dayjs().subtract(1, 'quarter').endOf('quarter').format(),
            });
        } else if ( value === 'This Year'){
            setFilterValue({
                start: dayjs().startOf('year').format(),
                end: dayjs().endOf('year').format(),
            });
        } else if ( value === 'Last Year'){
            setFilterValue({
                start: dayjs().subtract(1, 'year').startOf('year').format(),
                end: dayjs().subtract(1, 'year').endOf('year').format(),
            });
        } else if (value == "Last 2 Week"){
            setFilterValue({
                start: dayjs().subtract(2, 'week').startOf('week').format(),
                end: dayjs().subtract(1, 'week').endOf('week').format(),
            });
        } else if (value == "Last 3 Week"){
            setFilterValue({
                start: dayjs().subtract(3, 'week').startOf('week').format(),
                end: dayjs().subtract(1, 'week').endOf('week').format(),
            });
        } else if (value == "Last 4 Week"){
            setFilterValue({
                start: dayjs().subtract(4, 'week').startOf('week').format(),
                end: dayjs().subtract(1, 'week').endOf('week').format(),
            });
        } else if (value === "Last 2 month"){
            setFilterValue({
                start: dayjs().subtract(2, 'month').startOf('month').format(),
                end: dayjs().subtract(1, 'month').endOf('month').format(),
            });
        } else if (value === "Last 3 month"){
            setFilterValue({
                start: dayjs().subtract(3, 'month').startOf('month').format(),
                end: dayjs().subtract(1, 'month').endOf('month').format(),
            });
        } else if (value === "Last 6 month"){
            setFilterValue({
                start: dayjs().subtract(6, 'month').startOf('month').format(),
                end: dayjs().subtract(1, 'month').endOf('month').format(),
            });
        } else if (value === "Last 12 month"){
            setFilterValue({
                start: dayjs().subtract(12, 'month').startOf('month').format(),
                end: dayjs().subtract(1, 'month').endOf('month').format(),
            });
        } 
    };

    // handle custom period
    const remove = () => {
        setFilterValue({});
        setTitle('Period');
        setSelectedPeriod('Today');
    };

    return(
        <div className='cnx__period_filter'>
            <div className='cnx__period_filter__title'>
                <Dropdown>
                    <Dropdown.Toggle 
                        className={`cnx__btn cnx__btn_tertiary  cnx__btn_sm cnx__period_filter__title_btn ${!_.isEmpty(filterValue) ? 'active': ''}`}
                    >
                        <Icon type="Activity" />
                        <span style={{marginRight: '10px'}}>{title}</span>
                    </Dropdown.Toggle>

                    <Dropdown.Menu offset={[0, 8]} className="cnx__period_filter_dd_menu">
                        <RelativeTimePeriod
                            setSelectedPeriod={handleRelativeTimePeriod}
                            selectedPeriod={selectedPeriod}
                        />
                        <div className="cnx_divider" />
                        <RangeDatePicker 
                            startDate={startDate}
                            endDate={endDate}
                            setStartDate={val => {
                                setTitle('Custom Period');
                                setStartDate(val);
                                setEndDate(val);
                                setFilterValue({
                                    start: dayjs(val).startOf('day').format(),
                                    end: dayjs(val).endOf('day').format(),
                                })
                            }}
                            setEndDate={val => {
                                setTitle('Custom Period');
                                setEndDate(val);
                                setFilterValue({
                                    ...filterValue,
                                    end: dayjs(val).endOf('day').format(),
                                })
                            }}
                        />
                    </Dropdown.Menu>
                </Dropdown>
                {!_.isEmpty(filterValue) && 
                    <Button 
                        onClick={remove} variant='tertiary' 
                        className={`cnx__period_filter__title_btn __close ${!_.isEmpty(filterValue) ? 'active': ''}`}
                    >
                        <i className="fa-solid fa-xmark" />
                    </Button>
                }
            </div>
        </div>
    )
}


PeriodFilter.propTypes = {
    filterValue: PropTypes.object,
    setFilterValue: PropTypes.func
}

export default PeriodFilter;