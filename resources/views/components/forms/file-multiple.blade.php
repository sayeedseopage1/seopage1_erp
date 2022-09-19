<div {{ $attributes->merge(['class' => 'form-group my-3']) }}>
    <x-forms.label :fieldId="$fieldId" :fieldLabel="$fieldLabel" :fieldRequired="$fieldRequired"></x-forms.label>

    <div id="file-upload-box">
        <div class="row" id="file-dropzone">
            <div class="col-md-12">
                <div class="dropzone rounded border" id="{{ $fieldId }}">
                    @csrf
                    <div class="fallback">
                        <input name="{{ $fieldName }}" type="file" multiple />
                    </div>
                </div>
            </div>
        </div>
    </div>

    @if ($fieldHelp)
        <small id="{{ $fieldId }}Help" class="form-text text-muted">{{ $fieldHelp }}</small>
    @endif
</div>
