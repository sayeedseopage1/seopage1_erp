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
                              <select class="form-control select-picker" name="niche" id="option_value"
                                  data-live-search="true" data-size="8">


                                   @foreach($categories as $category)
                                  <option value="{{$category->id}}">{{$category->category_name}}</option>


                                  @endforeach



                              </select>


                                  <x-slot name="append">
                                      <button  type="button"
                                          class="btn btn-outline-secondary border-grey" data-toggle="modal" data-target="#nicheaddmodal" type="button">@lang('app.add')</button>
                                  </x-slot>


                          </x-forms.input-group>

                        </div>


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

                  <button  class="btn-primary rounded f-14 p-2 mr-3 ml-3"  type="submit" >Submit</button>

                    <x-forms.button-cancel :link="route('projects.index')" class="border-0">@lang('app.cancel')
                    </x-forms.button-cancel>


            </div>
        </form>

    </div>
</div>

  @include('projects.modals.addnichemodal')
    @include('projects.modals.deletenichemodal')
@push('scripts')
<script type="text/javascript">
$(document).ready(function() {
fetchniche();
function fetchniche()
{
  $.ajax({
    type: "GET",
    url: "{{route('get-niche')}}",

    dataType: "json",
    success: function (response){
    //  console.log(response.milestones);
      let spans= '';
      response.categories.forEach((item)=> {

        spans += `<tr>
          <td>${item.id}</td>
          <td>${item.category_name}</td>
          <td class="text-right">
            <button type="button" class="btn-secondary rounded f-14 p-2 delete_niche" value="${item.id}" >
        <svg class="svg-inline--fa fa-trash fa-w-14 mr-1" aria-hidden="true" focusable="false" data-prefix="fa" data-icon="trash" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" data-fa-i2svg="">
          <path fill="currentColor" d="M432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16zM53.2 467a48 48 0 0 0 47.9 45h245.8a48 48 0 0 0 47.9-45L416 128H32z"></path></svg><!-- <i class="fa fa-trash mr-1"></i> Font Awesome fontawesome.com -->
    Delete
</button></td>
        </tr>`
      });

      document.querySelector('#niche_value').innerHTML= spans;
    

    }
  });
}
$(document).on('click','.delete_niche',function(e){
  e.preventDefault();
  var category_id= $(this).val();
  //  console.log(category_id);
  $('#delete_niche_id').val(category_id);

  $('#deleteniche').modal('show');
});
$(document).on('click','.delete_niche_btn',function(e){
  e.preventDefault();

  var category_id= $('#delete_niche_id').val();
  //console.log(category_id);
  $.ajaxSetup({
    headers: {
      'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    }
  });
  $.ajax({
    type: "DELETE",
    url: "/projects/delete-niche/"+category_id,
    success: function (response){
      //console.log(response);
      Swal.fire({
  position: 'top-end',
  icon: 'success',
  title: 'Category Deleted Successfully',
  showConfirmButton: false,
  timer: 1500
})


        $('#success_message').addClass('alert alert-danger');
      $('#success_message').text(response.message);
      $('#deleteniche').modal('hide');
        $('delete_niche_btn').text("Yes Delete");
        fetchniche();
    }

  });

});
$(document).on('click','.add_niche',function(e){
  //alert('success');
e.preventDefault();
$('#editmilestone').modal('show');
//console.log("test");
var data= {
  'category_name': $('.category_name').val(),



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
      Swal.fire({
  position: 'top-end',
  icon: 'success',
  title: 'Category Added Successfully',
  showConfirmButton: false,
  timer: 1500
})
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


@endpush
