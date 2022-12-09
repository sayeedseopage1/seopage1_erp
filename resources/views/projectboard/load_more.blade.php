@php
$changeStatusPermission = user()->permission('change_status');
@endphp

@foreach ($tasks as $task)
    <x-cards.task-card :task="$task" :draggable="($changeStatusPermission == 'all' ? 'true' : 'false')" />
@endforeach
