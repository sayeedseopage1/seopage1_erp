@extends('layouts.app')
@section('content')
@php
$sales_basic_seo = \App\Models\SalesBasicSeo::where('basic_seo_id',$basic_seo->id)->first();
$deal = \App\Models\Deal::where('id',$basic_seo->deal_id)->first();
$project = \App\Models\Project::where('deal_id',$basic_seo->deal_id)->first();
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
                            <p>{{$basic_seo->deal_id}}</p>
                        </div>
                        <div class="col-4">
                            <p>Client Link</p>
                        </div>
                        <div class="col-8">
                            <p>{{$basic_seo->client_link}}</p>
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
                            <p>{{$basic_seo->service_type}}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="card mb-2">
                <div class="card-body">
                    <div class="row">
                        <div class="col-4">
                            <p>Site Owner's Name:</p>
                        </div>
                        <div class="col-8">
                            {{-- START WEBSITE LINK --}}
                            <div id="owner_name_container">
                                @if($sales_basic_seo !=null)
                                    <p>{{$sales_basic_seo->owner_name}}</p>
                                @else
                                    @if($basic_seo->owner_name)
                                    <button id="owner_name_btn" type="button" style="background-color: #ffffff" onclick="toggleOwnerNameButton()" data-toggle="tooltip" data-placement="top" title="Click to edit"> {{$basic_seo->owner_name}}</button>
                                    @else
                                    <button type="button" id="owner_name_btn" style="background-color: #ffffff" onclick="toggleOwnerNameButton()" data-toggle="tooltip" data-placement="top" title="Click to edit">--</button>
                                    @endif
                                @endif
                            </div>

                            <div id="owner_name_form">
                                @if($basic_seo->owner_name)
                                <form action="" method="post">
                                    @csrf
                                    <div class="input-group" id="input_owner_name" style="display: none; margin-top: -10px;">
                                        <input type="url" id="owner_name" value="{{$basic_seo->owner_name}}" name="owner_name" class="form-control height-35 f-14" aria-label="Recipient's username" aria-describedby="saveButton" placeholder="Write site owner's name here">
                                        <div class="input-group-append">
                                            <button class="btn btn-outline-secondary saveOwnerNameBtn" type="button" id="saveButton" data-id="{{$basic_seo->id}}"><i class="fa-solid fa-check"></i></button>
                                        </div>
                                    </div>
                                    <span id="owner_name_error" class="text-danger"></span><br>
                                    @else
                                    <div class="input-group" id="input_owner_name" style="display: none; margin-top: -10px;">
                                        <input type="url" id="owner_name" name="owner_name" class="form-control height-35 f-14" aria-label="Recipient's username" aria-describedby="saveButton" placeholder="Write site owner's name here">
                                        <div class="input-group-append">
                                            <button class="btn btn-outline-secondary saveOwnerNameBtn" type="button" id="saveButton" data-id="{{$basic_seo->id}}"><i class="fa-solid fa-check"></i></button>
                                        </div>
                                    </div>
                                    <span id="owner_name_error" class="text-danger"></span><br>
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
                            <p>Exact Business Name:</p>
                        </div>
                        <div class="col-8">
                            {{-- START WEBSITE LINK --}}
                            <div id="business_name_container">
                                @if ($sales_basic_seo && $sales_basic_seo->business_name != null)
                                    <p>{{ $sales_basic_seo->business_name }}</p>
                                @else
                                    @if ($basic_seo && $basic_seo->business_name)
                                        <button id="business_name_btn" type="button" style="background-color: #ffffff" onclick="toggleBusinessNameButton()" data-toggle="tooltip" data-placement="top" title="Click to edit">{{ $basic_seo->business_name }}</button>
                                    @else
                                        <button type="button" id="business_name_btn" style="background-color: #ffffff" onclick="toggleBusinessNameButton()" data-toggle="tooltip" data-placement="top" title="Click to edit">--</button>
                                    @endif
                                @endif
                            </div>

                            <div id="business_name_form">
                                @if($basic_seo->business_name)
                                <form action="" method="post">
                                    @csrf
                                    <div class="input-group" id="input_business_name" style="display: none; margin-top: -10px;">
                                        <input type="url" id="business_name" value="{{$basic_seo->business_name}}" name="business_name" class="form-control height-35 f-14" aria-label="Recipient's username" aria-describedby="saveButton" placeholder="Type your exact business name">
                                        <div class="input-group-append">
                                            <button class="btn btn-outline-secondary saveBusinessNameBtn" type="button" id="saveButton" data-id="{{$basic_seo->id}}"><i class="fa-solid fa-check"></i></button>
                                        </div>
                                    </div>
                                    <span id="business_name_error" class="text-danger"></span><br>
                                    @else
                                    <div class="input-group" id="input_business_name" style="display: none; margin-top: -10px;">
                                        <input type="url" id="business_name" name="business_name" class="form-control height-35 f-14" aria-label="Recipient's username" aria-describedby="saveButton" placeholder="Type your exact business name">
                                        <div class="input-group-append">
                                            <button class="btn btn-outline-secondary saveBusinessNameBtn" type="button" id="saveButton" data-id="{{$basic_seo->id}}"><i class="fa-solid fa-check"></i></button>
                                        </div>
                                    </div>
                                    <span id="business_name_error" class="text-danger"></span><br>
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
                            <p>Full Address of Your Business:</p>
                        </div>
                        <div class="col-8">
                            {{-- START WEBSITE LINK --}}
                            <div id="business_address_container">
                                @if ($sales_basic_seo && $sales_basic_seo->business_address != null)
                                    <p>{{$sales_basic_seo->business_address}}</p>
                                @else
                                @if ($basic_seo && $basic_seo->business_address)
                                    <button id="business_address_btn" type="button" style="background-color: #ffffff" onclick="toggleBusinessAddressButton()" data-toggle="tooltip" data-placement="top" title="Click to edit"> {{$basic_seo->business_address}}</button>
                                    @else
                                    <button type="button" id="business_address_btn" style="background-color: #ffffff" onclick="toggleBusinessAddressButton()" data-toggle="tooltip" data-placement="top" title="Click to edit">--</button>
                                    @endif
                                @endif
                            </div>

                            <div id="business_address_form">
                                @if($basic_seo->business_address)
                                <form action="" method="post">
                                    @csrf
                                    <div class="input-group" id="input_business_address" style="display: none; margin-top: -10px;">
                                        <input type="url" id="business_address" value="{{$basic_seo->business_address}}" name="business_address" class="form-control height-35 f-14" aria-label="Recipient's username" aria-describedby="saveButton" placeholder="Type your exact business name">
                                        <div class="input-group-append">
                                            <button class="btn btn-outline-secondary saveBusinessAddressBtn" type="button" id="saveButton" data-id="{{$basic_seo->id}}"><i class="fa-solid fa-check"></i></button>
                                        </div>
                                    </div>
                                    <span id="business_address_error" class="text-danger"></span><br>
                                    @else
                                    <div class="input-group" id="input_business_address" style="display: none; margin-top: -10px;">
                                        <input type="url" id="business_address" name="business_address" class="form-control height-35 f-14" aria-label="Recipient's username" aria-describedby="saveButton" placeholder="Type your exact business name">
                                        <div class="input-group-append">
                                            <button class="btn btn-outline-secondary saveBusinessAddressBtn" type="button" id="saveButton" data-id="{{$basic_seo->id}}"><i class="fa-solid fa-check"></i></button>
                                        </div>
                                    </div>
                                    <span id="business_address_error" class="text-danger"></span><br>
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
                            <p>Phone Number:</p>
                        </div>
                        <div class="col-8">
                            {{-- START WEBSITE LINK --}}
                            <div id="phone_number_container">
                                @if ($sales_basic_seo && $sales_basic_seo->phone_number != null)
                                    <p>{{$sales_basic_seo->phone_number}}</p>
                                @else
                                    @if ($basic_seo && $basic_seo->phone_number)
                                    <button id="phone_number_btn" type="button" style="background-color: #ffffff" onclick="togglePhoneNumberButton()" data-toggle="tooltip" data-placement="top" title="Click to edit"> {{$basic_seo->phone_number}}</button>
                                    @else
                                    <button type="button" id="phone_number_btn" style="background-color: #ffffff" onclick="togglePhoneNumberButton()" data-toggle="tooltip" data-placement="top" title="Click to edit">--</button>
                                    @endif
                                @endif
                            </div>

                            <div id="phone_number_form">
                                @if($basic_seo->phone_number)
                                <form action="" method="post">
                                    @csrf
                                    <div class="input-group" id="input_phone_number" style="display: none; margin-top: -10px;">
                                        <input type="url" id="phone_number" value="{{$basic_seo->phone_number}}" name="phone_number" class="form-control height-35 f-14" aria-label="Recipient's username" aria-describedby="saveButton" placeholder="Type your exact business name">
                                        <div class="input-group-append">
                                            <button class="btn btn-outline-secondary savePhoneNoBtn" type="button" id="saveButton" data-id="{{$basic_seo->id}}"><i class="fa-solid fa-check"></i></button>
                                        </div>
                                    </div>
                                    <span id="phone_number_error" class="text-danger"></span><br>
                                    @else
                                    <div class="input-group" id="input_phone_number" style="display: none; margin-top: -10px;">
                                        <input type="url" id="phone_number" name="phone_number" class="form-control height-35 f-14" aria-label="Recipient's username" aria-describedby="saveButton" placeholder="Type your exact business name">
                                        <div class="input-group-append">
                                            <button class="btn btn-outline-secondary savePhoneNoBtn" type="button" id="saveButton" data-id="{{$basic_seo->id}}"><i class="fa-solid fa-check"></i></button>
                                        </div>
                                    </div>
                                    <span id="phone_number_error" class="text-danger"></span><br>
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
                            <p>Zip Code:</p>
                        </div>
                        <div class="col-8">
                            {{-- START WEBSITE LINK --}}
                            <div id="zip_code_container">
                                @if ($sales_basic_seo && $sales_basic_seo->zip_code != null)
                                    <p>{{$sales_basic_seo->zip_code}}</p>
                                @else
                                    @if ($basic_seo && $basic_seo->zip_code)
                                    <button id="zip_code_btn" type="button" style="background-color: #ffffff" onclick="toggleZipCodeButton()" data-toggle="tooltip" data-placement="top" title="Click to edit"> {{$basic_seo->zip_code}}</button>
                                    @else
                                    <button type="button" id="zip_code_btn" style="background-color: #ffffff" onclick="toggleZipCodeButton()" data-toggle="tooltip" data-placement="top" title="Click to edit">--</button>
                                    @endif
                                @endif
                            </div>

                            <div id="zip_code_form">
                                @if($basic_seo->zip_code)
                                <form action="" method="post">
                                    @csrf
                                    <div class="input-group" id="input_zip_code" style="display: none; margin-top: -10px;">
                                        <input type="url" id="zip_code" value="{{$basic_seo->zip_code}}" name="zip_code" class="form-control height-35 f-14" aria-label="Recipient's username" aria-describedby="saveButton" placeholder="Type your exact business name">
                                        <div class="input-group-append">
                                            <button class="btn btn-outline-secondary saveZipCodeBtn" type="button" id="saveButton" data-id="{{$basic_seo->id}}"><i class="fa-solid fa-check"></i></button>
                                        </div>
                                    </div>
                                    <span id="zip_code_error" class="text-danger"></span><br>
                                    @else
                                    <div class="input-group" id="input_zip_code" style="display: none; margin-top: -10px;">
                                        <input type="url" id="zip_code" name="zip_code" class="form-control height-35 f-14" aria-label="Recipient's username" aria-describedby="saveButton" placeholder="Type your exact business name">
                                        <div class="input-group-append">
                                            <button class="btn btn-outline-secondary saveZipCodeBtn" type="button" id="saveButton" data-id="{{$basic_seo->id}}"><i class="fa-solid fa-check"></i></button>
                                        </div>
                                    </div>
                                    <span id="zip_code_error" class="text-danger"></span><br>
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
                            <p>Do you have a google search console account created?</p>
                        </div>
                        @if($sales_basic_seo !=null)
                            <div class="col-8">
                                @if($basic_seo->google_search_info ==1)
                                    <p>Yes</p>
                                @else
                                    <p>No</p>
                                @endif
                            </div>
                        @else
                            <div class="col-8" id="google_search_info_value" onclick="toggleGoogleSearchInfoEdit()">
                                @if($basic_seo->google_search_info ==1)
                                    <p data-toggle="tooltip" data-placement="top" title="Click to edit">Yes</p>
                                @else
                                    <p data-toggle="tooltip" data-placement="top" title="Click to edit">No</p>
                                @endif
                            </div>
                        @endif

                        @if(isset($sales_basic_seo) && $sales_basic_seo->google_search_info == 1)
                            <div class="col-4"></div>
                            <div class="col-8">
                                @if($sales_basic_seo->done1 == 1)
                                    <p>Done</p>
                                @endif
                            </div>
                        @else
                            @if(isset($basic_seo) && $basic_seo->google_search_info == 1)
                                <div class="col-4"></div>
                                <div class="col-8" id="google_search_info_value" onclick="toggleGoogleSearchInfoEdit()">
                                    @if($basic_seo->done1 == 1)
                                        <p data-toggle="tooltip" data-placement="top" title="Click to edit">Done</p>
                                    @endif
                                </div>
                            @endif
                        @endif

                        @if(isset($sales_basic_seo) && $sales_basic_seo->google_search_info == 0)
                            <div class="col-4"></div>
                            <div class="col-8">
                                <p>{{$sales_basic_seo->email1}}</p>
                                <p>{{$sales_basic_seo->password1}}</p>
                            </div>
                        @else
                            @if(isset($basic_seo) && $basic_seo->google_search_info == 0)
                                <div class="col-4"></div>
                                <div class="col-8" id="google_search_info_value" onclick="toggleGoogleSearchInfoEdit()">
                                    <p data-toggle="tooltip" data-placement="top" title="Click to edit">{{$basic_seo->email1}}</p>
                                    <p data-toggle="tooltip" data-placement="top" title="Click to edit">{{$basic_seo->password1}}</p>
                                </div>
                            @endif
                        @endif
                    </div>
                        <button type="button" style="background-color: #ffffff; position: absolute; top: 35px; right: 20px;" class="d-flex justify-content-end ml-auto btn btn-secondary" data-toggle="modal" data-target="#google_search_info_modal"><i class="fa fa-edit" style="font-size: 16px;"></i></button>
                    @include('service-type.modal.basic-seo.google_search_info_modal')
                </div>
            </div>

            <div class="card mb-2">
                <div class="card-body">
                    <div class="row">
                        <div class="col-4">
                            <p>Do you have a google analytics account created?</p>
                        </div>
                        @if($sales_basic_seo !=null)
                            <div class="col-8">
                                @if($sales_basic_seo->google_analytic_info ==1)
                                    <p>Yes</p>
                                @else
                                    <p>No</p>
                                @endif
                            </div>
                        @else
                            <div class="col-8" id="google_analytic_info_value" onclick="toggleGoogleAnalyticInfoEdit()">
                                @if($basic_seo->google_analytic_info ==1)
                                    <p data-toggle="tooltip" data-placement="top" title="Click to edit">Yes</p>
                                @else
                                    <p data-toggle="tooltip" data-placement="top" title="Click to edit">No</p>
                                @endif
                            </div>
                        @endif

                        @if($sales_basic_seo && $sales_basic_seo->google_analytic_info==1)
                            <div class="col-4"></div>
                            <div class="col-8">
                                @if($sales_basic_seo->done2==1)
                                <p>Done</p>
                                @endif
                            </div>
                        @else
                            @if($basic_seo && $basic_seo->google_analytic_info==1)
                            <div class="col-4"></div>
                            <div class="col-8" id="google_analytic_info" onclick="toggleGoogleAnalyticInfoEdit()">
                                @if($basic_seo->done2==1)
                                <p data-toggle="tooltip" data-placement="top" title="Click to edit">Done</p>
                                @endif
                            </div>
                            @endif
                        @endif

                        @if($sales_basic_seo && $sales_basic_seo->google_analytic_info == 0)
                            <div class="col-4"></div>
                            <div class="col-8">
                                <p>{{$sales_basic_seo->email2}}</p>
                                <p>{{$sales_basic_seo->password2}}</p>
                            </div>
                        @else
                            @if($basic_seo && $basic_seo->google_analytic_info == 0)
                                <div class="col-4"></div>
                                <div class="col-8" id="google_analytic_info" onclick="toggleGoogleAnalyticInfoEdit()">
                                    <p data-toggle="tooltip" data-placement="top" title="Click to edit">{{$basic_seo->email2}}</p>
                                    <p data-toggle="tooltip" data-placement="top" title="Click to edit">{{$basic_seo->password2}}</p>
                                </div>
                            @endif
                        @endif
                    </div>
                        <button type="button" style="background-color: #ffffff; position: absolute; top: 35px; right: 20px;" class="d-flex justify-content-end ml-auto btn btn-secondary" data-toggle="modal" data-target="#google_analytic_info_modal"><i class="fa fa-edit" style="font-size: 16px;"></i></button>
                    @include('service-type.modal.basic-seo.google_analytic_info_modal')
                </div>
            </div>

            <div class="card mb-2">
                <div class="card-body">
                    <div class="row">
                        <div class="col-4">
                            <p>Do you have a google my business account created?</p>
                        </div>
                        @if($sales_basic_seo !=null)
                            <div class="col-8">
                                @if($sales_basic_seo->google_business_account_info ==1)
                                    <p>Yes</p>
                                @else
                                    <p>No</p>
                                @endif
                            </div>
                        @else
                            <div class="col-8">
                                @if($basic_seo->google_business_account_info ==1)
                                    <p data-toggle="tooltip" data-placement="top" title="Click to edit">Yes</p>
                                @else
                                    <p data-toggle="tooltip" data-placement="top" title="Click to edit">No</p>
                                @endif
                            </div>
                        @endif

                        @if($sales_basic_seo && $sales_basic_seo->google_business_account_info==1)
                            <div class="col-4"></div>
                            <div class="col-8">
                                @if($sales_basic_seo->done3==1)
                                <p>Done</p>
                                @endif
                            </div>
                        @else
                            @if($basic_seo && $basic_seo->google_business_account_info==1)
                            <div class="col-4"></div>
                            <div class="col-8">
                                @if($basic_seo->done3==1)
                                <p data-toggle="tooltip" data-placement="top" title="Click to edit">Done</p>
                                @endif
                            </div>
                            @endif
                        @endif

                        @if($sales_basic_seo && $sales_basic_seo->google_business_account_info == 0)
                            <div class="col-4"></div>
                            <div class="col-8">
                                <p>{{$sales_basic_seo->email3}}</p>
                                <p>{{$sales_basic_seo->password3}}</p>
                            </div>
                        @else
                            @if($basic_seo && $basic_seo->google_business_account_info == 0)
                                <div class="col-4"></div>
                                <div class="col-8">
                                    <p data-toggle="tooltip" data-placement="top" title="Click to edit">{{$basic_seo->email3}}</p>
                                    <p data-toggle="tooltip" data-placement="top" title="Click to edit">{{$basic_seo->password3}}</p>
                                </div>
                            @endif
                        @endif
                    </div>
                        <button type="button" style="background-color: #ffffff; position: absolute; top: 35px; right: 20px;" class="d-flex justify-content-end ml-auto btn btn-secondary " data-toggle="modal" data-target="#google_business_account_info_modal"><i class="fa fa-edit" style="font-size: 16px;"></i></button>
                    @include('service-type.modal.basic-seo.google_business_account_info_modal')
                </div>
            </div>

            <div class="card mb-2">
                <div class="card-body">
                    <div class="row">
                        <div class="col-4">
                            <p>Share CMS Access</p>
                        </div>
                        @if($sales_basic_seo !=null)
                            <div class="col-8">
                                @if($sales_basic_seo->share_cms_access_info ==1)
                                    <p>Yes</p>
                                @else
                                    <p>No</p>
                                @endif
                            </div>
                        @else
                            <div class="col-8">
                                @if($basic_seo->share_cms_access_info ==1)
                                    <p data-toggle="tooltip" data-placement="top" title="Click to edit">Yes</p>
                                @else
                                    <p data-toggle="tooltip" data-placement="top" title="Click to edit">No</p>
                                @endif
                            </div>
                        @endif

                        @if($sales_basic_seo && $sales_basic_seo->share_cms_access_info == 1)
                            <div class="col-4"></div>
                            <div class="col-8">
                                <p>{{$sales_basic_seo->url}}</p>
                                <p>{{$sales_basic_seo->user_name}}</p>
                                <p>{{$sales_basic_seo->password4}}</p>
                            </div>
                        @else
                            @if($basic_seo && $basic_seo->share_cms_access_info == 1)
                                <div class="col-4"></div>
                                <div class="col-8">
                                    <p data-toggle="tooltip" data-placement="top" title="Click to edit">{{$basic_seo->url}}</p>
                                    <p data-toggle="tooltip" data-placement="top" title="Click to edit">{{$basic_seo->user_name}}</p>
                                    <p data-toggle="tooltip" data-placement="top" title="Click to edit">{{$basic_seo->password4}}</p>
                                </div>
                            @endif
                        @endif

                        @if($sales_basic_seo && $sales_basic_seo->share_cms_access_info==0)
                            <div class="col-4"></div>
                            <div class="col-8">
                                @if($sales_basic_seo->confirmAdding==0)
                                <p>Confirm After Adding </p>
                                @endif
                            </div>
                        @else
                            @if($basic_seo && $basic_seo->share_cms_access_info==0)
                            <div class="col-4"></div>
                            <div class="col-8">
                                @if($basic_seo->confirmAdding==0)
                                <p data-toggle="tooltip" data-placement="top" title="Click to edit">Confirm After Adding </p>
                                @endif
                            </div>
                            @endif
                        @endif
                    </div>
                        <button type="button" style="background-color: #ffffff; position: absolute; top: 35px; right: 20px;" class="d-flex justify-content-end ml-auto btn btn-secondary " data-toggle="modal" data-target="#share_cms_modal"><i class="fa fa-edit" style="font-size: 16px;"></i></button>
                    @include('service-type.modal.basic-seo.share_cms_modal')
                </div>
            </div>
        </div>
    </div>
    @endif
    @if ($sales_basic_seo !=null && $sales_basic_seo->status == 'submitted')
        @if (Auth::user()->role_id == 4 || Auth::user()->role_id == 1)
            <div class="row">
                <div class="col-12">
                    <div class="card mb-5 mt-3" style="border: none">
                        <h4 class="text-center my-3">Fields Needed to be Filled by Project Manager ({{ $pm->name }})</h4>
                        <div class="card-body">
                            <form action="" method="post" id="pm_form">
                                @csrf
                                <input type="hidden" name="sales_basic_seo_id" id="sales_basic_seo_id" value="{{ $sales_basic_seo->id }}">
                                <input type="hidden" name="deal_id" id="deal_id" value="{{ $sales_basic_seo->deal_id }}">
                                <input type="hidden" name="milestone_id" id="milestone_id" value="{{ $sales_basic_seo->milestone_id }}">
                                <div class="row">
                                    <div class="col-md-4">
                                        <h6>Site Owner's Name:</h6>
                                    </div>
                                    <div class="col-md-8">
                                        <input type="text" name="owner_name2" id="owner_name2" value="{{ $sales_basic_seo->owner_name }}" class="form-control placeholderText height-35 f-14" placeholder="Write site owner's name here">
                                    </div>
                                </div>
                                <div class="row mt-3">
                                    <div class="col-md-4">
                                        <h6>Exact Business Name:</h6>
                                    </div>
                                    <div class="col-md-8">
                                        <input type="text" name="business_name2" id="business_name2" value="{{ $sales_basic_seo->business_name }}" class="form-control placeholderText height-35 f-14" placeholder="Type your exact business name">
                                    </div>
                                </div>
                                <div class="row mt-3">
                                    <div class="col-md-4">
                                        <h6>Full Address of Your Business:</h6>
                                    </div>
                                    <div class="col-md-8">
                                        <input type="text" name="business_address2" id="business_address2" value="{{ $sales_basic_seo->business_address }}" class="form-control placeholderText height-35 f-14" placeholder="Type full address of your business">
                                    </div>
                                </div>
                                <div class="row mt-3">
                                    <div class="col-md-4">
                                        <h6>Phone Number:</h6>
                                    </div>
                                    <div class="col-md-8">
                                        <input type="text" name="phone_number2" id="phone_number2" value="{{ $sales_basic_seo->phone_number }}" class="form-control placeholderText height-35 f-14" placeholder="Type phone number">
                                    </div>
                                </div>
                                <div class="row mt-3">
                                    <div class="col-md-4">
                                        <h6>Zip Code:</h6>
                                    </div>
                                    <div class="col-md-8">
                                        <input type="text" name="zip_code2" id="zip_code2" value="{{ $sales_basic_seo->zip_code }}" class="form-control placeholderText height-35 f-14" placeholder="Type zip code">
                                    </div>
                                </div>
                                <div class="row mt-3">
                                    <div class="col-md-4">
                                        <h6>Do you have a google search console account created?</h6>
                                    </div>
                                    <div class="col-md-8">
                                        <div class="form-group d-flex">
                                            <div class="form-check">
                                                <input class="form-check-input" type="radio" name="google_search_info" value="1" id="google_search_info_yesBtn1" {{ ($sales_basic_seo->google_search_info=="1")? "checked" : "" }}>
                                                <label class="form-check-label mt-1 ml-1" for="google_search_info_yesBtn1">
                                                    Yes
                                                </label>
                                            </div>
                                            <div class="form-check" style="margin-left: 10px;">
                                                <input class="form-check-input" type="radio" name="google_search_info" value="0" id="google_search_info_noBtn1" {{ ($sales_basic_seo->google_search_info=="0")? "checked" : "" }}>
                                                <label class="form-check-label mt-1 ml-1" for="google_search_info_noBtn1">
                                                    No
                                                </label>
                                            </div>
                                        </div>
                                        <div class="mt-3" id="googleSearchInfoYes" style="display:none;">
                                            <div class="d-flex">
                                                <label for="">add info@seopage1.net as an admin there</label>
                                                <div class="form-check" style="margin-left: 30px;">
                                                    <input class="form-check-input" type="radio" name="done1" value="1" id="done1">
                                                    <label class="form-check-label mt-1 ml-1" for="done1">
                                                        Done
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="mt-3" id="googleSearchInfoNo" style="display:none;">
                                            <div class="row">
                                                <label for="" style="margin-left: 18px;">Please open and share a gmail login and password so we can use it to create an account for you</label>
                                                <div class="col-md-6">
                                                    <input type="email" name="google_search_info_email" id="google_search_info_email" class="form-control placeholderText height-35 f-14" placeholder="Type email here">
                                                </div>
                                                <div class="col-md-6">
                                                    <input type="text" name="google_search_info_password" id="google_search_info_password" class="form-control placeholderText height-35 f-14" placeholder="Type password here">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="row mt-3">
                                    <div class="col-md-4">
                                        <h6>Do you have a google analytics account created?</h6>
                                    </div>
                                    <div class="col-md-8">
                                        <div class="form-group d-flex">
                                            <div class="form-check">
                                                <input class="form-check-input" type="radio" name="google_analytic_info" value="1" id="google_analytic_info_yes" {{ ($sales_basic_seo->google_analytic_info=="1")? "checked" : "" }}>
                                                <label class="form-check-label mt-1 ml-1" for="google_analytic_info_yes">
                                                    Yes
                                                </label>
                                            </div>
                                            <div class="form-check" style="margin-left: 10px;">
                                                <input class="form-check-input" type="radio" name="google_analytic_info" value="0" id="google_analytic_info_no" {{ ($sales_basic_seo->google_analytic_info=="0")? "checked" : "" }}>
                                                <label class="form-check-label mt-1 ml-1" for="google_analytic_info_no">
                                                    No
                                                </label>
                                            </div>
                                        </div>
                                        <div class="mt-3" id="googleAnalyticInfoYes" style="display:none;">
                                            <div class="d-flex">
                                                <label for="">add info@seopage1.net as an admin there</label>
                                                <div class="form-check" style="margin-left: 30px;">
                                                    <input class="form-check-input" type="radio" name="done2" value="1" id="done2">
                                                    <label class="form-check-label mt-1 ml-1" for="done2">
                                                        Done
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="mt-3" id="googleAnalyticInfoNo" style="display:none;">
                                            <div class="row">
                                                <label for="" style="margin-left: 18px;">Please open and share a gmail login and password so we can use it to create an account for you</label>
                                                <div class="col-md-6">
                                                    <input type="email" name="google_analytic_info_email" id="google_analytic_info_email" class="form-control placeholderText height-35 f-14" placeholder="Type email here">
                                                </div>
                                                <div class="col-md-6">
                                                    <input type="text" name="google_analytic_info_password" id="google_analytic_info_password" class="form-control placeholderText height-35 f-14" placeholder="Type password here">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="row mt-3">
                                    <div class="col-md-4">
                                        <h6>Do you have a google my business account created?</h6>
                                    </div>
                                    <div class="col-md-8">
                                        <div class="form-group d-flex">
                                            <div class="form-check">
                                                <input class="form-check-input" type="radio" name="google_business_account_info" value="1" id="google_business_account_info_yes" {{ ($sales_basic_seo->google_business_account_info=="1")? "checked" : "" }}>
                                                <label class="form-check-label mt-1 ml-1" for="google_business_account_info_yes">
                                                    Yes
                                                </label>
                                            </div>
                                            <div class="form-check" style="margin-left: 10px;">
                                                <input class="form-check-input" type="radio" name="google_business_account_info" value="0" id="google_business_account_info_no" {{ ($sales_basic_seo->google_business_account_info=="0")? "checked" : "" }}>
                                                <label class="form-check-label mt-1 ml-1" for="google_business_account_info_no">
                                                    No
                                                </label>
                                            </div>
                                        </div>
                                        <div class="mt-3" id="googleBusinessAccountInfoYes" style="display:none;">
                                            <div class="d-flex">
                                                <label for="">add info@seopage1.net as an admin there</label>
                                                <div class="form-check" style="margin-left: 30px;">
                                                    <input class="form-check-input" type="radio" name="done3" value="1" id="done3">
                                                    <label class="form-check-label mt-1 ml-1" for="done3">
                                                        Done
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="mt-3" id="googleBusinessAccountInfoNo" style="display:none;">
                                            <div class="row">
                                                <label for="" style="margin-left: 18px;">Please open and share a gmail login and password so we can use it to create an account for you</label>
                                                <div class="col-md-6">
                                                    <input type="email" name="google_business_account_info_email" id="google_business_account_info_email" class="form-control placeholderText height-35 f-14" placeholder="Type email here">
                                                </div>
                                                <div class="col-md-6">
                                                    <input type="text" name="google_business_account_info_password" id="google_business_account_info_password" class="form-control placeholderText height-35 f-14" placeholder="Type password here">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="row mt-3">
                                    <div class="col-md-4">
                                        <h6>Share CMS Access</h6>
                                    </div>
                                    <div class="col-md-8">
                                        <div class="form-group d-flex">
                                            <div class="form-check">
                                                <input class="form-check-input" type="radio" name="share_cms_access_info" value="1" id="share_cms_access_info_yes" {{ ($sales_basic_seo->share_cms_access_info=="1")? "checked" : "" }}>
                                                <label class="form-check-label mt-1 ml-1" for="share_cms_access_info_yes">
                                                    Share Direct Access
                                                </label>
                                            </div>
                                            <div class="form-check" style="margin-left: 10px;">
                                                <input class="form-check-input" type="radio" name="share_cms_access_info" value="0" id="share_cms_access_info_no" {{ ($sales_basic_seo->share_cms_access_info=="0")? "checked" : "" }}>
                                                <label class="form-check-label mt-1 ml-1" for="share_cms_access_info_no">
                                                    Share Admin Access With My Email
                                                </label>
                                            </div>
                                        </div>
                                        <div class="mt-3" id="shareCmsAccessYes" style="display:none;">
                                            <div class="row">
                                                <div class="col-md-4">
                                                    <label for="">Login URl</label>
                                                    <input type="url" name="login_url" id="login_url" class="form-control placeholderText height-35 f-14" placeholder="https://admin.com">
                                                </div>
                                                <div class="col-md-4">
                                                    <label for="">Email/Username</label>
                                                    <input type="text" name="email" id="email" class="form-control placeholderText height-35 f-14" placeholder="Type email/username here">
                                                </div>
                                                <div class="col-md-4">
                                                    <label for="">Password</label>
                                                    <input type="text" name="password" id="password" class="form-control placeholderText height-35 f-14" placeholder="Type password here">
                                                </div>
                                            </div>
                                        </div>
                                        <div class="mt-3" id="shareCmsAccessNo" style="display:none;">
                                            <div class="d-flex">
                                                <label for="">Please add info@seopage1.net as an admin there</label>
                                                <div class="form-check" style="margin-left: 30px;">
                                                    <input class="form-check-input" type="radio" name="confirmAdding" value="1" id="confirmAdding">
                                                    <label class="form-check-label mt-1 ml-1" for="confirmAdding">
                                                        Confirm After Adding
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="row mt-3">
                                    <div class="col-md-4">
                                        <h6>Google search console setup?</h6>
                                    </div>
                                    <div class="col-md-8">
                                        <div class="form-group d-flex">
                                            <div class="form-check">
                                                <input class="form-check-input" type="radio" name="google_console_setup" value="1" id="google_console_setup_yes">
                                                <label class="form-check-label mt-1 ml-1" for="google_console_setup_yes">
                                                    Yes
                                                </label>
                                            </div>
                                            <div class="form-check" style="margin-left: 10px;">
                                                <input class="form-check-input" type="radio" name="google_console_setup" value="0" id="google_console_no" >
                                                <label class="form-check-label mt-1 ml-1" for="google_console_no">
                                                    No
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="row mt-3">
                                    <div class="col-md-4">
                                        <h6>Google analytics setup?</h6>
                                    </div>
                                    <div class="col-md-8">
                                        <div class="form-group d-flex">
                                            <div class="form-check">
                                                <input class="form-check-input" type="radio" name="google_analytics_setup" value="1" id="google_analytics_setup_yes">
                                                <label class="form-check-label mt-1 ml-1" for="google_analytics_setup_yes">
                                                    Yes
                                                </label>
                                            </div>
                                            <div class="form-check" style="margin-left: 10px;">
                                                <input class="form-check-input" type="radio" name="google_analytics_setup" value="0" id="google_analytics_no" >
                                                <label class="form-check-label mt-1 ml-1" for="google_analytics_no">
                                                    No
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="row mt-3">
                                    <div class="col-md-4">
                                        <h6>Sitemap setup?</h6>
                                    </div>
                                    <div class="col-md-8">
                                        <div class="form-group d-flex">
                                            <div class="form-check">
                                                <input class="form-check-input" type="radio" name="sitemap_setup" value="1" id="sitemap_setup_yes">
                                                <label class="form-check-label mt-1 ml-1" for="sitemap_setup_yes">
                                                    Yes
                                                </label>
                                            </div>
                                            <div class="form-check" style="margin-left: 10px;">
                                                <input class="form-check-input" type="radio" name="sitemap_setup" value="0" id="sitemap_no" >
                                                <label class="form-check-label mt-1 ml-1" for="sitemap_no">
                                                    No
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="row mt-3">
                                    <div class="col-md-4">
                                        <h6>Robots txt setup?</h6>
                                    </div>
                                    <div class="col-md-8">
                                        <div class="form-group d-flex">
                                            <div class="form-check">
                                                <input class="form-check-input" type="radio" name="robots_txt_setup" value="1" id="robots_txt_setup_yes">
                                                <label class="form-check-label mt-1 ml-1" for="robots_txt_setup_yes">
                                                    Yes
                                                </label>
                                            </div>
                                            <div class="form-check" style="margin-left: 10px;">
                                                <input class="form-check-input" type="radio" name="robots_txt_setup" value="0" id="robots_txt_no" >
                                                <label class="form-check-label mt-1 ml-1" for="robots_txt_no">
                                                    No
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="row mt-3">
                                    <div class="col-md-4">
                                        <h6>Google my business setup?</h6>
                                    </div>
                                    <div class="col-md-8">
                                        <div class="form-group d-flex">
                                            <div class="form-check">
                                                <input class="form-check-input" type="radio" name="google_business_setup" value="1" id="google_business_setup_yes">
                                                <label class="form-check-label mt-1 ml-1" for="google_business_setup_yes">
                                                    Yes
                                                </label>
                                            </div>
                                            <div class="form-check" style="margin-left: 10px;">
                                                <input class="form-check-input" type="radio" name="google_business_setup" value="0" id="google_business_setup_no" >
                                                <label class="form-check-label mt-1 ml-1" for="google_business_setup_no">
                                                    No
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="d-flex justify-content-center">
                                    <button type="submit" class="btn btn-primary mt-5 " id="pm_basic_seo_submit">Submit</button>
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
        $('#google_search_info_yesBtn1').click(function() {
            $('#googleSearchInfoYes').show();
            $('#googleSearchInfoNo').hide();
        });
        $('#google_search_info_noBtn1').click(function() {
            $('#googleSearchInfoYes').hide();
            $('#googleSearchInfoNo').show();
        });
        $('#google_analytic_info_yes').click(function() {
            $('#googleAnalyticInfoYes').show();
            $('#googleAnalyticInfoNo').hide();
        });
        $('#google_analytic_info_no').click(function() {
            $('#googleAnalyticInfoYes').hide();
            $('#googleAnalyticInfoNo').show();
        });
        $('#google_business_account_info_yes').click(function() {
            $('#googleBusinessAccountInfoYes').show();
            $('#googleBusinessAccountInfoNo').hide();
        });
        $('#google_business_account_info_no').click(function() {
            $('#googleBusinessAccountInfoYes').hide();
            $('#googleBusinessAccountInfoNo').show();
        });
        $('#share_cms_access_info_yes').click(function() {
            $('#shareCmsAccessYes').show();
            $('#shareCmsAccessNo').hide();
        });
        $('#share_cms_access_info_no').click(function() {
            $('#shareCmsAccessYes').hide();
            $('#shareCmsAccessNo').show();
        });
    });

    function toggleOwnerNameButton() {
        var button = document.getElementById('owner_name_btn');
        var input_owner_name = document.getElementById('input_owner_name');

        button.style.display = 'none';
        input_owner_name.style.display = 'flex';
    }
    function toggleBusinessNameButton() {
        var button = document.getElementById('business_name_btn');
        var input_business_name = document.getElementById('input_business_name');

        button.style.display = 'none';
        input_business_name.style.display = 'flex';
    }
    function toggleBusinessAddressButton() {
        var button = document.getElementById('business_address_btn');
        var input_business_address = document.getElementById('input_business_address');

        button.style.display = 'none';
        input_business_address.style.display = 'flex';
    }
    function togglePhoneNumberButton() {
        var button = document.getElementById('phone_number_btn');
        var input_phone_number = document.getElementById('input_phone_number');

        button.style.display = 'none';
        input_phone_number.style.display = 'flex';
    }
    function toggleZipCodeButton() {
        var button = document.getElementById('zip_code_btn');
        var input_zip_code = document.getElementById('input_zip_code');

        button.style.display = 'none';
        input_zip_code.style.display = 'flex';
    }


    // AJAX call
    $(document).ready(function() {
            $('.saveOwnerNameBtn, .saveBusinessNameBtn, .saveBusinessAddressBtn, .savePhoneNoBtn, .saveZipCodeBtn').click(function(event) {
                event.preventDefault();
                var id = $(this).data('id');
                var data= {
                    '_token': "{{ csrf_token() }}",
                    'owner_name': document.getElementById("owner_name").value,
                    'business_name': document.getElementById("business_name").value,
                    'business_address': document.getElementById("business_address").value,
                    'phone_number': document.getElementById("phone_number").value,
                    'zip_code': document.getElementById("zip_code").value,
                    'deal_id': {{$basic_seo->deal_id}},
                    'basic_seo_id': {{$basic_seo->id}},
                    'milestone_id': {{$basic_seo->milestone_id}},
                }
                $.ajaxSetup({
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                }
            });
            $.ajax({
                url: '/projects/update-basic-seo/'+id,
                method: 'put',
                data: data,
                dataType: "json",
                success: function (response) {
                    if(response.owner_name){
                        $('#owner_name_form').hide();
                        $('#owner_name_container').html();
                        $('#owner_name_container').html('<button id="owner_name_btn" type="submit" style="background-color: #ffffff">' + response.owner_name + '</button>');
                    }
                    if(response.business_name){
                        $('#business_name_form').hide();
                        $('#business_name_container').html();
                        $('#business_name_container').html('<button id="business_name_btn" type="submit" style="background-color: #ffffff">' + response.business_name + '</button>');
                    }
                    if(response.business_address){
                        $('#business_address_form').hide();
                        $('#business_address_container').html();
                        $('#business_address_container').html('<button id="business_address_btn" type="submit" style="background-color: #ffffff">' + response.business_address + '</button>');
                    }
                    if(response.phone_number){
                        $('#phone_number_form').hide();
                        $('#phone_number_container').html();
                        $('#phone_number_container').html('<button id="phone_number_btn" type="submit" style="background-color: #ffffff">' + response.phone_number + '</button>');
                    }
                    if(response.zip_code){
                        $('#zip_code_form').hide();
                        $('#zip_code_container').html();
                        $('#zip_code_container').html('<button id="zip_code_btn" type="submit" style="background-color: #ffffff">' + response.zip_code + '</button>');
                    }
                    toastr.success('Change Successfully');
                },
                error: function(error) {
                    // console.log(response);
                    if(error.responseJSON.errors.owner_name){
                    $('#owner_name_error').text(error.responseJSON.errors.owner_name);
                    }else{
                        $('#owner_name_error').text('');
                    }
                    if(error.responseJSON.errors.business_name){
                    $('#business_name_error').text(error.responseJSON.errors.business_name);
                    }else{
                        $('#business_name_error').text('');
                    }
                    if(error.responseJSON.errors.business_address){
                    $('#business_address_error').text(error.responseJSON.errors.business_address);
                    }else{
                        $('#business_address_error').text('');
                    }
                    if(error.responseJSON.errors.phone_number){
                    $('#phone_number_error').text(error.responseJSON.errors.phone_number);
                    }else{
                        $('#phone_number_error').text('');
                    }
                    if(error.responseJSON.errors.zip_code){
                    $('#zip_code_error').text(error.responseJSON.errors.zip_code);
                    }else{
                        $('#zip_code_error').text('');
                    }
                }
            });
            });
        });
</script>


<script>
    $(document).ready(function() {
        $('#pm_basic_seo_submit').click(function(event) {
            event.preventDefault();
            $('#pm_basic_seo_submit').attr("disabled", true);
            $('#pm_basic_seo_submit').html("Processing...");
            var google_search_info = $('input[name="google_search_info"]:checked').val();
            var google_analytic_info = $('input[name="google_analytic_info"]:checked').val();
            var google_business_account_info = $('input[name="google_business_account_info"]:checked').val();
            var share_cms_access_info = $('input[name="share_cms_access_info"]:checked').val();
            var done1 = $('input[name="done1"]:checked').val();
            var done2 = $('input[name="done2"]:checked').val();
            var done3 = $('input[name="done3"]:checked').val();
            var confirmAdding = $('input[name="confirmAdding"]:checked').val();
            var google_console_setup = $('input[name="google_console_setup"]:checked').val();
            var google_analytics_setup = $('input[name="google_analytics_setup"]:checked').val();
            var sitemap_setup = $('input[name="sitemap_setup"]:checked').val();
            var robots_txt_setup = $('input[name="robots_txt_setup"]:checked').val();
            var google_business_setup = $('input[name="google_business_setup"]:checked').val();

            var data= {
                '_token': "{{ csrf_token() }}",
                'sales_basic_seo_id': document.getElementById("sales_basic_seo_id").value,
                'deal_id': document.getElementById("deal_id").value,
                'milestone_id': document.getElementById("milestone_id").value,
                'owner_name2': document.getElementById("owner_name2").value,
                'business_name2': document.getElementById("business_name2").value,
                'business_address2': document.getElementById("business_address2").value,
                'phone_number2': document.getElementById("phone_number2").value,
                'zip_code2': document.getElementById("zip_code2").value,
                'google_search_info': google_search_info,
                'done1': done1,
                'google_search_info_email': document.getElementById("google_search_info_email").value,
                'google_search_info_password': document.getElementById("google_search_info_password").value,
                'google_analytic_info': google_analytic_info,
                'done2': done2,
                'google_analytic_info_email': document.getElementById("google_analytic_info_email").value,
                'google_analytic_info_password': document.getElementById("google_analytic_info_password").value,
                'google_business_account_info': google_business_account_info,
                'done3': done3,
                'google_business_account_info_email': document.getElementById("google_business_account_info_email").value,
                'google_business_account_info_password': document.getElementById("google_business_account_info_password").value,
                'share_cms_access_info': share_cms_access_info,
                'login_url': document.getElementById("login_url").value,
                'email': document.getElementById("email").value,
                'password': document.getElementById("password").value,
                'confirmAdding': confirmAdding,
                'google_console_setup': google_console_setup,
                'google_analytics_setup': google_analytics_setup,
                'sitemap_setup': sitemap_setup,
                'robots_txt_setup': robots_txt_setup,
                'google_business_setup': google_business_setup,
            }
            $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            }
        });
        $.ajax({
            type: "POST",
            url: "{{route('pm_basic_seo_update')}}",
            data: data,
            dataType: "json",
            success: function (response) {
                if (response.status==200) {
                    toastr.success('Updated Successfully');
                    $(location).prop('href', '{{route('viewBasicSEO',$basic_seo->deal_id)}}');
                    $('#pm_basic_seo_submit').attr("disabled", false);
                    $('#pm_basic_seo_submit').html("Submit");
                }
            },
            error: function(error) {
                // console.log(response);
                $('#pm_basic_seo_submit').attr("disabled", false);
                $('#pm_basic_seo_submit').html("Submit");
            }
        });
        });
    });
</script>
