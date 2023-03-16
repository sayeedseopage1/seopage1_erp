<link href="https://cdn.jsdelivr.net/npm/summernote@0.8.18/dist/summernote.min.css" rel="stylesheet">
<link rel="stylesheet" href="{{ asset('vendor/css/dropzone.min.css') }}">

<div class="row">
    <div class="col-sm-12">
        <form action="{{route('update.deal')}}" method="post">
          @csrf
          <input type="hidden" name="id" value="{{$deal->id}}">
            <div class="add-client bg-white rounded">
                <h4 class="mb-0 p-20 f-21 font-weight-normal text-capitalize border-bottom-grey">
                    @lang('Update Deal')</h4>
                <div class="row p-20">


                  <div class="col-lg-4 col-md-6">
                    <label for="">Client Name</label>
                    <input type="text" class="form-control height-35 f-14" name="client_name" value="{{$deal->client_name}}" required>

                       </div>
                       <div class="col-lg-4 col-md-6">
                         <label for="">Client User Name</label>
                         <input type="text" class="form-control height-35 f-14" name="client_username" value="{{$deal->client_username}}" required>

                            </div>
               <div class="col-lg-4 col-md-4">
                 <label for="">Project Name</label>
                 <input type="text" class="form-control height-35 f-14" name="project_name" value="{{$deal->project_name}}" required>

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
                                            <option selected value="{{$deal->original_currency_id}}">  {{ $deal->original_currency->currency_code . ' (' . $deal->original_currency->currency_symbol . ')' }}</option>
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
                              <div class="col-lg-6 col-md-6 mt-3">
                                <label for="">Project Budget</label>
                                <input type="text" class="form-control height-35 f-14" name="amount" value="{{$deal->actual_amount}}" required>

                              </div>

                              <div class="col-lg-12 col-md-12 mt-3">
                                <label for="">Project Link</label>
                                <input type="text" class="form-control height-35 f-14" name="project_link" value="{{$deal->project_link}}" required>

                                   </div>




                                   <!-- CURRENCY START -->



                                   <!-- CURRENCY END -->


                                   <div class="col-md-12 mt-3">
                                     <div class="form-group">
                                       <label for="exampleFormControlTextarea1">Project Description <span style="color:red;">*</span></label>
                                       <textarea name="description" value="{{$deal->description}}" class="form-control" id="description3" rows="3" >{!!$deal->description!!}</textarea>
                                     </div>
                                   </div>










                </div>





                <div class="col-lg-4 col-md-6">
                      <button type="submit" class="btn btn-primary">Update Deal</button>
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
  $('#description3').summernote();

});
</script>
