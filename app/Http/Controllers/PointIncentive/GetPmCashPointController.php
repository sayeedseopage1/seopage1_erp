<?php

namespace App\Http\Controllers\PointIncentive;

use App\Models\CashPoint;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class GetPmCashPointController extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function __invoke(Request $request)
    {
        return response()->json([
            'status'=> 200,
            'data' => CashPoint::selectRaw('cash_points.*, (total_points_earn - total_points_lost) as balance, CONCAT("<strong>Factor: </strong>", criterias.title, ", <strong>Project Manager: </strong>", users.name) as activity')
            ->selectRaw('(SELECT SUM(total_points_earn - total_points_lost) FROM cash_points AS cp WHERE cp.id <= cash_points.id AND cp.factor_id IS NOT NULL) AS cumulative_balance')
            // ->selectRaw('(SELECT SUM(total_points_earn - total_points_lost) FROM cash_points AS cp WHERE cp.id <= cash_points.id AND cp.id < 11) AS cumulative_balance')
            ->leftJoin('factors', 'factors.id', '=', 'cash_points.factor_id')
            ->leftJoin('criterias', 'criterias.id', '=', 'factors.criteria_id')
            ->leftJoin('users', 'users.id', '=', 'cash_points.user_id')
            ->whereNotNull('factor_id')
            // ->where('id', '<', 11)
            ->orderBy('cash_points.id', 'desc')
            ->get()
        ]);
    }
}
