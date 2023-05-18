@extends('layouts.app')
@section('content')
<style>
    .categoryLink{
        background-color: #ffffff;
        box-shadow: 0 0 10px rgba(0,0,0,0.1);
        border-radius: 50px;
        margin-right: 25px;
    }
    @media (max-width: 580px) {
        .categoryLink {
            margin-bottom: 10px;
        }
        .col-sm-6 {
            width: 100%;
            display: block;
        }
    }
    @media (max-width: 750px) {
        .col-md-3 {
            width: 50%;
        }
        .categoryLink {
            margin-bottom: 10px;
        }
    }
    @media (max-width: 750px) {
        .col-sm-2 {
            width: 50%;
            margin-bottom: 10px;
        }
    }
</style>
    <div class="container-fluid">
        <div class="row">
            <div class="col-md-12">
                <div class="card mt-3">
                    <div class="card-body">
                        <div class="row">
                            <div class="col-sm-2">
                                <label for="">Select CMS Category</label><br>
                                <div class="dropdown bootstrap-select form-control select-picker" style="width: 50%; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
                                    <select name="cms_id" id="cms_id" data-live-search="true" class="form-control select-picker error" data-size="8">
                                        <option value="">--</option>
                                        @foreach ($portfolios as $portfolio)
                                            <option value="{{ $portfolio->id }}">{{ $portfolio->cms_name }}</option>
                                        @endforeach
                                    </select>
                                </div>
                            </div>
                            <div class="col-sm-2">
                                <label for="">Website Types</label><br>
                                <div class="dropdown bootstrap-select form-control select-picker" style="width: 50%; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
                                    <select name="website_type" id="website_type" data-live-search="true" class="form-control select-picker error" data-size="8">
                                        <option value="">--</option>
                                        @foreach ($portfolios as $portfolio)
                                            <option value="{{$portfolio->id}}">{{$portfolio->website_type}}</option>
                                        @endforeach
                                    </select>
                                </div>
                            </div>
                            <div class="col-sm-2">
                                <label for="">Select Website Category</label><br>
                                <div class="dropdown bootstrap-select form-control select-picker" style="width: 50%; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
                                    <select name="website_category" id="website_category" data-live-search="true" class="form-control select-picker error" data-size="8">
                                        <option value="">--</option>
                                        @foreach ($portfolios as $portfolio)
                                            <option value="{{$portfolio->id}}">{{$portfolio->category_name}}</option>
                                        @endforeach
                                    </select>
                                </div>
                            </div>
                            <div class="col-sm-2">
                                <label for="">Select Website Subcategory</label><br>
                                <div style="width: 50%; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
                                    <select class="form-control height-35 f-14" name="website_sub_cat" id="website_sub_cat" data-live-search="true" data-size="8">
                                        <option value="">--</option>
                                    </select>
                                </div>
                            </div>
                            <div class="col-sm-2">
                                <label for="">Select Website Theme</label><br>
                                <div class="dropdown bootstrap-select form-control select-picker" style="width: 50%; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
                                    <select name="theme_name" id="theme_name" data-live-search="true" class="form-control select-picker error" data-size="8">
                                        <option value="">--</option>
                                        @foreach ($portfolios as $portfolio)
                                            <option value="{{$portfolio->id}}">{{$portfolio->theme_name}}</option>
                                        @endforeach
                                    </select>
                                </div>
                            </div>
                            <div class="col-sm-2">
                                <label for="">Select Website Plugin</label><br>
                                <div class="dropdown bootstrap-select form-control select-picker" style="width: 50%; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
                                    <select name="portfolio_link" id="portfolio_link" data-live-search="true" class="form-control select-picker error" data-size="8">
                                        <option value="">--</option>
                                        @foreach ($portfolios as $portfolio)
                                            <option value="{{$portfolio->id}}">{{$portfolio->plugin_name}}</option>
                                        @endforeach
                                    </select>
                                </div>
                            </div>
                        </div>
                        <br>
                        <div class="displayFilterData">
                            <p class="mt-2 f-20">Website Category: Seopage1</p>
                            <div class="d-flex">
                                <div class="categoryLink">
                                    <img src="img/avatar.png" alt="" class="rounded-circle m-1" width="30" height="30">
                                    <a href="#" class="ml-2 linkBtn mr-4" onclick="event.preventDefault();">www.seopage1.com</a>
                                </div>
                            </div>
                        </div>

                        @foreach($portfolios as $index => $portfolio)
                            <section style="background-color: #f4f4f4; display: none;" class="py-3 mt-3 linkShow" id="linkShow{{$index}}">
                                    <div class="container-fluid">
                                        <div class="mb-3">
                                            <h5 class="f-20">Project Title:</h5>
                                            <span>{{$portfolio->project_name}}</span>
                                        </div>
                                        <div class="mb-3">
                                            <span class="f-20">Client Name: {{$portfolio->user_name}}</span><br>
                                            <img src="img/avatar.png" alt="" class="rounded-circle m-1" width="30" height="30"><span class="ml-2">{{$portfolio->user_name}}</span>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-6 mb-3 mb-md-0">
                                                <h5>Website Link:</h5>
                                                <span>{{$portfolio->plugin_url}}</span>
                                            </div>
                                            <div class="col-md-6">
                                                <h5>Agree price:</h5>
                                                <span>$ 3587 USD</span>
                                            </div>
                                        </div>
                                        <div class="row mt-3">
                                            <div class="col-md-6 mb-3 mb-md-0">
                                                <h5>Final price with bonus and additional requirements:</h5>
                                                <span>$ 4654 USD</span>
                                            </div>
                                            <div class="col-md-6 d-flex">
                                                <h5>Theme Name:</h5>
                                                <p class="ml-2">{{$portfolio->theme_name}}</p>
                                            </div>
                                        </div>
                                        <div class="row mt-3">
                                            <div class="col-md-6 mb-3 mb-md-0">
                                                <h5>Total estimated hours:</h5>
                                                <span>350 Hours & 25 Min</span>
                                            </div>
                                            <div class="col-md-6">
                                                <h5>Total Logged hours:</h5>
                                                <p class="ml-2">250 Hours & 10 Min</p>
                                            </div>
                                        </div>
                                        <div class="row mt-3">
                                            <div class="col-md-6 mb-3 mb-md-0">
                                                <h5>Average hourly price based on the final logged hours:</h5>
                                                <span>$ 50 USD</span>
                                            </div>
                                            <div class="col-md-6">
                                                <h5>Total number of pages with page numbers:</h5>
                                                <p class="ml-2">Main page name and number: {{$portfolio->main_page_number}} page ({{$portfolio->main_page_name}})</p>
                                                <p class="ml-2">Secondary page name and number: {{$portfolio->secondary_page_number}} page ({{$portfolio->secondary_page_name}})</p>
                                            </div>
                                        </div>
                                        <div class="mt-3">
                                            <h5>Is There Any Major Functions You Want To Mention About This Project? (Mention the name of the functionality and a brief description with screenshot)</h5>
                                            <span>{!! $portfolio->description !!}</span>
                                        </div>
                                    </div>
                                </section>
                        @endforeach
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<script>
    // CMS FILTER SECTION
    $(document).ready(function() {
        $('#cms_id, #website_type, #website_category, #website_sub_cat, #theme_name, #portfolio_link').change(function() {
            var selectedCategoryId = $('#cms_id').val();
            var websiteType = $('#website_type').val();
            var website_category = $('#website_category').val();
            var website_sub_cat = $('#website_sub_cat').val();
            var theme_name = $('#theme_name').val();
            var portfolio_link = $('#portfolio_link').val();
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
                    portfolio_link: portfolio_link
                },
                success: function(response) {
                    $('.displayFilterData').empty();

                    var categoryHtml = '<p class="mt-2 f-20">Website Category: ' + selectedCmsName + '</p>';
                    $('.displayFilterData').append(categoryHtml);

                    $.each(response, function(index, category) {
                        var linkHtml = '<div class="d-flex mb-3">' +
                            '<div class="categoryLink">' +
                            '<img src="img/avatar.png" alt="" class="rounded-circle m-1" width="30" height="30">' +
                            '<a href="#" class="ml-2 linkBtn mr-4">' + category.portfolio_link + '</a>' +
                            '</div>' +
                            '</div>';
                        $('.displayFilterData').append(linkHtml);
                    });

                    var linkBtns = document.querySelectorAll(".linkBtn");

                    linkBtns.forEach(function(linkBtn, index) {
                        linkBtn.addEventListener("click", function(event) {
                            event.preventDefault();

                            var linkShows = document.querySelectorAll(".linkShow");
                            linkShows.forEach(function(linkShow) {
                                linkShow.style.display = "none";
                            });

                            var linkShow = document.getElementById("linkShow" + index);
                            if (linkShow) {
                                linkShow.style.display = "block";
                            }
                        });
                    });
                },
                error: function(xhr, status, error) {
                    console.log(xhr.responseText);
                }
            });
        });
    });

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
                        console.log(data);
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


