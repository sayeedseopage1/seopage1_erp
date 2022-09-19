@extends('vendor.installer.layouts.master')


@section('style')
    <style>
        .button.disabled {
            pointer-events: none;
            cursor: not-allowed;
            background: #c2c2c2;
        }

    </style>
@endsection

@section('title', trans('installer_messages.permissions.title'))
@section('container')
    @if (isset($permissions['errors']))
        <div class="alert alert-danger">Please fix the below error and then click
            {{ trans('installer_messages.checkPermissionAgain') }}</div>
    @endif
    <ul class="list">
        @foreach ($permissions['permissions'] as $permission)
            <li class="list__item list__item--permissions {{ $permission['isSet'] ? 'success' : 'error' }}">
                {{ $permission['folder'] }}
                <span>
                    <i class="fa fa-fw fa-{{ $permission['isSet'] ? 'check-circle-o' : 'exclamation-circle' }}"></i>
                    {{ $permission['permission'] }}
                </span>
            </li>
        @endforeach

    </ul>

    @if (isset($permissions['errors']))
        <span>If you have terminal access, run the following command on terminal</span>
        <p style="background: #f7f7f9;padding: 10px;">
            chmod -R 775 storage/app/ storage/framework/ storage/logs/ bootstrap/cache/
        </p>
    @endif

    <div class="buttons">

        @if (!isset($permissions['errors']))
            <a class="button" href="{{ route('LaravelInstaller::database') }}">
                {{ trans('installer_messages.next') }}
            </a>
        @else

            <a class="button" href="javascript:window.location.href='';">
                {{ trans('installer_messages.checkPermissionAgain') }}
            </a>
        @endif
    </div>

@stop

@section('scripts')
    <script src="{{ asset('installer/js/jQuery-2.2.0.min.js') }}"></script>
    <script>
        $('.button').click(function () {
            $(this).addClass('disabled');
        });
    </script>
@endsection

