<div class="d-flex justify-content-between mb-2">
    <div>
        <h6>{{ $title }}</h6>
        <p class="text-lightest">{{ $summary }}</p>
    </div>
    <div class="align-self-center">
        @if ($completed)
            <i class="f-27 bi bi-check2-circle text-primary"></i>
        @else
            <x-forms.link-secondary :link="$link" data-redirect-url="{{ url()->full() }}"
                icon="arrow-right"></x-forms.link-secondary>
        @endif
    </div>
</div>
