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
                                <th>SL. No</th>
                                <th>Month</th>
                                <th>Name</th>
                                <th>Non Incentive Points</th>
                                <th>Achieved Point</th>
                                <th>Incentive Amount</th>
                                <th>Point Deduction</th>
                                <th>Incentive Deduction</th>
                                <th>Total Goals</th>
                                <th>Achieved Goals</th>
                                <th>Action</th>
                            </thead>
                            <tbody>
                                @php $i = 0; @endphp
                                @forelse($user_incentive as $value)
                                <tr>
                                    <td>{{++$i}}</td>
                                    <td>{{\Carbon\Carbon::parse($value->month)->format('M (Y)')}}</td>
                                    <td>
                                        <a href="{{route('employees.show', $value->user_id)}}">{{$value->user->name}}</a>
                                    </td>
                                    <td>
                                        @php
                                            $non_incentive_point = App\Models\IncentiveSetting::where('start_month', $value->month)->first();
                                        @endphp
                                        {{$non_incentive_point->every_shift_every_point_above}}
                                    </td>
                                    <td>{{$value->point_earned}}</td>
                                    <td>{{$value->incentive_earned}} BDT</td>
                                    <td>{{$value->deduction_amount}}</td>
                                    <td>{{$value->deduction_incentive_amount}} BDT</td>
                                    <td>
                                        @php
                                        $user_goal = App\Models\GoalSetting::where([
                                            'user_id' => $value->user_id,
                                            
                                        ])->get()->count();
                                        $user_in_team = App\Models\Seopage1Team::where('members', 'LIKE', '%'.$value->user_id.'%')->get()->pluck('id');
                                        $user_in_team_goal = App\Models\GoalSetting::whereIn('team_id', $user_in_team)->get()->count();
                                        //dd($user_in_team_goal);
                                        @endphp
                                        {{$value->achieve_goal}}</td>
                                    <td>{{$value->achieve_goal}}</td>
                                    <td>
                                        <a class="text-primary f-20 mx-1" href="{{route('monthly-incentive.download', $value->id)}}">
                                            <i class="fa fa-download"></i>
                                        </a>
                                        <a class="text-dark f-20 mx-1" href="{{route('monthly-incentive.show', $value->id)}}">
                                            <i class="fa fa-eye"></i>
                                        </a>
                                        {{-- <a class="text-danger f-20 mx-1" href="{{route('monthly-incentive.destroy', $value->id)}}">
                                            <i class="fa fa-trash"></i>
                                        </a> --}}
                                    </td>
                                </tr>
                                @empty
                                <tr>
                                    <td colspan="7" class="text-center">
                                        <p class="badge badge-danger">You are not eligible</p>
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
