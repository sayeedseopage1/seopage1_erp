<?php

namespace App\Http\Controllers\PointIncentive;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;

class GetPmByDepartmentController extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function __invoke($departmetnId)
    {
        return response()->json([
            'status' => 200,
            'data' => DB::table('users')->select([
                'users.id', 
                'users.name', 
                'users.role_id',
                'employee_details.department_id',
            ])
            ->join('employee_details', 'employee_details.user_id', 'users.id')
            ->where('role_id', 4)
            ->where('employee_details.department_id', $departmetnId)
            ->groupBy('users.id')
            ->get()
        ]);
    }
}
