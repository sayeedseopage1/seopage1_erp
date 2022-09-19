<x-forms.label :fieldId="$fieldId" :fieldLabel="$fieldLabel" :fieldRequired="$fieldRequired" :popover="$popover"
    class="mt-3"></x-forms.label>
<div {{ $attributes->merge(['class' => 'form-group mb-0']) }}>

    <select name="{{ $fieldName }}" id="{{ $fieldId }}" @if ($multiple) multiple @endif @if ($search)
        data-live-search="true"
        @endif

        class="form-control select-picker" data-size="8"
        @if ($alignRight) data-dropdown-align-right="true" @endif
        >
        {!! $slot !!}
    </select>

</div>
