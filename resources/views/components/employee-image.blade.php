<div class="taskEmployeeImg rounded-circle mr-1">
    <a href="{{ route('employees.show', $user->id) }}">
        <img data-toggle="tooltip" data-original-title="{{ mb_ucwords($user->name) }}"
            src="{{ $user->image_url }}">
    </a>
</div>