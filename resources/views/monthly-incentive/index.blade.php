@extends('layouts.app')

@section('content')
    <div class="row mx-0">
        <div class="col-12">
            <div class="card">
                <div class="card-header">
                    <div class="card-title">Incentive Lists</div>
                </div>
                <div class="card-body">
                    <div class="table-responsive">
                        <table class="table">
                            <thead>
                                <th>#</th>
                                <th>User</th>
                                <th>Point</th>
                                <th>Incentive Amount</th>
                                <th>Point Deduction</th>
                                <th>Incentive Deduction</th>
                                <th>Achieve Goal</th>
                                <th>Action</th>
                            </thead>
                            <tbody>
                                @forelse($user_incentive as $value)
                                <tr>
                                    <td>{{$value->id}}</td>
                                    <td>
                                        <a href="{{route('employees.show', $value->user_id)}}">{{$value->user->name}}</a>
                                    </td>
                                    <td>{{$value->point_earned}}</td>
                                    <td>{{$value->incentive_earned}} BDT</td>
                                    <td>{{$value->deduction_amount}}</td>
                                    <td>{{$value->deduction_incentive_amount}} BDT</td>
                                    <td>{{$value->achieve_goal}}</td>
                                    <td>
                                        <a class="text-primary f-20 mx-1" href="{{route('monthly-incentive.show', $value->id)}}">
                                            <i class="fa fa-eye"></i>
                                        </a>
                                        {{-- <a class="text-warning f-20 mx-1" href="{{route('monthly-incentive.edit', $value->id)}}">
                                            <i class="fa fa-eye"></i>
                                        </a> --}}
                                        {{-- <a class="text-danger f-20 mx-1" href="{{route('monthly-incentive.destroy', $value->id)}}">
                                            <i class="fa fa-trash"></i>
                                        </a> --}}
                                    </td>
                                </tr>
                                @empty
                                <tr>
                                    <td colspan="7" class="text-center">
                                        <p class="badge badge-danger">No data</p>
                                    </td>
                                </tr>
                                @endforelse
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection
