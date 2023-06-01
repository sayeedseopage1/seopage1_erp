<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\UserIncentive;
use Illuminate\Http\Request;
use Auth;

class MonthlyIncentiveController extends AccountBaseController
{
    public function __construct()
    {
        parent::__construct();
        $this->pageTitle = 'Monthly Incentive';
        $this->activeSettingMenu = 'monthly-incentive';
        $this->middleware(function ($request, $next) {
            abort_403(user()->permission('manage_company_setting') !== 'all');
            return $next($request);
        });
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    { 
        if(Auth::user()->role_id == 1)
        {
            $this->user_incentive = UserIncentive::where([
                ['point_earned' , '>', 0],
                'status' => '0'
            ])->orderBy('id', 'desc')->get();
            return view('monthly-incentive.index', $this->data);

        }else 
        {
            $this->user_incentive = UserIncentive::where([
                ['point_earned' , '>', 0],
                'status' => '0'
            ])->orderBy('id', 'desc')->where('user_id',Auth::id())->get();
            return view('monthly-incentive.index', $this->data);

        }
        
       
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
    public function show($id)
    {
        $data = UserIncentive::findOrfail($id);

        $pdf = app('dompdf.wrapper');
        $pdf->getDomPDF()->set_option('enable_php', true);
        //return view('monthly-incentive.incentive_pdf', compact('data'));
        $pdf->loadView('monthly-incentive.incentive_pdf', compact('data'));
        return $pdf->download('download.pdf');
        $dom_pdf = $pdf->getDomPDF();
        $canvas = $dom_pdf->getCanvas();
        $canvas->page_text(530, 820, 'Page {PAGE_NUM} of {PAGE_COUNT}', null, 10);
        
        $pdfString = $dom_pdf->output();

        return response($pdfString)->header('Content-Type', 'application/pdf');

        return [
            'pdf' => $pdf,
            //'fileName' => $filename,
        ];
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
