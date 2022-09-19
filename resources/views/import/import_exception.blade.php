
<div class="bg-white rounded p-2"><table class="table table-bordered table-striped table-hover table-condensed" id="import_table_body">
    <thead>
        <tr>
            <th>@lang('app.exceptions')</th>
        </tr>
    </thead>
    <tbody>
        @foreach ($exceptions as $exception)
        <tr>
            <td>{{ $exception->exception }}</td>
        </tr>
        @endforeach
    </tbody>
</table></div>
