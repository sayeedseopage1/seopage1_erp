@extends('layouts.app')
@push('styles')
<style>
        .btn-danger {
    padding: 7px 11px;
    }
</style>
@endpush
@section('content')
    <div class="content-wrapper">
        <div class="row">
            <div class="col-12">
                <div class="card">
                    <div class="card-header">
                        <h5><a href="/account/contracts">Won Deals</a> - Award Time Extention</h5>
                    </div>
                    <div class="card-body">
                        <table class="table">
                            <thead>
                                <th>#</th>
                                <th>Project Name</th>
                                <th>Client Name</th>
                                <th>Requested Hours</th>
                                {{-- <th>Hours Left</th> --}}
                                <th>Request From</th>
                                <th>Request At</th>
                                <th>action</th>
                            </thead>
                            <tbody>
                                @php
                                    $counter = 0;
                                @endphp
                                @forelse ($award_time_request as $value)
                                    <tr>
                                        <td>{{ ++$counter }}</td>
                                        <td>
                                            <a href="{{ route('projects.show', $value->project->id) }}">{{ $value->project->project_name }}
                                            </a>
                                        </td>
                                        <td>
                                            <a href="{{ route('clients.show', $value->project->client_id) }}">{{ $value->project->client->name }}
                                            </a>
                                        </td>
                                        <td>{{ $value->incress_hours }} Hrs</td>
                                        {{-- <td>
                                            @php
                                                $currentDateTime = \Carbon\Carbon::now()->addHour(20);
                                                $givenDateTime = \Carbon\Carbon::parse($value->deal->award_time);
                                                //dd($value->deal->award_time, $value->deal_id);
                                                $diff = $currentDateTime->diff($givenDateTime);

                                                echo $diff->format('%h hours, %i minutes');
                                            @endphp
                                        </td> --}}
                                        <td>
                                            <a href="{{ route('employees.show', $value->request_from) }}">{{ $value->request_from_user->name }}
                                            </a>
                                        </td>
                                        <td>{{ $value->created_at->format('d M, Y g:i A') }}</td>
                                        <td>
                                            <button class="btn btn-success award_time_action" data-id="{{ $value->id }}" data-mode="accept" data-toggle="modal" data-target="#award_time_incress_modal{{ $value->id }}">Accept</button>
                                            <button class="btn btn-danger award_time_action_reject" data-id="{{ $value->deal_id }}" data-request-id="{{ $value->id }}" data-mode="reject">Reject</button>
                                        </td>
                                    </tr>
                                    <div class="modal fade" id="award_time_incress_modal{{ $value->id }}" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                                        <div class="modal-dialog modal-dialog-centered" role="document">
                                            <div class="modal-content">
                                                <div class="modal-header">
                                                    <h5 class="modal-title" id="exampleModalLongTitle">
                                                        Award Time Extention Accept
                                                    </h5>
                                                    <button type="button" class="close" aria-label="Close" data-dismiss="modal">
                                                        <span aria-hidden="true">&times;</span>
                                                    </button>
                                                </div>
                                                <div class="modal-body">
                                                    <div class="form-group">

                                                        <label for="hours">
                                                            Select Hours <strong>(Requested for {{ $value->incress_hours }} Hrs) </strong>
                                                        </label>

                                                        <select name="hours" id="task_hours{{ $value->id }}" class="form-control height-35" required>
                                                            <option value="">Select Hours</option>
                                                            @for ($i = 1; $i <= 20; $i++)
                                                                <option value="{{ $i }}" @selected($i == $value->incress_hours)>
                                                                    {{ $i }} Hours
                                                                </option>
                                                            @endfor
                                                        </select>

                                                    </div>
                                                    <div class="form-group">

                                                        <label for="goal_creation_type">
                                                            Select Hours  Hrs </strong>
                                                        </label>

                                                        <select name="goal_creation_type" id="goal_creation_type" class="form-control height-35" required>
                                                            @foreach ($goalCreationTimeType as $key => $item)
                                                                <option value="{{ $key }}">{{ $item }}</option>
                                                            @endforeach
                                                        </select>

                                                    </div>
                                                    <div class="card mt-5">
                                                        <div class="card-body">
                                                            <p>Porject Manager Comment</p>
                                                            <p>{{ $value->pm_comment }}</p>
                                                        </div>
                                                    </div>
                                                    <div class="form-group mt-3">
                                                        <label for="description">Description:</label>
                                                        <textarea name="descripton" id="task_description{{ $value->id }}" class="form-control" cols="30" rows="10"></textarea>
                                                    </div>
                                                </div>
                                                <div class="modal-footer">
                                                    <button type="button" class="btn btn-primary award_time_incress_approve" id="award_time_incress_approve{{ $value->id }}" data-deal-id="{{ $value->deal_id }}" data-request-id="{{ $value->id }}" data-mode="approve">
                                                        Approved
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                @empty
                                    <tr>
                                        <td colspan="6" class="t">
                                            <x-cards.no-record icon="user" :message="__('No data found')" />
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
@endsection
@push('scripts')
    <script>
        $(document).ready(function() {
            $('.award_time_incress_approve').click(function(e) {
                var task_id = $(this).data('deal-id');
                var request_id = $(this).data('request-id');
                var task_hours = $('#task_hours' + request_id).val();
                var goal_creation_type = $('#goal_creation_type').val();
                var task_description = $('#task_description' + request_id).val();
                var mode = $(this).data('mode');
                $.easyAjax({
                    url: '{{ route('award_time_check.update') }}',
                    type: "POST",
                    disableButton: true,
                    buttonSelector: $(this).attr('id'),
                    data: {
                        _token: '{{ csrf_token() }}',
                        id: task_id,
                        request_id: request_id,
                        hours: task_hours,
                        creation_type: goal_creation_type,
                        description: task_description,
                        mode: mode,
                    },
                    success: function(resp) {
                        if (resp.status == 'success') {
                            toastr.options.closeMethod = 'fadeOut';
                            toastr.options.closeDuration = 120;
                            toastr.options.closeEasing = 'swing';
                            toastr.success('Request Approved', 'Success');
                            window.location.href = window.location.href;
                        }
                    }
                })
            });

            $('.award_time_action_reject').click(function(e) {
                var id = $(this).data('id');
                var request_id = $(this).data('request-id');
                var mode = $(this).data('mode');

                Swal.fire({
                    title: 'Write comment for reject',
                    input: 'textarea',
                    inputAttributes: {
                        autocapitalize: 'off'
                    },
                    showCancelButton: true,
                    confirmButtonText: 'Submit',
                    showLoaderOnConfirm: true,
                    preConfirm: (description) => {
                        // $.easyAjax({
                        //     url: '{{ route('award_time_check.update') }}',
                        //     type: "POST",
                        //     disableButton: true,
                        //     buttonSelector: $(this).attr('id'),
                        //     data: {
                        //         _token: '{{ csrf_token() }}',
                        //         id: id,
                        //         request_id: request_id,
                        //         description: description,
                        //         mode: mode,
                        //     },
                        //     success: function(resp) {
                        //         if (resp.status == 'success') {
                        //             return resp;
                        //         }
                        //     },
                        //     error: function(erro) {
                        //         Swal.showValidationMessage('Something wrong');
                        //     }
                        // })
                        return fetch('{{ route('award_time_check.update') }}', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                    'X-CSRF-TOKEN': '{{ csrf_token() }}'
                                },
                                body: JSON.stringify({
                                    id: id,
                                    request_id: request_id,
                                    description: description,
                                    mode: mode,
                                }),
                            })
                            .then(response => {
                                if (!response.ok) {
                                    throw new Error(response.statusText);
                                }
                                return response.json();
                            })
                            .then(resp => {
                                if (resp.status === 'success') {
                                    return resp;
                                }
                            })
                            .catch(error => {
                                Swal.showValidationMessage(`Request failed: ${error}`);
                            });

                    },
                    allowOutsideClick: () => !Swal.isLoading()
                }).then((result) => {
                    if (result.isConfirmed) {
                        Swal.close();
                        toastr.options.closeMethod = 'fadeOut';
                        toastr.options.closeDuration = 120;
                        toastr.options.closeEasing = 'swing';
                        toastr.success('Request Submit to Admin', 'Success');
                        toastr.options.onHidden = function() {
                            window.location.href = window.location.href;
                        }
                    }
                })
            })
        })
    </script>
@endpush
