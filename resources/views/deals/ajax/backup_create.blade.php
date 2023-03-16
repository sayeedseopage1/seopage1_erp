<link href="https://cdn.jsdelivr.net/npm/summernote@0.8.18/dist/summernote.min.css" rel="stylesheet">
<link rel="stylesheet" href="{{ asset('vendor/css/dropzone.min.css') }}">

<div class="row">
    <div class="col-sm-12">
        <form action="{{route('store.deal')}}" method="post">
          @csrf
            <div class="add-client bg-white rounded">
                <h4 class="mb-0 p-20 f-21 font-weight-normal text-capitalize border-bottom-grey">
                    @lang('Create Deal')</h4>
                <div class="row p-20">
                    <div class="col-lg-5 col-md-6">
                        <div class="form-group my-3" required="required">
                            <label class="f-14 text-dark-grey mb-12" data-label="true" for="client_name">Client Name
                                <sup class="f-14 mr-1">*</sup>
                                <svg class="svg-inline--fa fa-question-circle fa-w-16" data-toggle="popover" data-placement="top" data-content="Type Client Name" data-html="true" data-trigger="hover" aria-hidden="true" focusable="false" data-prefix="fa" data-icon="question-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg="" data-original-title="" title="">
                                    <path fill="currentColor" d="M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zM262.655 90c-54.497 0-89.255 22.957-116.549 63.758-3.536 5.286-2.353 12.415 2.715 16.258l34.699 26.31c5.205 3.947 12.621 3.008 16.665-2.122 17.864-22.658 30.113-35.797 57.303-35.797 20.429 0 45.698 13.148 45.698 32.958 0 14.976-12.363 22.667-32.534 33.976C247.128 238.528 216 254.941 216 296v4c0 6.627 5.373 12 12 12h56c6.627 0 12-5.373 12-12v-1.333c0-28.462 83.186-29.647 83.186-106.667 0-58.002-60.165-102-116.531-102zM256 338c-25.365 0-46 20.635-46 46 0 25.364 20.635 46 46 46s46-20.636 46-46c0-25.365-20.635-46-46-46z"></path>
                                </svg>
                            </label>
                            <input type="text" class="form-control height-35 f-14" placeholder="Enter Client Name" value="" name="client_name" id="client_name" autocomplete="off">
                        </div>
                    </div>
                  <div class="col-lg-5 col-md-6">
                           <x-forms.text :fieldLabel="__('Client Name')" fieldName="client_name"
                               fieldId="client_name" :fieldPlaceholder="__('Enter Client Name')" fieldRequired="true" required />
                       </div>

                       <div class="col-lg-5 col-md-6" id="client-username">
                                <x-forms.text :fieldLabel="__('Client Username')" fieldName="client_username"
                                    fieldId="client_username" :fieldPlaceholder="__('Enter Client Username')" fieldRequired="true" required />
                       </div>


                       <div class="col-lg-5 col-md-6" id="client-username-select">
                        <x-forms.label class="my-3" fieldRequired="true" fieldId="category_id"
                            :fieldLabel="__('Client Username')">
                        </x-forms.label>
                        <x-forms.input-group>
                            @php
                                $users= App\Models\User::where('role_id',null)->get();
                            @endphp
                            <select class="form-control select-picker" name="client_username" id="client_username"
                                data-live-search="true">
                                <option value="">--</option>
                                @foreach ($users as $user)
                                    <option
                                        value="{{ $user->user_name }}">
                                        {{ mb_ucwords($user->user_name) }}
                                    </option>
                                @endforeach
                            </select>


                        </x-forms.input-group>
                    </div>
                            <div class="col-md-6 col-lg-2 mt-1">
                                <div class="form-group">
                                    <div class="d-flex mt-5">
                                        <x-forms.checkbox fieldId="existing_client"
                                            :fieldLabel="__('Existing Client')" fieldName="existing_client" />
                                    </div>
                                </div>
                            </div>



               <div class="col-lg-6 col-md-6">
                        <x-forms.text :fieldLabel="__('Project Name')" fieldName="project_name"
                            fieldId="project_name" :fieldPlaceholder="__('Enter Project Name')" fieldRequired="true" required />
                    </div>
                    <div class="col-lg-6 col-md-6">
                        <x-forms.text :fieldLabel="__('Project Link')" fieldName="project_link"
                            fieldId="project_link" :fieldPlaceholder="__('Enter Project Link')" fieldRequired="true" required/>
                    </div>



                              <?php
                               $currencies= App\Models\Currency::all();

                               ?>
                              <div class="col-md-6 col-lg-6 mt-3 ">

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
                              <div class="col-lg-6 col-md-6">
                                  <x-forms.text class="mr-0 mr-lg-2 mr-md-2" :fieldLabel="__('Project') .' '. __('Budget')"
                                      fieldName="amount" fieldId="amount" fieldRequired="true"/>
                              </div>






                                   <!-- CURRENCY START -->



                                   <!-- CURRENCY END -->


                                   <div class="col-md-12 mt-3">
                                     <div class="form-group">
                                       <label for="exampleFormControlTextarea1">Project Description <span style="color:red;">*</span></label>
                                       <textarea name="description" class="form-control" id="description2" rows="3" required></textarea>
                                     </div>
                                   </div>
                                   <div class="col-md-12 mt-3">
                                     <div class="form-group">
                                       <label for="exampleFormControlTextarea1">Comments <span style="color:red;">*</span></label>
                                       <textarea name="comments" class="form-control" id="description3" rows="3" required></textarea>
                                     </div>
                                   </div>










                </div>





                <div class="col-lg-4 col-md-6">
                      <button type="submit" class="btn btn-primary">Create Deal</button>
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


<script src="{{ asset('vendor/jquery/dropzone.min.js') }}"></script>
<script>
  $(document).ready(function() {
$('#client-username').show();
$('#client-username-select').hide();
//$('#client-username').is("");
$('#existing_client').prop('checked', false);

$('#existing_client').click(function() {
   // alert("success");
            var check = $('#existing_client').is(":checked") ? true : false;
            if (check == true) {
                $('#client-username').hide();
                $('#client-username-select').show();
            } else {
                $('#client-username').show();
                $('#client-username-select').hide();
            }
        });
    });


</script>
<script>



        $('body').on('click', '.add-lead-agent', function() {
            var url = '{{ route('lead-agent-settings.create') }}';
            $(MODAL_LG + ' ' + MODAL_HEADING).html('...');
            $.ajaxModal(MODAL_LG, url);
        });

        $('body').on('click', '.add-lead-source', function() {
            var url = '{{ route('lead-source-settings.create') }}';
            $(MODAL_LG + ' ' + MODAL_HEADING).html('...');
            $.ajaxModal(MODAL_LG, url);
        });

        $('body').on('click', '.add-lead-category', function() {
            var url = '{{ route('leadCategory.create') }}';
            $(MODAL_LG + ' ' + MODAL_HEADING).html('...');
            $.ajaxModal(MODAL_LG, url);
        });

        $('.toggle-other-details').click(function() {
            $(this).find('svg').toggleClass('fa-chevron-down fa-chevron-up');
            $('#other-details').toggleClass('d-none');
        });

        init(RIGHT_MODAL);
    });

    function checkboxChange(parentClass, id){
        var checkedData = '';
        $('.'+parentClass).find("input[type= 'checkbox']:checked").each(function () {
            checkedData = (checkedData !== '') ? checkedData+', '+$(this).val() : $(this).val();
        });
        $('#'+id).val(checkedData);
    }
</script>
  <script src="https://cdn.jsdelivr.net/npm/summernote@0.8.18/dist/summernote.min.js"></script>
<script type="text/javascript">
$(document).ready(function() {
  $('#description2').summernote();
  $('#description3').summernote();

});
</script>
