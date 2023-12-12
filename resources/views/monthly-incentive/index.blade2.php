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
                                <th>Shift's Achieved Point</th>
                                <th>Shift's Incentive Achievable Point</th>
                                <th>User Contribution</th>
                                <th>User's Achieved Point</th>
                                {{-- <th>Incentive Deduction</th> --}}
                                <th>Amount Before Deduction</th>
                                <th>User's Deducted Point</th>
                                <th>User's Point's After Deduction</th>
                                <th>Amount After Deduction</th>
                                <th>Deducted Incentive Amount</th>
                                <th>Incentive Amount After 20% Held</th>
                                <th>Incentive Held Amount</th>
                                <th>Final Payable Incentive Amount</th>
                                <th>Minimum Shift Goal</th>
                                <th>Minimum Shift Goal Achieved</th>
                                <th>Shift Milestone</th>
                                <th>Shift Milestone Achieved</th>
                                <th>Total Team Goal</th>
                                <th>Team Goal Achieved</th>
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
                                    <td>{{$value->shift_achieved_points}}</td>
                                    <td>{{$value->shift_incentive_achievable_point}}</td>
                                    <td>{{$value->contribution}}%</td>
                                    <td>{{$value->user_achieved_points}}</td>
                                    <td>{{$value->amount_before_deduction}}</td>
                                    
                                    <td>{{$value->user_deducted_points}}</td>
                                    <td>{{$value->user_point_after_deduction}}</td>
                                    <td>{{$value->amount_after_deduction}} BDT</td>
                                    <td>{{$value->deducted_incentive_amount}} BDT</td>
                                    <td>{{$value->incentive_amount_after_20_percent_held}} BDT</td>
                                    <td>{{$value->incentive_held_amount}} BDT</td>
                                    <td>{{$value->final_payable_incentive_amount}} BDT</td>
                                    <td>{{$value->minimum_shift_goals}}</td>
                                    <td>{{$value->minimum_shift_goals_achieved}}</td>
                                    <td>{{$value->milestone_goals}}</td>
                                    <td>{{$value->milestone_goals_achieved}}</td>
                                    <td>{{$value->team_goal}}</td>
                                    <td>{{$value->total_team_goal_achieved}}</td>
                                    <td>{{$value->total_goals}}</td>
                                    <td>{{$value->total_goals_achieved}}</td>

                                    {{-- <td>{{$value->deduction_incentive_amount}} BDT</td> --}}
                                
                                    <td>
                                        <div class="task_view">
                                            <div class="dropdown">
                                                <a class="task_view_more d-flex align-items-center justify-content-center dropdown-toggle" type="link"
                                                    id="dropdownMenuLink-{{ $value->id }}" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                    <i class="icon-options-vertical icons"></i>
                                                </a>
                                                <div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuLink-{{ $value->id }}" tabindex="0">
                                                    <a class="dropdown-item text-primary mx-1" href="{{route('monthly-incentive.download', $value->id)}}">
                                                        <i class="fa fa-download mr-2"></i>Download
                                                    </a>
                                                    <a class="dropdown-item text-dark mx-1" href="{{route('monthly-incentive.show', $value->id)}}">
                                                        <i class="fa fa-eye mr-2"></i>View
                                                    </a>
                                                </div>
                                            </div>
                                        </div>

                                        {{-- <a class="text-primary f-20 mx-1" href="{{route('monthly-incentive.download', $value->id)}}">
                                            <i class="fa fa-download"></i>
                                        </a>
                                        <a class="text-dark f-20 mx-1" href="{{route('monthly-incentive.show', $value->id)}}">
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
