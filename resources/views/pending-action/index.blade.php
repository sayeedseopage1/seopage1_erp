@extends('layouts.app')
@section('content')
   <section class="p-2 p-md-4">
      <section class="p-3 bg-white rounded">
         <div class="sp1_pa_title mb-3">Required Actions</div>
         
         <section>
            {{-- navbar --}}
            <div class="d-flex align-items-center justify-content-between flex-wrap">
               <ul class="nav">
                  <li class="nav-item">
                     <a href="?tab=active" class="nav-link sp1_pa_nav_link active">Active</a>
                  </li>

                  <li class="nav-item">
                     <a href="?tab=past" class="nav-link sp1_pa_nav_link">Past</a>
                  </li>
               </ul>
               {{-- date editor --}}
               <ul class="nav justify-content-end">
                  <li class="nav-item d-flex align-items-center mt-2">
                     <label class="mb-0 mr-2">Date: </label>
                     <input id="datatableRange_al" readonly class="sp1_pa_date_picker"></input>
                  </li>
               </ul>
            </div>
         </section>

         {{-- search with some filter options --}}
         <section class="row pt-3 pb-1 border-bottom" style="border-color: #eef2f8;">
            {{-- search --}}
               <div class="col-12 col-lg-6 input-group mb-2 w-100 pr-2">
                  <div class="input-group-prepend border-right-0" style="height: 39px;">
                    <div class="input-group-text  outline-none" style="background: #F7F7F7;">
                        <i class="bi bi-search" ></i>
                    </div>
                  </div>
                  <input 
                     type="text" 
                     class="form-control border-left-0 sp1_pa_search" 
                     id="inlineFormInputGroup" 
                     placeholder="Search Project what you need"
                     style="background: #F7F7F7; height: 39px;"
                  >
               </div>
            
               {{--  --}}

               <div class="col-12 col-lg-6 d-flex flex-wrap align-items-center justify-content-start justify-content-lg-end mb-3">
                  {{-- employee filter --}}
                  <div class="d-flex align-items-center flex-wrap flex-md-nowrap">
                     {{-- <div class="form-group d-flex align-items-center">
                        <label for="exampleFormControlSelect1" class="mb-0 mr-2">Employee: </label>
                        <select class="form-control sp1_pa_search py-2" id="exampleFormControlSelect1" style="width: 250px;">
                           <option selected>All</option>
                           <option value="">
                              <div>
                                 <div>
                                    <img src="https://www.gravatar.com/avatar/15c5d9a90a96c5ba476930ad2fde65fc.png?s=200&d=mp" alt="" width="30" height="30">
                                 </div>
                                 <span>Mohammad Fazle Rabbi</span>
                              </div>
                           </option>
                           <option value="">Farhan Rahman</option>
                           <option value="">Farhan Rahman</option>
                           <option value="">Farhan Rahman</option>
                           <option value="">Farhan Rahman</option>
                        </select>
                     </div>
                  </div>  --}}

                 <div class="d-flex align-items-center flex-wrap">
                     <div class="select-box d-flex pr-2 border-right-grey-sm-0">
                        <p class="mb-0 pr-3 f-14 text-dark-grey d-flex align-items-center">@lang('app.employee'):</p>
                        <div class="select-status">
                           <select class="form-control select-picker sp1_pa_search sp1_pa_employee_filter" name="employee" id="employee" data-live-search="true"
                              data-size="8">
                              {{-- @if ($employees->count() > 1) --}}
                                    <option value="all">All</option>
                              {{-- @endif --}}
                              {{-- @foreach ($employees as $employee) --}}
                                    <option
                                       data-content="<div class='d-inline-block mr-1'><img class='taskEmployeeImg rounded-circle' src='https://www.gravatar.com/avatar/15c5d9a90a96c5ba476930ad2fde65fc.png?s=200&d=mp'></div> Employee_name"
                                       value="#employe_id"> Emplyee_name
                                    </option>
                              {{-- @endforeach --}}
                           </select>
                        </div>
                     </div>
                 </div>

                  

                  {{-- per page item --}}
                  <div class="d-flex align-items-center mt-2 mt-md-0 mx-0 mx-md-2">
                     <div class="d-flex align-items-center">
                        <label for="exampleFormControlSelect1" class="mb-0 pr-1 pr-sm-0 mr-3 mr-sm-2">Show: </label>
                        <select class="form-control sp1_pa_search py-2 ml-4 ml-sm-0" id="exampleFormControlSelect1" style="width: 60px;">
                           <option value="10" selected>10</option>
                           <option value="25">25</option>
                           <option value="50">50</option>
                           <option value="100">100</option>
                        </select>
                     </div>
                  </div>

                  
              </div>
         </section>

         {{-- item --}}
         <section class="sp1_pa_tasks">
           {{-- card --}}
           <div class="py-3 border-bottom" style="border-color: #eef2f8;">
               <div class="row">
                  <div class="col-12 col-lg-9">
                     <h6>"QC form for project Taking screenshot a quick mockup was authorized by you"</h6>

                     <p class="sp1_pa_text">
                        "<a href="#">Develierables</a> for project <a href="#">Taking screenshot and changing names etc to do a quick mockup</a> (PM: <a href="#">Diner M Islam</a>) from Client: <a href="#">Friends. cigjai</a> needs to be authorized"
                     </p>


                     <div class="d-flex align-items-center flex-wrap">
                        <button class="sp1_pa_nav_link mb-2 mr-2">Review</button>
                        <button class="sp1_pa_nav_link mb-2 mr-2">Approve</button>
                        <button class="sp1_pa_nav_link mb-2 mr-2">Deny</button>
                        <button class="sp1_pa_nav_link mb-2 mr-2">Request Modifications</button> 
                     </div>

                     <p class="sp1_pa_text">
                        Authorized By: <a href="#">Rajat Chakraborty</a> at <i class="bi bi-stopwatch-fill"></i> 10:30PM <i class="bi bi-calendar-event-fill"></i> May 31,23 
                     </p>

                  </div>

                  <div class="col-12 col-lg-3">
                     <div class="d-flex d-lg-block ">
                        <div class="sp1_pa_time_item ml-lg-auto mr-2 mr-lg-0 mb-2">
                           <i class="bi bi-stopwatch-fill"></i>
                           <div>
                              <span class="d-block">6:30 pm</span>
                              <span class="d-block">May 15, 23</span>
                           </div>
                        </div>

                        <div class="sp1_pa_time_item ml-lg-auto">
                           <i class="bi bi-hourglass-split"></i>
                           <div>
                              <span class="d-block">Time Left</span>
                              <span class="d-block">
                                 06:20:10
                              </span>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
           {{-- end card --}}

           
            {{-- card --}}
            <div class="py-3 border-bottom" style="border-color: #eef2f8;">
               <div class="row">
                  <div class="col-12 col-lg-9">
                     <h6>"QC form for project Taking screenshot a quick mockup was authorized by you"</h6>

                     <p class="sp1_pa_text">
                        "<a href="#">Develierables</a> for project <a href="#">Taking screenshot and changing names etc to do a quick mockup</a> (PM: <a href="#">Diner M Islam</a>) from Client: <a href="#">Friends. cigjai</a> needs to be authorized"
                     </p>


                     <div class="d-flex align-items-center flex-wrap">
                        <button class="sp1_pa_nav_link mb-2 mr-2">Review</button>
                        <button class="sp1_pa_nav_link mb-2 mr-2">Approve</button>
                        <button class="sp1_pa_nav_link mb-2 mr-2">Deny</button>
                        <button class="sp1_pa_nav_link mb-2 mr-2">Request Modifications</button> 
                     </div>

                     <p class="sp1_pa_text">
                        Authorized By: <a href="#">Rajat Chakraborty</a> at <i class="bi bi-stopwatch-fill"></i> 10:30PM <i class="bi bi-calendar-event-fill"></i> May 31,23 
                     </p>

                  </div>

                  <div class="col-12 col-lg-3">
                     <div class="d-flex d-lg-block flex-wrap">
                        <div class="sp1_pa_time_item ml-lg-auto mr-sm-2 mr-lg-0 mb-2">
                           <i class="bi bi-stopwatch-fill"></i>
                           <div>
                              <span class="d-block">6:30 pm</span>
                              <span class="d-block">May 15, 23</span>
                           </div>
                        </div>

                        <div class="sp1_pa_time_item ml-lg-auto">
                           <i class="bi bi-hourglass-split"></i>
                           <div>
                              <span class="d-block">Time Left</span>
                              <span class="d-block">
                                 06:20:10
                              </span>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
           {{-- end card --}}

           
           {{-- card --}}
           <div class="py-3 border-bottom" style="border-color: #eef2f8;">
            <div class="row">
               <div class="col-12 col-lg-9">
                  <h6>"QC form for project Taking screenshot a quick mockup was authorized by you"</h6>

                  <p class="sp1_pa_text">
                     "<a href="#">Develierables</a> for project <a href="#">Taking screenshot and changing names etc to do a quick mockup</a> (PM: <a href="#">Diner M Islam</a>) from Client: <a href="#">Friends. cigjai</a> needs to be authorized"
                  </p>


                  <div class="d-flex align-items-center flex-wrap">
                     <button class="sp1_pa_nav_link mb-2 mr-2">Review</button>
                     <button class="sp1_pa_nav_link mb-2 mr-2">Approve</button>
                     <button class="sp1_pa_nav_link mb-2 mr-2">Deny</button>
                     <button class="sp1_pa_nav_link mb-2 mr-2">Request Modifications</button> 
                  </div>

                  <p class="sp1_pa_text">
                     Authorized By: <a href="#">Rajat Chakraborty</a> at <i class="bi bi-stopwatch-fill"></i> 10:30PM <i class="bi bi-calendar-event-fill"></i> May 31,23 
                  </p>

               </div>

               <div class="col-12 col-lg-3">
                  <div class="d-flex d-lg-block flex-wrap">
                     <div class="sp1_pa_time_item ml-lg-auto mr-sm-2 mr-lg-0 mb-2">
                        <i class="bi bi-stopwatch-fill"></i>
                        <div>
                           <span class="d-block">6:30 pm</span>
                           <span class="d-block">May 15, 23</span>
                        </div>
                     </div>

                     <div class="sp1_pa_time_item ml-lg-auto">
                        <i class="bi bi-hourglass-split"></i>
                        <div>
                           <span class="d-block">Time Left</span>
                           <span class="d-block">
                              06:20:10
                           </span>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
        {{-- end card --}} 
         </section>


         <nav aria-label="PaginationGroupButtons" class="mt-3">
            <ul class="pagination justify-content-end">
              <li class="page-item disabled">
                <span class="page-link">Previous</span>
              </li>
              <li class="page-item"><a class="page-link" href="#">1</a></li>
              <li class="page-item active">
                <span class="page-link">
                  2
                  <span class="sr-only">(current)</span>
                </span>
              </li>
              <li class="page-item"><a class="page-link" href="#">3</a></li>
              <li class="page-item">
                <a class="page-link" href="#">Next</a>
              </li>
            </ul>
          </nav>

      </section>

       
   </section>
@endsection


{{-- style --}}
<style type="text/css">
   .sp1_pa_title{
      font-weight: bold;
      font-size: 28px;
   }
   
   .sp1_pa_nav_link{
      padding: 6px 32px !important;
      min-width: 100px;
      text-align: center;
      border: 2px solid var(--header_color);
      border-radius: 6px;
      margin-right: 10px;
      background: #fff;
      white-space: nowrap;
   }

   .sp1_pa_nav_link:hover{
      background-color: #1d82f525;
   }

   .sp1_pa_nav_link.active{
      background-color: var(--header_color);
      color: #fff !important;
   }

   .sp1_pa_date_picker{
      border: none;
      cursor: pointer;
      font-weight: bold; 
      width: 180px; 
   }

   .sp1_pa_date_picker:hover{
      color: var(--header_color)
   }

   .sp1_pa_search{
      outline: none !important;
      background: #F7F7F7 !important; 
   }
   .sp1_pa_search:hover,
   .sp1_pa_search:focus{
      outline: none !important;
      border-color: #e8eef3 !important;
   }

   .sp1_pa_tasks{
      display: flex;
      -ms-flex-direction: column;
      flex-direction: column;
   }


   .sp1_pa_time_item{
      max-width: 200px; 
      min-width: 100px;
      padding: 10px 16px;
      border-radius: 6px;
      background: #F2F4F7;
      display: flex;
      align-items: center;
      cursor: default;
      -ms-user-select: none;
      -moz-user-select: none;
      -webkit-user-select: none;
   }

   .sp1_pa_time_item > i{
      font-size: 36px;
      display: inline-block;
      margin-right: 10px;
      color: #555;
   }

   .sp1_pa_time_item > div span{
      white-space: nowrap;
   }


   @media screen and (max-width: 372px){
      .sp1_pa_time_item{
         padding: 8px 12px;
      }
   }

   .sp1_pa_text a:hover{
      color: var(--header_color) !important;
      text-decoration: underline;
   }

   .page-link{
      border-radius: 4px;
   }

   .sp1_pa_employee_filter{
      width: 250px !important;
      outline: none !important;
   }

   .sp1_pa_employee_filter > button{
      background: #F7F7F7 !important;
      outline: none !important;
   }


   @media screen and (max-width: 992px ){
      .sp1_pa_time_item{
         margin-top: 10px;
         height: 100%;
      }
   }
   @media screen and (max-width: 720px){
      .sp1_pa_title{
         font-weight: bold;
         font-size: 24px;
      }
   }

   @media screen and (max-width: 320px){
      .sp1_pa_employee_filter{
         width: 200px !important;
         outline: none !important;
      }
   }
</style>