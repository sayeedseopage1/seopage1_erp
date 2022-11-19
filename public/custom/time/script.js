var today = new Date();
var minDate = today.setDate(today.getDate() + 1);

$('#datePicker').datetimepicker({
  useCurrent: false,
  format: "MM/DD/YYYY",
  minDate: minDate
});

var firstOpen = true;
var time;

$('#timePicker').datetimepicker({
  useCurrent: false,
  format: "hh:mm A"
}).on('dp.show', function() {
  if(firstOpen) {
    time = moment().startOf('day');
    firstOpen = false;
  } else {
    time = "01:00 PM"
  }
  
  $(this).data('DateTimePicker').date(time);
});
$('#timePicker2').datetimepicker({
  useCurrent: false,
  format: "hh:mm A"
}).on('dp.show', function() {
  if(firstOpen) {
    time = moment().startOf('day');
    firstOpen = false;
  } else {
    time = "01:00 PM"
  }
  
  $(this).data('DateTimePicker').date(time);
});
