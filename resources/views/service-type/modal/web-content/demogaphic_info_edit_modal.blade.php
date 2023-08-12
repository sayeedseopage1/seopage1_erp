<!--Page list Edit Modal -->
<div class="modal fade" id="demogaphic_info_edit_modal" tabindex="-1" aria-labelledby="pageListEditModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="pageListEditModalLabel">Demographic Information</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div class="container-fluid">
            <form action="" method="post" id="demographic_information_form">
                @csrf
                <div class="row">
                    <div class="col-md-2">
                        <label for="">Gender</label>
                        <select name="gender" id="gender" class="form-control height-35 f-14 placeholderText">
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                    </div>
                    <div class="col-md-3">
                        <label for="">Age (Put a Range)</label>
                        <div class="row">
                            <div class="col-md-6">
                                <input type="number" name="age1" id="age1" class="form-control placeholderText height-35 f-14" placeholder="18">
                            </div>
                            <div class="col-md-6">
                                <input type="number" name="age2" id="age2" class="form-control placeholderText height-35 f-14" placeholder="25 ">
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <label for="">Monthly Income (in USD)</label>
                        <input type="text" name="monthly_income" id="monthly_income" class="form-control placeholderText height-35 f-14" placeholder="$">
                    </div>
                    <div class="col-md-3">
                        <label for="">Education Level</label>
                        <input type="text" name="education_level" id="education_level" class="form-control placeholderText height-35 f-14" placeholder="Education Level">
                    </div>
                </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary reference_website_save" data-id="{{$web_content->id}}">Save changes</button>
        </div>
    </form>
      </div>
    </div>
  </div>
  <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
  <script>    
  $(document).ready(function() {
    $('.reference_website_save').click(function(event) {
      event.preventDefault();
      var id = $(this).data('id');
      var data = {
        '_token': "{{ csrf_token() }}",
        'gender': document.getElementById("gender").value,
        'age1': document.getElementById("age1").value,
        'age2': document.getElementById("age2").value,
        'monthly_income': document.getElementById("monthly_income").value,
        'education_level': document.getElementById("education_level").value,
        'deal_id': {{$web_content->deal_id}},
      };
      $.ajaxSetup({
        headers: {
          'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
      });
      $.ajax({
        url: '/projects/update-sales-demographic-information/' + id,
        method: 'put',
        data: data,
        dataType: "json",
        success: function(response) {
          window.location.reload();
          $("#demographic_information_form ").trigger("reset");
          toastr.success('Change Successfully');
        },
        error: function(error) {
          // console.log(response);
        }
      });
    });
  });
  </script>