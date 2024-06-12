<?php

namespace App\Http\Controllers\PointIncentive;

use Carbon\Carbon;
use Illuminate\Http\Request;
use App\Models\IncentivePayment;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Models\IncentivePaymentHistory;

class IncentivePaymentController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
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
        try {
            $user_id = $request->user_id;
            $incentive_payment_ids = $request->incentive_payment_ids;
            $payables = IncentivePayment::where('user_id', $user_id)->whereIn('id', $incentive_payment_ids)->get();
            DB::beginTransaction();
            $totalPayment = 0;
            foreach($payables as $item){
                if($item->status == 2) {
                    return response()->json([
                        'status' => 422,
                        'data' => 'You selected an item that was already paid for ('. Carbon::parse($item->date)->format('F, Y').')'
                    ]);
                }elseif(IncentivePayment::where('user_id', $user_id)->where('id', '<', $item->id)->where('status', 1)->orderBy('id', 'desc')->count()){
                    return response()->json([
                        'status' => 422,
                        'data' => 'You missed the previous month before '. Carbon::parse($item->date)->format('F, Y')
                    ]);
                }
                $totalPayment += $item->held_amount;
                $item->paid_amount += $item->held_amount;
                $item->status = 2;
                $item->save();
            }
            
            IncentivePaymentHistory::create([
                'payment_date' => now(),
                'from_month' => IncentivePayment::where('user_id', $user_id)->whereIn('id', $incentive_payment_ids)->first()->date,
                'to_month' => IncentivePayment::where('user_id', $user_id)->whereIn('id', $incentive_payment_ids)->orderBy('id', 'desc')->first()->date,
                'user_id' => $user_id,
                'incentive_payment_id' => null,
                'type' => 2,
                'paid_amount' => $totalPayment,
                'added_by' => Auth::user()->id
            ]);
            DB::commit();
            return response()->json([
                'status' => 200,
                'data' => 'Your payment is successful'
            ]);
        } catch (\Throwable $th) {
            //throw $th;
            DB::rollBack();
            return response()->json([
                'status' => 404,
                'data' => 'Something went wrong!'
            ]);
        }
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
