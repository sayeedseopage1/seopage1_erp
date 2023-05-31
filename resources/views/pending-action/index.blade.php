@extends('layouts.app')
@section('content')
   <section class="p-4">
      <section class="p-3 bg-white rounded">
         <h2>Required Actions</h2>
         
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
               <li class="nav-item">dddddddddd
                  <div class="datatableRange_al"></div>
               </li>
            </ul>
         </div>

      </section>
   </section>
@endsection


{{-- style --}}
<style type="text/css">
   .sp1_pa_nav_link{
      padding: 4px 32px;
      width: 120px;
      text-align: center;
      border: 2px solid var(--header_color);
      border-radius: 6px;
      margin-right: 10px;
   }

   .sp1_pa_nav_link:hover{
      background-color: #1d82f525;
   }

   .sp1_pa_nav_link.active{
      background-color: var(--header_color);
      color: #fff !important;
   }
</style>