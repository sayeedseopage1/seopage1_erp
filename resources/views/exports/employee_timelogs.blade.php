<table>
    <tr>
        <th>@lang('app.date')</th>
        <th>{{ $startDate . ' ' .__('app.to') . ' ' . $endDate }}</th>
    </tr>
</table>
<table>
    <tr>
        <th>@lang('app.name')</th>
        <th align="right">@lang('modules.timeLogs.totalHours')</th>
    </tr>
    @foreach ($employees as $item)
        <tr>
            <td>{{ $item->name }}</td>
            <td>{{ intdiv($item->total_minutes, 60) }}</td>
        </tr>
    @endforeach
</table>
