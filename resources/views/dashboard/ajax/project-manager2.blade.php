<div class="row">
  <div class="col-sm-6">
    <x-cards.data class="mb-3" :title="__('Total Projects (Status Wise)')" padding="false" otherClasses="h-200">


        <x-table>
          <?php
          $status= App\Models\ProjectStatusSetting::where('status','active')->orderBy('priority','asc')->get();
           ?>     <x-slot name="thead">
                 <th>#</th>
                 <th class="pl-20 text-capitalize">Status Name</th>
                 <th>No of Projects</th>

             </x-slot>
                  @foreach($status as $st)
                    <tr>
                      <td>
                        {{$loop->index+1}}
                      </td>
                        <td class="pl-20 text-capitalize"><i class="fas fa-circle" style="color:{{$st->color}}"></i>
                           {{$st->status_name}}
                        </td>
                        <td class="pl-20">0</td>

                    </tr>
                    @endforeach

        </x-table>
    </x-cards.data>
  </div>
  <div class="col-sm-6">
    <x-cards.data class="mb-3" :title="__('Total Tasks (Status Wise)')" padding="false" otherClasses="h-200">


        <x-table>
          <?php
          $task_status= App\Models\TaskBoardColumn::orderBy('priority','asc')->get();
           ?>     <x-slot name="thead">
                 <th>#</th>
                 <th class="pl-20 text-capitalize">Status Name</th>
                 <th>No of Projects</th>

             </x-slot>
                  @foreach($task_status as $st)
                    <tr>
                      <td>
                        {{$loop->index+1}}
                      </td>
                        <td class="pl-20 text-capitalize"><i class="fas fa-circle" style="color:{{$st->label_color}}"></i>
                           {{$st->column_name}}
                        </td>
                        <td class="pl-20">0</td>

                    </tr>
                    @endforeach

        </x-table>
    </x-cards.data>
  </div>

</div>

<x-cards.data class="mb-3" :title="__('Total Tasks Assigned By Me')" padding="false" otherClasses="h-200">


    <x-table>
      <?php
      $tasks= App\Models\Task::where('added_by',Auth::id())->orderBy('id','desc')->get();
       ?>     <x-slot name="thead">
             <th>#</th>

             <th class="pl-20 text-capitalize">Task</th>
              <th class="pl-20 text-capitalize">Project</th>
                <th class="pl-20 text-capitalize">Client</th>
             <th class="pl-20">Status</th>

         </x-slot>
              @foreach($tasks as $task)
                <tr>
                  <td>
                    {{$loop->index+1}}
                  </td>

                    <td class="pl-20 text-capitalize "><a class="text-darkest-grey openRightModal" href="/account/tasks/{{$task->id}}" target="_blank">{{$task->heading}}</a></td>
                    <td class="pl-20 text-capitalize">{{Str::limit($task->project->project_name,20)}}</td>
                    <td class="pl-20 text-capitalize">{{$task->project->client_name->user_name}}</td>
                    <td class="pl-20 text-capitalize"><i class="fas fa-circle" style="color:{{$task->stat->label_color}}"></i> {{$task->status}}</td>

                </tr>
                @endforeach

    </x-table>
</x-cards.data>
