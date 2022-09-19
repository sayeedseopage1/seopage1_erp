<div class="ml-auto d-flex align-items-center">
    @isset($extraSlot)
        {{ $extraSlot }}
    @endisset

    <div class="more-filters py-2 pl-0 pl-lg-2 pl-md-2 position-relative">

        <a onclick="openMoreFilter()" class="mb-0 d-none d-lg-block  f-14 text-dark-grey"><i
                class="fa fa-filter f-13 text-dark-grey mt-1 mr-1"></i>@lang('app.moreFilters')</a>

        <a onclick="openMoreFilter()" class="mb-0 d-block d-lg-none  text-dark-grey"><i
                class="fa fa-filter filter_icon mr-2"></i>@lang('app.moreFilters')</a>

        <div class="more-filter-tab" id="more_filter">
            <div class="filter-inner">
                <div class="sticky-top bg-white">
                    <h3 class="pb-3 mb-2 f-18 f-w-500 text-capitalize text-dark">@lang('app.filters')</h3>
                    <!-- <i onclick="closeMoreFilter()" class="close-more-filter fa fa-times f-16 cursor-pointer text-lightest"></i> -->
                    <button type="button" class="close " onclick="closeMoreFilter()" aria-label="Close">
                        <span aria-hidden="true" class="f-22 close-more-filter">&times;</span>
                    </button>
                </div>
                <div class="filter-detail">
                    {{ $slot }}
                </div>
            </div>
            <div class="clear-all bg-white">
                <x-forms.button-secondary id="reset-filters-2" class="float-right my-3 mr-0">@lang('app.clearFilters')
                </x-forms.button-secondary>
            </div>
        </div>
    </div>
</div>
