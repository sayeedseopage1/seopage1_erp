<style>
    #imageCropper {
        height: 350px;
    }
</style>

<div class="modal-header">
    <h5 class="modal-title">@lang('app.cropImage')</h5>
    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
</div>
<div class="modal-body">
    <div class="row d-flex align-content-center justify-content-center">
        <img id="imageCropper" src="" alt="Picture">
    </div>
</div>
<div class="modal-footer">
    <x-forms.button-cancel data-dismiss="modal" class="border-0 mr-3">@lang('app.cancel')</x-forms.button-cancel>
    <x-forms.button-primary id="cropImage" icon="crop">@lang('app.crop')</x-forms.button-primary>
</div>

<script>
    var elementId = '{{ $element }}';
    var img = document.getElementById('imageCropper');
    var cropper;
    var canvas;
    // logo id input file and set to image
    var input = document.getElementById(elementId);
    var files = input.files;

    function dataURLtoFile(dataurl) {

        var arr = dataurl.split(','),
            mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]),
            n = bstr.length,
            u8arr = new Uint8Array(n);

        while(n--){
            u8arr[n] = bstr.charCodeAt(n);
        }

        return new File([u8arr], Math.random().toString(36).substr(2, 10) + '.png', {
            type: 'image/png',
            lastModified: Date.now()
        });
    }

    if (files.length > 0) {
        var file = files[0];
        var reader = new FileReader();
        reader.onload = function (e) {
            img.src = e.target.result;

            // delay to load image
            setTimeout(function () {
                cropper = new Cropper(img, {
                    viewMode: 1,
                });
            }, 200);

        }
        reader.readAsDataURL(file);
    }

    $('#cropImage').click(function () {
        $('#cropImage').attr('disabled', true);
        canvas = cropper.getCroppedCanvas();

        // set the new file to the input file on the element
        let container = new DataTransfer();
        container.items.add(dataURLtoFile(canvas.toDataURL()));
        input.files = container.files;

        // change dropify image
        $('#' + elementId).parent().find('.dropify-render img').attr('src', canvas.toDataURL());

        // close modal
        elementId = '';
        $(MODAL_LG).modal('hide');
    });

    function onModelClose() {
        if(elementId != undefined && elementId != '') {
            $('#' + elementId).parent().find('.dropify-clear').click();
            cropper.destroy();
            elementId = '';
        }
    }

    $(MODAL_LG).on('hidden.bs.modal', function (e) {
        onModelClose();
        $(MODAL_LG + ' .modal-content').html('');
        $(MODAL_LG).off('hidden.bs.modal');
    });
</script>
