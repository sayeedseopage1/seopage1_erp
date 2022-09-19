@foreach ($tasks as $task)
    <x-cards.public-task-card :task="$task" :draggable="'false'" />
@endforeach
