<!-- Datatables -->
<script src="{{ asset('vendor/datatables/jquery.dataTables.min.js') }}"></script>
<script src="{{ asset('vendor/datatables/dataTables.bootstrap4.min.js') }}"></script>
{{-- <script src="{{ asset('vendor/datatables/dataTables.responsive.min.js') }}"></script> --}}
{{-- <script src="{{ asset('vendor/datatables/responsive.bootstrap.min.js') }}"></script> --}}
<script src="{{ asset('vendor/datatables/dataTables.buttons.min.js') }}"></script>
<script src="{{ asset('vendor/datatables/buttons.bootstrap4.min.js') }}"></script>
<script src="{{ asset('vendor/datatables/buttons.server-side.js') }}"></script>
{!! $dataTable->scripts() !!}

@include('sections.daterange_js')
