  @extends('layouts.app')
@push('styles')
<style>
    .categoryLink {
        background-color: #ffffff;
        border-radius: 6px;
        margin-right: 10px;
        border: 1px solid rgba(0, 0, 0, 0.1);
        padding: 1px 10px 1px 3px;
        color: #484a50;
        margin-bottom: 10px;
        cursor: pointer;
    }

    .categoryLink:hover {
        box-shadow: 0 0 3px rgba(82, 118, 226, 0.3);
        color: #4a6fdf !important;
        border-color: #4a6fdf;
    }

    .copyBtn {
        position: relative;
        padding: 0px;
        height: 38px;
        width: 38px;
        border: none !important;
        border-color: rgba(0, 0, 0, 0);
        color: rgba(0, 0, 0, .3);
    }

    .copyBtn:hover {
        background: transparent;
        color: #0c6af3;
    }

    .copyBtn:before {
        content: "Copied";
        position: absolute;
        top: -45px;
        right: 0px;
        background: #5c81dc;
        padding: 6px 8px;
        border-radius: 15px;
        font-size: 13px;
        display: none;
    }

    .copyBtn:after {
        content: "";
        position: absolute;
        top: -20px;
        right: 25px;
        width: 10px;
        height: 10px;
        background: #5c81dc;
        transform: rotate(45deg);
        display: none;
    }

    .copyBtn.active:before,
    .copyBtn.active:after {
        display: block;
    }
</style>
@endpush
@section('content')

<div class="container-fluid">
    <div class="row mx-0">
        <div class="col-md-12">
            <div class="card mt-3">
                <div class="card-body">
                    {{-- {{ dd($website_themes) }} --}}
                    <div class="row mx-0">
                        <div class="col-12 col-sm-4 col-md-3 col-xl-2 p-2 d-flex flex-column">
                            <label style="font-size: 13px; font-weight: bold; color:#999eac; white-space:nowrap;"
                                   for="">Select CMS Category</label>
                            <div class="dropdown bootstrap-select form-control select-picker"
                                 style="width: 100%; box-shadow: 0 1px 3pxpx rgba(0,0,0,0.1);">
                                <select name="cms_id"
                                        id="cms_id"
                                        data-live-search="true"
                                        class="w-100 form-control select-picker error"
                                        data-size="8">
                                    <option value="">--</option>
                                    @foreach ($project_cmss as $project_cms)
                                    <option value="{{ $project_cms->id }}">{{ $project_cms->cms_name }}</option>
                                    @endforeach
                                </select>
                            </div>
                        </div>

                        <div class="col-12 col-sm-4 col-md-3 col-xl-2 p-2 d-flex flex-column">
                            <label style="font-size: 13px; font-weight: bold; color:#999eac; white-space:nowrap;"
                                   for="">Website Types</label>
                            <div class="dropdown bootstrap-select form-control select-picker"
                                 style="width: 100%; box-shadow: 0 1px 3pxpx rgba(0,0,0,0.1);">
                                <select name="website_type"
                                        id="website_type"
                                        data-live-search="true"
                                        class="w-100 form-control select-picker error"
                                        data-size="8">
                                    <option value="">--</option>
                                    @foreach ($website_types as $website_type)
                                    <option value="{{$website_type->id}}">{{$website_type->website_type}}</option>
                                    @endforeach
                                </select>
                            </div>
                        </div>


                        <div class="col-12 col-sm-4 col-md-3 col-xl-2 p-2 d-flex flex-column">
                            <label style="font-size: 13px; font-weight: bold; color:#999eac; white-space:nowrap;"
                                   for="">Select Website Category</label>
                            <div class="dropdown bootstrap-select form-control select-picker"
                                 style="width: 100%; box-shadow: 0 1px 3pxpx rgba(0,0,0,0.1);">
                                <select name="website_category"
                                        id="website_category"
                                        data-live-search="true"
                                        class="w-100 form-control select-picker error"
                                        data-size="8">
                                    <option value="">--</option>
                                    @foreach ($website_categories as $website_category)
                                    <option value="{{$website_category->id}}">{{$website_category->category_name}}</option>
                                    @endforeach
                                </select>
                            </div>
                        </div>


                        <div class="col-12 col-sm-4 col-md-3 col-xl-2 p-2 d-flex flex-column">
                            <label style="font-size: 13px; font-weight: bold; color:#999eac; white-space:nowrap;"
                                   for="">Select Website Subcategory</label>
                            <div style="width: 100%; box-shadow: 0 1px 3pxpx rgba(0,0,0,0.1);">
                                <select class="form-control height-35 f-14"
                                        name="website_sub_cat"
                                        id="website_sub_cat"
                                        data-live-search="true"
                                        data-size="8">
                                    <option value="">--</option>
                                </select>
                            </div>
                        </div>

                        <div class="col-12 col-sm-4 col-md-3 col-xl-2 p-2 d-flex flex-column">
                            <label style="font-size: 13px; font-weight: bold; color:#999eac; white-space:nowrap;"
                                   for="">Select Website Theme</label>
                            <div class="dropdown bootstrap-select form-control select-picker"
                                 style="width: 100%; box-shadow: 0 1px 3pxpx rgba(0,0,0,0.1);">
                                <select name="theme_name"
                                        id="theme_name"
                                        data-live-search="true"
                                        class="form-control select-picker error"
                                        data-size="8">
                                    <option value="">--</option>

                                    @foreach ($website_themes as $website_theme)
                                    <option value="{{$website_theme->id}}">{{$website_theme->theme_name}}</option>

                                    @endforeach
                                </select>
                            </div>
                        </div>
                        <div class="col-12 col-sm-4 col-md-3 col-xl-2 p-2 d-flex flex-column">
                            <label style="font-size: 13px; font-weight: bold; color:#999eac; white-space:nowrap;"
                                   for="">Select Website Plugin</label>
                            <div class="dropdown bootstrap-select form-control select-picker"
                                 style="width: 100%; box-shadow: 0 1px 3pxpx rgba(0,0,0,0.1);">
                                <select name="website_plugin"
                                        id="website_plugin"
                                        x-placement="bottom-end"
                                        data-live-search="true"
                                        style="width: 200px !important;"
                                        class="form-control select-picker error"
                                        data-size="8">
                                    <option value="">--</option>
                                    @foreach ($website_plugins as $website_plugin)
                                    <option value="{{$website_plugin->id}}">{{$website_plugin->plugin_name}}</option>
                                    @endforeach
                                </select>
                            </div>
                        </div>
                    </div>

                    <br>
                    <div class="displayFilterData">
                        <p class="mt-2 f-18"
                           style="color:#5e6168; font-weight: 500">Website Category: <span id="displaySelectedCategory">Seopage1</span></p>
                        <div id="categoryLinkWrapper"
                             class="d-flex flex-wrap m-0 p-0">
                            <div class="categoryLink">
                                <img src="/user-uploads/favicon/14d159b3d5548dfbc48b977da1ede616.png"
                                     alt=""
                                     class="rounded-circle m-1"
                                     width="26"
                                     height="26"
                                     style="border: 2px solid #dddddd;">
                                <span>www.seopage1.com</span>
                            </div>
                        </div>
                    </div>

                    <!--Modal Start-->
                    <div class="portfolioModal"></div>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
@push('scripts')
<script>
    $(document).ready(function() {
        $('#cms_id, #website_type, #website_category, #website_sub_cat, #theme_name, #website_plugin').change(function(event) {
            var selectedCategoryId = $('#cms_id').val();
            var websiteType = $('#website_type').val();
            var website_category = $('#website_category').val();
            var website_sub_cat = $('#website_sub_cat').val();
            var theme_name = $('#theme_name').val();
            var website_plugin = $('#website_plugin').val();
            var selectedCmsName = $(this).find(':selected').text();

            $.ajax({
                url: "{{ route('filter-cms-categories') }}",
                method: 'GET',
                data: {
                    category_id: selectedCategoryId,
                    website_type: websiteType,
                    website_category: website_category,
                    website_sub_cat: website_sub_cat,
                    theme_name: theme_name,
                    website_plugin: website_plugin
                },
                success: function(response) {
                    $('.displayFilterData').empty();

                    var categoryHtml = '<p class="mt-2 f-20">Website Category: ' + selectedCmsName + '</p>';
                    $('.displayFilterData').append(categoryHtml);

                    var rowHtml = '<div class="row"></div>';
                    $('.displayFilterData').append(rowHtml);

                    $.each(response, function(index, category) {
                        var linkHtml = '<div class="col-md-4">' +
                            '<div id="categoryLinkWrapper" class="m-0 p-0">' +
                            '<div class="categoryLink d-flex align-items-center">' +
                            '<img src="/user-uploads/favicon/14d159b3d5548dfbc48b977da1ede616.png" alt="" class="rounded-circle m-1" width="26" height="26" style="border: 2px solid #dddddd;">';

                            linkHtml += '<a href="#" class="mr-auto linkBtn"  data-id="' + category.id + '">' + category.portfolio_link + '</a>'
                            linkHtml += '<button type="submit" class="btn btn-outline-primary copyBtn"><i class="fa fa-clone"></i></button>' +
                            '</div>' +
                            '</div>' +
                            '</div>';

                        $('.displayFilterData .row').append(linkHtml);
                        CopyTextLink();
                    });


                    $('.linkBtn').each(function(){
                        $(this).on('click', function(e) {
                            e.preventDefault();
                            var dataId = $(this).data('id');
                            $.ajax({
                                url: '/filter-data/' + dataId,
                                type: "GET",
                                dataType: "html",
                                success: function (data) {
                                    console.log(data);
                                    $('.portfolioModal').html(data);
                                    $('#linkModal').modal('show');
                                },
                                error: function(xhr, status, error) {
                                    // Handle the error response here
                                    console.error(error);
                                }
                            });
                        });
                    })
                },
                error: function(xhr, status, error) {
                    console.log(xhr.responseText);
                }
            });
        });
    });
    function CopyTextLink() {
        $('.categoryLink').each(function () {
            var text = $(this).children('a.linkBtn').text();
            var copyBtn = $(this).children('.copyBtn');

            copyBtn.on('click', function () {
                copyBtn.addClass('active');

                var tempInput = $('<input>');
                tempInput.val(text);
                $('body').append(tempInput);
                tempInput.select();
                document.execCommand('copy');
                tempInput.remove();

                setTimeout(function () {
                    copyBtn.removeClass('active');
                }, 1000);
            });
        });
    }
    $('.linkBtn').click(function(e) {
        e.preventDefault();

        var target = $(this).attr('href');

        $(target).collapse('toggle');
    });
</script>
<script>
    // AUTO SELECT SUBCATEGORY SECTION
    $(document).ready(function () {
        $('#website_category').change(function () {
            var website_cat_id = $(this).val();
            if (website_cat_id) {
                $.ajax({
                    url: '/portfolio/get-sub-category/' + website_cat_id,
                    type: "GET",
                    dataType: "json",
                    success: function (data) {
                        $('#website_sub_cat').empty();
                        $.each(data, function (index, website_sub_cat) {
                            $('#website_sub_cat').append('<option value="' + website_sub_cat.id + '">' + website_sub_cat.category_name + '</option>');
                        });
                    }
                });
            } else {
                $('#website_sub_cat').empty();
            }
        });
    });
</script>
@endpush