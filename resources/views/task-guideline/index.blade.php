@extends('layouts.app')
@section('content')
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-colorpicker/3.4.0/css/bootstrap-colorpicker.min.css" />
    <div class="container-fluid">
        <div class="row">
            <div class="col-md-12">
                <div class="card mt-3">
                    <div class="card-body">
                        <h3 class="text-center mb-5">Provide Design Reference</h3>
                        <form action="{{route('task-guideline-store')}}" method="post">
                            <input type="hidden" name="project_id" id="project_id" value="{{$project_id}}">
                            <div class="row">
                                    <!--Theme Details Start-->
                                    <div class="col-sm-12">
                                        <div class="form-group">
                                            <label for="" class="text-dark-grey">Provide Theme Details
                                                <sup class="mr-1">*</sup>
                                            </label>
                                            <div class="d-flex">
                                                <div class="form-check d-flex align-items-center">
                                                    <input class="form-check-input mb-1" type="radio" value="1" name="theme_details" id="theme_yes">
                                                    <label class="form-check-label ml-2 mb-0" for="theme_yes">
                                                        Yes
                                                    </label>
                                                </div>
                                                <div class="form-check d-flex align-items-center" style="margin-left: 25px;">
                                                    <input class="form-check-input mb-1" type="radio" value="0" name="theme_details" id="theme_no">
                                                    <label class="form-check-label ml-2 mb-0" for="theme_no">
                                                        No
                                                    </label>
                                                </div>
                                            </div>
                                            <span id="theme_details_error" class="text-danger"></span>
                                        </div>
                                        <div class="row mb-3" style="display: none;" id="themeInfo">
                                            <div class="col-md-6">
                                                <label for="">Theme Name</label>
                                                <input type="text" name="theme_name" id="theme_name" class="form-control height-35 f-14" placeholder="Type theme name">
                                            </div>
                                            <div class="col-md-6">
                                                <label for="">Theme Url</label>
                                                <input type="url" name="theme_url" id="theme_url" class="form-control height-35 f-14" placeholder="Type theme Url">
                                            </div>
                                        </div>
                                    </div>
                                    <!--Theme Details End-->
                                    <!--Design  Start-->
                                    <div class="col-sm-12 mb-3">
                                        <label class="text-dark-grey" data-label="true" for="design">Design
                                            <sup class="mr-1">*</sup>
                                        </label>
                                        <div class="dropdown bootstrap-select form-control select-picker">
                                            <select name="design" id="design" data-live-search="true" class="form-control select-picker error" data-size="8">
                                                <option value="">--</option>
                                                <option value="XD/Figma">XD/Figma</option>
                                                <option value="Photoshop">Photoshop</option>
                                                <option value="The Reference Site That Has To Be Cloned" id="referenceValue">The Reference Site That Has To Be Cloned</option>
                                            </select>
                                            <span id="design_error" class="text-danger"></span>
                                        </div>
                                        <div class="row mt-3" style="display: none;" id="xdInput">
                                            <div class="col-md-12">
                                                <label for="">Input XD/Figma URL</label>
                                                <input type="url" name="xd_url" id="xd_url" class="form-control height-35 f-14" placeholder="Input XD/Figma URL">
                                            </div>
                                        </div>
                                        <div class="row mt-3" style="display: none;" id="photoshopInput">
                                            <div class="col-md-12">
                                                <label for="">Input Google Drive File/Folder URL</label>
                                                <input type="url" name="drive_url" id="drive_url" class="form-control height-35 f-14" placeholder="Input Google Drive File/Folder URL">
                                            </div>
                                        </div>
                                        <div class="row mt-3" style="display: none;" id="referenceInput">
                                            <div class="col-sm-12">
                                                <label for="">Reference Site Link</label>
                                                <div class="row">
                                                    <div class="col-9 dynamic-reference-link" id="dynamic-reference-link-list-1">
                                                        <div class="row mb-3">
                                                            <div class="col-12">
                                                                <input type="url" name="reference_link[]" id="reference_link" class="form-control placeholderText height-35 f-14" placeholder="Enter google doc or sheet file or drive folder link here">
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-3 append-buttons">
                                                        <div class="clearfix d-flex">
                                                            <button type="button" id="add-reference-button" class="btn btn-primary float-left text-uppercase shadow-sm"><i class="fa fa-plus fa-fw"></i></button>
                                                            <button type="button" id="remove-reference-button" class="btn btn-secondary float-left text-uppercase ml-1" disabled="disabled"><i class="fa fa-minus fa-fw"></i></button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-sm-12">
                                                <label for="">Add Instruction</label>
                                                <textarea name="instruction" id="instruction" class="form-control"></textarea>
                                                <script src="{{ asset('/ckeditor/ckeditor.js') }}"></script>
                                                <script>
                                                    CKEDITOR.replace('instruction',{
                                                        height:100,
                                                    });
                                                </script>
                                            </div>
                                        </div>
                                    </div>
                                    <!--Design  End-->
                                </div>
                            <div class="mb-3">
                                <div class="row">
                                    <!--Color Schema Start-->
                                    <div class="col-md-12">
                                        <label class="text-dark-grey" data-label="true" for="design">Color Schema
                                            <sup class="mr-1">*</sup>
                                        </label>
                                        <div class="row">
                                            <div class="col-md-10 dynamic-color" id="dynamic-color-list-1">
                                                <div class="row mb-3">
                                                    <div class="col-sm-12">
                                                        <label class="text-dark-grey" data-label="true" for="design">Choose at least two colors
                                                            <sup class="mr-1">*</sup>
                                                        </label>
                                                        <div id="colorpicker" class="input-group colorpicker-element" data-colorpicker-id="1">
                                                            <div class="input-group">
                                                                <input type="text" name="color[]" id="colorselector" value="#16813D" class="form-control height-35 f-15 light_text">
                                                                <span id="color_error" class="text-danger"></span>
                                                                <div class="input-group-append">
                                                                <span class="input-group-text colorpicker-input-addon height-35" data-original-title="" title="" tabindex="0">
                                                                    <i style="background: rgb(22, 129, 61);"></i>
                                                                </span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="row mb-3">
                                                    <div class="col-sm-12">
                                                        <label class="text-dark-grey" data-label="true" for="design">Where Should Developers Use This
                                                            Color?
                                                            <sup class="mr-1">*</sup>
                                                        </label>
                                                        <textarea name="color_description[]" id="color_description" rows="8" class="form-control"></textarea>
                                                        <span id="color_description_error" class="text-danger"></span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-md-2 append-buttons mt-4">
                                                <div class="clearfix">
                                                    <button type="button" id="add-color-button" class="btn btn-primary float-left text-uppercase shadow-sm"><i class="fa fa-plus fa-fw"></i></button>
                                                    <button type="button" id="remove-color-button" class="btn btn-secondary float-left text-uppercase ml-1" disabled="disabled"><i class="fa fa-minus fa-fw"></i></button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <!--Color Schema End-->
                                </div>
                            </div>
                            <div class="row">
                                <!--Plugin Research Start-->
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label for="" class="text-dark-grey">Plugin Research
                                            <sup class="mr-1">*</sup>
                                        </label>
                                        <div class="d-flex">
                                            <div class="form-check d-flex align-items-center">
                                                <input class="form-check-input mb-1" type="radio" value="1" name="plugin_research" id="plugin_research_yes">
                                                <label class="form-check-label ml-2 mb-0" for="plugin_research_yes">
                                                    Yes
                                                </label>
                                            </div>
                                            <div class="form-check d-flex align-items-center" style="margin-left: 25px;">
                                                <input class="form-check-input mb-1" type="radio" value="0" name="plugin_research" id="plugin_research_no">
                                                <label class="form-check-label ml-2 mb-0" for="plugin_research_no">
                                                    No
                                                </label>
                                            </div>
                                        </div>
                                        <span id="plugin_research_error" class="text-danger"></span>
                                    </div>
                                </div>
                                <!--Plugin Research End-->
                             </div>
                            <div class="row mb-5" style="display: none;" id="plugin_research_info">
                                <div class="col-md-4">
                                    <label for="">Plugin Name</label>
                                    <input type="text" name="plugin_name" id="plugin_name" class="form-control height-35 f-14" placeholder="Type Plugin Name">
                                </div>
                                <div class="col-md-4">
                                    <label for="">Plugin URL</label>
                                    <input type="url" name="plugin_url" id="plugin_url" class="form-control height-35 f-14" placeholder="Type Plugin Url">
                                </div>
                                <div class="col-md-4">
                                    <label for="">Share Google Drive Link</label>
                                    <input type="url" name="google_drive_link" id="google_drive_link" class="form-control height-35 f-14" placeholder="Type Google link">
                                </div>
                            </div>
                            <div class="row mb-5">
                                    <div class="col-md-12">
                                        <label for="">Write Instructions for Using This Plugin</label>
                                        <textarea name="instruction_plugin" id="instruction_plugin" cols="30" rows="5" class="form-control"></textarea>
                                    </div>
                                </div>
                            <div class="justify-content-center d-flex">
                                <button type="submit" class="btn btn-primary py-2" id="submit-button">Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-colorpicker/3.4.0/js/bootstrap-colorpicker.min.js"></script>
    <script>
        $('#submit-button').click(function(e){
            e.preventDefault();
            $('#submit-button').attr("disabled", true);
            $('#submit-button').html("Processing...");
            var theme_details = $('input[name="theme_details"]:checked').val();
            var reference_link = document.getElementsByName("reference_link[]");
            var reference_link_values = [];
            for (var i = 0; i < reference_link.length; i++) {
                reference_link_values.push(reference_link[i].value);
            }
            var instruction = CKEDITOR.instances.instruction.getData();
            var color = document.getElementsByName("color[]");
            var color_values = [];
            for (var i = 0; i < color.length; i++) {
                color_values.push(color[i].value);
            }
            var color_description = document.getElementsByName("color_description[]");
            var color_description_values = [];
            for (var i = 0; i < color_description.length; i++) {
                color_description_values.push(color_description[i].value);
            }
            var plugin_research = $('input[name="plugin_research"]:checked').val();
            var data= {
                '_token': "{{ csrf_token() }}",
                'theme_details': theme_details,
                'theme_name': document.getElementById("theme_name").value,
                'theme_url': document.getElementById("theme_url").value,
                'design': document.getElementById("design").value,
                'xd_url': document.getElementById("xd_url").value,
                'drive_url': document.getElementById("drive_url").value,
                'reference_link': reference_link_values,
                'instruction': instruction,
                'color': color_values,
                'color_description': color_description_values,
                'plugin_research': plugin_research,
                'plugin_name': document.getElementById("plugin_name").value,
                'plugin_url': document.getElementById("plugin_url").value,
                'google_drive_link': document.getElementById("google_drive_link").value,
                'instruction_plugin': document.getElementById("instruction_plugin").value,
                'project_id': document.getElementById("project_id").value,
            }
            $.ajaxSetup({
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                }
            });
            $.ajax({
                type: "POST",
                url: "{{route('task-guideline-store')}}",
                data: data,
                dataType: "json",
                success: function (response) {
                    $(location).prop('href', '{{url('account/projects/'.$project_id.'?tab=tasks')}}');
                    toastr.success('PM Task Guideline Added Successfully');
                    $('#submit-button').attr("disabled", false);
                    $('#submit-button').html("Submit");
                },
                error: function(error) {
                    // console.log(response);
                    if(error.responseJSON.errors.theme_details){
                        $('#theme_details_error').text(error.responseJSON.errors.theme_details);
                    }else{
                        $('#theme_details_error').text('');
                    }
                    if(error.responseJSON.errors.design){
                        $('#design_error').text(error.responseJSON.errors.design);
                    }else{
                        $('#design_error').text('');
                    }
                    if(error.responseJSON.errors.color){
                        $('#color_error').text(error.responseJSON.errors.color);
                    }else{
                        $('#color_error').text('');
                    }
                    if(error.responseJSON.errors.design){
                        $('#plugin_research_error').text(error.responseJSON.errors.plugin_research);
                    }else{
                        $('#plugin_research_error').text('');
                    }
                    $('#submit-button').attr("disabled", false);
                    $('#submit-button').html("Submit");
                }
            });
        });
    </script>

    <script src="{{ asset('/ckeditor/ckeditor.js') }}"></script>


    <script>
        $(document).ready(function() {
            $('#colorselector').colorpicker();
        });

        $(document).ready(function() {
            $('#theme_yes').click(function() {
                $('#themeInfo').toggle();
            });
        });
        $(document).ready(function() {
            $('#plugin_research_yes').click(function() {
                $('#plugin_research_info').toggle();
            });
        });

        const selectElement = document.getElementById("design");
        const xdInput = document.getElementById("xdInput");
        const photoshopInput = document.getElementById("photoshopInput");
        const referenceInput = document.getElementById("referenceInput");

        selectElement.addEventListener("change", function() {
            if (selectElement.value === "XD/Figma") {
                xdInput.style.display = "block";
                photoshopInput.style.display = "none";
                referenceInput.style.display = "none";
            } else if (selectElement.value === "Photoshop") {
                xdInput.style.display = "none";
                photoshopInput.style.display = "block";
                referenceInput.style.display = "none";
            } else if (selectElement.value === "The Reference Site That Has To Be Cloned") {
                xdInput.style.display = "none";
                photoshopInput.style.display = "none";
                referenceInput.style.display = "block";
            } else {
                xdInput.style.display = "none";
                photoshopInput.style.display = "none";
                referenceInput.style.display = "none";
            }
        });
        $(document).ready(function () {
            var buttonAdd = $("#add-reference-button");
            var buttonRemove = $("#remove-reference-button");
            var className = ".dynamic-reference-link";
            var count = 0;
            var field = "";
            var maxFields = 50;

            function totalFields() {
                return $(className).length;
            }

            function addNewField() {
                var total = $('input[name="reference_link[]"]').length;
                count = totalFields() + 1;
                field = $("#dynamic-reference-link-list-1").clone();
                field.attr("id", "dynamic-reference-link-" + count);
                field.find('input[name="reference_link[]"]').val("");
                field.find('input[name="reference_link[]"]').attr("id", "reference_link_" + count);
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
        $(document).ready(function () {
            var buttonAdd = $("#add-color-button");
            var buttonRemove = $("#remove-color-button");
            var className = ".dynamic-color";
            var count = 0;
            var field = "";
            var maxFields = 50;

            function totalFields() {
                return $(className).length;
            }

            function addNewField() {
                var total = $('input[name="color[]"]').length;
                count = totalFields() + 1;
                field = $("#dynamic-color-list-1").clone();
                field.attr("id", "dynamic-color-" + count);
                field.find('input[name="color[]"]').val("");
                field.find('input[name="color[]"]').attr("id", "color_" + count);
                field.find('textarea[name="color_description[]"]').val("");
                $(className + ":last").after(field);

                // Initialize color picker for the cloned input field
                field.find('input[name="color[]"]').colorpicker();

                // Adjust the addon color based on the selected color
                field.find('input[name="color[]"]').on('colorpickerChange', function(event) {
                    var color = event.color.toString();
                    $(this).siblings('.input-group-append').find('i').css('background', color);
                });
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





        // function htmlRender(id, counter){
        //
        //     return `
        //     <div class="row" id="color_container_row${id}">
        //                 <div class="col-md-10 dynamic-color" id="dynamic-color-list-1">
        //         <div class="row mb-3">
        //             <div class="col-sm-12">
        //                 <label class="text-dark-grey" data-label="true" for="design">Choose at least two colors
        //                     <sup class="mr-1">*</sup>
        //                 </label>
        //                 <div id="colorpicker" class="input-group colorpicker-element" data-colorpicker-id="1">
        //                     <div class="input-group">
        //                         <input type="text" name="color[]" id="colorselector" value="#16813D" class="form-control height-35 f-15 light_text">
        //                         <div class="input-group-append">
        //                             <span class="input-group-text colorpicker-input-addon height-35" data-original-title="" title="" tabindex="0">
        //                                 <i style="background: rgb(22, 129, 61);"></i>
        //                             </span>
        //                         </div>
        //                     </div>
        //                 </div>
        //             </div>
        //         </div>
        //         <div class="row mb-3">
        //             <div class="col-sm-12">
        //                 <label class="text-dark-grey" data-label="true" for="design">Where Should Developers Use This Color?
        //                     <sup class="mr-1">*</sup>
        //                 </label>
        //                 <textarea name="color_description[]" id="color_description_${id}" class="form-control"></textarea>
        //             </div>
        //             </div>
        //             </div>
        //             <div class="col-md-2 append-buttons mt-4 color_des_btn" data-id=${id}>
        //                     <div class="clearfix">
        //                         <button type="button" id="add-color-button${id}" class="btn btn-primary float-left text-uppercase shadow-sm"><i class="fa fa-plus fa-fw"></i></button>
        //                         <button type="button" id="remove-color-button${id}" data-rm-target="color_container_row${id}" class="btn btn-secondary float-left text-uppercase ml-1"><i class="fa fa-minus fa-fw"></i></button>
        //                     </div>
        //                 </div>
        //            </div>
        //
        //
        //
        //         <script>
        //             CKEDITOR.replace(\`color_description_${id}\`, {
        //                 height: 100,
        //             })
        //         <\/script>
        // `}
        //
        //
        // $(document).ready(function() {
        //     var counter = 1;
        //
        //     var html;
        //
        //
        //
        //     render(counter)
        //
        //
        //     function render(id) {
        //         html += htmlRender(counter, counter);
        //
        //
        //
        //         $('#color_container').html(html);
        //
        //
        //
        //         $(`#add-color-button${counter}`).on('click', function() {
        //             // cloneDynamicColor();
        //             $(`#add-color-button${counter}`).attr('style',"display:none");
        //             counter += 1;
        //             render(counter);
        //
        //             $('.color_des_btn').each(function(){
        //                 var dataId = $(this).attr('data-id');
        //                 if(parseInt(dataId) <= id){
        //                     $(this).attr('style', 'display:none');
        //                 }
        //             })
        //         });
        //
        //         $(`#remove-color-button${id}`).on('click', function() {
        //             var target = $(this).attr('data-rm-target');
        //             counter--;
        //             $(`#${target}`).remove();
        //
        //
        //             $('.color_des_btn').each(function(){
        //                 var dataId = $(this).attr('data-id');
        //                 console.log({id, counter})
        //                 if(parseInt(dataId) === id-1){
        //                     $(this).attr('style', 'display:block');
        //                 }
        //             })
        //
        //         })
        //     }
        //
        //
        //     // Clone the dynamic color element
        //     function cloneDynamicColor() {
        //         counter++;
        //         var dynamicColor = $("#dynamic-color-list-1").clone();
        //         dynamicColor.attr("id", "dynamic-color-list-" + counter);
        //         dynamicColor.find("textarea").attr("id", "color_description_" + counter);
        //         dynamicColor.find("textarea").attr("name", "color_description[]");
        //
        //         // Reset the cloned textarea's value
        //         dynamicColor.find("textarea").val("");
        //
        //         // Reset the cloned colorpicker element
        //         dynamicColor.find(".input-group-append i").css("background", "");
        //         dynamicColor.find(".input-group-append i").parent().attr("data-original-title", "");
        //         dynamicColor.find(".input-group-append i").parent().attr("title", "");
        //         dynamicColor.find(".input-group input").val("#16813D");
        //
        //         $("#dynamic-color-list-1").after(dynamicColor);
        //
        //         dynamicColor.find(".input-group").colorpicker();
        //
        //         CKEDITOR.replace('color_description_' + counter, {
        //             height: 100,
        //         });
        //
        //         if (counter > 1) {
        //             $("#remove-color-button").prop("disabled", false);
        //         }
        //     }
        //
        //     function removeDynamicColor() {
        //         if (counter > 1) {
        //             $("#color_container_row" + counter).remove();
        //             counter--;
        //
        //             // Disable remove button if there is only one dynamic color element remaining
        //             // if (counter === 1) {
        //             //     $("#remove-color-button").prop("disabled", true);
        //             // }
        //         }
        //     }
        //     $("#dynamic-color-list-1 .input-group").colorpicker();
        // });
    </script>
@endsection
