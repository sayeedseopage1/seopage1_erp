 @foreach ($result['boardColumns'] as $key => $column)
     @if ($column->userSetting && $column->userSetting->collapsed)
         <!-- MINIMIZED BOARD PANEL START -->
         <div class="minimized rounded bg-additional-grey border-grey mr-3">
             <!-- TASK BOARD HEADER START -->
             <div class="d-flex mt-4 mx-1 b-p-header align-items-center">
                 <a href="javascript:;" class="d-grid f-8 mb-3 text-lightest collapse-column"
                     data-column-id="{{ $column->id }}" data-type="maximize">
                     <i class="fa fa-chevron-right ml-1"></i>
                     <i class="fa fa-chevron-left"></i>
                 </a>

                 <p class="mb-3 mx-0 f-15 text-dark-grey font-weight-bold"><i class="fa fa-circle mb-2 text-red"
                         style="color: {{ $column->label_color }}"></i>{{ mb_ucwords($column->type) }}</p>

                 <span
                     class="b-p-badge bg-grey f-13 px-2 py-2 text-lightest font-weight-bold rounded d-inline-block">{{ $column->leads_count }}</span>

             </div>
             <!-- TASK BOARD HEADER END -->

         </div>
         <!-- MINIMIZED BOARD PANEL END -->
     @else
         <!-- BOARD PANEL 2 START -->
         <div class="board-panel rounded bg-additional-grey border-grey mr-3">
             <!-- TASK BOARD HEADER START -->
             <div class="d-flex m-3 b-p-header">
                 <p class="mb-0 f-15 mr-3 text-dark-grey font-weight-bold"><i class="fa fa-circle mr-2 text-yellow"
                         style="color: {{ $column->label_color }}"></i>{{ mb_ucwords($column->type) }}
                 </p>

                 <span
                     class="b-p-badge bg-grey f-13 px-2 text-lightest font-weight-bold rounded d-inline-block">{{ $column->leads_count }}</span>

                 <span class="ml-auto d-flex align-items-center">

                     <a href="javascript:;" class="d-flex f-8 text-lightest mr-3 collapse-column"
                         data-column-id="{{ $column->id }}" data-type="minimize">
                         <i class="fa fa-chevron-right mr-1"></i>
                         <i class="fa fa-chevron-left"></i>
                     </a>

                     <div class="dropdown">
                         <button
                             class="btn bg-white btn-lg f-10 px-2 py-1 text-dark-grey text-capitalize rounded  dropdown-toggle"
                             type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true"
                             aria-expanded="false">
                             <i class="fa fa-ellipsis-h"></i>
                         </button>

                         <div class="dropdown-menu dropdown-menu-right border-grey rounded b-shadow-4 p-0"
                             aria-labelledby="dropdownMenuLink" tabindex="0">
                             <a class="dropdown-item openRightModal"
                                 href="{{ route('leads.create') }}?column_id={{ $column->id }}">@lang('app.add')
                                 @lang('app.lead')</a>
                             <hr class="my-1">
                             <a class="dropdown-item edit-column"
                                 data-column-id="{{ $column->id }}" href="javascript:;">@lang('app.edit')</a>

                             @if (!$column->default)
                                 <a class="dropdown-item delete-column"
                                     data-column-id="{{ $column->id }}" href="javascript:;">@lang('app.delete')</a>
                             @endif
                         </div>
                     </div>

                 </span>
             </div>
             <!-- TASK BOARD HEADER END -->

             <!-- TASK BOARD BODY START -->
             <div class="b-p-body">
                 <!-- MAIN TASKS START -->
                 <div class="b-p-tasks" id="drag-container-{{ $column->id }}" data-column-id="{{ $column->id }}">
                     @forelse ($column['leads'] as $lead)
                         <x-cards.lead-card :lead="$lead" />
                     @empty
                         @if ($column->leads_count == 0)
                             <div class="card rounded bg-white border-grey b-shadow-4 m-1 mb-3 no-task-card move-disable">
                                 <div class="card-body">
                                     <div class="d-flex justify-content-center py-3">
                                         <p class="mb-0">
                                             <a href="{{ route('leads.create') }}?column_id={{ $column->id }}"
                                                 class="text-dark-grey openRightModal"><i
                                                     class="fa fa-plus mr-2"></i>@lang('app.add') @lang('app.lead')</a>
                                         </p>
                                     </div>
                                 </div>
                             </div><!-- div end -->
                         @endif
     @endforelse
     </div>
     <!-- MAIN TASKS END -->

     @if ($column->leads_count > count($column['leads']))
         <!-- TASK BOARD FOOTER START -->
         <div class="d-flex m-3 justify-content-center">
             <a class="f-13 text-dark-grey f-w-500 load-more-tasks" data-column-id="{{ $column->id }}"
                 data-total-tasks="{{ $column->leads_count }}"
                 href="javascript:;">@lang('modules.tasks.loadMore')</a>
         </div>
         <!-- TASK BOARD FOOTER END -->
     @endif
     </div>
     <!-- TASK BOARD BODY END -->
     </div>
     <!-- BOARD PANEL 2 END -->
 @endif

 @endforeach

 <!-- Drag and Drop Plugin -->
 <script>
     var arraylike = document.getElementsByClassName('b-p-tasks');
     var containers = Array.prototype.slice.call(arraylike);
     var drake = dragula({
             containers: containers,
             moves: function(el, source, handle, sibling) {
                 if (el.classList.contains('move-disable') || !KTUtil.isDesktopDevice()) {
                     return false;
                 }

                 return true; // elements are always draggable by default
             },
         })
         .on('drag', function(el) {
             el.className = el.className.replace('ex-moved', '');
         }).on('drop', function(el) {
             el.className += ' ex-moved';
         }).on('over', function(el, container) {
             container.className += ' ex-over';
         }).on('out', function(el, container) {
             container.className = container.className.replace('ex-over', '');
         });

 </script>

 <script>
     drake.on('drop', function(element, target, source, sibling) {
         var elementId = element.id;
         $children = $('#' + target.id).children();
         var boardColumnId = $('#' + target.id).data('column-id');
         var movingTaskId = $('#' + element.id).data('task-id');

         var taskIds = [];
         var prioritys = [];

         $children.each(function(ind, el) {
             taskIds.push($(el).data('task-id'));
             prioritys.push($(el).index());
         });

         // update values for all tasks
         $.easyAjax({
             url: "{{ route('leadboards.update_index') }}",
             type: 'POST',
             container: '#taskboard-columns',
             blockUI: true,
             data: {
                 boardColumnId: boardColumnId,
                 movingTaskId: movingTaskId,
                 taskIds: taskIds,
                 prioritys: prioritys,
                 '_token': '{{ csrf_token() }}'
             },
             success: function() {
                 if ($('#' + source.id + ' .task-card').length == 0) {
                     $('#' + source.id + ' .no-task-card').removeClass('d-none');
                 }
                 if ($('#' + target.id + ' .task-card').length > 0) {
                     $('#' + target.id + ' .no-task-card').addClass('d-none');
                 }
             }
         });

     });

 </script>
