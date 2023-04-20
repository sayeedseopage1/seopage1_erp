@extends('layouts.app')

@push('datatable-styles')
    @include('sections.datatable_css')
    <style>
        #chartdiv {
            overflow: scroll;
            width: 100%;
            background-color: #fff;
            position: relative;
        }

        #brandingLogo {
            display: none !important;
        }

        tspan {
            font-size: 14px;
        }

        .no-select() {
            -moz-user-select: none;
            -ms-user-select: none;
            -webkit-user-select: none;
            user-select: none;
        }

        .no-wrap() {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }

        #dragRoot ul {
            display: block;
            margin: 0;
            padding: 0 0 0 20px;
        }

        #dragRoot {
            .no-select();
            cursor: default;
            background-color: #fff;
            width: 100%;
            height: 100%;
        }

        #dragRoot li {
            display: block;
            margin: 2px;
            padding: 2px 2px 2px 0;

            [class*="node"] {
                display: inline-block;

                &.hover {
                    background-color: navy;
                    color: white;
                }
            }

        }

        #dragRoot li li {
            border-left: 1px solid silver;
        }

        #dragRoot li li:before {
            color: silver;
            font-weight: 300;
            content: "— ";
        }

        .node-facility {
            color: navy;
            font-weight: bold;
        }

        .node-cpe {
            color: #000;
            cursor: pointer;
        }

        #drophere li{
            color: rgb(5, 5, 34);
            font-weight:bold;
        }

        #dragRoot ul li > span {
            color:rgb(6, 6, 44);
            padding: 6px;
            letter-spacing: 2px;

        }

        #drophere li > span {
            cursor: default;
        }

        .chartHeading-org{
            background: #fff;
            position: relative;
            padding: 20px;
        }

        .setOpacity{
            opacity: 0;
        }

        .unsetOpacity{
            opacity: 1;
        }

        #resize,#full_view
        {
            cursor: pointer;
        }

        #dragRoot{
            overflow-y: auto;
            overflow-x: hidden;
        }

    </style>
@endpush

@php
$addDepartmentPermission = user()->permission('add_department');
$editDepartmentPermission = user()->permission('edit_department');
@endphp

@section('filter-section')
    <x-filters.filter-box>

        <!-- SEARCH BY TASK START -->
        <div class="task-search d-flex  py-1 pr-lg-3 px-0 border-right-grey align-items-center">
            <form class="w-100 mr-1 mr-lg-0 mr-md-1 ml-md-1 ml-0 ml-lg-0">
                <div class="input-group bg-grey rounded">
                    <div class="input-group-prepend">
                        <span class="input-group-text border-0 bg-additional-grey">
                            <i class="fa fa-search f-13 text-dark-grey"></i>
                        </span>
                    </div>
                    <input type="text" class="form-control f-14 p-1 border-additional-grey" id="search-text-field"
                        placeholder="@lang('modules.department.searchValidation')">
                </div>
            </form>
        </div>
        <!-- SEARCH BY TASK END -->

        <!-- RESET START -->
        <div class="select-box d-flex py-1 px-lg-2 px-md-2 px-0">
            <x-forms.button-secondary class="btn-xs d-none" id="reset-filters" icon="times-circle">
                @lang('app.clearFilters')
            </x-forms.button-secondary>
        </div>
        <!-- RESET END -->
    </x-filters.filter-box>
@endsection

@section('content')
    <!-- CONTENT WRAPPER START -->
    <div class="content-wrapper">

        <!-- Add Task Export Buttons Start -->
        <div class="d-block d-lg-flex d-md-flex justify-content-between action-bar">
            <div id="table-actions" class="flex-grow-1 align-items-center">
                @if ($addDepartmentPermission == 'all' || $addDepartmentPermission == 'added')
                <x-forms.link-primary :link="route('departments.create')" class="mr-3 openRightModal float-left" icon="plus" data-redirect-url="{{ route('department.hierarchy') }}">
                    @lang('app.add') @lang('modules.department.title')
                </x-forms.link-primary>
                @endif
            </div>

            <div class="btn-group" role="group">
                <a href="{{ route('departments.index') }}" class="btn btn-secondary f-14" data-toggle="tooltip"
                data-original-title="@lang('modules.leaves.tableView')"><i class="side-icon bi bi-list-ul"></i></a>

                <a href="{{ route('department.hierarchy') }}" class="btn btn-secondary f-14 btn-active" data-toggle="tooltip"
                    data-original-title="@lang('modules.department.hierarchy')"><i class="bi bi-diagram-3"></i></a>
            </div>
        </div>

        <div class="row">
            <div class="col-12 chart-section">
                <div class="row">
                    <div class="col-md-6" id="chartTree">
                        @include('departments-hierarchy.chart_tree')
                    </div>
                    <div class="col-md-6" id="chartOrganization">
                        @include('departments-hierarchy.chart_organization')
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- CONTENT WRAPPER END -->
@endsection

@push('scripts')
<script>
    var bsTooltip = $.fn.tooltip;
</script>
<script src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.11.4/jquery-ui.min.js" type="text/javascript"></script>
<script>

    // Initialize tooltips
    bsTooltip.call( $( "[data-toggle='tooltip']" ) );
    var editDepartment = <?php echo json_encode($editDepartmentPermission); ?>;

    // Zoom in effect Zoom out effect
    scrHeight = $(window).height();
    scrHeight = scrHeight - 280;

    $('#chartOrganization').css('height', scrHeight);
    $('#chartTree').css('height', scrHeight);

    $(document).on('click', '#full_view', function () {
        $('#chartOrganization').removeClass('col-md-6');
        $('#chartOrganization').addClass('col-md-12');
        $('#chartTree').hide();

        $('#full_view').hide();
        $('#resize').show();
        $screenHeight = $(window).height();
        $screenHeight = $screenHeight - 280;
        $('#chartDiv').css('height', $screenHeight);
    });

    $(document).on('click', '#resize', function () {
        $('#chartOrganization').removeClass('col-md-12');
        $('#chartOrganization').addClass('col-md-6');
        $('#chartTree').show();

        $('#resize').hide();
        $('#full_view').show();
        $('#chartDiv').css('height', '100%');
    });

    // Collapse tree by node

    $(document).on('click', '#dragRoot', function(e) {
        $('#node-ul-'+e.target.id).toggle();
    });

    // On drag reduce the opacity of the node and on drop restore the opacity

    $(document).on('mouseup', 'body', function(e) {
        $('.node-cpe').addClass('unsetOpacity');
        setTimeout(() => {
            $('.node-cpe').removeClass('setOpacity');
        }, 100);
    });

    // initialize draggable
    var DragAndDrop = (function(DragAndDrop) {

        function shouldAcceptDrop(item) {
            $('.node-cpe').removeClass('unsetOpacity');
            item[0].classList.add('setOpacity');
            var $target = $(this).closest("li");
            var $item = item.closest("li");

            if ($.contains($item[0], $target[0])) {
                // can't drop on one of your children!
                return false;
            }

            return true;
        }

        function itemOver(event, ui) {}

        function itemOut(event, ui) {}

        function itemDropped(event, ui) {

            var parent_id  = event.target.id;

            if (parent_id == 'NewNode') {
                var checkExits = setInterval(() => {
                    if ($('#node-ul-NewNode').length) {
                        $('#node-ul-NewNode').children('li').each(function() {
                            $newParent = $(this).val();
                        });

                        $.ajax({
                            url: "{{ route('department.changeParent') }}",
                            type: "POST",
                            data: {
                                "_token": "{{ csrf_token() }}",
                                "newParent": $newParent,
                            },
                            success: function(data) {
                                if(data.status == 'success')
                                {
                                    getToPreState = data.html;
                                    $('#chartTree').html(data.html);
                                    $('#chartOrganization').html(data.organizational);
                                    $(function() { DragAndDrop.enable("#dragRoot"); });
                                }
                            }
                        });

                        clearInterval(checkExits)
                    }
                }, 500);
            }

            var $target = $(this).closest("li");
            var $item = ui.draggable.closest("li");
            var $srcUL = $item.parent("ul");
            var $dstUL = $target.children("ul").first();

            // destination may not have a UL yet
            if ($dstUL.length == 0) {
                $dstUL = $("<ul id='node-ul-"+parent_id+"'></ul>");
                $target.append($dstUL);
            }

            $item.slideUp(50, function() {
                $dstUL.append($item);

                if ($srcUL.children("li").length == 0) {
                    $srcUL.remove();
                }

                $item.slideDown(50, function() {
                    $item.css('display', '');
                });

            });

            var checkElementExits = setInterval(() => {
                var values = [];

                if(parent_id == 'NewNode') {
                    clearInterval(checkElementExits);
                }

                if ($('#node-ul-'+parent_id).length && parent_id != 'NewNode') {
                    $('#node-ul-'+parent_id).children('li').each(function() {
                        values.push($(this).val());
                    });

                    // save the values in department table
                    $.ajax({
                        url: "{{ route('department.changeParent') }}",
                        type: "POST",
                        blockUI: true,
                        container: "#chartOrganization",
                        data: {
                            "_token": "{{ csrf_token() }}",
                            "values": values,
                            "parent_id": parent_id
                        },
                        success: function(data) {
                            if(data.status == 'success')
                            {
                                getToPreState = data.html;
                                $('#chartTree').html(data.html);
                                $('#chartOrganization').html(data.organizational);
                                $(function() { DragAndDrop.enable("#dragRoot"); });
                            }
                        }
                    });

                    clearInterval(checkElementExits);
                }
            }, 500);

        }

        DragAndDrop.enable = function(selector) {
            $(selector).find(".node-cpe").draggable({
                helper: "clone"
            });

            $(selector).find(".node-cpe, .node-facility").droppable({
                activeClass: "active",
                hoverClass: "hover",
                accept: shouldAcceptDrop,
                over: itemOver,
                out: itemOut,
                drop: itemDropped,
                greedy: true,
                tolerance: "pointer"
            });

        };

        return DragAndDrop;
    })(DragAndDrop || {});

    if (editDepartment == 'none') {
        $('.node-cpe').css('cursor', 'default');
    }
    else{
        $(function() {
            DragAndDrop.enable("#dragRoot");
        });
    }

    $('#search-text-field').on('change keyup', function() {
        if ($('#search-text-field').val() != "") {
            $('#reset-filters').removeClass('d-none');
            searchText();
        }else{
        resetFilter();
        }
    })

    $('#reset-filters').click(function() {
        resetFilter();
    });
    function resetFilter() {
        $('#filter-form')[0].reset();
        $('#reset-filters').addClass('d-none');
        searchText();
    }

    function searchText() {
        var searchText = $('#search-text-field').val();
        const url = "{{ route('departments.search') }}";

        $.easyAjax({
            url: url,
            container: '#search-departments',
            type: "GET",
            data: {
                searchText: searchText,
            },
            success: function(data) {
                if(data.status == 'success')
                {
                    $('#chartTree').html(data.html);
                    $('#chartOrganization').html(data.organizational);
                    $(function() { DragAndDrop.enable("#dragRoot"); });
                }
            }
        });
    }
</script>
@endpush
