@php
    $allModules = Module::all();
    $activeModules = [];
    foreach ($allModules as $module) {
        $activeModules[] = config(strtolower($module) . '.envato_item_id');
    }
@endphp

@if (!empty(($plugins = \Froiden\Envato\Functions\EnvatoUpdate::plugins())) && count($activeModules) !==
count($plugins))

    <div class="col-sm-12 mt-5">
        <h4>{{ mb_ucwords(config('froiden_envato.envato_product_name')) }} Official Modules</h4>
        <div class="row">

            @foreach ($plugins as $item)

                @if (!in_array($item['envato_id'], $activeModules))
                    <div class="col-sm-12 border rounded p-3 mt-4">
                        <div class="row">
                            <div class="col-xs-2 col-lg-1">
                                <a href="{{ $item['product_link'] }}" target="_blank">
                                    <img src="{{ $item['product_thumbnail'] }}" class="img-responsive" alt="">
                                </a>
                            </div>
                            <div class="col-xs-8 col-lg-5">
                                <a href="{{ $item['product_link'] }}" target="_blank"
                                   class="f-w-500 f-14 text-darkest-grey">{{ $item['product_name'] }}
                                </a>

                                <p class="f-12 text-muted">
                                    {{ $item['summary'] }}
                                </p>
                            </div>
                            <div class="col-xs-2 col-lg-6 text-right pt-4">
                                <x-forms.link-primary :link="$item['product_link']" target="_blank" icon="arrow-right">
                                </x-forms.link-primary>
                            </div>
                        </div>
                    </div>
                @endif


            @endforeach

        </div>

    </div>
@endif
