@extends('layouts.app')

@section('content')
    <!-- CONTENT WRAPPER START -->
    <div class="content-wrapper">
        @include('invoices.ajax.show')
    </div>
    <!-- CONTENT WRAPPER END -->

@endsection
