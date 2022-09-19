@php
$valuesTotal = array_sum($values);
@endphp

@if ($valuesTotal > 0)
<div class="m-auto" style="height: {{ $attributes['height'] }}px; width: {{ $attributes['width'] }}px">
    <canvas {{ $attributes }}></canvas>
</div>
<script>
var ctx = document.getElementById("{{ $attributes['id'] }}");

var myChart = new Chart(ctx, {
  type: 'pie',
  data: {
  labels: [
    @foreach ($labels as $label)
        "{{ $label }}",
    @endforeach
  ],
  datasets: [
    {
      label: 'Dataset 1',
      data: [
        @foreach ($values as $value)
            {{ $value }},
        @endforeach
      ],
        backgroundColor: [
            @foreach ($colors as $color)
                "{{ $color }}",
            @endforeach
        ],
    }
  ]
},
  options: {
    responsive: true,
    plugins: {
      legend: {
        position: 'right',
      },
      title: {
        display: false,
        text: 'Chart.js Pie Chart'
      }
    }
  },
});
</script>
@else
    <div class="text-center text-lightest p-20"
        style="height: {{ $attributes['height'] }}px">

        <i class="side-icon f-21 bi bi-pie-chart"></i>
        <div class="f-15 mt-4">
            - @lang('messages.notEnoughData') -
        </div>
    </div>
@endif
