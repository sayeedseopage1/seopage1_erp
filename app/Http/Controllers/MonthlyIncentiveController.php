<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\UserIncentive;
use App\Models\Seopage1Team;
use App\Models\CashPoint;
use App\Models\GoalSetting;
use App\Models\IncentiveSetting;
use Illuminate\Http\Request;
use Carbon\Carbon;
use Auth;
use App\DataTables\MonthlyIncentiveDataTable;

class MonthlyIncentiveController extends AccountBaseController
{
    public function __construct()
    {
        parent::__construct();
        $this->pageTitle = 'Monthly Incentive';
        $this->activeSettingMenu = 'monthly-incentive';

    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(MonthlyIncentiveDataTable $dataTable)
    {
        $this->users = User::where('role_id', 7)->orWhere('role_id', 8)->orWhere('role_id', 11)->orWhere('role_id',12)->get();
        
        $this->currentYear = now()->format('Y');
        $this->currentMonth = now()->month;

        /* year range from last 5 year to next year */
        $years = [];
        $latestFifthYear = (int)Carbon::now()->subYears(5)->format('Y');
        $nextYear = (int)Carbon::now()->addYear()->format('Y');

        for ($i = $latestFifthYear; $i <= $nextYear; $i++) {
            $years[] = $i;
        }

        $this->years = $years;

        /* months */
        $this->months = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];
        // if (Auth::user()->role_id == 1) {
        //     $this->user_incentive = UserIncentive::where([
        //         // ['point_earned' , '>', 0],
        //         'status' => '0'
        //     ])->orderBy('id', 'desc')->get();
        // } else {
        //     $this->user_incentive = UserIncentive::where([
        //         // ['point_earned' , '>', 0],
        //         'status' => '0'
        //     ])->orderBy('id', 'desc')->where('user_id',Auth::id())->get();
        // }

        // foreach ($this->user_incentive as $value) {
        //     $shift = Seopage1Team::where('members', 'LIKE', '%'.$value->user_id.'%')->where('id', '!=', 1)->get()->pluck('id');

        //     $value->shift_point = CashPoint::whereIn('user_id', $shift)
        //     ->whereDate('created_at', '>=', Carbon::parse($value->month)->startOfMonth())
        //     ->whereDate('created_at', '<=', Carbon::parse($value->month)->endOfMonth())
        //     ->sum('points');

        //     $value->minimum_goal = GoalSetting::where([
        //         'goalType' => 'Minimum',
        //     ])->whereIn('team_id', $shift)
        //     ->whereDate('startDate', '>=', $value->month)
        //     ->whereDate('endDate', '<=', \Carbon\Carbon::parse($value->month)->endOfMonth()->format('Y-m-d'))
        //     ->get()
        //     ->count();

        //     $value->minimum_goal_achieved = GoalSetting::where([
        //         'goalType' => 'Minimum',
        //         'goal_status' => 1
        //     ])->whereIn('team_id', $shift)
        //     ->whereDate('startDate', '>=', $value->month)
        //     ->whereDate('endDate', '<=', \Carbon\Carbon::parse($value->month)->endOfMonth()->format('Y-m-d'))
        //     ->get()
        //     ->count();

        //     $value->milestone_goal = GoalSetting::where([
        //         'goalType' => 'Milestone',
        //     ])->whereIn('team_id', $shift)
        //     ->whereDate('startDate', '>=', $value->month)
        //     ->whereDate('endDate', '<=', \Carbon\Carbon::parse($value->month)->endOfMonth()->format('Y-m-d'))
        //     ->get()
        //     ->count();

        //     $value->milestone_goal_achieved = GoalSetting::where([
        //         'goalType' => 'Milestone',
        //         'goal_status' => 1
        //     ])->whereIn('team_id', $shift)
        //     ->whereDate('startDate', '>=', $value->month)
        //     ->whereDate('endDate', '<=', \Carbon\Carbon::parse($value->month)->endOfMonth()->format('Y-m-d'))
        //     ->get()
        //     ->count();

        //     $team_shift = Seopage1Team::where('members', 'LIKE', '%'.$value->user_id.'%')->get()->pluck('id');

        //     $value->team_goal = GoalSetting::whereIn('team_id', [1])
        //     ->whereDate('startDate', '>=', $value->month)
        //     ->whereDate('endDate', '<=', \Carbon\Carbon::parse($value->month)->endOfMonth()->format('Y-m-d'))
        //     ->get()
        //     ->count();


        //     $value->team_goal_achieved = GoalSetting::whereIn('team_id', $team_shift)
        //     ->whereDate('startDate', '>=', $value->month)
        //     ->whereDate('endDate', '<=', \Carbon\Carbon::parse($value->month)->endOfMonth()->format('Y-m-d'))
        //     ->get()
        //     ->count();

        //     $value->team_goal_achieved_last = GoalSetting::where('goal_status', 1)
        //     ->whereIn('team_id', $team_shift)
        //     ->whereDate('startDate', '>=', $value->month)
        //     ->whereDate('endDate', '<=', \Carbon\Carbon::parse($value->month)->endOfMonth()->format('Y-m-d'))
        //     ->get()
        //     ->count();

        // }

        // return view('monthly-incentive.index', $this->data);
        return $dataTable->render('monthly-incentive.index',$this->data);
    }

    public function get_index_json()
    {
        $user_incentive = UserIncentive::with('user')->where([
            ['point_earned' , '>', 0],
            'status' => '0'
        ])->orderBy('id', 'desc')->get();
        //dd('ok');
        return response()->json($user_incentive);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function download($id)
    {
        $data = UserIncentive::findOrfail($id);
        $user = User::findOrfail($data->user_id);

        $pdf = app('dompdf.wrapper');
        $pdf->getDomPDF()->set_option('enable_php', true);
        //return view('monthly-incentive.incentive_pdf', compact('data'));
        $pdf->loadView('monthly-incentive.incentive_pdf', compact('data'));
        return $pdf->download('Monthly_Incentive_'.Carbon::now()->subMonth(1)->format('Y-m-d').'-'.$user->name.'.pdf');
        $dom_pdf = $pdf->getDomPDF();
        $canvas = $dom_pdf->getCanvas();
        $canvas->page_text(530, 820, 'Page {PAGE_NUM} of {PAGE_COUNT}', null, 10);

        $pdfString = $dom_pdf->output();

        return response($pdfString)->header('Content-Type', 'application/pdf');
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $this->user_incentive = UserIncentive::findOrfail($id);
        $this->non_incentive_point = IncentiveSetting::where('start_month', $this->user_incentive->month)->first();

        return view('monthly-incentive.show', $this->data);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
