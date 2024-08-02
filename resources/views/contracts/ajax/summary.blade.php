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
    .table th, .table td {
        padding: 0.75rem;
        vertical-align: middle;
        border-top: 1px solid #dee2e6;
    }
  .wrapper-timezone p {
    font-size: 24px;
    color: #4b4e69;
    padding-bottom: 30px;
}
</style>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css">
<link href="http://www.jqueryscript.net/css/jquerysctipttop.css" rel="stylesheet" type="text/css" />
<link rel="stylesheet" media="screen" href="https://fontlibrary.org/face/segment7" type="text/css" />
       <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto+Condensed" type="text/css" />



        <link rel="stylesheet" href="{{asset('countdown/css/style.css')}}" type="text/css" />
        <style media="screen">
        .wrapper-timezone {
  box-sizing: border-box;
  max-width: 303px;
  margin: 8px auto;
  text-align: center;
  background: #eee;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: -7px 0;
  border-radius: 12px;
}
.clock {
    margin: -8px 0 0 0;
}
.timer_text {
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    font-size: 9px;
    font-family: arial;
    margin: 1px;
}
.clock .column {
    border: 3px solid  #ddd;
    padding: 18px;
    text-align: center;
    display: inline-flex;
    flex-direction: column;
    align-content: center;
    justify-content: center;
    align-items: center;
    background: #1f2828;
    color: #fff;
    width: 84px;
    padding-bottom: 1px;
}
.wrapper-timezone {
    box-sizing: border-box;
    max-width: 282px;
    /* max-height: 290px; */
    margin: 8px auto;
    text-align: center;
    background: #eee;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: -7px 0;
    border-radius: 12px;
}
.clock .column {
	border: 3px solid #ddd;
	padding: 18px;
	text-align: center;
	display: inline-flex;
	flex-direction: column;
	align-content: center;
	justify-content: center;
	align-items: center;
	background: #a23d50;
	color: #fff;
	width: 84px;
	padding-bottom: 1px;
}
.wrapper-timezone p {

	font-size: 24px;

}
p {
	line-height: 30px;
	margin-top: 0;
}
.wrapper-timezone {

	/* background: #fff; */

}
        </style>
<?php
$deal_id=App\Models\Deal::where('id',$contract->deal->id)->first();
$project_id= App\Models\Project::where('deal_id',$contract->deal->id)->first();
//dd($project_id->project_id);
$currency_id= App\Models\Currency::where('id',$contract->original_currency_id)->first();

 ?>


<div class="card border-0 invoice">

<!-- CARD BODY START -->

    <div class="card-body">

        <div class="invoice-table-wrapper">


            <tr class="inv-logo-heading mt-3">
                <td><img src="{{ invoice_setting()->logo_url }}" alt="{{ mb_ucwords(global_setting()->company_name) }}"
                        class="logo" /></td>
                        @if(Auth::user()->role_id == 1 || Auth::user()->role_id== 7 || Auth::user()->role_id == 8)
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
                        @endif


            </tr>

            <div class="col-md-12">
              <div class="row">
                <div class="col-md-4">
                  <td class="f-14 text-dark">
                      <p class="mb-0">
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

                </div>
                <div class="col-md-4">
                  <?php
                  $to = \Carbon\Carbon::createFromFormat('Y-m-d H:s:i', \Carbon\Carbon::now());

                  $from = \Carbon\Carbon::createFromFormat('Y-m-d H:s:i', $contract->deal->award_time);

                  $diff_in_minutes = $from->diffInMinutes($to);
                  //dd($diff_in_minutes,$to,$from);
                   ?>

                @if(Auth::user()->role_id == 4 || Auth::user()->role_id == 1)
                    @if($contract->deal->status == 'pending')
                        @if($contract->deal->is_drafted == 0 && ($contract->deal->authorization_status == 1 || 
                        (((Carbon\Carbon::now()->diffInSeconds($contract->deal->released_at) > 10800) && (Carbon\Carbon::parse($contract->deal->released_at)->format('H:i:s') >= '07:00' && Carbon\Carbon::parse($contract->deal->released_at)->format('H:i:s') < '23:30')) || ((Carbon\Carbon::parse($contract->deal->released_at)->format('H:i:s') < '07:00' || Carbon\Carbon::parse($contract->deal->released_at)->format('H:i:s') >= '23:30') && (Carbon\Carbon::parse(now())->format('H:i:s') >= '10:00') || Carbon\Carbon::parse($contract->deal->released_at)->format('Y-m-d') < now()->format('Y-m-d')))))
                            <div class="wrapper-timezone d-flex justify-content-center">
                                <p>You have </p>
                                <div class="clock">
                                    <div class="column">
                                        <div class="timer" id="hours"></div>
                                        <div class="timer_text">HOURS</div>
                                    </div>
                                    <!-- <div class="timer">:</div> -->
                                    <div class="column">
                                        <div class="timer" id="minutes"></div>
                                        <div class="timer_text">MINUTES</div>
                                    </div>
                                    <!-- <div class="timer">:</div> -->
                                    <div class="column">
                                        <div class="timer" id="seconds"></div>
                                        <div class="timer_text">SECONDS</div>
                                    </div>
                                </div>
                                <p>remaining for accepting the project</p>
                            </div>
                        @else
                            @if($contract->deal->is_drafted == 1)
                            <h3>The project is drafted!</h3>
                            @else
                            <h3>Awaiting Authorization from Sales Lead!</h3>
                            @endif
                        @endif
                    @endif
                @endif
    @if($contract->deal->is_drafted == 0 && ($contract->deal->authorization_status == 1 || 
    (((Carbon\Carbon::now()->diffInSeconds($contract->deal->released_at) > 10800) && (Carbon\Carbon::parse($contract->deal->released_at)->format('H:i:s') >= '07:00' && Carbon\Carbon::parse($contract->deal->released_at)->format('H:i:s') < '23:30')) || ((Carbon\Carbon::parse($contract->deal->released_at)->format('H:i:s') < '07:00' || Carbon\Carbon::parse($contract->deal->released_at)->format('H:i:s') >= '23:30') && (Carbon\Carbon::parse(now())->format('H:i:s') >= '10:00') || Carbon\Carbon::parse($contract->deal->released_at)->format('Y-m-d') < now()->format('Y-m-d')))))
    <div class="wrapper-timezone d-flex justify-content-center">

        @if(Auth::user()->role_id == 4 || Auth::user()->role_id == 1)
            @if($contract->deal->status == 'pending')
                {{--  <button class="btn btn-danger mr-3"  type="button" data-toggle="modal" data-target="#dealdenymodal">Deny <i class="fa-solid fa-xmark"></i></button>
                    @include('contracts.modals.dealdenymodal') --}}
                @if($diff_in_minutes < 1230 )
                    @if($contract->deal->pm_id == Auth::id() || Auth::user()->role_id == 1)
                        <a href="/account/projects/{{$project_id->id}}/edit" class="btn btn-success">Submit Project Acceptance Form <i class="fa-solid fa-check"></i></a>
                    @endif
                @endif
            @elseif($contract->deal->status == 'Accepted')
                <h3 class="d-flex justify-content-center" style="color:green;">{{$contract->deal->status}}</h3>
            @else
                @if($contract->deal->status == 'Denied')
                    <h3 class="d-flex justify-content-left" style="color:red;">Time Expired</h3>
                    <span class="mt-5 d-flex justify-content-start">
                        @php
                        $award_time_request = App\Models\AwardTimeIncress::where('deal_id',$contract->deal->id)->where('status',1)->first();
                        $pending_award_time_request = App\Models\AwardTimeIncress::where('deal_id',$contract->deal->id)->first();
                        @endphp
                        @if($award_time_request == null)
                            <button class="btn btn-success award_time_incress">Request for time extension</button>
                        @else
                            @if($pending_award_time_request->status == 0)
                            <button class="btn btn-success">Pending</button>
                            @endif
                        @endif
                    </span>
                @endif

            @endif
        @else
            <h3 class="d-flex justify-content-center" style="color:green;">{{$contract->deal->status}}</h3>
        @endif
    </div>
    @endif
                </div>
                <div class="col-md-4" align="right">
                  <td >
                      <table  class="inv-num-date text-dark f-13 mt-3">
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
                                @lang('Deadline')</td>
                            <td class="border-left-0">{{ $contract->deal->deadline }}
                            </td>
                        </tr>
                        {{-- {{dd($contract->deal->lead_id)}} --}}
                        @if($contract->deal->lead_id != null)
                        <tr>
                            <td class="bg-light-grey border-right-0 f-w-500">
                              Lead Name</td>
                            <td class="border-left-0"><a href="{{route('leads.show',$deal_id->lead_id)}}">{{ $contract->deal->project_name }}</a>
                            </td>
                        </tr>
                        @endif
                          <tr>
                              <td class="bg-light-grey border-right-0 f-w-500">
                                Deal Name</td>
                                @php
                                    $deal= App\Models\DealStage::where('short_code',$deal_id->deal_id)->first();
                                @endphp
                              <td class="border-left-0"><a href="{{route('deals.show',$deal->id)}}">{{ $contract->deal->project_name }}</a>
                              </td>
                          </tr>
                          @php
                              $project= App\Models\Project::where('deal_id',$contract->deal->id)->first();
                          @endphp
                        @if($deal_id->pm_id != null)
                          <tr>
                            <td class="bg-light-grey border-right-0 f-w-500">
                              Project Name</td>

                            <td class="border-left-0"><a href="{{route('projects.show',$project->id)}}">{{ $project->project_name }}</a>
                            </td>
                        </tr>
                        @endif
                         @if($contract->deal->cms_name != null)
                            <tr>
                                <td class="bg-light-grey border-right-0 f-w-500">Project CMS</td>
                                <td class="border-left-0">{{ $contract->deal->cms_name }}</td>
                            </tr>
                          @endif
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
                          <tr>
                            <td class="bg-light-grey border-right-0 f-w-500">
                              Project Type </td>
                              <td class="border-left-0">
                                  <h4 class="badge badge-primary">{{$contract->deal->project_type}}</h4>
                              </td>


                          </tr>
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
                          <tr>
                              <td class="bg-light-grey border-right-0 f-w-500">
                                Project Manager</td>
                                @if($contract->deal->pm_id != null)
                              <td class="border-left-0"><a class="text-darkest-grey" href="/account/employees/{{$contract->deal->pm_id}}">{{ $contract->deal->pm->name }}</a>
                              </td>
                              @else
                              <td class="border-left-0"><a class="text-darkest-grey" href="#">--</a>
                              </td>
                              @endif

                          </tr>
                      </table>

                  </td>
                </div>

              </div>

            </div>


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
                          <h4>Project Milestones</h4>
                          <br>
                          <?php
                          $project= App\Models\Project::where('deal_id',$contract->deal->id)->first();
                          $milestones= App\Models\ProjectMilestone::where('project_id',$project->id)->get();
                           ?>
                           <table class="table table-responsive table-bordered table-striped">
     <thead class="thead-dark">
       <tr>
         <th scope="col">#</th>
         <th scope="col" class="col-3 col-sm-2">Milestone Name</th>
         <th scope="col" class="col-3 col-sm-2">Milestone Type</th>
         <th scope="col" class="col-3 col-sm-2">Milestone Cost</th>
          <th scope="col" class="col-6 col-md-8">Milestone Summary</th>
       </tr>
     </thead>
     <tbody>
       @foreach($milestones as $milestone)
       <tr>
         <th>{{$loop->index+1}}</th>
         <td>{{$milestone->milestone_title}}</td>
         <td>{{$milestone->milestone_type}}</td>
         <td>{{$milestone->actual_cost}}{{$milestone->original_currency->currency_symbol}}</td>
         <td>@if($milestone->summary != null)
           {!!$milestone->summary!!}
         @else
         --
         @endif
        </td>
       </tr>
       @endforeach

     </tbody>
   </table>



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
                        @if ($contract->deal->dept_status == 'DM')
                          <h4>Profile Link</h4>
                        @else
                          <h4>Freelancer Profile Link</h4>
                        @endif
                          <br>
                          <p><a target="_blank" href="{{ $contract->deal->profile_link}}">{{ $contract->deal->profile_link}}</a></p>

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
                        @if ($contract->deal->dept_status == 'DM')
                          <h4>Message Link</h4>
                        @else
                          <h4>Freelancer Message Link</h4>
                        @endif
                          <br>
                          <?php
                          $mystring = $contract->deal->message_link;

                              $output = str_replace('<br>',' ', $mystring);

                              $output_final= (trim($output));
                              $data= explode("  ", $output_final);
                            //  dd(($data));

                           ?>
                           @foreach($data as $message)
                          <p><a target="_blank" href="{{ $message}}">{{ $message}}</a></p>
                          @endforeach

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
                        @if ($contract->deal->dept_status == 'DM')
                            <h4>Write the what in 2-8 words here (Example: Whole website seo, Google ads, Backlink creation, Basic SEO, Sponsored posts etc.)</h4>
                        @else
                            <h4>Write the what in 2-8 words here (Examples: Website redesign, Shopify website migration to Wix, Creating a 5 page business website in WordPress, Shopify website creation, etc.)</h4>
                        @endif
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
                        @if ($contract->deal->dept_status == 'DM')
                            <h4>Elaborate the "WHAT" 3-4 lines here (The client created a new website recently and he now wants to start full suite SEO for his website.). Please share all the necessary information you possible can here. The execution team will work based on this instruction primarily.</h4>
                        @else
                          <h4>
                            Elaborate the "WHAT" 3-4 lines here (The client needs a 5 page static WordPress website for his new design agency.
                            It should include home, about, his services in one page, blog, and contact. The look and feel should be
                            better than the references.)</h4>
                            @endif
                          <br>
                          <p>{!! $contract->deal->description3 !!}</p>

                      </div>

                  </div>
              </x-cards.data>
          </div>
          <!-- BUDGET VS SPENT END -->
      </div>
      @if ($contract->deal->description4)
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
      @endif
      <div class="row mb-4" >
          <!-- BUDGET VS SPENT START -->
          <div class="col-md-12">
              <x-cards.data>
                  <div class="row-cols-lg-1">
                      <div class="col">
                        @if ($contract->deal->dept_status == 'DM')
                            <h4>Any particular focus/concern of the client (Ex: 1. The client is very concerned about his websites current rank drop.  2. The client is frustrated about his google ads campaigns not getting enough returns and desperately wants someone to improve this)</h4>
                        @else
                          <h4>
                            Any particular focus/concern of the client (Ex: 1. The client is very concerned about the final look & feel so needs to be careful with the design 2. The client is very concerned if the booking functionality will work
                            the way he wants.)</h4>
                        @endif
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
      @if($contract->deal->authorization_status == 8)
      <div class="row mb-4" >
          <!-- BUDGET VS SPENT START -->
          <div class="col-md-12">
              <x-cards.data>
                  <div class="row-cols-lg-1">
                      <div class="col">
                          <h4>Price Authorization</h4>
                          <br>
                          <p>{!! $contract->deal->price_authorization !!}</p>

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
                          <h4>Requirment Define</h4>
                          <br>
                          <p>{!! $contract->deal->requirment_define !!}</p>

                      </div>

                  </div>
              </x-cards.data>
          </div>
          <!-- BUDGET VS SPENT END -->
      </div>
      @endif
    @if($contract->deal->project_type=="hourly")
    <div class="row mb-4" >
        <!-- BUDGET VS SPENT START -->
        <div class="col-4">
            <x-cards.data class="h-100">
                <div class="row">
                    <div class="col">
                        <h4>Estimated Hours</h4>
                        <br>
                        @if($contract->deal->estimated_hour_task)
                            <p>{{$contract->deal->estimated_hour_task}}</p>
                        @else
                            <p>--</p>
                        @endif

                    </div>

                </div>
            </x-cards.data>
        </div>
        <div class="col-4">
            <x-cards.data class="h-100">
                <div class="row">
                    <div class="col">
                        <h4>Hourly Rate</h4>
                        <br>
                        @if($contract->deal->hourly_rate)
                            <p>{{$contract->deal->hourly_rate}}</p>
                        @else
                            <p>--</p>
                        @endif

                    </div>

                </div>
            </x-cards.data>
        </div>
        <div class="col-4">
            <x-cards.data class="h-100">
                <div class="row">
                    <div class="col">
                        <h4>Hub Staff Tracking </h4>
                        <br>
                        <p>{{$contract->deal->hubstaff_tracking ==1 ? 'Yes' : 'No'}}</p>

                    </div>

                </div>
            </x-cards.data>
        </div>
        <!-- BUDGET VS SPENT END -->
    </div>

    <div class="row mb-4" >
    <!-- BUDGET VS SPENT START -->
        <div class="col-6">
            <x-cards.data class="h-100">
                <div class="row">
                    <div class="col">
                        <h4>Expected Tracked Hours on Day 2</h4>
                        <br>
                        @if($contract->deal->second_day_tracked_hours)
                            <p>{{$contract->deal->second_day_tracked_hours}}</p>
                        @else
                            <p>--</p>
                        @endif

                    </div>

                </div>
            </x-cards.data>
        </div>
        <div class="col-6">
            <x-cards.data class="h-100">
                <div class="row">
                    <div class="col">
                        <h4>Clients Expected Amount of Work Per Hour </h4>
                        <br>
                        @if($contract->deal->expect_amount)
                            <p>{{$contract->deal->expect_amount}}</p>
                        @else
                            <p>--</p>
                        @endif

                    </div>

                </div>
            </x-cards.data>
        </div>
    <!-- BUDGET VS SPENT END -->
    </div>

    <div class="row mb-4" >
        <!-- BUDGET VS SPENT START -->
        <div class="col-6">
            <x-cards.data class="h-100">
                <div class="col">
                    <h4>Expected Tracked Hours on Day 1 </h4>
                    <br>
                    @if($contract->deal->tracked_hours)
                        <p>{{$contract->deal->tracked_hours}}</p>
                    @else
                        <p>--</p>
                    @endif

                </div>
            </x-cards.data>
        </div>
        <div class="col-6">
            <x-cards.data class="h-100">
                <div class="row">
                    <div class="col">
                        <h4>Clients Expectation About Approx. Hours Needed for the Initial Tasks</h4>
                        <br>
                        @if($contract->deal->certain_amount_hour)
                            <p>{{$contract->deal->certain_amount_hour}}</p>
                        @else
                            <p>--</p>
                        @endif

                    </div>

                </div>
            </x-cards.data>
        </div>
        <!-- BUDGET VS SPENT END -->
    </div>
    @endif

      <div class="row mb-4" >
          <!-- BUDGET VS SPENT START -->
          <div class="col-md-12">
              <x-cards.data>
                  <div class="row-cols-lg-1">
                      <div class="col">
                          <h4>Email</h4>
                          <br>
                          <p>{{$contract->deal->user->email}}</p>

                      </div>

                  </div>
              </x-cards.data>
          </div>
          <!-- BUDGET VS SPENT END -->
      </div>
      
      @if(auth()->user()->role_id != 4 || $contract->project_details->project_status != 'pending')
      <div class="row mb-4" >
          <!-- BUDGET VS SPENT START -->
          <div class="col-md-12">
              <x-cards.data>
                  <div class="row-cols-lg-1">
                      <div class="col">
                          <h4>Price Authorization</h4>
                          <br>
                          <p>{!!$contract->deal->price_authorization!!}</p>

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
                          <h4>Requirment Define</h4>
                          <br>
                          <p>{!! $contract->deal->requirment_define !!}</p>

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
                          <h4>Project Deadline Authorization</h4>
                          <br>
                          <p>{!! $contract->deal->project_deadline_authorization !!}</p>

                      </div>

                  </div>
              </x-cards.data>
          </div>
          <!-- BUDGET VS SPENT END -->
      </div>
      @endif
    <!-- CARD FOOTER START -->

    <!-- CARD FOOTER END -->
</div>
<div class="modal fade" id="award_time_incress_modal" tabindex="-1" role="dialog"
        aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLongTitle">Award Time Extention</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <input type="hidden" name="id" value="{{$contract->deal->id}}" id="task_id">
                    <div class="form-group">
                        <label for="hours">Select Hours</label>
                        <select name="hours" id="task_hours" class="form-control height-35 f-14">
                            <option value="">Select Hours</option>
                            <option value="2">2 Hours</option>
                            <option value="4">4 Hours</option>
                            <option value="10">10 Hours</option>
                            <option value="20">20 Hours</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="description">Description:</label>
                        <textarea name="descripton" id="task_description" class="form-control" cols="30" rows="10"></textarea>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary" id="award_time_incress_submit">Submit</button>
                </div>
            </div>
        </div>
    </div>
<!-- INVOICE CARD END -->
<?php
$currentDateTime = \Carbon\Carbon::createFromFormat('Y-m-d H:i:s',$contract->deal->award_time)->format('Y-m-d H:i:s');

$newDateTime = \Carbon\Carbon::createFromFormat('Y-m-d H:i:s',$currentDateTime)->addMinutes(1200)->format('Y-m-d H:i:s');
//dd($newDateTime);
 ?>

<input type="hidden" id="award_time" value="{{$newDateTime}}">
@push('scripts')

      <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.13.0/moment.js"></script>
      <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/moment-timezone/0.5.4/moment-timezone-with-data.js"></script>


      <script>
        $('body').on('click', '.award_time_incress', function(e) {
            e.preventDefault();
            $('#task_id').val($(this).data('id'));
            $('#award_time_incress_modal').modal('toggle');
        });


        $('#award_time_incress_submit').click(function() {
            var task_id = {{$contract->deal->id}};
            var task_hours = $('#task_hours').val();
            var task_description = $('#task_description').val();

            $.easyAjax({
                url: '{{ route('award_time_check.store') }}',
                //container: '#quick-action-form',
                type: "POST",
                disableButton: true,
                buttonSelector: "#award_time_incress_submit",
                data: {
                    _token: '{{ csrf_token() }}',
                    id: task_id,
                    hours: task_hours,
                    description: task_description,
                },
                success: function(resp) {
                    if (resp.status == 'success') {
                        $('#award_time_incress_modal').modal('hide');
                        toastr.options.closeMethod = 'fadeOut';
                        toastr.options.closeDuration = 120;
                        toastr.options.closeEasing = 'swing';
                        toastr.success('Request Submit to Admin', 'Success');
                        toastr.options.onHidden = function() {

                        }
                    }
                }
            })
        });



          $(function(){
              function timer(settings){
                var award_time = $('#award_time').val();
                //console.log(award_time);

                  var config = {
                      endDate:  $('#award_time').val(),
                      timeZone: 'Asia/Dhaka',
                      hours: $('#hours'),
                      minutes: $('#minutes'),
                      seconds: $('#seconds'),
                      newSubMessage: 'and should be back online in a few minutes...'
                  };
                  function prependZero(number){
                      return number < 10 ? '0' + number : number;
                  }
                  $.extend(true, config, settings || {});
                  var currentTime = moment();
                  var endDate = moment.tz(config.endDate, config.timeZone);
                  var diffTime = endDate.valueOf() - currentTime.valueOf();
                  var duration = moment.duration(diffTime, 'milliseconds');
                  var days = duration.days();
                  var interval = 1000;
                  var subMessage = $('.sub-message');
                  var clock = $('.clock');
                  if(diffTime < 0){
                      endEvent(subMessage, config.newSubMessage, clock);
                      return;
                  }
                  if(days > 0){
                      $('#days').text(prependZero(days));
                      $('.days').css('display', 'inline-block');
                  }
                  var intervalID = setInterval(function(){
                      duration = moment.duration(duration - interval, 'milliseconds');
                      var hours = duration.hours(),
                          minutes = duration.minutes(),
                          seconds = duration.seconds();
                      days = duration.days();
                      if(hours  <= 0 && minutes <= 0 && seconds  <= 0 && days <= 0){
                          clearInterval(intervalID);
                          endEvent(subMessage, config.newSubMessage, clock);
                          window.location.reload();
                      }
                      if(days === 0){
                          $('.days').hide();
                      }
                      $('#days').text(prependZero(days));
                      config.hours.text(prependZero(hours));
                      config.minutes.text(prependZero(minutes));
                      config.seconds.text(prependZero(seconds));
                  }, interval);
              }
              function endEvent($el, newText, hideEl){
                  $el.text(newText);
                  hideEl.hide();
              }
              timer();
          });

      </script>
      @endpush
