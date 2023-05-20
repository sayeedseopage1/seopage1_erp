@extends('layouts.app')
@section('content')
    <div class="container-fluid">
        @php
            $categories = \App\Models\ProjectNiche::with('parent','child')->get();
        @endphp
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
{{--                            <th>Sub Category</th>--}}
                            <th>Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        @foreach($categories as $key=>$category)
                        <tr>
                            <td>{{ $key + 1 }}</td>
                            <td>
                                @if($category->parent_category_id)
                                    {{$category->category_name}} <span style="font-size: 10px;"><i class="fa fa-long-arrow-alt-left mr-1" style="color: #28313c; font-size: 10px;"></i>{{$category->parent->category_name}}</span>
                                @else
                                    {{$category->category_name}}
                                @endif
                            </td>
                            <td>
                                @if($category->parent_category_id)
                                    {{$category->parent->category_name}}
                                @else
                                <span>No parent category</span>
                                @endif
                            </td>
{{--                            <td>{{$category->child ? $category->child->category_name: 'No sub category' }}</td>--}}
                            <td>
                                <a href="" class="btn btn-primary update_category_form" data-toggle="modal" data-target="#editnichemodal" data-id="{{ $category->id }}" data-name="{{ $category->category_name }}" data-parent="{{$category->parent_category_id}}">
                                    <i class="fa fa-edit"></i>
                                </a>
                            </td>

                        </tr>
                        @endforeach
                        </tbody>
                        @include('projects.modals.editnichemodal')
                    </table>
                </div>
            </div>
        </div>
    </div>
@endsection
