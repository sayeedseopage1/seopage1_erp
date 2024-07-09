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

        // return $validated;

        $projectsQuery = Project::withSum('times', 'total_minutes')->whereHas('project_submission', function($query) use($validated){
            return $query->where('created_at', '>', Carbon::parse('2023-12-01')->startOfDay())->where('status', 'accepted');
        });
        
        $projectWithCmsNiche = (clone $projectsQuery)->whereHas('project_portfolio', function($query) use($validated) {
            return $query->where('cms_category', $validated['project_cms_id'])->where('niche', $validated['project_niche_id']);
        });

        if(!(clone $projectWithCmsNiche)->count()){
            $projectWithCms = (clone $projectsQuery)->whereHas('project_portfolio', function($query) use($validated) {
                return $query->where('cms_category', $validated['project_cms_id']);
            });

            if(!(clone $projectWithCms)->count()){
                $projects = $projectsQuery;
            }else{
                $projects = $projectWithCms;
            }
        }else{
            $projects = $projectWithCmsNiche;
        }

        $total_logged_minutes = $projects->get()->sum('times_sum_total_minutes');

        return $total_logged_hours = $total_logged_minutes / 60;
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
