@foreach ($result['boardColumns'] as $key => $column)

    <!-- MINIMIZED BOARD PANEL START -->
    <div class="minimized rounded bg-additional-grey border-grey mr-3 d-none column-mini-{{ $column->id }}">
        <!-- TASK BOARD HEADER START -->
        <div class="d-flex mt-4 mx-1 b-p-header align-items-center">
            <a href="javascript:;" class="d-grid f-8 mb-3 text-lightest collapse-column"
                data-column-id="{{ $column->id }}" data-type="maximize">
                <i class="fa fa-chevron-right ml-1"></i>
                <i class="fa fa-chevron-left"></i>
            </a>

            <p class="mb-3 mx-0 f-15 text-dark-grey font-weight-bold"><i class="fa fa-circle mb-2 text-red"
                    style="color: {{ $column->label_color }}"></i>{{ $column->slug == 'completed' || $column->slug == 'incomplete' ? __('app.' . $column->slug) : mb_ucwords($column->column_name) }}</p>

            <span
                class="b-p-badge bg-grey f-13 px-2 py-2 text-lightest font-weight-bold rounded d-inline-block">{{ $column->tasks_count }}</span>

        </div>
        <!-- TASK BOARD HEADER END -->

    </div>
    <!-- MINIMIZED BOARD PANEL END -->

    <!-- BOARD PANEL 2 START -->
    <div class="board-panel rounded bg-additional-grey border-grey mr-3 column-max-{{ $column->id }}">
        <!-- TASK BOARD HEADER START -->
        <div class="d-flex m-3 b-p-header">
            <p class="mb-0 f-15 mr-3 text-dark-grey font-weight-bold"><i class="fa fa-circle mr-2 text-yellow"
                    style="color: {{ $column->label_color }}"></i>{{ $column->slug == 'completed' || $column->slug == 'incomplete' ? __('app.' . $column->slug) : mb_ucwords($column->column_name) }}
            </p>

            <span
                class="b-p-badge bg-grey f-13 px-2 text-lightest font-weight-bold rounded d-inline-block">{{ $column->tasks_count }}</span>

            <span class="ml-auto d-flex align-items-center">
                <a href="javascript:;" class="d-flex f-8 text-lightest collapse-column"
                    data-column-id="{{ $column->id }}" data-type="minimize">
                    <i class="fa fa-chevron-right mr-1"></i>
                    <i class="fa fa-chevron-left"></i>
                </a>
            </span>
        </div>
        <!-- TASK BOARD HEADER END -->

        <!-- TASK BOARD BODY START -->
        <div class="b-p-body">
            <!-- MAIN TASKS START -->
            <div class="b-p-tasks" id="drag-container-{{ $column->id }}" data-column-id="{{ $column->id }}">
                @forelse ($column['tasks'] as $task)
                    <x-cards.public-task-card :draggable="'false'" :task="$task" />
                @empty
                    @if ($column->tasks_count == 0)
                        <div class="card rounded bg-white border-grey b-shadow-4 m-1 mb-3 no-task-card move-disable">
                            <div class="card-body">
                                <div class="d-flex justify-content-center py-3">
                                    <p class="mb-0">
                                    <div class="align-items-center d-flex flex-column text-lightest w-100">
                                        <i class="fa fa-tasks f-15 w-100"></i>
                                        <div class="f-15 mt-4">
                                            - @lang('messages.noRecordFound') -
                                        </div>
                                    </div>
                                    </p>
                                </div>
                            </div>
                        </div><!-- div end -->
                    @endif
                @endforelse
            </div>
            <!-- MAIN TASKS END -->

            @if ($column->tasks_count > count($column['tasks']))
                <!-- TASK BOARD FOOTER START -->
                <div class="d-flex m-3 justify-content-center">
                    <a class="f-13 text-dark-grey f-w-500 load-more-tasks" data-column-id="{{ $column->id }}"
                        data-total-tasks="{{ $column->tasks_count }}"
                        href="javascript:;">@lang('modules.tasks.loadMore')</a>
                </div>
                <!-- TASK BOARD FOOTER END -->
            @endif
        </div>
        <!-- TASK BOARD BODY END -->
    </div>
    <!-- BOARD PANEL 2 END -->


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
