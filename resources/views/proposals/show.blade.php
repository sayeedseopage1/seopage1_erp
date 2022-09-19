@extends('layouts.app')

@section('content')
    <!-- CONTENT WRAPPER START -->
    <div class="content-wrapper">
        @include('proposals.ajax.show')
    </div>
    <!-- CONTENT WRAPPER END -->

@endsection
