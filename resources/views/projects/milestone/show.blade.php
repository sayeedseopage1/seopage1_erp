<div class="modal-header">
  <div class="rows">
    <h5 class="modal-title" id="modelHeading">@lang('modules.projects.milestones') @lang('app.details')</h5>

  </div>

    <button type="button"  class="close" data-dismiss="modal" aria-label="Close"><span
            aria-hidden="true">×</span></button>
</div>
<div class="modal-body bg-additional-grey">
  <input type="hidden" id="milestone_id" value="{{$milestone->id}}">
  <?php
  $task= App\Models\Task::where('milestone_id',$milestone->id)->where('status','incomplete')->count();
  //dd($task);
   ?>

   @if($task > 0)
    <h6 class="text-center text-red">You can't complete this milestone because you have some pending tasks.</h6>
    @endif
    <x-cards.data>

      @if($milestone->status == 'incomplete')
      {{-- @if(Auth::user()->role_id == 4 || Auth::user()->role_id ==1)
      <form class="" action="{{route('milestone-complete')}}" method="post">
        @csrf
          <input type="hidden" name="id" value="{{$milestone->id}}">

           @if($task > 0)
           <button type="submit" disabled class="btn-primary rounded f-14 p-2 mr-2 mb-2 mb-lg-0 mb-md-0 complete_milestone">Mark As Complete</button>
           @else
        <button type="submit" class="btn-primary rounded f-14 p-2 mr-2 mb-2 mb-lg-0 mb-md-0 complete_milestone">Mark As Complete</button>
        @endif
        @endif
          </form> --}}
        <hr>
        @else
          @if($milestone->invoice_created == 0)
          <?php
          $milestone_count= App\Models\ProjectMilestone::where('project_id',$milestone->project_id)->count();
          $complete_milestone= App\Models\ProjectMilestone::where('project_id',$milestone->project_id)->where('status','complete')->count();
          $invoice_generated= App\Models\ProjectMilestone::where('project_id',$milestone->project_id)->where('status','complete')->where('invoice_created',1)->count();
        //  dd($complete_milestone, $invoice_generated);
           ?>
           @if($invoice_generated == ($milestone_count -1)  && $milestone->qc_status == 0)
           <a href="/projects/q&c/{{$milestone->project_id}}"   class="btn-success rounded f-14 p-2 flex-right">Complete Q&C</a>
           @else
             {{-- <a href="#"   class="btn-primary rounded f-14 p-2 flex-right create-invoice"  data-row-id="{{ $milestone->id }}">Generate Invoice</a> --}}

            @endif
          @else
          @php
          $invoice= App\Models\Invoice::where('id',$milestone->invoice_id)->first();
          @endphp
          @if($invoice != null)
          @if ($invoice->status == 'paid')
              <i class="fa fa-circle mr-1 text-dark-green f-10"></i>
            Paid
          @else
          <i class="fa fa-circle mr-1 text-red f-10"></i>
        Unpaid
          @endif
          @endif

            @endif


        <hr>


      @endif



        <x-cards.data-row :label="__('modules.projects.milestoneTitle')" :value="$milestone->milestone_title" />
          @php
            $original_currency= App\Models\Currency::where('id',$milestone->original_currency_id)->first();
          @endphp
        <x-cards.data-row :label="__('modules.projects.milestoneCost')"
            :value="currency_formatter($milestone->actual_cost, $original_currency->currency_symbol)" />

        @if ($milestone->status == 'incomplete')
            @php
            $status = "<i class='fa fa-circle mr-2 text-red'></i>".__('app.incomplete');
            @endphp
        @elseif($milestone->status == 'canceled')
        @php
        $status = "<i class='fa fa-circle mr-2 text-red'></i>".__('Canceled');
        @endphp
        @else
        
            @php
            $status = "<i class='fa fa-circle mr-2 text-dark-green'></i>".__('app.complete');
            @endphp
        @endif
        <x-cards.data-row :label="__('app.status')" :value="$status" html="true" />

        <x-cards.data-row :label="__('modules.projects.milestoneSummary')" :value="$milestone->summary" />

        <x-cards.data-row :label="__('modules.timeLogs.totalHours')" :value="$timeLog" />

      {{--  <x-cards.data-row :label="__('modules.projects.milestoneStartDate')" :value="is_null($milestone->start_date) ? '--':$milestone->start_date->format(global_setting()->date_format)" />

        <x-cards.data-row :label="__('modules.projects.milestoneEndDate')" :value="is_null($milestone->end_date) ? '--':$milestone->end_date->format(global_setting()->date_format)" /> --}}

    </x-cards.data>

    <x-cards.data :title="__('app.menu.tasks')" class="mt-4">
        <x-table class="border-0 pb-3 admin-dash-table table-hover">

            <x-slot name="thead">
                <th class="pl-20">#</th>
                <th>@lang('app.task')</th>
                <th>@lang('modules.tasks.assignTo')</th>
                <th>@lang('modules.tasks.assignBy')</th>
                <th>@lang('app.dueDate')</th>
                <th>@lang('modules.timeLogs.totalHours')</th>
                <th class="pr-20">@lang('app.status')</th>
            </x-slot>

            @forelse ($milestone->tasks as $key=>$item)
            @php
                $totalMinutes = $item->timeLogged->sum('total_minutes');
                $breakMinutes = $item->breakMinutes();
                $totalMinutes = $totalMinutes - $breakMinutes;
                $totalTimeLog = intdiv($totalMinutes, 60) . ' ' . __('app.hrs') . ' ';

                if ($totalMinutes % 60 > 0) {
                    $totalTimeLog .= $totalMinutes % 60 . ' ' . __('app.mins');
                }
            @endphp
                <tr>
                    <td>{{ $key + 1 }}</td>
                    <td>{{ ucfirst($item->heading) }}</td>
                    <td>
                        @foreach ($item->users as $member)
                            <div class="taskEmployeeImg rounded-circle"><a
                                    href="{{ route('employees.show', $member->id) }}">
                                    <img data-toggle="tooltip" data-original-title="{{ mb_ucwords($member->name) }}"
                                        src="{{ $member->image_url }}">
                                </a></div>
                        @endforeach
                    </td>
                    <td>{{ $item->created_by ? mb_ucwords($item->createBy->name) : '--' }}</td>
                    <td>{{ $item->due_date ? $item->due_date->format(global_setting()->date_format) : '--' }}</td>
                    <td>{{$totalTimeLog}}</td>
                    <td>
                        <x-status :value="$item->boardColumn->slug == 'completed' || $item->boardColumn->slug == 'incomplete' ? __('app.' . $item->boardColumn->slug) : $item->boardColumn->column_name"
                            :style="'color:'.$item->boardColumn->label_color" />
                    </td>
                </tr>
            @empty
                <tr>
                    <td colspan="7">
                        <x-cards.no-record icon="tasks" :message="__('messages.noRecordFound')" />
                    </td>
                </tr>
            @endforelse
        </x-table>

    </x-cards.data>
</div>
<div class="modal-footer">
    <x-forms.button-cancel data-dismiss="modal" class="border-0">@lang('app.close')</x-forms.button-cancel>
</div>
<script type="text/javascript">


    let milestone_id =document.getElementById('milestone_id').value;
    //console.log(milestone_id);
    document.querySelector('create-invoice').addEventListener('click', () => {
      var url = `{{ route('invoices.create') }}`;

      string = `?project_id=${project_id}&client_id=${client_id}&milestone_id=${milestone_id}`;
      url += string;

      window.open(url);
    });




</script>
