@extends('layouts.app')
@section('content')
    <div class="container">
        @php
            $categories = \App\Models\ProjectNiche::all();
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
                            <th>Category</th>
                            <th>Sub Category</th>
                            <th>Parent Category</th>
                            <th class="text-center">Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        @foreach($categories as $key=>$category)
                        <tr>
                            <td>{{ $key + 1 }}</td>
                            <td>{{$category->category_name}}</td>
                            <td>
                                @if($category->sub_category_id)
                                    {{$category->subcat->category_name}}
                                @else
                                    !! No Sub Category !!
                                @endif
                            </td>
                            <td>
                                {{$category->parent->category_name ?? '!! No Parent Category !!'}}
                            </td>
                            <td class="text-center">
                                <a href="" class="update_category_form btn-sm" data-bs-toggle="modal" data-bs-target="#editModal" data-id="0" data-name="0"  data-price="0">
                                    <i class="fa fa-edit"></i>
                                </a>
                                <a href="" class="delete_category text-secondary" data-id="0">
                                    <i class="fa fa-trash"></i>
                                </a>
                            </td>
                        </tr>
                        @endforeach
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
@endsection
