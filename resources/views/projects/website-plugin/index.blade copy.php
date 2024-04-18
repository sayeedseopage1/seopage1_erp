@extends('layouts.app')
@section('content')
    <div class="container-fluid">
        <div class="row">
            <div class="col-md-12">
                <button type="button" class="btn-primary rounded f-14 mt-5" data-toggle="modal" data-target="#addwebsitepluginmodal">
                    <i class="fa fa-plus mr-1"></i>Add Website Plugin
                </button>
                @include('projects.modals.addwebsitepluginmodal')
                <div class="card mt-3">
                    <div class="card-header bg-white border-0 text-capitalize d-flex justify-content-between p-20">
                        <h4 class="f-18 f-w-500 mb-0">Website Plugin</h4>
                    </div>
                    <table class="table table-hover">
                        <thead>
                        <tr class="text-center">
                            <th>#</th>
                            <th>Plugin Name</th>
                            <th>Plugin Url</th>
                            <th>Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        @php
                            $key = $website_plugins->currentPage() * $website_plugins->perPage() - $website_plugins->perPage() + 1;
                        @endphp
                        @foreach($website_plugins as $website_plugin)
                            <tr class="text-center">
                                <td>{{ $key ++ }}</td>
                                <td> {{$website_plugin->plugin_name}} </td>
                                <td> {{$website_plugin->plugin_url}} </td>
                                <td>
                                    <a href="" class="btn btn-primary update_website_plugin_form" data-toggle="modal" data-target="#editwebsitepluginmodal" data-id="{{ $website_plugin->id }}" data-name="{{ $website_plugin->plugin_name }}" data-url="{{ $website_plugin->plugin_url }}">
                                        <i class="fa fa-edit"></i>
                                    </a>
                                </td>

                            </tr>
                        @endforeach
                        </tbody>
                    </table>
                    <div class="row my-3 ml-3">{{ $website_plugins->links() }}</div>
                </div>
            </div>
        </div>
    </div>
    @include('projects.modals.editwebsitepluginmodal')
@endsection
