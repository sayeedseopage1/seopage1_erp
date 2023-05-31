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
               <div class="col-12 col-md-8 input-group mb-2 w-100 pr-2">
                  <div class="input-group-prepend border-right-0">
                    <div class="input-group-text  outline-none" style="background: #F7F7F7;">
                        <i class="bi bi-search" ></i>
                    </div>
                  </div>
                  <input 
                     type="text" 
                     class="form-control py-2 border-left-0 sp1_pa_search" 
                     id="inlineFormInputGroup" 
                     placeholder="Search Project what you need"
                     style="background: #F7F7F7;"
                  >
               </div>
            
               {{--  --}}

               <div class="col-12 col-md-4 d-flex align-items-center justify-content-start justify-content-md-end">
                  <div class="d-flex align-items mx-2">
                     <div class="form-group d-flex align-items-center">
                        <label for="exampleFormControlSelect1" class="mb-0 mr-2">Show: </label>
                        <select class="form-control sp1_pa_search py-2" id="exampleFormControlSelect1" style="width: 60px;">
                        <option>10</option>
                        <option>20</option>
                        <option>30</option>
                        <option>40</option>
                        <option>50</option>
                        </select>
                     </div>
                  </div>

                  {{-- view all --}}
                  <div class="d-flex align-items">
                     <div class="form-group d-flex align-items-center">
                        <label for="exampleFormControlSelect1" class="mb-0 mr-2">View: </label>
                        <select class="form-control sp1_pa_search py-2" id="exampleFormControlSelect1" style="width: 60px;">
                        <option selected>All</option>
                        <option>20</option>
                        <option>30</option>
                        <option>40</option>
                        <option>50</option>
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

                     <p>
                        "<a href="#">Develierables</a> for project <a href="#">Taking screenshot and changing names etc to do a quick mockup</a> (PM: <a href="#">Diner M Islam</a>) from Client: <a href="#">Friends. cigjai</a> needs to be authorized"
                     </p>


                     <div class="d-flex align-items-center flex-wrap">
                        <button class="sp1_pa_nav_link mb-2 mr-2">Review</button>
                        <button class="sp1_pa_nav_link mb-2 mr-2">Approve</button>
                        <button class="sp1_pa_nav_link mb-2 mr-2">Deny</button>
                        <button class="sp1_pa_nav_link mb-2 mr-2">Request Modifications</button> 
                     </div>

                     <p>
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

                     <p>
                        "<a href="#">Develierables</a> for project <a href="#">Taking screenshot and changing names etc to do a quick mockup</a> (PM: <a href="#">Diner M Islam</a>) from Client: <a href="#">Friends. cigjai</a> needs to be authorized"
                     </p>


                     <div class="d-flex align-items-center flex-wrap">
                        <button class="sp1_pa_nav_link mb-2 mr-2">Review</button>
                        <button class="sp1_pa_nav_link mb-2 mr-2">Approve</button>
                        <button class="sp1_pa_nav_link mb-2 mr-2">Deny</button>
                        <button class="sp1_pa_nav_link mb-2 mr-2">Request Modifications</button> 
                     </div>

                     <p>
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

                  <p>
                     "<a href="#">Develierables</a> for project <a href="#">Taking screenshot and changing names etc to do a quick mockup</a> (PM: <a href="#">Diner M Islam</a>) from Client: <a href="#">Friends. cigjai</a> needs to be authorized"
                  </p>


                  <div class="d-flex align-items-center flex-wrap">
                     <button class="sp1_pa_nav_link mb-2 mr-2">Review</button>
                     <button class="sp1_pa_nav_link mb-2 mr-2">Approve</button>
                     <button class="sp1_pa_nav_link mb-2 mr-2">Deny</button>
                     <button class="sp1_pa_nav_link mb-2 mr-2">Request Modifications</button> 
                  </div>

                  <p>
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

                  <p>
                     "<a href="#">Develierables</a> for project <a href="#">Taking screenshot and changing names etc to do a quick mockup</a> (PM: <a href="#">Diner M Islam</a>) from Client: <a href="#">Friends. cigjai</a> needs to be authorized"
                  </p>


                  <div class="d-flex align-items-center flex-wrap">
                     <button class="sp1_pa_nav_link mb-2 mr-2">Review</button>
                     <button class="sp1_pa_nav_link mb-2 mr-2">Approve</button>
                     <button class="sp1_pa_nav_link mb-2 mr-2">Deny</button>
                     <button class="sp1_pa_nav_link mb-2 mr-2">Request Modifications</button> 
                  </div>

                  <p>
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
      width: 200px;
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
</style>