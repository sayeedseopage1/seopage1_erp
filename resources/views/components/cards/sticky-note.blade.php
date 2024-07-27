@switch($stickyNote->colour)
    @case('green')
        @php
            $colour = 'dark-green';
        @endphp
    @break
    @case('purple')
        @php
            $colour = 'dark-grey';
        @endphp
    @break
    @default
        @php
        $colour = $stickyNote->colour;
        @endphp

@endswitch
<div class="card sticky-note border" style="height: 250px;">
    <div class="card-body text-justify text-wrap">
        <div class="row">

            <div class="col-10">
                {!! nl2br($stickyNote->note_text) !!}
            </div>
            <div class="col-2 text-right">
                <div class="dropdown">
                    <button class="btn btn-lg f-14 px-2 py-0 text-dark-grey text-capitalize rounded  dropdown-toggle"
                        type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <i class="fa fa-ellipsis-h"></i>
                    </button>

                    <div class="dropdown-menu dropdown-menu-right border-grey rounded b-shadow-4 p-0"
                        aria-labelledby="dropdownMenuLink" tabindex="0">
                        <a class="dropdown-item"
                            href="{{ route('sticky-notes.show', $stickyNote->id) }}"><i
                                class="fa fa-eye mr-2"></i>@lang('app.view')</a>
                        <a class="dropdown-item"
                            href="{{ route('sticky-notes.edit', $stickyNote->id) }}"><i
                                class="fa fa-edit mr-2"></i>@lang('app.edit')</a>
                        <a class="dropdown-item delete-note" data-note-id="{{ $stickyNote->id }}"
                            href="javascript:;"><i class="fa fa-trash mr-2"></i>@lang('app.delete')</a>
                        <a class="dropdown-item mark-as-complete" data-note-id="{{ $stickyNote->id }}"
                            href="javascript:;"><i class="fa fa-check mr-2"></i>Mark as complete</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="card-footer bg-white border-0">
        <div class="d-flex justify-content-between">
            <div class="text-lightest">{{ $stickyNote->created_at->format(global_setting()->date_format) }}</div>
            <div class="text-{{ $colour }}"><i class="fa fa-circle"></i></div>
        </div>
    </div>
</div>
