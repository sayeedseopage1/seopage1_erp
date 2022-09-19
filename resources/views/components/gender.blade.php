@if (!is_null($gender))
    @if ($gender != 'others')
        <i class="bi bi-gender-{{ $gender }}"></i> @lang('app.'.$gender)
    @else
        <i class="bi bi-gender-ambiguous"></i> @lang('app.'.$gender)
    @endif
@else
    --
@endif
