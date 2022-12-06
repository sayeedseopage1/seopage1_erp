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


                  <div class="col-lg-4 col-md-6">
                           <x-forms.text :fieldLabel="__('Client Name')" fieldName="client_name"
                               fieldId="client_name" :fieldPlaceholder="__('placeholders.name')" fieldRequired="true" required />
                       </div>
                       <div class="col-lg-4 col-md-6">
                                <x-forms.text :fieldLabel="__('Client Username')" fieldName="client_username"
                                    fieldId="client_username" :fieldPlaceholder="__('placeholders.name')" fieldRequired="true" required />
                            </div>
               <div class="col-lg-4 col-md-4">
                        <x-forms.text :fieldLabel="__('Project Name')" fieldName="project_name"
                            fieldId="project_name" :fieldPlaceholder="__('placeholders.name')" fieldRequired="true" required />
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

                              <div class="col-lg-12 col-md-12">
                                       <x-forms.text :fieldLabel="__('Project Link')" fieldName="project_link"
                                           fieldId="project_link" :fieldPlaceholder="__('placeholders.name')" fieldRequired="true" required/>
                                   </div>




                                   <!-- CURRENCY START -->



                                   <!-- CURRENCY END -->


                                   <div class="col-md-12 mt-3">
                                     <div class="form-group">
                                       <label for="exampleFormControlTextarea1">Project Description <span style="color:red;">*</span></label>
                                       <textarea name="description" class="form-control" id="description2" rows="3" required></textarea>
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

});
</script>
