<div {{ $attributes->merge(['class' => 'form-group my-3']) }}   >
    <x-forms.label :fieldId="$fieldId" :fieldLabel="$fieldLabel" :fieldRequired="$fieldRequired"></x-forms.label>

    <input type="tel" class="form-control height-35 f-14" placeholder="{{ $fieldPlaceholder }}" value="{{ $fieldValue }}" name="{{ $fieldName }}" id="{{ $fieldId }}">
</div>
