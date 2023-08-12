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
                                $key = $web_contents->currentPage() * $web_contents->perPage() - $web_contents->perPage() + 1;
                            @endphp
                            @foreach($web_contents as $web_content)
                            @php
                                $deal = \App\Models\Deal::where('id',$web_content->deal_id)->first();
                                $milestone = \App\Models\ProjectMilestone::where('id',$web_content->milestone_id)->first();
                            @endphp
                            <tr class="text-center">
                                <th>{{$key++}}</th>
                                <td>
                                    @if ($web_content->random_id)
                                        {{$web_content->random_id}}
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
                                    @if ($web_content->service_type)
                                    {{$web_content->service_type}}
                                    @else
                                        --
                                    @endif
                                </td>
                                <td>
                                    <a href="{{route('EditWebContent',$web_content->id)}}"><i class="fa fa-eye"></i></a>
                                </td>
                            </tr>
                            @endforeach
                            </tbody>
                        </table>
                        <div class="row my-3 ml-3">{{ $web_contents->links() }}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection
@push('script')
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
@endpush
