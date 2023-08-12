@php
    $project = App\Models\Project::where('deal_id', $contract->deal_id)->first();
@endphp
@if (Auth::user()->role_id == 1 || Auth::user()->role_id == 7 || Auth::user()->role_id == 8)
    <div class="container-fluid">
        <div class="row">
            <div class="col-12">
                <button type="button" class="btn-primary rounded f-14 p-2 type-btn mb-3" data-toggle="modal"
                    data-target="#add-project-milestone{{ $project->deal->id }}">
                    <i class="fa fa-plus mr-1"></i>Create Milestone
                </button>
                @include('contracts.milestone.create')
                <div class="card bg-white border-0 b-shadow-4">
                    <div class="card-header bg-white border-0 text-capitalize d-flex justify-content-between p-20">
                        <h4 class="f-18 f-w-500 mb-0">Milestones</h4>
                    </div>
                    <div
                        class="card-body border-0 p-0 d-flex justify-content-between align-items-center table-responsive-sm">
                        <table id="example" class="table border-0 pb-3 admin-dash-table table-hover">
                            <thead class="">
                                <tr>
                                    <th class="pl-20">#</th>
                                    <th>Milestone Title</th>
                                    <th>Milestone Cost</th>
                                    <th>Status</th>
                                    <th>Summary</th>
                                    <th class="pr-20">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                @php
                                    $milestones = App\Models\ProjectMilestone::where('project_id', $project->id)->get();
                                @endphp

                                @forelse($milestones as $key=>$item)
                                    <tr id="row-{{ $item->id }}">
                                        <td class="pl-20">{{ $key + 1 }}</td>
                                        <td>
                                            <a href="javascript:;" class="milestone-detail text-darkest-grey f-w-500"
                                                data-milestone-id="{{ $item->id }}">{{ ucfirst($item->milestone_title) }}</a>
                                        </td>
                                        <td>
                                            @if (!is_null($item->original_currency_id))
                                                @php
                                                    $original_currency = App\Models\Currency::where('id', $item->original_currency_id)->first();
                                                @endphp
                                                {{ currency_formatter($item->actual_cost, $original_currency->currency_symbol) }}
                                            @else
                                                {{ currency_formatter($item->cost) }}
                                            @endif
                                        </td>
                                        <td>
                                            @if ($item->status == 'complete')
                                                <i class="fa fa-circle mr-1 text-dark-green f-10"></i>
                                                {{ trans('app.' . $item->status) }}
                                            @else
                                                <i class="fa fa-circle mr-1 text-red f-10"></i>
                                                @if ($item->status == 'canceled')
                                                    <span> {{ trans('app.' . $item->status) }}
                                                        <br>
                                                        {!! $item->comments !!}
                                                    </span>
                                                @else
                                                    {{ trans('app.' . $item->status) }}
                                                @endif
                                            @endif
                                        </td>
                                        <td>
                                            @if ($item->summary)
                                                {!! str_limit($item->summary, 50) !!}
                                            @else
                                                --
                                            @endif
                                        </td>
                                        @if ($project->project_status == 'Accepted')
                                        <td class="pr-20">
                                            <a href="javascript:;"> <i class="fa fa-edit mr-2"></i></a>

                                            <a class="" href="javascript:;" data-row-id="{{ $item->id }}">
                                                <i class="fa fa-trash mr-2"></i>
                                            </a>
                                        </td>
                                        @else
                                        <td class="pr-20">
                                            <a href="javascript:;"   data-toggle="modal" data-target="#editMilestone{{ $item->id }}">
                                                <i class="fa fa-edit mr-2"></i>
                                            </a>
                                            @include('contracts.milestone.edit')

                                            <a class="delete_milestone" href="javascript:;" data-row-id="{{ $item->id }}">
                                                <i class="fa fa-trash mr-2"></i>
                                            </a>
                                        </td>
                                        @endif
                                    </tr>
                                @empty
                                    <tr>
                                        <td colspan="5">
                                            <x-cards.no-record icon="list" :message="__('messages.noRecordFound')" />
                                        </td>
                                    </tr>
                                @endforelse

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endif
<script>
    $(document).on('click', '.delete_milestone', function(e) {
        e.preventDefault();
        var milestone_id = $(this).data('row-id');
        var rowElement = $('#row-' + milestone_id);
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be delete this item!",
            icon: 'warning',
            showCancelButton: true,
            focusConfirm: false,
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "Cancel",
        }).then((result) => {
            if (result.isConfirmed) {
                $.ajax({
                    url: "/deals/delete-milestone/" + milestone_id,
                    type: "DELETE",
                    data: {
                        '_token': '{{ csrf_token() }}',
                        'id': milestone_id,
                    },
                    success: function(response) {
                        rowElement.remove();
                        swal.fire({
                            title: 'Deleted!',
                            text: 'The item has been deleted successfully.',
                            icon: 'success',
                        })
                        fetchmilestone();
                    }
                });
            }
        });
    });
</script>
<script>
    $(document).on('click', '.add_milestone', function(e) {
        e.preventDefault();
        var uid = $('#generatedLinkContainer').data('linkId');
        var summary = CKEDITOR.instances.summary1.getData();
        var data = {
            'title': $('.title').val(),
            'cost': $('.cost').val(),
            'milestone_type': $('.milestone_type').val(),
            'summary': summary,
            'project_id': document.getElementById("project_id").value,
            'original_currency_id': document.getElementById("original_currency_id").value,
            'service_type': document.getElementById("service_type").value,
            'random_id': uid,
        }
        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            }
        });
        $.ajax({
            type: "POST",
            url: "{{ route('add-milestone') }}",
            data: data,
            dataType: "json",
            success: function(response) {
                if (response.status == 400) {
                    $('#saveform_errList').html("");
                    $('#saveform_errList').addClass('alert alert-danger');
                    $.each(response.errors, function(key, err_values) {
                        $('#saveform_errList').append('<li>' + err_values + '</li>');
                    });
                } else {
                    window.location.reload();
                    toastr.success('Deal Create Successfully');
                    $('.milestone_type').val('');
                    $('.title').val('');
                    $('.cost').val('');
                    CKEDITOR.instances.summary1.setData('');
                    $('#service_type').val('');
                    $('#inputUrl').hide();
                    fetchmilestone();

                }
            }
        });
    });
</script>
<script>
    $(document).on('click', ' .milestone_update', function(e) {
        e.preventDefault();
        var milestone_id = $('#milestone_id').val();
        var data = {
            'title': $('#title').val(),
            'cost': $('#cost').val(),
            'milestone_type': $('#milestone_type').val(),
            'original_currency_id': $('#original_currency_id').val(),
            'summary': $('#summary').val(),
        }
        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            }
        });

        $.ajax({
            type: "PUT",
            url: "/deals/update-milestone/" + milestone_id,
            data: data,
            dataType: "json",
            success: function(response) {
                //  console.log(response);
                if (response.status == 400) {
                    $('#updateform_errList').html("");
                    $('#updateform_errList').addClass('alert alert-danger');
                    $.each(response.errors, function(key, err_values) {
                        $('#updateform_errList').append('<li>' + err_values + '</li>');
                    });
                } else if (response.status == 400) {
                    $('#updateform_errList').html("");
                    $('#success_message').addClass('alert alert-success');
                    $('#success_message').text(response.message);
                } else {
                    window.location.reload();
                    toastr.success('Deal Update Successfully');
                    $('#editmilestone').modal('hide');
                    fetchmilestone();
                }
            }
        });


    });
</script>
