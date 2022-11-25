<script src="{{ asset('vendor/jquery/frappe-charts.min.iife.js') }}"></script>
<script src="{{ asset('vendor/jquery/Chart.min.js') }}"></script>
<script src="{{ asset('vendor/jquery/gauge.js') }}"></script>

@php $editProjectPermission = user()->permission('edit_projects'); $addPaymentPermission = user()->permission('add_payments'); $projectBudgetPermission = user()->permission('view_project_budget'); $memberIds =
$project->members->pluck('user_id')->toArray(); @endphp

<div class="d-lg-flex">
    <div class="project-left w-100 py-0 py-lg-5 py-md-0">
        <div class="d-flex align-content-center flex-lg-row-reverse mb-4">
            @if (!$project->trashed())
            <div class="ml-lg-3 ml-md-0 ml-0 mr-3 mr-lg-0 mr-md-3">
                @if ($editProjectPermission == 'all' || ($editProjectPermission == 'added' && $project->added_by == user()->id) || ($project->project_admin == user()->id))
                <select class="form-control select-picker change-status height-35">
                    @foreach ($projectStatus as $status)
                    <option data-content="<i class='fa fa-circle mr-1 f-15' style='color:{{$status->color}}'></i>{{ ucfirst($status->status_name) }}" @if ($project->
                        status == $status->status_name) selected @endif value="{{$status->status_name}}">$status->status_name
                    </option>
                    @endforeach
                </select>
                @else
                <div class="bg-white p-2 border rounded">
                    @if ($project->status == 'in progress') <i class="fa fa-circle mr-2 text-blue"></i> {{ __('app.inProgress') }} @elseif ($project->status == 'on hold') <i class="fa fa-circle mr-2 text-warning"></i> {{ __('app.onHold') }}
                    @elseif ($project->status == 'not started') <i class="fa fa-circle mr-2 text-warning"></i> {{ __('app.notStarted') }} @elseif ($project->status == 'canceled') <i class="fa fa-circle mr-2 text-red"></i> {{
                    __('app.canceled') }} @elseif ($project->status == 'finished') <i class="fa fa-circle mr-2 text-dark-green"></i>
                    {{ __('app.finished') }} @endif
                </div>
                @endif
            </div>

            <div class="ml-lg-3 ml-md-0 ml-0 mr-3 mr-lg-0 mr-md-3">
                <div class="dropdown">
                    <button class="btn btn-lg bg-white border height-35 f-15 px-2 py-1 text-dark-grey text-capitalize rounded dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        @lang('app.action') <i class="icon-options-vertical icons"></i>
                    </button>

                    <div class="dropdown-menu dropdown-menu-right border-grey rounded b-shadow-4 p-0" aria-labelledby="dropdownMenuLink" tabindex="0">
                        @if ($editProjectPermission == 'all' || ($project->project_admin == user()->id) || ($editProjectPermission == 'added' && user()->id == $project->added_by) || ($editProjectPermission == 'owned' && user()->id ==
                        $project->client_id && in_array('client', user_roles())) || ($editProjectPermission == 'owned' && in_array(user()->id, $memberIds) && in_array('employee', user_roles())) || ($editProjectPermission == 'both' &&
                        (user()->id == $project->client_id || user()->id == $project->added_by)) || ($editProjectPermission == 'both' && in_array(user()->id, $memberIds) && in_array('employee', user_roles())))
                        <a class="dropdown-item openRightModal" href="{{ route('projects.edit', $project->id) }}">@lang('app.edit') @lang('app.project')</a>
                        <hr class="my-1" />
                        @endif @php $projectPin = $project->pinned() @endphp @if ($projectPin)
                        <a class="dropdown-item" href="javascript:;" id="pinnedItem" data-pinned="pinned">@lang('app.unpin') @lang('app.project')</a>
                        @else
                        <a class="dropdown-item" href="javascript:;" id="pinnedItem" data-pinned="unpinned">@lang('app.pin') @lang('app.project')</a>
                        @endif
                    </div>
                </div>
            </div>

            @if ($projectPin)
            <div class="align-self-center">
                <span class="badge badge-success"><i class="fa fa-thumbtack"></i> @lang('app.pinned')</span>
            </div>
            @endif @elseif($editProjectPermission == 'all' || ($project->project_admin == user()->id) || ($editProjectPermission == 'added' && user()->id == $project->added_by) || ($editProjectPermission == 'owned' && user()->id ==
            $project->client_id && in_array('client', user_roles())) || ($editProjectPermission == 'owned' && in_array(user()->id, $memberIds) && in_array('employee', user_roles())) || ($editProjectPermission == 'both' && (user()->id ==
            $project->client_id || user()->id == $project->added_by)) || ($editProjectPermission == 'both' && in_array(user()->id, $memberIds) && in_array('employee', user_roles())))
            <div class="ml-3">
                <x-forms.button-primary class="restore-project" icon="undo">@lang('app.unarchive') </x-forms.button-primary>
            </div>
            @endif
        </div>
        <!-- PROJECT PROGRESS AND CLIENT START -->
        <div class="row"  style="max-width: 86%;">
            <!-- PROJECT PROGRESS START -->
            <div class="col-md-6 mb-4">
                <x-cards.data :title="__('modules.projects.projectProgress')" otherClasses="d-flex d-xl-flex d-lg-block d-md-flex  justify-content-between align-items-center">
                    <x-gauge-chart id="progressGauge" width="100" :value="$project->completion_percent" />

                    <!-- PROGRESS START DATE START -->
                    <div class="p-start-date mb-xl-0 mb-lg-3">
                        <h5 class="text-lightest f-14 font-weight-normal">@lang('app.startDate')</h5>
                        <p class="f-15 mb-0">{{ $project->start_date->format(global_setting()->date_format) }}</p>
                    </div>
                    <!-- PROGRESS START DATE END -->
                    <!-- PROGRESS END DATE START -->
                    <div class="p-end-date">
                        <h5 class="text-lightest f-14 font-weight-normal">@lang('modules.projects.deadline')</h5>
                        <p class="f-15 mb-0">
                            {{ !is_null($project->deadline) ? $project->deadline->format(global_setting()->date_format) : '--' }}
                        </p>
                    </div>
                    <!-- PROGRESS END DATE END -->
                </x-cards.data>
            </div>
            <!-- PROJECT PROGRESS END -->
            <!-- CLIENT START -->
            <div class="col-md-6 mb-4">
                @if (!is_null($project->client))
                <x-cards.data :title="__('app.client')" otherClasses="d-block d-xl-flex d-lg-block d-md-flex  justify-content-between align-items-center">
                    <div class="p-client-detail">
                        <div class="card border-0">
                            <div class="card-horizontal">
                                <div class="card-img m-0">
                                    <img class="" src=" {{ $project->client->image_url }}" alt="{{ $project->client->name }}" />
                                </div>
                                <div class="card-body border-0 p-0 ml-4 ml-xl-4 ml-lg-3 ml-md-3">
                                    <h4 class="card-title f-15 font-weight-normal mb-0 text-capitalize">
                                        <a href="{{ route('clients.show', $project->client_id) }}" class="text-dark">{{ $project->client->name }}</a>
                                    </h4>
                                    <p class="card-text f-14 text-lightest mb-0">
                                        {{ $project->client->clientDetails->company_name }}
                                    </p>
                                    @if ($project->client->country_id)
                                    <span class="card-text f-12 text-lightest text-capitalize d-flex align-items-center">
                                        <span class="flag-icon flag-icon-{{ strtolower($project->client->country->iso) }} mr-2"></span>
                                        {{ $project->client->country->nicename }}
                                    </span>
                                    @endif
                                </div>
                            </div>
                        </div>
                    </div>

                    @if( (in_array('admin', user_roles()) && $messageSetting->allow_client_admin == 'yes') || (in_array('employee', user_roles()) && $messageSetting->allow_client_employee == 'yes') )
                    <div class="p-client-msg mt-4 mt-xl-0 mt-lg-4 mt-md-0">
                        <button type="button" class="btn-secondary rounded f-15" id="new-chat" data-client-id="{{ $project->client->id }}"><i class="fab fa-whatsapp mr-1"></i> @lang('app.message')</button>
                    </div>
                    @endif
                </x-cards.data>
                @else
                <x-cards.data otherClasses="d-flex d-xl-flex d-lg-block d-md-flex  justify-content-between align-items-center">
                    <x-cards.no-record icon="user" :message="__('messages.noClientAddedToProject')" />
                </x-cards.data>
                @endif
            </div>
            <!-- CLIENT END -->
        </div>
        <!-- PROJECT PROGRESS AND CLIENT END -->

        <!-- TASK STATUS AND BUDGET START -->
        <div class="row mb-4"  style="max-width: 86%;">
            <!-- TASK STATUS START -->
            <div class="col-lg-6 col-md-12">
                <x-cards.data :title="__('app.menu.tasks')" padding="false">
                    <x-pie-chart id="task-chart" :labels="$taskChart['labels']" :values="$taskChart['values']" :colors="$taskChart['colors']" height="220" width="250" />
                </x-cards.data>
            </div>
            <!-- TASK STATUS END -->
            <!-- BUDGET VS SPENT START -->
            <div class="col-lg-6 col-md-12">
                <div class="row">
                    <div class="col-sm-12">
                        <h4 class="f-18 f-w-500 mb-4">@lang('app.statistics')</h4>
                    </div>
                    @if ($projectBudgetPermission == 'all')
                    <div class="col">
                        <x-cards.widget
                            :title="__('Project Budget (USD)')"
                            :value="((!is_null($project->project_budget) && $project->currency) ? currency_formatter($project->project_budget, $project->currency->currency_symbol) : '0')"
                            icon="coins"
                        />
                    </div>
                    @endif @if ($projectBudgetPermission == 'all') @if($project->currency_id != $project->deal->original_currency_id)
                    <div class="col">
                        <x-cards.widget
                            :title="__('Project Budget ('. $project->deal->original_currency->currency_code .')')"
                            :value="((!is_null($project->project_budget) && $project->currency) ? currency_formatter($project->deal->actual_amount, $project->deal->original_currency->currency_symbol) : '0')"
                            icon="coins"
                        />
                    </div>
                    @endif @endif


                </div>
                <div class="row mt-3">
                  @if ($viewPaymentPermission == 'all')
                  <div class="col">
                      <x-cards.widget :title="__('app.earnings')" :value="(!is_null($project->currency) ? currency_formatter($earnings, $project->currency->currency_symbol) : currency_formatter($earnings))" icon="coins" />
                  </div>
                  @endif
                  @if ($viewPaymentPermission == 'all')
                  @if($project->currency_id != $project->deal->original_currency_id)
                  @php

                  $actual_earnings= App\Models\Payment::where('project_id',$project->id)->sum('actual_amount');
                  @endphp
                 <div class="col">
                     <x-cards.widget :title="__('Earnings  ('. $project->deal->original_currency->currency_code .')')" :value="((!is_null($project->project_budget) && $project->currency) ? currency_formatter($actual_earnings, $project->deal->original_currency->currency_symbol) : '0')" icon="coins" />
                 </div>
                 @endif
                 @endif
                </div>

                <div class="row mt-3">
                    @if ($viewProjectTimelogPermission == 'all')
                    <div class="col">
                        <x-cards.widget :title="__('modules.projects.hoursLogged')" :value="$hoursLogged" icon="clock" />
                    </div>
                    @endif
                   @if ($viewExpensePermission == 'all')
                    <div class="col">
                        <x-cards.widget
                            :title="__('modules.projects.expenses_total')"
                            :value="(!is_null($project->currency) ? currency_formatter($expenses, $project->currency->currency_symbol) : currency_formatter($expenses))"
                            icon="coins"
                        />
                    </div>
                    @endif 
                </div>
            </div>
            <!-- BUDGET VS SPENT END -->
        </div>
        <!-- TASK STATUS AND BUDGET END -->

        <!-- TASK STATUS AND BUDGET START -->
        <div class="row mb-4"  style="max-width: 86%;">
            <!-- BUDGET VS SPENT START -->
            <div class="col-md-12">
                <x-cards.data>
                    <div class="row {{ $projectBudgetPermission == 'all' ? 'row-cols-lg-2' : '' }}">
                        <div class="col">
                            <h4 class="f-18 f-w-500 mb-0">@lang('modules.projects.hoursLogged')</h4>
                            <x-stacked-chart id="task-chart2" :chartData="$hoursBudgetChart" height="250" />
                        </div>
                        @if ($projectBudgetPermission == 'all')
                        <div class="col">
                            <h4 class="f-18 f-w-500 mb-0">@lang('modules.projects.projectBudget')</h4>
                            <x-stacked-chart id="task-chart3" :chartData="$amountBudgetChart" height="250" />
                        </div>
                        @endif
                    </div>
                </x-cards.data>
            </div>
            <!-- BUDGET VS SPENT END -->
        </div>
        <!-- TASK STATUS AND BUDGET END -->
        <?php
            $deal= App\Models\Deal::where('id',$project->deal_id)->first(); ?>
        <!-- PROJECT DETAILS START -->
        {{--
        <div class="row">
            <div class="col-md-12 mb-4">
                <x-cards.data :title="__('app.project') . ' ' . __('app.details')" otherClasses="d-flex justify-content-between align-items-center">
                    @if (is_null($project->project_summary))
                    <x-cards.no-record icon="align-left" :message="__('messages.projectDetailsNotAdded')" />
                    @else
                    <div class="text-dark-grey mb-0 ql-editor p-0">{!! $project->project_summary !!}</div>
                    @endif
                </x-cards.data>
            </div>
        </div>
        <!-- PROJECT DETAILS END -->

        <div class="row">
            <div class="col-md-12 mb-4">
                <x-cards.data
                    :title="__('Write the what in 2-8 words here (Examples: Website redesign, Shopify website migration to Wix, Creating a 5 page business website in WordPress, Shopify website creation, etc.)') . ' ' . __('')"
                    otherClasses="d-flex justify-content-between align-items-center"
                >
                    @if (is_null($deal->description2))
                    <x-cards.no-record icon="align-left" :message="__('messages.projectDetailsNotAdded')" />
                    @else
                    <div class="text-dark-grey mb-0 ql-editor p-0">{!! $deal->description2 !!}</div>
                    @endif
                </x-cards.data>
            </div>
        </div>
        <div class="row">
            <div class="col-md-12 mb-4">
                <x-cards.data
                    :title="__('Elaborate the WHAT 3-4 lines here (The client needs a 5 page static WordPress website for his new design agency. It should include home, about, his services in one page, blog, and contact. The look and feel should be better than the references.)') . ' ' . __('')"
                    otherClasses="d-flex justify-content-between align-items-center"
                >
                    @if (is_null($deal->description3))
                    <x-cards.no-record icon="align-left" :message="__('messages.projectDetailsNotAdded')" />
                    @else
                    <div class="text-dark-grey mb-0 ql-editor p-0">{!! $deal->description3 !!}</div>
                    @endif
                </x-cards.data>
            </div>
        </div>
        <div class="row">
            <div class="col-md-12 mb-4">
                <x-cards.data
                    :title="__('Reference websites and what the references are for (Ex: ABC.com is for the color scheme. XYZ.com is for section layouts DEF.com is for header & footer styling. However, none of these can be copied)') . ' ' . __('')"
                    otherClasses="d-flex justify-content-between align-items-center"
                >
                    @if (is_null($deal->description4))
                    <x-cards.no-record icon="align-left" :message="__('messages.projectDetailsNotAdded')" />
                    @else
                    <div class="text-dark-grey mb-0 ql-editor p-0">{!! $deal->description4 !!}</div>
                    @endif
                </x-cards.data>
            </div>
        </div>
        <div class="row">
            <div class="col-md-12 mb-4">
                <x-cards.data
                    :title="__('Any particular focus/concern of the client (Ex: 1. The client is very concerned about the final look & feel so needs to be careful with the design 2. The client is very concerned if the booking functionality will work the way he wants.)') . ' ' . __('')"
                    otherClasses="d-flex justify-content-between align-items-center"
                >
                    @if (is_null($deal->description5))
                    <x-cards.no-record icon="align-left" :message="__('messages.projectDetailsNotAdded')" />
                    @else
                    <div class="text-dark-grey mb-0 ql-editor p-0">{!! $deal->description5 !!}</div>
                    @endif
                </x-cards.data>
            </div>
        </div>
        <div class="row">
            <div class="col-md-12 mb-4">
                <x-cards.data :title="__('Required logins (Whichever of these are applicable: Wordpress, FTP, Cpanel, shopify, Domain register)') . ' ' . __('')" otherClasses="d-flex justify-content-between align-items-center">
                    @if (is_null($deal->description6))
                    <x-cards.no-record icon="align-left" :message="__('messages.projectDetailsNotAdded')" />
                    @else
                    <div class="text-dark-grey mb-0 ql-editor p-0">{!! $deal->description6 !!}</div>
                    @endif
                </x-cards.data>
            </div>
        </div>
        <div class="row">
            <div class="col-md-12 mb-4">
                <x-cards.data :title="__('Logo (Upload the google drive link here. Always ask for PSD and AI files so they are editable)') . ' ' . __('')" otherClasses="d-flex justify-content-between align-items-center">
                    @if (is_null($deal->description7))
                    <x-cards.no-record icon="align-left" :message="__('messages.projectDetailsNotAdded')" />
                    @else
                    <div class="text-dark-grey mb-0 ql-editor p-0">{!! $deal->description7 !!}</div>
                    @endif
                </x-cards.data>
            </div>
        </div>
        <div class="row">
            <div class="col-md-12 mb-4">
                <x-cards.data
                    :title="__('If there is any cross-departmental work involved in this project (Example: SEO, Content writing, design, google ads, social media marketing, email marketing & anything else that is not explicitly included in web development)') . ' ' . __('')"
                    otherClasses="d-flex justify-content-between align-items-center"
                >
                    @if (is_null($deal->description8))
                    <x-cards.no-record icon="align-left" :message="__('messages.projectDetailsNotAdded')" />
                    @else
                    <div class="text-dark-grey mb-0 ql-editor p-0">{!! $deal->description8 !!}</div>
                    @endif
                </x-cards.data>
            </div>
        </div>
        <div class="row">
            <div class="col-md-12 mb-4">
                <x-cards.data :title="__('Any other notes for the project manager/technical team') . ' ' . __('')" otherClasses="d-flex justify-content-between align-items-center">
                    @if (is_null($deal->description9))
                    <x-cards.no-record icon="align-left" :message="__('messages.projectDetailsNotAdded')" />
                    @else
                    <div class="text-dark-grey mb-0 ql-editor p-0">{!! $deal->description9 !!}</div>
                    @endif
                </x-cards.data>
            </div>
        </div>
        --}}

        <!-- <div class="row">
          <div class="col-md-6">
            <div class="card bg-light">
                    <div class="card-header"><h5>Project Summary</h5></div>
                    <div class="card-body">
                        <p class="card-text" style="word-wrap:break-word; display:inline:block;">{!! $deal->description !!}</p>
                    </div>
                 </div>


          </div>

        </div> -->




        <div class="card bg-light mb-3" style="max-width: 85%;">
              <div class="card-header"><h5>Project Summary</h5></div>
              <div class="card-body">
                  <p class="card-text">{!! $deal->description !!}</p>
              </div>
           </div>

        <br />

        <div class="card bg-light mb-3" style="max-width: 85%;">
            <div class="card-header"><h5>Freelancer Profile Link</h5></div>
            <div class="card-body">
                <p class="card-text">{{ $deal->profile_link}}</p>
            </div>
        </div>

        <br />

        <div class="card bg-light mb-3" style="max-width: 85%;">
            <div class="card-header"><h5>Freelancer Message Link</h5></div>
            <div class="card-body">
                <p class="card-text">{{ $deal->message_link}}</p>
            </div>
        </div>

        <br />

        <div class="card bg-light mb-3" style="max-width: 85%;">
            <div class="card-header"><h5>Write the what in 2-8 words here (Examples: Website redesign, Shopify website migration to Wix, Creating a 5 page business website in WordPress, Shopify website creation, etc.)</h5></div>
            <div class="card-body">
                <p class="card-text">{!! $deal->description2 !!}</p>
            </div>
        </div>

        <br />

        <div class="card bg-light mb-3" style="max-width: 85%;">
            <div class="card-header">
                <h5>
                    Elaborate the "WHAT" 3-4 lines here (The client needs a 5 page static WordPress website for his new design agency. It should include home, about, his services in one page, blog, and contact. The look and feel should be
                    better than the references.)
                </h5>
            </div>
            <div class="card-body">
                <p class="card-text">{!! $deal->description3 !!}</p>
            </div>
        </div>

        <br />

        <div class="card bg-light mb-3" style="max-width: 85%;">
            <div class="card-header">
                <h5>Reference websites and what the references are for (Ex: ABC.com is for the color scheme. XYZ.com is for section layouts DEF.com is for header & footer styling. However, none of these can be copied)</h5>
            </div>
            <div class="card-body">
                <p class="card-text">{!! $deal->description4 !!}</p>
            </div>
        </div>

        <br />

        <div class="card bg-light mb-3" style="max-width: 85%;">
            <div class="card-header">
                <h5>
                    Any particular focus/concern of the client (Ex: 1. The client is very concerned about the final look & feel so needs to be careful with the design 2. The client is very concerned if the booking functionality will work
                    the way he wants.)
                </h5>
            </div>
            <div class="card-body">
                <p class="card-text">{!! $deal->description5 !!}</p>
            </div>
        </div>

        <br />

        <div class="card bg-light mb-3" style="max-width: 85%;">
            <div class="card-header"><h5>Required logins (Whichever of these are applicable: Wordpress, FTP, Cpanel, shopify, Domain register)</h5></div>
            <div class="card-body">
                <p class="card-text">{!! $deal->description6 !!}</p>
            </div>
        </div>

        <br />

        <div class="card bg-light mb-3" style="max-width: 85%;">
            <div class="card-header"><h5>Logo (Upload the google drive link here. Always ask for PSD and AI files so they are editable)</h5></div>
            <div class="card-body">
                <p class="card-text">{!! $deal->description7 !!}</p>
            </div>
        </div>

        <br />

        <div class="card bg-light mb-3" style="max-width: 85%;">
            <div class="card-header">
                <h5>
                    If there is any cross-departmental work involved in this project (Example: SEO, Content writing, design, google ads, social media marketing, email marketing & anything else that is not explicitly included in web
                    development)
                </h5>
            </div>
            <div class="card-body">
                <p class="card-text">{!! $deal->description8 !!}</p>
            </div>
        </div>

        <br />

        <div class="card bg-light mb-3" style="max-width: 85%;">
            <div class="card-header"><h5>Any other notes for the project manager/technical team</h5></div>
            <div class="card-body">
                <p class="card-text">{!! $deal->description9 !!}</p>
            </div>
        </div>




         {{-- Custom fields data --}} @if (isset($fields) && count($fields) > 0)
        <div class="row mt-4">
            <!-- TASK STATUS START -->
            <div class="col-md-12">
                <x-cards.data :title="__('modules.client.clientOtherDetails')">
                    @foreach ($fields as $field) @if ($field->type == 'text' || $field->type == 'password' || $field->type == 'number')
                    <x-cards.data-row :label="$field->label" :value="$project->custom_fields_data['field_'.$field->id] ?? '--'" />
                    @elseif($field->type == 'textarea')
                    <x-cards.data-row :label="$field->label" html="true" :value="$project->custom_fields_data['field_'.$field->id] ?? '--'" />
                    @elseif($field->type == 'radio')
                    <x-cards.data-row :label="$field->label" :value="(!is_null($project->custom_fields_data['field_' . $field->id]) ? $project->custom_fields_data['field_' . $field->id] : '--')" />
                    @elseif($field->type == 'checkbox')
                    <x-cards.data-row :label="$field->label" :value="(!is_null($project->custom_fields_data['field_' . $field->id]) ? $project->custom_fields_data['field_' . $field->id] : '--')" />
                    @elseif($field->type == 'select')
                    <x-cards.data-row
                        :label="$field->label"
                        :value="(!is_null($project->custom_fields_data['field_' . $field->id]) && $project->custom_fields_data['field_' . $field->id] != '' ? $field->values[$project->custom_fields_data['field_' . $field->id]] : '--')"
                    />
                    @elseif($field->type == 'date')
                    <x-cards.data-row
                        :label="$field->label"
                        :value="(!is_null($project->custom_fields_data['field_' . $field->id]) && $project->custom_fields_data['field_' . $field->id] != '' ? \Carbon\Carbon::parse($project->custom_fields_data['field_' . $field->id])->format(global_setting()->date_format) : '--')"
                    />
                    @endif @endforeach
                </x-cards.data>
            </div>
        </div>
        @endif
    </div>

    <!-- PROJECT RIGHT START -->
    <div class="project-right pt-0 pb-4 p-lg-0">
        <div class="bg-white">
            <!-- ACTIVITY HEADING START -->
            <div class="p-activity-heading d-flex align-items-center justify-content-between b-shadow-4 p-20">
                <p class="mb-0 f-18 f-w-500">@lang('modules.employees.activity')</p>
            </div>
            <!-- ACTIVITY HEADING END -->
            <!-- ACTIVITY DETAIL START -->
            <div class="p-activity-detail cal-info b-shadow-4" data-menu-vertical="1" data-menu-scroll="1" data-menu-dropdown-timeout="500" id="projectActivityDetail">
                @forelse($activities as $key=>$activity)
                <div class="card border-0 b-shadow-4 p-20 rounded-0">
                    <div class="card-horizontal">
                        <div class="card-header m-0 p-0 bg-white rounded">
                            <x-date-badge :month="$activity->created_at->timezone(global_setting()->timezone)->format('M')" :date="$activity->created_at->timezone(global_setting()->timezone)->format('d')" />
                        </div>
                        <div class="card-body border-0 p-0 ml-3">
                            <h4 class="card-title f-14 font-weight-normal text-capitalize">{!! __($activity->activity) !!}</h4>
                            <p class="card-text f-12 text-dark-grey">
                                {{ $activity->created_at->timezone(global_setting()->timezone)->format(global_setting()->time_format) }}
                            </p>
                        </div>
                    </div>
                </div>
                <!-- card end -->
                @empty
                <div class="card border-0 b-shadow-4 p-20 rounded-0">
                    <div class="card-horizontal">
                        <div class="card-body border-0 p-0 ml-3">
                            <h4 class="card-title f-14 font-weight-normal">
                                @lang('messages.noActivityByThisUser')
                            </h4>
                            <p class="card-text f-12 text-dark-grey"></p>
                        </div>
                    </div>
                </div>
                <!-- card end -->
                @endforelse
            </div>
            <!-- ACTIVITY DETAIL END -->
        </div>
    </div>
    <!-- PROJECT RIGHT END -->

</div>

<script>
    $(document).ready(function () {
        $(".change-status").change(function () {
            var status = $(this).val();
            var url = "{{ route('projects.update_status', $project->id) }}";
            var token = "{{ csrf_token() }}";

            $.easyAjax({
                url: url,
                type: "POST",
                container: ".content-wrapper",
                blockUI: true,
                data: {
                    status: status,
                    _token: token,
                },
            });
        });

        $("body").on("click", "#pinnedItem", function () {
            var type = $("#pinnedItem").attr("data-pinned");
            var id = "{{ $project->id }}";
            var pinType = "project";

            var dataPin = type.trim(type);
            if (dataPin == "pinned") {
                Swal.fire({
                    title: "@lang('messages.sweetAlertTitle')",
                    icon: "warning",
                    showCancelButton: true,
                    focusConfirm: false,
                    confirmButtonText: "@lang('messages.confirmUnpin')",
                    cancelButtonText: "@lang('app.cancel')",
                    customClass: {
                        confirmButton: "btn btn-primary mr-3",
                        cancelButton: "btn btn-secondary",
                    },
                    showClass: {
                        popup: "swal2-noanimation",
                        backdrop: "swal2-noanimation",
                    },
                    buttonsStyling: false,
                }).then((result) => {
                    if (result.isConfirmed) {
                        var url = "{{ route('projects.destroy_pin', ':id') }}";
                        url = url.replace(":id", id);

                        var token = "{{ csrf_token() }}";
                        $.easyAjax({
                            type: "POST",
                            url: url,
                            data: {
                                _token: token,
                                type: pinType,
                            },
                            success: function (response) {
                                if (response.status == "success") {
                                    window.location.reload();
                                }
                            },
                        });
                    }
                });
            } else {
                Swal.fire({
                    title: "@lang('messages.sweetAlertTitle')",
                    icon: "warning",
                    showCancelButton: true,
                    focusConfirm: false,
                    confirmButtonText: "@lang('messages.confirmPin')",
                    cancelButtonText: "@lang('app.cancel')",
                    customClass: {
                        confirmButton: "btn btn-primary mr-3",
                        cancelButton: "btn btn-secondary",
                    },
                    showClass: {
                        popup: "swal2-noanimation",
                        backdrop: "swal2-noanimation",
                    },
                    buttonsStyling: false,
                }).then((result) => {
                    if (result.isConfirmed) {
                        var url = "{{ route('projects.store_pin') }}?type=" + pinType;

                        var token = "{{ csrf_token() }}";
                        $.easyAjax({
                            type: "POST",
                            url: url,
                            data: {
                                _token: token,
                                project_id: id,
                            },
                            success: function (response) {
                                if (response.status == "success") {
                                    window.location.reload();
                                }
                            },
                        });
                    }
                });
            }
        });

        $("body").on("click", ".restore-project", function () {
            Swal.fire({
                title: "@lang('messages.sweetAlertTitle')",
                text: "@lang('messages.unArchiveMessage')",
                icon: "warning",
                showCancelButton: true,
                focusConfirm: false,
                confirmButtonText: "@lang('messages.confirmRevert')",
                cancelButtonText: "@lang('app.cancel')",
                customClass: {
                    confirmButton: "btn btn-primary mr-3",
                    cancelButton: "btn btn-secondary",
                },
                showClass: {
                    popup: "swal2-noanimation",
                    backdrop: "swal2-noanimation",
                },
                buttonsStyling: false,
            }).then((result) => {
                if (result.isConfirmed) {
                    var url = "{{ route('projects.archive_restore', $project->id) }}";

                    var token = "{{ csrf_token() }}";

                    $.easyAjax({
                        type: "POST",
                        url: url,
                        data: {
                            _token: token,
                        },
                        success: function (response) {
                            if (response.status == "success") {
                                window.location.reload();
                            }
                        },
                    });
                }
            });
        });

        $("body").on("click", "#new-chat", function () {
            let clientId = $(this).data("client-id");
            const url = "{{ route('messages.create') }}?clientId=" + clientId;
            $(MODAL_LG + " " + MODAL_HEADING).html("...");
            $.ajaxModal(MODAL_LG, url);
        });
    });
</script>
