<style>
    .alert {
        word-break: break-word;
    }

    .my-custom-scrollbar {
        position: relative;
        height: 450px;
        overflow: auto;
    }

    .table-wrapper-scroll-y {
        display: block;
    }

    img {
        height: 40px;
    }
</style>
<div class="modal-header">
    <h5 class="modal-title" id="modelHeading">Move files from local to aws</h5>
    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
            aria-hidden="true">×</span></button>
</div>

<div class="modal-body">
    <div class="portlet-body">
        <x-form id="AWSForm" method="POST" class="ajax-form">

            <input type="hidden" name="file_url" id="file_url">
            <div class="form-body">
                <div class="row">
                    <div class="col-lg-12">
                        <div class="table-wrapper-scroll-y my-custom-scrollbar">

                            <table class="table table-bordered table-striped mb-0">
                                <thead>
                                <thead>
                                <tr>
                                    <th scope="col">Name</th>
                                    <th scope="col">Size</th>
                                    <th scope="col">Location</th>
                                    <th scope="col">Moved</th>
                                </tr>
                                </thead>

                                <tbody>
                                @foreach($files as $file)
                                    <tr>
                                        <td scope="row">
                                            <a class="cursor-pointer d-block text-dark-grey f-13 pt-3 px-3 "
                                               target="_blank"
                                               href="{{ $file->file_url }}">
                                                @if ($file->icon == 'images')
                                                    <img src="{{ $file->file_url }}" height="20px">

                                                @else
                                                    <i class="fa {{ $file->icon }} text-lightest"></i>
                                                @endif
                                            </a>
                                        </td>
                                        <td>{{$file->size_format}}</td>
                                        <td>{{$file->storage_location}}</td>
                                        <td>

                                            @if($file->storage_location !=='local')
                                                <i class="aws-move-success fa fa-check-circle text-success"></i>
                                            @else
                                                <i class="aws-move-danger fa fa-times-circle text-danger"></i>
                                            @endif
                                        </td>
                                    </tr>
                                @endforeach
                                </tbody>
                            </table>

                        </div>
                    </div>
                </div>
            </div>

        </x-form>

    </div>
    @if($localFilesCount==0)
        <div class="mt-3">
            <x-alert type="info" icon="info-circle">
                @lang('messages.allFilesMovedtoAws')
            </x-alert>
        </div>
    @endif
</div>

<div class="modal-footer">

    <x-forms.button-cancel data-dismiss="modal" class="border-0 mr-3">@lang('app.close')</x-forms.button-cancel>
    @if($localFilesCount>0)
        <x-forms.button-primary id="test-aws-submit" icon="check">Move All</x-forms.button-primary>
    @endif
</div>

<script>

    // Save source
    $('#test-aws-submit').click(function () {
        console.log('submit');

        $('.aws-move-danger').addClass('d-none');
        $('.aws-move-success').addClass('d-none');
        $('.aws-move-spinner').removeClass('d-none');

        $.easyAjax({
            url: "{{ route('storage-settings.aws_local_to_aws') }}",
            container: '#AWSForm',
            type: "POST",
            blockUI: true,
            disableButton: true,
            buttonSelector: "#test-aws-submit",
            data: $('#AWSForm').serialize(),
            success: function (response) {
                if (response.status === "success") {
                    $(MODAL_LG).modal('hide');
                }
            }
        })
    });
</script>
