<div {{ $attributes }}></div>
<script>
    var data = {
        labels: [
            @foreach($chartData['labels'] as $label)
                "{{ $label }}",
            @endforeach
        ],
        datasets: [
            @foreach($chartData['datasets'] as $dataset)
            {
            name: "{{ $dataset['name'] }}",
            values: [
                @foreach($dataset['values'] as $value)
                    {{ $value }},
                @endforeach
            ],
            chartType: 'bar'
            },
            @endforeach
        ],
        yMarkers: [{ label: "", value: {{ $chartData['threshold'] ?? 0 }}, options: { labelPos: 'left' } }]
    }

    var chart = new frappe.Chart("#{{ $attributes['id'] }}", { // or a DOM element,
        data: data,
        type: 'bar', // or 'bar', 'line', 'scatter', 'pie', 'percentage'
        height: {{ $attributes['height'] }},
        barOptions: {
            stacked: true,
            spaceRatio: 0.2 
        },
        valuesOverPoints: 1,
        axisOptions: {
            yAxisMode: 'tick',
            xAxisMode: 'tick',
            xIsSeries: 0
        },
        colors: [
            @foreach($chartData['colors'] as $color)
                "{{ $color }}",
            @endforeach
        ]
    });
</script>



