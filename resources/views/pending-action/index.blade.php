@extends('layouts.app')
@section('content')
   <section class="p-4">
      <section class="p-3 bg-white rounded">
         <h2 class="mb-3">Required Actions</h2>
         
         <section>
            {{-- navbar --}}
            <div class="d-flex align-items-center justify-content-between">
               <ul class="nav">
                  <li class="nav-item">
                     <a href="?tab=active" class="nav-link sp1_pa_nav_link active">Active</a>
                  </li>

                  <li class="nav-item">
                     <a href="?tab=past" class="nav-link sp1_pa_nav_link">Active</a>
                  </li>
               </ul>
               {{-- date editor --}}
               <ul class="nav justify-content-end">
                  <li class="nav-item d-flex align-items-center">
                     <label class="mb-0 mr-2">Date: </label>
                     <input id="datatableRange_al" readonly class="sp1_pa_date_picker"></input>
                  </li>
               </ul>
            </div>
         </section>

         {{-- search with some filter options --}}
         <section class="d-flex align-items-center pt-3 pb-1 border-bottom" style="border-color: #eef2f8;">
            {{-- search --}}
               <div class="input-group mb-2 w-100 mr-2">
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
         </section>

         {{-- item --}}
         <section class="sp1_pa_tasks">
            <div class="py-3 border-bottom" style="border-color: #eef2f8;">
               <div class="row">
                  <div class="col-9 ">
                     <h6>"QC form for project Taking screenshot a quick mockup was authorized by you"</h6>

                     <p>
                        "<a href="#">Develierables</a> for project <a href="#">Taking screenshot and changing names etc to do a quick mockup</a> (PM: <a href="#">Diner M Islam</a>) from Client: <a href="#">Friends. cigjai</a> needs to be authorized"
                     </p>


                     <div class="d-flex align-items-center">
                        <button class="sp1_pa_nav_link mr-2">Review</button>
                        <button class="sp1_pa_nav_link mr-2">Approve</button>
                        <button class="sp1_pa_nav_link mr-2">Deny</button>
                        <button class="sp1_pa_nav_link mr-2">Request Modifications</button> 
                     </div>

                  </div>

                  <div class="col-2">
                     <div>
                        akdfklsdj
                     </div>
                  </div>
               </div>
            </div>
         </section>

      </section>
   </section>
@endsection


{{-- style --}}
<style type="text/css">
   .sp1_pa_nav_link{
      padding: 6px 32px !important;
      min-width: 120px;
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

</style>