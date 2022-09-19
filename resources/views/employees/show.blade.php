@extends('layouts.app')

@push('datatable-styles')
    @include('sections.datatable_css')
@endpush

@php
$viewEmployeeTasks = user()->permission('view_employee_tasks');
$viewTickets = user()->permission('view_tickets');
$viewEmployeeProjects = user()->permission('view_employee_projects');
$viewEmployeeTimelogs = user()->permission('view_employee_timelogs');
$manageEmergencyContact = user()->permission('manage_emergency_contact');
$manageRolePermissionSetting = user()->permission('manage_role_permission_setting');
$manageShiftPermission = user()->permission('view_shift_roster');
$viewLeavePermission = user()->permission('view_leave');
$viewDocumentPermission = user()->permission('view_documents');
@endphp

@php

$showFullProfile = false;

if ($viewPermission == 'all'
    || ($viewPermission == 'added' && $employee->employeeDetail->added_by == user()->id)
    || ($viewPermission == 'owned' && $employee->employeeDetail->user_id == user()->id)
    || ($viewPermission == 'both' && ($employee->employeeDetail->user_id == user()->id || $employee->employeeDetail->added_by == user()->id))
) {
    $showFullProfile = true;
}
    
@endphp

@section('filter-section')
    <!-- FILTER START -->
    <!-- PROJECT HEADER START -->

    <div class="d-flex d-lg-block filter-box project-header bg-white">
        <div class="mobile-close-overlay w-100 h-100" id="close-client-overlay"></div>

        <div class="project-menu" id="mob-client-detail">
            <a class="d-none close-it" href="javascript:;" id="close-client-detail">
                <i class="fa fa-times"></i>
            </a>

            <nav class="tabs">
                <ul class="-primary">
                    <li>
                        <x-tab :href="route('employees.show', $employee->id)" :text="__('modules.employees.profile')" class="profile" />
                    </li>                        

                    @if ($viewEmployeeProjects == 'all' && in_array('projects', user_modules()))
                        <li>
                            <x-tab :href="route('employees.show', $employee->id) . '?tab=projects'" :text="__('app.menu.projects')" ajax="false" class="projects" />
                        </li>
                    @endif

                    @if ($viewEmployeeTasks == 'all' && in_array('tasks', user_modules()))
                        <li>
                            <x-tab :href="route('employees.show', $employee->id) . '?tab=tasks'" :text="__('app.menu.tasks')" ajax="false" class="tasks" />
                        </li>
                    @endif

                    @if (in_array('leaves', user_modules()) && ($viewLeavePermission == 'all' || ($viewLeavePermission == 'owned' || $viewLeavePermission == 'both') && $employee->id == user()->id ))
                        <li>
                            <x-tab :href="route('employees.show', $employee->id) . '?tab=leaves'" :text="__('app.menu.leaves')" ajax="false" class="leaves" />
                        </li>

                    <li>
                        <x-tab :href="route('employees.show', $employee->id) . '?tab=leaves-quota'" :text="__('app.menu.leavesQuota')" class="leaves-quota" />
                    </li>
                    @endif

                    @if ($viewEmployeeTimelogs == 'all')
                        <li>
                            <x-tab :href="route('employees.show', $employee->id) . '?tab=timelogs'" :text="__('app.menu.timeLogs')" ajax="false" class="timelogs" />
                        </li>
                    @endif

                    @if ($viewDocumentPermission == 'all')
                        <li>
                            <x-tab :href="route('employees.show', $employee->id) . '?tab=documents'" :text="__('app.menu.documents')" class="documents" />
                        </li>
                    @endif

                    @if ($showFullProfile && ($manageEmergencyContact == 'all' || $employee->id == user()->id))
                        <li>
                            <x-tab :href="route('employees.show', $employee->id) . '?tab=emergency-contacts'" :text="__('modules.emergencyContact.emergencyContact')" class="emergency-contacts" />
                        </li>
                    @endif

                    @if ($viewTickets == 'all')
                        <li>
                            <x-tab :href="route('employees.show', $employee->id) . '?tab=tickets'" :text="__('modules.tickets.ticket')" ajax="false" class="tickets" />
                        </li>
                    @endif

                    @if ($manageShiftPermission == 'all')
                        <li>
                            <x-tab :href="route('employees.show', $employee->id) . '?tab=shifts'" :text="__('app.menu.shiftRoster')" class="shifts" />
                        </li>
                    @endif

                    @if ($manageRolePermissionSetting == 'all')
                        <li>
                            <x-tab :href="route('employees.show', $employee->id) . '?tab=permissions'" :text="__('modules.permission.permissions')" class="permissions" />
                        </li>
                    @endif
                </ul>
            </nav>
        </div>

        <a class="mb-0 d-block d-lg-none text-dark-grey ml-auto mr-2 border-left-grey" onclick="openClientDetailSidebar()"><i class="fa fa-ellipsis-v "></i></a>
    </div>

    <!-- PROJECT HEADER END -->
@endsection

@section('content')
    <div class="content-wrapper pt-0 border-top-0 client-detail-wrapper">
        @include($view)
    </div>
@endsection

@push('scripts')
    <script>
        $("body").on("click", ".project-menu .ajax-tab", function(event) {
            event.preventDefault();

            $('.project-menu .p-sub-menu').removeClass('active');
            $(this).addClass('active');

            const requestUrl = this.href;

            $.easyAjax({
                url: requestUrl,
                blockUI: true,
                container: ".content-wrapper",
                historyPush: true,
                success: function(response) {
                    if (response.status == "success") {
                        $('.content-wrapper').html(response.html);
                        init('.content-wrapper');
                    }
                }
            });
        });

    </script>
    <script>
        const activeTab = "{{ $activeTab }}";
        $('.project-menu .' + activeTab).addClass('active');

    </script>
    <script>
        /*******************************************************
                 More btn in projects menu Start
        *******************************************************/

        const container = document.querySelector('.tabs');
        const primary = container.querySelector('.-primary');
        const primaryItems = container.querySelectorAll('.-primary > li:not(.-more)');
        container.classList.add('--jsfied'); // insert "more" button and duplicate the list

        primary.insertAdjacentHTML('beforeend', `
        <li class="-more">
            <button type="button" class="px-4 h-100 bg-grey d-none d-lg-flex align-items-center" aria-haspopup="true" aria-expanded="false">
            {{__('app.more')}} <span>&darr;</span>
            </button>
            <ul class="-secondary" id="hide-project-menues">
            ${primary.innerHTML}
            </ul>
        </li>
        `);
        const secondary = container.querySelector('.-secondary');
        const secondaryItems = secondary.querySelectorAll('li');
        const allItems = container.querySelectorAll('li');
        const moreLi = primary.querySelector('.-more');
        const moreBtn = moreLi.querySelector('button');
        moreBtn.addEventListener('click', e => {
            e.preventDefault();
            container.classList.toggle('--show-secondary');
            moreBtn.setAttribute('aria-expanded', container.classList.contains('--show-secondary'));
        }); // adapt tabs

        const doAdapt = () => {
            // reveal all items for the calculation
            allItems.forEach(item => {
                item.classList.remove('--hidden');
            }); // hide items that won't fit in the Primary

            let stopWidth = moreBtn.offsetWidth;
            let hiddenItems = [];
            const primaryWidth = primary.offsetWidth;
            primaryItems.forEach((item, i) => {
                if (primaryWidth >= stopWidth + item.offsetWidth) {
                    stopWidth += item.offsetWidth;
                } else {
                    item.classList.add('--hidden');
                    hiddenItems.push(i);
                }
            }); // toggle the visibility of More button and items in Secondary

            if (!hiddenItems.length) {
                moreLi.classList.add('--hidden');
                container.classList.remove('--show-secondary');
                moreBtn.setAttribute('aria-expanded', false);
            } else {
                secondaryItems.forEach((item, i) => {
                    if (!hiddenItems.includes(i)) {
                        item.classList.add('--hidden');
                    }
                });
            }
        };

        doAdapt(); // adapt immediately on load

        window.addEventListener('resize', doAdapt); // adapt on window resize
        // hide Secondary on the outside click

        document.addEventListener('click', e => {
            let el = e.target;

            while (el) {
                if (el === secondary || el === moreBtn) {
                    return;
                }

                el = el.parentNode;
            }

            container.classList.remove('--show-secondary');
            moreBtn.setAttribute('aria-expanded', false);
        });
        /*******************************************************
                 More btn in projects menu End
        *******************************************************/
    </script>
@endpush
