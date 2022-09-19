<table>
    <thead>
    <tr>
        <th><b>Employee</b></th>
        @for($i = 0;$i < count($period);$i++)
            <th colspan="3" style="text-align: center;"  ><b>{{ $period[$i] }}</b></th>
        @endfor
    </tr>
    <tr>
            <th></th>
        @foreach($period as $date)
            <th><b>Status</b></th>
            <th><b>Clock In</b></th>
            <th><b>Clock Out</b></th>

        @endforeach
    </tr>
    </thead>
    <tbody>
    @for($i = 0;$i < count($a);$i++)
        <tr >
            @for($j = 0;$j < count($a[$i]);$j++)
            <td>{{ $a[$i][$j]}}</td>
            @endfor
        </tr>
    @endfor
    </tbody>
</table>
