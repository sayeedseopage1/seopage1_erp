/* eslint-disable react/prop-types */
import _ from 'lodash';
import * as React from 'react';


const JqueryDateRangePicker = ({
    startDate,
    endDate,
    setStartDate,
    setEndDate,
    onApply= () => {} 
}) => {

    const handleTimePicker = () => {
        if(window.$){
            let $ = window.$;
            let moment = window.moment;
            // let today = moment().format('D'); 
            
            $(function() {
                let start = moment().subtract(6, 'months');
                let end = moment();
 

                // if(today > 20){
                //     end = moment().add(1, 'months').date(20);
                // }else {
                //     end = moment().date(20);
                // }

                
               setStartDate(start.format());
               setEndDate(end.format()); 

               
                function cb(start, end) {
                    setStartDate(start.format('YYYY-MM-DD'));
                    setEndDate(end.format('YYYY-MM-DD'));
                    onApply && onApply(start.format('YYYY-MM-DD'), end.format('YYYY-MM-DD'));
                    $('#jqueryDatePicker div.sp1__jquery_date_text')
                    .html(start.format('MMM D, YYYY') + ' to ' + end.format('MMM D, YYYY'));
                }

                $('#jqueryDatePicker').daterangepicker({
                    locale: {
                        format: 'MMM D, YYYY',
                        customRangeLabel: "Custom Range",
                        separator: " To ",
                        applyLabel: "Apply",
                        cancelLabel: "Cancel",
                        daysOfWeek: [
                            'Su', 'Mo', 'Tu',
                            'We', 'Th', 'Fr',
                            'Sa'
                        ],
                        monthNames: ['January', 'February',
                            "March", "April",
                            "May",
                            "June", "July",
                            "August",
                            "September", "October",
                            "November", "December"
                        ],
                        firstDay: parseInt("1")
                    },
                    startDate: start,
                    endDate: end,
                    datePicker: true,
                    ranges: {
                    'Today': [moment(), moment()],
                    'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
                    'Last 7 Days': [moment().subtract(6, 'days'), moment()],
                    'Last 30 Days': [moment().subtract(29, 'days'), moment()],
                    'This Month': [moment().startOf('month'), moment().endOf('month')],
                    'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
                    }
                }, cb);

                cb(start, end);

            });
        }
    }
   
    React.useEffect(() => {
        handleTimePicker();
    }, []);

    
   
    return (
        <div id="jqueryDatePicker" className='sp1__jquery_date_picker sp1_tasks_table_page __date-picker' style={{position: 'relative'}}>
            <div className='sp1__jquery_date_btn'>
                <i className="fa-solid fa-calendar-days"></i>
            </div>
            <div className='sp1__jquery_date_text'></div>
        </div>
    )
}

export default JqueryDateRangePicker;