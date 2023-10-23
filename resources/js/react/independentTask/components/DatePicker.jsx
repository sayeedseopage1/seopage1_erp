import React from "react";
import { useEffect } from "react";

const DatePicker = ({ data, setDate, className="" }) => {
    const handleTimePicker = () => {
        if (window.$) {
            let $ = window.$;
            let moment = window.moment;
            $(function () {
                let start = moment().startOf("month");
                let end = moment().endOf("month");
                setDate(start.format());

                function cb(start, end) {
                    setDate(start.format("YYYY-MM-DD"));
                    $("#datePicker div.sp1__jquery_date_text").html(
                        start.format("MMMM D, YYYY")
                    );
                }

                $("#datePicker").daterangepicker(
                    {
                        singleDatePicker: true
                    },
                    cb
                );

                cb(start, end);
            });
        }
    };

    useEffect(() => {
        handleTimePicker();
    }, []);

    return (
        <div
            id="datePicker"
            className={`sp1__jquery_date_picker ${className}`}
            style={{ position: "relative" }}
        >
            <div className="sp1__jquery_date_btn">
                <i className="fa-solid fa-calendar-days"></i>
            </div>
            <div className="sp1__jquery_date_text"></div>
        </div>
    );
};

export default DatePicker;
