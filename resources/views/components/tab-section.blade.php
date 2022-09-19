<div {{ $attributes->merge(['class' => 's-b-n-header']) }} id="tabs">
    <nav class="tabs px-4 border-bottom-grey">
        <div class="nav" id="nav-tab" role="tablist">

            {{ $slot }}

        </div>
    </nav>
</div>
