<!-- PAGE TITLE START -->
@php
    $url = Route::currentRouteName();
@endphp
<div {{ $attributes->merge(['class' => 'page-title']) }}>
    <div class="page-heading">
        <h2 class="mb-0 pr-3 text-dark f-18 font-weight-bold">{{ $pageTitle }}
            @if($url != 'deliverables_modification_form')
            <span class="text-lightest f-12 f-w-500 ml-2">
                <a href="{{ url('/') }}" class="text-lightest">@lang('app.menu.home')</a> &bull;
                @php
                    $link = '';
                @endphp

                @for ($i = 1; $i <= count(Request::segments()); $i++)
                    @if (($i < count(Request::segments())) && ($i> 0))
                        @php $link .= '/' . Request::segment($i); @endphp

                        @if (Request::segment($i) != 'account')
                            <a href="<?= $link ?>" class="text-lightest">{{ mb_ucwords(str_replace('-', ' ', Request::segment($i))) }}</a> &bull;
                        @endif
                    @else
                        {{ $pageTitle }}
                    @endif
                @endfor
            </span>
            @endif
        </h2>
    </div>
</div>
<!-- PAGE TITLE END -->
