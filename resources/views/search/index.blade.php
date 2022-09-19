<div class="modal-header">
    <h5 class="modal-title">@lang('app.search')</h5>
    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
</div>
<x-form id="createAgent" method="POST" class="form-horizontal">
    <div class="modal-body">
        <div class="portlet-body">

            <div class="row">
                <div class="col-lg-12 my-3">
                    <div class="input-group">

                        <select class="select-picker form-control" name="search_module" id="search_module"
                            data-live-search="true">
                            <option value="ticket">@lang('app.menu.ticket')</option>
                            <option value="invoice">@lang('app.invoice')</option>
                            <option value="notice">@lang('app.notice')</option>
                            <option value="task">@lang('app.task')</option>
                            <option value="project">@lang('app.project')</option>
                            <option value="estimate">@lang('app.estimate')</option>

                            @if (!in_array('client', user_roles()))
                                <option value="creditNote">@lang('app.menu.credit-note')</option>
                                <option value="employee">@lang('app.employee')</option>
                                <option value="client">@lang('app.client')</option>
                                <option value="lead">@lang('app.lead')</option>
                            @endif
                        </select>

                        <div class="input-group-append w-70">
                            <input type="text" class="form-control f-14" placeholder="@lang('placeholders.search')"
                                name="search_keyword" id="search_keyword">

                        </div>
                    </div>

                </div>

            </div>
        </div>
    </div>
    <div class="modal-footer">
        <x-forms.button-cancel data-dismiss="modal" class="border-0 mr-3">@lang('app.cancel')</x-forms.button-cancel>
        <x-forms.button-primary id="search-app" icon="search">@lang('app.search')</x-forms.button-primary>
    </div>
</x-form>

<script>
    // save agent
    $('#search-app').click(function() {

        $.easyAjax({
            url: "{{ route('search.store') }}",
            container: '#createAgent',
            type: "POST",
            blockUI: true,
            data: $('#createAgent').serialize(),
            disableButton: true,
            buttonSelector: "#search-app"
        })
    });

    $('#search_keyword').keypress(function(e) {

        var key = e.which;
        if (key == 13) // the enter key code
        {
            e.preventDefault();
            $('#search-app').click();
            return false;
        }
    });

    init(MODAL_LG);
</script>
