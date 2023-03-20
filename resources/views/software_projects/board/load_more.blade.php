@foreach ($projects as $project)

    <x-cards.project-card :project="$project" />
@endforeach
