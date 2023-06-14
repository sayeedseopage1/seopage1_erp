<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
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
      //  $this->projects= QualifiedSale::all();
        $this->projects = QualifiedSale::select([
            'qualified_sales.*',
            'converted_by.id as closed_by',
            'converted_by.name as closed_by_name',
            
        ])
        ->leftjoin('deals', 'deals.id', '=', 'qualified_sales.deal_id')
        ->join('users as converted_by', 'converted_by.id', '=', 'deals.added_by')
        ->get();
        //dd($this->projects);
        if($request->mode == 'json')  
        {
            $this->data = QualifiedSale::select([
                'qualified_sales.*',
               
                'converted_by.id as closed_by',
                'converted_by.name as closed_by_name',
                
            ])
            ->leftjoin('deals', 'deals.id', '=', 'qualified_sales.deal_id')
            ->join('users as converted_by', 'converted_by.id', '=', 'deals.added_by')
            ;
            if ($request->project_id != 'null') {
                $this->data = $this->data->where('qualified_sales.project_id', $request->project_id);
            }
            if ($request->client_id != 'null') {
                $this->data = $this->data->where('qualified_sales.client_id', $request->client_id);
            
            }
            if ($request->start_date != 'null') {
                $this->data = $this->data->where(DB::raw('DATE(qualified_sales.created_at)'), '>=', Carbon::parse($request->start_date)->format('Y-m-d'));
            }

            if ($request->end_date != 'null') {
                $this->data = $this->data->where(DB::raw('DATE(qualified_sales.created_at)'), '<=', Carbon::parse($request->end_date)->format('Y-m-d'));
            }

            if ($request->pm_id != 'null') {
                $this->data = $this->data->where('qualified_sales.pm_id', $request->pm_id);
            }
            if ($request->closed_by != 'null') {
                $this->data = $this->data->where('deals.added_by', $request->closed_by);
            }

            if($request->search != 'null') {
                $this->data = $this->data->where('deals.project_name', 'LIKE', '%'.$request->search.'%')
                ->orWhere('qualified_sales.pm_name', 'LIKE', '%'.$request->search.'%')
                ->orWhere('qualified_sales.client_name', 'LIKE', '%'.$request->search.'%')
                
                ;
            }
            return response()->json($this->data->get()->toArray());

        }
   
        // /dd($projects);

        return view('qualified-sales.index',$this->data);
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
        //
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
