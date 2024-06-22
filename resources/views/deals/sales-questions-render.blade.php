@extends('layouts.app')

@section('content')
        <!-- CONTENT WRAPPER START -->
        <div class="content-wrapper">
            <!-- Task Box Start -->
            <div class="d-flex flex-column">
                @if (! $addedBefore)
                <div id="salePolicyQuestion"></div>
                @else
                <div id="salePolicyQuestionNotice" data-status="{{ $dealStatus }}"></div>
                @endif

                <div id="salePolicyData"
                data-redirect-Url="{{ $redirectUrl }}"
                ></div>
            </div>
            <!-- Task Box End -->
        </div>
        <!-- CONTENT WRAPPER END -->

@endsection
