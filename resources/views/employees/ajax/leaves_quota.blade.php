@php
$updateLeaveQuotaPermission = user()->permission('update_leaves_quota');
@endphp

<!-- TAB CONTENT START -->
<div class="tab-pane fade show active mt-5" role="tabpanel" aria-labelledby="nav-email-tab">

    <div class="row mb-4">
        <div class="col-lg-4">
            <x-cards.widget icon="sign-out-alt" :title="__('modules.leaves.remainingLeaves')" :value="($allowedLeaves - $leavesTakenByUser)" />
        </div>
    </div>


    <x-cards.data :title="__('app.menu.leavesQuota')">
        @if ($updateLeaveQuotaPermission == 'all')

            <div class="row">
                <div class="col-md-12">
                    <a class="f-15 f-w-500" href="javascript:;" id="renew-contract"><i
                            class="icons icon-settings font-weight-bold mr-1"></i>
                        @lang('app.manage')</a>
                </div>
            </div>

            <x-form id="save-renew-data-form" class="d-none">

                <div class="row">
                    <div class="col-md-12">
                        <x-table class="table-bordered mb-3 rounded">
                            <x-slot name="thead">
                                <th>@lang('modules.leaves.leaveType')</th>
                                <th>@lang('modules.leaves.noOfLeaves')</th>
                                <th class="text-right">@lang('app.action')</th>
                            </x-slot>
                            @foreach ($employeeLeavesQuotas as $key => $leaveType)
                                <tr>
                                    <td>
                                        <x-status :value="$leaveType->leaveType->type_name" :style="'color:'.$leaveType->leaveType->color" />
                                    </td>
                                    <td> <input type="number" min="0" value="{{ $leaveType->no_of_leaves }}"
                                            class="form-control height-35 f-14 leave-count-{{ $leaveType->id }}">
                                    </td>
                                    <td class="text-right">
                                        <button type="button" data-type-id="{{ $leaveType->id }}"
                                            class="btn btn-sm btn-primary btn-outline update-category">
                                            <i class="fa fa-check"></i>
                                        </button>
                                    </td>
                                </tr>
                            @endforeach
                        </x-table>
                    </div>
                </div>

                <div class="w-100 justify-content-end d-flex mt-2">
                    <x-forms.button-cancel id="cancel-renew" class="border-0">@lang('app.cancel')
                    </x-forms.button-cancel>
                </div>
            </x-form>
        @endif


        <div class="d-flex flex-wrap justify-content-between" id="comment-list">
            @include('employees.leaves_quota')
        </div>

    </x-cards.data>
</div>
<!-- TAB CONTENT END -->

<script>
    $(document).ready(function() {
        $('#renew-contract').click(function() {
            $(this).closest('.row').addClass('d-none');
            $('#save-renew-data-form').removeClass('d-none');
        });

        $('#cancel-renew').click(function() {
            $('#save-renew-data-form').addClass('d-none');
            $('#renew-contract').closest('.row').removeClass('d-none');
        });

        $('.update-category').click(function() {
            var id = $(this).data('type-id');
            var leaves = $('.leave-count-' + id).val();
            var url = "{{ route('employee-leaves.update', ':id') }}";
            url = url.replace(':id', id);

            var token = "{{ csrf_token() }}";

            $.easyAjax({
                type: 'POST',
                url: url,
                data: {
                    '_method': 'PUT',
                    '_token': token,
                    'leaves': leaves
                },
                success: function(response) {
                    if (response.status == "success") {
                        window.location.reload();
                    }
                }
            });
        });

    });

</script>
