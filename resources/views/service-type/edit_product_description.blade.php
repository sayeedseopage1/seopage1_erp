@extends('layouts.app')
@section('content')
@php
$sales_product_description = \App\Models\SalesProductDescription::where('product_description_id',$product_description->id)->first();
$deal = \App\Models\Deal::where('id',$product_description->deal_id)->first();
$project = \App\Models\Project::where('deal_id',$product_description->deal_id)->first();
$pm = \App\Models\User::where('id',$project->pm_id)->first();
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
                            <p>{{$product_description->deal_id}}</p>
                        </div>
                        <div class="col-4">
                            <p>Client Link</p>
                        </div>
                        <div class="col-8">
                            <p>{{$product_description->client_link}}</p>
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
                            <p>{{$product_description->service_type}}</p>
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
                                @if($sales_product_description != null)
                                    <p>{{$sales_product_description->website_link}}</p>
                                @else
                                    @if($product_description->website_link ?? null)
                                        <button id="website_link_btn" type="button" style="background-color: #ffffff" onclick="toggleWebsiteLinkButton()" data-toggle="tooltip" data-placement="top" title="Click to edit">{{$product_description->website_link}}</button>
                                    @else
                                        <button type="button" id="website_link_btn" style="background-color: #ffffff" onclick="toggleWebsiteLinkButton()" data-toggle="tooltip" data-placement="top" title="Click to edit">--</button>
                                    @endif
                                @endif
                            </div>

                            <div id="website_link_form">
                                @if($product_description->website_link)
                                <form action="" method="post">
                                    @csrf
                                    <div class="input-group" id="input_website_link" style="display: none; margin-top: -10px;">
                                        <input type="url" id="website_link" value="{{$product_description->website_link}}" name="website_link" class="form-control height-35 f-14" aria-label="Recipient's username" aria-describedby="saveButton" placeholder="Enter website URL (https://asdasd.com)">
                                        <div class="input-group-append">
                                            <button class="btn btn-outline-secondary saveWebsiteLinkBtn" type="button" id="saveButton" data-id="{{$product_description->id}}"><i class="fa-solid fa-check"></i></button>
                                        </div>
                                    </div>
                                    <span id="website_link_error" class="text-danger"></span><br>
                                    @else
                                    <div class="input-group" id="input_website_link" style="display: none; margin-top: -10px;">
                                        <input type="url" id="website_link" name="website_link" class="form-control height-35 f-14" aria-label="Recipient's username" aria-describedby="saveButton" placeholder="Enter website URL (https://asdasd.com)">
                                        <div class="input-group-append">
                                            <button class="btn btn-outline-secondary saveWebsiteLinkBtn" type="button" id="saveButton" data-id="{{$product_description->id}}"><i class="fa-solid fa-check"></i></button>
                                        </div>
                                    </div>
                                    <span id="website_link_error" class="text-danger"></span><br>
                                </form>
                                @endif
                            </div>


                            {{-- START WEBSITE LINK --}}
                            <div id="website_niche_container">
                                @if($sales_product_description && $sales_product_description->website_niche != null)
                                    <p>{{$sales_product_description->website_niche}}</p>
                                @else
                                    @if($product_description && $product_description->website_niche)
                                        <button id="website_niche_btn" type="button" style="background-color: #ffffff" onclick="toggleWebsiteNicheButton()" data-toggle="tooltip" data-placement="top" title="Click to edit">{{$product_description->website_niche}}</button>
                                    @else
                                        <button type="button" id="website_niche_btn" style="background-color: #ffffff" onclick="toggleWebsiteNicheButton()" data-toggle="tooltip" data-placement="top" title="Click to edit">--</button>
                                    @endif
                                @endif
                            </div>


                            <div id="website_niche_form">
                                @if($product_description->website_niche)
                                <form action="" method="post">
                                    @csrf
                                    <div class="input-group" id="input_website_niche" style="display: none; margin-top: -10px;">
                                        <input type="url" id="website_niche" value="{{$product_description->website_niche}}" name="website_niche" class="form-control height-35 f-14" aria-label="Recipient's username" aria-describedby="saveButton" placeholder="Write Your Niche (Pet Care, Digital Marketing)">
                                        <div class="input-group-append">
                                            <button class="btn btn-outline-secondary saveWebsiteNicheBtn" type="button" id="saveButton" data-id="{{$product_description->id}}"><i class="fa-solid fa-check"></i></button>
                                        </div>
                                    </div>
                                    <span id="website_niche_error" class="text-danger"></span><br>
                                    @else
                                    <div class="input-group" id="input_website_niche" style="display: none; margin-top: -10px;">
                                        <input type="url" id="website_niche" name="website_niche" class="form-control height-35 f-14" aria-label="Recipient's username" aria-describedby="saveButton" placeholder="Write Your Niche (Pet Care, Digital Marketing)">
                                        <div class="input-group-append">
                                            <button class="btn btn-outline-secondary saveWebsiteNicheBtn" type="button" id="saveButton" data-id="{{$product_description->id}}"><i class="fa-solid fa-check"></i></button>
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
                                @if($sales_product_description && $sales_product_description->website_name != null)
                                <p>{{$sales_product_description->website_name}}</p>
                                @else
                                @if($product_description && $product_description->website_name)
                                <button id="website_name_btn" type="button" style="background-color: #ffffff" onclick="toggleWebsiteNameButton()" data-toggle="tooltip" data-placement="top" title="Click to edit"> {{$product_description->website_name}}</button>
                                @else
                                <button type="button" id="website_name_btn" style="background-color: #ffffff" onclick="toggleWebsiteNameButton()" data-toggle="tooltip" data-placement="top" title="Click to edit">--</button>
                                @endif
                                @endif
                            </div>

                            <div id="website_name_form">
                                @if($product_description->website_name)
                                <form action="" method="post">
                                    @csrf
                                    <div class="input-group" id="input_website_name" style="display: none; margin-top: -10px;">
                                        <input type="text" id="website_name" value="{{$product_description->website_name}}" name="website_name" class="form-control height-35 f-14" aria-label="Recipient's username" aria-describedby="saveButton" placeholder="Type Your Business/Website Name">
                                        <div class="input-group-append">
                                            <button class="btn btn-outline-secondary saveWebsiteNameBtn" type="button" id="saveButton" data-id="{{$product_description->id}}"><i class="fa-solid fa-check"></i></button>
                                        </div>
                                    </div>
                                    <span id="website_name_error" class="text-danger"></span><br>
                                    @else
                                    <div class="input-group" id="input_website_name" style="display: none; margin-top: -10px;">
                                        <input type="text" id="website_name" name="website_name" class="form-control height-35 f-14" aria-label="Recipient's username" aria-describedby="saveButton" placeholder="Type Your Business/Website Name">
                                        <div class="input-group-append">
                                            <button class="btn btn-outline-secondary saveWebsiteNameBtn" type="button" id="saveButton" data-id="{{$product_description->id}}"><i class="fa-solid fa-check"></i></button>
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
                        @if($sales_product_description && $sales_product_description->business_information != null)
                        <div class="col-8">
                            <p>{{$sales_product_description->business_information}}</p>
                        </div>
                        @else
                        <div class="col-8" id="business_information_value" onclick="toggleBusinessInformationEdit()">
                            <div id="business_information_container">
                                @if($product_description && $product_description->business_information)
                                <button id="business_information_btn" type="button" style="background-color: #ffffff"  data-toggle="tooltip" data-placement="top" title="Click to edit"> {{$product_description->business_information}}</button>
                                @else
                                <button type="button" id="business_information_btn" style="background-color: #ffffff"  data-toggle="tooltip" data-placement="top" title="Click to edit">--</button>
                                @endif
                            </div>
                        </div>
                        @endif


                        <div class="col-4">
                            <p>Share File Info</p>
                        </div>
                        @if($sales_product_description !=null)
                        <div class="col-8">
                            @if($sales_product_description->share_file_info ==1)
                                <p>Yes</p>
                            @else
                                <p>No</p>
                            @endif
                        </div>
                        @else
                        <div class="col-8" id="business_information_value" onclick="toggleBusinessInformationEdit()">
                            @if($product_description->share_file_info ==1)
                                <p data-toggle="tooltip" data-placement="top" title="Click to edit">Yes</p>
                            @else
                                <p data-toggle="tooltip" data-placement="top" title="Click to edit">No</p>
                            @endif
                        </div>
                        @endif

                        @if(isset($sales_product_description) && $sales_product_description->share_file_info == 1)
                            <div class="col-4"></div>
                            <div class="col-8">
                                @php
                                    if (is_string($sales_product_description->folder_link) && is_array(json_decode($sales_product_description->folder_link, true))) {
                                        $array = json_decode($sales_product_description->folder_link, true);
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
                            @if(isset($product_description) && $product_description->share_file_info == 1)
                                <div class="col-4"></div>
                                <div class="col-8" id="business_information_value" onclick="toggleBusinessInformationEdit()">
                                    @php
                                        if (is_string($product_description->folder_link) && is_array(json_decode($product_description->folder_link, true))) {
                                            $array = json_decode($product_description->folder_link, true);
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
                    <div id="business_information_edit">
                        <button type="button" style="background-color: #ffffff; position: absolute; top: 35px; right: 20px;" class="d-flex justify-content-end ml-auto btn btn-secondary" data-toggle="modal" data-target="#business_information_edit_modal"><i class="fa fa-edit" style="font-size: 16px;"></i></button>
                    </div>
                    @include('service-type.modal.product-description.business_information_edit_modal')
                </div>
            </div>

            <div class="card mb-2">
                <div class="card-body">
                    <div class="row">
                        <div class="col-4">
                            <p>Reference product descriptions for the tone and style:</p>
                        </div>
                        @if($sales_product_description && $sales_product_description->blog_url != null)
                            <div class="col-8">
                                @php
                                    if (is_string($sales_product_description->blog_url) && is_array(json_decode($sales_product_description->blog_url, true))) {
                                        $array = json_decode($sales_product_description->blog_url, true);
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
                                    if (is_string($product_description->blog_url) && is_array(json_decode($product_description->blog_url, true))) {
                                        $array = json_decode($product_description->blog_url, true);
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
                    <div  id="reference_blog_edit">
                        <button type="button" style="background-color: #ffffff; position: absolute; top: 35px; right: 20px;" class="d-flex justify-content-end ml-auto btn btn-secondary" data-toggle="modal" data-target="#reference_blog_edit_modal"><i class="fa fa-edit" style="font-size: 16px;"></i></button>
                    </div>
                    @include('service-type.modal.product-description.reference_blog_edit_modal')
                </div>
            </div>

            <div class="card mb-2">
                <div class="card-body">
                    <div class="row">
                        <div class="col-4">
                            <p>How many product descriptions do you need written?</p>
                        </div>
                        <div class="col-8">
                            <div id="product_no_container">
                                @if($sales_product_description && $sales_product_description->product_no != null)
                                <p>{{$sales_product_description->product_no}}</p>
                                @else
                                @if($product_description && $product_description->product_no)
                                <button id="product_no_btn" type="button" style="background-color: #ffffff" onclick="toggleProductNoButton()" data-toggle="tooltip" data-placement="top" title="Click to edit"> {{$product_description->product_no}}</button>
                                @else
                                <button type="button" id="product_no_btn" style="background-color: #ffffff" onclick="toggleProductNoButton()" data-toggle="tooltip" data-placement="top" title="Click to edit">--</button>
                                @endif
                                @endif
                            </div>

                            <div id="product_no_form">
                                @if($product_description->product_no)
                                <form action="" method="post">
                                    @csrf
                                    <div class="input-group" id="input_product_no" style="display: none; margin-top: -10px;">
                                        <input type="text" id="product_no" value="{{$product_description->product_no}}" name="product_no" class="form-control height-35 f-14" aria-label="Recipient's username" aria-describedby="saveButton" placeholder="Input word count here!">
                                        <div class="input-group-append">
                                            <button class="btn btn-outline-secondary saveProductNoBtn" type="button" id="saveButton" data-id="{{$product_description->id}}"><i class="fa-solid fa-check"></i></button>
                                        </div>
                                    </div>
                                    <span id="product_no_error" class="text-danger"></span><br>
                                    @else
                                    <div class="input-group" id="input_product_no" style="display: none; margin-top: -10px;">
                                        <input type="text" id="product_no" name="product_no" class="form-control height-35 f-14" aria-label="Recipient's username" aria-describedby="saveButton" placeholder="Input word count here!">
                                        <div class="input-group-append">
                                            <button class="btn btn-outline-secondary saveProductNoBtn" type="button" id="saveButton" data-id="{{$product_description->id}}"><i class="fa-solid fa-check"></i></button>
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
                            <p>Add product list:</p>
                        </div>


                        @if($sales_product_description && $sales_product_description->product_list != null)
                            <div class="col-8">
                                @php
                                    if (is_string($sales_product_description->product_list) && is_array(json_decode($sales_product_description->product_list, true))) {
                                        $array = json_decode($sales_product_description->product_list, true);
                                        $product_lists = implode(', ', $array);
                                    }
                                    $product_lists_array = explode(', ', $product_lists);
                                @endphp

                                @foreach($product_lists_array as $product_list)
                                    @if($product_list)
                                    <p>{{$product_list}}</p>
                                    @else
                                    <p>--</p>
                                    @endif
                                @endforeach
                            </div>
                        @else
                            <div class="col-8" id="product_list_value" onclick="toggleProductListEdit()">
                                @php
                                    if (is_string($product_description->product_list) && is_array(json_decode($product_description->product_list, true))) {
                                        $array = json_decode($product_description->product_list, true);
                                        $product_lists = implode(', ', $array);
                                    }
                                    $product_lists_array = explode(', ', $product_lists);
                                @endphp

                                @foreach($product_lists_array as $product_list)
                                    @if($product_list)
                                    <p data-toggle="tooltip" data-placement="top" title="Click to edit">{{$product_list}}</p>
                                    @else
                                    <p data-toggle="tooltip" data-placement="top" title="Click to edit">--</p>
                                    @endif
                                @endforeach
                            </div>
                        @endif
                    </div>
                    <div id="product_list_edit">
                        <button type="button" style="background-color: #ffffff; position: absolute; top: 35px; right: 20px;" class="d-flex justify-content-end ml-auto btn btn-secondary" data-toggle="modal" data-target="#product_list_edit_modal"><i class="fa fa-edit" style="font-size: 16px;"></i></button>
                    </div>
                    @include('service-type.modal.product-description.product_list_edit_modal')
                </div>
            </div>

            <div class="card mb-2">
                <div class="card-body">
                    <div class="row">
                        <div class="col-4">
                            <p>Expected word count per product</p>
                        </div>
                        <div class="col-8">
                            <div id="word_count_container">
                                @if($sales_product_description != null)
                                    <p>{{$sales_product_description->word_count}}</p>
                                @else
                                    @if($product_description->word_count ?? null)
                                        <button id="word_count_btn" type="button" style="background-color: #ffffff" onclick="toggleWordCountButton()" data-toggle="tooltip" data-placement="top" title="Click to edit">{{$product_description->word_count}}</button>
                                    @else
                                        <button type="button" id="word_count_btn" style="background-color: #ffffff" onclick="toggleWordCountButton()" data-toggle="tooltip" data-placement="top" title="Click to edit">--</button>
                                    @endif
                                @endif
                            </div>

                            <div id="word_count_form">
                                @if($product_description->word_count)
                                <form action="" method="post">
                                    @csrf
                                    <div class="input-group" id="input_word_count" style="display: none; margin-top: -10px;">
                                        <input type="text" id="word_count" value="{{$product_description->word_count}}" name="word_count" class="form-control height-35 f-14" aria-label="Recipient's username" aria-describedby="saveButton" placeholder="Input the no. of products here!">
                                        <div class="input-group-append">
                                            <button class="btn btn-outline-secondary saveWordCountBtn" type="button" id="saveButton" data-id="{{$product_description->id}}"><i class="fa-solid fa-check"></i></button>
                                        </div>
                                    </div>
                                    <span id="word_count_error" class="text-danger"></span><br>
                                    @else
                                    <div class="input-group" id="input_word_count" style="display: none; margin-top: -10px;">
                                        <input type="text" id="word_count" name="word_count" class="form-control height-35 f-14" aria-label="Recipient's username" aria-describedby="saveButton" placeholder="Input word count here!">
                                        <div class="input-group-append">
                                            <button class="btn btn-outline-secondary saveWordCountBtn" type="button" id="saveButton" data-id="{{$product_description->id}}"><i class="fa-solid fa-check"></i></button>
                                        </div>
                                    </div>
                                    <span id="word_count_error" class="text-danger"></span><br>
                                </form>
                                @endif
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    @endif
    @if ($sales_product_description !=null && $sales_product_description->status == 'submitted')
        @if (Auth::user()->role_id == 4 || Auth::user()->role_id == 1)
            <div class="row">
                <div class="col-12">
                    <div class="card mb-5 mt-3" style="border: none">
                        <h4 class="text-center my-3">Fields Needed to be Filled by Project Manager ({{ $pm->name }})</h4>
                        <div class="card-body">
                            <form action="" method="post" id="pm_form">
                                @csrf
                                <input type="hidden" name="sales_product_description_id" id="sales_product_description_id" value="{{ $sales_product_description->id }}">
                                <input type="hidden" name="deal_id" id="deal_id" value="{{ $sales_product_description->deal_id }}">
                                <input type="hidden" name="milestone_id" id="milestone_id" value="{{ $sales_product_description->milestone_id }}">
                                <div class="row mb-3">
                                    <div class="col-md-4">
                                        <h6 class="mt-2">Website Link & Niche:</h6>
                                    </div>
                                    <div class="col-md-8">
                                        <div class="row">
                                            <div class="col-md-6">
                                                <input type="url" name="website_link_2" id="website_link_2" value="{{ $sales_product_description->website_link }}" class="form-control placeholderText height-35 f-14" placeholder="https://asdasd.com or https://www.asdasd.com">
                                            </div>
                                            <div class="col-md-6">
                                                <input type="text" name="website_niche_2" id="website_niche_2" value="{{ $sales_product_description->website_niche }}" class="form-control placeholderText height-35 f-14" placeholder="Write Your Niche (Pet Care, Digital Marketing)">
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
                                        <input type="text" name="website_name" id="website_name_2" value="{{ $sales_product_description->website_name }}" class="form-control placeholderText height-35 f-14" placeholder="Type Your Business/Website Name">
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
                                                    <textarea name="business_information" id="business_information_2" cols="3" rows="3" class="form-control placeholderText" placeholder="Put some details about your company here!">{!! $sales_product_description->business_information !!}</textarea>
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="form-group">
                                                    <label for="">Want to share file?</label>
                                                    <div class="mt-2 d-flex">
                                                        <div class="form-check">
                                                            <input class="form-check-input" type="radio" name="share_file_info" value="1" id="share_file_yesBtn" {{ ($sales_product_description->share_file_info=="1")? "checked" : "" }}>
                                                            <label class="form-check-label mt-1 ml-1" for="share_file_yesBtn">
                                                                Yes
                                                            </label>
                                                        </div>
                                                        <div class="form-check" style="margin-left: 10px;">
                                                            <input class="form-check-input" type="radio" name="share_file_info" value="0" id="share_file_noBtn" {{ ($sales_product_description->share_file_info=="0")? "checked" : "" }}>
                                                            <label class="form-check-label mt-1 ml-1" for="share_file_noBtn">
                                                                No
                                                            </label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        @if ($sales_product_description!=null && $sales_product_description->share_file_info==1)

                                            @php
                                                if (is_string($sales_product_description->folder_link) && is_array(json_decode($sales_product_description->folder_link, true))) {
                                                    $array = json_decode($sales_product_description->folder_link, true);
                                                    $folder_links = implode(', ', $array);
                                                }
                                                $folder_links_array = explode(', ', $folder_links);
                                            @endphp
                                            @if ($folder_links_array)
                                                @foreach($folder_links_array as $folder_link)
                                                <div class="row mt-3" id="folderLinkForm" >
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
                                                <div class="row mt-3" id="folderLinkForm" style="display: none;">
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

                                    if ($sales_product_description->blog_url !== null && is_string($sales_product_description->blog_url)) {
                                        $array = json_decode($sales_product_description->blog_url, true);

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
                                                    <h6>Reference product descriptions for the tone and style:</h6>
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
                                                    <h6 class="mt-2">Reference product descriptions for the tone and style:</h6>
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
                                        <h6 class="mt-2">How many product descriptions do you need written?</h6>
                                    </div>
                                    <div class="col-md-8">
                                        <input type="text" name="product_no_2" id="product_no_2" value="{{ $sales_product_description->product_no }}" class="form-control placeholderText height-35 f-14" placeholder="Input the no. of products here!">
                                    </div>
                                </div>
                                <!--Product list-->
                                @php
                                    $product_lists_array = [];

                                    if ($sales_product_description->product_list !== null && is_string($sales_product_description->product_list)) {
                                        $array = json_decode($sales_product_description->product_list, true);

                                        if (is_array($array)) {
                                            $product_lists = implode(', ', $array);
                                            $product_lists_array = explode(', ', $product_lists);
                                        }
                                    }
                                @endphp
                                @if ($product_lists_array)
                                    @foreach($product_lists_array as $product_list)
                                    <div class="row mt-3">
                                        <div class="col-md-10 dynamic-product-list" id="dynamic-product-list-list-1">
                                            <div class="row mb-3">
                                                <div class="col-md-4">
                                                    <h6>Add product list:</h6>
                                                </div>
                                                <div class="col-md-8">
                                                    <div class="form-group" style="margin-left: 90px;">
                                                        <input type="url" id="product_list_2" class="form-control placeholderText height-35 f-14" value="{{ $product_list }}" placeholder="Enter reference blog url" name="product_list_2[]"/>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-2 append-buttons">
                                            <div class="clearfix">
                                                <button type="button" id="add-product-list-button" class="btn btn-primary float-left text-uppercase shadow-sm"><i class="fa fa-plus fa-fw"></i></button>
                                                <button type="button" id="remove-product-list-button" class="btn btn-secondary float-left text-uppercase ml-1" disabled="disabled"><i class="fa fa-minus fa-fw"></i></button>
                                            </div>
                                        </div>
                                    </div>
                                    @endforeach
                                @else
                                    <div class="row mt-3">
                                        <div class="col-md-10 dynamic-product-list" id="dynamic-product-list-list-1">
                                            <div class="row mb-3">
                                                <div class="col-md-4">
                                                    <h6 class="mt-2">Add product list:</h6>
                                                </div>
                                                <div class="col-md-8">
                                                    <div class="form-group" style="margin-left: 90px;">
                                                        <input type="url" id="product_list_2" class="form-control placeholderText height-35 f-14"  placeholder="Enter reference blog url" name="product_list_2[]"/>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-2 append-buttons">
                                            <div class="clearfix">
                                                <button type="button" id="add-product-list-button" class="btn btn-primary float-left text-uppercase shadow-sm"><i class="fa fa-plus fa-fw"></i></button>
                                                <button type="button" id="remove-product-list-button" class="btn btn-secondary float-left text-uppercase ml-1" disabled="disabled"><i class="fa fa-minus fa-fw"></i></button>
                                            </div>
                                        </div>
                                    </div>
                                @endif

                                <!--Keywords-->
                                <div class="row mt-3">
                                    <div class="col-md-4">
                                        <h6>Expected word count per product</h6>
                                    </div>
                                    <div class="col-md-8">
                                        <input type="text" name="word_count_2" id="word_count_2" value="{{ $sales_product_description->word_count }}" class="form-control placeholderText height-35 f-14" placeholder="Input word count here">
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
                                <div class="d-flex justify-content-center">
                                    <button type="submit" class="btn btn-primary mt-5 " id="pm_product_description_submit">Submit</button>
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
            $('#folderLinkForm').show();
        });

        $('#share_file_noBtn').click(function() {
            $('#folderLinkForm').hide();
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
    function toggleWordCountButton() {
        var button = document.getElementById('word_count_btn');
        var input_word_count = document.getElementById('input_word_count');

        button.style.display = 'none';
        input_word_count.style.display = 'flex';
    }


    // AJAX call
    $(document).ready(function() {
            $('.saveWebsiteLinkBtn, .saveWebsiteNicheBtn, .saveWebsiteNameBtn, .saveProductNoBtn, .saveWordCountBtn').click(function(event) {
                event.preventDefault();
                var id = $(this).data('id');
                var data= {
                    '_token': "{{ csrf_token() }}",
                    'website_link': document.getElementById("website_link").value,
                    'website_niche': document.getElementById("website_niche").value,
                    'website_name': document.getElementById("website_name").value,
                    'product_no': document.getElementById("product_no").value,
                    'word_count': document.getElementById("word_count").value,
                    'deal_id': {{$product_description->deal_id}},
                    'product_description_id': {{$product_description->id}},
                    'milestone_id': {{$product_description->milestone_id}},
                }
                $.ajaxSetup({
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                }
            });
            $.ajax({
                url: '/projects/update-product-description/'+id,
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
                    if(response.word_count){
                        $('#word_count_form').hide();
                        $('#word_count_container').html();
                        $('#word_count_container').html('<button id="word_count_btn" type="submit" style="background-color: #ffffff">' + response.word_count + '</button>');
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
                    if(error.responseJSON.errors.word_count){
                    $('#word_count_error').text(error.responseJSON.errors.word_count);
                    }else{
                        $('#word_count_error').text('');
                    }
                }
            });
            });
        });
</script>

<script>
    $(document).ready(function() {
        $('#pm_product_description_submit').click(function(event) {
            event.preventDefault();
            $('#pm_product_description_submit').attr("disabled", true);
            $('#pm_product_description_submit').html("Processing...");
            var additional_word = $('input[name="additional_word"]:checked').val();
            var layout_content = $('input[name="layout_content"]:checked').val();
            var share_file_info = $('input[name="share_file_info"]:checked').val();
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
            var product_list = document.getElementsByName("product_list_2[]");
            var product_list_values = [];
            for (var i = 0; i < product_list.length; i++) {
                product_list_values.push(product_list[i].value);
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
                'sales_product_description_id': document.getElementById("sales_product_description_id").value,
                'deal_id': document.getElementById("deal_id").value,
                'milestone_id': document.getElementById("milestone_id").value,
                'product_no': document.getElementById("product_no_2").value,
                'word_count': document.getElementById("word_count_2").value,
                'additional_word': additional_word,
                'layout_content': layout_content,
                'share_file_info': share_file_info,
                'folder_link': folder_link_values,
                'blog_url': blog_url_values,
                'product_list': product_list_values,
                'website_link': website_link_values,
                'page_name': page_name_values,
                'quantity': quantity_values,
                'approximate_word': approximate_word_values,
            }
            $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            }
        });
        $.ajax({
            url: "{{route('pm_product_description_update')}}",
            method: 'post',
            data: data,
            dataType: "json",
            success: function (response) {
                toastr.success('Updated Successfully');
                $(location).prop('href', '{{route('viewProductDescription',$product_description->deal_id)}}');
                $('#pm_product_description_submit').attr("disabled", false);
                $('#pm_product_description_submit').html("Submit");
            },
            error: function(error) {
                $('#pm_product_description_submit').attr("disabled", false);
                $('#pm_product_description_submit').html("Submit");
            }
        });
        });
    });
</script>

<script>
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
        var buttonAdd = $("#add-product-list-button");
        var buttonRemove = $("#remove-product-list-button");
        var className = ".dynamic-product-list";
        var count = 0;
        var field = "";
        var maxFields = 50;

        function totalFields() {
            return $(className).length;
        }

        function addNewField() {
            var total = $('input[name="product_list[]"]').length;
            count = totalFields() + 1;
            field = $("#dynamic-product-list-list-1").clone();
            field.attr("id", "dynamic-product-list-" + count);
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
</script>
