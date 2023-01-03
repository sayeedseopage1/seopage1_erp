@php
$addProjectMilestonePermission = ($project->project_admin == user()->id) ? 'all' : user()->permission('add_project_milestones');
$viewProjectMilestonePermission = ($project->project_admin == user()->id) ? 'all' : user()->permission('view_project_milestones');
$editProjectMilestonePermission = ($project->project_admin == user()->id) ? 'all' : user()->permission('edit_project_milestones');
$deleteProjectMilestonePermission = ($project->project_admin == user()->id) ? 'all' : user()->permission('delete_project_milestones');
@endphp

<!-- ROW START -->
<link rel="stylesheet" href="http://cdn.bootcss.com/toastr.js/latest/css/toastr.min.css">

<div class="row py-5">
    <div class="col-lg-12 col-md-12 mb-4 mb-xl-0 mb-lg-4">
      @if(Session::has('success'))
          <div class="alert alert-success show mb-2" role="alert"> {{Session::get('success')}}</div>

          @endif
     @if (($addProjectMilestonePermission == 'all' || $project->project_admin == user()->id) && !$project->trashed())
            <x-forms.button-primary icon="plus" id="add-project-milestone" class="type-btn mb-3">
                @lang('modules.projects.createMilestone')
            </x-forms.button-primary>
        @endif

        @if ($viewProjectMilestonePermission == 'all' || $viewProjectMilestonePermission == 'added' || ($viewProjectMilestonePermission == 'owned' && user()->id == $project->client_id))
            <x-cards.data :title="__('modules.projects.milestones')"
                otherClasses="border-0 p-0 d-flex justify-content-between align-items-center table-responsive-sm">
                <x-table class="border-0 pb-3 admin-dash-table table-hover">

                    <x-slot name="thead">
                        <th class="pl-20">#</th>
                        <th>@lang('modules.projects.milestoneTitle')</th>
                        <th>@lang('modules.projects.milestoneCost')</th>
                        <th>@lang('app.status')</th>
                        <th>@lang('Invoice Genereted')</th>
                        <th>@lang('Payment Release')</th>
                        <th>@lang('Quick Action')</th>
                        <th class="text-right pr-20">@lang('app.action')</th>
                    </x-slot>
                    @php
                      $milestones= App\Models\ProjectMilestone::where('project_id',$project->id)->get();

                    @endphp

                    @forelse($milestones as $key=>$item)
                        <tr id="row-{{ $item->id }}">
                            <td class="pl-20">{{ $key + 1 }}</td>
                            <td>
                                <a href="javascript:;" class="milestone-detail text-darkest-grey f-w-500"
                                    data-milestone-id="{{ $item->id }}">{{ ucfirst($item->milestone_title) }}</a>
                            </td>
                            <td>
                                @if (!is_null($item->original_currency_id))
                                @php
                                  $original_currency= App\Models\Currency::where('id',$item->original_currency_id)->first();
                                @endphp
                                    {{ currency_formatter($item->actual_cost, $original_currency->currency_symbol) }}
                                @else
                                    {{ currency_formatter($item->cost) }}
                                @endif
                            </td>
                            <td>
                                @if ($item->status == 'complete')
                                    <i class="fa fa-circle mr-1 text-dark-green f-10"></i>
                                    {{ trans('app.' . $item->status) }}
                                @else
                                    <i class="fa fa-circle mr-1 text-red f-10"></i>
                                    {{ trans('app.' . $item->status) }}
                                @endif
                            </td>
                            <td>
                                @if ($item->invoice_created == 1)
                                    <i class="fa fa-circle mr-1 text-dark-green f-10"></i>
                                  Yes
                                @else
                                    <i class="fa fa-circle mr-1 text-red f-10"></i>
                                  No
                                @endif
                            </td>
                            <td>

                              @if($item->invoice_id != null)
                              @php
                              $invoice= App\Models\Invoice::where('milestone_id',$item->id)->orderBy('id','desc')->first();
                              @endphp


                                @if ($invoice->status == 'paid')
                                    <i class="fa fa-circle mr-1 text-dark-green f-10"></i>
                                  Paid
                                @else
                                    <i class="fa fa-circle mr-1 text-red f-10"></i>
                                  Unpaid
                                @endif
                                @else
                                <i class="fa fa-circle mr-1 text-red f-10"></i>
                              Unpaid

                                @endif
                            </td>
                            <td>
                              <?php
                              $task= App\Models\Task::where('milestone_id',$item->id)->where('status','incomplete')->count();
                              $complete_task= App\Models\Task::where('milestone_id',$item->id)->where('status','complete')->count();
                              //dd($task);
                               ?>
                               <form class="" action="{{route('milestone-complete')}}" method="post">
                                 @csrf
                                   <input type="hidden" name="id" value="{{$item->id}}">
                               @if($task > 0)
                                <button type="submit" disabled class="btn-danger rounded f-14 p-2 mr-2 mb-2 mb-lg-0 mb-md-0 complete_milestone">Mark As Complete ({{$complete_task}}/{{$task}})</button>
                                @else
                                @if($item->status == 'incomplete')

                                     <button type="submit" class="btn-primary rounded f-14 p-2 mr-2 mb-2 mb-lg-0 mb-md-0 complete_milestone">Mark As Complete</button>
                                  @else

                                  @if($item->invoice_created == 0)
                                <?php
                                $milestone_count= App\Models\ProjectMilestone::where('project_id',$project->id)->count();
                                $complete_milestone= App\Models\ProjectMilestone::where('project_id',$project->id)->where('status','complete')->count();
                                $invoice_generated= App\Models\ProjectMilestone::where('project_id',$project->id)->where('status','complete')->where('invoice_created',1)->count();
                              //  dd($complete_milestone, $invoice_generated);
                                 ?>

                                 @if($invoice_generated == ($milestone_count -1) && $item->qc_status == 0)

                                 <a href="/projects/q&c/{{$project->id}}"   class="btn-success rounded f-14 p-2 flex-right openRightModal">Complete Q&C</a>

                                 @else

                                  <a href="#"   class="btn-success rounded f-14 p-2 flex-right create-invoice"  data-row-id="{{ $item->id }}">Generate Invoice</a>
                                  @endif

                                    @else
                                      <input type="hidden" id="invoice_id" value="{{$item->invoice_id}}">
                                      @php
                                      $invoice= App\Models\Invoice::where('id',$item->invoice_id)->first();
                                      @endphp
                                      @if($invoice->status == 'unpaid')
                                      @php
                                      $invoice_count= App\Models\Invoice::where('project_id',$project->id)->where('status','paid')->count();
                                      $milestone_count= App\Models\ProjectMilestone::where('project_id',$project->id)->count();
                                      $complete_milestone= App\Models\ProjectMilestone::where('project_id',$project->id)->where('status','complete')->count();
                                      $invoice_generated= App\Models\ProjectMilestone::where('project_id',$project->id)->where('status','complete')->where('invoice_created',1)->count();
                                      //dd($milestone_count,$invoice_count);
                                      @endphp
                                      @if($milestone_count - $invoice_count == 1 && $item->project_completion_status == 0)
                                        <a href="/projects/project-completion/{{$item->id}}"  class="btn-success rounded f-14 p-2 flex-right openRightModal" >Project Completion Form</a>
                                      @else
                                    <a href="#"  class="btn-warning rounded f-14 p-2 flex-right create-payment" data-row-id="{{ $item->invoice_id }}">Add Payment</a>
                                    @endif
                                    @else
                                    <i class="fa fa-circle mr-1 text-dark-green f-10"></i>
                                  Milestone Paid
                                    @endif
                                    @endif
                             @endif

                               @endif
                                 </form>


                            </td>
                            <td class="text-right pr-20">
                                <div class="task_view">
                                    <a href="javascript:;" data-milestone-id="{{ $item->id }}"
                                        class="taskView milestone-detail text-darkest-grey f-w-500">@lang('app.view')</a>
                                    <div class="dropdown">
                                        <a class="task_view_more d-flex align-items-center justify-content-center dropdown-toggle"
                                            type="link" id="dropdownMenuLink-{{ $item->id }}" data-toggle="dropdown"
                                            aria-haspopup="true" aria-expanded="false">
                                            <i class="icon-options-vertical icons"></i>
                                        </a>
                                        <div class="dropdown-menu dropdown-menu-right"
                                            aria-labelledby="dropdownMenuLink-{{ $item->id }}" tabindex="0">

                                            @if ($editProjectMilestonePermission == 'all' || ($editProjectMilestonePermission == 'added' && user()->id == $item->added_by))
                                                <a class="dropdown-item edit-milestone" href="javascript:;"
                                                    data-row-id="{{ $item->id }}">
                                                    <i class="fa fa-edit mr-2"></i>
                                                    @lang('app.edit')
                                                </a>
                                            @endif

                                            @if ($deleteProjectMilestonePermission == 'all' || ($deleteProjectMilestonePermission == 'added' && user()->id == $item->added_by))
                                                <a class="dropdown-item delete-row" href="javascript:;"
                                                    data-row-id="{{ $item->id }}">
                                                    <i class="fa fa-trash mr-2"></i>
                                                    @lang('app.delete')
                                                </a>
                                            @endif

                                        </div>
                                    </div>
                                </div>

                            </td>
                        </tr>
                    @empty
                        <tr>
                            <td colspan="5">
                                <x-cards.no-record icon="list" :message="__('messages.noRecordFound')" />
                            </td>
                        </tr>
                    @endforelse
                </x-table>
            </x-cards.data>
        @else
        <x-cards.no-record :message="__('messages.noRecordFound')" icon="flag" />
        @endif
    </div>

</div>
<!-- ROW END -->
<input type="hidden" id="project_id"  value="{{$project->id}}">
<input type="hidden" id="client_id"  value="{{$project->client_id}}">
<script type="text/javascript">

    let project_id = document.getElementById('project_id').value;
    let client_id =document.getElementById('client_id').value;




    $('body').on('click', '.create-invoice', function() {
      //id = $(this).attr("id");
        var milestone_id = $(this).data('row-id');
    //  alert(milestone_id);
      var url = `{{ route('invoices.create') }}`;

      string = `?project_id=${project_id}&client_id=${client_id}&milestone_id=${milestone_id}`;
      url += string;

      window.open(url);
    });
    $('body').on('click', '.create-payment', function() {
      //id = $(this).attr("id");
        var invoice_id = $(this).data('row-id');
    //  alert(milestone_id);
      var url = `{{ route('payments.create') }}`;

      string = `?invoice_id=${invoice_id}&default_client=${client_id}`;
      url += string;

      window.open(url);
    });





</script>

<script>
    $('#add-project-milestone').click(function() {
        const url = "{{ route('milestones.create') }}" + "?id={{ $project->id }}";
        $(MODAL_LG + ' ' + MODAL_HEADING).html('...');
        $.ajaxModal(MODAL_LG, url);

    });

    $('body').on('click', '.edit-milestone', function() {
        var id = $(this).data('row-id');

        var url = "{{ route('milestones.edit', ':id') }}";
        url = url.replace(':id', id);

        $(MODAL_LG + ' ' + MODAL_HEADING).html('...');
        $.ajaxModal(MODAL_LG, url);

    });

    $('body').on('click', '.milestone-detail', function() {
        var id = $(this).data('milestone-id');
        var url = "{{ route('milestones.show', ':id') }}";
        url = url.replace(':id', id);
        $(MODAL_XL + ' ' + MODAL_HEADING).html('...');
        $.ajaxModal(MODAL_XL, url);
    });

    $('.delete-row').click(function() {

        var id = $(this).data('row-id');
        var url = "{{ route('milestones.destroy', ':id') }}";
        url = url.replace(':id', id);

        var token = "{{ csrf_token() }}";

        Swal.fire({
            title: "@lang('messages.sweetAlertTitle')",
            text: "@lang('messages.recoverRecord')",
            icon: 'warning',
            showCancelButton: true,
            focusConfirm: false,
            confirmButtonText: "@lang('messages.confirmDelete')",
            cancelButtonText: "@lang('app.cancel')",
            customClass: {
                confirmButton: 'btn btn-primary mr-3',
                cancelButton: 'btn btn-secondary'
            },
            showClass: {
                popup: 'swal2-noanimation',
                backdrop: 'swal2-noanimation'
            },
            buttonsStyling: false
        }).then((result) => {
            if (result.isConfirmed) {
                $.easyAjax({
                    type: 'POST',
                    url: url,
                    data: {
                        '_token': token,
                        '_method': 'DELETE'
                    },
                    success: function(response) {
                        if (response.status == "success") {
                            $('#row-' + id).fadeOut();
                        }
                    }
                });
            }
        });

    });


</script>
<script src="http://cdn.bootcss.com/toastr.js/latest/js/toastr.min.js"></script>
   {!! Toastr::message() !!}
