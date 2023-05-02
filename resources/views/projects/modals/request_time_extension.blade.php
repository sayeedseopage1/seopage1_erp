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
            <form>
                <div class="modal-body">
                    @php
                        $deliverables = \App\Models\ProjectDeliverable::where('project_id',$project->id)->get();
                    @endphp
                    <div class="row mb-3">
                        <div class="col-md-10 dynamic-field" id="dynamic-field-1">
                            <label for="select_deliverable" class="form-label">Select Deliverable</label>
                            <div class="row">
                                <div class="col-md-12">
                                    <div class="form-group mb-0">
                                        <select id="select-deliverable" class="selectpicker form-control" aria-label="Default select example" data-live-search="true" name="select_deliverable">
                                            <option selected>--</option>
                                            @foreach($deliverables as $deliverable)
                                                <option value="{{$deliverable->id}}">{{$deliverable->deliverable_type}}</option>
                                            @endforeach
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="col-md-2 append-buttons mt-4">
                            <div class="clearfix">
                                <button type="button" id="add-button" class="btn btn-primary float-left text-uppercase shadow-sm"><i class="fa fa-plus fa-fw"></i></button>
                                <button type="button" id="remove-button" class="btn btn-secondary float-left text-uppercase ml-1" disabled="disabled"><i class="fa fa-minus fa-fw"></i></button>
                            </div>
                        </div>
                    </div>
                    <div  id="additional-fields-container" style="display:none;">
                        <div class="row">
                            <div class="col-md-4">
                                @php
                                    $deliverables = \App\Models\ProjectDeliverable::where('project_id',$project->id)->orderBy('id', 'desc')->first();
                                     $estimationTime = $deliverables->estimation_time;
                                @endphp
                                <div class="mb-3">
                                    <label for="date" class="form-label">Previous Estimation Time</label>
                                    <input type="text" class="form-control height-35 f-14" value="{{$estimationTime}}" readonly>
                                </div>
                            </div>
                            <div class="col-md-4">
                                @php
                                    $deliverables = \App\Models\ProjectDeliverable::where('project_id',$project->id)->orderBy('id', 'desc')->first();
                                     $from = $deliverables->from;
                                     $to = $deliverables->to;
                                @endphp
                                <div class="mb-3">
                                    <label for="">Previous Due Date</label>
                                    @if($to !=null)
                                        <input type="text" class="form-control height-35 f-14" name="date" value="{{$to}}" readonly>
                                    @else
                                        <input type="text" class="form-control height-35 f-14" name="date" value="{{$from}}" readonly>
                                    @endif
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="mb-3">
                                    <label for="hours" class="form-label">Hours Log</label>
                                    <input type="time" class="form-control height-35 f-14" id="hours">
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
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary">Save changes</button>
                </div>
            </form>
        </div>
    </div>
</div>
<script type="text/javascript">
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
            field.children("label").attr("for", "linkError_" + 'total').text("Field " + count);
            field.find("input").attr("id", "linkError_" + 'total').val("");
            field.append('<span id="linkError_'+total+'" class="text-danger" for="link"></span>');
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

    const selectDeliverable = document.getElementById('select-deliverable');
    const additionalFieldsContainer = document.getElementById('additional-fields-container');

    selectDeliverable.addEventListener('change', () => {
        // Check if an option other than the default one is selected
        if (selectDeliverable.value !== "--") {
            additionalFieldsContainer.style.display = "block";
        } else {
            additionalFieldsContainer.style.display = "none";
        }
    });
</script>
