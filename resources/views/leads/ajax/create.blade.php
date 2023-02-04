@php
$viewLeadAgentPermission = user()->permission('view_lead_agents');
$viewLeadCategoryPermission = user()->permission('view_lead_category');
$viewLeadSourcesPermission = user()->permission('view_lead_sources');
$addLeadAgentPermission = user()->permission('add_lead_agent');
$addLeadSourcesPermission = user()->permission('add_lead_sources');
$addLeadCategoryPermission = user()->permission('add_lead_category');
$addLeadNotePermission = user()->permission('add_lead_note');
@endphp
<link href="https://cdn.jsdelivr.net/npm/summernote@0.8.18/dist/summernote.min.css" rel="stylesheet">
<link rel="stylesheet" href="{{ asset('vendor/css/dropzone.min.css') }}">
<style>
        label.error {
            color: #dc3545;
            font-size: 14px;
        }
    </style>
<div class="row">

    <div class="col-sm-12">

        <form action="{{route('store-lead')}}" id="store-lead" method="post">
          @csrf

            <div class="add-client bg-white rounded">
                <h4 class="mb-0 p-20 f-21 font-weight-normal text-capitalize border-bottom-grey">
                    @lang('modules.lead.leadDetails')</h4>
                <div class="row p-20">

                  {{-- <div class="col-lg-4 col-md-6">
                        <x-forms.select fieldId="salutation" :fieldLabel="__('modules.client.salutation')"
                            fieldName="salutation">
                            <option value="">--</option>
                            @foreach ($salutations as $salutation)
                                <option value="{{ $salutation }}">@lang('app.'.$salutation)</option>
                            @endforeach
                        </x-forms.select>
                    </div> --}}

               <div class="col-lg-6 col-md-6">
                        <x-forms.text :fieldLabel="__('Project Name')" fieldName="client_name"
                            fieldId="client_name" :fieldPlaceholder="__('Enter Project Name')" fieldRequired="true" required />
                    </div>


                              <div class="col-lg-6 col-md-6">
                                  <x-forms.select fieldId="country" :fieldLabel="__('Client Country')" fieldName="country"
                                      search="true"  fieldRequired="true" required>
                                      <option value="">--</option>
                                      @foreach ($countries as $item)
                                          <option data-tokens="{{ $item->iso3 }}"
                                              data-content="<span class='flag-icon flag-icon-{{ strtolower($item->iso) }} flag-icon-squared'></span> {{ $item->nicename }}"
                                              value="{{ $item->nicename }}">{{ $item->nicename }}</option>
                                      @endforeach
                                  </x-forms.select>
                              </div>
                              <div class="col-lg-4 col-md-4">
                                       <x-forms.text :fieldLabel="__('Project Link')" fieldName="project_link"
                                           fieldId="project_link" :fieldPlaceholder="__('Enter Project Link From Freelancer.com')" fieldRequired="true" required/>
                                   </div>
                                   <?php
                                   $previous_date= Carbon\Carbon::now()->format('Y-m-d');
                                    ?>
                                   <input type="hidden" name="" id="previousDate" value="{{$previous_date}}">
                                   <div class="col-md-4 col-lg-4 mt-3" id="deadlineBox">
                                     <label for="">Deadline <span style="color:red;">*</span></label>
                                     <input type="date" min="{{$previous_date}}" class="form-control height-35 f-14" name="deadline" id="deadline" value="">

                                   </div>


                                   <?php
                                    $currencies= App\Models\Currency::all();

                                    ?>
                                   <div class="col-md-4 col-lg-4 mt-3 ">

                                       <div class="form-group c-inv-select mb-lg-0 mb-md-0 mb-4">
                                           <x-forms.label fieldId="original_currency_id" :fieldLabel="__('modules.invoices.currency')">
                                           </x-forms.label>


                                           <div class="select-others height-35 rounded">
                                               <select class="form-control height-35 f-14 select-picker" name="original_currency_id" id="original_currency_id">
                                                   @foreach ($currencies as $currency)
                                                   <option

                                                       value="{{ $currency->id }}">
                                                       {{ $currency->currency_code . ' (' . $currency->currency_symbol . ')' }}
                                                   </option>
                                                   @endforeach
                                               </select>
                                           </div>
                                       </div>
                                   </div>
                                   <div class="col-md-5 mt-3" id="set-time-estimate-fields">
                                       <label for="">Project Budget <span style="color:red;">*</span></label>
                                       <div class="form-group">

                                           <input type="number"  class="w-25 border rounded p-2 height-35 f-14"
                                               name="bid_value" min="1" id="bid_value" placeholder="Minimum">

                                           <input type="number" name="bid_value2"
                                           class="w-25 height-35 f-14 border rounded p-2" id="bid_value2" placeholder="Maximum">

                                       </div>
                                   </div>
                                   <div class="col-lg-2 col-md-2">
                                       <x-forms.text class="mr-0 mr-lg-2 mr-md-2" :fieldLabel="__('Bid') .' '. __('Value')"
                                           fieldName="value" fieldId="value" min="1" fieldRequired="true"/>
                                   </div>


                                   <!-- CURRENCY START -->


                                   <div class="col-md-5  mt-3" id="set-time-estimate-fields">
                                       <label for="">Bidding Delay Time <span style="color:red;">*</span></label>
                                       <div class="form-group">

                                           <input type="number" min="0" class="w-25 border rounded p-2 height-35 f-14"
                                               name="bidding_minutes">
                                           @lang('Minutes')
                                           &nbsp;&nbsp;
                                           <input type="number" min="0" name="bidding_seconds"
                                           class="w-25 height-35 f-14 border rounded p-2">
                                           @lang('Seconds')
                                       </div>
                                   </div>
                                   <!-- CURRENCY END -->
                                   <div class="col-md-12 col-lg-12">
                                       <div class="form-group my-3">
                                           <x-forms.label class="my-3" fieldId="description"
                                               :fieldLabel="__('Project Description')" fieldRequired="true">
                                           </x-forms.label>
                                           <div id="description"></div>
                                           <textarea name="description" id="description-text"
                                               class="d-none">{!!old('description')!!}</textarea>
                                       </div>
                                   </div>
                                   <div class="col-md-12 col-lg-12">
                                       <div class="form-group my-3">
                                           <x-forms.label class="my-3" fieldId="cover_letter"
                                               :fieldLabel="__('Cover Letter')" fieldRequired="true">
                                           </x-forms.label>
                                           <div id="cover_letter"></div>
                                           <textarea name="cover_letter" id="cover-letter-text"
                                               class="d-none">{!!old('cover_letter')!!}</textarea>
                                       </div>
                                   </div>

                                  {{-- <div class="col-md-12 mt-3">
                                     <div class="form-group">
                                       <label for="exampleFormControlTextarea1">Project Description <span style="color:red;">*</span></label>
                                       <textarea name="description" class="form-control" id="description" rows="3" required></textarea>
                                     </div>
                                   </div> --}}

                                {{--   <div class="col-md-12">
                                     <div class="form-group">
                                       <label for="exampleFormControlTextarea1">Cover Letter <span style="color:red;">*</span></label>
                                       <textarea name="cover_letter" class="form-control" id="cover_letter" rows="3" required></textarea>
                                     </div>
                                   </div> --}}
                                   <div class="col-lg-4 col-md-4">
                                            <x-forms.text :fieldLabel="__('Bids Insight Page (Screenshot)')" fieldName="insight_screenshot"
                                                fieldId="insight_screenshot" :fieldPlaceholder="__('Enter the link only')" fieldRequired="true" />
                                        </div>
                                        <div class="col-lg-4 col-md-4">
                                                 <x-forms.text :fieldLabel="__('Bids Page (Screenshot)')" fieldName="bidpage_screenshot"
                                                     fieldId="bidpage_screenshot" :fieldPlaceholder="__('Enter the link only')"  />
                                             </div>
                                             <div class="col-lg-4 col-md-4">
                                                      <x-forms.text :fieldLabel="__('Project Page (Screenshot)')" fieldName="projectpage_screenshot"
                                                          fieldId="projectpage_screenshot" :fieldPlaceholder="__('Enter the link only')" fieldRequired="true" />
                                                  </div>

                                   @if (isset($fields) && count($fields) > 0)
                                       @foreach ($fields as $field)
                                           <div class="col-md-12">
                                               @if ($field->type == 'text')
                                                   <x-forms.text fieldId="custom_fields_data[{{ $field->name . '_' . $field->id }}]"
                                                       :fieldLabel="$field->label"
                                                       fieldName="custom_fields_data[{{ $field->name . '_' . $field->id }}]"
                                                       :fieldPlaceholder="$field->label"
                                                       :fieldRequired="($field->required === 'yes') ? true : false">
                                                   </x-forms.text>
                                               @elseif($field->type == 'password')
                                                   <x-forms.password
                                                       fieldId="custom_fields_data[{{ $field->name . '_' . $field->id }}]"
                                                       :fieldLabel="$field->label"
                                                       fieldName="custom_fields_data[{{ $field->name . '_' . $field->id }}]"
                                                       :fieldPlaceholder="$field->label"
                                                       :fieldRequired="($field->required === 'yes') ? true : false">
                                                   </x-forms.password>
                                               @elseif($field->type == 'number')
                                                   <x-forms.number
                                                       fieldId="custom_fields_data[{{ $field->name . '_' . $field->id }}]"
                                                       :fieldLabel="$field->label"
                                                       fieldName="custom_fields_data[{{ $field->name . '_' . $field->id }}]"
                                                       :fieldPlaceholder="$field->label"
                                                       :fieldRequired="($field->required === 'yes') ? true : false">
                                                   </x-forms.number>
                                               @elseif($field->type == 'textarea')
                                                   <x-forms.textarea :fieldLabel="$field->label"
                                                       fieldName="custom_fields_data[{{ $field->name . '_' . $field->id }}]"
                                                       fieldId="custom_fields_data[{{ $field->name . '_' . $field->id }}]"
                                                       :fieldRequired="($field->required === 'yes') ? true : false"
                                                       :fieldPlaceholder="$field->label">
                                                   </x-forms.textarea>
                                               @elseif($field->type == 'radio')
                                                   <div class="form-group my-3">
                                                       <x-forms.label
                                                           fieldId="custom_fields_data[{{ $field->name . '_' . $field->id }}]"
                                                           :fieldLabel="$field->label"
                                                           :fieldRequired="($field->required === 'yes') ? true : false">
                                                       </x-forms.label>
                                                       <div class="d-flex">
                                                           @foreach ($field->values as $key => $value)
                                                               <x-forms.radio fieldId="optionsRadios{{ $key . $field->id }}"
                                                                   :fieldLabel="$value"
                                                                   fieldName="custom_fields_data[{{ $field->name . '_' . $field->id }}]"
                                                                   :fieldValue="$value" :checked="($key == 0) ? true : false" />
                                                           @endforeach
                                                       </div>
                                                   </div>
                                               @elseif($field->type == 'select')
                                                   <div class="form-group my-3">
                                                       <x-forms.label
                                                           fieldId="custom_fields_data[{{ $field->name . '_' . $field->id }}]"
                                                           :fieldLabel="$field->label"
                                                           :fieldRequired="($field->required === 'yes') ? true : false">
                                                       </x-forms.label>
                                                       {!! Form::select('custom_fields_data[' . $field->name . '_' . $field->id . ']', $field->values, isset($editUser) ? $editUser->custom_fields_data['field_' . $field->id] : '', ['class' => 'form-control select-picker']) !!}
                                                   </div>
                                               @elseif($field->type == 'date')
                                                   <x-forms.datepicker custom="true"
                                                       fieldId="custom_fields_data[{{ $field->name . '_' . $field->id }}]"
                                                       :fieldRequired="($field->required === 'yes') ? true : false"
                                                       :fieldLabel="$field->label"
                                                       fieldName="custom_fields_data[{{ $field->name . '_' . $field->id }}]"
                                                       :fieldValue="now()->timezone(global_setting()->timezone)->format(global_setting()->date_format)"
                                                       :fieldPlaceholder="$field->label" />
                                               @elseif($field->type == 'checkbox')
                                                   <div class="form-group my-3">
                                                       <x-forms.label
                                                           fieldId="custom_fields_data[{{ $field->name . '_' . $field->id }}]"
                                                           :fieldLabel="$field->label"
                                                           :fieldRequired="($field->required === 'yes') ? true : false">
                                                       </x-forms.label>
                                                       <div class="d-flex checkbox-{{$field->id}}">
                                                           <input type="hidden" name="custom_fields_data[{{$field->name.'_'.$field->id}}]" id="{{$field->name.'_'.$field->id}}">

                                                           @foreach ($field->values as $key => $value)
                                                               <x-forms.checkbox fieldId="optionsRadios{{ $key . $field->id }}"
                                                                   :fieldLabel="$value"
                                                                   fieldName="$field->name.'_'.$field->id.'[]'"
                                                                   :fieldValue="$value"
                                                                   onchange="checkboxChange('checkbox-{{$field->id}}', '{{$field->name.'_'.$field->id}}')"
                                                                   :fieldRequired="($field->required === 'yes') ? true : false" />
                                                           @endforeach
                                                       </div>
                                                   </div>
                                               @endif

                                           </div>
                                       @endforeach
                                   @endif












                </div>
                @if ($errors->any())
                  <ul class="ml-5 mb-3">{!! implode('', $errors->all('<li style="color:red">:message</li>')) !!}</ul>
              @endif



                <div class="row p-20 d-none" id="other-details">



                </div>
                <div class="col-lg-4 col-md-6">
                      <button type="submit" class="btn btn-primary submit-button"><span class="btn-txt">Create Lead<span></button>
                </div>
                <br>
                <br>






                  {{--  <x-forms.button-primary id="save-lead-form" class="mr-3" icon="check">@lang('app.save')
                    </x-forms.button-primary>
                    <x-forms.button-cancel :link="route('tasks.index')" class="border-0">@lang('app.cancel')
                    </x-forms.button-cancel>
                </x-form-actions> --}}

            </div>
        </form>

    </div>
</div>






<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-validate/1.19.2/jquery.validate.min.js"></script>





<script>

        $(document).ready(function() {
          quillImageLoad('#description');
            quillImageLoad('#cover_letter');


        var previousDate = $("#previousDate").val();
            $("#store-lead").validate({
                rules: {
                    client_name: {
                        required: true,
                        maxlength: 100,
                        minlength: 10,
                    },
                    country:{
                        required: true,

                    },
                    project_link: {
                      url:true,
                      required: true,

                    },
                    deadline: {
                        required: true,
                        lessThan: previousDate,
                        date: true
                    },

                    original_currency_id: {
                        required: true,

                    },
                    bid_value: {
                        required: true,
                        number:true,
                        minValue:1
                    },
                    bid_value2: {
                        required: true,
                        number:true,
                        minValue: "#bid_value"
                    },
                    value: {
                        required: true,
                        number:true,
                        minValue:1
                    },
                    description: {
                        required: true,
                        minlength: 50
                    },
                    cover_letter: {
                        required: true,
                        minlength: 100
                    },
                    insight_screenshot: {
                      url:true,
                      required: true,

                    },

                    projectpage_screenshot: {
                      url:true,
                      required: true,

                    },
                },
                messages: {
                    client_name: {
                        required: "Project name is required",
                        maxlength: "Project name cannot be more than 100 characters",
                        minlength: "Project name cannot be less than 10 characters"
                    },
                    country: {
                        required: "Please Select a Country"

                    },
                    project_link: {
                        required: "Project link is required",
                        url: "Link must be a valid url"

                    },
                    deadline: {
                        required: "Deadline is required",
                        lessThan: "Date cannot be past date"
                    },
                    original_currency_id: {
                        required: "Please select a currency",

                    },
                    bid_value: {
                        required:  "Minimum Bid value is required",
                        minValue: "Minimum bid value should be greater than 0",
                    },
                    bid_value2: {
                      required:  "Maximum Bid value is required",
                      greaterThan: "Maximum bid value should be equal or greater than minimum bid value"
                    },
                    value: {
                      required:  "Bid value is required",

                    },
                    description: {
                        required: "Project description is required",
                        minlength: "Project description cannot be less than 10 characters"
                    },
                    cover_letter: {
                        required: "Cover letter is required",
                        minlength: "Cover letter cannot be less than 100 characters"
                    },
                    insight_screenshot: {
                        required: "Insight page screenshot is required",
                        url: "Link must be a valid url"

                    },

                    projectpage_screenshot: {
                        required: "Project page screenshot is required",
                        url: "Link must be a valid url"

                    },
                }
            });

        });
        $('#store-lead').click(function() {
            var note = document.getElementById('description').children[0].innerHTML;
            document.getElementById('description-text').value = note;
            var note2 = document.getElementById('cover_letter').children[0].innerHTML;
            document.getElementById('cover-letter-text').value = note2;
        });

    </script>
    <script>
$(document).ready(function() {
  $("#store-lead").submit(function() {
    $(".result").text("");
    $(".loading-icon").removeClass("hide");
    $(".submit-button").attr("disabled", true);
    $(".btn-txt").text("Processing ...");
  });
});
</script>
