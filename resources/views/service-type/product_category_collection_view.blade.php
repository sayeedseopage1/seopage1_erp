@extends('layouts.app')
@section('content')
    <div class="container-fluid">
        <div class="row">
            <div class="col-12">
                <div class="card mt-3">
                    <div class="card-body">
                        <table class="table">
                            <thead>
                            <tr class="text-center">
                                <th scope="col">Sl</th>
                                <th scope="col">Id</th>
                                <th scope="col">Milestone</th>
                                <th scope="col">Project Name</th>
                                <th scope="col">Client Name</th>
                                <th scope="col">Service Type</th>
                                <th scope="col">Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            @php
                                $key = $product_categories->currentPage() * $product_categories->perPage() - $product_categories->perPage() + 1;
                            @endphp
                            @foreach($product_categories as $product_category)
                            @php
                                $deal = \App\Models\Deal::where('id',$product_category->deal_id)->first();
                                $milestone = \App\Models\ProjectMilestone::where('id',$product_category->milestone_id)->first();
                            @endphp
                            <tr class="text-center">
                                <th>{{$key++}}</th>
                                <td>
                                    @if ($product_category->random_id)
                                        {{$product_category->random_id}}
                                    @else
                                        --
                                    @endif
                                </td>
                                <td>
                                    @if ($milestone !=null)
                                        {{$milestone->milestone_title}}
                                    @else
                                        --
                                    @endif
                                </td>
                                <td>
                                    @if ($deal->project_name)
                                    {{$deal->project_name}}
                                    @else
                                        --
                                    @endif
                                </td>
                                <td>
                                    @if ($deal->client_name)
                                    {{$deal->client_name}}
                                    @else
                                        --
                                    @endif
                                </td>
                                <td>
                                    @if ($product_category->service_type)
                                    {{$product_category->service_type}}
                                    @else
                                        --
                                    @endif
                                </td>
                                <td>
                                    <a href="{{route('EditProductCategory',$product_category->id)}}"><i class="fa fa-eye"></i></a>
                                </td>
                            </tr>
                            @endforeach
                            </tbody>
                        </table>
                        <div class="row my-3 ml-3">{{ $product_categories->links() }}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection
