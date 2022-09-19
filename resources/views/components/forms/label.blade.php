<label {{ $attributes->merge(['class' => 'f-14 text-dark-grey mb-12']) }} data-label="{{ $fieldRequired }}" for="{{ $fieldId }}">{!!
    $fieldLabel ?? '&nbsp;' !!}
    @if ($fieldRequired == 'true')
        <sup class="f-14 mr-1">*</sup>
    @endif

    @if (!is_null($popover))
        <i class="fa fa-question-circle" data-toggle="popover" data-placement="top" data-content="{{ $popover }}" data-html="true" data-trigger="hover"></i>
    @endif
</label>
