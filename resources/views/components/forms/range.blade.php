<div {{ $attributes->merge(['class' => 'form-group my-3']) }}>
    <x-forms.label :fieldId="$fieldId" :fieldLabel="$fieldLabel"></x-forms.label>

    <input type="range" class="form-control-range" @if ($disabled == 'true') disabled
    @endif id="{{ $fieldId }}" value="{{ $fieldValue }}" name="{{ $fieldName }}"
    onInput="$('#{{ $fieldId }}-val').html($(this).val())">

    <span class="badge badge-light" id="{{ $fieldId }}-val">{{ $fieldValue }}</span>

    @if ($fieldHelp)
        <small id="{{ $fieldId }}Help" class="form-text text-muted">{{ $fieldHelp }}</small>
    @endif
</div>
