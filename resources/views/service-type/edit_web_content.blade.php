@extends('layouts.app')
@section('content')
@php
$sales_web_content = \App\Models\SalesWebContent::where('web_content_id',$web_content->id)->first();
$deal = \App\Models\Deal::where('id',$web_content->deal_id)->first();
$project = \App\Models\Project::where('deal_id',$web_content->deal_id)->first();
$pm = \App\Models\User::where('id',$project->pm_id)->first();
$webContent = \App\Models\WebContent::where('id',$web_content->id)->first();
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
                            <p>{{$web_content->deal_id}}</p>
                        </div>
                        <div class="col-4">
                            <p>Client Link</p>
                        </div>
                        <div class="col-8">
                            <p>{{$web_content->client_link}}</p>
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
                            <p>{{$web_content->service_type}}</p>
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
                                @if($sales_web_content != null)
                                    <p>{{$sales_web_content->website_link}}</p>
                                @else
                                    @if($web_content->website_link ?? null)
                                        <button id="website_link_btn" type="button" style="background-color: #ffffff" onclick="toggleWebsiteLinkButton()" data-toggle="tooltip" data-placement="top" title="Click to edit">{{$web_content->website_link}}</button>
                                    @else
                                        <button type="button" id="website_link_btn" style="background-color: #ffffff" onclick="toggleWebsiteLinkButton()" data-toggle="tooltip" data-placement="top" title="Click to edit">--</button>
                                    @endif
                                @endif
                            </div>

                            <div id="website_link_form">
                                @if($web_content->website_link)
                                <form action="" method="post">
                                    @csrf
                                    <div class="input-group" id="input_website_link" style="display: none; margin-top: -10px;">
                                        <input type="url" id="website_link" value="{{$web_content->website_link}}" name="website_link" class="form-control height-35 f-14" aria-label="Recipient's username" aria-describedby="saveButton" placeholder="Enter website URL (https://asdasd.com)">
                                        <div class="input-group-append">
                                            <button class="btn btn-outline-secondary saveWebsiteLinkBtn" type="button" id="saveButton" data-id="{{$web_content->id}}"><i class="fa-solid fa-check"></i></button>
                                        </div>
                                    </div>
                                    <span id="website_link_error" class="text-danger"></span><br>
                                    @else
                                    <div class="input-group" id="input_website_link" style="display: none; margin-top: -10px;">
                                        <input type="url" id="website_link" name="website_link" class="form-control height-35 f-14" aria-label="Recipient's username" aria-describedby="saveButton" placeholder="Enter website URL (https://asdasd.com)">
                                        <div class="input-group-append">
                                            <button class="btn btn-outline-secondary saveWebsiteLinkBtn" type="button" id="saveButton" data-id="{{$web_content->id}}"><i class="fa-solid fa-check"></i></button>
                                        </div>
                                    </div>
                                    <span id="website_link_error" class="text-danger"></span><br>
                                </form>
                                @endif
                            </div>


                            {{-- START WEBSITE LINK --}}
                            <div id="website_niche_container">
                                @if($sales_web_content && $sales_web_content->website_niche != null)
                                    <p>{{$sales_web_content->website_niche}}</p>
                                @else
                                    @if($web_content && $web_content->website_niche)
                                        <button id="website_niche_btn" type="button" style="background-color: #ffffff" onclick="toggleWebsiteNicheButton()" data-toggle="tooltip" data-placement="top" title="Click to edit">{{$web_content->website_niche}}</button>
                                    @else
                                        <button type="button" id="website_niche_btn" style="background-color: #ffffff" onclick="toggleWebsiteNicheButton()" data-toggle="tooltip" data-placement="top" title="Click to edit">--</button>
                                    @endif
                                @endif
                            </div>


                            <div id="website_niche_form">
                                @if($web_content->website_niche)
                                <form action="" method="post">
                                    @csrf
                                    <div class="input-group" id="input_website_niche" style="display: none; margin-top: -10px;">
                                        <input type="url" id="website_niche" value="{{$web_content->website_niche}}" name="website_niche" class="form-control height-35 f-14" aria-label="Recipient's username" aria-describedby="saveButton" placeholder="Write Your Niche (Pet Care, Digital Marketing)">
                                        <div class="input-group-append">
                                            <button class="btn btn-outline-secondary saveWebsiteNicheBtn" type="button" id="saveButton" data-id="{{$web_content->id}}"><i class="fa-solid fa-check"></i></button>
                                        </div>
                                    </div>
                                    <span id="website_niche_error" class="text-danger"></span><br>
                                    @else
                                    <div class="input-group" id="input_website_niche" style="display: none; margin-top: -10px;">
                                        <input type="url" id="website_niche" name="website_niche" class="form-control height-35 f-14" aria-label="Recipient's username" aria-describedby="saveButton" placeholder="Write Your Niche (Pet Care, Digital Marketing)">
                                        <div class="input-group-append">
                                            <button class="btn btn-outline-secondary saveWebsiteNicheBtn" type="button" id="saveButton" data-id="{{$web_content->id}}"><i class="fa-solid fa-check"></i></button>
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
                                @if($sales_web_content && $sales_web_content->website_name != null)
                                <p>{{$sales_web_content->website_name}}</p>
                                @else
                                @if($web_content && $web_content->website_name)
                                <button id="website_name_btn" type="button" style="background-color: #ffffff" onclick="toggleWebsiteNameButton()" data-toggle="tooltip" data-placement="top" title="Click to edit"> {{$web_content->website_name}}</button>
                                @else
                                <button type="button" id="website_name_btn" style="background-color: #ffffff" onclick="toggleWebsiteNameButton()" data-toggle="tooltip" data-placement="top" title="Click to edit">--</button>
                                @endif
                                @endif
                            </div>

                            <div id="website_name_form">
                                @if($web_content->website_name)
                                <form action="" method="post">
                                    @csrf
                                    <div class="input-group" id="input_website_name" style="display: none; margin-top: -10px;">
                                        <input type="text" id="website_name" value="{{$web_content->website_name}}" name="website_name" class="form-control height-35 f-14" aria-label="Recipient's username" aria-describedby="saveButton" placeholder="Type Your Business/Website Name">
                                        <div class="input-group-append">
                                            <button class="btn btn-outline-secondary saveWebsiteNameBtn" type="button" id="saveButton" data-id="{{$web_content->id}}"><i class="fa-solid fa-check"></i></button>
                                        </div>
                                    </div>
                                    <span id="website_name_error" class="text-danger"></span><br>
                                    @else
                                    <div class="input-group" id="input_website_name" style="display: none; margin-top: -10px;">
                                        <input type="text" id="website_name" name="website_name" class="form-control height-35 f-14" aria-label="Recipient's username" aria-describedby="saveButton" placeholder="Type Your Business/Website Name">
                                        <div class="input-group-append">
                                            <button class="btn btn-outline-secondary saveWebsiteNameBtn" type="button" id="saveButton" data-id="{{$web_content->id}}"><i class="fa-solid fa-check"></i></button>
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
                        @if($sales_web_content && $sales_web_content->business_information != null)
                        <div class="col-8">
                            <p>{{$sales_web_content->business_information}}</p>
                        </div>
                        @else
                        <div class="col-8" id="business_information_value" onclick="toggleBusinessInformationEdit()">
                            <div id="business_information_container">
                                @if($web_content && $web_content->business_information)
                                <button id="business_information_btn" type="button" style="background-color: #ffffff"  data-toggle="tooltip" data-placement="top" title="Click to edit"> {{$web_content->business_information}}</button>
                                @else
                                <button type="button" id="business_information_btn" style="background-color: #ffffff"  data-toggle="tooltip" data-placement="top" title="Click to edit">--</button>
                                @endif
                            </div>
                        </div>
                        @endif


                        <div class="col-4">
                            <p>Share File Info</p>
                        </div>
                        @if($sales_web_content !=null)
                        <div class="col-8">
                            @if($sales_web_content->share_file_info ==1)
                                <p>Yes</p>
                            @else
                                <p>No</p>
                            @endif
                        </div>
                        @else
                        <div class="col-8" id="business_information_value" onclick="toggleBusinessInformationEdit()">
                            @if($web_content->share_file_info ==1)
                                <p data-toggle="tooltip" data-placement="top" title="Click to edit">Yes</p>
                            @else
                                <p data-toggle="tooltip" data-placement="top" title="Click to edit">No</p>
                            @endif
                        </div>
                        @endif

                        @if(isset($sales_web_content) && $sales_web_content->share_file_info == 1)
                            <div class="col-4"></div>
                            <div class="col-8">
                                @php
                                    if (is_string($sales_web_content->folder_link) && is_array(json_decode($sales_web_content->folder_link, true))) {
                                        $array = json_decode($sales_web_content->folder_link, true);
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
                            @if(isset($web_content) && $web_content->share_file_info == 1)
                                <div class="col-4"></div>
                                <div class="col-8" id="business_information_value" onclick="toggleBusinessInformationEdit()">
                                    @php
                                        if (is_string($web_content->folder_link) && is_array(json_decode($web_content->folder_link, true))) {
                                            $array = json_decode($web_content->folder_link, true);
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
                    @include('service-type.modal.web-content.business_information_edit_modal')
                </div>
            </div>
            <div class="card mb-2">
                <div class="card-body">
                    <div class="row">
                        <div class="col-4">
                            <p>Competitors/Reference Website</p>
                        </div>
                        @if($sales_web_content != null && $sales_web_content->reference_website != null)
                            <div class="col-8">
                                @php
                                    $reference_websites = '';

                                    if (is_string($sales_web_content->reference_website) && is_array(json_decode($sales_web_content->reference_website, true))) {
                                        $array = json_decode($sales_web_content->reference_website, true);
                                        $reference_websites = implode(', ', $array);
                                    }

                                    $reference_websites_array = explode(', ', $reference_websites);
                                @endphp

                                @foreach($reference_websites_array as $reference_website)
                                    @if($reference_website)
                                        <p>{{$reference_website}}</p>
                                    @endif
                                @endforeach
                            </div>
                        @else
                            <div class="col-8" id="reference_website_value" onclick="togglerefeRenceWebsiteEdit()">
                                @php
                                    $reference_websites = '';

                                    if (is_string($web_content->reference_website) && is_array(json_decode($web_content->reference_website, true))) {
                                        $array = json_decode($web_content->reference_website, true);
                                        $reference_websites = implode(', ', $array);
                                    }

                                    $reference_websites_array = explode(', ', $reference_websites);
                                @endphp

                                @foreach($reference_websites_array as $reference_website)
                                    @if($reference_website)
                                        <p data-toggle="tooltip" data-placement="top" title="Click to edit">{{$reference_website}}</p>
                                    @else
                                        <p data-toggle="tooltip" data-placement="top" title="Click to edit">--</p>
                                    @endif
                                @endforeach
                            </div>
                        @endif

                        <div class="col-4">
                            <p>Does your competitor's content match exactly to what you do?</p>
                        </div>

                        @if($sales_web_content != null)
                        <div class="col-8">
                            @if($sales_web_content->competitor_content ==1)
                                <p>Yes</p>
                            @else
                                <p>No</p>
                            @endif
                        </div>
                        @else
                        <div class="col-8" id="reference_website_value" onclick="togglerefeRenceWebsiteEdit()">
                            @if($web_content->competitor_content ==1)
                                <p data-toggle="tooltip" data-placement="top" title="Click to edit">Yes</p>
                            @else
                                <p data-toggle="tooltip" data-placement="top" title="Click to edit">No</p>
                            @endif
                        </div>
                        @endif

                        @if (!is_null($sales_web_content) && $sales_web_content->competitor_content == 0)
                            <div class="col-4">
                                <p>What are the major differences?</p>
                            </div>
                            <div class="col-8">
                                @php
                                    if (is_string($sales_web_content->description1) && is_array(json_decode($sales_web_content->description1, true))) {
                                        $array = json_decode($sales_web_content->description1, true);
                                        foreach ($array as $value) {
                                            echo "<p>$value</p>";
                                        }
                                    }
                                @endphp
                            </div>
                            <div class="col-4">
                                <p>What are things that they do, and you don't?</p>
                            </div>
                            <div class="col-8">
                                @php
                                    if (is_string($sales_web_content->description2) && is_array(json_decode($sales_web_content->description2, true))) {
                                        $array = json_decode($sales_web_content->description2, true);
                                        foreach ($array as $value) {
                                            echo "<p>$value</p>";
                                        }
                                    }
                                @endphp
                            </div>
                            <div class="col-4">
                                <p>What are things that they don't, and you do?</p>
                            </div>
                            <div class="col-8">
                                @php
                                    if (is_string($sales_web_content->description3) && is_array(json_decode($sales_web_content->description3, true))) {
                                        $array = json_decode($sales_web_content->description3, true);
                                        foreach ($array as $value) {
                                            echo "<p>$value</p>";
                                        }
                                    }
                                @endphp
                            </div>
                        @else
                            @if (!is_null($web_content) && $web_content->competitor_content == 0)
                                <div class="col-4">
                                    <p>What are the major differences?</p>
                                </div>
                                <div class="col-8" id="reference_website_value" onclick="togglerefeRenceWebsiteEdit()">
                                    @php
                                        if (is_string($web_content->description1) && is_array(json_decode($web_content->description1, true))) {
                                            $array = json_decode($web_content->description1, true);
                                            foreach ($array as $value) {
                                                echo "<p data-toggle='tooltip' data-placement='top' title='Click to edit'>$value</p>";
                                            }
                                        }
                                    @endphp
                                </div>
                                <div class="col-4">
                                    <p>What are things that they do, and you don't?</p>
                                </div>
                                <div class="col-8" id="reference_website_value" onclick="togglerefeRenceWebsiteEdit()">
                                    @php
                                        if (is_string($web_content->description2) && is_array(json_decode($web_content->description2, true))) {
                                            $array = json_decode($web_content->description2, true);
                                            foreach ($array as $value) {
                                                echo "<p data-toggle='tooltip' data-placement='top' title='Click to edit'>$value</p>";
                                            }
                                        }
                                    @endphp
                                </div>
                                <div class="col-4">
                                    <p>What are things that they don't, and you do?</p>
                                </div>
                                <div class="col-8" id="reference_website_value" onclick="togglerefeRenceWebsiteEdit()">
                                    @php
                                        if (is_string($web_content->description3) && is_array(json_decode($web_content->description3, true))) {
                                            $array = json_decode($web_content->description3, true);
                                            foreach ($array as $value) {
                                                echo "<p data-toggle='tooltip' data-placement='top' title='Click to edit'>$value</p>";
                                            }
                                        }
                                    @endphp
                                </div>
                            @endif
                        @endif
                    </div>
                    <div  id="reference_website_edit">
                        <button type="button" style="background-color: #ffffff; position: absolute; top: 35px; right: 20px;" class="d-flex justify-content-end ml-auto btn btn-secondary" data-toggle="modal" data-target="#reference_website_edit_modal"><i class="fa fa-edit" style="font-size: 16px;"></i></button>
                    </div>
                    @include('service-type.modal.web-content.reference_website_edit_modal')
                </div>
            </div>
            <div class="card mb-2">
                <div class="card-body">
                    <div class="row">
                        <div class="col-4">
                            <p>Service/Product list</p>
                        </div>
                        <div class="col-8">
                            <div id="product_list_container">
                                @if($sales_web_content && $sales_web_content->product_list != null)
                                <p>{{$sales_web_content->product_list}}</p>
                                @else
                                @if($web_content && $web_content->product_list)
                                <button id="product_list_btn" type="button" style="background-color: #ffffff" onclick="toggleProductListButton()" data-toggle="tooltip" data-placement="top" title="Click to edit"> {{$web_content->product_list}}</button>
                                @else
                                <button type="button" id="product_list_btn" style="background-color: #ffffff" onclick="toggleProductListButton()" data-toggle="tooltip" data-placement="top" title="Click to edit">--</button>
                                @endif
                                @endif
                            </div>

                            <div id="product_list_form">
                                @if($web_content->product_list)
                                <form action="" method="post">
                                    @csrf
                                    <div class="input-group" id="input_product_list" style="display: none; margin-top: -10px;">
                                        <input type="text" id="product_list" value="{{$web_content->product_list}}" name="product_list" class="form-control height-35 f-14" aria-label="Recipient's username" aria-describedby="saveButton" placeholder="Type Your Business/Website Name">
                                        <div class="input-group-append">
                                            <button class="btn btn-outline-secondary saveProductListBtn" type="button" id="saveButton" data-id="{{$web_content->id}}"><i class="fa-solid fa-check"></i></button>
                                        </div>
                                    </div>
                                    <span id="product_list_error" class="text-danger"></span><br>
                                    @else
                                    <div class="input-group" id="input_product_list" style="display: none; margin-top: -10px;">
                                        <input type="text" id="product_list" name="product_list" class="form-control height-35 f-14" aria-label="Recipient's username" aria-describedby="saveButton" placeholder="Type Your Business/Website Name">
                                        <div class="input-group-append">
                                            <button class="btn btn-outline-secondary saveProductListBtn" type="button" id="saveButton" data-id="{{$web_content->id}}"><i class="fa-solid fa-check"></i></button>
                                        </div>
                                    </div>
                                    <span id="product_list_error" class="text-danger"></span><br>
                                </form>
                                @endif
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="card mb-2">
                <div class="card-body">
                    <h6 class="card-title mb-3">Pages List</h6>
                    <div class="row">
                        <div class="col-4">
                            <p>Type Page name</p>
                        </div>

                        @if($sales_web_content != null && $sales_web_content->page_name != null)
                            <div class="col-8">

                                @php
                                    $page_names = '';

                                    if (is_string($sales_web_content->page_name) && is_array(json_decode($sales_web_content->page_name, true))) {
                                        $array = json_decode($sales_web_content->page_name, true);
                                        $page_names = implode(', ', $array);
                                    }

                                    $page_names_array = explode(', ', $page_names);
                                @endphp

                                @foreach($page_names_array as $page_name)
                                    @if($page_name)
                                        <p>{{$page_name}}</p>
                                    @else
                                        <p>--</p>
                                    @endif
                                @endforeach
                            </div>
                        @else
                            <div class="col-8" id="page_list_value" onclick="togglePageListEdit()">

                                @php
                                    $page_names = '';

                                    if (is_string($web_content->page_name) && is_array(json_decode($web_content->page_name, true))) {
                                        $array = json_decode($web_content->page_name, true);
                                        $page_names = implode(', ', $array);
                                    }

                                    $page_names_array = explode(', ', $page_names);
                                @endphp

                                @foreach($page_names_array as $page_name)
                                    @if($page_name)
                                        <p data-toggle="tooltip" data-placement="top" title="Click to edit">{{$page_name}}</p>
                                    @else
                                        <p data-toggle="tooltip" data-placement="top" title="Click to edit">--</p>
                                    @endif
                                @endforeach
                            </div>
                        @endif


                        <div class="col-4">
                            <p>Quantity</p>
                        </div>
                        @if($sales_web_content != null && $sales_web_content->quantity != null)
                        <div class="col-8">
                            @php
                                $quantitys = '';

                                if (is_string($sales_web_content->quantity) && is_array(json_decode($sales_web_content->quantity, true))) {
                                    $array = json_decode($sales_web_content->quantity, true);
                                    $quantitys = implode(', ', $array);
                                }

                                $quantitys_array = explode(', ', $quantitys);
                            @endphp

                            @foreach($quantitys_array as $quantity)
                                @if($quantity)
                                    <p>{{$quantity}}</p>
                                @else
                                    <p>--</p>
                                @endif
                            @endforeach
                        </div>
                        @else
                        <div class="col-8" id="page_list_value" onclick="togglePageListEdit()">
                            @php
                                $quantitys = '';

                                if (is_string($web_content->quantity) && is_array(json_decode($web_content->quantity, true))) {
                                    $array = json_decode($web_content->quantity, true);
                                    $quantitys = implode(', ', $array);
                                }

                                $quantitys_array = explode(', ', $quantitys);
                            @endphp

                            @foreach($quantitys_array as $quantity)
                                @if($quantity)
                                    <p data-toggle="tooltip" data-placement="top" title="Click to edit">{{$quantity}}</p>
                                @else
                                    <p data-toggle="tooltip" data-placement="top" title="Click to edit">--</p>
                                @endif
                            @endforeach
                        </div>
                        @endif

                        <div class="col-4">
                            <p>Approximate word count per page</p>
                        </div>
                        @if($sales_web_content != null && $sales_web_content->approximate_word != null)
                        <div class="col-8">

                            @php
                                $approximate_words = '';

                                if (is_string($sales_web_content->approximate_word) && is_array(json_decode($sales_web_content->approximate_word, true))) {
                                    $array = json_decode($sales_web_content->approximate_word, true);
                                    $approximate_words = implode(', ', $array);
                                }

                                $approximate_words_array = explode(', ', $approximate_words);
                            @endphp

                            @foreach($approximate_words_array as $approximate_word)
                                @if($approximate_word)
                                    <p>{{$approximate_word}}</p>
                                @else
                                    <p>--</p>
                                @endif
                            @endforeach
                        </div>
                        @else
                        <div class="col-8" id="page_list_value" onclick="togglePageListEdit()">

                            @php
                                $approximate_words = '';

                                if (is_string($web_content->approximate_word) && is_array(json_decode($web_content->approximate_word, true))) {
                                    $array = json_decode($web_content->approximate_word, true);
                                    $approximate_words = implode(', ', $array);
                                }

                                $approximate_words_array = explode(', ', $approximate_words);
                            @endphp

                            @foreach($approximate_words_array as $approximate_word)
                                @if($approximate_word)
                                    <p data-toggle="tooltip" data-placement="top" title="Click to edit">{{$approximate_word}}</p>
                                @else
                                    <p data-toggle="tooltip" data-placement="top" title="Click to edit">--</p>
                                @endif
                            @endforeach
                        </div>
                        @endif
                    </div>
                    <div id="page_list_edit">
                        <button type="button"style="background-color: #ffffff; position: absolute; top: 35px; right: 20px;" class="d-flex justify-content-end ml-auto btn btn-secondary" data-toggle="modal" data-target="#pageListEditModal{{$web_content->id}}"><i class="fa fa-edit" style="font-size: 16px;"></i></button>
                    </div>
                    @include('service-type.modal.web-content.page_list_edit_modal')
                </div>
            </div>

            <div class="card mb-2">
                <div class="card-body">
                    <h6 class="card-title mb-3">Demographic Information</h6>
                    <div class="row">
                        <div class="col-4">
                            <p>Gender</p>
                        </div>
                        @if($sales_web_content && $sales_web_content->gender != null)
                        <div class="col-8">
                            <p>{{$sales_web_content->gender}}</p>
                        </div>
                        @else
                        <div class="col-8" id="demogaphic_info_value" onclick="toggleDemographicInformationEdit()">
                            <p data-toggle="tooltip" data-placement="top" title="Click to edit">{{$web_content->gender}}</p>
                        </div>
                        @endif
                        <div class="col-4">
                            <p>Age</p>
                        </div>
                        @if ($sales_web_content && $sales_web_content->age1 && $sales_web_content->age2 != null)
                        <div class="col-8">
                            @if ($sales_web_content->age1 && $sales_web_content->age2)
                                <button id="age1_age2_btn" type="button" style="background-color: #ffffff">{{$sales_web_content->age1}} - {{$sales_web_content->age2}}</button>
                            @else
                                <button type="button" id="age1_age2_btn" style="background-color: #ffffff">--</button>
                            @endif
                        </div>
                        @else
                        <div class="col-8" id="demogaphic_info_value" onclick="toggleDemographicInformationEdit()">
                            @if ($web_content && $web_content->age1 && $web_content->age2)
                                <button id="age1_age2_btn" type="button" style="background-color: #ffffff" data-toggle="tooltip" data-placement="top" title="Click to edit">{{$web_content->age1}} - {{$web_content->age2}}</button>
                            @else
                                <button type="button" id="age1_age2_btn" style="background-color: #ffffff" data-toggle="tooltip" data-placement="top" title="Click to edit">--</button>
                            @endif
                        </div>
                        @endif
                        <div class="col-4">
                            <p>Monthly Income</p>
                        </div>
                        @if($sales_web_content && $sales_web_content->monthly_income != null)
                        <div class="col-8">
                           <p>{{$sales_web_content->monthly_income}}</p>
                        </div>
                        @else
                        <div class="col-8" id="demogaphic_info_value" onclick="toggleDemographicInformationEdit()">
                            <div id="monthly_income_container">
                                @if($web_content && $web_content->monthly_income)
                                <button id="monthly_income_btn" type="button" style="background-color: #ffffff" data-toggle="tooltip" data-placement="top" title="Click to edit"> {{$web_content->monthly_income}}$</button>
                                @else
                                <button type="button" id="monthly_income_btn" style="background-color: #ffffff" data-toggle="tooltip" data-placement="top" title="Click to edit">--</button>
                                @endif
                            </div>
                        </div>
                        @endif
                        <div class="col-4">
                            <p>Education Level</p>
                        </div>
                        @if($sales_web_content && $sales_web_content->education_level != null)
                        <div class="col-8">
                            <p>{{$sales_web_content->education_level}}</p>
                        </div>
                        @else
                        <div class="col-8" id="demogaphic_info_value" onclick="toggleDemographicInformationEdit()">
                            <div id="education_level_container">
                                @if($web_content && $web_content->education_level)
                                <button id="education_level_btn" type="button" style="background-color: #ffffff" data-toggle="tooltip" data-placement="top" title="Click to edit"> {{$web_content->education_level}}</button>
                                @else
                                <button type="button" id="education_level_btn" style="background-color: #ffffff" data-toggle="tooltip" data-placement="top" title="Click to edit">--</button>
                                @endif
                            </div>
                        </div>
                        @endif
                    </div>
                    <div id="demogaphic_info_edit">
                        <button type="button" style="background-color: #ffffff; position: absolute; top: 35px; right: 20px;" class="d-flex justify-content-end ml-auto btn btn-secondary" data-toggle="modal" data-target="#demogaphic_info_edit_modal"><i class="fa fa-edit" style="font-size: 16px;"></i></button>
                    </div>
                    @include('service-type.modal.web-content.demogaphic_info_edit_modal')
                </div>
            </div>
            <div class="card mb-2">
                <div class="card-body">
                    <h6 class="card-title mb-3">Geographic Location</h6>
                    <div class="row">
                        <div class="col-4">
                            <p>Country</p>
                        </div>
                        <div class="col-8">
                            <div id="country_container">
                                @if($sales_web_content && $sales_web_content->country != null)
                                <p>{{$sales_web_content->country}}</p>
                                @else
                                @if($web_content && $web_content->country)
                                <button id="country_btn" type="button" style="background-color: #ffffff" onclick="togglecountryBtton()" data-toggle="tooltip" data-placement="top" title="Click to edit"> {{$web_content->country}}</button>
                                @else
                                <button type="button" id="country_btn" style="background-color: #ffffff" onclick="togglecountryBtton()" data-toggle="tooltip" data-placement="top" title="Click to edit">--</button>
                                @endif
                                @endif
                            </div>

                            <div id="country_form">
                                @if($web_content->country)
                                <form action="" method="post">
                                    @csrf
                                    <div class="input-group" id="input_country" style="display: none; margin-top: -10px;">
                                        <input type="text" id="country" value="{{$web_content->country}}" name="country" class="form-control height-35 f-14" aria-label="Recipient's username" aria-describedby="saveButton" placeholder="Type your country">
                                        <div class="input-group-append">
                                            <button class="btn btn-outline-secondary savecountryBtn" type="button" id="saveButton" data-id="{{$web_content->id}}"><i class="fa-solid fa-check"></i></button>
                                        </div>
                                    </div>
                                    <span id="country_error" class="text-danger"></span><br>
                                    @else
                                    <div class="input-group" id="input_country" style="display: none; margin-top: -10px;">
                                        <input type="text" id="country" value="{{$web_content->country}}" name="country" class="form-control height-35 f-14" aria-label="Recipient's username" aria-describedby="saveButton" placeholder="Type your country">
                                        <div class="input-group-append">
                                            <button class="btn btn-outline-secondary savecountryBtn" type="button" id="saveButton" data-id="{{$web_content->id}}"><i class="fa-solid fa-check"></i></button>
                                        </div>
                                    </div>
                                    <span id="country_error" class="text-danger"></span><br>
                                </form>
                                @endif
                            </div>
                        </div>
                        <div class="col-4">
                            <p>City</p>
                        </div>
                        <div class="col-8">
                            <div id="city_container">
                                @if($sales_web_content && $sales_web_content->city != null)
                                <p>{{$sales_web_content->city}}</p>
                                @else
                                @if($web_content && $web_content->city)
                                <button id="city_btn" type="button" style="background-color: #ffffff" onclick="togglecityBtton()" data-toggle="tooltip" data-placement="top" title="Click to edit"> {{$web_content->city}}</button>
                                @else
                                <button type="button" id="city_btn" style="background-color: #ffffff" onclick="togglecityBtton()" data-toggle="tooltip" data-placement="top" title="Click to edit">--</button>
                                @endif
                                @endif
                            </div>

                            <div id="city_form">
                                @if($web_content->city)
                                <form action="" method="post">
                                    @csrf
                                    <div class="input-group" id="input_city" style="display: none; margin-top: -10px;">
                                        <input type="text" id="city" value="{{$web_content->city}}" name="city" class="form-control height-35 f-14" aria-label="Recipient's username" aria-describedby="saveButton" placeholder="Type your city">
                                        <div class="input-group-append">
                                            <button class="btn btn-outline-secondary savecityBtn" type="button" id="saveButton" data-id="{{$web_content->id}}"><i class="fa-solid fa-check"></i></button>
                                        </div>
                                    </div>
                                    <span id="city_error" class="text-danger"></span><br>
                                    @else
                                    <div class="input-group" id="input_city" style="display: none; margin-top: -10px;">
                                        <input type="text" id="city" value="{{$web_content->city}}" name="city" class="form-control height-35 f-14" aria-label="Recipient's username" aria-describedby="saveButton" placeholder="Type your city">
                                        <div class="input-group-append">
                                            <button class="btn btn-outline-secondary savecityBtn" type="button" id="saveButton" data-id="{{$web_content->id}}"><i class="fa-solid fa-check"></i></button>
                                        </div>
                                    </div>
                                    <span id="city_error" class="text-danger"></span><br>
                                </form>
                                @endif
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="card mb-2">
                <div class="card-body">
                    <h6 class="card-title mb-3">Interests</h6>
                    <div class="row">
                        <div class="col-4">
                            <p>Write 1-2 lines about the interests and pain points of your target audience</p>
                        </div>
                        <div class="col-8">
                            <div id="interest_container">
                                @if($sales_web_content && $sales_web_content->interest != null)
                                <p>{{$sales_web_content->interest}}</p>
                                @else
                                @if($web_content && $web_content->interest)
                                <button id="interest_btn" type="button" class="text-left" style="background-color: #ffffff " onclick="toggleinterestBtton()" data-toggle="tooltip" data-placement="top" title="Click to edit"> {{$web_content->interest}}</button>
                                @else
                                <button type="button" id="interest_btn" class="text-left" style="background-color: #ffffff" onclick="toggleinterestBtton()" data-toggle="tooltip" data-placement="top" title="Click to edit">--</button>
                                @endif
                                @endif
                            </div>

                            <div id="interest_form">
                                @if($web_content->interest)
                                <form action="" method="post">
                                    @csrf
                                    <div class="input-group" id="input_interest" style="display: none; margin-top: -10px;">
                                        <textarea name="interest" class="form-control" id="interest" cols="3" rows="3" aria-label="Recipient's username" aria-describedby="saveButton">{!!$web_content->interest!!}</textarea>
                                        <div class="input-group-append">
                                            <button class="btn btn-outline-secondary saveinterestBtn" type="button" id="saveButton" data-id="{{$web_content->id}}"><i class="fa-solid fa-check"></i></button>
                                        </div>
                                    </div>
                                    <span id="interest_error" class="text-danger"></span><br>
                                    @else
                                    <div class="input-group" id="input_interest" style="display: none; margin-top: -10px;">
                                        <textarea name="interest" class="form-control" id="interest" cols="3" rows="3" aria-label="Recipient's username" aria-describedby="saveButton"></textarea>
                                        <div class="input-group-append">
                                            <button class="btn btn-outline-secondary saveinterestBtn" type="button" id="saveButton" data-id="{{$web_content->id}}"><i class="fa-solid fa-check"></i></button>
                                        </div>
                                    </div>
                                    <span id="interest_error" class="text-danger"></span><br>
                                </form>
                                @endif
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="card mb-2">
                <div class="card-body">
                    <h6 class="card-title mb-3">Buying Habits</h6>
                    <div class="row">
                        <div class="col-4">
                            <p>How does your client's target audience make purchasing decisions?</p>
                        </div>
                        <div class="col-8">
                            <div id="buying_habit1_container">
                                @if($sales_web_content && $sales_web_content->buying_habit1 != null)
                                <p>{{$sales_web_content->buying_habit1}}</p>
                                @else
                                @if($web_content && $web_content->buying_habit1)
                                <button id="buying_habit1_btn" type="button" class="text-left" style="background-color: #ffffff" onclick="togglebuying_habit1Btton()" data-toggle="tooltip" data-placement="top" title="Click to edit"> {{$web_content->buying_habit1}}</button>
                                @else
                                <button type="button" id="buying_habit1_btn" class="text-left" style="background-color: #ffffff" onclick="togglebuying_habit1Btton()" data-toggle="tooltip" data-placement="top" title="Click to edit">--</button>
                                @endif
                                @endif
                            </div>

                            <div id="buying_habit1_form">
                                @if($web_content->buying_habit1)
                                <form action="" method="post">
                                    @csrf
                                    <div class="input-group" id="input_buying_habit1" style="display: none; margin-top: -10px;">
                                        <textarea name="buying_habit1" class="form-control" id="buying_habit1" cols="3" rows="3" aria-label="Recipient's username" aria-describedby="saveButton">{!!$web_content->buying_habit1!!}</textarea>
                                        <div class="input-group-append">
                                            <button class="btn btn-outline-secondary saveBuying_habit1Btn" type="button" id="saveButton" data-id="{{$web_content->id}}"><i class="fa-solid fa-check"></i></button>
                                        </div>
                                    </div>
                                    <span id="buying_habit1_error" class="text-danger"></span><br>
                                    @else
                                    <div class="input-group" id="input_buying_habit1" style="display: none; margin-top: -10px;">
                                        <textarea name="buying_habit1" class="form-control" id="buying_habit1" cols="3" rows="3" aria-label="Recipient's username" aria-describedby="saveButton"></textarea>
                                        <div class="input-group-append">
                                            <button class="btn btn-outline-secondary saveBuying_habit1Btn" type="button" id="saveButton" data-id="{{$web_content->id}}"><i class="fa-solid fa-check"></i></button>
                                        </div>
                                    </div>
                                    <span id="buying_habit1_error" class="text-danger"></span><br>
                                </form>
                                @endif
                            </div>
                        </div>
                        <div class="col-4">
                            <p>Do they shop online or in-store?</p>
                        </div>
                        <div class="col-8">
                            <div id="buying_habit2_container">
                                @if($sales_web_content && $sales_web_content->buying_habit2 != null)
                                <p>{{$sales_web_content->buying_habit2}}</p>
                                @else
                                @if($web_content && $web_content->buying_habit2)
                                <button id="buying_habit2_btn" type="button" class="text-left" style="background-color: #ffffff" onclick="togglebuying_habit2Btton()" data-toggle="tooltip" data-placement="top" title="Click to edit"> {{$web_content->buying_habit2}}</button>
                                @else
                                <button type="button" id="buying_habit2_btn" class="text-left" style="background-color: #ffffff" onclick="togglebuying_habit2Btton()" data-toggle="tooltip" data-placement="top" title="Click to edit">--</button>
                                @endif
                                @endif
                            </div>

                            <div id="buying_habit2_form">
                                @if($web_content->buying_habit2)
                                <form action="" method="post">
                                    @csrf
                                    <div class="input-group" id="input_buying_habit2" style="display: none; margin-top: -10px;">
                                        <textarea name="buying_habit2" class="form-control" id="buying_habit2" cols="3" rows="3" aria-label="Recipient's username" aria-describedby="saveButton">{!!$web_content->buying_habit2!!}</textarea>
                                        <div class="input-group-append">
                                            <button class="btn btn-outline-secondary saveBuying_habit2Btn" type="button" id="saveButton" data-id="{{$web_content->id}}"><i class="fa-solid fa-check"></i></button>
                                        </div>
                                    </div>
                                    <span id="buying_habit2_error" class="text-danger"></span><br>
                                    @else
                                    <div class="input-group" id="input_buying_habit2" style="display: none; margin-top: -10px;">
                                        <textarea name="buying_habit2" class="form-control" id="buying_habit2" cols="3" rows="3" aria-label="Recipient's username" aria-describedby="saveButton"></textarea>
                                        <div class="input-group-append">
                                            <button class="btn btn-outline-secondary saveBuying_habit2Btn" type="button" id="saveButton" data-id="{{$web_content->id}}"><i class="fa-solid fa-check"></i></button>
                                        </div>
                                    </div>
                                    <span id="buying_habit2_error" class="text-danger"></span><br>
                                </form>
                                @endif
                            </div>
                        </div>
                        <div class="col-4">
                            <p>What are their favorite brands?</p>
                        </div>
                        <div class="col-8">
                            <div id="buying_habit3_container">
                                @if($sales_web_content && $sales_web_content->buying_habit3 != null)
                                <p>{{$sales_web_content->buying_habit3}}</p>
                                @else
                                @if($web_content && $web_content->buying_habit3)
                                <button id="buying_habit3_btn" type="button" class="text-left" style="background-color: #ffffff" onclick="togglebuying_habit3Btton()" data-toggle="tooltip" data-placement="top" title="Click to edit"> {{$web_content->buying_habit3}}</button>
                                @else
                                <button type="button" id="buying_habit3_btn" class="text-left" style="background-color: #ffffff" onclick="togglebuying_habit3Btton()" data-toggle="tooltip" data-placement="top" title="Click to edit">--</button>
                                @endif
                                @endif
                            </div>

                            <div id="buying_habit3_form">
                                @if($web_content->buying_habit3)
                                <form action="" method="post">
                                    @csrf
                                    <div class="input-group" id="input_buying_habit3" style="display: none; margin-top: -10px;">
                                        <textarea name="buying_habit3" class="form-control" id="buying_habit3" cols="3" rows="3" aria-label="Recipient's username" aria-describedby="saveButton">{!!$web_content->buying_habit3!!}</textarea>
                                        <div class="input-group-append">
                                            <button class="btn btn-outline-secondary saveBuying_habit3Btn" type="button" id="saveButton" data-id="{{$web_content->id}}"><i class="fa-solid fa-check"></i></button>
                                        </div>
                                    </div>
                                    <span id="buying_habit3_error" class="text-danger"></span><br>
                                    @else
                                    <div class="input-group" id="input_buying_habit3" style="display: none; margin-top: -10px;">
                                        <textarea name="buying_habit3" class="form-control" id="buying_habit3" cols="3" rows="3" aria-label="Recipient's username" aria-describedby="saveButton"></textarea>
                                        <div class="input-group-append">
                                            <button class="btn btn-outline-secondary saveBuying_habit3Btn" type="button" id="saveButton" data-id="{{$web_content->id}}"><i class="fa-solid fa-check"></i></button>
                                        </div>
                                    </div>
                                    <span id="buying_habit3_error" class="text-danger"></span><br>
                                </form>
                                @endif
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="card">
                <div class="card-body">
                    <h6 class="card-title">Thor Native Language</h6>
                    <div class="row">
                        <div class="col-4">
                            <p>What is their native language?</p>
                        </div>
                        <div class="col-8">
                            <div id="language_container">
                                @if($sales_web_content && $sales_web_content->language != null)
                                <p>{{$sales_web_content->language}}</p>
                                @else
                                @if($web_content && $web_content->language)
                                <button id="language_btn" type="button" class="text-left" style="background-color: #ffffff" onclick="toggleLanguageBtton()" data-toggle="tooltip" data-placement="top" title="Click to edit"> {{$web_content->language}}</button>
                                @else
                                <button type="button" id="language_btn" class="text-left" style="background-color: #ffffff" onclick="toggleLanguageBtton()" data-toggle="tooltip" data-placement="top" title="Click to edit">--</button>
                                @endif
                                @endif
                            </div>

                            <div id="language_form">
                                @if($web_content->language)
                                <form action="" method="post">
                                    @csrf
                                    <div class="input-group" id="input_language" style="display: none; margin-top: -10px;">
                                        <input type="text" id="language" value="{{$web_content->language}}" name="language" class="form-control height-35 f-14" aria-label="Recipient's username" aria-describedby="saveButton" placeholder="Type Your Business/Website Name">
                                        <div class="input-group-append">
                                            <button class="btn btn-outline-secondary saveLanguageBtn" type="button" id="saveButton" data-id="{{$web_content->id}}"><i class="fa-solid fa-check"></i></button>
                                        </div>
                                    </div>
                                    <span id="language_error" class="text-danger"></span><br>
                                    @else
                                    <div class="input-group" id="input_language" style="display: none; margin-top: -10px;">
                                        <input type="text" id="language" name="language" class="form-control height-35 f-14" aria-label="Recipient's username" aria-describedby="saveButton" placeholder="Type Your Business/Website Name">
                                        <div class="input-group-append">
                                            <button class="btn btn-outline-secondary saveLanguageBtn" type="button" id="saveButton" data-id="{{$web_content->id}}"><i class="fa-solid fa-check"></i></button>
                                        </div>
                                    </div>
                                    <span id="language_error" class="text-danger"></span><br>
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
    @if ($sales_web_content !=null && $sales_web_content->status == 'submitted')
        @if (Auth::user()->role_id == 4 || Auth::user()->role_id == 1)
            <div class="row">
                <div class="col-12">
                    <div class="card mb-5 mt-3" style="border: none">
                        <h4 class="text-center my-3">Fields Needed to be Filled by Project Manager ({{ $pm->name }})</h4>
                        <div class="card-body">
                            <form action="" method="post" id="pm_form">
                                @csrf
                                <input type="hidden" name="sales_web_content_id" id="sales_web_content_id" value="{{ $sales_web_content->id }}">
                                <input type="hidden" name="deal_id" id="deal_id" value="{{ $sales_web_content->deal_id }}">
                                <input type="hidden" name="milestone_id" id="milestone_id" value="{{ $sales_web_content->milestone_id }}">
                                @if ($webContent !=null && $webContent->submitted_by ==4)
                                    <div class="row mt-3">
                                        <div class="col-md-4">
                                            <h6>Website Link & Niche:</h6>
                                        </div>
                                        <div class="col-md-8">
                                            <div class="row">
                                                <div class="col-md-6">
                                                    <input type="url" name="website_link2" id="website_link2" value="{{ $webContent->website_link }}" class="form-control placeholderText height-35 f-14" placeholder="https://asdasd.com or https://www.asdasd.com">
                                                </div>
                                                <div class="col-md-6">
                                                    <input type="text" name="website_niche2" id="website_niche2" value="{{ $webContent->website_niche }}" class="form-control placeholderText height-35 f-14" placeholder="Write Your Niche (Pet Care, Digital Marketing)">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <!-- Website Link & Niche Ends Here -->
                                    <!-- Website Name/Business Name -->
                                    <div class="row mt-3">
                                        <div class="col-md-4">
                                            <h6>Website Name/Business Name:</h6>
                                        </div>
                                        <div class="col-md-8">
                                            <input type="text" name="website_name2" id="website_name2" value="{{ $webContent->website_name }}" class="form-control placeholderText height-35 f-14" placeholder="Type Your Business/Website Name">
                                        </div>
                                    </div>
                                    <div class="row mt-3">
                                        <div class="col-md-4">
                                            <h6>Business profile/Leaflet/Brochure/Any important information:</h6>
                                        </div>
                                        <div class="col-md-8">
                                            <div class="row">
                                                <div class="col-md-6">
                                                    <textarea name="business_information2" id="business_information2" cols="3" rows="3" class="form-control placeholderText" placeholder="Put some details about your company here!">{!! $webContent->business_information !!}</textarea>
                                                </div>
                                                <div class="col-md-6">
                                                    <div class="form-group">
                                                        <label for="">Want to share file?</label>
                                                        <div class="mt-2 d-flex">
                                                            <div class="form-check">
                                                                <input class="form-check-input" type="radio" name="share_file" value="1" id="share_file_info_yesBtn" {{ ($webContent->share_file_info=="1")? "checked" : "" }}>
                                                                <label class="form-check-label mt-1 ml-1" for="share_file_info_yesBtn">
                                                                    Yes
                                                                </label>
                                                            </div>
                                                            <div class="form-check" style="margin-left: 10px;">
                                                                <input class="form-check-input" type="radio" name="share_file" value="0" id="share_file_info_noBtn" {{ ($webContent->share_file_info=="0")? "checked" : "" }}>
                                                                <label class="form-check-label mt-1 ml-1" for="share_file_info_noBtn">
                                                                    No
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            @if ($webContent!=null && $webContent->share_file_info==1)
                                                @php
                                                    if (is_string($webContent->folder_link) && is_array(json_decode($webContent->folder_link, true))) {
                                                        $array = json_decode($webContent->folder_link, true);
                                                        $folder_links = implode(', ', $array);
                                                    }
                                                    $folder_links_array = explode(', ', $folder_links);
                                                @endphp
                                                @foreach ($folder_links_array as $folder_link)
                                                <div class="row mt-3" id="shareFolderLinkForm">
                                                    <div class="col-md-10 dynamic-folderLink" id="dynamic-folderLink-list-1">
                                                        <div class="row mb-3">
                                                            <div class="col-md-12">
                                                                <input type="text" name="folder_link2[]" value="{{ $folder_link }}" id="folder_link2" class="form-control placeholderText height-35 f-14" placeholder="Enter google doc or sheet file or drive folder link here">
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-2 append-buttons">
                                                        <div class="clearfix">
                                                            <button type="button" id="add-folder" class="btn btn-primary float-left text-uppercase shadow-sm"><i class="fa fa-plus fa-fw"></i></button>
                                                            <button type="button" id="remove-folder" class="btn btn-secondary float-left text-uppercase ml-1" disabled="disabled"><i class="fa fa-minus fa-fw"></i></button>
                                                        </div>
                                                    </div>
                                                </div>
                                                @endforeach
                                            @else
                                            <div class="row mt-3" id="shareFolderLinkForm" style="display: none;">
                                                <div class="col-md-10 dynamic-folderLink" id="dynamic-folderLink-list-1">
                                                    <div class="row mb-3">
                                                        <div class="col-md-12">
                                                            <input type="text" name="folder_link2[]" id="folder_link2" class="form-control placeholderText height-35 f-14" placeholder="Enter google doc or sheet file or drive folder link here">
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-md-2 append-buttons">
                                                    <div class="clearfix">
                                                        <button type="button" id="add-folder" class="btn btn-primary float-left text-uppercase shadow-sm"><i class="fa fa-plus fa-fw"></i></button>
                                                        <button type="button" id="remove-folder" class="btn btn-secondary float-left text-uppercase ml-1" disabled="disabled"><i class="fa fa-minus fa-fw"></i></button>
                                                    </div>
                                                </div>
                                            </div>
                                            @endif
                                        </div>
                                    </div>

                                    <!--Reference Blogs-->
                                    @php
                                        if (is_string($webContent->reference_website) && is_array(json_decode($webContent->reference_website, true))) {
                                            $array = json_decode($webContent->reference_website, true);
                                            $reference_websites = implode(', ', $array);
                                        }
                                        $reference_websites_array = explode(', ', $reference_websites);
                                    @endphp
                                    <div class="row mt-3">
                                        <div class="col-md-10 dynamic-product" id="dynamic-product-list-1">
                                            @if ($reference_websites_array !=null)
                                            @foreach ($reference_websites_array as $item)
                                            <div class="row mb-3">
                                                <div class="col-md-4">
                                                    <h6>Competitors/Reference Website:</h6>
                                                </div>
                                                <div class="col-md-4">
                                                    <div class="form-group" style="margin-left: 90px;">
                                                        <input type="text" id="reference_website2" value="{{ $item }}" class="form-control placeholderText height-35 f-14" placeholder="Type your reference website" name="reference_website2[]"/>
                                                    </div>
                                                </div>
                                                <div class="col-md-4">
                                                    <div class="form-group">
                                                        <label for="">Does your competitor's content match exactly to what you do?</label>
                                                        <div class="mt-2 d-flex">
                                                            <div class="form-check">
                                                                <input class="form-check-input" type="radio" name="competitor_content2" value="1" id="competitor_content_yesBtn" {{ ($webContent->competitor_content=="1")? "checked" : "" }}>
                                                                <label class="form-check-label mt-1 ml-1" for="competitor_content_yesBtn">
                                                                    Yes
                                                                </label>
                                                            </div>
                                                            <div class="form-check" style="margin-left: 10px;">
                                                                <input class="form-check-input" type="radio" name="competitor_content2" value="0" id="competitor_content_noBtn" {{ ($webContent->competitor_content=="0")? "checked" : "" }}>
                                                                <label class="form-check-label mt-1 ml-1" for="competitor_content_noBtn">
                                                                    No
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            @endforeach
                                            @else
                                            <div class="row mb-3">
                                                <div class="col-md-4">
                                                    <h6>Competitors/Reference Website:</h6>
                                                </div>
                                                <div class="col-md-4">
                                                    <div class="form-group" style="margin-left: 90px;">
                                                        <input type="text" id="reference_website" class="form-control placeholderText height-35 f-14" placeholder="Type your reference website" name="reference_website2[]"/>
                                                    </div>
                                                </div>
                                                <div class="col-md-4">
                                                    <div class="form-group">
                                                        <label for="">Does your competitor's content match exactly to what you do?</label>
                                                        <div class="mt-2 d-flex">
                                                            <div class="form-check">
                                                                <input class="form-check-input" type="radio" name="competitor_content2" value="1" id="competitor_content_yesBtn" {{ ($webContent->competitor_content=="1")? "checked" : "" }}>
                                                                <label class="form-check-label mt-1 ml-1" for="competitor_content_yesBtn">
                                                                    Yes
                                                                </label>
                                                            </div>
                                                            <div class="form-check" style="margin-left: 10px;">
                                                                <input class="form-check-input" type="radio" name="competitor_content2" value="0" id="competitor_content_noBtn" {{ ($webContent->competitor_content=="0")? "checked" : "" }}>
                                                                <label class="form-check-label mt-1 ml-1" for="competitor_content_noBtn">
                                                                    No
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            @endif
                                            @if ($webContent !=null && $webContent->competitor_content==0)
                                                @php
                                                    if (is_string($webContent->description1) && is_array(json_decode($webContent->description1, true))) {
                                                        $array = json_decode($webContent->description1, true);
                                                        $description1 = implode(', ', $array);
                                                    }
                                                    $description1_array = explode(', ', $description1);

                                                    if (is_string($webContent->description2) && is_array(json_decode($webContent->description2, true))) {
                                                        $array = json_decode($webContent->description2, true);
                                                        $description2 = implode(', ', $array);
                                                    }
                                                    $description2_array = explode(', ', $description2);

                                                    if (is_string($webContent->description3) && is_array(json_decode($webContent->description3, true))) {
                                                        $array = json_decode($webContent->description3, true);
                                                        $description3 = implode(', ', $array);
                                                    }
                                                    $description3_array = explode(', ', $description3);
                                                @endphp
                                                @if ($description1_array || $description2_array || $description3_array)
                                                    <div class="row mt-3 mb-4" id="competitor_content_noForm">
                                                        <div class="col-md-4"></div>
                                                        <div class="col-md-8">
                                                            <div class="row" style="margin-left: 9%;">
                                                                @foreach ($description1_array as $description1)
                                                                <div class="col-md-4" style="margin-top: 23px;">
                                                                    <label class="form-label" for="">What are the major differences?</label>
                                                                    <textarea name="competitor_content_description1[]"  id="competitor_content_description1" rows="3" class="form-control placeholderText" placeholder="Type your input here">{!! $description1 !!}</textarea>
                                                                </div>
                                                                @endforeach
                                                                @foreach ($description2_array as $description2)
                                                                <div class="col-md-4">
                                                                    <label class="form-label" for="">What are things that they do, and you don't?</label>
                                                                    <textarea name="competitor_content_description2[]" id="competitor_content_description2"  rows="3" class="form-control placeholderText" placeholder="Type your input here">{!! $description2 !!}</textarea>
                                                                </div>
                                                                @endforeach
                                                                @foreach ($description3_array as $description3)
                                                                <div class="col-md-4">
                                                                    <label class="form-label" for="">What are things that they don't, and you do?</label>
                                                                    <textarea name="competitor_content_description3[]" id="competitor_content_description3" rows="3" class="form-control placeholderText" placeholder="Type your input here">{!! $description3 !!}</textarea>
                                                                </div>
                                                                @endforeach
                                                            </div>
                                                        </div>
                                                    </div>
                                                @else
                                                    <div class="row mt-3 mb-4" id="competitor_content_noForm" style="display: none;">
                                                        <div class="col-md-4"></div>
                                                        <div class="col-md-8">
                                                            <div class="row" style="margin-left: 9%;">
                                                                <div class="col-md-4" style="margin-top: 23px;">
                                                                    <label class="form-label" for="">What are the major differences?</label>
                                                                    <textarea name="competitor_content_description1[]" id="competitor_content_description1" rows="3" class="form-control placeholderText" placeholder="Type your input here"></textarea>
                                                                </div>

                                                                <div class="col-md-4">
                                                                    <label class="form-label" for="">What are things that they do, and you don't?</label>
                                                                    <textarea name="competitor_content_description2[]" id="competitor_content_description2"  rows="3" class="form-control placeholderText" placeholder="Type your input here"></textarea>
                                                                </div>
                                                                <div class="col-md-4">
                                                                    <label class="form-label" for="">What are things that they don't, and you do?</label>
                                                                    <textarea name="competitor_content_description3[]" id="competitor_content_description3" rows="3" class="form-control placeholderText" placeholder="Type your input here"></textarea>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                @endif
                                            @endif
                                        </div>
                                        <div class="col-md-2 append-buttons">
                                            <div class="clearfix">
                                                <button type="button" id="add-button" class="btn btn-primary float-left text-uppercase shadow-sm"><i class="fa fa-plus fa-fw"></i></button>
                                                <button type="button" id="remove-button" class="btn btn-secondary float-left text-uppercase ml-1" disabled="disabled"><i class="fa fa-minus fa-fw"></i></button>
                                            </div>
                                        </div>
                                    </div>
                                    <!--Product Description-->
                                    <div class="row mt-3">
                                        <div class="col-md-4">
                                            <h6>Service/Product list:</h6>
                                        </div>
                                        <div class="col-md-8">
                                            <div class="form-group">
                                                <input type="text" id="product_list1" value="{{ $webContent->product_list }}" class="form-control placeholderText height-35 f-14" placeholder="Type your page or product name" name="product_list1"/>
                                            </div>
                                        </div>
                                    </div>
                                    <!--Product list-->
                                    @php
                                        if (is_string($webContent->page_name) && is_array(json_decode($webContent->page_name, true))) {
                                            $array = json_decode($webContent->page_name, true);
                                            $page_names = implode(', ', $array);
                                        }
                                        $page_name_array = explode(', ', $page_names);

                                        if (is_string($webContent->quantitys) && is_array(json_decode($webContent->quantitys, true))) {
                                            $array = json_decode($webContent->quantitys, true);
                                            $quantitys = implode(', ', $array);
                                        }
                                        $quantity_array = explode(', ', $quantitys);

                                        if (is_string($webContent->approximate_word) && is_array(json_decode($webContent->approximate_word, true))) {
                                            $array = json_decode($webContent->approximate_word, true);
                                            $approximate_words = implode(', ', $array);
                                        }
                                        $approximate_word_array = explode(', ', $approximate_words);
                                    @endphp
                                    @if ($page_name_array !=null || $quantity_array !=null || $approximate_word_array !=null)
                                    <div class="row mt-4">
                                        <div class="col-md-11 dynamic-page" id="dynamic-page-list-1">
                                            <div class="row mb-4">
                                                <div class="col-md-3" style="margin-top: 22px;">
                                                    <h6>Pages list:</h6>
                                                </div>
                                                @foreach ($page_name_array as $page_name)
                                                <div class="col-md-3" style="margin-left: 11%">
                                                    <div class="form-group">
                                                        <label for="">Type Page name</label>
                                                        <input type="text" name="page_name1[]" value="{{ $page_name }}" id="page_name1" class="form-control placeholderText height-35 f-14" placeholder="Type page name">
                                                    </div>
                                                </div>
                                                @endforeach
                                                @foreach ($quantity_array as $quantity)
                                                <div class="col-md-2">
                                                    <label for="">Quantity</label>
                                                    <input type="number" name="quantity1[]" value="{{ $quantity }}" id="quantity1" class="form-control placeholderText height-35 f-14" placeholder="Type page quantity">
                                                </div>
                                                @endforeach
                                                @foreach ($approximate_word_array as $approximate_word)
                                                <div class="col-md-2">
                                                    <label for="">Approximate word count per page</label>
                                                    <input type="text" name="approximate_word1[]" value="{{ $approximate_word }}" id="approximate_word1" class="form-control placeholderText height-35 f-14" placeholder="Approximate word count per page">
                                                </div>
                                                @endforeach
                                            </div>
                                        </div>
                                        <div class="col-md-1 append-buttons" style="margin-top: 22px;">
                                            <div class="clearfix">
                                                <button type="button" id="add-page-button" class="btn btn-primary float-left text-uppercase shadow-sm"><i class="fa fa-plus fa-fw"></i></button>
                                                <button type="button" id="remove-page-button" class="btn btn-secondary float-left text-uppercase ml-1" disabled="disabled"><i class="fa fa-minus fa-fw"></i></button>
                                            </div>
                                        </div>
                                    </div>
                                    @else
                                    <div class="row mt-4">
                                        <div class="col-md-11 dynamic-page" id="dynamic-page-list-1">
                                            <div class="row mb-4">
                                                <div class="col-md-3" style="margin-top: 22px;">
                                                    <h6>Pages list:</h6>
                                                </div>
                                                <div class="col-md-3" style="margin-left: 11%">
                                                    <div class="form-group">
                                                        <label for="">Type Page name</label>
                                                        <input type="text" name="page_name1[]" id="page_name1" class="form-control placeholderText height-35 f-14" placeholder="Type page name">
                                                    </div>
                                                </div>
                                                <div class="col-md-2">
                                                    <label for="">Quantity</label>
                                                    <input type="number" name="quantity1[]" id="quantity1" class="form-control placeholderText height-35 f-14" placeholder="Type page quantity">
                                                </div>
                                                <div class="col-md-2">
                                                    <label for="">Approximate word count per page</label>
                                                    <input type="text" name="approximate_word1[]" id="approximate_word1" class="form-control placeholderText height-35 f-14" placeholder="Approximate word count per page">
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-1 append-buttons" style="margin-top: 22px;">
                                            <div class="clearfix">
                                                <button type="button" id="add-page-button" class="btn btn-primary float-left text-uppercase shadow-sm"><i class="fa fa-plus fa-fw"></i></button>
                                                <button type="button" id="remove-page-button" class="btn btn-secondary float-left text-uppercase ml-1" disabled="disabled"><i class="fa fa-minus fa-fw"></i></button>
                                            </div>
                                        </div>
                                    </div>
                                    @endif

                                    <!--Keywords-->
                                    <div class="row mt-3">
                                        <div class="col-md-4">
                                            <h6 style="margin-top: 40px;">Target Audience:</h6>
                                        </div>
                                        <div class="col-md-2">
                                            <label for="">Gender</label>
                                            <select name="target_audience_gender" id="target_audience_gender" class="form-control height-35 f-14 placeholderText">
                                                <option value="">--</option>
                                                <option value="male" {{ ($webContent->gender=="Male")? "selected" : "" }}>Male</option>
                                                <option value="female" {{ ($webContent->gender=="Female")? "selected" : "" }}>Female</option>
                                            </select>
                                        </div>
                                        <div class="col-md-2">
                                            <label for="">Age (Put a Range)</label>
                                            <div class="row">
                                                <div class="col-md-6">
                                                    <input type="number" name="target_audience_age1" value="{{ $webContent->age1 }}" id="target_audience_age1" class="form-control placeholderText height-35 f-14" placeholder="18">
                                                </div>
                                                <div class="col-md-6">
                                                    <input type="number" name="target_audience_age2" value="{{ $webContent->age2 }}" id="target_audience_age2" class="form-control placeholderText height-35 f-14" placeholder="25 ">
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-2">
                                            <label for="">Monthly Income (in USD)</label>
                                            <input type="text" name="monthly_income1" value="{{ $webContent->monthly_income }}" id="monthly_income1" class="form-control placeholderText height-35 f-14" placeholder="$">
                                        </div>
                                        <div class="col-md-2">
                                            <label for="">Education Level</label>
                                            <input type="text" name="education_level1" value="{{ $webContent->education_level }}" id="education_level1" class="form-control placeholderText height-35 f-14" placeholder="Education Level">
                                        </div>
                                    </div>
                                    <div class="row mt-3">
                                        <div class="col-md-4">
                                            <h6 style="margin-top: 40px;">Geographic Location :</h6>
                                        </div>
                                        <div class="col-md-4">
                                            <label for="">Country</label>
                                            <input type="text" name="country1" id="country1" value="{{ $webContent->country }}" class="form-control placeholderText height-35 f-14" placeholder="Type your country">
                                        </div>
                                        <div class="col-md-4">
                                            <label for="">City</label>
                                            <input type="text" name="city1" id="city1" value="{{ $webContent->city }}" class="form-control placeholderText height-35 f-14" placeholder="Type your city">
                                        </div>
                                    </div>
                                    <div class="row mt-3">
                                        <div class="col-md-4">
                                            <h6 style="margin-top: 40px;">Interests :</h6>
                                        </div>
                                        <div class="col-md-8">
                                            <label for="">Write 1-2 lines about the interests and pain points of your target audience</label>
                                            <textarea name="interest1" id="interest1" rows="5" class="form-control placeholderText">{!! $webContent->interest !!}</textarea>
                                        </div>
                                    </div>
                                    <div class="row mt-3">
                                        <div class="col-md-4">
                                            <h6 style="margin-top: 40px;">Buying Habits</h6>
                                        </div>
                                        <div class="col-md-8">
                                            <div class="row">
                                                <div class="col-md-4">
                                                    <label for="">How does your client's target audience make purchasing decisions?</label>
                                                    <textarea name="interest_buying_habit1" id="interest_buying_habit1" rows="5" class="form-control">{!! $webContent->buying_habit1 !!}</textarea>
                                                </div>
                                                <div class="col-md-4" style="margin-top: 20px;">
                                                    <label for="">Do they shop online or in-store?</label>
                                                    <textarea name="interest_buying_habit2" id="interest_buying_habit2" rows="5" class="form-control">{!! $webContent->buying_habit2 !!}</textarea>
                                                </div>
                                                <div class="col-md-4" style="margin-top: 20px;">
                                                    <label for="">What are their favorite brands?</label>
                                                    <textarea name="interest_buying_habit3" id="interest_buying_habit3" rows="5" class="form-control">{!! $webContent->buying_habit3 !!}</textarea>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row mt-3">
                                        <div class="col-md-4">
                                            <h6 style="margin-top: 40px;">Thor Native Language</h6>
                                        </div>
                                        <div class="col-md-8">
                                            <label for="">What is their native language?</label>
                                            <input type="text" name="thor_native_language" id="thor_native_language" value="{{ $webContent->language }}" class="form-control placeholderText height-35 f-14" placeholder="Type your language">
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
                                    <div class="row mt-3">
                                        <div class="col-md-4">
                                            <h6>Website Link & Niche:</h6>
                                        </div>
                                        <div class="col-md-8">
                                            <div class="row">
                                                <div class="col-md-6">
                                                    <input type="url" name="website_link2" id="website_link2" value="{{ $sales_web_content->website_link }}" class="form-control placeholderText height-35 f-14" placeholder="https://asdasd.com or https://www.asdasd.com">
                                                </div>
                                                <div class="col-md-6">
                                                    <input type="text" name="website_niche2" id="website_niche2" value="{{ $sales_web_content->website_niche }}" class="form-control placeholderText height-35 f-14" placeholder="Write Your Niche (Pet Care, Digital Marketing)">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <!-- Website Link & Niche Ends Here -->
                                    <!-- Website Name/Business Name -->
                                    <div class="row mt-3">
                                        <div class="col-md-4">
                                            <h6>Website Name/Business Name:</h6>
                                        </div>
                                        <div class="col-md-8">
                                            <input type="text" name="website_name2" id="website_name2" value="{{ $sales_web_content->website_name }}" class="form-control placeholderText height-35 f-14" placeholder="Type Your Business/Website Name">
                                        </div>
                                    </div>
                                    <div class="row mt-3">
                                        <div class="col-md-4">
                                            <h6>Business profile/Leaflet/Brochure/Any important information:</h6>
                                        </div>
                                        <div class="col-md-8">
                                            <div class="row">
                                                <div class="col-md-6">
                                                    <textarea name="business_information2" id="business_information2" cols="3" rows="3" class="form-control placeholderText" placeholder="Put some details about your company here!">{!! $sales_web_content->business_information !!}</textarea>
                                                </div>
                                                <div class="col-md-6">
                                                    <div class="form-group">
                                                        <label for="">Want to share file?</label>
                                                        <div class="mt-2 d-flex">
                                                            <div class="form-check">
                                                                <input class="form-check-input" type="radio" name="share_file" value="1" id="share_file_info_yesBtn" {{ ($sales_web_content->share_file_info=="1")? "checked" : "" }}>
                                                                <label class="form-check-label mt-1 ml-1" for="share_file_info_yesBtn">
                                                                    Yes
                                                                </label>
                                                            </div>
                                                            <div class="form-check" style="margin-left: 10px;">
                                                                <input class="form-check-input" type="radio" name="share_file" value="0" id="share_file_info_noBtn" {{ ($sales_web_content->share_file_info=="0")? "checked" : "" }}>
                                                                <label class="form-check-label mt-1 ml-1" for="share_file_info_noBtn">
                                                                    No
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            @if ($sales_web_content!=null && $sales_web_content->share_file_info==1)
                                                @php
                                                    if (is_string($sales_web_content->folder_link) && is_array(json_decode($sales_web_content->folder_link, true))) {
                                                        $array = json_decode($sales_web_content->folder_link, true);
                                                        $folder_links = implode(', ', $array);
                                                    }
                                                    $folder_links_array = explode(', ', $folder_links);
                                                @endphp
                                                @foreach ($folder_links_array as $folder_link)
                                                <div class="row mt-3" id="shareFolderLinkForm">
                                                    <div class="col-md-10 dynamic-folderLink" id="dynamic-folderLink-list-1">
                                                        <div class="row mb-3">
                                                            <div class="col-md-12">
                                                                <input type="text" name="folder_link2[]" value="{{ $folder_link }}" id="folder_link2" class="form-control placeholderText height-35 f-14" placeholder="Enter google doc or sheet file or drive folder link here">
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-2 append-buttons">
                                                        <div class="clearfix">
                                                            <button type="button" id="add-folder" class="btn btn-primary float-left text-uppercase shadow-sm"><i class="fa fa-plus fa-fw"></i></button>
                                                            <button type="button" id="remove-folder" class="btn btn-secondary float-left text-uppercase ml-1" disabled="disabled"><i class="fa fa-minus fa-fw"></i></button>
                                                        </div>
                                                    </div>
                                                </div>
                                                @endforeach
                                            @else
                                            <div class="row mt-3" id="shareFolderLinkForm" style="display: none;">
                                                <div class="col-md-10 dynamic-folderLink" id="dynamic-folderLink-list-1">
                                                    <div class="row mb-3">
                                                        <div class="col-md-12">
                                                            <input type="text" name="folder_link2[]" id="folder_link2" class="form-control placeholderText height-35 f-14" placeholder="Enter google doc or sheet file or drive folder link here">
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-md-2 append-buttons">
                                                    <div class="clearfix">
                                                        <button type="button" id="add-folder" class="btn btn-primary float-left text-uppercase shadow-sm"><i class="fa fa-plus fa-fw"></i></button>
                                                        <button type="button" id="remove-folder" class="btn btn-secondary float-left text-uppercase ml-1" disabled="disabled"><i class="fa fa-minus fa-fw"></i></button>
                                                    </div>
                                                </div>
                                            </div>
                                            @endif
                                        </div>
                                    </div>

                                    <!--Reference Blogs-->
                                    @php
                                        if (is_string($sales_web_content->reference_website) && is_array(json_decode($sales_web_content->reference_website, true))) {
                                            $array = json_decode($sales_web_content->reference_website, true);
                                            $reference_websites = implode(', ', $array);
                                        }
                                        $reference_websites_array = explode(', ', $reference_websites);
                                    @endphp
                                    <div class="row mt-3">
                                        <div class="col-md-10 dynamic-product" id="dynamic-product-list-1">
                                            @if ($reference_websites_array !=null)
                                            @foreach ($reference_websites_array as $item)
                                            <div class="row mb-3">
                                                <div class="col-md-4">
                                                    <h6>Competitors/Reference Website:</h6>
                                                </div>
                                                <div class="col-md-4">
                                                    <div class="form-group" style="margin-left: 90px;">
                                                        <input type="text" id="reference_website2" value="{{ $item }}" class="form-control placeholderText height-35 f-14" placeholder="Type your reference website" name="reference_website2[]"/>
                                                    </div>
                                                </div>
                                                <div class="col-md-4">
                                                    <div class="form-group">
                                                        <label for="">Does your competitor's content match exactly to what you do?</label>
                                                        <div class="mt-2 d-flex">
                                                            <div class="form-check">
                                                                <input class="form-check-input" type="radio" name="competitor_content2" value="1" id="competitor_content_yesBtn" {{ ($sales_web_content->competitor_content=="1")? "checked" : "" }}>
                                                                <label class="form-check-label mt-1 ml-1" for="competitor_content_yesBtn">
                                                                    Yes
                                                                </label>
                                                            </div>
                                                            <div class="form-check" style="margin-left: 10px;">
                                                                <input class="form-check-input" type="radio" name="competitor_content2" value="0" id="competitor_content_noBtn" {{ ($sales_web_content->competitor_content=="0")? "checked" : "" }}>
                                                                <label class="form-check-label mt-1 ml-1" for="competitor_content_noBtn">
                                                                    No
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            @endforeach
                                            @else
                                            <div class="row mb-3">
                                                <div class="col-md-4">
                                                    <h6>Competitors/Reference Website:</h6>
                                                </div>
                                                <div class="col-md-4">
                                                    <div class="form-group" style="margin-left: 90px;">
                                                        <input type="text" id="reference_website" class="form-control placeholderText height-35 f-14" placeholder="Type your reference website" name="reference_website2[]"/>
                                                    </div>
                                                </div>
                                                <div class="col-md-4">
                                                    <div class="form-group">
                                                        <label for="">Does your competitor's content match exactly to what you do?</label>
                                                        <div class="mt-2 d-flex">
                                                            <div class="form-check">
                                                                <input class="form-check-input" type="radio" name="competitor_content2" value="1" id="competitor_content_yesBtn" {{ ($sales_web_content->competitor_content=="1")? "checked" : "" }}>
                                                                <label class="form-check-label mt-1 ml-1" for="competitor_content_yesBtn">
                                                                    Yes
                                                                </label>
                                                            </div>
                                                            <div class="form-check" style="margin-left: 10px;">
                                                                <input class="form-check-input" type="radio" name="competitor_content2" value="0" id="competitor_content_noBtn" {{ ($sales_web_content->competitor_content=="0")? "checked" : "" }}>
                                                                <label class="form-check-label mt-1 ml-1" for="competitor_content_noBtn">
                                                                    No
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            @endif
                                            @if ($sales_web_content !=null && $sales_web_content->competitor_content==0)
                                                @php
                                                    if (is_string($sales_web_content->description1) && is_array(json_decode($sales_web_content->description1, true))) {
                                                        $array = json_decode($sales_web_content->description1, true);
                                                        $description1 = implode(', ', $array);
                                                    }
                                                    $description1_array = explode(', ', $description1);

                                                    if (is_string($sales_web_content->description2) && is_array(json_decode($sales_web_content->description2, true))) {
                                                        $array = json_decode($sales_web_content->description2, true);
                                                        $description2 = implode(', ', $array);
                                                    }
                                                    $description2_array = explode(', ', $description2);

                                                    if (is_string($sales_web_content->description3) && is_array(json_decode($sales_web_content->description3, true))) {
                                                        $array = json_decode($sales_web_content->description3, true);
                                                        $description3 = implode(', ', $array);
                                                    }
                                                    $description3_array = explode(', ', $description3);
                                                @endphp
                                                @if ($description1_array || $description2_array || $description3_array)
                                                    <div class="row mt-3 mb-4" id="competitor_content_noForm">
                                                        <div class="col-md-4"></div>
                                                        <div class="col-md-8">
                                                            <div class="row" style="margin-left: 9%;">
                                                                @foreach ($description1_array as $description1)
                                                                <div class="col-md-4" style="margin-top: 23px;">
                                                                    <label class="form-label" for="">What are the major differences?</label>
                                                                    <textarea name="competitor_content_description1[]"  id="competitor_content_description1" rows="3" class="form-control placeholderText" placeholder="Type your input here">{!! $description1 !!}</textarea>
                                                                </div>
                                                                @endforeach
                                                                @foreach ($description2_array as $description2)
                                                                <div class="col-md-4">
                                                                    <label class="form-label" for="">What are things that they do, and you don't?</label>
                                                                    <textarea name="competitor_content_description2[]" id="competitor_content_description2"  rows="3" class="form-control placeholderText" placeholder="Type your input here">{!! $description2 !!}</textarea>
                                                                </div>
                                                                @endforeach
                                                                @foreach ($description3_array as $description3)
                                                                <div class="col-md-4">
                                                                    <label class="form-label" for="">What are things that they don't, and you do?</label>
                                                                    <textarea name="competitor_content_description3[]" id="competitor_content_description3" rows="3" class="form-control placeholderText" placeholder="Type your input here">{!! $description3 !!}</textarea>
                                                                </div>
                                                                @endforeach
                                                            </div>
                                                        </div>
                                                    </div>
                                                @else
                                                    <div class="row mt-3 mb-4" id="competitor_content_noForm" style="display: none;">
                                                        <div class="col-md-4"></div>
                                                        <div class="col-md-8">
                                                            <div class="row" style="margin-left: 9%;">
                                                                <div class="col-md-4" style="margin-top: 23px;">
                                                                    <label class="form-label" for="">What are the major differences?</label>
                                                                    <textarea name="competitor_content_description1[]" id="competitor_content_description1" rows="3" class="form-control placeholderText" placeholder="Type your input here"></textarea>
                                                                </div>

                                                                <div class="col-md-4">
                                                                    <label class="form-label" for="">What are things that they do, and you don't?</label>
                                                                    <textarea name="competitor_content_description2[]" id="competitor_content_description2"  rows="3" class="form-control placeholderText" placeholder="Type your input here"></textarea>
                                                                </div>
                                                                <div class="col-md-4">
                                                                    <label class="form-label" for="">What are things that they don't, and you do?</label>
                                                                    <textarea name="competitor_content_description3[]" id="competitor_content_description3" rows="3" class="form-control placeholderText" placeholder="Type your input here"></textarea>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                @endif
                                            @endif
                                        </div>
                                        <div class="col-md-2 append-buttons">
                                            <div class="clearfix">
                                                <button type="button" id="add-button" class="btn btn-primary float-left text-uppercase shadow-sm"><i class="fa fa-plus fa-fw"></i></button>
                                                <button type="button" id="remove-button" class="btn btn-secondary float-left text-uppercase ml-1" disabled="disabled"><i class="fa fa-minus fa-fw"></i></button>
                                            </div>
                                        </div>
                                    </div>
                                    <!--Product Description-->
                                    <div class="row mt-3">
                                        <div class="col-md-4">
                                            <h6>Service/Product list:</h6>
                                        </div>
                                        <div class="col-md-8">
                                            <div class="form-group">
                                                <input type="text" id="product_list1" value="{{ $sales_web_content->product_list }}" class="form-control placeholderText height-35 f-14" placeholder="Type your page or product name" name="product_list1"/>
                                            </div>
                                        </div>
                                    </div>
                                    <!--Product list-->
                                    @php
                                        $page_names = '';
                                        $quantitys = '';
                                        $approximate_words = '';
                                        if (is_string($sales_web_content->page_name) && is_array(json_decode($sales_web_content->page_name, true))) {
                                            $array = json_decode($sales_web_content->page_name, true);
                                            $page_names = implode(', ', $array);
                                        }
                                        $page_name_array = explode(', ', $page_names);

                                        if (is_string($sales_web_content->quantitys) && is_array(json_decode($sales_web_content->quantitys, true))) {
                                            $array = json_decode($sales_web_content->quantitys, true);
                                            $quantitys = implode(', ', $array);
                                        }
                                        $quantity_array = explode(', ', $quantitys);

                                        if (is_string($sales_web_content->approximate_word) && is_array(json_decode($sales_web_content->approximate_word, true))) {
                                            $array = json_decode($sales_web_content->approximate_word, true);
                                            $approximate_words = implode(', ', $array);
                                        }
                                        $approximate_word_array = explode(', ', $approximate_words);
                                    @endphp
                                    @if ($page_name_array !=null || $quantity_array !=null || $approximate_word_array !=null)
                                    <div class="row mt-4">
                                        <div class="col-md-11 dynamic-page" id="dynamic-page-list-1">
                                            <div class="row mb-4">
                                                <div class="col-md-3" style="margin-top: 22px;">
                                                    <h6>Pages list:</h6>
                                                </div>
                                                @foreach ($page_name_array as $page_name)
                                                <div class="col-md-3" style="margin-left: 11%">
                                                    <div class="form-group">
                                                        <label for="">Type Page name</label>
                                                        <input type="text" name="page_name1[]" value="{{ $page_name }}" id="page_name1" class="form-control placeholderText height-35 f-14" placeholder="Type page name">
                                                    </div>
                                                </div>
                                                @endforeach
                                                @foreach ($quantity_array as $quantity)
                                                <div class="col-md-2">
                                                    <label for="">Quantity</label>
                                                    <input type="number" name="quantity1[]" value="{{ $quantity }}" id="quantity1" class="form-control placeholderText height-35 f-14" placeholder="Type page quantity">
                                                </div>
                                                @endforeach
                                                @foreach ($approximate_word_array as $approximate_word)
                                                <div class="col-md-2">
                                                    <label for="">Approximate word count per page</label>
                                                    <input type="text" name="approximate_word1[]" value="{{ $approximate_word }}" id="approximate_word1" class="form-control placeholderText height-35 f-14" placeholder="Approximate word count per page">
                                                </div>
                                                @endforeach
                                            </div>
                                        </div>
                                        <div class="col-md-1 append-buttons" style="margin-top: 22px;">
                                            <div class="clearfix">
                                                <button type="button" id="add-page-button" class="btn btn-primary float-left text-uppercase shadow-sm"><i class="fa fa-plus fa-fw"></i></button>
                                                <button type="button" id="remove-page-button" class="btn btn-secondary float-left text-uppercase ml-1" disabled="disabled"><i class="fa fa-minus fa-fw"></i></button>
                                            </div>
                                        </div>
                                    </div>
                                    @else
                                    <div class="row mt-4">
                                        <div class="col-md-11 dynamic-page" id="dynamic-page-list-1">
                                            <div class="row mb-4">
                                                <div class="col-md-3" style="margin-top: 22px;">
                                                    <h6>Pages list:</h6>
                                                </div>
                                                <div class="col-md-3" style="margin-left: 11%">
                                                    <div class="form-group">
                                                        <label for="">Type Page name</label>
                                                        <input type="text" name="page_name1[]" id="page_name1" class="form-control placeholderText height-35 f-14" placeholder="Type page name">
                                                    </div>
                                                </div>
                                                <div class="col-md-2">
                                                    <label for="">Quantity</label>
                                                    <input type="number" name="quantity1[]" id="quantity1" class="form-control placeholderText height-35 f-14" placeholder="Type page quantity">
                                                </div>
                                                <div class="col-md-2">
                                                    <label for="">Approximate word count per page</label>
                                                    <input type="text" name="approximate_word1[]" id="approximate_word1" class="form-control placeholderText height-35 f-14" placeholder="Approximate word count per page">
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-1 append-buttons" style="margin-top: 22px;">
                                            <div class="clearfix">
                                                <button type="button" id="add-page-button" class="btn btn-primary float-left text-uppercase shadow-sm"><i class="fa fa-plus fa-fw"></i></button>
                                                <button type="button" id="remove-page-button" class="btn btn-secondary float-left text-uppercase ml-1" disabled="disabled"><i class="fa fa-minus fa-fw"></i></button>
                                            </div>
                                        </div>
                                    </div>
                                    @endif

                                    <!--Keywords-->
                                    <div class="row mt-3">
                                        <div class="col-md-4">
                                            <h6 style="margin-top: 40px;">Target Audience:</h6>
                                        </div>
                                        <div class="col-md-2">
                                            <label for="">Gender</label>
                                            <select name="target_audience_gender" id="target_audience_gender" class="form-control height-35 f-14 placeholderText">
                                                <option value="">--</option>
                                                <option value="male" {{ ($sales_web_content->gender=="Male")? "selected" : "" }}>Male</option>
                                                <option value="female" {{ ($sales_web_content->gender=="Female")? "selected" : "" }}>Female</option>
                                            </select>
                                        </div>
                                        <div class="col-md-2">
                                            <label for="">Age (Put a Range)</label>
                                            <div class="row">
                                                <div class="col-md-6">
                                                    <input type="number" name="target_audience_age1" value="{{ $sales_web_content->age1 }}" id="target_audience_age1" class="form-control placeholderText height-35 f-14" placeholder="18">
                                                </div>
                                                <div class="col-md-6">
                                                    <input type="number" name="target_audience_age2" value="{{ $sales_web_content->age2 }}" id="target_audience_age2" class="form-control placeholderText height-35 f-14" placeholder="25 ">
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-2">
                                            <label for="">Monthly Income (in USD)</label>
                                            <input type="text" name="monthly_income1" value="{{ $sales_web_content->monthly_income }}" id="monthly_income1" class="form-control placeholderText height-35 f-14" placeholder="$">
                                        </div>
                                        <div class="col-md-2">
                                            <label for="">Education Level</label>
                                            <input type="text" name="education_level1" value="{{ $sales_web_content->education_level }}" id="education_level1" class="form-control placeholderText height-35 f-14" placeholder="Education Level">
                                        </div>
                                    </div>
                                    <div class="row mt-3">
                                        <div class="col-md-4">
                                            <h6 style="margin-top: 40px;">Geographic Location :</h6>
                                        </div>
                                        <div class="col-md-4">
                                            <label for="">Country</label>
                                            <input type="text" name="country1" id="country1" value="{{ $sales_web_content->country }}" class="form-control placeholderText height-35 f-14" placeholder="Type your country">
                                        </div>
                                        <div class="col-md-4">
                                            <label for="">City</label>
                                            <input type="text" name="city1" id="city1" value="{{ $sales_web_content->city }}" class="form-control placeholderText height-35 f-14" placeholder="Type your city">
                                        </div>
                                    </div>
                                    <div class="row mt-3">
                                        <div class="col-md-4">
                                            <h6 style="margin-top: 40px;">Interests :</h6>
                                        </div>
                                        <div class="col-md-8">
                                            <label for="">Write 1-2 lines about the interests and pain points of your target audience</label>
                                            <textarea name="interest1" id="interest1" rows="5" class="form-control placeholderText">{!! $sales_web_content->interest !!}</textarea>
                                        </div>
                                    </div>
                                    <div class="row mt-3">
                                        <div class="col-md-4">
                                            <h6 style="margin-top: 40px;">Buying Habits</h6>
                                        </div>
                                        <div class="col-md-8">
                                            <div class="row">
                                                <div class="col-md-4">
                                                    <label for="">How does your client's target audience make purchasing decisions?</label>
                                                    <textarea name="interest_buying_habit1" id="interest_buying_habit1" rows="5" class="form-control">{!! $sales_web_content->buying_habit1 !!}</textarea>
                                                </div>
                                                <div class="col-md-4" style="margin-top: 20px;">
                                                    <label for="">Do they shop online or in-store?</label>
                                                    <textarea name="interest_buying_habit2" id="interest_buying_habit2" rows="5" class="form-control">{!! $sales_web_content->buying_habit2 !!}</textarea>
                                                </div>
                                                <div class="col-md-4" style="margin-top: 20px;">
                                                    <label for="">What are their favorite brands?</label>
                                                    <textarea name="interest_buying_habit3" id="interest_buying_habit3" rows="5" class="form-control">{!! $sales_web_content->buying_habit3 !!}</textarea>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row mt-3">
                                        <div class="col-md-4">
                                            <h6 style="margin-top: 40px;">Thor Native Language</h6>
                                        </div>
                                        <div class="col-md-8">
                                            <label for="">What is their native language?</label>
                                            <input type="text" name="thor_native_language" id="thor_native_language" value="{{ $sales_web_content->language }}" class="form-control placeholderText height-35 f-14" placeholder="Type your language">
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
                                    <button type="submit" class="btn btn-primary mt-5 " id="pm_web_content_submit">Submit</button>
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
        $('#yesBtn').click(function() {
            $('#folderLinkForm').show();
        });

        $('#noBtn').click(function() {
            $('#folderLinkForm').hide();
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
    function toggleProductListButton() {
        var button = document.getElementById('product_list_btn');
        var input_product_list = document.getElementById('input_product_list');

        button.style.display = 'none';
        input_product_list.style.display = 'flex';
    }
    function togglecountryBtton() {
        var button = document.getElementById('country_btn');
        var input_country = document.getElementById('input_country');

        button.style.display = 'none';
        input_country.style.display = 'flex';
    }
    function togglecityBtton() {
        var button = document.getElementById('city_btn');
        var input_city = document.getElementById('input_city');

        button.style.display = 'none';
        input_city.style.display = 'flex';
    }
    function toggleinterestBtton() {
        var button = document.getElementById('interest_btn');
        var input_interest = document.getElementById('input_interest');

        button.style.display = 'none';
        input_interest.style.display = 'flex';
    }
    function togglebuying_habit1Btton() {
        var button = document.getElementById('buying_habit1_btn');
        var input_buying_habit1 = document.getElementById('input_buying_habit1');

        button.style.display = 'none';
        input_buying_habit1.style.display = 'flex';
    }
    function togglebuying_habit2Btton() {
        var button = document.getElementById('buying_habit2_btn');
        var input_buying_habit2 = document.getElementById('input_buying_habit2');

        button.style.display = 'none';
        input_buying_habit2.style.display = 'flex';
    }
    function togglebuying_habit3Btton() {
        var button = document.getElementById('buying_habit3_btn');
        var input_buying_habit3 = document.getElementById('input_buying_habit3');

        button.style.display = 'none';
        input_buying_habit3.style.display = 'flex';
    }
    function toggleLanguageBtton() {
        var button = document.getElementById('language_btn');
        var input_language = document.getElementById('input_language');

        button.style.display = 'none';
        input_language.style.display = 'flex';
    }


    // AJAX call
    $(document).ready(function() {
            $('.saveWebsiteLinkBtn, .saveWebsiteNicheBtn, .saveWebsiteNameBtn, .savecountryBtn, .savecityBtn, .saveinterestBtn, .saveBuying_habit1Btn, .saveBuying_habit2Btn, .saveBuying_habit3Btn, .saveLanguageBtn').click(function(event) {
                event.preventDefault();
                var id = $(this).data('id');
                var data= {
                    '_token': "{{ csrf_token() }}",
                    'website_link': document.getElementById("website_link").value,
                    'website_niche': document.getElementById("website_niche").value,
                    'website_name': document.getElementById("website_name").value,
                    'product_list': document.getElementById("product_list").value,
                    'country': document.getElementById("country").value,
                    'city': document.getElementById("city").value,
                    'interest': document.getElementById("interest").value,
                    'buying_habit1': document.getElementById("buying_habit1").value,
                    'buying_habit2': document.getElementById("buying_habit1").value,
                    'buying_habit3': document.getElementById("buying_habit3").value,
                    'language': document.getElementById("language").value,
                    'deal_id': {{$web_content->deal_id}},
                    'web_content_id': {{$web_content->id}},
                    'milestone_id': {{$web_content->milestone_id}},
                }
                $.ajaxSetup({
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                }
            });
            $.ajax({
                url: '/projects/update-sales-web-content/'+id,
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
                    if(response.product_list){
                        $('#product_list_form').hide();
                        $('#product_list_container').html();
                        $('#product_list_container').html('<button id="product_list_btn" type="submit" style="background-color: #ffffff">' + response.product_list + '</button>');
                    }
                    if(response.country){
                        $('#country_form').hide();
                        $('#country_container').html();
                        $('#country_container').html('<button id="country_btn" type="submit" style="background-color: #ffffff">' + response.country + '</button>');
                    }
                    if(response.city){
                        $('#city_form').hide();
                        $('#city_container').html();
                        $('#city_container').html('<button id="city_btn" type="submit" style="background-color: #ffffff">' + response.city + '</button>');
                    }
                    if(response.interest){
                        $('#interest_form').hide();
                        $('#interest_container').html();
                        $('#interest_container').html('<button id="interest_btn" type="submit" style="background-color: #ffffff">' + response.interest + '</button>');
                    }
                    if(response.buying_habit1){
                        $('#buying_habit1_form').hide();
                        $('#buying_habit1_container').html();
                        $('#buying_habit1_container').html('<button id="buying_habit1_btn" type="submit" style="background-color: #ffffff">' + response.buying_habit1 + '</button>');
                    }
                    if(response.buying_habit2){
                        $('#buying_habit2_form').hide();
                        $('#buying_habit2_container').html();
                        $('#buying_habit2_container').html('<button id="buying_habit2_btn" type="submit" style="background-color: #ffffff">' + response.buying_habit2 + '</button>');
                    }
                    if(response.buying_habit3){
                        $('#buying_habit3_form').hide();
                        $('#buying_habit3_container').html();
                        $('#buying_habit3_container').html('<button id="buying_habit3_btn" type="submit" style="background-color: #ffffff">' + response.buying_habit3 + '</button>');
                    }
                    if(response.language){
                        $('#language_form').hide();
                        $('#language_container').html();
                        $('#language_container').html('<button id="language_btn" type="submit" style="background-color: #ffffff">' + response.language + '</button>');
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
                    if(error.responseJSON.errors.product_list){
                    $('#product_list_error').text(error.responseJSON.errors.product_list);
                    }else{
                        $('#product_list_error').text('');
                    }
                    if(error.responseJSON.errors.country){
                    $('#country_error').text(error.responseJSON.errors.country);
                    }else{
                        $('#country_error').text('');
                    }
                    if(error.responseJSON.errors.city){
                    $('#city_error').text(error.responseJSON.errors.city);
                    }else{
                        $('#city_error').text('');
                    }
                    if(error.responseJSON.errors.interest){
                    $('#interest_error').text(error.responseJSON.errors.interest);
                    }else{
                        $('#interest_error').text('');
                    }
                    if(error.responseJSON.errors.buying_habit1){
                    $('#buying_habit1_error').text(error.responseJSON.errors.buying_habit1);
                    }else{
                        $('#buying_habit1_error').text('');
                    }
                    if(error.responseJSON.errors.buying_habit2){
                    $('#buying_habit2_error').text(error.responseJSON.errors.buying_habit2);
                    }else{
                        $('#buying_habit2_error').text('');
                    }
                    if(error.responseJSON.errors.buying_habit3){
                    $('#buying_habit3_error').text(error.responseJSON.errors.buying_habit3);
                    }else{
                        $('#buying_habit3_error').text('');
                    }
                    if(error.responseJSON.errors.language){
                    $('#language_error').text(error.responseJSON.errors.language);
                    }else{
                        $('#language_error').text('');
                    }
                }
            });
            });
        });
</script>
<script>
    $(document).ready(function() {
        $('#share_file_info_yesBtn').click(function() {
            $('#shareFolderLinkForm').show();
        });

        $('#share_file_info_noBtn').click(function() {
            $('#shareFolderLinkForm').hide();
        });
    });
    $(document).ready(function() {
        $('#competitor_content_noBtn').click(function() {
            $('#competitor_content_noForm').show();
        });

        $('#competitor_content_yesBtn').click(function() {
            $('#competitor_content_noForm').hide();
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
        $('#pm_web_content_submit').click(function(event) {
            event.preventDefault();
            $('#pm_web_content_submit').attr("disabled", true);
            $('#pm_web_content_submit').html("Processing...");
            var folder_link = document.getElementsByName("folder_link2[]");
            var folder_link_values = [];
            for (var i = 0; i < folder_link.length; i++) {
                folder_link_values.push(folder_link[i].value);
            }
            var reference_website = document.getElementsByName("reference_website2[]");
            var reference_website_values = [];
            for (var i = 0; i < reference_website.length; i++) {
                reference_website_values.push(reference_website[i].value);
            }
            var description1 = document.getElementsByName("competitor_content_description1[]");
            var description1_values = [];
            for (var i = 0; i < description1.length; i++) {
                description1_values.push(description1[i].value);
            }
            var description2 = document.getElementsByName("competitor_content_description2[]");
            var description2_values = [];
            for (var i = 0; i < description2.length; i++) {
                description2_values.push(description2[i].value);
            }
            var description3 = document.getElementsByName("competitor_content_description3[]");
            var description3_values = [];
            for (var i = 0; i < description3.length; i++) {
                description3_values.push(description3[i].value);
            }
            var page_name1 = document.getElementsByName("page_name1[]");
            var page_name1_values = [];
            for (var i = 0; i < page_name1.length; i++) {
                page_name1_values.push(page_name1[i].value);
            }
            var quantity1 = document.getElementsByName("quantity1[]");
            var quantity1_values = [];
            for (var i = 0; i < quantity1.length; i++) {
                quantity1_values.push(quantity1[i].value);
            }
            var approximate_word1 = document.getElementsByName("approximate_word1[]");
            var approximate_word1_values = [];
            for (var i = 0; i < approximate_word1.length; i++) {
                approximate_word1_values.push(approximate_word1[i].value);
            }
            var share_file = $('input[name="share_file"]:checked').val();
            var competitor_content = $('input[name="competitor_content2"]:checked').val();
            var additional_word = $('input[name="additional_word"]:checked').val();
            var layout_content = $('input[name="layout_content"]:checked').val();

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
                'website_link2': document.getElementById("website_link2").value,
                'website_niche2': document.getElementById("website_niche2").value,
                'website_name2': document.getElementById("website_name2").value,
                'business_information2': document.getElementById("business_information2").value,
                'share_file': share_file,
                'folder_link': folder_link_values,
                'reference_website': reference_website_values,
                'competitor_content': competitor_content,
                'description1': description1_values,
                'description2': description2_values,
                'description3': description3_values,
                'product_list1': document.getElementById("product_list1").value,
                'page_name1': page_name_values,
                'quantity1': quantity_values,
                'approximate_word1': approximate_word_values,
                'target_audience_gender': document.getElementById("target_audience_gender").value,
                'target_audience_age1': document.getElementById("target_audience_age1").value,
                'target_audience_age2': document.getElementById("target_audience_age2").value,
                'monthly_income1': document.getElementById("monthly_income1").value,
                'education_level1': document.getElementById("education_level1").value,
                'country1': document.getElementById("country1").value,
                'city1': document.getElementById("city1").value,
                'interest1': document.getElementById("interest1").value,
                'interest_buying_habit1': document.getElementById("interest_buying_habit1").value,
                'interest_buying_habit2': document.getElementById("interest_buying_habit2").value,
                'interest_buying_habit3': document.getElementById("interest_buying_habit3").value,
                'thor_native_language': document.getElementById("thor_native_language").value,
                'word_appropriate': document.getElementById("word_appropriate").value,
                'word_client_initially': document.getElementById("word_client_initially").value,
                'additional_word': additional_word,
                'layout_content': layout_content,
                'website_link': website_link_values,
                'page_name': page_name_values,
                'quantity': quantity_values,
                'approximate_word': approximate_word_values,
                'sales_web_content_id': document.getElementById("sales_web_content_id").value,
                'deal_id': document.getElementById("deal_id").value,
                'milestone_id': document.getElementById("milestone_id").value,
            }
            $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            }
        });
        $.ajax({
            url: "{{route('pm_web_content_update')}}",
            method: 'post',
            data: data,
            dataType: "json",
            success: function (response) {
                toastr.success('Updated Successfully');
                $(location).prop('href', '{{route('viewWebContent',$web_content->deal_id)}}');
                $('#pm_web_content_submit').attr("disabled", false);
                $('#pm_web_content_submit').html("Submit");
            },
            error: function(error) {
                $('#pm_web_content_submit').attr("disabled", false);
                $('#pm_web_content_submit').html("Submit");
            }
        });
        });
    });
</script>



<script>
    $(document).ready(function () {
        var buttonAdd = $("#add-folder");
        var buttonRemove = $("#remove-folder");
        var className = ".dynamic-folderLink";
        var count = 0;
        var field = "";
        var maxFields = 50;

        function totalFields() {
            return $(className).length;
        }

        function addNewField() {
            var total = $('input[name="folder_link2[]"]').length;
            count = totalFields() + 1;
            field = $("#dynamic-folderLink-list-1").clone();
            field.attr("id", "dynamic-folderLink-" + count);
            field.find('input[name="folder_link2[]"]').val("");
            field.find('input[name="folder_link2[]"]').attr("id", "folder_link2_" + count);
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
        var buttonAdd = $("#add-button");
        var buttonRemove = $("#remove-button");
        var className = ".dynamic-product";
        var count = 0;
        var field = "";
        var maxFields = 50;

        function totalFields() {
            return $(className).length;
        }

        function addNewField() {
            var total = $('input[name="link[]"]').length;
            count = totalFields() + 1;
            field = $("#dynamic-product-list-1").clone();
            field.attr("id", "dynamic-product-" + count);
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
        var buttonAdd = $("#add-page-button");
        var buttonRemove = $("#remove-page-button");
        var className = ".dynamic-page";
        var count = 0;
        var field = "";
        var maxFields = 50;

        function totalFields() {
            return $(className).length;
        }

        function addNewField() {
            var total = $('input[name="link[]"]').length;
            count = totalFields() + 1;
            field = $("#dynamic-page-list-1").clone();
            field.attr("id", "dynamic-page-" + count);
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
