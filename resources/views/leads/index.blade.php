@extends('layouts.app')

@push('datatable-styles')
    @include('sections.datatable_css')
@endpush

@section('filter-section')

    @include('leads.filters')

@endsection

@php
$addLeadPermission = user()->permission('add_lead');
$addLeadCustomFormPermission = user()->permission('manage_lead_custom_forms');
@endphp

@section('content')

    <!-- CONTENT WRAPPER START -->
    <div class="content-wrapper">
        <!-- Add Task Export Buttons Start -->
        <div class="d-block d-lg-flex d-md-flex justify-content-between action-bar">
            <div id="table-actions" class="flex-grow-1 align-items-center">
                @if ($addLeadPermission == 'all' || $addLeadPermission == 'added')
                    <x-forms.link-primary :link="url('/account/leads/create')" class="mr-3 float-left mb-2 mb-lg-0 mb-md-0" icon="plus">
                        @lang('app.add')
                        @lang('app.lead')
                    </x-forms.link-primary>
                @endif

          {{--      @if ($addLeadCustomFormPermission == 'all')
                    <x-forms.button-secondary icon="pencil-alt" class="mr-3 float-left mb-2 mb-lg-0 mb-md-0" id="add-lead">
                        @lang('modules.lead.leadForm')
                    </x-forms.button-secondary>
                @endif

                @if ($addLeadPermission == 'all' || $addLeadPermission == 'added')
                    <x-forms.link-secondary :link="route('leads.import')" class="mr-3 openRightModal float-left mb-2 mb-lg-0 mb-md-0" icon="file-upload">
                        @lang('app.importExcel')
                    </x-forms.link-secondary>
                @endif --}}
            </div>

            <x-datatable.actions>
                <div class="select-status mr-3 pl-3">
                    <select name="action_type" class="form-control select-picker" id="quick-action-type" disabled>
                        <option value="">@lang('app.selectAction')</option>
                        <option value="change-status">@lang('modules.tasks.changeStatus')</option>
                        <option value="delete">@lang('app.delete')</option>
                    </select>
                </div>
                <div class="select-status mr-3 d-none quick-action-field" id="change-status-action">
                    <select name="status" class="form-control select-picker">
                        @foreach ($status as $st)
                            <option value="{{ $st->id }}">{{ $st->type }}</option>
                        @endforeach
                    </select>
                </div>
            </x-datatable.actions>


            <div class="btn-group mt-2 mt-lg-0 mt-md-0 ml-0 ml-lg-3 ml-md-3" role="group">
                <a href="{{ route('leads.index') }}" class="btn btn-secondary f-14 btn-active" data-toggle="tooltip"
                    data-original-title="@lang('modules.leaves.tableView')"><i class="side-icon bi bi-list-ul"></i></a>
                  {{--
                <a href="{{ route('leadboards.index') }}" class="btn btn-secondary f-14" data-toggle="tooltip" data-original-title="@lang('modules.lead.kanbanboard')"><i class="side-icon bi bi-kanban"></i></a>
                --}}
            </div>
        </div>

        <!-- Add Task Export Buttons End -->
        <!-- Task Box Start -->
        <div class="d-flex flex-column w-tables rounded mt-3 bg-white">
          @if(Session::has('status_updated'))
              <div class="alert alert-success show mb-2" role="alert">{{Session::get('status_updated')}}</div>
              <div>

              </div>
              @endif

            {!! $dataTable->table(['class' => 'table table-hover border-0 w-100']) !!}
            @include('contracts.modals.dealstmodal')
        </div>
        <!-- Task Box End -->
    </div>
    <!-- CONTENT WRAPPER END -->

@endsection

@push('scripts')
 <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-validate/1.19.2/jquery.validate.min.js"></script>
    @include('sections.datatable_js')


    <script>
        $('#leads-table').on('preXhr.dt', function(e, settings, data) {

            var dateRangePicker = $('#datatableRange').data('daterangepicker');
            var startDate = $('#datatableRange').val();

            if (startDate == '') {
                startDate = null;
                endDate = null;
            } else {
                startDate = dateRangePicker.startDate.format('{{ global_setting()->moment_date_format }}');
                endDate = dateRangePicker.endDate.format('{{ global_setting()->moment_date_format }}');
            }

            var searchText = $('#search-text-field').val();




            var date_filter_on = $('#date_filter_on').val();

            data['startDate'] = startDate;
            data['endDate'] = endDate;
            data['searchText'] = searchText;

            data['date_filter_on'] = date_filter_on;
        });

        const showTable = () => {
            window.LaravelDataTables["leads-table"].draw();
        }

        $('#quick-action-type').change(function() {
            const actionValue = $(this).val();
            if (actionValue != '') {
                $('#quick-action-apply').removeAttr('disabled');

                if (actionValue == 'change-status') {
                    $('.quick-action-field').addClass('d-none');
                    $('#change-status-action').removeClass('d-none');
                } else {
                    $('.quick-action-field').addClass('d-none');
                }
            } else {
                $('#quick-action-apply').attr('disabled', true);
                $('.quick-action-field').addClass('d-none');
            }
        });

        $('#quick-action-apply').click(function() {
            const actionValue = $('#quick-action-type').val();
            if (actionValue == 'delete') {
                Swal.fire({
                    title: "@lang('messages.sweetAlertTitle')",
                    text: "@lang('messages.recoverRecord')",
                    icon: 'warning',
                    showCancelButton: true,
                    focusConfirm: false,
                    confirmButtonText: "@lang('messages.confirmDelete')",
                    cancelButtonText: "@lang('app.cancel')",
                    customClass: {
                        confirmButton: 'btn btn-primary mr-3',
                        cancelButton: 'btn btn-secondary'
                    },
                    showClass: {
                        popup: 'swal2-noanimation',
                        backdrop: 'swal2-noanimation'
                    },
                    buttonsStyling: false
                }).then((result) => {
                    if (result.isConfirmed) {
                        applyQuickAction();
                    }
                });

            } else {
                applyQuickAction();
            }
        });

        $('body').on('click', '.delete-table-row', function() {
            var id = $(this).data('id');

            Swal.fire({
                title: "@lang('messages.sweetAlertTitle')",
                text: "@lang('messages.recoverRecord')",
                icon: 'warning',
                showCancelButton: true,
                focusConfirm: false,
                confirmButtonText: "@lang('messages.confirmDelete')",
                cancelButtonText: "@lang('app.cancel')",
                customClass: {
                    confirmButton: 'btn btn-primary mr-3',
                    cancelButton: 'btn btn-secondary'
                },
                showClass: {
                    popup: 'swal2-noanimation',
                    backdrop: 'swal2-noanimation'
                },
                buttonsStyling: false
            }).then((result) => {
              //console.log('id');
                if (result.isConfirmed) {
                    var url = "{{ route('leads.destroy', ':id') }}";
                    url = url.replace(':id', id);

                    var token = "{{ csrf_token() }}";

                    $.easyAjax({
                        type: 'POST',
                        url: url,
                        data: {
                            '_token': token,
                            '_method': 'DELETE'
                        },
                        success: function(response) {
                            if (response.status == "success") {
                                showTable();
                            }
                        }
                    });
                }
            });
        });

        const applyQuickAction = () => {
            var rowdIds = $("#leads-table input:checkbox:checked").map(function() {
                return $(this).val();
                //console.log= ('rowIds');
            }).get();


            var url = "{{ route('leads.apply_quick_action') }}?row_ids=" + rowdIds;

            $.easyAjax({
                url: url,
                container: '#quick-action-form',
                type: "POST",
                disableButton: true,
                buttonSelector: "#quick-action-apply",
                data: $('#quick-action-form').serialize(),
                success: function(response) {
                    if (response.status == 'success') {
                        showTable();
                        resetActionButtons();
                        deSelectAll();
                    }
                }
            })
        };

        $('#leads-table').on('change', '.change-status', function() {
            var url = "{{ route('leads.change_status') }}";
            var token = "{{ csrf_token() }}";
            var id = $(this).data('task-id');
            var status = $(this).val();

            if (id != "" && status != "") {
                $.easyAjax({
                    url: url,
                    type: "POST",
                    data: {
                        '_token': token,
                        taskId: id,
                        status: status,
                        sortBy: 'id'
                    },
                    success: function(data) {
                        showTable();
                        resetActionButtons();
                        deSelectAll();
                    }
                });

            }
        });

        function changeStatus(leadID, statusID) {

            var url = "{{ route('leads.change_status') }}";
            var token = "{{ csrf_token() }}";

            $.easyAjax({
                type: 'POST',
                url: url,
                data: {
                    '_token': token,
                    'leadID': leadID,
                    'statusID': statusID
                },
                success: function(response) {
                    if (response.status == "success") {
                        $.easyBlockUI('#leads-table');
                        $.easyUnblockUI('#leads-table');
                        showTable();
                        resetActionButtons();
                        deSelectAll();
                    }
                }
            });
        }

        function followUp(leadID) {
            var url = '{{ route('leads.follow_up', ':id') }}';
            url = url.replace(':id', leadID);

            $(MODAL_LG + ' ' + MODAL_HEADING).html('...');
            $.ajaxModal(MODAL_LG, url);
        }

        $('body').on('click', '#add-lead', function() {
            window.location.href = "{{ route('lead-form.index') }}";
        });

        $( document ).ready(function() {
            @if (!is_null(request('start')) && !is_null(request('end')))
            $('#datatableRange').val('{{ request('start') }}' +
            ' @lang("app.to") ' + '{{ request('end') }}');
            $('#datatableRange').data('daterangepicker').setStartDate("{{ request('start') }}");
            $('#datatableRange').data('daterangepicker').setEndDate("{{ request('end') }}");
                showTable();
            @endif
        });

    </script>

    <script>
  function dataTableRowCheck2(id)
  {
     var id = id;
     //console.log(id);

  document.getElementById('mydata').value= id;
  }
  </script>

  <script>




          $(document).ready(function() {
            quillImageLoad('#comments');



              $("#lead-convert").validate({


                  rules: {
                      client_username: {
                          required: true,

                      },

                      profile_link: {
                        url:true,
                        required: true,

                      },
                      message_link: {
                        url:true,
                        required: true,

                      },

                      comments: {
                          required: true,
                          minlength: 10
                      },


                  },
                  messages: {
                      client_username: {
                          required: "Client username is required"

                      },

                      profile_link: {
                          required: "Profile link is required",
                          url: "Link must be a valid url"

                      },
                      message_link: {
                          required: "Message thread link is required",
                          url: "Link must be a valid url"

                      },
                    comments: {
                          required: "Comment field is required",
                         minlength: "Comments must be minimum 10 characters"
                      },


                  }
              });

          });


          $('#lead-convert-button').click(function() {

              var note3 = document.getElementById('comments').children[0].innerHTML;
                document.getElementById('comments-text').value = note3;


         } );





      </script>

@endpush
