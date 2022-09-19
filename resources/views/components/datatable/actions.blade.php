<form action="" {{ $attributes->merge(['class' => 'align-self-center']) }} id="quick-action-form" style="display: none">
    @csrf
    <div class="d-flex align-items-center" id="quick-actions">
        {{ $slot }}
        <div class="select-status">
            <x-forms.button-primary id="quick-action-apply" disabled>@lang('app.apply')</x-forms.button-primary>
        </div>
    </div>

</form>