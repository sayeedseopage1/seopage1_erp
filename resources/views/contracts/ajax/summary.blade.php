<style>
    .logo {
        height: 33px;
    }

    .signature_wrap {
        position: relative;
        height: 150px;
        -moz-user-select: none;
        -webkit-user-select: none;
        -ms-user-select: none;
        user-select: none;
        width: 400px;
    }

    .signature-pad {
        position: absolute;
        left: 0;
        top: 0;
        width: 400px;
        height: 150px;
    }

</style>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css">
<?php
$project_id= App\Models\PMProject::where('deal_id',$contract->deal->id)->first();
//dd($project_id->project_id);
$currency_id= App\Models\Currency::where('id',$contract->original_currency_id)->first();

 ?>


<div class="card border-0 invoice">

<!-- CARD BODY START -->

    <div class="card-body">

        <div class="invoice-table-wrapper">

            <table width="100%" class="">
                <tr class="inv-logo-heading">
                    <td><img src="{{ invoice_setting()->logo_url }}" alt="{{ mb_ucwords(global_setting()->company_name) }}"
                            class="logo" /></td>
                            <td>
                              <div class="dropdown float-right">
                                  <button class="btn f-14 px-0 py-0 text-dark-grey dropdown-toggle" type="button"
                                      data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                      <i class="fa fa-ellipsis-h"></i>
                                  </button>

                                  <div class="dropdown-menu dropdown-menu-right border-grey rounded b-shadow-4 p-0"
                                      aria-labelledby="dropdownMenuLink" tabindex="0">
                                      <a class="dropdown-item"
                                          href="/deals/details/edit/{{$contract->deal->id}}">@lang('Edit')</a>
                                  </div>
                              </div>


                            </td>


                </tr>
                <tr>
                  <td>
                    <div class="d-flex justify-content-center">
                      @if(Auth::user()->role_id == 4)
                      @if($contract->deal->status == 'pending')
                      <button class="btn btn-danger mr-3"  type="button" data-toggle="modal" data-target="#dealdenymodal">Deny <i class="fa-solid fa-xmark"></i></button>
                        @include('contracts.modals.dealdenymodal')
                      <a href="/account/projects/{{$project_id->project_id}}/edit" class="btn btn-success">Accept <i class="fa-solid fa-check"></i></a>

                      @elseif($contract->deal->status == 'Accepted')
                        <h3 class="d-flex justify-content-center" style="color:green;">{{$contract->deal->status}}</h3>
                        @else
                      <h3 class="d-flex justify-content-center" style="color:red;">{{$contract->deal->status}}</h3>

                      @endif
                      @else
                          <h3 class="d-flex justify-content-center" style="color:green;">{{$contract->deal->status}}</h3>
                      @endif
                    </div>
                  </td>

                </tr>
                <tr class="inv-num">
                    <td class="f-14 text-dark">
                        <p class="mt-3 mb-0">
                            {{ mb_ucwords(global_setting()->company_name) }}<br>
                            {!! nl2br(default_address()->address) !!}<br>
                            {{ global_setting()->company_phone }}
                        </p><br>
                        <p class="mb-0 text-left"><span
                                class="text-dark-grey text-capitalize">@lang("app.client")</span><br>
                            {{ mb_ucwords($contract->deal->client_name) }}<br>
                           {{ mb_ucwords($contract->deal->organization) }}<br>
                          {{--  {!! nl2br($contract->client->clientDetails->address) !!}</p>--}}
                    </td>
                  
                    <td align="right">
                        <table class="inv-num-date text-dark f-13 mt-3">
                            <tr>
                                <td class="bg-light-grey border-right-0 f-w-500">
                                    Deal Number</td>
                                <td class="border-left-0">#{{ $contract->deal->deal_id }}</td>
                            </tr>
                            <tr>
                                <td class="bg-light-grey border-right-0 f-w-500">
                                    @lang('modules.projects.startDate')</td>
                                <td class="border-left-0">{{ $contract->start_date->format(global_setting()->date_format) }}
                                </td>
                            </tr>
                            <tr>
                                <td class="bg-light-grey border-right-0 f-w-500">
                                  Deal Name</td>
                                <td class="border-left-0">{{ $contract->deal->project_name }}
                                </td>
                            </tr>
                            @if ($contract->actual_amount != 0)
                            <tr>
                              <td class="bg-light-grey border-right-0 f-w-500">
                                Deal Value </td>
                                <td class="border-left-0">
                                    <h4>
                                        {{$contract->actual_amount}}{{$contract->deal->original_currency->currency_symbol}}</h4>
                                </td>


                            </tr>


                            @endif
                          {{-- @if ($contract->end_date != null)
                                <tr>
                                    <td class="bg-light-grey border-right-0 f-w-500">@lang('modules.contracts.endDate')
                                    </td>
                                    <td class="border-left-0">{{ $contract->end_date->format(global_setting()->date_format) }}
                                    </td>
                                </tr>
                            @endif --}}
                            <tr>
                                {{--}}<td class="bg-light-grey border-right-0 f-w-500">
                                    @lang('modules.contracts.contractType')</td>
                                <td class="border-left-0">{{ $contract->contractType->name }}
                                </td> --}}
                            </tr>
                        </table>

                    </td>
                </tr>
                <tr>
                    <td height="20"></td>
                </tr>
            </table>

        </div>

        <div class="d-flex flex-column">



</div>





        </div>



    </div>
    <!-- CARD BODY END -->
  <br>



      <h4 class="text-center">Deal Details From Sales Team</h4>
      <hr>


      <div class="row mb-4" >
          <!-- BUDGET VS SPENT START -->
          <div class="col-md-12">
              <x-cards.data>
                  <div class="row-cols-lg-1">
                      <div class="col">
                          <h4>Freelancer Profile Link</h4>
                          <br>
                          <p><a href="{{ $contract->deal->profile_link}}">{{ $contract->deal->profile_link}}</a></p>

                      </div>

                  </div>
              </x-cards.data>
          </div>
          <!-- BUDGET VS SPENT END -->
      </div>
      <div class="row mb-4" >
          <!-- BUDGET VS SPENT START -->
          <div class="col-md-12">
              <x-cards.data>
                  <div class="row-cols-lg-1">
                      <div class="col">
                          <h4>Freelancer Message Link</h4>
                          <br>
                          <p>{!! $contract->deal->message_link !!}</p>

                      </div>

                  </div>
              </x-cards.data>
          </div>
          <!-- BUDGET VS SPENT END -->
      </div>
      <div class="row mb-4" >
          <!-- BUDGET VS SPENT START -->
          <div class="col-md-12">
              <x-cards.data>
                  <div class="row-cols-lg-1">
                      <div class="col">
                          <h4>Write the what in 2-8 words here (Examples: Website redesign, Shopify website migration to Wix, Creating a 5 page business website in WordPress, Shopify website creation, etc.)</h4>
                          <br>
                          <p>{!! $contract->deal->description2 !!}</p>

                      </div>

                  </div>
              </x-cards.data>
          </div>
          <!-- BUDGET VS SPENT END -->
      </div>
      <div class="row mb-4" >
          <!-- BUDGET VS SPENT START -->
          <div class="col-md-12">
              <x-cards.data>
                  <div class="row-cols-lg-1">
                      <div class="col">
                          <h4>
                            Elaborate the "WHAT" 3-4 lines here (The client needs a 5 page static WordPress website for his new design agency.
                            It should include home, about, his services in one page, blog, and contact. The look and feel should be
                            better than the references.)</h4>
                          <br>
                          <p>{!! $contract->deal->description3 !!}</p>

                      </div>

                  </div>
              </x-cards.data>
          </div>
          <!-- BUDGET VS SPENT END -->
      </div>
      <div class="row mb-4" >
          <!-- BUDGET VS SPENT START -->
          <div class="col-md-12">
              <x-cards.data>
                  <div class="row-cols-lg-1">
                      <div class="col">
                          <h4>
                            Reference websites and what the references are for (Ex: ABC.com is for the color scheme. XYZ.com is for
                              section layouts DEF.com is for header & footer styling. However, none of these can be copied)</h4>
                          <br>
                          <p>{!! $contract->deal->description4 !!}</p>

                      </div>

                  </div>
              </x-cards.data>
          </div>
          <!-- BUDGET VS SPENT END -->
      </div>
      <div class="row mb-4" >
          <!-- BUDGET VS SPENT START -->
          <div class="col-md-12">
              <x-cards.data>
                  <div class="row-cols-lg-1">
                      <div class="col">
                          <h4>
                            Any particular focus/concern of the client (Ex: 1. The client is very concerned about the final look & feel so needs to be careful with the design 2. The client is very concerned if the booking functionality will work
                            the way he wants.)</h4>
                          <br>
                          <p>{!! $contract->deal->description5 !!}</p>

                      </div>

                  </div>
              </x-cards.data>
          </div>
          <!-- BUDGET VS SPENT END -->
      </div>
      <div class="row mb-4" >
          <!-- BUDGET VS SPENT START -->
          <div class="col-md-12">
              <x-cards.data>
                  <div class="row-cols-lg-1">
                      <div class="col">
                          <h4>
                            Required logins (Whichever of these are applicable: Wordpress, FTP, Cpanel, shopify, Domain register)</h4>
                          <br>
                          <p>{!! $contract->deal->description6 !!}</p>

                      </div>

                  </div>
              </x-cards.data>
          </div>
          <!-- BUDGET VS SPENT END -->
      </div>
      <div class="row mb-4" >
          <!-- BUDGET VS SPENT START -->
          <div class="col-md-12">
              <x-cards.data>
                  <div class="row-cols-lg-1">
                      <div class="col">
                          <h4>Logo (Upload the google drive link here. Always ask for PSD and AI files so they are editable)</h4>
                          <br>
                          <p>{!! $contract->deal->description7 !!}</p>

                      </div>

                  </div>
              </x-cards.data>
          </div>
          <!-- BUDGET VS SPENT END -->
      </div>
      <div class="row mb-4" >
          <!-- BUDGET VS SPENT START -->
          <div class="col-md-12">
              <x-cards.data>
                  <div class="row-cols-lg-1">
                      <div class="col">
                          <h4>  If there is any cross-departmental work involved in this project
                            (Example: SEO, Content writing, design, google ads, social media marketing, email marketing & anything else that is not explicitly included in web
                            development)</h4>
                          <br>
                          <p>{!! $contract->deal->description8 !!}</p>

                      </div>

                  </div>
              </x-cards.data>
          </div>
          <!-- BUDGET VS SPENT END -->
      </div>
      <div class="row mb-4" >
          <!-- BUDGET VS SPENT START -->
          <div class="col-md-12">
              <x-cards.data>
                  <div class="row-cols-lg-1">
                      <div class="col">
                          <h4>Any other notes for the project manager/technical team</h4>
                          <br>
                          <p>{!! $contract->deal->description9 !!}</p>

                      </div>

                  </div>
              </x-cards.data>
          </div>
          <!-- BUDGET VS SPENT END -->
      </div>
    <!-- CARD FOOTER START -->

    <!-- CARD FOOTER END -->
</div>
<!-- INVOICE CARD END -->
