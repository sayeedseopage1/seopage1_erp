<div {{ $attributes->merge(['class' => 'form-check-inline custom-control custom-radio mt-2 mr-3']) }}>
    <input type="radio" value="{{ $fieldValue }}" class="custom-control-input" id="{{ $fieldId }}"
        name="{{ $fieldName }}" @if ($checked)
    checked
    @endif
    >
    <label class="custom-control-label pt-1 cursor-pointer" for="{{ $fieldId }}">{{ $fieldLabel }}</label>
</div>
