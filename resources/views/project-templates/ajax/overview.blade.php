<div class="d-lg-flex">
    <div class="w-100 py-0 py-lg-3 py-md-0 ">
        <div class="d-flex align-content-center flex-lg-row-reverse mb-4">

            <div class="ml-3">
                <div class="dropdown">
                    <button
                        class="btn btn-lg bg-white border height-35 f-15 px-2 py-1 text-dark-grey text-capitalize rounded  dropdown-toggle"
                        type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        @lang('app.action') <i class="icon-options-vertical icons"></i>
                    </button>

                    <div class="dropdown-menu dropdown-menu-right border-grey rounded b-shadow-4 p-0"
                        aria-labelledby="dropdownMenuLink" tabindex="0">

                        <a class="dropdown-item openRightModal"
                            href="{{ route('project-template.edit', $template->id) }}">@lang('app.edit')
                            @lang('app.project')</a>
                    </div>
                </div>
            </div>

        </div>

        <!-- PROJECT DETAILS START -->
        <div class="row">
            <div class="col-md-12 mb-4">
                <x-cards.data :title="__('app.project') . ' ' . __('app.details')"
                    otherClasses="d-flex justify-content-between align-items-center">
                    <div class="text-dark-grey mb-0">
                        {{ empty($template->project_summary) }}
                        {!! $template->project_summary !!}
                    </div>
                </x-cards.data>
            </div>
        </div>
        <!-- PROJECT DETAILS END -->

    </div>

</div>
