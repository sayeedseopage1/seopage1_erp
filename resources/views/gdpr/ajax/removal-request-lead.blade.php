<div class="col-lg-12 col-md-12 w-100 p-4 ">
    <div class="row">

            {!! $dataTable->table(['class' => 'table table-hover border-0']) !!}

    </div>
</div>

@include('sections.datatable_js')

<script>

    $('#removal-request-lead').on('preXhr.dt', function(e, settings, data) {
    });

    const showTable = () => {
        window.LaravelDataTables["removal-request-lead"].draw();
    }

</script>
