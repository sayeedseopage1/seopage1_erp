@if($projectID == '' || !($client->currency))
    <select class="form-control select-picker" name="currency_id" id="currency_id">
        @foreach ($currencies as $currency)
            <option value="{{ $currency->id }}">
                {{ $currency->currency_code . ' (' . $currency->currency_symbol . ')' }}
            </option>
        @endforeach
    </select>
@else
    <div class="input-icon">
        <input type="hidden" readonly class="px-6 position-relative text-dark font-weight-normal form-control height-35 rounded p-0 text-left f-15" name="currency_id" id="currency_id" value="{{ $client->currency ? $client->currency->id : global_setting()->currency_id}}">
        <input type="text" readonly class="px-6 position-relative text-dark font-weight-normal form-control height-35 rounded p-0 text-left f-15" value="{{ $client->currency ? $client->currency->currency_code . ' (' . $client->currency->currency_symbol . ')' : global_setting()->currency->currency_code . ' (' . global_setting()->currency->currency_symbol . ')' }}">
    </div>
@endif

<script>
    $(function() {
        $('#currency_id').selectpicker();
    });
</script>
