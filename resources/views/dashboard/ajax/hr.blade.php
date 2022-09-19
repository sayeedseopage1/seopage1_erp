<script src="{{ asset('vendor/jquery/frappe-charts.min.iife.js') }}"></script>
<script src="{{ asset('vendor/jquery/Chart.min.js') }}"></script>

<div class="row">
    @if (in_array('leaves', $modules) && in_array('total_leaves_approved', $activeWidgets))
        <div class="col-xl-3 col-lg-6 col-md-6 mb-3">

            <a href="javascript:;" id="total-leaves-approved">
                <x-cards.widget :title="__('modules.dashboard.totalLeavesApproved')" :value="$totalLeavesApproved"
                    icon="plane-departure" :info="__('messages.leaveInfo')" />
            </a>
        </div>
    @endif

    @if (in_array('employees', $modules) && in_array('total_new_employee', $activeWidgets))

        <div class="col-xl-3 col-lg-6 col-md-6 mb-3">

            <div
                class="bg-white p-3 rounded b-shadow-4 d-flex justify-content-between align-items-center mb-4 mb-md-0 mb-lg-0">
                <div class="d-block text-capitalize">
                    <h5 class="f-15 f-w-500 text-darkest-grey">@lang('app.menu.employees')</h5>
                    <div class="d-flex">
                        <a href="javascript:;"  class="total-employees" data-status="open"><p class="mb-0 f-15 font-weight-bold text-blue d-grid mr-5">
                            {{ $totalEmployee }}<span class="f-12 font-weight-normal text-lightest">
                                @lang('modules.dashboard.totalEmployees')
                                <i class="fa fa-question-circle" data-toggle="popover" data-placement="top" data-content="@lang('messages.totalEmoployeeInfo')" data-html="true" data-trigger="hover"></i>
                            </span>
                        </p></a>
                        <a href="javascript:;" class="total-new-employees" data-status="resolved"><p class="mb-0 f-15 font-weight-bold text-dark-green d-grid">
                            {{ $totalNewEmployee }}<span
                                class="f-12 font-weight-normal text-lightest">@lang('modules.dashboard.totalNewEmployee')
                                <i class="fa fa-question-circle" data-toggle="popover" data-placement="top" data-content="@lang('messages.newEmployeeInfo')" data-html="true" data-trigger="hover"></i>
                            </span>
                        </p></a>
                    </div>
                </div>
                <div class="d-block">
                    <i class="fa fa-users text-lightest f-18"></i>
                </div>
            </div>

        </div>
    @endif

    @if (in_array('employees', $modules) && in_array('total_employee_exits', $activeWidgets))
        <div class="col-xl-3 col-lg-6 col-md-6 mb-3">
            <a href="javascript:;" id="total-ex-employees">
                <x-cards.widget :title="__('modules.dashboard.totalEmployeeExits')" :value="$totalEmployeeExits"
                    icon="sign-out-alt" :info="__('messages.employeeExitInfo')" />
            </a>
        </div>
    @endif

    @if (in_array('attendance', $modules) && in_array('total_today_attendance', $activeWidgets))
        <div class="col-xl-3 col-lg-6 col-md-6">
            <a href="{{ route('attendances.index') }}">
                <x-cards.widget :title="__('modules.dashboard.totalTodayAttendance')"
                    :value="$counts->totalTodayAttendance.'/'.$counts->totalEmployees" icon="calendar-check">
                </x-cards.widget>
            </a>
        </div>
    @endif

    @if (in_array('attendance', $modules) && in_array('average_attendance', $activeWidgets))
        <div class="col-xl-3 col-lg-6 col-md-6 mb-3">
            <a href="{{ route('attendances.index') }}">
                <x-cards.widget :title="__('modules.dashboard.averageAttendance')" :value="$averageAttendance"
                    icon="fingerprint" />
            </a>
        </div>
    @endif

</div>

<div class="row">
    @if (in_array('employees', $modules) && in_array('department_wise_employee', $activeWidgets))
        <div class="col-sm-12 col-lg-6 mt-3">
            <x-cards.data :title="__('modules.dashboard.departmentWiseEmployee').' <i class=\'fa fa-question-circle\' data-toggle=\'popover\' data-placement=\'top\' data-content=\''.__('messages.dateFilterNotApplied').'\' data-trigger=\'hover\'></i>'">
                <x-pie-chart id="task-chart1" :labels="$departmentWiseChart['labels']"
                    :values="$departmentWiseChart['values']" :colors="$departmentWiseChart['colors'] ?? null" height="300" width="300" />
            </x-cards.data>
        </div>
    @endif

    @if (in_array('employees', $modules) && in_array('designation_wise_employee', $activeWidgets))
        <div class="col-sm-12 col-lg-6 mt-3">
            <x-cards.data :title="__('modules.dashboard.designationWiseEmployee').' <i class=\'fa fa-question-circle\' data-toggle=\'popover\' data-placement=\'top\' data-content=\''.__('messages.dateFilterNotApplied').'\' data-trigger=\'hover\'></i>'">
                <x-pie-chart id="task-chart2" :labels="$designationWiseChart['labels']"
                    :values="$designationWiseChart['values']" :colors="$designationWiseChart['colors'] ?? null" height="300" width="300" />
            </x-cards.data>
        </div>
    @endif

    @if (in_array('employees', $modules) && in_array('gender_wise_employee', $activeWidgets))
        <div class="col-sm-12 col-lg-6 mt-3">
            <x-cards.data :title="__('modules.dashboard.genderWiseEmployee').' <i class=\'fa fa-question-circle\' data-toggle=\'popover\' data-placement=\'top\' data-content=\''.__('messages.dateFilterNotApplied').'\' data-trigger=\'hover\'></i>'">
                <x-pie-chart id="task-chart3" :labels="$genderWiseChart['labels']" :values="$genderWiseChart['values']"
                    :colors="$genderWiseChart['colors'] ?? null" height="300" width="300" />
            </x-cards.data>
        </div>
    @endif

    @if (in_array('employees', $modules) && in_array('role_wise_employee', $activeWidgets))
        <div class="col-sm-12 col-lg-6 mt-3">
            <x-cards.data :title="__('modules.dashboard.roleWiseEmployee').' <i class=\'fa fa-question-circle\' data-toggle=\'popover\' data-placement=\'top\' data-content=\''.__('messages.dateFilterNotApplied').'\' data-trigger=\'hover\'></i>'">
                <x-pie-chart id="task-chart4" :labels="$roleWiseChart['labels']" :values="$roleWiseChart['values']"
                    :colors="$roleWiseChart['colors'] ?? null" height="300" width="300" />
            </x-cards.data>
        </div>
    @endif

    @if (in_array('leaves', $modules) && in_array('leaves_taken', $activeWidgets))
        <div class="col-sm-12 col-lg-6 mt-3">
            <x-cards.data :title="__('modules.dashboard.leavesTaken')" padding="false" otherClasses="h-200">
                <x-table>
                    @forelse ($leavesTaken as $item)
                        <tr>
                            <td class="pl-20">
                                <x-employee :user="$item" />
                            </td>
                            <td class="pr-20"><span
                                    class="badge badge-light p-2">{{ $item->employeeLeaveCount }}</span></td>
                        </tr>
                    @empty
                        <tr>
                            <td colspan="2" class="shadow-none">
                                <x-cards.no-record icon="plane-departure" :message="__('messages.noRecordFound')" />
                            </td>
                        </tr>
                    @endforelse
                </x-table>
            </x-cards.data>
        </div>
    @endif

    @if (in_array('birthday', $activeWidgets))
        <div class="col-sm-12 col-lg-6 mt-3">
            <x-cards.data :title="__('modules.dashboard.birthday')" padding="false" otherClasses="h-200">
                <x-table>
                    @forelse ($birthdays as $birthday)
                        <tr>
                            <td class="pl-20">
                                <x-employee :user="$birthday->user" />
                            </td>
                            <td class="pr-20"><span
                                    class="badge badge-light p-2">{{ $birthday->date_of_birth->format('d') }} {{ $birthday->date_of_birth->format('M') }}</span></td>
                        </tr>
                    @empty
                        <tr>
                            <td colspan="2" class="shadow-none">
                                <x-cards.no-record icon="birthday-cake" :message="__('messages.noRecordFound')" />
                            </td>
                        </tr>
                    @endforelse
                </x-table>
            </x-cards.data>
        </div>
    @endif

    @if (in_array('attendance', $modules) && in_array('late_attendance_mark', $activeWidgets))
        <div class="col-sm-12 col-lg-6 mt-3">
            <x-cards.data :title="__('modules.dashboard.lateAttendanceMark')" padding="false" otherClasses="h-200">
                <x-table>
                    @forelse ($lateAttendanceMarks as $item)
                        <tr>
                            <td class="pl-20">
                                <x-employee :user="$item" />
                            </td>
                            <td><span
                                    class="badge badge-light p-2">{{ $item->employeeLateCount }}</span></td>
                            <td>
                                <x-forms.button-secondary icon="eye" data-user-id="{{ $item->id }}" class="view-late-attendance">
                                    @lang('app.view')
                                </x-forms.button-secondary>
                            </td>
                        </tr>
                    @empty
                        <tr>
                            <td colspan="2" class="shadow-none">
                                <x-cards.no-record icon="user-clock" :message="__('messages.noRecordFound')" />
                            </td>
                        </tr>
                    @endforelse
                </x-table>
            </x-cards.data>
        </div>
    @endif

</div>

<script>

    $('#save-dashboard-widget').click(function() {
        $.easyAjax({
            url: "{{ route('dashboard.widget', 'admin-hr-dashboard') }}",
            container: '#dashboardWidgetForm',
            blockUI: true,
            type: "POST",
            redirect: true,
            data: $('#dashboardWidgetForm').serialize(),
            success: function() {
                window.location.reload();
            }
        })
    });

    $('body').on('click', '#total-leaves-approved', function() {
        var dateRange = getDateRange();

        var url = `{{ route('leaves.index') }}`;
        string = `?status=approved&start=${dateRange.startDate}&end=${dateRange.endDate}`;
        url += string;

        window.location.href = url;
    });

    $('body').on('click', '.total-new-employees', function() {
        var dateRange = getDateRange();
        var url = `{{ route('employees.index') }}`;

        string = `?startDate=${dateRange.startDate}&endDate=${dateRange.endDate}`;
        url += string;

        window.location.href = url;
    });

    $('body').on('click', '.total-employees', function() {
        var dateRange = getDateRange();
        var url = `{{ route('employees.index') }}`;
        window.location.href = url;
    });

    $('body').on('click', '#total-ex-employees', function() {
        var dateRange = getDateRange();
        var url = `{{ route('employees.index') }}`;

        string = `?status=ex_employee&lastStartDate=${dateRange.startDate}&lastEndDate=${dateRange.endDate}`;
        url += string;

        window.location.href = url;
    });

    $('body').on('click', '.view-late-attendance', function() {
        var empId = $(this).data('user-id');
        var dateRange = getDateRange();
        var url = `{{ route('attendances.index') }}`;

        string = `?employee_id=${empId}&late=yes`;
        url += string;

        window.location.href = url;
    });

    function getDateRange() {
        var dateRange = $('#datatableRange2').data('daterangepicker');
        var startDate = dateRange.startDate.format('{{ global_setting()->moment_date_format }}');
        var endDate = dateRange.endDate.format('{{ global_setting()->moment_date_format }}');

        startDate = encodeURIComponent(startDate);
        endDate = encodeURIComponent(endDate);

        var data = [];
        data['startDate'] = startDate;
        data['endDate'] = endDate;

        return data;
    }

</script>
