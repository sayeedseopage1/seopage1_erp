@extends('layouts.app')
@section('content')
    <div class="container-fluid">
        <div class="row">
            <div class="col-md-12">
                <button type="button" class="btn-primary rounded f-14 mt-5" data-toggle="modal" data-target="#nicheaddmodal">
                    <i class="fa fa-plus mr-1"></i>Add Category
                </button>
                @include('projects.modals.addnichemodal')
                <div class="card mt-3">
                    @php
                        $parent_categories = \App\Models\ProjectNiche::whereNull('parent_category_id')->get();
                    @endphp
                    <div class="card-header bg-white border-0 text-capitalize d-flex justify-content-between p-20">
                        <div class="d-flex flex-column w-25">
                            <label style="margin-bottom: 2px; font-size: 13px; font-weight: bold; color:#999eac; white-space:nowrap;" for="">Select Category</label>
                            <div class="dropdown bootstrap-select form-control select-picker" style="width: 100%; box-shadow: 0 1px 3pxpx rgba(0,0,0,0.1);">
                                <select name="cms_id" id="cms_id" data-live-search="true" class="w-100 form-control select-picker error" data-size="5" onchange="filterSubCategories()">
                                <option value="">--</option>
                                    @foreach($parent_categories as $parent_category)
                                        <option value="{{$parent_category->id}}">{{$parent_category->category_name}}</option>
                                    @endforeach
                                </select>
                            </div>
                        </div>
                        <div class="input-group bg-grey rounded w-25 h-25">
                            <div class="input-group-prepend">
                            <span class="input-group-text bg-additional-grey border">
                                <i class="fa fa-search f-13 text-dark-grey"></i>
                            </span>
                            </div>
                            <input type="text" class="form-control f-14 p-1 border" id="search" placeholder="Start typing to search" autocomplete="off">
                        </div>
                    </div>
                    <table class="table table-hover">
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>Niche Category</th>
                            <th>Parent Category</th>
                            <th>Action</th>
                        </tr>
                        </thead>
                        <tbody id="subcategory-table-body">
                        @php
                            $key = $categories->currentPage() * $categories->perPage() - $categories->perPage() + 1;
                        @endphp
                        @foreach($categories as $category)
                            <tr>
                                <td>{{ $key++ }}</td>
                                <td>
                                    @if($category->parent_category_id)
                                        {{ $category->category_name }} <span style="font-size: 10px;"><i class="fa fa-long-arrow-alt-left mr-1" style="color: #28313c; font-size: 10px;"></i>{{ $category->parent->category_name }}</span>
                                    @else
                                        {{ $category->category_name }}
                                    @endif
                                </td>
                                <td>
                                    @if($category->parent_category_id)
                                        {{ $category->parent->category_name }}
                                    @else
                                        <span>No parent category</span>
                                    @endif
                                </td>
                                <td>
                                    <a href="" class="btn btn-primary update_category_form" data-toggle="modal" data-target="#editnichemodal" data-id="{{ $category->id }}" data-name="{{ $category->category_name }}" data-parent="{{ $category->parent_category_id }}">
                                        <i class="fa fa-edit"></i>
                                    </a>
                                </td>
                            </tr>
                        @endforeach
                        </tbody>
                    </table>
                    <div class="row my-3 ml-3">{{ $categories->links() }}</div>
                </div>
            </div>
        </div>
    </div>
    @include('projects.modals.editnichemodal')
@endsection
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<script>
    function filterSubCategories() {
        // var selectedCategoryId = $('#cms_id').val();
        var searchValue = $('#search').val();

        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            }
        });

        $.ajax({
            url: '{{ route('filter_subcategories') }}',
            method: 'POST',
            data: {
                // category_id: selectedCategoryId,
                search: searchValue
            },
            success: function(res) {
                if (res.status === 400) {
                    $('.table').html('<span class="text-danger" style="margin: 50%;">' + 'Not Found' + '</span>');
                } else {
                    var categories = res.categories.data;

                    var tableHtml = '<table>';

                    tableHtml += '<thead><tr><th>#</th><th>Niche Category</th><th>Parent Category</th><th>Action</th></tr></thead>';

                    tableHtml += '<tbody>';
                    categories?.forEach(function(category) {
                        var parentCategoryName = category.parent_category_name.category_name;
                        tableHtml += '<tr>' +
                            '<td>' + category.id + '</td>' +
                            '<td>' + category.category_name + '</td>' +
                            '<td>' + parentCategoryName + '</td>' +
                            '<td>' +
                            '<a href="" class="btn btn-primary update_category_form" data-toggle="modal" data-target="#editnichemodal" data-id="' + category.id + '" data-name="' + category.category_name + '" data-parent="' + category.parent_category_id + '">' +
                            '<i class="fa fa-edit"></i>' +
                            '</a>' +
                            '</td>' +
                            '</tr>';
                    });
                    tableHtml += '</tbody>';

                    tableHtml += '</table>';

                    $('.table').html(tableHtml);
                }
            }
        });
    }

    $(document).on('keyup', '#search', function(e) {
        e.preventDefault();
        filterSubCategories();
    });
</script>
{{--<script>--}}
{{--    function filterSubCategories() {--}}
{{--        var selectedCategoryId = $("#cms_id").val(); // Get the selected category ID--}}
{{--        var subCategoryTableBody = $("#subcategory-table-body"); // Get the table body element--}}

{{--        // Clear the table body--}}
{{--        subCategoryTableBody.empty();--}}

{{--        // Iterate through each sub-category--}}
{{--        @foreach($categories as $category)--}}
{{--        // Check if the sub-category's parent category matches the selected category--}}
{{--        @if(!$category->parent_category_id)--}}

{{--        @endif--}}

{{--        @if($category->parent_category_id == $parent_category->id)--}}
{{--        // Append the sub-category row to the table body--}}
{{--        subCategoryTableBody.append(`--}}
{{--                    <tr>--}}
{{--                        <td>{{ $key++ }}</td>--}}
{{--                        <td>--}}
{{--                            {{ $category->category_name }}--}}
{{--        <span style="font-size: 10px;">--}}
{{--            <i class="fa fa-long-arrow-alt-left mr-1" style="color: #28313c; font-size: 10px;"></i>--}}
{{--                {{ $parent_category->category_name }}--}}
{{--        </span>--}}
{{--    </td>--}}
{{--    <td>{{ $parent_category->category_name }}</td>--}}
{{--                        <td>--}}
{{--                            <a href="" class="btn btn-primary update_category_form" data-toggle="modal" data-target="#editnichemodal" data-id="{{ $category->id }}" data-name="{{ $category->category_name }}" data-parent="{{ $category->parent_category_id }}">--}}
{{--                                <i class="fa fa-edit"></i>--}}
{{--                            </a>--}}
{{--                        </td>--}}
{{--                    </tr>--}}
{{--                `);--}}
{{--        @endif--}}
{{--        @endforeach--}}
{{--    }--}}
{{--</script>--}}

