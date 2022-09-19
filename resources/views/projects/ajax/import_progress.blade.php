<div class="col-sm-12">
    <x-form id="process-project-data-form">
        <div class="add-project bg-white rounded">
            <h4 class="mb-0 p-20 f-21 font-weight-normal text-capitalize border-bottom-grey">
                @lang('app.importExcel') @lang('app.menu.projects')</h4>
                <div class="col-12">
                    <p>@lang("messages.matchColumnMessage")</p>
                    <div class="alert alert-success" id="getUnMatchedSuccess" style="display:none;">
                        @lang("messages.columnMatchSuccess")
                    </div>
                    <div class="alert alert-warning" id="requiredColumnsUnmatched" style="display:none;">
                        @lang("messages.requiredColumnsUnmatched")
                    </div>
                    <div class="row">
                    <div class="col-md-6">
                        <b>@lang("messages.unmatchedColumns", ["unmatchCount" => (!empty($heading) ? collect($columns)->where('required','Yes')->whereNotIn('id', $heading)->count() : 0)])</b>
                        · <a href="javascript:void(0);"
                                onclick="skipall()">@lang("app.skipAll")</a>
                    </div>
                    <div class="col-md-6">
                        <div class="form-group">
                            <div class="float-right">
                                <div class="checkbox checkbox-info">
                                    <input id="showSkipped" checked="checked" type="checkbox">
                                    <label for="random_password">@lang("app.showSkippedColumns")</label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                </div>

            <div class="" style="overflow-x: auto;">
                <input type="hidden" name="file" value="{{ $file }}">
                <input type="hidden" name="has_heading" value="{{ $hasHeading }}">
                <table>
                    <tbody>
                        <tr>
                        @forelse ($importSample[0] as $key => $item)
                            <td>
                                <div class="row importBox {{ !empty($heading) ? (collect($columns)->whereIn('id', $heading[$key])->first() ? 'matched' : 'unmatched') : 'unmatched' }}"
                                    id="box_{{ $key }}" data-key="{{ $key }}">
                                    <div class="col-sm-12">
                                        <div class="importOptions w-100">
                                            <div class="col-sm-12 p-0">
                                                @if (!empty($heading))
                                                    <h4>
                                                        {{$fileHeading[$key]}}
                                                    </h4>
                                                @endif
                                            </div>

                                            <div class="selectColumnNameBox" id="selectColumnNameBox_{{ $key }}" style="display:none;">
                                                <div class="col-sm-12 p-0">

                                                    <div class="form-group">
                                                        <label class="control-label">
                                                            @lang('app.columnName')
                                                        </label>
                                                        <div id="selectOptionList_{{ $key }}">
                                                            <select class="form-control select-picker mb-2" id="columnName_{{ $key }}" name="columns[{{ $key }}]">
                                                                <option value="">@lang("app.selectAColumn")</option>
                                                                @if (!empty($heading) && collect($columns)->whereIn('id', $heading[$key])->first())
                                                                    @foreach($columns as $selectKey => $selectColumn)
                                                                    <option value="{{ $selectColumn['id'] }}" {{ ($heading[$key]==$selectColumn['id']) ? 'selected' : '' }}>{{$selectColumn['name'] }}
                                                                    </option>
                                                                    @endforeach
                                                                @endif
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-sm-12 p-0">
                                                    <div class="form-group">
                                                        <button onclick="goBack({{ $key }})" class="btn btn-info btn-sm" type="button">@lang("app.btnBack")</button>
                                                        <button onclick="saveColumnBox({{ $key }})" class="btn btn-dark btn-sm"
                                                            type="button">@lang("app.btnSave")</button>
                                                        <a href="javascript:void(0);" onclick="skipColumnBox({{ $key }})">@lang("app.skip")</a>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="row columnDescriptionBox" id="columnDescriptionBox_{{ $key }}">
                                                <div class="col-sm-12">
                                                    <p id="columnDescriptionBoxText_{{ $key }}">
                                                        @if (!empty($heading))
                                                            @if(collect($columns)->whereIn('id', $heading[$key])->first())
                                                                {{ collect($columns)->whereIn('id', $heading[$key])->first()['name'] }}
                                                            @else
                                                            <span class="unmatchedWarning" id="unmatchedWarning_{{$key}}">(@lang('app.unmatchedColumn'))</span>
                                                            @endif
                                                        @else
                                                        <span class="unmatchedWarning" id="unmatchedWarning_{{$key}}">(@lang('app.unmatchedColumn'))</span>
                                                        @endif
                                                        </p>
                                                        <p class="alert alert-warning notimported" style="display:none;" id="columnSkipBox_{{ $key }}">
                                                            @lang("app.willNotBeImported")</p>
                                                    </div><!-- col-sm-12 -->
                                            </div>

                                            <div class="row editAndSkipBox" id="editAndSkipBox_{{ $key }}">
                                                <div class="col-sm-12">
                                                    <a href="javascript:void(0);" onclick="showColumnBox({{ $key }})">@lang("app.edit")</a>&nbsp;
                                                    <a href="javascript:void(0);" onclick="skipColumnBox({{ $key }})"
                                                        id="skipButton_{{ $key }}">@lang("app.skip")</a>
                                                </div><!-- col-sm-12 -->
                                            </div>
                                        </div>

                                        <div class="importSample w-100">


                                            @foreach ($importSample as $dataKey => $value)
                                            <p class="sample">
                                                {{ $value[$key] }}
                                            </p>
                                            @endforeach
                                        </div>
                                    </div>
                                </div>
                            </td>
                        @empty
                        @endforelse
                        </tr>
                    </tbody>
                </table>
                <div class="col-md-12">
                </div>
            </div>
            <x-form-actions>
                <x-forms.button-primary id="process-project-form" disabled class="mr-3" icon="check">@lang('app.submit')
                </x-forms.button-primary>
                <x-forms.button-cancel :link="route('projects.index')" class="border-0">@lang('app.cancel')
                </x-forms.button-cancel>

            </x-form-actions>
        </div>
    </x-form>
    <div class="bg-white rounded p-2"  id="afterSubmitting" style="display:none">
        <div class="alert alert-warning" role="alert" id="process-warning">
                @lang("app.doNotCloseOrRefreshPage")
        </div>
        <div class="alert alert-success" role="alert" id="importSuccess" style="display:none">
        </div>
        <div class="alert alert-success" role="alert" id="progressSuccess" style="display:none">
        </div>
        <div class="alert alert-danger" role="alert" id="failedJobsCount" style="display:none">
        </div>
        <div id="progressError" style="display:none"></div>
        <div id="progress">
            <p>@lang('app.importInProgress') <strong id="progressAmount">@lang('app.pleaseWait')</strong></p>
            <div class="progress">
                <div id="processingBarStatus" class="progress-bar  progress-bar-striped  progress-bar-animated" role="progressbar" style="width: 0%;" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100">0%</div>
            </div>
        </div>


    </div>
    <div class="w-100 border-top-grey justify-content-start px-4 py-3 bg-white rounded d-none" id="afterProcessing">
        <x-forms.link-primary :link="route('projects.index')">@lang('app.backToProject')</x-forms.link-primary>
    </div>
</div>
<div id="exceptionTable" class="col-sm-12 mt-2" style="display:none">

</div>
<script src="https://cdn.jsdelivr.net/npm/lodash@4.17.21/lodash.min.js"></script>
<script type="text/javascript">

    $('.select-picker').selectpicker();
        // Current column being edited
        let columnID = 0;
        let progress = 0;
        // Fields associated with this import
        let jsColumnArray = $.parseJSON('{!! addslashes(json_encode($columns)) !!}');
        let currentImportColumnID = jsColumnArray[0].id; // By default column 0 is selected

        // Array to store matched columns. ith element tells that Column i of the CSV matches with which field
        // of the import. Initially each columns is matched serially with columns in the CSV
        let jsMatchedColumnArray = $.parseJSON('{!! addslashes( json_encode( $matchedColumns )) !!}');

        function contains(array, value) {
            for (let i = 0; i < array.length; i++) {
                if (array[i] == value) {
                    return true;
                }
            }
            return false;
        }
        function updateJsMatchedColumnArray() {

            jsMatchedColumnArray = [];

            $('.selectColumnNameBox').each(function () {
                if ($(this).find('select').val() != '') {
                    jsMatchedColumnArray.push($(this).find('select').val());
                }
            });

            return jsMatchedColumnArray;
        }

        function checkRequiredMatch() {

            let requiredNotMatched = [];
            // Check if all required columns are matched b
            for (let i = 0; i < jsColumnArray.length; i++) {
                if (jsColumnArray[i]["required"] == "Yes") {
                    if (!contains(jsMatchedColumnArray, jsColumnArray[i]["id"])) {
                        requiredNotMatched.push(jsColumnArray[i]);
                    }
                }
            }
            return requiredNotMatched;
        }

        function requiredMatchAction() {
            let requiredMatched = checkRequiredMatch();
            if (requiredMatched.length == 0) {
                $("#getUnMatchedSuccess").show();
                $("#requiredColumnsUnmatched").hide();
                $("#process-project-form").removeAttr("disabled");
            } else {
                let str = _.join(_.map(requiredMatched, 'name'), ', ');
                let msg = "@lang("messages.requiredColumnsUnmatched")";
                msg = msg.replace(":columns", str);
                $("#getUnMatchedSuccess").hide();
                $("#requiredColumnsUnmatched").html(msg).show();
            }
        }

        function showColumnBox(columnID) {

            // Hide all other edit boxes
            $(".selectColumnNameBox").hide();
            $(".editAndSkipBox").show();
            $(".columnDescriptionBox").show();

            // Show hide for this column
            $('#skipButton_' + columnID).show();
            $('#columnSkipBox_' + columnID).hide();
            $('#editAndSkipBox_' + columnID).hide();
            $('#columnDescriptionBox_' + columnID).hide();
            $('#selectColumnNameBox_' + columnID).show();

            // Hide back button for first column
            if (columnID == 0) {
                $("#selectColumnNameBox_" + columnID + " .btn-info").hide();
            }

            let selectedOption = $('#columnName_' + columnID);
            let selectedColumnID = selectedOption.val();
            currentImportColumnID = selectedColumnID;
            selectedOption.selectpicker('refresh');

            let selectListText = generateSelectList(columnID);

            $('#selectOptionList_' + columnID).html(selectListText);
            $('.select-picker').selectpicker('refresh');
        }


        function goBack(columnID) {
            $('#columnName_' + columnID).val(currentImportColumnID);
            $('#skipButton_' + columnID).show();
            $('#columnSkipBox_' + columnID).hide();
            $('#selectColumnNameBox_' + columnID).hide();
            $('#editAndSkipBox_' + columnID).show();
            $('#columnDescriptionBox_' + columnID).show();

            if ($('#columnName_' + columnID).hasClass('skipped')) {
                $('#columnName_' + columnID).val('');
                $('#columnSkipBox_' + columnID).show();
            }
            $('#columnName_' + columnID).selectpicker('refresh');
            --columnID;
            showColumnBox(columnID);
        }

        function saveColumnBox(columnID) {
            let selectedOption = $('#columnName_' + columnID + ' option:selected');
            let selectedColumnID = selectedOption.val();

            if (selectedColumnID == "") {
                Swal.fire({
                    icon: 'error',
                    text: "@lang("messages.pleaseSelectAColumn")",

                    toast: true,
                    position: "top-end",
                    timer: 3000,
                    timerProgressBar: true,
                    showConfirmButton: false,

                    customClass: {
                        confirmButton: "btn btn-primary",
                    },
                    showClass: {
                        popup: "swal2-noanimation",
                        backdrop: "swal2-noanimation",
                    },
                });
            } else {
                $('#columnName_' + columnID).removeClass('skipped');

                let columnName = selectedOption.text();

                updateJsMatchedColumnArray();

                $('#skipButton_' + columnID).show();

                $('#columnSkipBox_' + columnID).hide();
                $('#columnDescriptionBoxText_' + columnID).html(columnName);
                $('#selectColumnNameBox_' + columnID).hide();
                $('#columnDescriptionBox_' + columnID).show();
                $('#columnDescriptionBoxText_' + columnID).show();
                $('#editAndSkipBox_' + columnID).show();
                $('#unmatchedWarning_' + columnID).hide();

                $('#box_' + columnID).removeClass('unchanged unmatched').addClass('matched');

                let unmatched = getUnMatched();
                $("#unmatchedCount").html(unmatched);

                requiredMatchAction();

                ++columnID;

                if ($('#columnName_' + columnID).length) {
                    showColumnBox(columnID);
                }
            }

        }

        function skipColumnBox(columnID) {
            $('#columnName_' + columnID).addClass('skipped');
            $('#columnName_' + columnID).val('');
            $('#columnName_' + columnID).selectpicker('refresh');

            updateJsMatchedColumnArray();

            $('#columnDescriptionBox_' + columnID).show();
            $('#selectColumnNameBox_' + columnID).hide();
            $('#columnDescriptionBoxText_' + columnID).hide();
            $('#skipButton_' + columnID).hide();

            $('#columnSkipBox_' + columnID).show();
            $('#editAndSkipBox_' + columnID).show();
            $('#unmatchedWarning_' + columnID).hide();


            $('#box_' + columnID).removeClass('matched unchanged').addClass('unmatched');

            let unmatched = getUnMatched();
            $("#unmatchedCount").html(unmatched);

            requiredMatchAction();

            ++columnID;

            if ($('#columnName_' + columnID).length) {
                showColumnBox(columnID);
            }

        }
          // Generate the select control for this column box
        function generateSelectList(columnID) {

            // So that we can select column if user edits it
            let selectedColumnID = jsMatchedColumnArray[columnID];

            let skippedClass = '';

            if($('#columnName_' + columnID).hasClass('skipped')){
                skippedClass = 'skipped';
            }

            let text = '<select id="columnName_' + columnID + '" class="form-control select-picker mb-2 ' + skippedClass + '" name="columns[' + columnID +']">' +
                '<option value="">@lang("app.selectAColumn")</option>';

            for (let i = 0; i < jsColumnArray.length; i++) {
                let id = jsColumnArray[i]['id'];
                let name = jsColumnArray[i]['name'];
                let skip = false;

                $('.selectColumnNameBox').each(function () {
                    if ($(this).find('select').val() != '' && $(this).find('select').val() == id && $('.selectColumnNameBox #columnName_'+ columnID).val() != id) {
                        skip = true;
                    }
                });

                if (skip) continue;

                if (selectedColumnID == id || $('.selectColumnNameBox #columnName_'+ columnID).val() == id) {
                    text += '<option value="' + id + '" selected>' + name + '</option>';
                } else {
                    text += '<option value="' + id + '">' + name + '</option>';
                }

            }

            text += "</select>";

            return text;
        }

        function getUnMatched() {
            let jsMatchedColumn = [];

            $('.selectColumnNameBox').each(function () {
                if ($(this).find('select').val() == '' && !$(this).find('select').hasClass('skipped')) {
                    jsMatchedColumn.push($(this).find('select').val());
                }
            });

            return jsMatchedColumn.length;
        }

        function skipall() {
            $('.unmatched').each(function () {
                skipColumnBox($(this).data('key'));
            });
        }


        function getProgress(batchId){

            $('#process-project-data-form').hide();
            $('#afterSubmitting').show();
            var url = "{{ route('import.process.progress', ['import_project', ':batchId']) }}";
            url = url.replace(':batchId', batchId);

            setTimeout(function () {
                $.easyAjax({
                    type: 'GET',
                    url: url,
                    success: function (response) {
                        var failedJobs = response.failedJobs;
                        var pendingJobs = response.pendingJobs;
                        var processedJobs = response.processedJobs;
                        progress = response.progress;
                        var totalJobs = response.totalJobs;

                        $('#processingBarStatus').width( progress + '%');
                        $('#processingBarStatus').html(progress + '%');
                        $('#progressAmount').html(progress + '%');


                        if(failedJobs > 0){
                            var failedMsg = '@lang("app.importFailedJobs")';
                            failedMsg = failedMsg.replace(':failedJobs', failedJobs).replace(':totalJobs', totalJobs);
                            $('#failedJobsCount').html(failedMsg);
                            $('#failedJobsCount').show();
                        }
                        if(processedJobs > 0){
                            var processedMsg = '@lang("app.importProcessedJobs")';
                            processedMsg = processedMsg.replace(':processedJobs', processedJobs).replace(':totalJobs', totalJobs);
                            $('#progressSuccess').html(processedMsg);
                            $('#progressSuccess').show();
                        }

                        if (totalJobs != (failedJobs + processedJobs)) {
                            getProgress(batchId);
                        }else{
                            $('#importSuccess').html('@lang("app.importCompleted")');
                            $('#process-warning').hide();
                            $('#importSuccess').show();
                            $('#progress').hide();
                            $('#afterProcessing').removeClass('d-none');
                            $('#afterProcessing').addClass('d-lg-flex d-md-flex d-block');
                            getQueueException();
                        }
                    },
                    error: function (response) {
                        if (progress != 100) {
                            getProgress(batchId);
                        }
                    }
                });
            }, 2000);
        }

        function getQueueException() {
            var url = "{{ route('import.process.exception', 'import_project') }}";

            $.easyAjax({
                type: 'GET',
                url: url,
                success: function(response){
                    if (response.count) {
                        $('#exceptionTable').html(response.view);
                        $('#exceptionTable').show();

                    }
                }
            });
        }

    $(document).ready(function() {

        $('body').on('click', '#showSkipped', function() {
            if (this.checked) {
                $(".unmatched").show();
            } else {
                $(".unmatched").hide();
            }
        });

        let unmatched = getUnMatched();
        $("#unmatchedCount").html(unmatched);

        if (getUnMatched() == 0) {
            $("#getUnMatchedSuccess").show();
            $("#process-project-form").removeAttr("disabled");
        } else {
            $("#process-project-form").attr("disabled", "disabled");
            showColumnBox(columnID);
        }

        requiredMatchAction();

        $('body').on('click', '#process-project-form', function() {
            const url = "{{ route('projects.import.process') }}";

            $.easyAjax({
                url: url,
                container: '#process-project-data-form',
                type: "POST",
                disableButton: true,
                blockUI: true,
                buttonSelector: "#process-project-form",
                data: $('#process-project-data-form').serialize(),
                success: function (response) {
                    if (response.status == 'success') {
                        getProgress(response.batch.id);
                    }
                }
            });
        });
    });
</script>
