@extends('layouts.app')
@section('content')
@php
$sales_blog_article = \App\Models\SalesBlogArticle::where('blog_article_id',$blog_article->id)->first();
$deal = \App\Models\Deal::where('id',$blog_article->deal_id)->first();
$project = \App\Models\Project::where('deal_id',$blog_article->deal_id)->first();
$pm = \App\Models\User::where('id',$project->pm_id)->first();
$blogArticle = \App\Models\BlogArticle::where('id',$blog_article->id)->first();
@endphp
<div class="container-fluid">
    @if (Auth::user()->role_id == 7 || Auth::user()->role_id == 1)
    <div class="row">
        <div class="col-12">
            <div class="card mb-2 mt-3">
                <div class="card-body">
                    <div class="row">
                        <div class="col-4">
                            <p>Deal Id</p>
                        </div>
                        <div class="col-8">
                            <p>{{$blog_article->deal_id}}</p>
                        </div>
                        <div class="col-4">
                            <p>Client Link</p>
                        </div>
                        <div class="col-8">
                            <p>{{$blog_article->client_link}}</p>
                        </div>
                        <div class="col-4">
                            <p>Client Name</p>
                        </div>
                        <div class="col-8">
                            <p>{{$deal->client_name}}</p>
                        </div>
                        <div class="col-4">
                            <p>Project Name</p>
                        </div>
                        <div class="col-8">
                            <p>{{$deal->project_name}}</p>
                        </div>
                        <div class="col-4">
                            <p>Service Type</p>
                        </div>
                        <div class="col-8">
                            <p>{{$blog_article->service_type}}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="card mb-2">
                <div class="card-body">
                    <div class="row">
                        <div class="col-4">
                            <p>Website Link & Niche:</p>
                        </div>
                        <div class="col-8">
                            {{-- START WEBSITE LINK --}}
                            <div id="website_link_container">
                                @if($sales_blog_article != null)
                                    <p>{{$sales_blog_article->website_link}}</p>
                                @else
                                    @if($blog_article->website_link ?? null)
                                        <button id="website_link_btn" type="button" style="background-color: #ffffff" onclick="toggleWebsiteLinkButton()" data-toggle="tooltip" data-placement="top" title="Click to edit">{{$blog_article->website_link}}</button>
                                    @else
                                        <button type="button" id="website_link_btn" style="background-color: #ffffff" onclick="toggleWebsiteLinkButton()" data-toggle="tooltip" data-placement="top" title="Click to edit">--</button>
                                    @endif
                                @endif
                            </div>

                            <div id="website_link_form">
                                @if($blog_article->website_link)
                                <form action="" method="post">
                                    @csrf
                                    <div class="input-group" id="input_website_link" style="display: none; margin-top: -10px;">
                                        <input type="url" id="website_link" value="{{$blog_article->website_link}}" name="website_link" class="form-control height-35 f-14" aria-label="Recipient's username" aria-describedby="saveButton" placeholder="Enter website URL (https://asdasd.com)">
                                        <div class="input-group-append">
                                            <button class="btn btn-outline-secondary saveWebsiteLinkBtn" type="button" id="saveButton" data-id="{{$blog_article->id}}"><i class="fa-solid fa-check"></i></button>
                                        </div>
                                    </div>
                                    <span id="website_link_error" class="text-danger"></span><br>
                                    @else
                                    <div class="input-group" id="input_website_link" style="display: none; margin-top: -10px;">
                                        <input type="url" id="website_link" name="website_link" class="form-control height-35 f-14" aria-label="Recipient's username" aria-describedby="saveButton" placeholder="Enter website URL (https://asdasd.com)">
                                        <div class="input-group-append">
                                            <button class="btn btn-outline-secondary saveWebsiteLinkBtn" type="button" id="saveButton" data-id="{{$blog_article->id}}"><i class="fa-solid fa-check"></i></button>
                                        </div>
                                    </div>
                                    <span id="website_link_error" class="text-danger"></span><br>
                                </form>
                                @endif
                            </div>


                            {{-- START WEBSITE LINK --}}
                            <div id="website_niche_container">
                                @if($sales_blog_article && $sales_blog_article->website_niche != null)
                                    <p>{{$sales_blog_article->website_niche}}</p>
                                @else
                                    @if($blog_article && $blog_article->website_niche)
                                        <button id="website_niche_btn" type="button" style="background-color: #ffffff" onclick="toggleWebsiteNicheButton()" data-toggle="tooltip" data-placement="top" title="Click to edit">{{$blog_article->website_niche}}</button>
                                    @else
                                        <button type="button" id="website_niche_btn" style="background-color: #ffffff" onclick="toggleWebsiteNicheButton()" data-toggle="tooltip" data-placement="top" title="Click to edit">--</button>
                                    @endif
                                @endif
                            </div>


                            <div id="website_niche_form">
                                @if($blog_article->website_niche)
                                <form action="" method="post">
                                    @csrf
                                    <div class="input-group" id="input_website_niche" style="display: none; margin-top: -10px;">
                                        <input type="url" id="website_niche" value="{{$blog_article->website_niche}}" name="website_niche" class="form-control height-35 f-14" aria-label="Recipient's username" aria-describedby="saveButton" placeholder="Write Your Niche (Pet Care, Digital Marketing)">
                                        <div class="input-group-append">
                                            <button class="btn btn-outline-secondary saveWebsiteNicheBtn" type="button" id="saveButton" data-id="{{$blog_article->id}}"><i class="fa-solid fa-check"></i></button>
                                        </div>
                                    </div>
                                    <span id="website_niche_error" class="text-danger"></span><br>
                                    @else
                                    <div class="input-group" id="input_website_niche" style="display: none; margin-top: -10px;">
                                        <input type="url" id="website_niche" name="website_niche" class="form-control height-35 f-14" aria-label="Recipient's username" aria-describedby="saveButton" placeholder="Write Your Niche (Pet Care, Digital Marketing)">
                                        <div class="input-group-append">
                                            <button class="btn btn-outline-secondary saveWebsiteNicheBtn" type="button" id="saveButton" data-id="{{$blog_article->id}}"><i class="fa-solid fa-check"></i></button>
                                        </div>
                                    </div>
                                    <span id="website_niche_error" class="text-danger"></span><br>
                                </form>
                                @endif
                            </div>

                        </div>
                    </div>
                </div>
            </div>

            <div class="card mb-2">
                <div class="card-body">
                    <div class="row">
                        <div class="col-4">
                            <p>Website Name/Business Name</p>
                        </div>
                        <div class="col-8">
                            <div id="website_name_container">
                                @if($sales_blog_article && $sales_blog_article->website_name != null)
                                <p>{{$sales_blog_article->website_name}}</p>
                                @else
                                @if($blog_article && $blog_article->website_name)
                                <button id="website_name_btn" type="button" style="background-color: #ffffff" onclick="toggleWebsiteNameButton()" data-toggle="tooltip" data-placement="top" title="Click to edit"> {{$blog_article->website_name}}</button>
                                @else
                                <button type="button" id="website_name_btn" style="background-color: #ffffff" onclick="toggleWebsiteNameButton()" data-toggle="tooltip" data-placement="top" title="Click to edit">--</button>
                                @endif
                                @endif
                            </div>

                            <div id="website_name_form">
                                @if($blog_article->website_name)
                                <form action="" method="post">
                                    @csrf
                                    <div class="input-group" id="input_website_name" style="display: none; margin-top: -10px;">
                                        <input type="text" id="website_name" value="{{$blog_article->website_name}}" name="website_name" class="form-control height-35 f-14" aria-label="Recipient's username" aria-describedby="saveButton" placeholder="Type Your Business/Website Name">
                                        <div class="input-group-append">
                                            <button class="btn btn-outline-secondary saveWebsiteNameBtn" type="button" id="saveButton" data-id="{{$blog_article->id}}"><i class="fa-solid fa-check"></i></button>
                                        </div>
                                    </div>
                                    <span id="website_name_error" class="text-danger"></span><br>
                                    @else
                                    <div class="input-group" id="input_website_name" style="display: none; margin-top: -10px;">
                                        <input type="text" id="website_name" name="website_name" class="form-control height-35 f-14" aria-label="Recipient's username" aria-describedby="saveButton" placeholder="Type Your Business/Website Name">
                                        <div class="input-group-append">
                                            <button class="btn btn-outline-secondary saveWebsiteNameBtn" type="button" id="saveButton" data-id="{{$blog_article->id}}"><i class="fa-solid fa-check"></i></button>
                                        </div>
                                    </div>
                                    <span id="website_name_error" class="text-danger"></span><br>
                                </form>
                                @endif
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="card mb-2">
                <div class="card-body">
                    <div class="row">
                        <div class="col-4">
                            <p>Business profile/Leaflet/Brochure/Any important information</p>
                        </div>
                        @if($sales_blog_article && $sales_blog_article->business_information != null)
                        <div class="col-8">
                            <p>{{$sales_blog_article->business_information}}</p>
                        </div>
                        @else
                        <div class="col-8" id="business_information_value" onclick="toggleBusinessInformationEdit()">
                            <div id="business_information_container">
                                @if($blog_article && $blog_article->business_information)
                                <button id="business_information_btn" type="button" style="background-color: #ffffff"  data-toggle="tooltip" data-placement="top" title="Click to edit"> {{$blog_article->business_information}}</button>
                                @else
                                <button type="button" id="business_information_btn" style="background-color: #ffffff"  data-toggle="tooltip" data-placement="top" title="Click to edit">--</button>
                                @endif
                            </div>
                        </div>
                        @endif


                        <div class="col-4">
                            <p>Share File Info</p>
                        </div>
                        @if($sales_blog_article !=null)
                        <div class="col-8">
                            @if($sales_blog_article->share_file_info ==1)
                                <p>Yes</p>
                            @else
                                <p>No</p>
                            @endif
                        </div>
                        @else
                        <div class="col-8" id="business_information_value" onclick="toggleBusinessInformationEdit()">
                            @if($blog_article->share_file_info ==1)
                                <p data-toggle="tooltip" data-placement="top" title="Click to edit">Yes</p>
                            @else
                                <p data-toggle="tooltip" data-placement="top" title="Click to edit">No</p>
                            @endif
                        </div>
                        @endif

                        @if(isset($sales_blog_article) && $sales_blog_article->share_file_info == 1)
                            <div class="col-4"></div>
                            <div class="col-8">
                                @php
                                    if (is_string($sales_blog_article->folder_link) && is_array(json_decode($sales_blog_article->folder_link, true))) {
                                        $array = json_decode($sales_blog_article->folder_link, true);
                                        $folder_links = implode(', ', $array);
                                    }
                                    else {
                                        $folder_links = '';
                                    }
                                    $folder_links_array = explode(', ', $folder_links);
                                @endphp

                                @foreach($folder_links_array as $folder_link)
                                    @if($folder_link)
                                        <p>{{$folder_link}}</p>
                                    @else
                                        <p>--</p>
                                    @endif
                                @endforeach
                            </div>
                        @else
                            @if(isset($blog_article) && $blog_article->share_file_info == 1)
                                <div class="col-4"></div>
                                <div class="col-8" id="business_information_value" onclick="toggleBusinessInformationEdit()">
                                    @php
                                        if (is_string($blog_article->folder_link) && is_array(json_decode($blog_article->folder_link, true))) {
                                            $array = json_decode($blog_article->folder_link, true);
                                            $folder_links = implode(', ', $array);
                                        }
                                        else {
                                            $folder_links = '';
                                        }
                                        $folder_links_array = explode(', ', $folder_links);
                                    @endphp

                                    @foreach($folder_links_array as $folder_link)
                                        @if($folder_link)
                                            <p data-toggle="tooltip" data-placement="top" title="Click to edit">{{$folder_link}}</p>
                                        @else
                                            <p data-toggle="tooltip" data-placement="top" title="Click to edit">--</p>
                                        @endif
                                    @endforeach
                                </div>
                            @endif
                        @endif
                    </div>
                    <div  id="business_information_edit">
                        <button type="button" style="background-color: #ffffff; position: absolute; top: 35px; right: 20px;" class="d-flex justify-content-end ml-auto btn btn-secondary" data-toggle="modal" data-target="#business_information_edit_modal"><i class="fa fa-edit" style="font-size: 16px;"></i></button>
                    </div>
                    @include('service-type.modal.blog-article.business_information_edit_modal')
                </div>
            </div>

            <div class="card mb-2">
                <div class="card-body">
                    <div class="row">
                        <div class="col-4">
                            <p>Reference Blogs</p>
                        </div>
                        @if($sales_blog_article && $sales_blog_article->blog_url != null)
                            <div class="col-8">
                                @php
                                    if (is_string($sales_blog_article->blog_url) && is_array(json_decode($sales_blog_article->blog_url, true))) {
                                        $array = json_decode($sales_blog_article->blog_url, true);
                                        $blog_urls = implode(', ', $array);
                                    }
                                    $blog_urls_array = explode(', ', $blog_urls);
                                @endphp

                                @foreach($blog_urls_array as $blog_url)
                                    @if($blog_url)
                                    <p>{{$blog_url}}</p>
                                    @else
                                    <p>--</p>
                                    @endif
                                @endforeach
                            </div>
                        @else
                            <div class="col-8" id="reference_blog_value" onclick="toggleReferenceBlogEdit()">
                                @php
                                    if (is_string($blog_article->blog_url) && is_array(json_decode($blog_article->blog_url, true))) {
                                        $array = json_decode($blog_article->blog_url, true);
                                        $blog_urls = implode(', ', $array);
                                    }
                                    $blog_urls_array = explode(', ', $blog_urls);
                                @endphp

                                @foreach($blog_urls_array as $blog_url)
                                    @if($blog_url)
                                    <p data-toggle="tooltip" data-placement="top" title="Click to edit">{{$blog_url}}</p>
                                    @else
                                    <p data-toggle="tooltip" data-placement="top" title="Click to edit">--</p>
                                    @endif
                                @endforeach
                            </div>
                        @endif
                    </div>
                    <div id="reference_blog_edit">
                        <button type="button" style="background-color: #ffffff; position: absolute; top: 35px; right: 20px;" class="d-flex justify-content-end ml-auto btn btn-secondary" data-toggle="modal" data-target="#reference_blog_edit_modal"><i class="fa fa-edit" style="font-size: 16px;"></i></button>
                    </div>
                    @include('service-type.modal.blog-article.reference_blog_edit_modal')
                </div>
            </div>

            <div class="card mb-2">
                <div class="card-body">
                    <div class="row">
                        <div class="col-4">
                            <p>How many blogs/articles do you need written?</p>
                        </div>
                        <div class="col-8">
                            <div id="product_no_container">
                                @if($sales_blog_article && $sales_blog_article->product_no != null)
                                <p>{{$sales_blog_article->product_no}}</p>
                                @else
                                @if($blog_article && $blog_article->product_no)
                                <button id="product_no_btn" type="button" style="background-color: #ffffff" onclick="toggleProductNoButton()" data-toggle="tooltip" data-placement="top" title="Click to edit"> {{$blog_article->product_no}}</button>
                                @else
                                <button type="button" id="product_no_btn" style="background-color: #ffffff" onclick="toggleProductNoButton()" data-toggle="tooltip" data-placement="top" title="Click to edit">--</button>
                                @endif
                                @endif
                            </div>

                            <div id="product_no_form">
                                @if($blog_article->product_no)
                                <form action="" method="post">
                                    @csrf
                                    <div class="input-group" id="input_product_no" style="display: none; margin-top: -10px;">
                                        <input type="text" id="product_no" value="{{$blog_article->product_no}}" name="product_no" class="form-control height-35 f-14" aria-label="Recipient's username" aria-describedby="saveButton" placeholder="Input the no. of products here!">
                                        <div class="input-group-append">
                                            <button class="btn btn-outline-secondary saveProductNoBtn" type="button" id="saveButton" data-id="{{$blog_article->id}}"><i class="fa-solid fa-check"></i></button>
                                        </div>
                                    </div>
                                    <span id="product_no_error" class="text-danger"></span><br>
                                    @else
                                    <div class="input-group" id="input_product_no" style="display: none; margin-top: -10px;">
                                        <input type="text" id="product_no" name="product_no" class="form-control height-35 f-14" aria-label="Recipient's username" aria-describedby="saveButton" placeholder="Input the no. of products here!">
                                        <div class="input-group-append">
                                            <button class="btn btn-outline-secondary saveProductNoBtn" type="button" id="saveButton" data-id="{{$blog_article->id}}"><i class="fa-solid fa-check"></i></button>
                                        </div>
                                    </div>
                                    <span id="product_no_error" class="text-danger"></span><br>
                                </form>
                                @endif
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="card mb-2">
                <div class="card-body">
                    <div class="row">
                        <div class="col-4">
                            <p>Topics</p>
                        </div>

                        @if(isset($sales_blog_article->topic_info))
                        <div class="col-8" id="topics_value" onclick="toggleTopicsEdit()">
                            @if($sales_blog_article->topic_info ==1)
                                <p data-toggle="tooltip" data-placement="top" title="Click to edit">Research and collect topics for me</p>
                            @else
                                <p data-toggle="tooltip" data-placement="top" title="Click to edit">I have the topics</p>
                            @endif
                        </div>
                        @else
                        <div class="col-8" id="topics_value" onclick="toggleTopicsEdit()">
                            @if($blog_article->topic_info ==1)
                                <p data-toggle="tooltip" data-placement="top" title="Click to edit">Research and collect topics for me</p>
                            @else
                                <p data-toggle="tooltip" data-placement="top" title="Click to edit">I have the topics</p>
                            @endif
                        </div>
                        @endif

                        @if(isset($sales_blog_article) && $sales_blog_article->topic_info == 0)
                            <div class="col-4"></div>
                            <div class="col-8">
                                @php
                                    if (is_string($sales_blog_article->topic_link) && is_array(json_decode($sales_blog_article->topic_link, true))) {
                                        $array = json_decode($sales_blog_article->topic_link, true);
                                        $topic_links = implode(', ', $array);
                                    }
                                    else {
                                        $topic_links = '';
                                    }
                                    $topic_links_array = explode(', ', $topic_links);
                                @endphp

                                @foreach($topic_links_array as $topic_link)
                                    @if($topic_link)
                                        <p>{{$topic_link}}</p>
                                    @else
                                        <p>--</p>
                                    @endif
                                @endforeach
                            </div>
                        @else
                            @if(isset($blog_article) && $blog_article->topic_info == 0)
                                <div class="col-4"></div>
                                <div class="col-8" id="topics_value" onclick="toggleTopicsEdit()">
                                    @php
                                        if (is_string($blog_article->topic_link) && is_array(json_decode($blog_article->topic_link, true))) {
                                            $array = json_decode($blog_article->topic_link, true);
                                            $topic_links = implode(', ', $array);
                                        }
                                        else {
                                            $topic_links = '';
                                        }
                                        $topic_links_array = explode(', ', $topic_links);
                                    @endphp

                                    @foreach($topic_links_array as $topic_link)
                                        @if($topic_link)
                                            <p data-toggle="tooltip" data-placement="top" title="Click to edit">{{$topic_link}}</p>
                                        @else
                                            <p data-toggle="tooltip" data-placement="top" title="Click to edit">--</p>
                                        @endif
                                    @endforeach
                                </div>
                            @endif
                        @endif
                    </div>
                    <div id="topics_edit">
                        <button type="button" style="background-color: #ffffff; position: absolute; top: 35px; right: 20px;" class="d-flex justify-content-end ml-auto btn btn-secondary" data-toggle="modal" data-target="#topics_edit_modal"><i class="fa fa-edit" style="font-size: 16px;"></i></button>
                    </div>
                    @include('service-type.modal.blog-article.topics_edit_modal')
                </div>
            </div>

            <div class="card mb-3">
                <div class="card-body">
                    <div class="row">
                        <div class="col-4">
                            <p>Keywords</p>
                        </div>

                        @if(isset($sales_blog_article->keyword_info))
                        <div class="col-8" id="keywords_value" onclick="toggleKeywordsEdit()">
                            @if($sales_blog_article->keyword_info ==1)
                                <p data-toggle="tooltip" data-placement="top" title="Click to edit">Research and collect keywords for me </p>
                            @else
                                <p data-toggle="tooltip" data-placement="top" title="Click to edit">I have the keywords</p>
                            @endif
                        </div>
                        @else
                        <div class="col-8" id="keywords_value" onclick="toggleKeywordsEdit()">
                            @if($blog_article->keyword_info ==1)
                                <p data-toggle="tooltip" data-placement="top" title="Click to edit">Research and collect keywords for me</p>
                            @else
                                <p data-toggle="tooltip" data-placement="top" title="Click to edit">I have the keywords</p>
                            @endif
                        </div>
                        @endif

                        @if(isset($sales_blog_article) && $sales_blog_article->keyword_info == 0)
                            <div class="col-4"></div>
                            <div class="col-8">
                                @php
                                    if (is_string($sales_blog_article->keyword_link) && is_array(json_decode($sales_blog_article->keyword_link, true))) {
                                        $array = json_decode($sales_blog_article->keyword_link, true);
                                        $keyword_links = implode(', ', $array);
                                    }
                                    else {
                                        $keyword_links = '';
                                    }
                                    $keyword_links_array = explode(', ', $keyword_links);
                                @endphp

                                @foreach($keyword_links_array as $keyword_link)
                                    @if($keyword_link)
                                        <p>{{$keyword_link}}</p>
                                    @else
                                        <p>--</p>
                                    @endif
                                @endforeach
                            </div>
                        @else
                            @if(isset($blog_article) && $blog_article->keyword_info == 0)
                                <div class="col-4"></div>
                                <div class="col-8" id="keywords_value" onclick="toggleKeywordsEdit()">
                                    @php
                                        if (is_string($blog_article->keyword_link) && is_array(json_decode($blog_article->keyword_link, true))) {
                                            $array = json_decode($blog_article->keyword_link, true);
                                            $keyword_links = implode(', ', $array);
                                        }
                                        else {
                                            $keyword_links = '';
                                        }
                                        $keyword_links_array = explode(', ', $keyword_links);
                                    @endphp

                                    @foreach($keyword_links_array as $keyword_link)
                                        @if($keyword_link)
                                            <p data-toggle="tooltip" data-placement="top" title="Click to edit">{{$keyword_link}}</p>
                                        @else
                                            <p data-toggle="tooltip" data-placement="top" title="Click to edit">--</p>
                                        @endif
                                    @endforeach
                                </div>
                            @endif
                        @endif
                    </div>
                    <div id="keyword_info_edit">
                        <button type="button" style="background-color: #ffffff; position: absolute; top: 35px; right: 20px;" class="d-flex justify-content-end ml-auto btn btn-secondary" data-toggle="modal" data-target="#keyword_info_edit_modal"><i class="fa fa-edit" style="font-size: 16px;"></i></button>
                    </div>
                    @include('service-type.modal.blog-article.keyword_info_edit_modal')
                </div>
            </div>
        </div>
    </div>
    @endif

    {{-- Pm Form --}}
    @if ($sales_blog_article !=null && $sales_blog_article->status == 'submitted')
        @if (Auth::user()->role_id == 4 || Auth::user()->role_id == 1)
            <div class="row">
                <div class="col-12">
                    <div class="card mb-5 mt-3" style="border: none">
                        <h4 class="text-center my-3">Fields Needed to be Filled by Project Manager ({{ $pm->name }})</h4>
                        <div class="card-body">
                            <form action="" method="post" id="pm_form">
                                @csrf
                                <input type="hidden" name="sales_blog_article_id" id="sales_blog_article_id" value="{{ $sales_blog_article->id }}">
                                <input type="hidden" name="deal_id" id="deal_id" value="{{ $sales_blog_article->deal_id }}">
                                <input type="hidden" name="milestone_id" id="milestone_id" value="{{ $sales_blog_article->milestone_id }}">
                                @if ($blogArticle !=null && $blogArticle->submitted_by ==4)
                                    <div class="row mb-3">
                                        <div class="col-md-4">
                                            <h6 class="mt-2">Website Link & Niche:</h6>
                                        </div>
                                        <div class="col-md-8">
                                            <div class="row">
                                                <div class="col-md-6">
                                                    <input type="url" name="website_link_2" id="website_link_2" value="{{ $blogArticle->website_link }}" class="form-control placeholderText height-35 f-14" placeholder="https://asdasd.com or https://www.asdasd.com">
                                                </div>
                                                <div class="col-md-6">
                                                    <input type="text" name="website_niche_2" id="website_niche_2" value="{{ $blogArticle->website_niche }}" class="form-control placeholderText height-35 f-14" placeholder="Write Your Niche (Pet Care, Digital Marketing)">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <!-- Website Link & Niche Ends Here -->
                                    <!-- Website Name/Business Name -->
                                    <div class="row mb-3">
                                        <div class="col-md-4">
                                            <h6>Website Name/Business Name:</h6>
                                        </div>
                                        <div class="col-md-8">
                                            <input type="text" name="website_name" id="website_name_2" value="{{ $blogArticle->website_name }}" class="form-control placeholderText height-35 f-14" placeholder="Type Your Business/Website Name">
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-4">
                                            <h6>Business profile/Leaflet/Brochure/Any important information:</h6>
                                        </div>
                                        <div class="col-md-8">
                                            <div class="row">
                                                <div class="col-md-6">
                                                    <div class="form-group">
                                                        <textarea name="business_information" id="business_information_2" cols="3" rows="3" class="form-control placeholderText" placeholder="Put some details about your company here!">{!! $blogArticle->business_information !!}</textarea>
                                                    </div>
                                                </div>
                                                <div class="col-md-6">
                                                    <div class="form-group">
                                                        <label for="">Want to share file?</label>
                                                        <div class="mt-2 d-flex">
                                                            <div class="form-check">
                                                                <input class="form-check-input" type="radio" name="share_file_info" value="1" id="share_file_yesBtn" {{ ($blogArticle->share_file_info=="1")? "checked" : "" }}>
                                                                <label class="form-check-label mt-1 ml-1" for="share_file_yesBtn">
                                                                    Yes
                                                                </label>
                                                            </div>
                                                            <div class="form-check" style="margin-left: 10px;">
                                                                <input class="form-check-input" type="radio" name="share_file_info" value="0" id="share_file_noBtn" {{ ($blogArticle->share_file_info=="0")? "checked" : "" }}>
                                                                <label class="form-check-label mt-1 ml-1" for="share_file_noBtn">
                                                                    No
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            @if ($blogArticle!=null && $blogArticle->share_file_info==1)

                                                @php
                                                    if (is_string($blogArticle->folder_link) && is_array(json_decode($blogArticle->folder_link, true))) {
                                                        $array = json_decode($blogArticle->folder_link, true);
                                                        $folder_links = implode(', ', $array);
                                                    }
                                                    $folder_links_array = explode(', ', $folder_links);
                                                @endphp
                                                @if ($folder_links_array)
                                                    @foreach($folder_links_array as $folder_link)
                                                    <div class="row mt-3" id="folderLinkFormShow" >
                                                        <div class="col-md-10 share-file-link" id="share-file-link-list-1">
                                                            <div class="row mb-3">
                                                                <div class="col-md-12">
                                                                    <input type="text" name="folder_link_2[]" id="folder_link_2" value="{{ $folder_link }}" class="form-control placeholderText height-35 f-14" placeholder="Enter google doc or sheet file or drive folder link here">
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="col-md-2 append-buttons">
                                                            <div class="clearfix">
                                                                <button type="button" id="add-share-file" class="btn btn-primary float-left text-uppercase shadow-sm"><i class="fa fa-plus fa-fw"></i></button>
                                                                <button type="button" id="remove-share-file" class="btn btn-secondary float-left text-uppercase ml-1" disabled="disabled"><i class="fa fa-minus fa-fw"></i></button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    @endforeach
                                                @else
                                                    <div class="row mt-3" id="folderLinkFormShow" style="display: none;">
                                                        <div class="col-md-10 share-file-link" id="share-file-link-list-1">
                                                            <div class="row mb-3">
                                                                <div class="col-md-12">
                                                                    <input type="text" name="folder_link_2[]" id="folder_link_2" class="form-control placeholderText height-35 f-14" placeholder="Enter google doc or sheet file or drive folder link here">
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="col-md-2 append-buttons">
                                                            <div class="clearfix">
                                                                <button type="button" id="add-share-file" class="btn btn-primary float-left text-uppercase shadow-sm"><i class="fa fa-plus fa-fw"></i></button>
                                                                <button type="button" id="remove-share-file" class="btn btn-secondary float-left text-uppercase ml-1" disabled="disabled"><i class="fa fa-minus fa-fw"></i></button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                @endif
                                            @endif
                                        </div>
                                    </div>

                                    <!--Reference Blogs-->

                                    @php
                                        $blog_urls_array = [];

                                        if ($blogArticle->blog_url !== null && is_string($blogArticle->blog_url)) {
                                            $array = json_decode($blogArticle->blog_url, true);

                                            if (is_array($array)) {
                                                $blog_urls = implode(', ', $array);
                                                $blog_urls_array = explode(', ', $blog_urls);
                                            }
                                        }
                                    @endphp
                                    @if ($blog_urls_array)
                                        @foreach($blog_urls_array as $blog_url)
                                        <div class="row mt-3">
                                            <div class="col-md-10 dynamic-reference-blog" id="dynamic-reference-blog-list-1">
                                                <div class="row mb-3">
                                                    <div class="col-md-4">
                                                        <h6>Reference Blogs:</h6>
                                                    </div>
                                                    <div class="col-md-8">
                                                        <div class="form-group" style="margin-left: 90px;">
                                                            <input type="url" id="blog_url_2" class="form-control placeholderText height-35 f-14" value="{{ $blog_url }}" placeholder="Enter reference blog url" name="blog_url_2[]"/>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-md-2 append-buttons">
                                                <div class="clearfix">
                                                    <button type="button" id="add-reference-blog" class="btn btn-primary float-left text-uppercase shadow-sm"><i class="fa fa-plus fa-fw"></i></button>
                                                    <button type="button" id="remove-reference-blog" class="btn btn-secondary float-left text-uppercase ml-1" disabled="disabled"><i class="fa fa-minus fa-fw"></i></button>
                                                </div>
                                            </div>
                                        </div>
                                        @endforeach
                                    @else
                                        <div class="row mt-3">
                                            <div class="col-md-10 dynamic-reference-blog" id="dynamic-reference-blog-list-1">
                                                <div class="row mb-3">
                                                    <div class="col-md-4">
                                                        <h6>Reference Blogs:</h6>
                                                    </div>
                                                    <div class="col-md-8">
                                                        <div class="form-group" style="margin-left: 90px;">
                                                            <input type="url" id="blog_url_2" class="form-control placeholderText height-35 f-14"  placeholder="Enter reference blog url" name="blog_url_2[]"/>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-md-2 append-buttons">
                                                <div class="clearfix">
                                                    <button type="button" id="add-reference-blog" class="btn btn-primary float-left text-uppercase shadow-sm"><i class="fa fa-plus fa-fw"></i></button>
                                                    <button type="button" id="remove-reference-blog" class="btn btn-secondary float-left text-uppercase ml-1" disabled="disabled"><i class="fa fa-minus fa-fw"></i></button>
                                                </div>
                                            </div>
                                        </div>
                                    @endif
                                    <!--Product Description-->
                                    <div class="row mt-3">
                                        <div class="col-md-4">
                                            <h6 class="mt-2">How many blogs/articles do you need written?</h6>
                                        </div>
                                        <div class="col-md-8">
                                            <input type="text" name="product_no" id="product_no_2" value="{{ $blogArticle->product_no }}" class="form-control placeholderText height-35 f-14" placeholder="Input the no. of products here!">
                                        </div>
                                    </div>
                                    <!--Topics-->
                                    <div class="row mt-3">
                                        <div class="col-md-4">
                                            <h6 class="mt-2">Topics:</h6>
                                        </div>
                                        <div class="col-md-8">
                                            <div class="row">
                                                <div class="col-md-12">
                                                    <div class="form-group">
                                                        <div class="d-flex">
                                                            <div class="form-check">
                                                                <input class="form-check-input" type="radio" name="topic_info_2" value="1" id="topic_info_btn1" {{ ($blogArticle->topic_info=="1")? "checked" : "" }}>
                                                                <label class="form-check-label mt-1 ml-1" for="topic_info_btn1">
                                                                    Research and collect topics for me
                                                                </label>
                                                            </div>
                                                            <div class="form-check" style="margin-left: 10px;">
                                                                <input class="form-check-input" type="radio" name="topic_info_2" value="0" id="topic_info_btn2" {{ ($blogArticle->topic_info=="0")? "checked" : "" }}>
                                                                <label class="form-check-label mt-1 ml-1" for="topic_info_btn2">
                                                                    I have the topics
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            @if ($blogArticle !=null && $blogArticle->topic_info==0)
                                                @php
                                                if (is_string($blogArticle->topic_link) && is_array(json_decode($blogArticle->topic_link, true))) {
                                                    $array = json_decode($blogArticle->topic_link, true);
                                                    $topic_links = implode(', ', $array);
                                                }
                                                $topic_links_array = explode(', ', $topic_links);
                                                @endphp

                                                @foreach ($topic_links_array as $topic_link)
                                                <div class="row mt-3" id="topicinfoForm">
                                                    <div class="col-md-10 topic-info-link" id="topic-info-link-list-1">
                                                        <div class="row mb-3">
                                                            <div class="col-md-12">
                                                                <input type="text" name="topic_link_2[]" id="topic_link_2" value="{{ $topic_link }}" class="form-control placeholderText height-35 f-14" placeholder="Share google doc or sheet or drive link where topics are available">
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-2 append-buttons">
                                                        <div class="clearfix">
                                                            <button type="button" id="add-topic-info" class="btn btn-primary float-left text-uppercase shadow-sm"><i class="fa fa-plus fa-fw"></i></button>
                                                            <button type="button" id="remove-topic-info" class="btn btn-secondary float-left text-uppercase ml-1" disabled="disabled"><i class="fa fa-minus fa-fw"></i></button>
                                                        </div>
                                                    </div>
                                                </div>
                                                @endforeach
                                            @else
                                            <div class="row mt-3" id="topicinfoForm" style="display: none;">
                                                <div class="col-md-10 topic-info-link" id="topic-info-link-list-1">
                                                    <div class="row mb-3">
                                                        <div class="col-md-12">
                                                            <input type="text" name="topic_link_2[]" id="topic_link_2" class="form-control placeholderText height-35 f-14" placeholder="Share google doc or sheet or drive link where topics are available">
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-md-2 append-buttons">
                                                    <div class="clearfix">
                                                        <button type="button" id="add-topic-info" class="btn btn-primary float-left text-uppercase shadow-sm"><i class="fa fa-plus fa-fw"></i></button>
                                                        <button type="button" id="remove-topic-info" class="btn btn-secondary float-left text-uppercase ml-1" disabled="disabled"><i class="fa fa-minus fa-fw"></i></button>
                                                    </div>
                                                </div>
                                            </div>
                                            @endif
                                        </div>
                                    </div>

                                    <!--Keywords-->
                                    <div class="row">
                                        <div class="col-md-4">
                                            <h6 class="mt-2">Keywords:</h6>
                                        </div>
                                        <div class="col-md-8">
                                            <div class="row">
                                                <div class="col-md-12">
                                                    <div class="form-group">
                                                        <div class="d-flex">
                                                            <div class="form-check">
                                                                <input class="form-check-input" type="radio" name="keyword_info_2" value="1" id="keyword_info_btn1" {{ ($blogArticle->keyword_info=="1")? "checked" : "" }}>
                                                                <label class="form-check-label mt-1 ml-1" for="keyword_info_btn1">
                                                                    Research and collect keywords for me
                                                                </label>
                                                            </div>
                                                            <div class="form-check" style="margin-left: 10px;">
                                                                <input class="form-check-input" type="radio" name="keyword_info_2" value="0" id="keyword_info_btn2" {{ ($blogArticle->keyword_info=="0")? "checked" : "" }}>
                                                                <label class="form-check-label mt-1 ml-1" for="keyword_info_btn2">
                                                                    I have the keywords
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            @if ($blogArticle !=null && $blogArticle->keyword_info==0)
                                                @php
                                                if (is_string($blogArticle->keyword_link) && is_array(json_decode($blogArticle->keyword_link, true))) {
                                                    $array = json_decode($blogArticle->keyword_link, true);
                                                    $keyword_links = implode(', ', $array);
                                                }
                                                $keyword_links_array = explode(', ', $keyword_links);
                                                @endphp

                                                @foreach ($keyword_links_array as $keyword_link)
                                                <div class="row mt-3" id="keywordinfoForm">
                                                    <div class="col-md-10 keyword-info-link" id="keyword-info-link-list-1">
                                                        <div class="row mb-3">
                                                            <div class="col-md-12">
                                                                <input type="text" name="keyword_link_2[]" id="keyword_link_2" value="{{ $keyword_link }}" class="form-control placeholderText height-35 f-14" placeholder="Share google doc or sheet or drive link where keywords are available">
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-2 append-buttons">
                                                        <div class="clearfix">
                                                            <button type="button" id="add-keyword-info" class="btn btn-primary float-left text-uppercase shadow-sm"><i class="fa fa-plus fa-fw"></i></button>
                                                            <button type="button" id="remove-keyword-info" class="btn btn-secondary float-left text-uppercase ml-1" disabled="disabled"><i class="fa fa-minus fa-fw"></i></button>
                                                        </div>
                                                    </div>
                                                </div>
                                                @endforeach
                                            @else
                                            <div class="row mt-3" id="keywordinfoForm" style="display: none;">
                                                <div class="col-md-10 keyword-info-link" id="keyword-info-link-list-1">
                                                    <div class="row mb-3">
                                                        <div class="col-md-12">
                                                            <input type="text" name="keyword_link_2[]" id="keyword_link_2" class="form-control placeholderText height-35 f-14" placeholder="Share google doc or sheet or drive link where keywords are available">
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-md-2 append-buttons">
                                                    <div class="clearfix">
                                                        <button type="button" id="add-keyword-info" class="btn btn-primary float-left text-uppercase shadow-sm"><i class="fa fa-plus fa-fw"></i></button>
                                                        <button type="button" id="remove-keyword-info" class="btn btn-secondary float-left text-uppercase ml-1" disabled="disabled"><i class="fa fa-minus fa-fw"></i></button>
                                                    </div>
                                                </div>
                                            </div>
                                            @endif
                                        </div>
                                    </div>
                                    <br>
                                    <div class="row">
                                        <div class="col-md-4">
                                            <div class="form-group mt-2">
                                                <h6>How many words do we need to do appropriates?</h6>
                                            </div>
                                        </div>
                                        <div class="col-8">
                                            <div class="form-group">
                                                <input type="text" class="form-control height-35 f-14" id="word_appropriate" name="word_appropriate">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-4">
                                            <div class="form-group mt-2">
                                                <h6>How many words did the client pay for initially?</h6>
                                            </div>
                                        </div>
                                        <div class="col-8">
                                            <div class="form-group">
                                                <input type="text" class="form-control height-35 f-14" id="word_client_initially" name="word_client_initially">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-4">
                                            <div class="form-group mt-2">
                                                <h6>Did he confirm he will pay for any additional words if the need be?</h6>
                                            </div>
                                        </div>
                                        <div class="col-md-8">
                                            <div class="d-flex mt-2">
                                                <div class="form-check">
                                                    <input class="form-check-input" type="radio" name="additional_word" value="1" id="yes_btn1">
                                                    <label class="form-check-label mt-1 ml-2" for="yes_btn1">
                                                    Yes
                                                    </label>
                                                </div>
                                                <div class="form-check ml-3">
                                                    <input class="form-check-input" type="radio" name="additional_word" value="0" id="no_btn1">
                                                    <label class="form-check-label mt-1 ml-2" for="no_btn1">
                                                    No
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-4">
                                            <div class="form-group">
                                                <h6>Do we have any layout we need to follow for the content?</h6>
                                            </div>
                                        </div>
                                        <div class="col-md-8">
                                            <div class="d-flex mt-2">
                                                <div class="form-check">
                                                    <input class="form-check-input" type="radio" name="layout_content" value="1" id="yes_btn2">
                                                    <label class="form-check-label mt-1 ml-2" for="yes_btn2">
                                                    Yes
                                                    </label>
                                                </div>
                                                <div class="form-check ml-3">
                                                    <input class="form-check-input" type="radio" name="layout_content" value="0" id="no_btn2">
                                                    <label class="form-check-label mt-1 ml-2" for="no_btn2">
                                                    No
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row mt-3" style="display: none" id="website-link-form">
                                        <div class="col-md-10 dynamic-website-link" id="dynamic-website-link-list-1">
                                            <div class="row mb-3">
                                                <div class="col-md-4"></div>
                                                <div class="col-md-8">
                                                    <div class="form-group" style="margin-left: 10%;">
                                                        <label class="form-check-label mb-1">Website link or Theme link:</label>
                                                        <input type="url" id="website_link" class="form-control placeholderText height-35 f-14" placeholder="Enter website link or theme link" name="website_link[]"/>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-2 append-buttons">
                                            <div class="clearfix mt-4">
                                                <button type="button" id="add-website-link-button" class="btn btn-primary float-left text-uppercase shadow-sm"><i class="fa fa-plus fa-fw"></i></button>
                                                <button type="button" id="remove-website-link-button" class="btn btn-secondary float-left text-uppercase ml-1" disabled="disabled"><i class="fa fa-minus fa-fw"></i></button>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row mt-3">
                                        <div class="col-md-4">
                                            <h6 style="margin-top: 40px;">Pages List :</h6>
                                        </div>
                                        <div class="col-md-8">
                                            <div class="row">
                                                <div class="col-md-10 dynamic-pages" id="dynamic-pages-list-1">
                                                    <div class="row mb-3">
                                                        <div class="col-md-4">
                                                            <div class="form-group">
                                                                <label for="">Page name</label>
                                                                <input type="text" name="page_name_2[]" id="page_name_2" class="form-control placeholderText height-35 f-14" placeholder="Type page name">
                                                            </div>
                                                        </div>
                                                        <div class="col-md-4">
                                                            <label for="">Quantity</label>
                                                            <input type="number" name="quantity_2[]" id="quantity_2" class="form-control placeholderText height-35 f-14" placeholder="Type page quantity">
                                                        </div>
                                                        <div class="col-md-4">
                                                            <label for="">Approximate word</label>
                                                            <input type="text" name="approximate_word_2[]" id="approximate_word_2" class="form-control placeholderText height-35 f-14" placeholder="Approximate word count per page">
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-md-2 append-buttons" style="margin-top: 30px;">
                                                    <div class="clearfix">
                                                        <button type="button" id="add-pages" class="btn btn-primary float-left text-uppercase shadow-sm"><i class="fa fa-plus fa-fw"></i></button>
                                                        <button type="button" id="remove-pages" class="btn btn-secondary float-left text-uppercase ml-1" disabled="disabled"><i class="fa fa-minus fa-fw"></i></button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                @else
                                    <div class="row mb-3">
                                        <div class="col-md-4">
                                            <h6 class="mt-2">Website Link & Niche:</h6>
                                        </div>
                                        <div class="col-md-8">
                                            <div class="row">
                                                <div class="col-md-6">
                                                    <input type="url" name="website_link_2" id="website_link_2" value="{{ $sales_blog_article->website_link }}" class="form-control placeholderText height-35 f-14" placeholder="https://asdasd.com or https://www.asdasd.com">
                                                </div>
                                                <div class="col-md-6">
                                                    <input type="text" name="website_niche_2" id="website_niche_2" value="{{ $sales_blog_article->website_niche }}" class="form-control placeholderText height-35 f-14" placeholder="Write Your Niche (Pet Care, Digital Marketing)">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <!-- Website Link & Niche Ends Here -->
                                    <!-- Website Name/Business Name -->
                                    <div class="row mb-3">
                                        <div class="col-md-4">
                                            <h6>Website Name/Business Name:</h6>
                                        </div>
                                        <div class="col-md-8">
                                            <input type="text" name="website_name" id="website_name_2" value="{{ $sales_blog_article->website_name }}" class="form-control placeholderText height-35 f-14" placeholder="Type Your Business/Website Name">
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-4">
                                            <h6>Business profile/Leaflet/Brochure/Any important information:</h6>
                                        </div>
                                        <div class="col-md-8">
                                            <div class="row">
                                                <div class="col-md-6">
                                                    <div class="form-group">
                                                        <textarea name="business_information" id="business_information_2" cols="3" rows="3" class="form-control placeholderText" placeholder="Put some details about your company here!">{!! $sales_blog_article->business_information !!}</textarea>
                                                    </div>
                                                </div>
                                                <div class="col-md-6">
                                                    <div class="form-group">
                                                        <label for="">Want to share file?</label>
                                                        <div class="mt-2 d-flex">
                                                            <div class="form-check">
                                                                <input class="form-check-input" type="radio" name="share_file_info" value="1" id="share_file_yesBtn" {{ ($sales_blog_article->share_file_info=="1")? "checked" : "" }}>
                                                                <label class="form-check-label mt-1 ml-1" for="share_file_yesBtn">
                                                                    Yes
                                                                </label>
                                                            </div>
                                                            <div class="form-check" style="margin-left: 10px;">
                                                                <input class="form-check-input" type="radio" name="share_file_info" value="0" id="share_file_noBtn" {{ ($sales_blog_article->share_file_info=="0")? "checked" : "" }}>
                                                                <label class="form-check-label mt-1 ml-1" for="share_file_noBtn">
                                                                    No
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            @if ($sales_blog_article!=null && $sales_blog_article->share_file_info==1)

                                                @php
                                                    if (is_string($sales_blog_article->folder_link) && is_array(json_decode($sales_blog_article->folder_link, true))) {
                                                        $array = json_decode($sales_blog_article->folder_link, true);
                                                        $folder_links = implode(', ', $array);
                                                    }
                                                    $folder_links_array = explode(', ', $folder_links);
                                                @endphp
                                                @if ($folder_links_array)
                                                    @foreach($folder_links_array as $folder_link)
                                                    <div class="row mt-3" id="folderLinkFormShow" >
                                                        <div class="col-md-10 share-file-link" id="share-file-link-list-1">
                                                            <div class="row mb-3">
                                                                <div class="col-md-12">
                                                                    <input type="text" name="folder_link_2[]" id="folder_link_2" value="{{ $folder_link }}" class="form-control placeholderText height-35 f-14" placeholder="Enter google doc or sheet file or drive folder link here">
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="col-md-2 append-buttons">
                                                            <div class="clearfix">
                                                                <button type="button" id="add-share-file" class="btn btn-primary float-left text-uppercase shadow-sm"><i class="fa fa-plus fa-fw"></i></button>
                                                                <button type="button" id="remove-share-file" class="btn btn-secondary float-left text-uppercase ml-1" disabled="disabled"><i class="fa fa-minus fa-fw"></i></button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    @endforeach
                                                @else
                                                    <div class="row mt-3" id="folderLinkFormShow" style="display: none;">
                                                        <div class="col-md-10 share-file-link" id="share-file-link-list-1">
                                                            <div class="row mb-3">
                                                                <div class="col-md-12">
                                                                    <input type="text" name="folder_link_2[]" id="folder_link_2" class="form-control placeholderText height-35 f-14" placeholder="Enter google doc or sheet file or drive folder link here">
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="col-md-2 append-buttons">
                                                            <div class="clearfix">
                                                                <button type="button" id="add-share-file" class="btn btn-primary float-left text-uppercase shadow-sm"><i class="fa fa-plus fa-fw"></i></button>
                                                                <button type="button" id="remove-share-file" class="btn btn-secondary float-left text-uppercase ml-1" disabled="disabled"><i class="fa fa-minus fa-fw"></i></button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                @endif
                                            @endif
                                        </div>
                                    </div>

                                    <!--Reference Blogs-->

                                    @php
                                        $blog_urls_array = [];

                                        if ($sales_blog_article->blog_url !== null && is_string($sales_blog_article->blog_url)) {
                                            $array = json_decode($sales_blog_article->blog_url, true);

                                            if (is_array($array)) {
                                                $blog_urls = implode(', ', $array);
                                                $blog_urls_array = explode(', ', $blog_urls);
                                            }
                                        }
                                    @endphp
                                    @if ($blog_urls_array)
                                        @foreach($blog_urls_array as $blog_url)
                                        <div class="row mt-3">
                                            <div class="col-md-10 dynamic-reference-blog" id="dynamic-reference-blog-list-1">
                                                <div class="row mb-3">
                                                    <div class="col-md-4">
                                                        <h6>Reference Blogs:</h6>
                                                    </div>
                                                    <div class="col-md-8">
                                                        <div class="form-group" style="margin-left: 90px;">
                                                            <input type="url" id="blog_url_2" class="form-control placeholderText height-35 f-14" value="{{ $blog_url }}" placeholder="Enter reference blog url" name="blog_url_2[]"/>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-md-2 append-buttons">
                                                <div class="clearfix">
                                                    <button type="button" id="add-reference-blog" class="btn btn-primary float-left text-uppercase shadow-sm"><i class="fa fa-plus fa-fw"></i></button>
                                                    <button type="button" id="remove-reference-blog" class="btn btn-secondary float-left text-uppercase ml-1" disabled="disabled"><i class="fa fa-minus fa-fw"></i></button>
                                                </div>
                                            </div>
                                        </div>
                                        @endforeach
                                    @else
                                        <div class="row mt-3">
                                            <div class="col-md-10 dynamic-reference-blog" id="dynamic-reference-blog-list-1">
                                                <div class="row mb-3">
                                                    <div class="col-md-4">
                                                        <h6>Reference Blogs:</h6>
                                                    </div>
                                                    <div class="col-md-8">
                                                        <div class="form-group" style="margin-left: 90px;">
                                                            <input type="url" id="blog_url_2" class="form-control placeholderText height-35 f-14"  placeholder="Enter reference blog url" name="blog_url_2[]"/>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-md-2 append-buttons">
                                                <div class="clearfix">
                                                    <button type="button" id="add-reference-blog" class="btn btn-primary float-left text-uppercase shadow-sm"><i class="fa fa-plus fa-fw"></i></button>
                                                    <button type="button" id="remove-reference-blog" class="btn btn-secondary float-left text-uppercase ml-1" disabled="disabled"><i class="fa fa-minus fa-fw"></i></button>
                                                </div>
                                            </div>
                                        </div>
                                    @endif
                                    <!--Product Description-->
                                    <div class="row mt-3">
                                        <div class="col-md-4">
                                            <h6 class="mt-2">How many blogs/articles do you need written?</h6>
                                        </div>
                                        <div class="col-md-8">
                                            <input type="text" name="product_no" id="product_no_2" value="{{ $sales_blog_article->product_no }}" class="form-control placeholderText height-35 f-14" placeholder="Input the no. of products here!">
                                        </div>
                                    </div>
                                    <!--Topics-->
                                    <div class="row mt-3">
                                        <div class="col-md-4">
                                            <h6 class="mt-2">Topics:</h6>
                                        </div>
                                        <div class="col-md-8">
                                            <div class="row">
                                                <div class="col-md-12">
                                                    <div class="form-group">
                                                        <div class="d-flex">
                                                            <div class="form-check">
                                                                <input class="form-check-input" type="radio" name="topic_info_2" value="1" id="topic_info_btn1" {{ ($sales_blog_article->topic_info=="1")? "checked" : "" }}>
                                                                <label class="form-check-label mt-1 ml-1" for="topic_info_btn1">
                                                                    Research and collect topics for me
                                                                </label>
                                                            </div>
                                                            <div class="form-check" style="margin-left: 10px;">
                                                                <input class="form-check-input" type="radio" name="topic_info_2" value="0" id="topic_info_btn2" {{ ($sales_blog_article->topic_info=="0")? "checked" : "" }}>
                                                                <label class="form-check-label mt-1 ml-1" for="topic_info_btn2">
                                                                    I have the topics
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            @if ($sales_blog_article !=null && $sales_blog_article->topic_info==0)
                                                @php
                                                if (is_string($sales_blog_article->topic_link) && is_array(json_decode($sales_blog_article->topic_link, true))) {
                                                    $array = json_decode($sales_blog_article->topic_link, true);
                                                    $topic_links = implode(', ', $array);
                                                }
                                                $topic_links_array = explode(', ', $topic_links);
                                                @endphp

                                                @foreach ($topic_links_array as $topic_link)
                                                <div class="row mt-3" id="topicinfoForm">
                                                    <div class="col-md-10 topic-info-link" id="topic-info-link-list-1">
                                                        <div class="row mb-3">
                                                            <div class="col-md-12">
                                                                <input type="text" name="topic_link_2[]" id="topic_link_2" value="{{ $topic_link }}" class="form-control placeholderText height-35 f-14" placeholder="Share google doc or sheet or drive link where topics are available">
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-2 append-buttons">
                                                        <div class="clearfix">
                                                            <button type="button" id="add-topic-info" class="btn btn-primary float-left text-uppercase shadow-sm"><i class="fa fa-plus fa-fw"></i></button>
                                                            <button type="button" id="remove-topic-info" class="btn btn-secondary float-left text-uppercase ml-1" disabled="disabled"><i class="fa fa-minus fa-fw"></i></button>
                                                        </div>
                                                    </div>
                                                </div>
                                                @endforeach
                                            @else
                                            <div class="row mt-3" id="topicinfoForm" style="display: none;">
                                                <div class="col-md-10 topic-info-link" id="topic-info-link-list-1">
                                                    <div class="row mb-3">
                                                        <div class="col-md-12">
                                                            <input type="text" name="topic_link_2[]" id="topic_link_2" class="form-control placeholderText height-35 f-14" placeholder="Share google doc or sheet or drive link where topics are available">
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-md-2 append-buttons">
                                                    <div class="clearfix">
                                                        <button type="button" id="add-topic-info" class="btn btn-primary float-left text-uppercase shadow-sm"><i class="fa fa-plus fa-fw"></i></button>
                                                        <button type="button" id="remove-topic-info" class="btn btn-secondary float-left text-uppercase ml-1" disabled="disabled"><i class="fa fa-minus fa-fw"></i></button>
                                                    </div>
                                                </div>
                                            </div>
                                            @endif
                                        </div>
                                    </div>

                                    <!--Keywords-->
                                    <div class="row">
                                        <div class="col-md-4">
                                            <h6 class="mt-2">Keywords:</h6>
                                        </div>
                                        <div class="col-md-8">
                                            <div class="row">
                                                <div class="col-md-12">
                                                    <div class="form-group">
                                                        <div class="d-flex">
                                                            <div class="form-check">
                                                                <input class="form-check-input" type="radio" name="keyword_info_2" value="1" id="keyword_info_btn1" {{ ($sales_blog_article->keyword_info=="1")? "checked" : "" }}>
                                                                <label class="form-check-label mt-1 ml-1" for="keyword_info_btn1">
                                                                    Research and collect keywords for me
                                                                </label>
                                                            </div>
                                                            <div class="form-check" style="margin-left: 10px;">
                                                                <input class="form-check-input" type="radio" name="keyword_info_2" value="0" id="keyword_info_btn2" {{ ($sales_blog_article->keyword_info=="0")? "checked" : "" }}>
                                                                <label class="form-check-label mt-1 ml-1" for="keyword_info_btn2">
                                                                    I have the keywords
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            @if ($sales_blog_article !=null && $sales_blog_article->keyword_info==0)
                                                @php
                                                if (is_string($sales_blog_article->keyword_link) && is_array(json_decode($sales_blog_article->keyword_link, true))) {
                                                    $array = json_decode($sales_blog_article->keyword_link, true);
                                                    $keyword_links = implode(', ', $array);
                                                }
                                                $keyword_links_array = explode(', ', $keyword_links);
                                                @endphp

                                                @foreach ($keyword_links_array as $keyword_link)
                                                <div class="row mt-3" id="keywordinfoForm">
                                                    <div class="col-md-10 keyword-info-link" id="keyword-info-link-list-1">
                                                        <div class="row mb-3">
                                                            <div class="col-md-12">
                                                                <input type="text" name="keyword_link_2[]" id="keyword_link_2" value="{{ $keyword_link }}" class="form-control placeholderText height-35 f-14" placeholder="Share google doc or sheet or drive link where keywords are available">
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-2 append-buttons">
                                                        <div class="clearfix">
                                                            <button type="button" id="add-keyword-info" class="btn btn-primary float-left text-uppercase shadow-sm"><i class="fa fa-plus fa-fw"></i></button>
                                                            <button type="button" id="remove-keyword-info" class="btn btn-secondary float-left text-uppercase ml-1" disabled="disabled"><i class="fa fa-minus fa-fw"></i></button>
                                                        </div>
                                                    </div>
                                                </div>
                                                @endforeach
                                            @else
                                            <div class="row mt-3" id="keywordinfoForm" style="display: none;">
                                                <div class="col-md-10 keyword-info-link" id="keyword-info-link-list-1">
                                                    <div class="row mb-3">
                                                        <div class="col-md-12">
                                                            <input type="text" name="keyword_link_2[]" id="keyword_link_2" class="form-control placeholderText height-35 f-14" placeholder="Share google doc or sheet or drive link where keywords are available">
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-md-2 append-buttons">
                                                    <div class="clearfix">
                                                        <button type="button" id="add-keyword-info" class="btn btn-primary float-left text-uppercase shadow-sm"><i class="fa fa-plus fa-fw"></i></button>
                                                        <button type="button" id="remove-keyword-info" class="btn btn-secondary float-left text-uppercase ml-1" disabled="disabled"><i class="fa fa-minus fa-fw"></i></button>
                                                    </div>
                                                </div>
                                            </div>
                                            @endif
                                        </div>
                                    </div>
                                    <br>
                                    <div class="row">
                                        <div class="col-md-4">
                                            <div class="form-group mt-2">
                                                <h6>How many words do we need to do appropriates?</h6>
                                            </div>
                                        </div>
                                        <div class="col-8">
                                            <div class="form-group">
                                                <input type="text" class="form-control height-35 f-14" id="word_appropriate" name="word_appropriate">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-4">
                                            <div class="form-group mt-2">
                                                <h6>How many words did the client pay for initially?</h6>
                                            </div>
                                        </div>
                                        <div class="col-8">
                                            <div class="form-group">
                                                <input type="text" class="form-control height-35 f-14" id="word_client_initially" name="word_client_initially">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-4">
                                            <div class="form-group mt-2">
                                                <h6>Did he confirm he will pay for any additional words if the need be?</h6>
                                            </div>
                                        </div>
                                        <div class="col-md-8">
                                            <div class="d-flex mt-2">
                                                <div class="form-check">
                                                    <input class="form-check-input" type="radio" name="additional_word" value="1" id="yes_btn1">
                                                    <label class="form-check-label mt-1 ml-2" for="yes_btn1">
                                                    Yes
                                                    </label>
                                                </div>
                                                <div class="form-check ml-3">
                                                    <input class="form-check-input" type="radio" name="additional_word" value="0" id="no_btn1">
                                                    <label class="form-check-label mt-1 ml-2" for="no_btn1">
                                                    No
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-4">
                                            <div class="form-group">
                                                <h6>Do we have any layout we need to follow for the content?</h6>
                                            </div>
                                        </div>
                                        <div class="col-md-8">
                                            <div class="d-flex mt-2">
                                                <div class="form-check">
                                                    <input class="form-check-input" type="radio" name="layout_content" value="1" id="yes_btn2">
                                                    <label class="form-check-label mt-1 ml-2" for="yes_btn2">
                                                    Yes
                                                    </label>
                                                </div>
                                                <div class="form-check ml-3">
                                                    <input class="form-check-input" type="radio" name="layout_content" value="0" id="no_btn2">
                                                    <label class="form-check-label mt-1 ml-2" for="no_btn2">
                                                    No
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row mt-3" style="display: none" id="website-link-form">
                                        <div class="col-md-10 dynamic-website-link" id="dynamic-website-link-list-1">
                                            <div class="row mb-3">
                                                <div class="col-md-4"></div>
                                                <div class="col-md-8">
                                                    <div class="form-group" style="margin-left: 10%;">
                                                        <label class="form-check-label mb-1">Website link or Theme link:</label>
                                                        <input type="url" id="website_link" class="form-control placeholderText height-35 f-14" placeholder="Enter website link or theme link" name="website_link[]"/>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-2 append-buttons">
                                            <div class="clearfix mt-4">
                                                <button type="button" id="add-website-link-button" class="btn btn-primary float-left text-uppercase shadow-sm"><i class="fa fa-plus fa-fw"></i></button>
                                                <button type="button" id="remove-website-link-button" class="btn btn-secondary float-left text-uppercase ml-1" disabled="disabled"><i class="fa fa-minus fa-fw"></i></button>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row mt-3">
                                        <div class="col-md-4">
                                            <h6 style="margin-top: 40px;">Pages List :</h6>
                                        </div>
                                        <div class="col-md-8">
                                            <div class="row">
                                                <div class="col-md-10 dynamic-pages" id="dynamic-pages-list-1">
                                                    <div class="row mb-3">
                                                        <div class="col-md-4">
                                                            <div class="form-group">
                                                                <label for="">Page name</label>
                                                                <input type="text" name="page_name_2[]" id="page_name_2" class="form-control placeholderText height-35 f-14" placeholder="Type page name">
                                                            </div>
                                                        </div>
                                                        <div class="col-md-4">
                                                            <label for="">Quantity</label>
                                                            <input type="number" name="quantity_2[]" id="quantity_2" class="form-control placeholderText height-35 f-14" placeholder="Type page quantity">
                                                        </div>
                                                        <div class="col-md-4">
                                                            <label for="">Approximate word</label>
                                                            <input type="text" name="approximate_word_2[]" id="approximate_word_2" class="form-control placeholderText height-35 f-14" placeholder="Approximate word count per page">
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-md-2 append-buttons" style="margin-top: 30px;">
                                                    <div class="clearfix">
                                                        <button type="button" id="add-pages" class="btn btn-primary float-left text-uppercase shadow-sm"><i class="fa fa-plus fa-fw"></i></button>
                                                        <button type="button" id="remove-pages" class="btn btn-secondary float-left text-uppercase ml-1" disabled="disabled"><i class="fa fa-minus fa-fw"></i></button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                @endif
                                <div class="d-flex justify-content-center">
                                    <button type="submit" class="btn btn-primary mt-5 " id="pm_submit">Submit</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        @endif
    @endif
</div>
@endsection
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<script>
    $(document).ready(function() {
        $('#share_file_yesBtn').click(function() {
            $('#folderLinkFormShow').show();
        });

        $('#share_file_noBtn').click(function() {
            $('#folderLinkFormShow').hide();
        });
    });
    $(document).ready(function() {
        $('#yes_btn2').click(function() {
            $('#website-link-form').show();
        });

        $('#no_btn2').click(function() {
            $('#website-link-form').hide();
        });
    });
    $(document).ready(function() {
        $('#topic_info_btn2').click(function() {
            $('#topicinfoForm').show();
        });

        $('#topic_info_btn1').click(function() {
            $('#topicinfoForm').hide();
        });
    });
    $(document).ready(function() {
        $('#keyword_info_btn2').click(function() {
            $('#keywordinfoForm').show();
        });

        $('#keyword_info_btn1').click(function() {
            $('#keywordinfoForm').hide();
        });
    });


    function toggleWebsiteLinkButton() {
        var button = document.getElementById('website_link_btn');
        var input_website_link = document.getElementById('input_website_link');

        button.style.display = 'none';
        input_website_link.style.display = 'flex';
    }
    function toggleWebsiteNicheButton() {
        var button = document.getElementById('website_niche_btn');
        var input_website_niche = document.getElementById('input_website_niche');

        button.style.display = 'none';
        input_website_niche.style.display = 'flex';
    }
    function toggleWebsiteNameButton() {
        var button = document.getElementById('website_name_btn');
        var input_website_name = document.getElementById('input_website_name');

        button.style.display = 'none';
        input_website_name.style.display = 'flex';
    }
    function toggleProductNoButton() {
        var button = document.getElementById('product_no_btn');
        var input_product_no = document.getElementById('input_product_no');

        button.style.display = 'none';
        input_product_no.style.display = 'flex';
    }


    // AJAX call
    $(document).ready(function() {
            $('.saveWebsiteLinkBtn, .saveWebsiteNicheBtn, .saveWebsiteNameBtn, .saveProductNoBtn').click(function(event) {
                event.preventDefault();
                var id = $(this).data('id');
                var data= {
                    '_token': "{{ csrf_token() }}",
                    'website_link': document.getElementById("website_link").value,
                    'website_niche': document.getElementById("website_niche").value,
                    'website_name': document.getElementById("website_name").value,
                    'product_no': document.getElementById("product_no").value,
                    'deal_id': {{$blog_article->deal_id}},
                    'blog_article_id': {{$blog_article->id}},
                    'milestone_id': {{$blog_article->milestone_id}},
                }
                $.ajaxSetup({
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                }
            });
            $.ajax({
                url: '/projects/update-sales-blog-article/'+id,
                method: 'put',
                data: data,
                dataType: "json",
                success: function (response) {
                    if(response.website_link){
                        $('#website_link_form').hide();
                        $('#website_link_container').html();
                        $('#website_link_container').html('<button id="website_link_btn" type="submit" style="background-color: #ffffff">' + response.website_link + '</button>');
                    }
                    if(response.website_niche){
                        $('#website_niche_form').hide();
                        $('#website_niche_container').html();
                        $('#website_niche_container').html('<button id="website_niche_btn" type="submit" style="background-color: #ffffff">' + response.website_niche + '</button>');
                    }
                    if(response.website_name){
                        $('#website_name_form').hide();
                        $('#website_name_container').html();
                        $('#website_name_container').html('<button id="website_name_btn" type="submit" style="background-color: #ffffff">' + response.website_name + '</button>');
                    }
                    if(response.product_no){
                        $('#product_no_form').hide();
                        $('#product_no_container').html();
                        $('#product_no_container').html('<button id="product_no_btn" type="submit" style="background-color: #ffffff">' + response.product_no + '</button>');
                    }
                    toastr.success('Change Successfully');
                },
                error: function(error) {
                    // console.log(response);
                    if(error.responseJSON.errors.website_link){
                    $('#website_link_error').text(error.responseJSON.errors.website_link);
                    }else{
                        $('#website_link_error').text('');
                    }
                    if(error.responseJSON.errors.website_niche){
                    $('#website_niche_error').text(error.responseJSON.errors.website_niche);
                    }else{
                        $('#website_niche_error').text('');
                    }
                    if(error.responseJSON.errors.website_name){
                    $('#website_name_error').text(error.responseJSON.errors.website_name);
                    }else{
                        $('#website_name_error').text('');
                    }
                    if(error.responseJSON.errors.product_no){
                    $('#product_no_error').text(error.responseJSON.errors.product_no);
                    }else{
                        $('#product_no_error').text('');
                    }
                }
            });
            });
        });
</script>
<script>
        $(document).ready(function() {
            $('#pm_submit').click(function(event) {
                event.preventDefault();
                $('#pm_submit').attr("disabled", true);
                $('#pm_submit').html("Processing...");
                var additional_word = $('input[name="additional_word"]:checked').val();
                var layout_content = $('input[name="layout_content"]:checked').val();
                var share_file_info = $('input[name="share_file_info"]:checked').val();
                var topic_info = $('input[name="topic_info_2"]:checked').val();
                var keyword_info = $('input[name="keyword_info_2"]:checked').val();
                var folder_link = document.getElementsByName("folder_link_2[]");
                var folder_link_values = [];
                for (var i = 0; i < folder_link.length; i++) {
                    folder_link_values.push(folder_link[i].value);
                }
                var blog_url = document.getElementsByName("blog_url_2[]");
                var blog_url_values = [];
                for (var i = 0; i < blog_url.length; i++) {
                    blog_url_values.push(blog_url[i].value);
                }
                var topic_link = document.getElementsByName("topic_link_2[]");
                var topic_link_values = [];
                for (var i = 0; i < topic_link.length; i++) {
                    topic_link_values.push(topic_link[i].value);
                }
                var keyword_link = document.getElementsByName("keyword_link_2[]");
                var keyword_link_values = [];
                for (var i = 0; i < keyword_link.length; i++) {
                    keyword_link_values.push(keyword_link[i].value);
                }
                var website_link = document.getElementsByName("website_link[]");
                var website_link_values = [];
                for (var i = 0; i < website_link.length; i++) {
                    website_link_values.push(website_link[i].value);
                }
                var page_name = document.getElementsByName("page_name_2[]");
                var page_name_values = [];
                for (var i = 0; i < page_name.length; i++) {
                    page_name_values.push(page_name[i].value);
                }
                var quantity = document.getElementsByName("quantity_2[]");
                var quantity_values = [];
                for (var i = 0; i < quantity.length; i++) {
                    quantity_values.push(quantity[i].value);
                }
                var approximate_word = document.getElementsByName("approximate_word_2[]");
                var approximate_word_values = [];
                for (var i = 0; i < approximate_word.length; i++) {
                    approximate_word_values.push(approximate_word[i].value);
                }

                var data= {
                    '_token': "{{ csrf_token() }}",
                    'word_appropriate': document.getElementById("word_appropriate").value,
                    'word_client_initially': document.getElementById("word_client_initially").value,
                    'website_link_2': document.getElementById("website_link_2").value,
                    'website_niche_2': document.getElementById("website_niche_2").value,
                    'website_name': document.getElementById("website_name_2").value,
                    'business_information': document.getElementById("business_information_2").value,
                    'product_no': document.getElementById("product_no_2").value,
                    'sales_blog_article_id': document.getElementById("sales_blog_article_id").value,
                    'deal_id': document.getElementById("deal_id").value,
                    'milestone_id': document.getElementById("milestone_id").value,
                    'additional_word': additional_word,
                    'layout_content': layout_content,
                    'share_file_info': share_file_info,
                    'folder_link': folder_link_values,
                    'blog_url': blog_url_values,
                    'topic_info': topic_info,
                    'topic_link': topic_link_values,
                    'keyword_info': keyword_info,
                    'keyword_link': keyword_link_values,
                    'website_link': website_link_values,
                    'page_name': page_name_values,
                    'quantity': quantity_values,
                    'approximate_word': approximate_word_values,
                    @if ($blogArticle !=null && $blogArticle->submitted_by ==4)
                    'submitted_by': {{ $blogArticle->submitted_by }},
                    @endif
                }
                $.ajaxSetup({
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                }
            });
            $.ajax({
                url: "{{route('pm_blog_article_update')}}",
                method: 'post',
                data: data,
                dataType: "json",
                success: function (response) {
                    toastr.success('Updated Successfully');
                    $(location).prop('href', '{{route('viewBlogArticle',$blog_article->deal_id)}}');
                    $('#pm_submit').attr("disabled", false);
                    $('#pm_submit').html("Submit");
                },
                error: function(error) {
                    // console.log(response);
                    $('#pm_submit').attr("disabled", false);
                    $('#pm_submit').html("Submit");
                }
            });
            });
        });
</script>
<script>
    $(document).ready(function () {
        var buttonAdd = $("#add-website-link-button");
        var buttonRemove = $("#remove-website-link-button");
        var className = ".dynamic-website-link";
        var count = 0;
        var field = "";
        var maxFields = 50;

        function totalFields() {
            return $(className).length;
        }

        function addNewField() {
            var total = $('input[name="website_link[]"]').length;
            count = totalFields() + 1;
            field = $("#dynamic-website-link-list-1").clone();
            field.attr("id", "dynamic-website-link-" + count);
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

    $(document).ready(function() {
    var buttonAdd = $("#add-pages");
    var buttonRemove = $("#remove-pages");
    var className = ".dynamic-pages";
    var count = 0;
    var field = "";
    var maxFields = 50;

    function totalFields() {
      return $(className).length;
    }

    function addNewField() {
      var total = $('input[name="link[]"]').length;
      count = totalFields() + 1;
      field = $("#dynamic-pages-list-1").clone();
      field.attr("id", "dynamic-pages-" + count);
      field.children("label").attr("for", "linkError_" + 'total').text("Field " + count);
      field.find("input").attr("id", "linkError_" + 'total').val("");
      field.append('<span id="linkError_' + total + '" class="text-danger" for="link"></span>');
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

    buttonAdd.click(function() {
      addNewField();
      enableButtonRemove();
      disableButtonAdd();
    });

    buttonRemove.click(function() {
      removeLastField();
      disableButtonRemove();
      enableButtonAdd();
    });
  });

  $(document).ready(function () {
        var buttonAdd = $("#add-share-file");
        var buttonRemove = $("#remove-share-file");
        var className = ".share-file-link";
        var count = 0;
        var field = "";
        var maxFields = 50;

        function totalFields() {
            return $(className).length;
        }

        function addNewField() {
            var total = $('input[name="folder_link_2[]"]').length;
            count = totalFields() + 1;
            field = $("#share-file-link-list-1").clone();
            field.attr("id", "share-file-link-" + count);
            field.find('input[name="folder_link_2[]"]').val("");
            field.find('input[name="folder_link_2[]"]').attr("id", "folder_link_" + count);
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
        var buttonAdd = $("#add-reference-blog");
        var buttonRemove = $("#remove-reference-blog");
        var className = ".dynamic-reference-blog";
        var count = 0;
        var field = "";
        var maxFields = 50;

        function totalFields() {
            return $(className).length;
        }

        function addNewField() {
            var total = $('input[name="blog_url_2[]"]').length;
            count = totalFields() + 1;
            field = $("#dynamic-reference-blog-list-1").clone();
            field.attr("id", "dynamic-reference-blog-" + count);
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

    $(document).ready(function () {
        var buttonAdd = $("#add-topic-info");
        var buttonRemove = $("#remove-topic-info");
        var className = ".topic-info-link";
        var count = 0;
        var field = "";
        var maxFields = 50;

        function totalFields() {
            return $(className).length;
        }

        function addNewField() {
            var total = $('input[name="topic-link[]"]').length;
            count = totalFields() + 1;
            field = $("#topic-info-link-list-1").clone();
            field.attr("id", "topic-info-link-" + count);
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

    $(document).ready(function () {
        var buttonAdd = $("#add-keyword-info");
        var buttonRemove = $("#remove-keyword-info");
        var className = ".keyword-info-link";
        var count = 0;
        var field = "";
        var maxFields = 50;

        function totalFields() {
            return $(className).length;
        }

        function addNewField() {
            var total = $('input[name="keyword-link[]"]').length;
            count = totalFields() + 1;
            field = $("#keyword-info-link-list-1").clone();
            field.attr("id", "keyword-info-link-" + count);
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



</script>
