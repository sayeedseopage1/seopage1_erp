@extends('layouts.app')

@section('content')
    <link rel="stylesheet" href="{{ asset('vendor/css/dropzone.min.css') }}">

    <style>
        .file-action {
            visibility: hidden;
        }

        .file-card:hover .file-action {
            visibility: visible;
        }

    </style>
    <!-- SETTINGS START -->
    <div class="w-100 d-flex ">

        <x-setting-sidebar :activeMenu="$activeSettingMenu"/>

        <x-setting-card>
            <x-slot name="header">
                <div class="s-b-n-header" id="tabs">
                    <h2 class="mb-0 p-20 f-21 font-weight-normal text-capitalize border-bottom-grey">
                        @lang($pageTitle)</h2>
                </div>
            </x-slot>

            <div class="col-lg-12 col-md-12 ntfcn-tab-content-left w-100 p-4 ">
                @php($envatoUpdateCompanySetting = \Froiden\Envato\Functions\EnvatoUpdate::companySetting())
                @if(!is_null($envatoUpdateCompanySetting->supported_until))
                    <div class="row">
                    <div class="col-md-12" id="support-div">
                        @if(\Carbon\Carbon::parse($envatoUpdateCompanySetting->supported_until)->isPast())
                            <div class="col-md-12 alert alert-danger ">
                                <div class="col-md-6">
                                    Your support has been expired on <b><span
                                            id="support-date">{{\Carbon\Carbon::parse($envatoUpdateCompanySetting->supported_until)->format('d M, Y')}}</span></b>
                                </div>
                                <div class="col-md-6 text-right">
                                    <a href="{{ config('froiden_envato.envato_product_url') }}" target="_blank"
                                       class="btn btn-inverse btn-small">Renew support <i
                                            class="fa fa-shopping-cart"></i></a>
                                    <a href="javascript:;" onclick="getPurchaseData();"
                                       class="btn btn-inverse btn-small">Refresh
                                        <i
                                            class="fa fa-sync-alt"></i></a>
                                </div>
                            </div>

                        @else
                            <div class="col-md-12 alert alert-info">
                                Your support will expire on <b><span
                                        id="support-date">{{\Carbon\Carbon::parse($envatoUpdateCompanySetting->supported_until)->format('d M, Y')}}</span></b>
                            </div>
                        @endif
                    </div>
                    </div>
                @endif
            </div>

            <div class="col-lg-12 col-md-12 ntfcn-tab-content-left w-100 p-4 ">
                <div class="row">
                    <div class="col-md-12">
                        <a href="{{ route('update-settings.index') }}" class="btn btn-warning btn-sm btn-outline "><i
                                class="fa fa-arrow-left"></i> @lang('app.back')</a>
                    </div>
                </div>

{{--            @if(!is_null($envatoUpdateCompanySetting->supported_until) && !\Carbon\Carbon::parse($envatoUpdateCompanySetting->supported_until)->isPast())--}}

                @if(isset($lastVersion))
                    <!--row-->
                        <div class="row">
                            <div class="col-md-12">
                                <h4 class="box-title" id="structure">@lang('modules.update.updateManual')</h4>
                            </div>

                            <div class="col-md-12">
                                <h4 class="box-title text-info">Step 1</h4>
                                <a href="https://updates.froid.works/worksuite/download.php?{{ $encryptedDownloadLink }}"
                                   target="_blank"
                                   class="btn btn-success btn-sm btn-outline">@lang('modules.update.downloadUpdateFile')
                                    <i class="fa fa-download"></i></a>
                            </div>

                            <div class="col-md-12 m-t-20">
                                <h4 class="box-title text-info">Step 2</h4>
                                <x-forms.file-multiple class="mr-0 mr-lg-2 mr-md-2"
                                                       :fieldLabel="__('app.add') . ' ' .__('app.file') .' (Allowed File Type: Zip)'" fieldName="file"
                                                       fieldId="file-upload-dropzone" />
                                <form action="{{ route('update-settings.store') }}" class="dropzone"
                                      id="file-upload-dropzone">
                                    {{ csrf_field() }}

                                    <div class="fallback">
                                        <input name="file" type="file" multiple/>
                                    </div>
                                </form>
                            </div>

                            <div class="col-md-12 m-t-20" id="install-process">

                            </div>

                            <div class="col-md-12 m-t-20">
                                <h4 class="box-title text-info">Step 3</h4>
                                <h4 class="box-title">@lang('modules.update.updateFiles')</h4>
                            </div>
                            <div class="col-md-12">
                                <ul class="list-group" id="files-list">
                                    @foreach (\Illuminate\Support\Facades\File::files($updateFilePath) as $key=>$filename)
                                        @if (\Illuminate\Support\Facades\File::basename($filename) != "modules_statuses.json")
                                            <li class="list-group-item" id="file-{{ $key+1 }}">
                                                <div class="row">
                                                    <div class="col-md-9">
                                                        {{ \Illuminate\Support\Facades\File::basename($filename) }}
                                                    </div>
                                                    <div class="col-md-3 text-right">
                                                        <button type="button"
                                                                class="btn btn-success btn-sm btn-outline install-files"
                                                                data-file-no="{{ $key+1 }}"
                                                                data-file-path="{{ $filename }}">@lang('modules.update.install')
                                                            <i class="fa fa-sync-alt"></i></button>

                                                        <button type="button"
                                                                class="btn btn-danger btn-sm btn-outline delete-files"
                                                                data-file-no="{{ $key+1 }}"
                                                                data-file-path="{{ $filename }}">@lang('app.delete') <i
                                                                class="fa fa-times"></i></button>
                                                    </div>
                                                </div>
                                            </li>
                                        @endif
                                    @endforeach
                                </ul>
                            </div>


                        </div>
                        <!--/row-->
                    @else
                        <div class="row">
                            <div class="col-md-12 m-t-20">
                                <div class="alert alert-success ">
                                    You have the latest version of this app.
                                </div>
                            </div>
                        </div>
                    @endif
{{--                @endif--}}

            </div>
        </x-setting-card>

    </div>
    <!-- SETTINGS END -->
@endsection

@push('scripts')
    <script src="{{ asset('vendor/jquery/dropzone.min.js') }}"></script>
    <script type="text/javascript">
        // "myAwesomeDropzone" is the camelized version of the HTML element's ID
        Dropzone.options.fileUploadDropzone = {
            paramName: "file", // The name that will be used to transfer the file
            //        maxFilesize: 2, // MB,
            dictDefaultMessage: "Upload or drop the downloaded file here",
            accept: function (file, done) {
                done();
            },
            init: function () {
                this.on("success", function (file, response) {
                    var viewName = $('#view').val();
                    if(viewName == 'list') {
                        $('#files-list-panel ul.list-group').html(response.html);
                    } else {
                        $('#thumbnail').empty();
                        $(response.html).hide().appendTo("#thumbnail").fadeIn(500);
                    }
                })
            }
        };


        Dropzone.autoDiscover = false;
        $(document).ready(function() {
            var uploadFile = "{{ route('update-settings.store') }}?_token={{ csrf_token() }}";
            var myDrop = new Dropzone("#file-upload-dropzone", {
                url: uploadFile,
                acceptedFiles: 'application/zip,application/x-zip-compressed, application/x-compressed, multipart/x-zip',
                addRemoveLinks: true
            });
            myDrop.on("complete", function(file) {
                if (myDrop.getRejectedFiles().length == 0) {
                    window.location.reload();
                }
            });
        });

        var updateAreaDiv = $('#update-area');
        var refreshPercent = 0;
        var checkInstall = true;

        function checkIfFileExtracted(){
            $.easyAjax({
                type: 'GET',
                url: '{!! route("admin.updateVersion.checkIfFileExtracted") !!}',
                success: function (response) {
                    checkInstall = false;
                    $('#download-progress').append("<br><i><span class='text-success'>Installed successfully. Reload page to see the changes.</span>.</i>");
                    document.getElementById('logout-form').submit();
                }
            });
        }

        $('.install-files').click(function(){
            $('#install-process').html('<div class="alert alert-info ">Installing...Please wait (This may take few minutes.)</div>');
            window.setInterval(function(){
                /// call your function here
                if(checkInstall == true){
                    checkIfFileExtracted();
                }
            }, 1500);

            let filePath = $(this).data('file-path');
            $.easyAjax({
                type: 'GET',
                url: '{!! route("update-settings.install") !!}',
                data: {filePath: filePath},
                success: function (response) {
                    $('#download-progress').append("<br><i><span class='text-success'>Installed successfully. Reload page to see the changes.</span>.</i>");
                    document.getElementById('logout-form').submit();
                }
            });
        });

        $('.delete-files').click(function(){
            let filePath = $(this).data('file-path');
            let fileNumber = $(this).data('file-no');

            swal({
                title: "@lang('messages.sweetAlertTitle')",
                text: "@lang('messages.removeFileText')",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "@lang('messages.confirmDelete')",
                cancelButtonText: "@lang('messages.confirmNoArchive')",
                closeOnConfirm: true,
                closeOnCancel: true
            }, function (isConfirm) {
                if (isConfirm) {

                    $.easyAjax({
                        type: 'POST',
                        url: '{!! route("update-settings.deleteFile") !!}',
                        data: {"_token": "{{ csrf_token() }}", filePath: filePath},
                        success: function (response) {
                            $('#file-'+fileNumber).remove();
                        }
                    });
                }
            });
        });
    </script>
@endpush
