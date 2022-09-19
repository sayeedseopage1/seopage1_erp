<div {{ $attributes->merge(['class' => 'alert alert-' . (!is_null($type) ? $type : 'default')]) }}>
    @if(isset($icon))
    <i class="fa fa-{{ $icon }}"></i>
    @endif
    {{ $slot }}
</div>
