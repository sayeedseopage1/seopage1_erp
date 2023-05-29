@extends('layouts.app')
@section('content')
    <div class="container-fluid">
        <div class="row">
            <div class="col-md-12">
                <button type="button" class="btn-primary rounded f-14 mt-5" data-toggle="modal" data-target="#addwebsitetypemodal">
                    <i class="fa fa-plus mr-1"></i>Add Website Type
                </button>
                @include('projects.modals.addwebsitetypemodal')
                <div class="card mt-3">
                    <div class="card-header bg-white border-0 text-capitalize d-flex justify-content-between p-20">
                        <h4 class="f-18 f-w-500 mb-0">Website Type</h4>
                    </div>
                    <table class="table table-hover">
                        <thead>
                        <tr class="text-center">
                            <th>#</th>
                            <th>Name</th>
                            <th>Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        @php
                            $key = $website_types->currentPage() * $website_types->perPage() - $website_types->perPage() + 1;
                        @endphp
                        @foreach($website_types as $website_type)
                            <tr class="text-center">
                                <td>{{ $key ++ }}</td>
                                <td> {{$website_type->website_type}} </td>
                                <td>
                                    <a href="" class="btn btn-primary update_website_type_form" data-toggle="modal" data-target="#editwebsitetypemodal" data-id="{{ $website_type->id }}" data-name="{{ $website_type->website_type }}">
                                        <i class="fa fa-edit"></i>
                                    </a>
                                </td>

                            </tr>
                        @endforeach
                        </tbody>
                    </table>
                    <div class="row my-3 ml-3">{{ $website_types->links() }}</div>
                </div>
            </div>
        </div>
    </div>
    @include('projects.modals.editwebsitetypemodal')
@endsection
