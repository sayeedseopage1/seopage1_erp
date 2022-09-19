<style>
    :root {
        --header_color: {{ $appTheme->header_color }};
    }

    .btn-primary,
    .btn-primary.disabled:hover,
    .btn-primary:disabled:hover {
        background-color: var(--header_color) !important;
        border: 1px solid var(--header_color) !important;
    }

    .text-primary {
        color: var(--header_color) !important;
    }

    .bg-primary {
        background: var(--header_color) !important;
    }

    .datepicker table tr td, .datepicker table tr th {
        font-size: 14px;
    }

    .project-header .project-menu .p-sub-menu.active:after,
    .project-header .project-menu .p-sub-menu::after,
    .qs-current, .datepicker table tr td.active.active {
        background: var(--header_color) !important;
        text-shadow: none;
        border-color: var(--header_color) !important;
    }

    .sidebar-brand-box .sidebar-brand-dropdown a.dropdown-item:hover,
    .dropdown-item.active,
    .close-task-detail {
        background-color: var(--header_color) !important;
    }

    .pagination .page-item.active .page-link,
    .custom-control-input:checked~.custom-control-label::before {
        background-color: var(--header_color) !important;
        border-color: var(--header_color) !important;
    }

    .close-task-detail span {
        border: 1px solid var(--header_color) !important;
    }

    .tabs .nav .nav-link.active,
    .tabs .nav .nav-item:hover {
        border-bottom: 3px solid var(--header_color) !important;
    }

    .sidebar-light .sidebar-menu li .nav-item:focus,
    .sidebar-light .sidebar-menu li .nav-item:hover,
    .sidebar-light .sidebar-menu li .accordionItemContent a:hover {
        color: var(--header_color) !important;
    }

    .sidebar-light .accordionItem a.active {
        color: var(--header_color) !important;
    }

</style>
