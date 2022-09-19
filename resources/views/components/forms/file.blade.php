<div {{ $attributes->merge(['class' => 'form-group my-3']) }}>
    <x-forms.label :fieldId="$fieldId" :fieldLabel="$fieldLabel" :fieldRequired="$fieldRequired" :popover="$popover">
    </x-forms.label>
    <input type="file" class="dropify" id="{{ $fieldId }}" name="{{ $fieldName }}"
           data-default-file="{{ $fieldValue }}" @if (!is_null($allowedFileExtensions))
           data-allowed-file-extensions="{{ $allowedFileExtensions }}"
           @endif
           data-height="{{ $fieldHeight }}"/>

    @if ($fieldHelp)
        <small id="{{ $fieldId }}Help" class="form-text text-muted">{{ $fieldHelp }}</small>
    @endif
</div>
