<div class="modal-header">
    <h5 class="modal-title" id="modelHeading">@lang('modules.projects.createMilestone')</h5>
    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
            aria-hidden="true">×</span></button>
</div>
<x-form id="addProjectMilestoneForm">
    <div class="modal-body">
        <input type="hidden" name="project_id" value="{{ $project->id }}">
       @php
           $project_milestone= App\Models\ProjectMilestone::where('project_id',$project->id)->first();
           $currency= App\Models\Currency::where('id',$project_milestone->original_currency_id)->first();
        //    dd($web_content);
       @endphp
        <div class="row">
            <div class="col-md-6">
                <x-forms.text fieldId="milestone_title" :fieldLabel="__('modules.projects.milestoneTitle')"
                    fieldName="milestone_title" fieldRequired="true" :fieldPlaceholder="__('placeholders.milestone')">
                </x-forms.text>
            </div>
{{--            <div class="col-md-6">--}}
{{--                <div class="form-group my-3">--}}
{{--                    <label class="f-14 text-dark-grey mb-12" data-label="true" for="milestone_title">Milestone Title--}}
{{--                        <sup class="f-14 mr-1">*</sup>--}}
{{--                        <svg class="svg-inline--fa fa-question-circle fa-w-16" data-toggle="popover" data-placement="top" data-content="Write the milestone description here like “Home page development”, “Hosting setup” etc. Don’t put Milestone 1, Milestone 2 etc. here." data-html="true" data-trigger="hover" aria-hidden="true" focusable="false" data-prefix="fa" data-icon="question-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg="" data-original-title="" title="">--}}
{{--                            <path fill="currentColor" d="M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zM262.655 90c-54.497 0-89.255 22.957-116.549 63.758-3.536 5.286-2.353 12.415 2.715 16.258l34.699 26.31c5.205 3.947 12.621 3.008 16.665-2.122 17.864-22.658 30.113-35.797 57.303-35.797 20.429 0 45.698 13.148 45.698 32.958 0 14.976-12.363 22.667-32.534 33.976C247.128 238.528 216 254.941 216 296v4c0 6.627 5.373 12 12 12h56c6.627 0 12-5.373 12-12v-1.333c0-28.462 83.186-29.647 83.186-106.667 0-58.002-60.165-102-116.531-102zM256 338c-25.365 0-46 20.635-46 46 0 25.364 20.635 46 46 46s46-20.636 46-46c0-25.365-20.635-46-46-46z"></path>--}}
{{--                        </svg>--}}
{{--                    </label>--}}
{{--                    <input type="text" class="form-control height-35 f-14" placeholder="Enter milestone title" value="" name="milestone_title" id="milestone_title">--}}
{{--                </div>--}}
{{--            </div>--}}
            <div class="col-md-6">
                <x-forms.number fieldId="cost" fieldRequired="true" :fieldLabel="__('modules.projects.milestoneCost')" fieldName="actual_cost"
                    :fieldPlaceholder="__('placeholders.price')">
                    </x-forms.text>
            </div>
            <div class="col-md-6">
                <div class="form-group my-3">
    <label class="f-14 text-dark-grey mb-12" data-label="" for="original_currency_id">Currency

    </label>

    <input type="text" class="form-control height-35 f-14" placeholder="" readonly value="{{$currency->currency_code}}" name="original_currency_id" id="original_currency_id">

    </div>
            </div>

            {{-- <div class="col-md-6">
                <x-forms.text fieldId="original_currency_id" :fieldLabel="__('Currency')" fieldName="original_cueency_id" fieldValue="USD" fieldReadonly="true"
                    :fieldPlaceholder="__('')">
                    </x-forms.text>
            </div> --}}
            {{-- <div class="col-md-6">
                <x-forms.select fieldId="status" :fieldLabel="__('app.status')" fieldName="status">
                    <option value="incomplete">@lang('app.incomplete')</option>
                    <option value="complete">@lang('app.complete')</option>
                </x-forms.select>
            </div> --}}

            <div class="col-md-6">
                <x-forms.select fieldId="milestone_type" fieldRequired="true" :fieldLabel="__('Milestone Type')"
                    fieldName="milestone_type">
                    <option value="Proposed Milestone">Proposed Milestone</option>
                    <option value="Client Agreed to this Milestone">Client Agreed to this Milestone</option>
                      <option value="Client Created this Milestone">Client Created this Milestone</option>
                </x-forms.select>
            </div>
            <div class="col-md-12">
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
                        <button class="btn btn-outline-secondary" type="button" id="copyButton" data-id="{{$project->deal_id}}"><i class="fa fa-clone"></i></button>
                    </div>
                </div>
                <button type="submit" class="btn btn-primary mt-2" value="submitted" id="linkBtn" disabled>Did You Submit?</button>
            </div>


            <div class="col-md-12">
                <x-forms.textarea class="ckeditor mr-0 mr-lg-2 mr-md-2" :fieldLabel="__('modules.projects.milestoneSummary')"
                    fieldName="summary" fieldId="summary"
                    :fieldPlaceholder="__('placeholders.milestoneSummary')">
                </x-forms.textarea>
            </div>

{{--            <div class="col-md-12">--}}
{{--                <div class="form-group">--}}
{{--                    <label class="text-dark-grey" data-label="true" for="descriptionText">Milestone Summary--}}
{{--                        <sup class="f-14 mr-1">*</sup>--}}
{{--                        <svg class="svg-inline--fa fa-question-circle fa-w-16" data-toggle="popover" data-placement="top" data-content="If you don’t have anything to elaborate here, just keep it same as milestone title. " data-html="true" data-trigger="hover" aria-hidden="true" focusable="false" data-prefix="fa" data-icon="question-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg="" data-original-title="" title="">--}}
{{--                            <path fill="currentColor" d="M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zM262.655 90c-54.497 0-89.255 22.957-116.549 63.758-3.536 5.286-2.353 12.415 2.715 16.258l34.699 26.31c5.205 3.947 12.621 3.008 16.665-2.122 17.864-22.658 30.113-35.797 57.303-35.797 20.429 0 45.698 13.148 45.698 32.958 0 14.976-12.363 22.667-32.534 33.976C247.128 238.528 216 254.941 216 296v4c0 6.627 5.373 12 12 12h56c6.627 0 12-5.373 12-12v-1.333c0-28.462 83.186-29.647 83.186-106.667 0-58.002-60.165-102-116.531-102zM256 338c-25.365 0-46 20.635-46 46 0 25.364 20.635 46 46 46s46-20.636 46-46c0-25.365-20.635-46-46-46z"></path>--}}
{{--                        </svg>--}}
{{--                    </label>--}}
{{--                    <textarea name="summary" id="summary" class="form-control"></textarea>--}}
{{--                   <script src="{{ asset('/ckeditor/ckeditor.js') }}"></script>--}}
{{--                    <script>--}}
{{--                        CKEDITOR.replace('summary');--}}
{{--                    </script>--}}
{{--                </div>--}}
{{--            </div>--}}


          {{--  <div class="col-md-6">
                <x-forms.datepicker fieldId="start_date"
                    :fieldLabel="__('modules.timeLogs.startDate')" fieldName="start_date"
                    :fieldValue="\Carbon\Carbon::now(global_setting()->timezone)->format(global_setting()->date_format)"
                    :fieldPlaceholder="__('placeholders.date')" />
            </div>

            <div class="col-md-6">
                <x-forms.datepicker fieldId="end_date"
                    :fieldLabel="__('modules.timeLogs.endDate')" fieldName="end_date"
                    :fieldValue="\Carbon\Carbon::now(global_setting()->timezone)->format(global_setting()->date_format)"
                    :fieldPlaceholder="__('placeholders.date')" />
            </div> --}}

        </div>
    </div>
    <div class="modal-footer">
        <x-forms.button-cancel data-dismiss="modal" class="border-0 mr-3">@lang('app.close')</x-forms.button-cancel>
        <button type="button" class="btn-primary rounded f-14 p-2" id="save-project-milestone" disabled>
            <i class="fa fa-check mr-1"></i>Save
        </button>
    </div>

</x-form>


<script src="https://cdn.ckeditor.com/4.19.1/standard/ckeditor.js"></script>
<script>
    $('#linkBtn').click(function(e){
        e.preventDefault();
        $('#linkBtn').attr("disabled", true);
        $('#linkBtn').html("Processing...");
        var buttonValue = $(this).val();

        var linkId = $('#generatedLinkContainer').attr('data-link-id');

        var data= {
            '_token': "{{ csrf_token() }}",
            'value': buttonValue,
            'deal_id': {{$project->deal_id}},
            'submitted_by': {{Auth::user()->role_id}},
            'random_id': linkId,
            'service_type': document.getElementById("service_type").value,
        }
        $.ajaxSetup({

            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            }
        });
        $.ajax({
            type: "POST",
            url: "{{route('store-pm-link')}}",
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
            onSelect: (instance, date) => {
                dp1.setMax(date);
            },
            ...datepickerConfig
        });
    });
    $('#save-project-milestone').click(function() {
        var url = "{{ route('milestones.store') }}";
        var randomId = $('#generatedLinkContainer').attr('data-link-id');
        var requestData = $('#addProjectMilestoneForm').serialize() + '&randomId=' + randomId;
        $.easyAjax({
            url: url,
            container: '#addProjectMilestoneForm',
            type: "POST",
            blockUI: true,
            disableButton: true,
            buttonSelector: '#save-project-milestone',
            data: requestData,
            success: function(response) {
                if (response.status == 'success') {
                    window.location.reload();
                }
            }
        })
    });
</script>
<script type="text/javascript">
    function generateRandomID(length) {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let randomID = '';
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            randomID += characters.charAt(randomIndex);
        }
        return randomID;
    }

    function generateURL() {
        var select = document.querySelector('#service_type');
        var selectedValue = select.value;

        var randomID = generateRandomID(5);
        var origin = window.location.origin;
        var url = origin + '/deals/service-type/' + encodeURIComponent(selectedValue.toLowerCase().replace(/ /g, '-')) + '/'  + <?php echo $project->deal_id; ?> + '/' + randomID;

        var generatedLinkContainer = document.getElementById('generatedLinkContainer');
        generatedLinkContainer.value = url;
        generatedLinkContainer.setAttribute('data-link-id', randomID);
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

        navigator?.clipboard.writeText(generatedLink)
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
