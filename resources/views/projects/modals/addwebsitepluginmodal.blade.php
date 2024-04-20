<div class="modal fade" id="addwebsitepluginmodal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog d-flex justify-content-center align-items-center modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="modelHeading">Add Website Plugin</h5>
                <button type="button" class="btn-close" data-dismiss="modal" aria-label="Close"></button>
            </div>
            <form method="POST"  autocomplete="off" id="websitePlugin">
                @csrf
                <div class="modal-body">
                    <div class="row">
                        <div class="col-md-10 dynamic-field" id="dynamic-field-1">
                            <div class="row">
                                <div class="col-md-4">
                                    <div class="form-group">
                                        <label for="plugin_name">Plugin Name</label>
                                        <input type="text" id="plugin_name" class="form-control height-35 f-14 search-website-plugin" placeholder="Type official plugin name" name="plugin_name[]"/>
                                        <span id="plugin_name_error" class="text-danger"></span>
                                    </div>
                                </div>
                                <div class="col-md-8">
                                    <div class="form-group">
                                        <label for="plugin_url">Plugin Url</label>
                                        <input type="url" id="plugin_url" class="form-control height-35 f-14" placeholder="Add plugin url" name="plugin_url[]"/>
                                        <span id="plugin_url_error" class="text-danger"></span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="col-md-2 append-buttons" style="margin-top: 25px;">
                            <div class="clearfix">
                                <button type="button" id="add-button" class="btn btn-primary float-left text-uppercase shadow-sm"><i class="fa fa-plus fa-fw"></i></button>
                                <button type="button" id="remove-button" class="btn btn-secondary float-left text-uppercase ml-1" disabled="disabled"><i class="fa fa-minus fa-fw"></i></button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary" id="add_plugin" disabled>Save</button>
                </div>
            </form>
        </div>
    </div>
</div>
<script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-3-typeahead/4.0.2/bootstrap3-typeahead.min.js"></script>
<script>
    var path = "{{ route('check-website-plugin') }}";
    $('input.search-website-plugin').typeahead({
        source: function(plugin_name, process){
            return $.get(path, {plugin_name: plugin_name}, function(data){
                return process(data)
            })
        }
    });
    $('#add_plugin').click(function(e){
        // alert('ok');
        e.preventDefault();
        $('#add_plugin').attr("disabled", true);
        $('#add_plugin').html("Processing...");
        var plugin_name = document.getElementsByName("plugin_name[]");
        var plugin_name_values = [];
        for (var i = 0; i < plugin_name.length; i++) {
            plugin_name_values.push(plugin_name[i].value);
        }
        var plugin_url = document.getElementsByName("plugin_url[]");
        var plugin_url_values = [];
        for (var i = 0; i < plugin_url.length; i++) {
            plugin_url_values.push(plugin_url[i].value);
        }
        var data = {
            '_token': "{{ csrf_token() }}",
            'plugin_name': plugin_name_values,
            'plugin_url': plugin_url_values,
        };
        // console.log(data);
        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            }
        });
        $.ajax({
            type: "POST",
            url: "{{route('add-website-plugin')}}",
            data: data,
            dataType: "json",
            success: function (response) {
                if (response.status == 200){
                    window.location.reload();
                    $('#add_plugin').attr("disabled", false);
                    $('#add_plugin').html("Save");
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Website Plugin Added Successfully',
                        showConfirmButton: false,
                        timer: 1500
                    })
                }

            },
            error: function(error) {
                $('#add_plugin').attr("disabled", false);
                $('#add_plugin').html("Save");
            }
        });
    });

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
    const form = document.getElementById('websitePlugin');
    const button = document.getElementById('add_plugin');
    const name = document.getElementById('plugin_name');
    const url = document.getElementById('plugin_url');

    form.addEventListener('input', () => {
        let valid = true;
        if (name.value.trim() === '') {
            valid = false;
            plugin_name_error.textContent = 'Please enter the plugin name!';
        } else {
            plugin_name_error.textContent = '';
        }
        if (url.value.trim() === '') {
            valid = false;
            plugin_url_error.textContent = 'Please enter the plugin url!';
        } else {
            plugin_url_error.textContent = '';
        }
        const button = document.getElementById('add_plugin');
        button.disabled = !valid;
    });
</script>
