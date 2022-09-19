<script type="text/javascript">
    var attendances = @json($attendances);

    var map = new google.maps.Map(document.getElementById('attendance-data'), {
        zoom: 13,
        center: new google.maps.LatLng(parseFloat(global_setting.latitude), parseFloat(global_setting.longitude)),
        mapTypeId: google.maps.MapTypeId.ROADMAP
    });

    var infowindow = new google.maps.InfoWindow();
    var bounds = new google.maps.LatLngBounds();

    var marker, i;

    for (i = 0; i < attendances.length; i++) {
        position = new google.maps.LatLng(attendances[i].latitude, attendances[i].longitude);

        marker = new google.maps.Marker({
            position: position,
            map: map,
            animation: google.maps.Animation.DROP,
            icon: {
                url: attendances[i].user.image_url,
                scaledSize: new google.maps.Size(30, 30)
            }
        });
        bounds.extend(position);


        google.maps.event.addListener(marker, 'click', (function(marker, i) {
            var infoContent = '<div class="p-1"><h6>'+attendances[i].user.name+'</h6></div>';
            var infoContent = '<div class="card border-0 b-shadow-4"><div class="card-horizontal align-items-center"><div class="card-img"> <img class="" src="'+attendances[i].user.image_url+'" alt=""></div><div class="card-body border-0 pl-0"><p class="f-13 font-weight-bold text-dark-grey mb-0">'+attendances[i].user.name+'</p><p class="f-13 font-weight-normal text-dark-grey mb-0">@lang("modules.attendance.clock_in"): '+moment(attendances[i].clock_in_time).format('DD-MMMM-YYYY HH:mm:ss')+'</p><p class="f-13 font-weight-normal text-dark-grey mb-0">@lang("modules.attendance.clock_out"): '+(attendances[i].clock_out_time ? moment(attendances[i].clock_out_time).format('DD-MMMM-YYYY HH:mm:ss') : '@lang("modules.attendance.notClockOut")')+'</p><p class="f-13 font-weight-normal text-dark-grey mb-0">@lang("modules.attendance.working_from"): '+attendances[i].working_from+'</p></div></div>';
            return function() {
                infowindow.setContent(infoContent);
                infowindow.open(map, marker);
            }
        })(marker, i));
    }

    var markers = [];
    for (var i = 0; i < markers.length; i++) {
        bounds.extend(markers[i]);
    }

    map.fitBounds(bounds);
</script>
