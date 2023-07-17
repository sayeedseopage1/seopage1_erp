import PropTypes from "prop-types";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
 
const RangeDatePicker = ({startDate, endDate, setStartDate, setEndDate}) => {
   
    return (
        <div className="cnx_range_date_wrapper">
            <div style={{width: '100%'}}>
                <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    selectsStart
                    startDate={startDate}
                    endDate={endDate}
                    className="cnx_range_date"
                />
            </div>
            <div className="cnx_range_date_divider">-</div>
            <div style={{width: '100%'}}>
                <DatePicker
                    selected={endDate}
                    onChange={date => setEndDate(date)}
                    selectsEnd
                    startDate={startDate}
                    endDate={endDate}
                    minDate={startDate}
                    className="cnx_range_date"
                    isClearable ={endDate}
                    clearButtonClassName="cnx_range_date_clear"
                    placeholderText="End date not selected"
                    
                />
            </div>
        </div>
    );
}


RangeDatePicker.propTypes = {
    startDate: PropTypes.instanceOf(Date).isRequired,
    endDate: PropTypes.instanceOf(Date),
    setStartDate: PropTypes.func.isRequired,
    setEndDate: PropTypes.func.isRequired,
}


export default RangeDatePicker;