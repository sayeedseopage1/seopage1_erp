@extends('layouts.app')
@section('content')
    <div class="container-fluid">
        <div class="row">
            <div class="col-md-12">
                <button type="button" class="btn-primary rounded f-14 mt-5" data-toggle="modal" data-target="#addwebsitethememodal">
                    <i class="fa fa-plus mr-1"></i>Add Website Theme
                </button>
                @include('projects.modals.addwebsitethememodal')
                <div class="card mt-3">
                    <div class="card-header bg-white border-0 text-capitalize d-flex justify-content-between p-20">
                        <h4 class="f-18 f-w-500 mb-0">Website Theme</h4>
                    </div>
                    <table class="table table-hover">
                        <thead>
                        <tr class="text-center">
                            <th>#</th>
                            <th>Theme Name</th>
                            <th>Theme Url</th>
                            <th>Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        @php
                            $key = $website_themes->currentPage() * $website_themes->perPage() - $website_themes->perPage() + 1;
                        @endphp
                        @foreach($website_themes as $website_theme)
                            <tr class="text-center">
                                <td>{{ $key ++ }}</td>
                                <td> {{$website_theme->theme_name}} </td>
                                <td> {{$website_theme->theme_url}} </td>
                                <td>
                                    <a href="" class="btn btn-primary update_website_theme_form" data-toggle="modal" data-target="#editwebsitethememodal" data-id="{{ $website_theme->id }}" data-name="{{ $website_theme->theme_name }}" data-url="{{ $website_theme->theme_url }}">
                                        <i class="fa fa-edit"></i>
                                    </a>
                                </td>

                            </tr>
                        @endforeach
                        </tbody>
                    </table>
                    <div class="row my-3 ml-3">{{ $website_themes->links() }}</div>
                </div>
            </div>
        </div>
    </div>
    @include('projects.modals.editwebsitethememodal')
@endsection
