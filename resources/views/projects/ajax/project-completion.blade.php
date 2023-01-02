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
  .rating:not(:checked) > label {
    float: left;
    width: 55px;
    /* padding: 0 .1em; */
    overflow: hidden;
    white-space: nowrap;
    cursor: pointer;
    font-size: 5em;
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
                      <div class="form-check">
                            <input class="form-check-input @error('qc_protocol') is-invalid @enderror" type="radio" name="qc_protocol" value="1" id="flexRadioDefault1">
                            <label class="form-check-label form_custom_label text-dark-grey pl-2 mr-3 justify-content-start cursor-pointer checkmark-20 pt-2 text-wrap" for="flexRadioDefault1">
                              Yes
                            </label>
                          </div>
                          <div class="form-check">
                            <input class="form-check-input @error('qc_protocol') is-invalid @enderror" type="radio" name="qc_protocol" value="0" id="flexRadioDefault2">
                            <label class="form-check-label form_custom_label text-dark-grey pl-2 mr-3 justify-content-start cursor-pointer checkmark-20 pt-2 text-wrap" for="flexRadioDefault2">
                              No
                            </label>
                          </div>
                          @error('qc_protocol')
                          <div class="mt-3">
                            <div class="alert alert-danger">{{ $message }}</div>
                            </div>
                          @enderror
                    </div>
                    <div class="col-md-12 col-lg-12">
                        <div class="form-group my-3">
                            <x-forms.label class="my-3 @error('login_info') is-invalid @enderror" fieldId="login_info"
                                :fieldLabel="__(' Submit Login Info for Future Use
                                ')" fieldRequired="true">
                            </x-forms.label>
                            <div id="login_info"></div>
                            <textarea name="login_info" id="login_info-text"
                                class="d-none"></textarea>
                        </div>
                        @error('login_info')
                        <div class="mt-3">
                          <div class="alert alert-danger">{{ $message }}</div>
                          </div>
                        @enderror
                    </div>

                    <div class="col-lg-12 col-md-12">
                        <x-forms.text class="mr-0 mr-lg-2 mr-md-2 @error('google_link') is-invalid @enderror" :fieldLabel="__('Attach Google Drive Backup Folder Link
')"
                            fieldName="google_link" fieldRequired="true" fieldId="google_link"
                             :fieldPlaceholder="__('Attach Google Drive Backup Folder Link
')" />
                    </div>
                    @error('google_link')
                    <div class="mt-3">
                      <div class="alert alert-danger">{{ $message }}</div>
                      </div>
                    @enderror
                    <div class="col-lg-12 col-md-12">
                      <label class="form-check-label form_custom_label text-dark-grey pl-2 mr-3 justify-content-start cursor-pointer checkmark-20 pt-2 text-wrap" for="flexRadioDefault2">
                       Please Rate The Work Quality of Technical Team
                         <sup class="f-14 mr-1">*</sup>
                      </label>
                      <div class="rating mb-5 mt-3 ml-1">
                          <input type="radio" id="star5" name="rating" value="5" /><label for="star5" title="Meh">5 stars</label>
                          <input type="radio" id="star4" name="rating" value="4" /><label for="star4" title="Kinda bad">4 stars</label>
                          <input type="radio" id="star3" name="rating" value="3" /><label for="star3" title="Kinda bad">3 stars</label>
                          <input type="radio" id="star2" name="rating" value="2" /><label for="star2" title="Sucks big tim">2 stars</label>
                          <input type="radio" id="star1" name="rating" value="1" /><label for="star1" title="Sucks big time">1 star</label>
                      </div>
                    </div>
                    <div class="col-lg-12 col-md-12">
                      <label for="">Did The Sales Executive Defined Requirements Properly?

                        <sup class="f-14 mr-1">*</sup>
                      </label>
                      <div class="form-check">
                            <input class="form-check-input" type="radio" name="requirements" value="1" id="flexRadioDefault3">
                            <label class="form-check-label form_custom_label text-dark-grey pl-2 mr-3 justify-content-start cursor-pointer checkmark-20 pt-2 text-wrap" for="flexRadioDefault1">
                              Yes
                            </label>
                          </div>
                          <div class="form-check">
                            <input class="form-check-input" type="radio" name="requirements" value="0" id="flexRadioDefault4">
                            <label class="form-check-label form_custom_label text-dark-grey pl-2 mr-3 justify-content-start cursor-pointer checkmark-20 pt-2 text-wrap" for="flexRadioDefault2">
                              No
                            </label>
                          </div>
                    </div>
                    <div class="col-lg-12 col-md-12 mt-3">
                      <label for="">Did The Sales Executive Determined The Price Correctly?

                        <sup class="f-14 mr-1">*</sup>
                      </label>
                      <div class="form-check">
                            <input class="form-check-input" type="radio" name="price" value="1" id="flexRadioDefault5">
                            <label class="form-check-label form_custom_label text-dark-grey pl-2 mr-3 justify-content-start cursor-pointer checkmark-20 pt-2 text-wrap" for="flexRadioDefault1">
                              Yes
                            </label>
                          </div>
                          <div class="form-check">
                            <input class="form-check-input" type="radio" name="price" value="0" id="flexRadioDefault6">
                            <label class="form-check-label form_custom_label text-dark-grey pl-2 mr-3 justify-content-start cursor-pointer checkmark-20 pt-2 text-wrap" for="flexRadioDefault2">
                              No
                            </label>
                          </div>
                    </div>
                    <div class="col-md-12 col-lg-12">
                        <div class="form-group my-3">
                            <x-forms.label class="my-3" fieldId="niche"
                                :fieldLabel="__(' Submit The Niche/Category of The Project
                                ')" fieldRequired="true">
                            </x-forms.label>
                            <div id="niche"></div>
                            <textarea name="niche" id="niche-text"
                                class="d-none"></textarea>
                        </div>
                    </div>
                    <div class="col-lg-12 col-md-12">
                        <x-forms.text class="mr-0 mr-lg-2 mr-md-2" :fieldLabel="__('Submit The Dummy/Test Site Link
')"
                            fieldName="dummy_link" fieldRequired="true" fieldId="dummy_link"
                             :fieldPlaceholder="__('Submit The Dummy/Test Site Link
')" />
                    </div>
                    <div class="col-lg-12 col-md-12 mt-3">
                      <label for="">Did You Notify the Client About Dummy Site Removal After 2-Weeks?

                        <sup class="f-14 mr-1">*</sup>
                      </label>
                      <div class="form-check">
                            <input class="form-check-input" type="radio" name="notify" value="1" id="flexRadioDefault7">
                            <label class="form-check-label form_custom_label text-dark-grey pl-2 mr-3 justify-content-start cursor-pointer checkmark-20 pt-2 text-wrap" for="flexRadioDefault1">
                              Yes
                            </label>
                          </div>
                          <div class="form-check">
                            <input class="form-check-input" type="radio" name="notify" value="0" id="flexRadioDefault8">
                            <label class="form-check-label form_custom_label text-dark-grey pl-2 mr-3 justify-content-start cursor-pointer checkmark-20 pt-2 text-wrap" for="flexRadioDefault2">
                              No
                            </label>
                          </div>
                    </div>
                    <div class="col-lg-12 col-md-12">
                        <x-forms.text class="mr-0 mr-lg-2 mr-md-2" :fieldLabel="__('Submit The Actual Site Link

')"
                            fieldName="actual_link" fieldRequired="true" fieldId="actual_link"
                             :fieldPlaceholder="__('Submit The Actual Site Link

')" />
                    </div>




















                </div>








                  </div>



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
    });



</script>
