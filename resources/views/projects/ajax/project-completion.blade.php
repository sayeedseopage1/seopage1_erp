@php
$addProjectCategoryPermission = user()->permission('manage_project_category');
$addClientPermission = user()->permission('add_clients');
$editProjectMemberPermission = user()->permission('edit_project_members');
$addEmployeePermission = user()->permission('add_employees');
$addProjectMemberPermission = user()->permission('add_project_members');
$addProjectMemberPermission = user()->permission('add_project_members');
$createPublicProjectPermission = user()->permission('create_public_project');

@endphp
<style media="screen">
.rating {
    float:left;
    display:flex;
    flex-direction: row-reverse;
    font-size:10px;
    margin-right:auto;
  }

  /* :not(:checked) is a filter, so that browsers that don’t support :checked don’t
    follow these rules. Every browser that supports :checked also supports :not(), so
    it doesn’t make the test unnecessarily selective */
  .rating:not(:checked) > input {
      position:absolute;
      top:-9999px;
      clip:rect(0,0,0,0);
  }

  .rating:not(:checked) > label {
      float:left;
      width:1em;
      /* padding:0 .1em; */
      overflow:hidden;
      white-space:nowrap;
      cursor:pointer;
      font-size:300%;
      /* line-height:1.2; */
      color:#ddd;
  }

  .rating:not(:checked) > label:before{
      content: '★ ';

  }

  .rating > input:checked ~ label {
      color: orange;

  }

  .rating:not(:checked) > label:hover,
  .rating:not(:checked) > label:hover ~ label{
      color: orange;

  }

  .rating > input:checked + label:hover,
  .rating > input:checked + label:hover ~ label,
  .rating > input:checked ~ label:hover,
  .rating > input:checked ~ label:hover ~ label,
  .rating > label:hover ~ input:checked ~ label

   {
      color: orange;

  }

  .rating > label:active {
      position:relative;
      top:2px;
      left:2px;
  }
  /* .rating:not(:checked) > label {
    float: left;
    width: 55px;

    overflow: hidden;
    white-space: nowrap;
    cursor: pointer;
    font-size: 5em;
    line-height: 1.2;
    color: #ddd;
} */
.rating:not(:checked) > label {
	float: left;
	width: 30px;
	/* padding: 0 .1em; */
	overflow: hidden;
	white-space: nowrap;
	cursor: pointer;
	font-size: 27px;
	line-height: 1.2;
	color: #ddd;
}

</style>

<link rel="stylesheet" href="{{ asset('vendor/css/dropzone.min.css') }}">

<div class="row">
    <div class="col-sm-12">
      <form action="{{route('project-completion')}}" method="POST">
        @csrf
        <input type="hidden" name="milestone_id" value="{{$milestone->id}}">
            <div class="add-client bg-white rounded">
                <h4 class="mb-0 p-20 f-21 font-weight-normal text-capitalize border-bottom-grey">
                    @lang('Project Completion Form')</h4>
                <div class="row p-20">
                    <div class="col-lg-12 col-md-12">
                      <label for="">Did you complete the QC Protocol?
                        <sup class="f-14 mr-1">*</sup>
                      </label>
                      <div class="row">
                        <div class="col-md-1">
                          <div class="form-check">
                                <input class="form-check-input @error('qc_protocol') is-invalid @enderror" type="radio" name="qc_protocol" value="1" id="flexRadioDefault1">
                                <label class="form-check-label form_custom_label text-dark-grey pl-2 mr-3 justify-content-start cursor-pointer checkmark-20 pt-2 text-wrap" for="flexRadioDefault1">
                                  Yes
                                </label>
                              </div>
                        </div>
                        <div class="col-md-1">
                          <div class="form-check">
                            <input class="form-check-input @error('qc_protocol') is-invalid @enderror" type="radio" name="qc_protocol" value="0" id="flexRadioDefault2">
                            <label class="form-check-label form_custom_label text-dark-grey pl-2 mr-3 justify-content-start cursor-pointer checkmark-20 pt-2 text-wrap" for="flexRadioDefault2">
                              No
                            </label>
                          </div>
                        </div>


                      </div>

                          @error('qc_protocol')
                          <div class="mt-3">
                            <div class="alert alert-danger">{{ $message }}</div>
                            </div>
                          @enderror
                    </div>
                    <div class="col-md-12 col-lg-12 mt-3">
                      <label for="">Submit Login Info for Future Use <sup class="f-14 mr-1">*</sup></label>
                      <div class="row">
                        <div class="col-md-4 col-lg-4">
                            <input type="text" class="form-control height-35 f-14 @error('login') is-invalid @enderror" name="login" value="" placeholder="Enter email/username">
                            @error('login')
                            <div class="mt-3">
                              <div class="alert alert-danger">{{ $message }}</div>
                              </div>
                            @enderror
                        </div>

                        <div class="col-md-4 col-lg-4">
                            <input type="text" class="form-control height-35 f-14 @error('password') is-invalid @enderror" name="password" value="" placeholder="Enter Password">
                            @error('password')
                            <div class="mt-3">
                              <div class="alert alert-danger">{{ $message }}</div>
                              </div>
                            @enderror
                        </div>

                        <div class="col-md-4 col-lg-4">
                            <input type="text" class="form-control height-35 f-14 @error('screenshot') is-invalid @enderror" name="screenshot" value="" placeholder="Enter Verification Link. (Screenshot)">
                            @error('screenshot')
                            <div class="mt-3">
                              <div class="alert alert-danger">{{ $message }}</div>
                              </div>
                            @enderror
                        </div>

                      </div>

                    </div>

                    <div class="col-lg-12 col-md-12 mt-5">
                      <label for="">Attach Google Drive Backup Folder Link <sup class="f-14 mr-1">*</sup></label>
                        <input type="text" class="form-control height-35 f-14 @error('google_link') is-invalid @enderror" name="google_link" value="">

                    </div>
                    @error('google_link')
                    <div class="mt-3">
                      <div class="alert alert-danger">{{ $message }}</div>
                      </div>
                    @enderror
                    <div class="col-lg-12 col-md-12 mt-3">
                      <div class="row">
                        <div class="col-md-4">
                          <label class="form-check-label form_custom_label text-dark-grey pl-2 mr-3 justify-content-start cursor-pointer checkmark-20 pt-2 text-wrap" for="flexRadioDefault2">
                           Please Rate The Work Quality of Technical Team
                             <sup class="f-14 mr-1">*</sup>
                          </label>
                          <div class="rating mt-3 ml-1">
                              <input class="@error('rating') is-invalid @enderror" type="radio" id="star10" name="rating" value="10" /><label for="star10" title="Meh"></label>
                              <input class="@error('rating') is-invalid @enderror" type="radio" id="star9" name="rating" value="9" /><label for="star9" title="Meh"></label>
                              <input class="@error('rating') is-invalid @enderror" type="radio" id="star8" name="rating" value="8" /><label for="star8" title="Meh"></label>
                              <input class="@error('rating') is-invalid @enderror" type="radio" id="star7" name="rating" value="7" /><label for="star7" title="Meh"></label>
                              <input class="@error('rating') is-invalid @enderror" type="radio" id="star6" name="rating" value="6" /><label for="star6" title="Meh"></label>
                              <input class="@error('rating') is-invalid @enderror" type="radio" id="star5" name="rating" value="5" /><label for="star5" title="Meh"></label>
                              <input class="@error('rating') is-invalid @enderror" type="radio" id="star4" name="rating" value="4" /><label for="star4" title="bad"></label>
                              <input class="@error('rating') is-invalid @enderror" type="radio" id="star3" name="rating" value="3" /><label for="star3" title="bad"></label>
                              <input class="@error('rating') is-invalid @enderror" type="radio" id="star2" name="rating" value="2" /><label for="star2" title="tim"></label>
                              <input class="@error('rating') is-invalid @enderror" type="radio" id="star1" name="rating" value="1" /><label for="star1" title="time"></label>
                          </div>
                          @error('rating')
                          <div class="mt-5 py-5">
                            <div class="alert alert-danger">{{ $message }}</div>
                            </div>
                          @enderror
                        </div>
                        <div class="col-md-4">
                          <label class="form-check-label form_custom_label text-dark-grey pl-2 mr-3 justify-content-start cursor-pointer checkmark-20 pt-2 text-wrap" for="">Did The Sales Executive Defined Requirements Properly?

                            <sup class="f-14 mr-1">*</sup>
                          </label>
                          <div class="rating mt-3 ml-1">
                              <input class="@error('requirements') is-invalid @enderror" type="radio" id="star20" name="requirements" value="10" /><label for="star20" title="Meh"></label>
                              <input class="@error('requirements') is-invalid @enderror" type="radio" id="star19" name="requirements" value="9" /><label for="star19" title="Meh"></label>
                              <input class="@error('requirements') is-invalid @enderror" type="radio" id="star18" name="requirements" value="8" /><label for="star18" title="Meh"></label>
                              <input class="@error('requirements') is-invalid @enderror" type="radio" id="star17" name="requirements" value="7" /><label for="star17" title="Meh"></label>
                              <input class="@error('requirements') is-invalid @enderror" type="radio" id="star16" name="requirements" value="6" /><label for="star16" title="Meh"></label>
                              <input class="@error('requirements') is-invalid @enderror" type="radio" id="star15" name="requirements" value="5" /><label for="star15" title="Meh"></label>
                              <input class="@error('requirements') is-invalid @enderror" type="radio" id="star14" name="requirements" value="4" /><label for="star14" title="bad"></label>
                              <input class="@error('requirements') is-invalid @enderror" type="radio" id="star13" name="requirements" value="3" /><label for="star13" title="bad"></label>
                              <input class="@error('requirements') is-invalid @enderror" type="radio" id="star12" name="requirements" value="2" /><label for="star12" title="tim"></label>
                              <input class="@error('requirements') is-invalid @enderror" type="radio" id="star11" name="requirements" value="1" /><label for="star11" title="time"></label>
                          </div>
                          @error('requirements')
                          <div class="mt-5 py-5">
                            <div class="alert alert-danger">{{ $message }}</div>
                            </div>
                          @enderror




                        </div>
                        <div class="col-md-4">
                          <label class="form-check-label form_custom_label text-dark-grey pl-2 mr-3 justify-content-start cursor-pointer checkmark-20 pt-2 text-wrap" for="">Did The Sales Executive Determined The Price Correctly?

                            <sup class="f-14 mr-1">*</sup>
                          </label>
                          <div class="rating mt-3 ml-1">
                              <input class="@error('price') is-invalid @enderror" type="radio" id="star30" name="price" value="10" /><label for="star30" title="Meh"></label>
                              <input class="@error('price') is-invalid @enderror" type="radio" id="star29" name="price" value="9" /><label for="star29" title="Meh"></label>
                              <input class="@error('price') is-invalid @enderror" type="radio" id="star28" name="price" value="8" /><label for="star28" title="Meh"></label>
                              <input class="@error('price') is-invalid @enderror" type="radio" id="star27" name="price" value="7" /><label for="star27" title="Meh"></label>
                              <input class="@error('price') is-invalid @enderror" type="radio" id="star26" name="price" value="6" /><label for="star26" title="Meh"></label>
                              <input class="@error('price') is-invalid @enderror" type="radio" id="star25" name="price" value="5" /><label for="star25" title="Meh"></label>
                              <input class="@error('price') is-invalid @enderror" type="radio" id="star24" name="price" value="4" /><label for="star24" title="bad"></label>
                              <input class="@error('price') is-invalid @enderror" type="radio" id="star23" name="price" value="3" /><label for="star23" title="bad"></label>
                              <input class="@error('price') is-invalid @enderror" type="radio" id="star22" name="price" value="2" /><label for="star22" title="tim"></label>
                              <input class="@error('price') is-invalid @enderror" type="radio" id="star21" name="price" value="1" /><label for="star21" title="time"></label>
                          </div>

                              @error('price')
                              <div class="mt-5 py-5">
                                <div class="alert alert-danger">{{ $message }}</div>
                                </div>
                              @enderror
                        </div>


                      </div>
                    </div>


                    <div class="col-lg-12 col-md-12">
                      <div class="row">
                        <div class="col-md-4">
                              <textarea  class="form-control f-14 @error('comments') is-invalid @enderror" rows="4" cols="80" name="comments"></textarea>
                              @error('comments')
                              <div class="mt-3">
                                <div class="alert alert-danger">{{ $message }}</div>
                                </div>
                              @enderror
                        </div>

                        <div class="col-md-4">
                              <textarea  class="form-control f-14 @error('comments2') is-invalid @enderror" rows="4" cols="80" name="comments2"></textarea>
                              @error('comments2')
                              <div class="mt-3">
                                <div class="alert alert-danger">{{ $message }}</div>
                                </div>
                              @enderror
                        </div>

                        <div class="col-md-4">
                              <textarea  class="form-control f-14 @error('comments3') is-invalid @enderror" rows="4" cols="80" name="comments3"></textarea>
                              @error('comments3')
                              <div class="mt-3">
                                <div class="alert alert-danger">{{ $message }}</div>
                                </div>
                              @enderror
                        </div>


                      </div>




                    </div>


                    <div class="col-md-12 col-lg-12 mt-5">
                      <div class="row">
                        <div class="col-md-6 col-lg-6 mt-1">

                          <label class="" for="">Submit The Niche/Category of The Project

                            <sup class="f-14 mr-1">*</sup>
                          </label>
                          <div class="input-group w-100">
                          <!-- <select class="form-control height-35 f-14 @error('niche') is-invalid @enderror" name="niche">
                            <option value="1">Category 1</option>
                            <option value="2">Category 2</option>
                            <option value="3">Category 3</option>

                          </select> -->

                          <!-- <div class="input-group-append">
                            <button class="btn btn-outline-secondary" data-toggle="modal" data-target="#milestoneaddmodal" type="button">Add</button>
                          </div> -->

                          <x-forms.input-group>
                              <select class="form-control select-picker" name="niche" id="niche"
                                  data-live-search="true" data-size="8" validation="@error('niche') is-invalid @enderror">
                                  <option value="">--</option>


                                          <option selected value="1">Category 1
                                          </option>

                              </select>


                                  <x-slot name="append">
                                      <button  type="button"
                                          class="btn btn-outline-secondary border-grey" data-toggle="modal" data-target="#nicheaddmodal">@lang('app.add')</button>
                                  </x-slot>
                                  @include('projects.modals.addnichemodal')

                          </x-forms.input-group>
                        </div>

                            @error('niche')
                            <div class="mt-3">
                              <div class="alert alert-danger">{{ $message }}</div>
                              </div>
                            @enderror
                        </div>
                        <div class="col-lg-6 col-md-6 mt-1">

                            <label for="">Submit The Dummy/Test Site Link <sup class="f-14 mr-1">*</sup></label>
                              <input type="text" class="form-control height-35 f-14 @error('dummy_link') is-invalid @enderror" name="dummy_link" value="">



                        </div>
                        @error('dummy_link')
                        <div class="mt-3">
                          <div class="alert alert-danger">{{ $message }}</div>
                          </div>
                        @enderror


                      </div>

                    </div>


                    <div class="col-lg-12 col-md-12 mt-5">
                      <label for="">Did You Notify the Client About Dummy Site Removal After 2-Weeks?

                        <sup class="f-14 mr-1">*</sup>
                      </label>
                      <div class="row">
                        <div class="col-md-1">
                          <div class="form-check">
                                <input class="form-check-input @error('notify') is-invalid @enderror" type="radio" name="notify" value="1" id="flexRadioDefault7">
                                <label class="form-check-label form_custom_label text-dark-grey pl-2 mr-3 justify-content-start cursor-pointer checkmark-20 pt-2 text-wrap" for="flexRadioDefault1">
                                  Yes
                                </label>
                              </div>
                        </div>
                        <div class="col-md-1">
                          <div class="form-check">
                            <input class="form-check-input @error('notify') is-invalid @enderror" type="radio" name="notify" value="0" id="flexRadioDefault8">
                            <label class="form-check-label form_custom_label text-dark-grey pl-2 mr-3 justify-content-start cursor-pointer checkmark-20 pt-2 text-wrap" for="flexRadioDefault2">
                              No
                            </label>
                          </div>
                        </div>
                      </div>


                          @error('notify')
                          <div class="mt-3">
                            <div class="alert alert-danger">{{ $message }}</div>
                            </div>
                          @enderror
                    </div>
                    <div class="col-lg-12 col-md-12 mt-3">

                        <label for="">Submit The Actual Site Link<sup class="f-14 mr-1">*</sup></label>
                          <input type="text" class="form-control height-35 f-14 @error('actual_link') is-invalid @enderror" name="actual_link" value="">




                    </div>
                    @error('actual_link')
                    <div class="mt-3">
                      <div class="alert alert-danger">{{ $message }}</div>
                      </div>
                    @enderror



                </div>


                  </div>

                  <br>

                  <button  class="btn-primary rounded f-14 p-2 mr-3 ml-3" id="save-project-form" type="submit" >Submit</button>

                    <x-forms.button-cancel :link="route('projects.index')" class="border-0">@lang('app.cancel')
                    </x-forms.button-cancel>


            </div>
        </form>

    </div>
</div>


<script src="{{ asset('vendor/jquery/dropzone.min.js') }}"></script>
<script>
    $(document).ready(function() {





        quillImageLoad('#login_info');
          quillImageLoad('#niche');









        $('#save-project-form').click(function() {

            var note2 = document.getElementById('login_info').children[0].innerHTML;
            document.getElementById('login_info-text').value = note2;
            var note3 = document.getElementById('niche').children[0].innerHTML;
            document.getElementById('niche-text').value = note3;




        });









        init(RIGHT_MODAL);

        $(document).on('click','.add_niche',function(e){

        e.preventDefault();
        //console.log("test");
        var data= {
          'title': $('.category_name').val(),



        }
        //console.log(data);
        $.ajaxSetup({
          headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
          }
        });
        $.ajax({
          type: "POST",
          url: "{{route('add-niche')}}",
          data: data,
          dataType: "json",
          success: function (response){
            if (response.status == 400) {
              $('#saveform_errList').html("");
              $('#saveform_errList').addClass('alert alert-danger');
              $.each(response.errors, function (key, err_values){
                $('#saveform_errList').append('<li>'+err_values+'</li>');
              });
            }
            else {
                $('#saveform_errList').html("");
                $('#success_message').addClass('alert alert-success');
                $('#success_message').text(response.message);
                $('#nicheaddmodal').modal('hide');
                $('#nicheaddmodal').find('input').val("");

                  fetchniche();

            }
          }
        });
      });


    });



</script>
