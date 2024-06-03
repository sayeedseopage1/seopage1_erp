<?php

namespace App\Http\Controllers\PointIncentive;

use Carbon\Carbon;
use App\Models\User;
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
        $userId = $request->user_id??null;
        $startDate = $request->start_date ? Carbon::parse($request->start_date)->startOfDay() : Carbon::now()->startOfMonth();
        $endDate = Carbon::parse($request->end_date??now())->endOfDay();

        $data['cash_points'] = CashPoint::selectRaw('cash_points.*, (total_points_earn - total_points_lost) as balance, CONCAT("<strong>Factor: </strong>", criterias.title, ", <strong>Project Manager: </strong>", users.name) as activity')
        ->selectRaw('(SELECT SUM(total_points_earn - total_points_lost) FROM cash_points AS cp WHERE cp.id <= cash_points.id AND cp.factor_id IS NOT NULL AND cp.user_id = ? AND cp.created_at BETWEEN ? AND ?) AS cumulative_balance', [$userId, $startDate, $endDate])
        // ->selectRaw('(SELECT SUM(total_points_earn - total_points_lost) FROM cash_points AS cp WHERE cp.id <= cash_points.id AND cp.id < 11) AS cumulative_balance')
        
        ->leftJoin('factors', 'factors.id', '=', 'cash_points.factor_id')
        ->leftJoin('criterias', 'criterias.id', '=', 'factors.criteria_id')
        ->leftJoin('users', 'users.id', '=', 'cash_points.user_id')
        ->whereNotNull('factor_id')
        ->where('cash_points.user_id', $userId)
        ->whereBetween('cash_points.created_at', [$startDate, $endDate])
        ->when($request->point_type, function($query) use ($request){
            $fieled_name = $request->point_type == 1 ? 'total_points_earn' : 'total_points_lost';
            return $query->where($fieled_name, '!=', 0);
        })
        ->orderBy('cash_points.id', 'desc')
        ->paginate($request->per_page??10);

        $cash_points = CashPoint::select('cash_points.*')->leftJoin('factors', 'factors.id', '=', 'cash_points.factor_id')
        ->leftJoin('criterias', 'criterias.id', '=', 'factors.criteria_id')
        ->leftJoin('users', 'users.id', '=', 'cash_points.user_id')
        ->whereNotNull('factor_id')
        ->where('cash_points.user_id', $userId)
        ->whereBetween('cash_points.created_at', [$startDate, $endDate])
        ->when($request->point_type, function($query) use ($request){
            $fieled_name = $request->point_type == 1 ? 'total_points_earn' : 'total_points_lost';
            return $query->where($fieled_name, '!=', 0);
        })
        ->orderBy('cash_points.id', 'desc')
        ->get();

        $data['total_points_earn'] = $cash_points->sum('total_points_earn');
        $data['total_points_lost'] = $cash_points->sum('total_points_lost');

        return response()->json([
            'status'=> 200,
            'data' => $data
        ]);
    }
}
