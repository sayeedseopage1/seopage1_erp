@extends('layouts.app')
@section('content')
    <!-- CONTENT WRAPPER START -->
    <div class="content-wrapper">
        <!-- Project Dashboard Box Start -->
        <div class="d-flex flex-column">
            <div id="projectDashboard" project-type={{ $project->deal->project_type }}>
        </div>
        <!-- Project Dashboard Box End -->
    </div>
    <!-- CONTENT WRAPPER END -->
@endsection
