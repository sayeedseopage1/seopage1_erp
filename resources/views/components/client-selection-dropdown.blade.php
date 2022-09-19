@php
$addClientPermission = user()->permission('add_clients');
@endphp

<x-forms.label fieldId="client_id" :fieldLabel="__('app.client')" :fieldRequired="$fieldRequired">
</x-forms.label>

<x-forms.input-group>
    <select class="form-control select-picker" data-live-search="true" data-size="8" name="client_id" id="client_list_id">
        <option value="">--</option>
        @foreach ($clients as $clientOpt)
            <option @if (!is_null($selected) && $selected == $clientOpt->id)
                selected
        @endif
        data-content="
        <x-client-search-option :user='$clientOpt' />"
        value="{{ $clientOpt->id }}">{{ mb_ucwords($clientOpt->name) }} </option>
        @endforeach
    </select>

    @if ($addClientPermission == 'all' || $addClientPermission == 'added')
        <x-slot name="append">
            <a href="javascript:;" id="quick-create-client"
                class="btn btn-outline-secondary border-grey"
                data-redirect-url="{{ url()->full() }}">@lang('app.add')</a>
        </x-slot>
    @endif
</x-forms.input-group>

<script>
    $('#quick-create-client').click(function() {
        const url = "{{ route('clients.create') . '?quick-form=1' }}";
        $(MODAL_DEFAULT + ' ' + MODAL_HEADING).html('...');
        $.ajaxModal(MODAL_DEFAULT, url);
    });
</script>
