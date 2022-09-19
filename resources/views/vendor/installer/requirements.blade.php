@extends('vendor.installer.layouts.master')

@section('title', trans('installer_messages.requirements.title'))
@section('container')
    <ul class="list">
        <li class="list__item {{ $phpSupportInfo['supported'] ? 'success' : 'error' }}">PHP Version >=
            {{ $phpSupportInfo['minimum'] }} <i
                class="fa fa-fw fa-{{ $phpSupportInfo['supported'] ? 'check-circle-o' : 'exclamation-circle' }} row-icon"
                aria-hidden="true"></i></li>

        @foreach ($requirements['requirements'] as $extention => $enabled)
            <li class="list__item {{ $enabled ? 'success' : 'error' }}">{{ $extention }} <i
                    class="fa fa-fw fa-{{ $enabled ? 'check-circle-o' : 'exclamation-circle' }} row-icon"
                    aria-hidden="true"></i></li>
        @endforeach
    </ul>

    @if (!isset($requirements['errors']) && $phpSupportInfo['supported'] == 'success')
        <div class="buttons">
            <a class="button" href="{{ route('LaravelInstaller::permissions') }}">
                {{ trans('installer_messages.next') }}
            </a>
        </div>
    @endif
@stop
@section('scripts')
    <script src="{{ asset('installer/js/jQuery-2.2.0.min.js') }}"></script>
    <script>

    </script>
@endsection
