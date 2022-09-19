@if($projectID == '')
    <select class="form-control select-picker" name="client_id" id="client_company_id" data-style="form-control">
        @foreach($clients as $client)
            <option value="{{ $client->id }}">{{ mb_ucwords($client->name) }}
                @if($client->company_name != '') {{ '('.$client->company_name.')' }} @endif</option>
        @endforeach
    </select>
@else
    <div class="input-icon">
        <input type="text" readonly class="px-6 position-relative text-dark font-weight-normal form-control height-35 rounded p-0 text-left f-15" name="company_name" id="company_name" value="{{ $companyName }}">
    </div>
    <input type="hidden" class="form-control" name="client_id" id="client_id" value="{{ $clientId }}">
@endif
