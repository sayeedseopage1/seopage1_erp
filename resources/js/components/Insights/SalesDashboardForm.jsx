import ReactDatePicker from "react-datepicker";
import Modal from "../UI/Modal";
import Selection from "../UI/form/Selection";
import "react-datepicker/dist/react-datepicker.css";
import './salesDashboardForm.css';
import { forwardRef, useState } from "react";
import Radio from "../UI/form/Radio";
import Input from "../UI/form/Input";
const SalesDashboardForm = () => {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [tracking, setTracking] = useState('value');


    return (
        <div className="sp1_sell_df--container">

            {/* item */}
            <div className="sp1_sell_df--item">
                <div className="sp1_sell_df--title">Assignee</div>
                <div className="sp1_sell_df--control">
                    <Selection />
                    <Selection />
                </div>
            </div>
            {/* end item */}

            {/* item */}
            <div className="sp1_sell_df--item">
                <div className="sp1_sell_df--title">Pipeline</div>
                <div className="sp1_sell_df--control">
                    <Selection />
                </div>
            </div>
            {/* end item */}

            {/* item */}
            <div className="sp1_sell_df--item">
                <div className="sp1_sell_df--title">Frequency</div>
                <div className="sp1_sell_df--control">
                    <Selection />
                </div>
            </div>
            {/* end item */}


            {/* item */}
            <div className="sp1_sell_df--item">
                <div className="sp1_sell_df--title">Frequency</div>
                <div className="sp1_sell_df--control">
                    <ReactDatePicker
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                        selectsStart
                        startDate={startDate}
                        endDate={endDate}
                        selectsDisabledDaysInRange
                        customInput={<DateInput />}
                    />
                    <span>-</span>
                    <ReactDatePicker
                        selected={endDate}
                        onChange={(date) => setEndDate(date)}
                        selectsEnd
                        startDate={startDate}
                        endDate={endDate}
                        minDate={startDate}
                        selectsDisabledDaysInRange
                        customInput={<DateInput />}
                    />
                </div>
            </div>
            {/* end item */}

            {/* item */}
            <div className="sp1_sell_df--item">
                <div className="sp1_sell_df--title">Tracking metric</div>
                <div className="sp1_sell_df--control pt-2">
                    <Radio name="tracking_metric" title="Value" value="value" onChange={(e) => setTracking(e.target.value)} />
                    <Radio name="tracking_metric" title="Count" value="count" onChange={(e) => setTracking(e.target.value)} />
                </div>
            </div>
            {/* end item */}

            {/* item */}
            <div className="sp1_sell_df--item">
                <div className="sp1_sell_df--title">
                    {tracking === 'value' ? 'Value, BDT' : "Count"}
                </div>
                <div className="sp1_sell_df--control">
                    <Input type="number" placeholder="Insert value" />
                </div>
            </div>
            {/* end item */}

        </div>
    )
}


export default SalesDashboardForm;

const DateInput = forwardRef(({ value, onClick }, ref) => (
    <button className="sp1_selection--toggle sp1_sell_df--datepicker" onClick={onClick} ref={ref} style={{ gap: 0 }}>
        {value}
    </button>
));