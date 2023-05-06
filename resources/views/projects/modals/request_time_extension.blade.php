@php
 use Illuminate\Support\Carbon;
@endphp
<div class="modal fade" id="request_time_extension" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h6 class="modal-title fs-5 text-danger text-justify" id="exampleModalLabel">Hey there! When you need extra hours, just make sure to request them thoughtfully. If you go beyond the extended time limit, you'll need to get re-authorization. Take your time to figure out exactly how much extra time you need to complete the project, so you can avoid needing more authorization in the future. No rush, just make sure to plan ahead!</h6>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <form id="timeExtension" method="post">
                @csrf
                <div class="modal-body">
                    @php
                        $deliverables = \App\Models\ProjectDeliverable::where('project_id',$project->id)->get();
                    @endphp
                    <div class="mb-3">
                        <div class="dynamic-field" id="dynamic-field-1">
                            <label for="select_deliverable" class="form-label">Select Deliverable</label>
                            <div class="row">
                                <div class="col-md-12">
                                    <div class="form-group mb-0">
                                        <form id="deliverable-form">
                                            <select id="select-deliverable" class="selectpicker form-control" aria-label="Default select example" data-live-search="true" name="select_deliverable">
                                                <option selected>--</option>
                                                @foreach($deliverables as $deliverable)
                                                    <option value="{{$deliverable->id}}">{{$deliverable->title}}</option>
                                                @endforeach
                                            </select>
                                        </form>
                                    </div>
                                </div>
                            </div>
                            <div  id="additional-fields-container" style="display:none;">
                                <div class="row mt-3">
                                    <div class="col-md-3">
                                        <div class="mb-3">
                                            <label for="date" class="form-label">Previous Estimation Time</label>
                                            <input id="previous-estimation-time" type="text" class="form-control height-35 f-14" value="{{$deliverable->estimation_time}}" readonly>
                                        </div>
                                    </div>
                                    <div class="col-md-4">
                                        <div id="previous-due-date-container">
                                            <div class="mb-3">
                                                <label for="">Previous Due Date</label>
                                                <input type="text" class="form-control height-35 f-14" name="date" value="" readonly>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-2">
                                        <div class="mb-3">
                                            <label for="hours" class="form-label">Hours Log</label>
                                            <input type="time" class="form-control height-35 f-14" id="hours" readonly>
                                        </div>
                                    </div>
                                    <div class="col-md-3">
                                        <div class="mb-3">
                                            <label for="date" class="form-label">New Date<sup class="f-14">*</sup></label>
                                            <input type="datetime-local" class="form-control height-35 f-14" name="new_date" id="new_date" placeholder="mm/dd/yyyy" style="background: #ffffff;">
                                            <span id="newDateError" class="text-danger"></span>
                                        </div>
                                    </div>
                                </div>
                                <div class="mb-3">
                                    <label for="description" class="form-label">Explain Why You Need Extra Hours</label>
                                    <textarea name="description" id="descriptionText" class="form-control"></textarea>
                                    <script src="{{ asset('/ckeditor/ckeditor.js') }}"></script>
                                    <script>
                                        CKEDITOR.replace('description',{
                                            height: 60
                                        });
                                    </script>
                                </div>
                            </div>
                        </div>

                        <div class="append-buttons mt-4" style="display:none;">
                            <div class="clearfix">
                                <button type="button" id="add-button" class="btn btn-primary float-left text-uppercase shadow-sm"><i class="fa fa-plus fa-fw"></i></button>
                                <button type="button" id="remove-button" class="btn btn-secondary float-left text-uppercase ml-1" disabled="disabled"><i class="fa fa-minus fa-fw"></i></button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary" id="saveExtension">Save changes</button>
                </div>
            </form>
        </div>
    </div>
</div>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/flatpickr/dist/flatpickr.min.css">
<script src="https://cdn.jsdelivr.net/npm/flatpickr"></script>
<script type="text/javascript">
    // ================ESTIMATION TIME GET=======
    $('#select-deliverable').on('change', function() {
        var deliverableId = $(this).val();

        $.ajax({
            url: '/get-estimation-time/' + deliverableId,
            type: 'GET',
            success: function(data) {
                $('#previous-estimation-time').val(data);
            }
        });
    });
    // ================DUE DATE GET=======
    $('#select-deliverable').on('change', function() {
        var deliverableId = $(this).val();

        $.ajax({
            url: '/get-due-date/' + deliverableId,
            type: 'GET',
            success: function(data) {
                $('#previous-due-date-container input[name="date"]').val(data);
            }
        });
    });
    // ================ADD MORE BUTTON SECTION=======
    $(document).ready(function () {
        var buttonAdd = $("#add-button");
        var buttonRemove = $("#remove-button");
        var className = ".dynamic-field";
        var count = 0;
        var field = "";
        var maxFields = 50;

        function totalFields() {
            return $(className).length;
        }

        function addNewField() {
            var total = $('input[name="link[]"]').length;
            count = totalFields() + 1;
            field = $("#dynamic-field-1").clone();
            field.attr("id", "dynamic-field-" + count);
            $(className + ":last").after($(field));
        }

        function removeLastField() {
            if (totalFields() > 1) {
                $(className + ":last").remove();
            }
        }

        function enableButtonRemove() {
            if (totalFields() === 2) {
                buttonRemove.removeAttr("disabled");
                buttonRemove.addClass("shadow-sm");
            }
        }

        function disableButtonRemove() {
            if (totalFields() === 1) {
                buttonRemove.attr("disabled", "disabled");
                buttonRemove.removeClass("shadow-sm");
            }
        }

        function disableButtonAdd() {
            if (totalFields() === maxFields) {
                buttonAdd.attr("disabled", "disabled");
                buttonAdd.removeClass("shadow-sm");
            }
        }

        function enableButtonAdd() {
            if (totalFields() === maxFields - 1) {
                buttonAdd.removeAttr("disabled");
                buttonAdd.addClass("shadow-sm");
            }
        }

        buttonAdd.click(function () {
            addNewField();
            enableButtonRemove();
            disableButtonAdd();
        });

        buttonRemove.click(function () {
            removeLastField();
            disableButtonRemove();
            enableButtonAdd();
        });
    });
    // ================SELECT DELIVERABLE SECTION=======
    const selectDeliverable = document.getElementById('select-deliverable');
    const additionalFieldsContainer = document.getElementById('additional-fields-container');

    selectDeliverable.addEventListener('change', () => {
        if (selectDeliverable.value !== "--") {
            additionalFieldsContainer.style.display = "block";
        } else {
            additionalFieldsContainer.style.display = "none";
        }
    });
    // ================SELECT DELIVERABLE ADD BUTTON=======
        var select = document.getElementById("select-deliverable");
        var appendButtonsDiv = document.querySelector(".append-buttons");

        select.addEventListener("change", function() {
        if (select.value != "--") {
        appendButtonsDiv.style.display = "block";
    } else {
        appendButtonsDiv.style.display = "none";
    }
    });
    // ================DATE  TIME PICKR=======
    flatpickr("input[type=datetime-local]", {});

    // ================AJAX CALL=======
    $('#saveExtension').click(function(e){
        e.preventDefault();
        // console.log(formData);
        $('#saveExtension').attr("disabled", true);
        $('#saveExtension').html("Processing...");
        var description = CKEDITOR.instances.descriptionText.getData();
        var data= {
            '_token': "{{ csrf_token() }}",
            'deliverable_id': document.getElementById("select-deliverable").value,
            'new_date': document.getElementById("new_date").value,
            'description': description,
        }
        console.log(data);
        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            }
        });
        $.ajax({
            type: "POST",
            url: "{{ route('project-time-extension') }}",
            data: data,
            dataType: "json",
            success: function (response) {
                $('#timeExtension').trigger("reset");
                toastr.success('Request Time Extension Successfully');
                window.location.reload();
                $('#saveExtension').attr("disabled", false);
                $('#saveExtension').html("Save");
            },
            error: function(error) {
                // console.log(response);
                if(error.responseJSON.errors.new_date){
                    $('#newDateError').text(error.responseJSON.errors.new_date);
                }else{
                    $('#newDateError').text('');
                }
                $('#saveExtension').attr("disabled", false);
                $('#saveExtension').html("Save");
            }
        });
    });
</script>
