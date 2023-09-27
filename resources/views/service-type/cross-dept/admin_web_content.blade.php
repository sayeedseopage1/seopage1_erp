@extends('layouts.app')
@section('content')
@include('sections.datatable_css')
    <div class="row mx-0">
        <div class="col-12">
            <div class="card mt-3" style="border: none">
                <div class="card-body">
                    {!! $dataTable->table(['class' => 'table table-hover border-0 w-100']) !!}
                </div>
            </div>
        </div>
    </div>
    @include('sections.datatable_js')
    <script>
        $('#web-content-table').on('preXhr.dt', function(e, settings, data) {

            var webContentIds = {!!  json_encode($web_content)  !!};
            data['webContentIds'] = webContentIds;
        });

        const showTable = () => {
            window.LaravelDataTables["web-content-table"].draw();
        }
    </script>
@endsection
