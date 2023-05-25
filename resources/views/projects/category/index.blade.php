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
                    <div class="card-header bg-white border-0 text-capitalize d-flex justify-content-between p-20">
                        <h4 class="f-18 f-w-500 mb-0">Categories</h4>
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
                        <tbody>
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
