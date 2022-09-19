<div {{ $attributes->merge(['class' => 'form-group my-3']) }}>
    <x-forms.label :fieldId="$fieldId" :fieldLabel="$fieldLabel" :fieldRequired="$fieldRequired" :popover="$popover"></x-forms.label>

    <div class="custom-control custom-switch">
        <input type="checkbox" name="{{ $fieldName }}" {{ $checked ? 'checked' : '' }} class="custom-control-input"
            id="{{ $fieldId }}">
        <label class="custom-control-label cursor-pointer f-14" for="{{ $fieldId }}"></label>
    </div>

    @if ($fieldHelp)
        <small id="{{ $fieldId }}Help" class="form-text text-muted">{!! $fieldHelp !!}</small>
    @endif
</div>
