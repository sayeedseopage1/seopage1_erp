<!-- ROW START -->
<div class="row">
    <!--  USER CARDS START -->
    <div class="col-xl-12 col-lg-12 col-md-12 mb-4 mb-xl-0 mb-lg-4 mb-md-0">

        <x-cards.data :title="__('Lead Details')">

            <x-slot name="action">
                <div class="dropdown">
                    <button class="btn f-14 px-0 py-0 text-dark-grey dropdown-toggle" type="button"
                        data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <i class="fa fa-ellipsis-h"></i>
                    </button>

                    <div class="dropdown-menu dropdown-menu-right border-grey rounded b-shadow-4 p-0"
                        aria-labelledby="dropdownMenuLink" tabindex="0">
                        <a class="dropdown-item openRightModal"
                            href="{{ route('leads.edit', $lead->id) }}">@lang('app.edit')</a>
                            @if($lead->deal_status == 0)
                            <a class="dropdown-item"
                                  data-toggle="modal" data-target="#dealstmodal" onclick="dataTableRowCheck2(' {{$lead->id}} ')">@lang('Convert to Deal')</a>
                                  @else
                                  <a class="dropdown-item"
                                      href="/deal-stage-view/{{$lead->id}}">@lang('View Deal Stage')</a>
                                  @endif

                    </div>
                </div>
            </x-slot>
            @include('contracts.modals.dealstmodal')

            <x-cards.data-row :label="__('Project Name')" :value="$lead->client_name ?? '--'" />

            <!-- <x-cards.data-row :label="__('modules.lead.clientEmail')" :value="$lead->client_email ?? '--'" /> -->

            <!-- <x-cards.data-row :label="__('Project Name')" :value="!empty($lead->project_name) ? mb_ucwords($lead->project_name) : '--'" /> -->
            <x-cards.data-row :label="__('Project ID')" :value="!empty($lead->project_id) ? mb_ucwords($lead->project_id) : '--'" />
                <x-cards.data-row :label="__('Project Link')" :value="!empty($lead->project_link) ? mb_ucwords($lead->project_link) : '--'" />



            <div class="col-12 px-0 pb-3 d-flex">
                <p class="mb-0 text-lightest f-14 w-30 d-inline-block text-capitalize">
                    @lang('Added By')</p>
                <p class="mb-0 text-dark-grey f-14">
                    @if (!is_null($lead->added_by))
                    {{$lead->user->name}}


                    @else
                        --
                    @endif
                </p>
            </div>

            <div class="col-12 px-0 pb-3 d-flex">
                <p class="mb-0 text-lightest f-14 w-30 d-inline-block text-capitalize">
                    @lang('Client Country')</p>
                <p class="mb-0 text-dark-grey f-14">
                    @if (!is_null($lead->country))
                    {{$lead->country}}


                    @else
                        --
                    @endif
                </p>
            </div>

            <!-- <x-cards.data-row :label="__('modules.lead.source')" :value="$lead->leadSource->type ?? '--'" /> -->

            @if ($lead->leadStatus)
                <div class="col-12 px-0 pb-3 d-flex">
                    <p class="mb-0 text-lightest f-14 w-30 d-inline-block text-capitalize">@lang('app.status')</p>
                    <p class="mb-0 text-dark-grey f-14">
                        <x-status :value="ucfirst($lead->leadStatus->type)"
                            :style="'color:'.$lead->leadStatus->label_color" />
                    </p>

                </div>
            @endif
            <div class="col-12 px-0 pb-3 d-flex">
                <p class="mb-0 text-lightest f-14 w-30 d-inline-block">
                    @lang('Bids Insight Page Screenshot (Full)')</p>
                <p class="mb-0 text-dark-grey f-14">
                    @if (!is_null($lead->insight_screenshot))
                  <a href="{{$lead->insight_screenshot}}" target="_blank">  {{$lead->insight_screenshot}} </a>


                    @else
                        --
                    @endif
                </p>
            </div>
            <div class="col-12 px-0 pb-3 d-flex">
                <p class="mb-0 text-lightest f-14 w-30 d-inline-block">
                    @lang('Bid Page Screenshot (Full)')</p>
                <p class="mb-0 text-dark-grey f-14">
                    @if (!is_null($lead->bidpage_screenshot))
                  <a href="{{$lead->bidpage_screenshot}}" target="_blank"> {{$lead->bidpage_screenshot}}</a>


                    @else
                        --
                    @endif
                </p>
            </div>
            <div class="col-12 px-0 pb-3 d-flex">
                <p class="mb-0 text-lightest f-14 w-30 d-inline-block">
                    @lang('Project Page Screenshot (Full)')</p>
                <p class="mb-0 text-dark-grey f-14">
                    @if (!is_null($lead->projectpage_screenshot))
                  <a href="{{$lead->projectpage_screenshot}}" target="_blank"> {{$lead->projectpage_screenshot}}</a>


                    @else
                        --
                    @endif
                </p>
            </div>
            <div class="col-12 px-0 pb-3 d-flex">
                <p class="mb-0 text-lightest f-14 w-30 d-inline-block text-capitalize">
                    @lang('Client Country')</p>
                <p class="mb-0 text-dark-grey f-14">
                    @if (!is_null($lead->country))
                    {{$lead->country}}


                    @else
                        --
                    @endif
                </p>
            </div>



            <!-- <x-cards.data-row :label="__('modules.lead.leadCategory')" :value="$lead->category->category_name ?? '--'" /> -->
            <?php
            $currency=App\Models\Currency::where('id',$lead->original_currency_id)->first();
            $value= $lead->actual_value. $currency->currency_symbol;
            $bid_value= $lead->bid_value. $currency->currency_symbol .'-'. $lead->bid_value2. $currency->currency_symbol  ;

             ?>
            <x-cards.data-row :label="__('Bid') . ' ' .__('Value')" :value="$value ?? '--'" />
            <x-cards.data-row :label="__('Project') . ' ' .__('Budget')" :value="$bid_value ?? '--'" />
            <hr>
            <div class="col-12 px-0 pb-3">
                <p class="mb-0 text-lightest f-14 w-30">
                    @lang('Project Description')</p>
                <p class="mb-0 text-dark-grey f-14 w-70">
                    @if (!is_null($lead->note))
                    {!! $lead->note !!}


                    @else
                        --
                    @endif
                </p>
            </div>
            <div class="col-12 px-0 pb-3 ">
                <p class="mb-0 text-lightest f-14 w-30">
                    @lang('Cover Letter')</p>
                <p class="text-dark-grey f-14 w-70">
                    @if (!is_null($lead->cover_letter))
                    {!! $lead->cover_letter!!}


                    @else
                        --
                    @endif
                </p>
            </div>

            {{-- <x-cards.data-row :label="__('app.note')" :value="!empty($lead->note) ? $lead->note : '--'" html="true" /> --}}

            {{-- Custom fields data --}}
            @if (isset($fields) && count($fields) > 0)
            @foreach ($fields as $field)
                    @if ($field->type == 'text' || $field->type == 'password' || $field->type == 'number')
                        <x-cards.data-row :label="$field->label"
                            :value="$lead->custom_fields_data['field_'.$field->id] ?? '--'" />
                    @elseif($field->type == 'textarea')
                        <x-cards.data-row :label="$field->label" html="true"
                            :value="$lead->custom_fields_data['field_'.$field->id] ?? '--'" />
                    @elseif($field->type == 'radio')
                        <x-cards.data-row :label="$field->label"
                            :value="(!is_null($lead->custom_fields_data['field_' . $field->id]) ? $lead->custom_fields_data['field_' . $field->id] : '--')" />
                    @elseif($field->type == 'checkbox')
                        <x-cards.data-row :label="$field->label"
                            :value="(!is_null($lead->custom_fields_data['field_' . $field->id]) ? $lead->custom_fields_data['field_' . $field->id] : '--')" />
                    @elseif($field->type == 'select')
                        <x-cards.data-row :label="$field->label"
                            :value="(!is_null($lead->custom_fields_data['field_' . $field->id]) ? $lead->custom_fields_data['field_' . $field->id] : '--')" />
                    @elseif($field->type == 'date')
                        <x-cards.data-row :label="$field->label"
                            :value="(!is_null($lead->custom_fields_data['field_' . $field->id]) && $lead->custom_fields_data['field_' . $field->id] != '' ? \Carbon\Carbon::parse($lead->custom_fields_data['field_' . $field->id])->format(global_setting()->date_format) : '--')" />
                    @endif
                @endforeach
            @endif
        </x-cards.data>
    </div>
    <!--  USER CARDS END -->
</div>
<!-- ROW END -->
<script>
function dataTableRowCheck2(id)
{
  //console.log(id);
  var id =id;



document.getElementById('mydata').value= id;
}
</script>
