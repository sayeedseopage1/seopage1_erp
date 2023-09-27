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
        $('#product-category-table').on('preXhr.dt', function(e, settings, data) {

            var productCategories = {!!  json_encode($product_categories)  !!};
            data['productCategories'] = productCategories;
        });

        const showTable = () => {
            window.LaravelDataTables["product-category-table"].draw();
        }
    </script>
@endsection
