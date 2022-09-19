<div class="chartHeading mt-3 bg-white text-capitalize d-flex justify-content-between p-20 rounded-top">
    <h3 class="f-21 f-w-500 mb-0">@lang('modules.department.dragAndDrop')</h3>
</div>

<div id="dragRoot" >
    @foreach ($designations as $designation)
            <ul>
                <li value="{{$designation->id}}" ><i class="icon-building"></i>
                        <span id="{{$designation->id}}" class="node-cpe"><i class="fa fa-caret-right"></i>&nbsp;{{ $designation->name }}</span>
                    @if ($designation->childs)
                        @include('designations-hierarchy.manage_hierarchy', [
                            'childs' => $designation->childs,'parent_id' => $designation->id
                        ])
                    @endif
                </li>
            </ul>
    @endforeach
    <ul id="pre-state"></ul>
    <ul id="drophere" ondragstart="return false;" ondrop="return false;">
        <li ><i class="icon-building"></i> <span id="NewNode" class="node-cpe">@lang('app.new') @lang('app.hierarchy')</span></span></li>
    </ul>
</div>
