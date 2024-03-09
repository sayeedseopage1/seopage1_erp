<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\CashPoint;
use DB;
use Illuminate\Http\Request;
use App\Models\Deal;
use App\Models\Project;
use App\Models\DealStage;
use App\Models\User;
use Auth;
use Carbon\Carbon;
use App\Models\QualifiedSale;


class QualifiedSalesController extends AccountBaseController
{
    public function __construct()
    {
        parent::__construct();
        $this->pageTitle = 'Qualified Sales';
        $this->activeSettingMenu = 'qualified-sales';

    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        if(Auth::user()->role_id == 6 || Auth::user()->role_id == 13){
            abort(403);
        }

        if($request->mode == 'json')
        {
            if(Auth::user()->role_id == 1 || Auth::user()->role_id == 8)
            {
                $this->data = QualifiedSale::select([
                    'qualified_sales.*',

                    'converted_by.id as closed_by',
                    'converted_by.name as closed_by_name',
                    DB::raw('(SELECT SUM(cash_points.points) FROM cash_points WHERE cash_points.project_id = qualified_sales.project_id) as total_points'),
                ])
                ->leftJoin('deals', 'deals.id', '=', 'qualified_sales.deal_id')
                ->join('users as converted_by', 'converted_by.id', '=', 'deals.added_by')
                ;



            }else
            {
                $userId = Auth::id();
        $shiftId = Auth::user()->shift;

        $this->data = QualifiedSale::select([
                'qualified_sales.*',
                'converted_by.id as closed_by',
                'converted_by.name as closed_by_name',
                // DB::raw('SUM(cash_points.points) as total_cash_points_by_user'),
                DB::raw('(SELECT SUM(cash_points.points) FROM cash_points WHERE cash_points.project_id = qualified_sales.project_id AND cash_points.user_id = '.Auth::id().') as total_points'),
                'cash_points.user_id',
            ])
            ->leftJoin('deals', 'deals.id', '=', 'qualified_sales.deal_id')
            ->join('users as converted_by', 'converted_by.id', '=', 'deals.added_by')
            ->leftJoin('cash_points', function ($join) use ($userId, $shiftId) {
                $join->on('cash_points.project_id', '=', 'qualified_sales.project_id')
                    ->whereIn('cash_points.user_id', function ($query) use ($shiftId) {
                        $query->select('id')
                            ->from('users')
                            ->where('shift', '=', $shiftId);
                    });
            })
            //->where('deals.added_by', $userId)
            ->groupBy('qualified_sales.id', 'converted_by.id', 'converted_by.name', 'cash_points.user_id');

            }

            if ($request->project_id != null) {
                $this->data = $this->data->where('qualified_sales.project_id', $request->project_id);
            }
            if ($request->client_id != null) {
                $this->data = $this->data->where('qualified_sales.client_id', $request->client_id);

            }
            if ($request->start_date != null) {
                $this->data = $this->data->where(DB::raw('DATE(qualified_sales.created_at)'), '>=', Carbon::parse($request->start_date)->format('Y-m-d'));
            }

            if ($request->end_date != null) {
                $this->data = $this->data->where(DB::raw('DATE(qualified_sales.created_at)'), '<=', Carbon::parse($request->end_date)->format('Y-m-d'));
            }

            if ($request->pm_id != null) {
                $this->data = $this->data->where('qualified_sales.pm_id', $request->pm_id);
            }
            if ($request->closed_by != null) {
                $this->data = $this->data->where('deals.added_by', $request->closed_by);
            }

            if($request->search != null) {
                $this->data = $this->data->where('deals.project_name', 'LIKE', '%'.$request->search.'%')
                ->orWhere('qualified_sales.pm_name', 'LIKE', '%'.$request->search.'%')
                ->orWhere('qualified_sales.client_name', 'LIKE', '%'.$request->search.'%')

                ;
            }
            if (Auth::user()->role_id == 1 || Auth::user()->role_id == 8) {
                return response()->json($this->data->get()->toArray());
            }else
            {
                return response()->json(
                    $this->data
                        ->groupBy('cash_points.user_id')
                        ->having('cash_points.user_id', Auth::id())
                        ->get()
                        ->toArray()
                );
            }


        }

        // /dd($projects);

        return view('qualified-sales.index',$this->data);
    }
    public function get_point_details($id)
    {
        $qualified_sale = QualifiedSale::where('id', $id)->first();
        $this->userPoints = CashPoint::select('cash_points.user_id','cash_points.project_id as ProjectId', 'users.name', DB::raw('SUM(cash_points.points) as total_points'))
        ->join('users', 'users.id', '=', 'cash_points.user_id')
        ->where('cash_points.points', '>', 0)
        ->where('cash_points.project_id', $qualified_sale->project_id)
       
        ->groupBy('cash_points.user_id', 'users.name')
        ->get();
     //   dd($this->userPoints);
        //->get();
        return response()->json($this->userPoints);

    //    / ->pluck('total_points', 'name');
    //    / dd($userPoints);

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
    public function show($id)
    {

    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
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
