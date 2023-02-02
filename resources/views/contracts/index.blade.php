@extends('layouts.app')



@section('filter-section')





  {{-- <x-filters.filter-box>
        <!-- DATE START -->
        <div class="select-box d-flex pr-2 border-right-grey border-right-grey-sm-0">
            <p class="mb-0 pr-3 f-14 text-dark-grey d-flex align-items-center">@lang('app.date')</p>
            <div class="select-status d-flex">
                <input type="text" class="position-relative text-dark form-control border-0 p-2 text-left f-14 f-w-500"
                    id="datatableRange" placeholder="@lang('placeholders.dateRange')">
            </div>
        </div>
        <!-- DATE END -->

        @if (!in_array('client', user_roles()))
        <!-- CLIENT START -->
        <div class="select-box d-flex py-2 px-lg-2 px-md-2 px-0 border-right-grey border-right-grey-sm-0">
            <p class="mb-0 pr-3 f-14 text-dark-grey d-flex align-items-center">@lang('app.client')</p>
            <div class="select-status">
                <select class="form-control select-picker" name="client" id="client" data-live-search="true" data-size="8">
                    @if (!in_array('client', user_roles()))
                        <option value="all">@lang('app.all')</option>
                    @endif
                    @foreach ($clients as $client)
                        <option
                            data-content="<div class='d-inline-block mr-1'><img class='taskEmployeeImg rounded-circle' src='{{ $client->image_url }}' ></div> {{ ucfirst($client->name) }}"
                            value="{{ $client->id }}">{{ $client->name }}</option>
                    @endforeach
                </select>
            </div>
        </div>
        @endif

        <!-- CLIENT END -->
        <!-- STATUS START -->
        <div class="select-box d-flex py-2 px-lg-2 px-md-2 px-0 border-right-grey border-right-grey-sm-0">
            <p class="mb-0 pr-3 f-14 text-dark-grey d-flex align-items-center">@lang('modules.contracts.contractType')</p>
            <div class="select-status">
                <select class="form-control select-picker" name="contract_type" id="contract_type" data-live-search="true"
                    data-size="8">
                    <option value="all">@lang('app.all')</option>
                    @foreach ($contractTypes as $item)
                        <option value="{{ $item->id }}">{{ mb_ucwords($item->name) }}</option>
                    @endforeach
                </select>
            </div>
        </div>
        <!-- STATUS END -->

        <!-- SEARCH BY TASK START -->
        <div class="task-search d-flex  py-1 px-lg-3 px-0 border-right-grey align-items-center">
            <form class="w-100 mr-1 mr-lg-0 mr-md-1 ml-md-1 ml-0 ml-lg-0">
                <div class="input-group bg-grey rounded">
                    <div class="input-group-prepend">
                        <span class="input-group-text border-0 bg-additional-grey">
                            <i class="fa fa-search f-13 text-dark-grey"></i>
                        </span>
                    </div>
                    <input type="text" class="form-control f-14 p-1 border-additional-grey" id="search-text-field"
                        placeholder="@lang('app.startTyping')">
                </div>
            </form>
        </div>
        <!-- SEARCH BY TASK END -->

        <!-- RESET START -->
        <div class="select-box d-flex py-1 px-lg-2 px-md-2 px-0">
            <x-forms.button-secondary class="btn-xs d-none" id="reset-filters" icon="times-circle">
                @lang('app.clearFilters')
            </x-forms.button-secondary>
        </div>
        <!-- RESET END -->
    </x-filters.filter-box>--}}

@endsection

@php
$addContractPermission = user()->permission('add_contract');
$manageContractTemplatePermission = user()->permission('manage_contract_template');

@endphp

@section('content')

    <!-- CONTENT WRAPPER START -->
    <div class="content-wrapper">
        <!-- Add Task Export Buttons Start -->
        <div class="d-flex justify-content-between action-bar">

            <div id="table-actions" class="d-flex align-items-center">
                @if ($addContractPermission == 'all' || $addContractPermission == 'added')
                    <button class="btn btn-primary" id="deal-add"  ><i class="fa-solid fa-plus"></i><span> Create Won Deal</span></button>
                    @include('contracts.modals.dealaddmodal')
                @endif

            {{--  <form class="hidden" action="{{route('create-deal')}}" method="post">
                @csrf


              <button type="submit" class="btn btn-primary mr-3">Create Deal</button>
                </form>--}}
              {{--  @if ($manageContractTemplatePermission == 'all' || $manageContractTemplatePermission == 'added')
                    <x-forms.link-secondary :link="route('contract-template.index')"
                        class="mr-3 mb-2 mb-lg-0 mb-md-0 float-left" icon="layer-group">
                        @lang('app.menu.contractTemplate')
                    </x-forms.link-secondary>
                @endif
                --}}
            </div>

            @if (!in_array('client', user_roles()))
                <x-datatable.actions>
                    <div class="select-status mr-3 pl-3">
                        <select name="action_type" class="form-control select-picker" id="quick-action-type" disabled>
                            <option value="">@lang('app.selectAction')</option>
                            <option value="delete">@lang('app.delete')</option>
                        </select>
                    </div>
                </x-datatable.actions>
            @endif

        </div>
        <!-- Add Task Export Buttons End -->
<?php

if (Auth::user()->role_id == 4) {
  $deals= App\Models\Deal::where('pm_id',Auth::id())->get();
}elseif(Auth::user()->role_id == 7)
{
  $deals= App\Models\Deal::where('added_by',Auth::id())->get();
}
else {
$deals= App\Models\Deal::all();
}


 ?>

        <!-- Task Box Start -->
        <div class="d-flex flex-column w-tables rounded mt-3 bg-white">
          <table id="dealtable"  class="table table-striped" style="width:100%">
        <thead>
            <tr>

                <th class="whitespace-nowrap">#</th>
                <th class="whitespace-nowrap">Short Code</th>
                <th class="whitespace-nowrap">Project Name</th>
                <th class="whitespace-nowrap">Amount</th>
                <th class="whitespace-nowrap">Client Name</th>
                  <th class="whitespace-nowrap">Project Manager</th>

                <th class="whitespace-nowrap">Deal Creation Date</th>
                  <th class="whitespace-nowrap">Client Contact Form</th>
                <th class="whitespace-nowrap">Action</th>

            </tr>
        </thead>
        <tbody>
          @foreach($deals as $deal)
          <?php

          $project= App\Models\Project::where('deal_id',$deal->id)->first();
          $pm= App\Models\PMProject::where('deal_id',$deal->id)->first();

          if ($pm != null) {
            $pm_name= App\Models\User::where('id',$pm->pm_id)->first();
          }

        $client_name= App\Models\User::where('id',$deal->client_id)->first();



          //dd($project);
           ?>
            <tr>

                <td>{{$loop->index+1}}</td>
                <td><a href="/account/contracts/{{$deal->id}}">{{$deal->deal_id}}</a></td>
                <td>
                    @if($project->project_status == 'pending')
                      {{$deal->project_name}}
                      @else

                  <a href="/account/projects/{{$project->id}}">{{$deal->project_name}}</a>
                  @endif

                </td>
                <td>{{$deal->actual_amount}}{{$deal->original_currency->currency_symbol}}</td>

                <td> <a href="/account/clients/{{$client_name->id}}">{{$deal->client_name}}</a></td>

                  <td>
                    @if($deal->pm_id != null)
                    @if($pm->deal_id != null)

                          <a href="/account/employees/{{$pm_name->id}}">{{$pm_name->name}}</a>
                    @endif
                    @else
                    --
                    @endif


                    </td>



                <td>{{$deal->deal_creation_date}}</td>
                <td>
                  @if($deal->submission_status == 'Submitted')
                  <span class="badge bg-success" style="color:white !important;">Submitted</span>
                  @elseif($deal->submission_status == 'Awaiting for client Response')
                    <span class="badge bg-warning">Awaiting for client Response</span>
                  @else


                                      {{--  <a class="btn btn-danger" href="/deals/{{$key}}"><i class="fa-solid fa-trash"></i></a>--}}
                                      {{-- <button class="btn btn-success"  data-bs-toggle="modal" data-bs-target="#clientformModal{{$deal->id}}"><i class="fa-solid fa-eye"></i></button>--}}
                                      <a class="btn btn-success" href="/deals/details/{{$deal->id}}"><i class="fa-solid fa-eye"></i></a>
                                        @endif
                                  </td>
                <td>
                  <div class="dropdown">
                      <button class="btn f-14 px-0 py-0 text-dark-grey" type="button"
                          data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <i class="icon-options-vertical icons"></i>
                          <!-- <i class="fa-thin fa-square-ellipsis-vertical"></i> -->
                      </button>

                      <div class="dropdown-menu dropdown-menu-right border-grey rounded b-shadow-4 p-0"
                          aria-labelledby="dropdownMenuLink" tabindex="0">

                          @if($deal->submission_status == "Awaiting for client Response")
                          <a class="dropdown-item"
                              href="/account/deal-url/{{$deal->id}}"><i class="fa-solid fa-file"></i> @lang('Client Form')</a>
                              @else
                              <a class="dropdown-item"
                                  href="deal-url/{{$deal->id}}"><i class="fa-solid fa-file"></i> @lang('Client Form')</a>
                                  @endif
                                  @if(Auth::user()->role_id == 1 || Auth::user()->role_id== 7 || Auth::user()->role_id == 8)
                          <a class="dropdown-item"
                              href="/deals/details/edit/{{$deal->id}}"><i class="fa-solid fa-pen-to-square"></i> @lang('Edit')</a>
                              @endif
                              {{--<a class="dropdown-item"
                                  href="/deals/details/edit/{{$deal->id}}"><i class="fa-solid fa-eye"></i> @lang('View')</a>--}}
                                {{--  <a class="dropdown-item"
                                      href="contracts/deal-delete/{{$deal->id}}"><i class="fa-solid fa-trash"></i> @lang('Delete')</a> --}}

                      </div>
                  </div>


                  @if($deal->submission_status == "Awaiting for client Response")
                    {{--  <a class="btn btn-success" href="/deals/details/{{$deal->id}}"><i class="fa-solid fa-eye"></i></a>--}}
                      @endif



                  {{--<a class="btn btn-danger" href="contracts/deal-delete/{{$deal->id}}"><i class="fa-solid fa-trash"></i></a> --}}
                    @include('contracts.modals.editmodal')

                </td>
            </tr>
              @include('contracts.modals.clientformmodal')
            @endforeach

        </tbody>
    </table>



        </div>
        <!-- Task Box End -->
    </div>
    <!-- CONTENT WRAPPER END -->



<script type="text/javascript">
$(document).on('click','#deal-add',function(e){


  //console.log(milestone_id);
  $('#dealaddmodal').modal('show');


});
Swal.fire({
  title: 'Error!',
  text: 'Do you want to continue',
  icon: 'error',
  confirmButtonText: 'Cool'
})

</script>
<script src="https://cdn.jsdelivr.net/npm/summernote@0.8.18/dist/summernote.min.js"></script>
<script>
$(document).ready(function() {
  $('#whatsapp').summernote();
});
</script>





@push('scripts')
<script src="https://cdn.datatables.net/1.12.1/js/jquery.dataTables.min.js" charset="utf-8"></script>
<script src="https://cdn.datatables.net/1.12.1/js/dataTables.bootstrap4.min.js" charset="utf-8"></script>
 <script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script>
<script type="text/javascript">
$(document).ready(function () {
    $('#dealtable').DataTable();
});
</script>


    @if (count($errors) > 0)
    <script>
        $( document ).ready(function() {
            $('#dealaddmodal').modal('show');
        });
    </script>
      @endif


@endpush
@endsection
