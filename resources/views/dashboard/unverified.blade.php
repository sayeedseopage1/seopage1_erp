@extends('layouts.app')

@section('content')

    <!-- CONTENT WRAPPER START -->
    <div class="content-wrapper">
        <div class="row">
            <div class="col-md-12 mt-4">
                <h4 class="f-21 text-capitalize font-weight-bold">@lang('app.welcome')
                    {{ $user->name }}</h4>

            </div>

            <div class="col-md-12 mt-4">
                <x-alert type="danger">
                    <h4><i class="fa fa-user-times"></i> @lang('modules.dashboard.verificationPending')</h4>
                    <p class="f-16 mt-4">@lang('modules.dashboard.verificationPendingInfo')</p>
                </x-alert>
            </div>

            <div class="col-md-12 mt-4 text-center">
                <img src="{{ asset('img/pending_approval.svg') }}" width="350" alt="">
            </div>

        </div>
    </div>
    <!-- CONTENT WRAPPER END -->
@endsection

@push('scripts')

@endpush
