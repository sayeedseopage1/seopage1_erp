<?php

namespace App\Http\Controllers\PointIncentive;

use Carbon\Carbon;
use Illuminate\Http\Request;
use App\Models\IncentivePayment;
use App\Http\Controllers\Controller;
use App\Models\IncentivePaymentHistory;

class GetIncentiveHeldAmount extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function __invoke(Request $request)
    {
        $userId = $request->user_id??null;
        $startDate = $request->start_date ? Carbon::parse($request->start_date)->startOfDay() : Carbon::now()->startOfYear();
        $endDate = Carbon::parse($request->end_date??now())->endOfYear();

        $data = IncentivePayment::where('user_id', $userId)->whereBetween('date', [$startDate, $endDate])->get()->map(function ($item) {
            $monthYear = Carbon::parse($item->date)->format('F, Y');
            $item->title = "Monthly Incentive (for the month of $monthYear)";
            $item->viewing_month = Carbon::parse($item->date)->addDays(5)->format('F, Y');
            $heldAmountPaymentHistory = IncentivePaymentHistory::with('addedBy')->whereMonth('to_month', Carbon::parse($item->date))->first();
            $item->held_amount_payment = $heldAmountPaymentHistory ? "Held incentive amount ". $heldAmountPaymentHistory->paid_amount . " taka for ". Carbon::parse($heldAmountPaymentHistory->from_month)->format('F, Y') . " - ". Carbon::parse($heldAmountPaymentHistory->to_month)->format('F, Y') . " has been paid on ". Carbon::parse($heldAmountPaymentHistory->payment_date)->format('F j, Y') . " by " . $heldAmountPaymentHistory->addedBy->name : null;
            $item->status_text = $item->status == 1 ? 'Pending' : 'Paid';
            return $item;
        });

        $sumOfHeldAmount = 0;
        foreach($data as $item){
            if($item->held_amount_payment){
                $sumOfHeldAmount += $item->held_amount;
                $item->cumulative_held_amount = $sumOfHeldAmount;
                $sumOfHeldAmount = 0;
            }else{
                $sumOfHeldAmount += $item->held_amount;
                $item->cumulative_held_amount = $sumOfHeldAmount;
            }
            
        }

        $data = $data->sortByDesc('id')->values();

        return response()->json([
            'status'=> 200,
            'data' => $data
        ]);
    }
}
