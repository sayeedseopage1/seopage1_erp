@extends('layouts.app')
@section('content')
<style>
    .selectBox{
        width: 7rem;
        background-color: #ffffff;
        border: none;
        box-shadow: 0 0 10px rgba(0,0,0,0.1);
        border-radius: 5px;
        text-align: center;

    }
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
        .mediaBox {
            flex-wrap: wrap;
        }
        .col-sm-2 {
            width: 50%;
            margin-bottom: 10px;
        }
    }
    @media (max-width: 750px) {
        .dropdown-toggleMedia {
            display: block;
            width: 100%;
            text-align: left;
        }

        .dropdown-menuMedia {
            position: static;
            float: none;
            width: auto;
            margin-top: 0;
            box-shadow: none;
        }

        .dropdown-itemMedia {
            display: block;
            width: 100%;
            padding: 0.5rem 1rem;
            clear: both;
            font-weight: 400;
            color: #212529;
            text-align: left;
        }

        .dropdown-item:hover {
            color: #16181b;
            background-color: #f8f9fa;
        }
    }
</style>
    <div class="container-fluid">
        <div class="row">
            <div class="col-md-12">
                <div class="card mt-3">
                    <div class="card-body">
                        <div class="row mediaBox">
                            <div class="col-sm-2">
                                <label for="">Select CMS Category</label><br>
                                <div class="dropdown">
                                    <button class="btn dropdown-toggle selectBox dropdown-toggleMedia" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        All<i class="fa fa-sort-down mb-1 ml-2"></i>
                                    </button>
                                    <div class="dropdown-menu dropdown-menuMedia" aria-labelledby="dropdownMenuButton">
                                    @foreach($cms_categories as $cms_category)
                                        <a class="dropdown-item dropdown-itemMedia selected" href="#">{{$cms_category->cms_name}}</a>
                                    @endforeach
                                    </div>
                                </div>
                            </div>
                            <div class="col-sm-2">
                                <label for="">Website Types</label><br>
                                <div class="dropdown">
                                    <button class="btn dropdown-toggle selectBox dropdown-toggleMedia" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        All<i class="fa fa-sort-down mb-1 ml-2"></i>
                                    </button>
                                    <div class="dropdown-menu dropdown-menuMedia" aria-labelledby="dropdownMenuButton">
                                        @foreach($website_types as $website_type)
                                        <a class="dropdown-item dropdown-itemMedia" href="#">{{$website_type->website_type}}</a>
                                        @endforeach
                                    </div>
                                </div>
                            </div>
                            <div class="col-sm-2">
                                <label for="">Select Website Category</label><br>
                                <div class="dropdown">
                                    <button class="btn dropdown-toggle selectBox dropdown-toggleMedia" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        All<i class="fa fa-sort-down mb-1 ml-2"></i>
                                    </button>
                                    <div class="dropdown-menu dropdown-menuMedia" aria-labelledby="dropdownMenuButton">
                                        @foreach($parent_categories as $parent_category)
                                        <a class="dropdown-item dropdown-itemMedia" href="#">{{$parent_category->category_name}}</a>
                                        @endforeach
                                    </div>
                                </div>
                            </div>
                            <div class="col-sm-2">
                                <label for="">Select Website Subcategory</label><br>
                                <div class="dropdown">
                                    <button class="btn dropdown-toggle selectBox dropdown-toggleMedia" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        All<i class="fa fa-sort-down mb-1 ml-2"></i>
                                    </button>
                                    <div class="dropdown-menu dropdown-menuMedia" aria-labelledby="dropdownMenuButton">
                                        <a class="dropdown-item dropdown-itemMedia" href="#">Action</a>
                                    </div>
                                </div>
                            </div>
                            <div class="col-sm-2">
                                <label for="">Select Website Theme</label><br>
                                <div class="dropdown">
                                    <button class="btn dropdown-toggle selectBox dropdown-toggleMedia" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        All<i class="fa fa-sort-down mb-1 ml-2"></i>
                                    </button>
                                    <div class="dropdown-menu dropdown-menuMedia" aria-labelledby="dropdownMenuButton">
                                        @foreach($project_portfolios as $project_portfolio)
                                            <a class="dropdown-item dropdown-itemMedia" href="#">{{$project_portfolio->theme_name}}</a>
                                        @endforeach
                                    </div>
                                </div>
                            </div>
                            <div class="col-sm-2">
                                <label for="">Select Website Plugin</label><br>
                                <div class="dropdown">
                                    <button class="btn dropdown-toggle selectBox dropdown-toggleMedia" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        All<i class="fa fa-sort-down mb-1 ml-2"></i>
                                    </button>
                                    <div class="dropdown-menu dropdown-menuMedia" aria-labelledby="dropdownMenuButton">
                                        @foreach($project_portfolios as $project_portfolio)
                                            <a class="dropdown-item dropdown-itemMedia" href="#">{{$project_portfolio->plugin_name}}</a>
                                        @endforeach
                                    </div>
                                </div>
                            </div>
                        </div>
                        <br>
                        @foreach($portfolios as $index => $portfolio)
                            <p class="mt-2 f-20">Website Category: {{$portfolio->category_name}}</p>
                            <div class="d-flex">
                                <div class="categoryLink">
                                    <img src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50" alt="" class="rounded-circle m-1" width="30" height="30">
                                    <a href="#" class="ml-2 linkBtn mr-4">{{substr($portfolio->portfolio_link,0,50)}}</a>
                                </div>
                            </div>
                        @endforeach

                        @foreach($portfolios as $index => $portfolio)
                            <section style="background-color: #f4f4f4; display: none;" class="py-3 mt-3 linkShow" id="linkShow{{$index}}">
                                    <div class="container-fluid">
                                        <div class="mb-3">
                                            <h5 class="f-20">Project Title:</h5>
                                            <span>{{$portfolio->project_name}}</span>
                                        </div>
                                        <div class="mb-3">
                                            <span class="f-20">Client Name: {{$portfolio->user_name}}</span><br>
                                            <img src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50" alt="" class="rounded-circle m-1" width="30" height="30"><span class="ml-2">{{$portfolio->user_name}}</span>
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
<script>
    document.addEventListener("DOMContentLoaded", function() {
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
    });
</script>

