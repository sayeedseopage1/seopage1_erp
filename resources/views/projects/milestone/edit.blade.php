<div class="modal-header">
    <h5 class="modal-title" id="modelHeading">@lang('modules.projects.editMilestone')</h5>
    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
            aria-hidden="true">×</span></button>
</div>
<x-form id="addProjectMilestoneForm" method="PUT">
    <div class="modal-body">
        <input type="hidden" name="project_id" value="{{ $milestone->project_id }}">
        @php
           $project_milestone= App\Models\ProjectMilestone::where('id',$milestone->id)->first();
           $currency= App\Models\Currency::where('id',$project_milestone->original_currency_id)->first();
           //dd($currency);
       @endphp

        <div class="row">
            <div class="col-md-4">
                <x-forms.text fieldId="milestone_title" :fieldLabel="__('modules.projects.milestoneTitle')"
                    :fieldValue="$milestone->milestone_title" fieldName="milestone_title" fieldRequired="true"
                    :fieldPlaceholder="__('placeholders.milestone')">
                </x-forms.text>
            </div>
            <div class="col-md-4">
                <div class="form-group my-3">
                    <label class="f-14 text-dark-grey mb-12" data-label="" for="actual_cost">Milestone Cost

                    </label>

                    <input type="number" class="form-control height-35 f-14" placeholder="e.g. 10000" value="{{$milestone->actual_cost
                     }}" name="actual_cost" id="actual_cost" min="0" required >

                    </div>
            </div>
            <div class="col-md-4">
                <div class="form-group my-3">
    <label class="f-14 text-dark-grey mb-12" data-label="" for="original_currency_id">Currency

    </label>

    <input type="text" class="form-control height-35 f-14" placeholder="" readonly value="{{$currency->currency_code}}" name="original_currency_id" id="original_currency_id">

    </div>
            </div>
            <div class="col-md-12">
                <x-forms.select fieldId="milestone_type" :fieldLabel="__('Milestone Type')" fieldName="milestone_type">
                    <option @if ($milestone->milestone_type == 'Proposed Milestone') selected @endif value="Proposed Milestone">@lang('Proposed Milestone')</option>
                    <option @if ($milestone->milestone_type == 'Client Agreed to this Milestone') selected @endif value="Client Agreed to this Milestone">@lang('Client Agreed to this Milestone')</option>
                    <option @if ($milestone->milestone_type == 'Client Created this Milestone') selected @endif value="Client Created this Milestone">@lang('Client Created this Milestone')</option>
                </x-forms.select>
            </div>

            <div class="col-md-12 mt-3">
                <div class="form-group">
                    <label for="exampleFormControlTextarea1">Service Type <span style="color:red;">*</span></label>
                    <select class="form-control milestone_type height-35 f-14" name="service_type" id="service_type" onchange="generateURL()">
                        <option value="web-development">Web Development</option>
                        <option value="web-content">Webcontent</option>
                        <option value="blogs-articles">Blogs/articles</option>
                        <option value="product-description">Product descriptions</option>
                        <option value="product-category">Product category/collection pages</option>
                        <option value="basic-seo">Basic SEO</option>
                    </select>
                </div>
            </div>
            <div class="col-md-12 mt-2" id="inputUrl" style="display: none;">
                <div class="input-group">
                    <input type="text" class="form-control height-35 f-14" id="generatedLinkContainer" aria-label="Recipient's username" aria-describedby="copyButton" readonly>
                    <div class="input-group-append">
                        <button class="btn btn-outline-secondary" type="button" id="copyButton" data-id="{{$milestone->project->deal_id}}"><i class="fa fa-clone"></i></button>
                    </div>
                </div>
                <button type="submit" class="btn btn-primary mt-2" value="submitted" id="linkBtn" disabled>Did You Submit?</button>
            </div>

            <div class="col-md-12">
                <x-forms.textarea class="mr-0 mr-lg-2 mr-md-2" :fieldLabel="__('modules.projects.milestoneSummary')"
                    fieldName="summary" fieldRequired="true" fieldId="summary" :fieldValue="$milestone->summary"
                    :fieldPlaceholder="__('placeholders.milestoneSummary')">
                </x-forms.textarea>
            </div>

          {{--  <div class="col-md-6">
                <x-forms.datepicker fieldId="start_date"
                    :fieldLabel="__('modules.projects.startDate')" fieldName="start_date"
                    :fieldValue="$milestone->start_date==null ? $milestone->start_date : $milestone->start_date->format(global_setting()->date_format)"
                    :fieldPlaceholder="__('placeholders.date')" />
            </div>

            <div class="col-md-6">
                <x-forms.datepicker fieldId="end_date"
                    :fieldValue="$milestone->end_date==null ? $milestone->end_date : $milestone->end_date->format(global_setting()->date_format)"
                    :fieldLabel="__('modules.timeLogs.endDate')" fieldName="end_date"
                    :fieldPlaceholder="__('placeholders.date')" />
            </div> --}}

        </div>
    </div>
    <div class="modal-footer">
        <x-forms.button-cancel data-dismiss="modal" class="border-0 mr-3">@lang('app.close')</x-forms.button-cancel>
{{--        <x-forms.button-primary id="save-project-milestone" icon="check">@lang('app.save')</x-forms.button-primary>--}}
        <button type="button" class="btn-primary rounded f-14 p-2" id="save-project-milestone" disabled>
            <i class="fa fa-check mr-1"></i>Save
        </button>
    </div>
</x-form>

<script>

    $('#linkBtn').click(function(e){
        alert('asdasd');
        e.preventDefault();
        // console.log(formData);
        $('#linkBtn').attr("disabled", true);
        $('#linkBtn').html("Processing...");
        var buttonValue = $(this).val();
        var data= {
            '_token': "{{ csrf_token() }}",
            'value': buttonValue,
            'deal_id': {{$milestone->project->deal_id}},
            'service_type': document.getElementById("service_type").value,
        }
        // console.log(data);
        $.ajaxSetup({

            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            }
        });
        $.ajax({
            type: "POST",
            url: "{{route('store-link')}}",
            data: data,
            dataType: "json",
            success: function (response) {
                $('#inputUrl').hide();
                $('#save-project-milestone').attr("disabled", false);
                toastr.success('Link Submit Successfully');
                $('#linkBtn').attr("disabled", false);
                $('#linkBtn').html("Did You Submit?");
            },
            error: function(error) {
                $('#linkBtn').attr("disabled", false);
                $('#linkBtn').html("Did You Submit?");
            }
        });
    });

$(document).ready(function() {

    $("#addProjectMilestoneForm .select-picker").selectpicker();

        const dp1 = datepicker('#start_date', {
            position: 'bl',
            dateSelected: @if($milestone->start_date) new Date("{{ str_replace('-', '/', $milestone->start_date) }}") @else null @endif,
            onSelect: (instance, date) => {
                if (typeof dp2.dateSelected !== 'undefined' && dp2.dateSelected.getTime() < date
                    .getTime()) {
                    dp2.setDate(date, true)
                }
                if (typeof dp2.dateSelected === 'undefined') {
                    dp2.setDate(date, true)
                }
                dp2.setMin(date);
            },
            ...datepickerConfig
        });

        const dp2 = datepicker('#end_date', {
            position: 'bl',
            dateSelected: @if($milestone->end_date) new Date("{{ str_replace('-', '/', $milestone->end_date) }}") @else null @endif,
            onSelect: (instance, date) => {
                dp1.setMax(date);
            },
            ...datepickerConfig
        });

    });

    $('#save-project-milestone').click(function() {
        var url = "{{ route('milestones.update', $milestone->id) }}";
        $.easyAjax({
            url: url,
            container: '#addProjectMilestoneForm',
            type: "POST",
            blockUI: true,
            disableButton: true,
            buttonSelector: '#save-project-milestone',
            data: $('#addProjectMilestoneForm').serialize(),
            success: function(response) {
                if (response.status == 'success') {
                    window.location.reload();
                }
            }
        })
    });

</script>
<script type="text/javascript">
    function generateURL() {
        var select = document.querySelector('#service_type');
        var selectedValue = select.value;
        var origin = window.location.origin;
        var url = origin + '/deals/service-type/' + encodeURIComponent(selectedValue.toLowerCase().replace(/ /g, '-'))+ '/' + <?php echo $milestone->project->deal_id; ?>;

        var generatedLinkContainer = document.getElementById('generatedLinkContainer');
        generatedLinkContainer.value = url;
    }

    const selectElement = document.getElementById("service_type");
    const inputUrl = document.getElementById("inputUrl");

    selectElement.addEventListener("change", function() {
        if (selectElement.value === "web-content" ||
            selectElement.value === "blogs-articles" ||
            selectElement.value === "product-description" ||
            selectElement.value === "product-category" ||
            selectElement.value === "basic-seo") {
            inputUrl.style.display = "block";
        } else {
            inputUrl.style.display = "none";
        }
    });
    document.getElementById("copyButton").addEventListener("click", function() {
        var generatedLink = document.getElementById("generatedLinkContainer").value;

        navigator.clipboard.writeText(generatedLink)
            .then(function() {
                alert("Copied: " + generatedLink);
                document.getElementById("linkBtn").removeAttribute("disabled");
            })
            .catch(function(error) {
                alert("Unable to copy: " + error);
            });
    });

    $(document).ready(function() {
    function toggleCreateButton() {
        var selectedServiceType = $('#service_type').val();
        var createButton = $('#save-project-milestone');

        if (selectedServiceType === 'web-development') {
            createButton.prop('disabled', false);
        } else {
            createButton.prop('disabled', true);
        }
    }

    toggleCreateButton();

    $('#service_type').change(function() {
        toggleCreateButton();
    });
});
</script>
