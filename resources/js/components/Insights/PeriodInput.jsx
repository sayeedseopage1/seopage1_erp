import { useState } from "react";
import Input from "../UI/form/Input";

// period input
const PeriodInput = ({ handleRecurringChange, period }) => {
    const [value, setValue] = useState("");
    const onChange = (e) => {
        e.preventDefault();
        setValue(e.target.value);
    };

    const onBlur = (e) => {
        e.preventDefault();
        console.log(value);
        handleRecurringChange(value, period);
    };

    return (
        <Input
            type="number"
            value={value}
            className="sp1_sell_df--period-input"
            onChange={onChange}
            placeholder="Insert value"
            onBlur={onBlur}
        />
    );
};

export default PeriodInput;
