<!-- TAB CONTENT START -->
<div class="tab-pane fade show active" role="tabpanel" aria-labelledby="nav-email-tab">

    <div class="d-flex flex-wrap justify-content-between p-20" id="sub-task-list">
        @forelse ($task->subtasks as $subtask)
            <div class="card w-100 rounded-0 border-0 subtask mb-2">

                <div class="card-horizontal">
                    <div class="d-flex">
                        @if ($subtask->status == 'complete')
                            <i class="fa fa-check-circle text-dark-green f-16"></i>
                        @else
                            <i class="fa fa-check-circle f-16"></i>
                        @endif
                    </div>
                    <div class="card-body pt-0">
                        <div class="d-flex flex-grow-1">
                            <p class="card-title f-14 mr-3 text-dark">
                                {!! $subtask->status == 'complete' ? '<s>' . ucfirst($subtask->title) . '</s>' : ucfirst($subtask->title) !!}
                            </p>

                        </div>
                        <div class="card-text f-11 text-lightest text-justify">
                            {{ $subtask->due_date ? __('modules.invoices.due') . ': ' . $subtask->due_date->format(global_setting()->date_format) : '' }}
                        </div>
                    </div>
                </div>
            </div>
        @empty
            <div class="align-items-center d-flex flex-column text-lightest p-20 w-100">
                <i class="fa fa-tasks f-21 w-100"></i>

                <div class="f-15 mt-4">
                    - @lang('messages.noSubTaskFound') -
                </div>
            </div>
        @endforelse

    </div>

</div>
<!-- TAB CONTENT END -->
