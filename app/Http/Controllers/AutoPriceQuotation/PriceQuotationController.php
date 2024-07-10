<?php

namespace App\Http\Controllers\AutoPriceQuotation;

use Carbon\Carbon;
use App\Models\Project;
use Illuminate\Http\Request;
use App\Models\ProjectPortfolio;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use App\Models\Currency;

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

        $projectsQuery = Project::with('project_portfolio')->withSum('times', 'total_minutes')->whereHas('project_submission', function($query) use($validated){
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

        // return $projects->get();

        $total_logged_minutes = (clone $projects)->get()->sum('times_sum_total_minutes');
        $total_parimary_pages = (clone $projects)->get()->sum('project_portfolio.main_page_number');
        $total_secondary_pages = (clone $projects)->get()->sum('project_portfolio.secondary_page_number');
        $total_logged_hours = $total_logged_minutes / 60;

        // Calculate existing budget by multiplying 20 with obtained logged hours and find unit budget for primary and secondary page
        $existingProjectBudget = $total_logged_hours * 20;
        $existingBudgetForEachPrimaryPage = (($existingProjectBudget / 100) * 70) / $total_parimary_pages;
        $existingBudgetForEachSecondaryPage = (($existingProjectBudget / 100) * 30) / $total_secondary_pages;
        
        // Calculate project budget depend on no of primary and secondary pages 
        $projectBudgetDependOnPrimaryAndSecondaryPages = ($validated['no_of_primary_pages'] * $existingBudgetForEachPrimaryPage) + ($validated['no_of_secondary_pages'] * $existingBudgetForEachSecondaryPage);
        
        // Add extra 5% for any missed time tracking by our team with calculated budget
        $projectBudgetWithMissedTimeTracking = $projectBudgetDependOnPrimaryAndSecondaryPages + (($projectBudgetDependOnPrimaryAndSecondaryPages / 100) * 5);

        // Increase project budget for major functionality (Each functionality will multiplying by 400)
        $projectBudgetWighMajorFunctionality = $projectBudgetWithMissedTimeTracking + ($validated['no_of_major_functionalities'] ? $validated['no_of_major_functionalities'] * 400 : 0);
       
        // Calculate hours for other works and every hour will multiplying by 20 (Speed Optimization: 6 Hours, Content Writing: 3 Hours per 1000 Words, UI Design: 3 Hours per page, Others: User inputs hour value in this field)
        $contentWritingHours = isset($validated['content_writing']) && $validated['content_writing'] ? (3 / 1000) * $validated['content_writing'] : 0;
        $speedOptimizationHours = isset($validated['speed_optimization']) && $validated['speed_optimization'] ? 6 : 0;
        $uiDesignHours = isset($validated['no_of_ui_design_page']) && $validated['no_of_ui_design_page'] ? $validated['no_of_ui_design_page'] * 3 : 0;
        $logoHours = isset($validated['no_of_logo']) && $validated['no_of_logo'] ? $validated['no_of_logo'] * 3 : 0;
        $othersHours = isset($validated['others_hours']) && $validated['others_hours'] ? $validated['others_hours'] : 0;

        $totalHoursOfOtherWorks = $contentWritingHours + $speedOptimizationHours + $uiDesignHours + $logoHours + $othersHours;
        $projectBudgetWithOtherWorks = $projectBudgetWighMajorFunctionality + ($totalHoursOfOtherWorks * 20);

        // Add risk factor value with calculated project budget
        $projectBudgetWithRiskFactor = $projectBudgetWithOtherWorks + (($projectBudgetWithOtherWorks / 100) * ($validated['risk_factor'] ? $validated['risk_factor'] : 0));
       
        // Convert to actual currency if project is in another currency other than usd it will then add extra 6% with calculated project budget
        $projectBudgetInActualCurrency = Currency::find($validated['currency_id'])->exchange_rate * $projectBudgetWithRiskFactor;
        $projectBudgetWithCurrencyCheck = $projectBudgetInActualCurrency + ($validated['currency_id'] > 1 ? ($projectBudgetInActualCurrency / 100) * 6 : 0);

        $projectBudgetRounded = round($projectBudgetWithCurrencyCheck);

        // Calculate project hours using no of primary and secondary pages
        $existingHoursForEachPrimaryPage = (($total_logged_hours / 100) * 70) / $total_parimary_pages;
        $existingHoursForEachSecondaryPage = (($total_logged_hours / 100) * 30) / $total_secondary_pages;

        // Calculate project stimate hours depend on no of primary and secondary pages 
        $projectStimatedHoursDependOnPrimaryAndSecondaryPages = ($validated['no_of_primary_pages'] * $existingHoursForEachPrimaryPage) + ($validated['no_of_secondary_pages'] * $existingHoursForEachSecondaryPage);

        $validated['no_of_days'] = 15;

        // Remove 3 days from total no of days due to granular level 
        $actualNoOfDays = $validated['no_of_days'] - 3;
        $hoursPerDay = $projectStimatedHoursDependOnPrimaryAndSecondaryPages / $actualNoOfDays;
        dump($projectStimatedHoursDependOnPrimaryAndSecondaryPages, $actualNoOfDays, $hoursPerDay);
        dump($validated);
        dd($existingHoursForEachPrimaryPage, $existingHoursForEachSecondaryPage, $projectStimatedHoursDependOnPrimaryAndSecondaryPages);
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
