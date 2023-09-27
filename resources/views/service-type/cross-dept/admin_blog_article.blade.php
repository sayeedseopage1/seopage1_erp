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
        $('#blog-article-table').on('preXhr.dt', function(e, settings, data) {

            var blogArticles = {!!  json_encode($blog_articles)  !!};
            data['blogArticles'] = blogArticles;
        });

        const showTable = () => {
            window.LaravelDataTables["blog-article-table"].draw();
        }
    </script>
@endsection
