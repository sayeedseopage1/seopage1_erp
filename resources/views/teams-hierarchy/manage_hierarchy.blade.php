<ul id="node-ul-{{$parent_id}}">
    @foreach($childs as $child)
    <li class="node-sibling-li" value="{{$child->id}}"><i class="icon-hdd"></i> <span id="{{$child->id}}"  class="node-cpe">{{ $child->team_name }}</span>

        @if($child->childs)
            @include('departments-hierarchy.manage_hierarchy',['childs' => $child->childs,'parent_id' => $child->id])
        @endif
    </li>
    @endforeach
</ul>
