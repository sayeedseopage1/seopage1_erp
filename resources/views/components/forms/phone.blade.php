<div {{ $attributes->merge(['class' => 'form-group my-3']) }}   >
    <x-forms.label :fieldId="$fieldId" :fieldLabel="$fieldLabel" :fieldRequired="$fieldRequired"></x-forms.label>
    <div class="input-group">
        <x-forms.select fieldId="{{$fieldId}}__country" fieldName=""
        search="true">
        @foreach ($countries as $country)
            <option data-tokens="{{ $country->iso3 }}"
                data-content="<span class='flag-icon flag-icon-{{ strtolower($country->iso) }} flag-icon-squared'></span> {{ $country->iso }} (+{{$country->phonecode}})"
                value="{{ $country->id }}">{{ $country->iso }}</option>
        @endforeach
    </x-forms.select>
        <input
            type="tel"
            class="form-control height-35 f-14"
            placeholder="{{ $fieldPlaceholder }}"
            value="{{ $fieldValue }}"
            name="{{ $fieldName }}"
            id="{{ $fieldId }}"
        >
    </div>
</div>
