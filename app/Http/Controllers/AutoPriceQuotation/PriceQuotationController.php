<?php

namespace App\Http\Controllers\AutoPriceQuotation;

use Carbon\Carbon;
use App\Models\Project;
use Illuminate\Http\Request;
use App\Models\ProjectPortfolio;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;

class PriceQuotationController extends Controller
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
        $validated = $request->validate([
            'deal_stage_id' => 'required|exists:deal_stages,id',
            'project_cms_id' => 'required|exists:project_cms,id',
            'project_niche_id' => 'required|exists:project_niches,id',
            'no_of_primary_pages' => 'required|numeric',
            'no_of_secondary_pages' => 'required|numeric',
            'no_of_major_functionalities' => 'required|numeric',
            'risk_factor' => 'required|numeric',
            'total_hours_of_others_works' => 'nullable',
            'currency_id' => 'required|numeric',
            'deadline_type' => 'required|numeric',
            'deadline' => 'nullable',
            'platform_account_id' => 'required|exists:platform_accounts,id',
        ]);

        return $validated;
        
        // $projectPortfolio = ProjectPortfolio::where('cms_category', $validated['project_cms_id'])->pluck('project_id');
        // return Project::whereIn('id', $projectPortfolio)->count();

        return Project::withSum('times', 'total_minutes')->whereHas('project_submission', function($query) use($validated){
            return $query->where('created_at', '>', Carbon::parse('2023-12-01'))->where('status', 'accepted');
        })->whereHas('project_portfolio', function($query) use($validated) {
            return $query->where('cms_category', $validated['project_cms_id'])->where('niche', $validated['project_niche_id']);
        })->count();

        return DB::table('projects')->leftJoin('project_portfolios', function($query) use ($validated){
            $query->on('project_portfolios.project_id', '=', 'projects.id')->where('project_portfolios.cms_category', '=', 1);
        })->whereNotNull('project_portfolios.project_id')->count();

        // Project::leftJoin('project_portfolios', 'project_portfolios.project_id', '')
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
