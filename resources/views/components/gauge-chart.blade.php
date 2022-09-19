@if ($value == '0')
    <div class="text-lightest">0% @lang('app.progress')</div>
@else
    <div {{ $attributes }}></div>
    <script>
        // Element inside which you want to see the chart
        var elementGauge = document.querySelector("#{{ $attributes['id'] }}")

        // Properties of the gauge
        var gaugeOptions = {
            hasNeedle: false,
            needleColor: 'gray',
            needleUpdateSpeed: 1000,
            arcColors: ['rgb(44, 177, 0)', 'rgb(232, 238, 243)'],
            arcDelimiters: [{{ $value }}],
            rangeLabel: ['0', '100'],
            centralLabel: '{{ $value }}%'
        }
        // Drawing and updating the chart
        GaugeChart.gaugeChart(elementGauge, {{ $width }}, gaugeOptions).updateNeedle(50);

    </script>
@endif

  
