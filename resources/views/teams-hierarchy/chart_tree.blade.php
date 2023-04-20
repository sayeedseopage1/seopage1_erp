<div class="chartHeading mt-3 bg-white text-capitalize d-flex justify-content-between p-20 rounded-top">
    <h3 class="f-21 f-w-500 mb-0">@lang('modules.department.dragAndDrop')</h3>
</div>

<div id="dragRoot" class="pt-3 rounded-bottom">
    @foreach ($departments as $department)
        <ul>
            <li value="{{$department->id}}" ><i class="icon-building"></i>
                <span id="{{$department->id}}" class="node-cpe"><i class="fa fa-caret-right"></i>&nbsp;{{ $department->team_name }}</span>
                @if ($department->childs)
                    @include('departments-hierarchy.manage_hierarchy', [
                        'childs' => $department->childs,'parent_id' => $department->id
                    ])
                @endif
            </li>
        </ul>
    @endforeach
    <ul id="pre-state"></ul>
    <ul id="drophere" ondragstart="return false;" ondrop="return false;">
        <li ><i class="icon-building"></i> <span id="NewNode" class="node-cpe">@lang('app.new') @lang('modules.department.hierarchy')</span></span></li>
    </ul>
</div>
