<script type="text/javascript">
    let updateAreaDiv = $('#update-area');
    let refreshPercent = 0;
    let checkInstall = true;

    $('#update-app').click(function () {
        if ($('#update-frame').length) {
            return false;
        }
        @php($envatoUpdateCompanySetting = \Froiden\Envato\Functions\EnvatoUpdate::companySetting())

        @if(!is_null($envatoUpdateCompanySetting->supported_until) && \Carbon\Carbon::parse($envatoUpdateCompanySetting->supported_until)->isPast())
        let supportText = " Your support has been expired on <b><span id='support-date'>{{\Carbon\Carbon::parse($envatoUpdateCompanySetting->supported_until)->format('dS M, Y')}}</span></b>";

        Swal.fire({
            title: "Support Expired",
            html: supportText + "<br>Please renew your support for one-click updates.",
            showCancelButton: true,
            confirmButtonText: "Renew Now",
            denyButtonText: `Free Support Guidelines`,
            cancelButtonText: "Cancel",
            closeOnConfirm: true,
            closeOnCancel: true,
            showCloseButton: true,
            icon: 'warning',
            focusConfirm: false,
            customClass: {
                confirmButton: 'btn btn-primary mr-3',
                denyButton: 'btn btn-success mr-3 p-2',
                cancelButton: 'btn btn-secondary'
            },
            showClass: {
                popup: 'swal2-noanimation',
                backdrop: 'swal2-noanimation'
            },
            buttonsStyling: false,
        }).then((result) => {
            if (result.isConfirmed) {
                window.open(
                    "{{ config('froiden_envato.envato_product_url') }}",
                    '_blank'
                );
            }
        });


        @else

        Swal.fire({

            title: "Are you sure?",
            html: `<x-alert type="danger" icon="info-circle">Do not click update now button if the application is customised. Your changes will be lost.\n
                <br>
                <br>
                Take backup of files and database before updating. \
                <br>
                <br>
                <strong class="mt-2"><i>Author will not be responsible if something goes wrong</i></strong>
                </x-alert>
                <span class="">To confirm if you have read the above message, type <strong><i>confirm</i></strong> in the field.</span>
                `,
            icon: 'info',
            focusConfirm: true,
            customClass: {
                confirmButton: 'btn btn-primary mr-3',
                cancelButton: 'btn btn-secondary'
            },
            showClass: {
                popup: 'swal2-noanimation',
                backdrop: 'swal2-noanimation'
            },
            buttonsStyling: false,
            input: 'text',
            inputAttributes: {
                autocapitalize: 'off'
            },
            showCloseButton: true,
            showCancelButton: true,
            confirmButtonText: "Yes, update it!",
            cancelButtonText: "No, cancel please!",
            padding: '3em',
            showLoaderOnConfirm: true,
            preConfirm: (isConfirm) => {

                if (!isConfirm) {
                    return false;
                }

                if (isConfirm.toLowerCase() !== "confirm") {

                    Swal.fire({
                        title: "Text not matched",
                        html: "You have entered wrong spelling of <b>confirm</b>",
                        icon: 'error',
                    });
                    return false;
                }
                if (isConfirm.toLowerCase() === "confirm") {
                    return true;
                }
            },
            allowOutsideClick: () => !Swal.isLoading()
        }).then((result) => {
            if (result.isConfirmed) {
                updateAreaDiv.removeClass('d-none');
                Swal.close();
                $.easyAjax({
                    type: 'GET',
                    blockUI: true,
                    url: '{!! route("admin.updateVersion.update") !!}',
                    success: function (response) {
                        if (response.status === 'success') {
                            updateAreaDiv.html("<strong>Downloading...:-</strong><br> ");
                            downloadScript();
                            downloadPercent();
                        } else if (response.status === 'fail')
                            updateAreaDiv.addClass('d-none');
                    }
                });
            }
        });
        @endif


    })

    function downloadScript() {
        $.easyAjax({
            type: 'GET',
            url: '{!! route("admin.updateVersion.download") !!}',
            success: function (response) {
                clearInterval(refreshPercent);
                $('#percent-complete').css('width', '100%');
                $('#percent-complete').html('100%');
                $('#download-progress').append("<i><span class='text-success'>Download complete.</span> Now Installing...Please wait (This may take few minutes.)</i>");

                window.setInterval(function () {
                    /// call your function here
                    if (checkInstall == true) {
                        checkIfFileExtracted();
                    }
                }, 1500);

                installScript();

            }
        });
    }

    function getDownloadPercent() {
        $.easyAjax({
            type: 'GET',
            url: '{!! route("admin.updateVersion.downloadPercent") !!}',
            success: function (response) {
                response = response.toFixed(1);
                $('#percent-complete').css('width', response + '%');
                $('#percent-complete').html(response + '%');
            }
        });
    }

    function checkIfFileExtracted() {
        $.easyAjax({
            type: 'GET',
            url: '{!! route("admin.updateVersion.checkIfFileExtracted") !!}',
            success: function (response) {
                checkInstall = false;
                if (response.status == 'success') {
                    window.location.reload();
                }
            }
        });
    }

    function downloadPercent() {
        updateAreaDiv.append('<hr><div id="download-progress">' +
            'Download Progress<br><div class="progress progress-lg">' +
            '<div class="progress-bar progress-bar-success active progress-bar-striped" id="percent-complete" role="progressbar""></div>' +
            '</div>' +
            '</div>'
        );
        //getting data
        refreshPercent = window.setInterval(function () {
            getDownloadPercent();
            /// call your function here
        }, 1500);
    }

    function installScript() {
        $.easyAjax({
            type: 'GET',
            url: '{!! route("admin.updateVersion.install") !!}',
            success: function (response) {
                if (response.status == 'success') {
                    window.location.reload();
                }
            }
        });
    }

    function getPurchaseData() {
        var token = "{{ csrf_token() }}";
        $.easyAjax({
            type: 'POST',
            url: "{{ route('purchase-verified') }}",
            data: {'_token': token},
            container: "#support-div",
            messagePosition: 'inline',
            success: function (response) {
                window.location.reload();
            }
        });
        return false;
    }

    function showHidePurchaseCode() {
        $(this).toggleClass('fa-eye-slash fa-eye');
        $(this).siblings('span').toggleClass('blur-code ');
    }
    $("body").tooltip({
        selector: '[data-toggle="tooltip"]'
    })

</script>
