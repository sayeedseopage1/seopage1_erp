<!doctype html>
<html lang="en">

<head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <link rel="icon" type="image/png" sizes="16x16" href="{{ global_setting()->favicon_url }}">
    <link rel="manifest" href="{{ global_setting()->favicon_url }}">
    <meta name="msapplication-TileColor" content="#ffffff">
    <meta name="msapplication-TileImage" content="{{ global_setting()->favicon_url }}">
    <meta name="theme-color" content="#ffffff">

    <!-- Font Awesome Icons -->
    <link rel="stylesheet" href="{{ asset('vendor/css/all.min.css') }}">

    <!-- Template CSS -->
    <link href="{{ asset('vendor/froiden-helper/helper.css') }}" rel="stylesheet">
    <link type="text/css" rel="stylesheet" media="all" href="{{ asset('css/main.css') }}">

    <title>{{ global_setting()->app_name }}</title>


    @stack('styles')
    <script src="{{ asset('vendor/jquery/jquery.min.js') }}"></script>

    <style>
        .login_header {
           background-color: {{ global_setting()->logo_background_color }} !important;
        }

    </style>

    @if (global_setting()->login_background_url)
        <style>
            .login_section {
                background: url("{{ global_setting()->login_background_url }}") center center/cover no-repeat !important;
            }

        </style>
    @endif

    @if(file_exists(public_path().'/css/login-custom.css'))
        <link href="{{ asset('css/login-custom.css') }}" rel="stylesheet">
    @endif

    @if (global_setting()->sidebar_logo_style == 'full')
    <style>
        .login_header img {
            max-width: unset;
        }
    </style>
    @endif

</head>

<body class="{{ global_setting()->auth_theme == 'dark' ? 'dark-theme' : '' }}">

    <header class="sticky-top d-flex justify-content-center align-items-center login_header bg-white px-4">
        <img class="mr-2 rounded" src="{{ global_setting()->logo_url }}" alt="Logo" />
        @if (global_setting()->sidebar_logo_style == 'square')
        <h3 class="mb-0 pl-1 {{ global_setting()->auth_theme == 'dark' ? 'text-light' : '' }}">{{ global_setting()->app_name }}</h3>
        @endif
    </header>

    {{ $slot }}


    <!-- Global Required Javascript -->
    <script src="{{ asset('vendor/bootstrap/javascript/bootstrap-native.js') }}"></script>

    <!-- Font Awesome -->
    <script src="{{ asset('vendor/jquery/all.min.js') }}"></script>

    <!-- Template JS -->
    <script src="{{ asset('js/main.js') }}"></script>
    <script>
        const MODAL_DEFAULT = '#myModalDefault';
        const MODAL_LG = '#myModal';
        const MODAL_XL = '#myModalXl';
        const MODAL_HEADING = '#modelHeading';
        const RIGHT_MODAL = '#task-detail-1';
        const RIGHT_MODAL_CONTENT = '#right-modal-content';
        const RIGHT_MODAL_TITLE = '#right-modal-title';

        const dropifyMessages = {
            default: "@lang('app.dragDrop')",
            replace: "@lang('app.dragDropReplace')",
            remove: "@lang('app.remove')",
            error: "@lang('messages.errorOccured')",
        };
    </script>

    {{ $scripts }}

</body>

</html>
