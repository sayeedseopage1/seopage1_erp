@extends('layouts.app')

@section('content')
    <!-- CONTENT WRAPPER START -->
    <div class="content-wrapper">
        @include('orders.ajax.show')
    </div>
    <!-- CONTENT WRAPPER END -->

@endsection
