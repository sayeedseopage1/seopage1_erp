<?php

namespace App\Http\Controllers\Projects;

use App\Models\Deal;
use App\Models\PMAssign;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;

class ProjectInsightController extends Controller
{
    public function projectDetailsWithAssignablePm($deal_id)
    {
        $deal = Deal::select(['deals.id','deals.deal_id','deals.deal_category','deals.cms_name','deals.pm_id','deals.client_name','deals.project_name','users.name as pm_name'])->leftJoin('users', 'users.id', 'deals.pm_id')->find($deal_id);
        if($deal) {
            $deal->assignable_pm = PMAssign::select(['p_m_assigns.id','p_m_assigns.pm_id','p_m_assigns.status','users.name'])->leftJoin('users', 'users.id', 'p_m_assigns.pm_id')->whereIn('p_m_assigns.status', [0,1])->where('p_m_assigns.pm_id', '!=', $deal->pm_id)->groupBy(['p_m_assigns.id'])->get();
        }

        return response()->json([
            'status' => 200,
            'data' => $deal
        ]);
    }

    public function reassignPmToProject(Request $request)
    {
        return $request;
        try {
            DB::beginTransaction();
            
            DB::commit();
        } catch (\Throwable $th) {
            //throw $th;
            DB::rollBack();
        }
    }
}
