<?php

namespace App\Http\Controllers\AutoPriceQuotation;

use Carbon\Carbon;
use App\Models\Project;
use App\Models\Currency;
use Illuminate\Http\Request;
use App\Models\PlatformAccount;
use App\Http\Controllers\Controller;
use App\Models\DealStage;
use App\Models\PriceQuotation;
use App\Models\ProjectCms;
use App\Models\ProjectNiche;
use Illuminate\Support\Facades\Validator;

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
        $validator = Validator::make($request->all(), [
            'deal_stage_id' => 'required|exists:deal_stages,id',
            'project_cms_id' => 'required|exists:project_cms,id',
            'project_niche_id' => 'required|exists:project_niches,id',
            'no_of_primary_pages' => 'required|numeric',
            'no_of_secondary_pages' => 'required|numeric',
            'no_of_major_functionalities' => 'required|numeric',
            'risk_factor' => 'required|numeric',
            'content_writing' => 'nullable',
            'speed_optimization' => 'nullable',
            'no_of_ui_design_page' => 'nullable',
            'no_of_logo' => 'nullable',
            'others_hours' => 'nullable',
            'currency_id' => 'required|numeric',
            'deadline_type' => 'required|numeric',
            'no_of_days' => 'nullable',
            'platform_account_id' => 'nullable|exists:platform_accounts,id',
            'is_selected' => 'nullable|numeric|in:0,1'
        ]);
        
        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors()->all()
            ], 422);
        }
        
        $validated = $validator->validated();

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
        $majorFunctionalityHours = ($validated['no_of_major_functionalities'] ? $validated['no_of_major_functionalities'] * 400 : 0) / 20;
       
        // Calculate hours for other works and every hour will multiplying by 20 (Speed Optimization: 6 Hours, Content Writing: 3 Hours per 1000 Words, Logo designd: 4 Hours per logo, UI Design: 3 Hours per page, Others: User inputs hour value in this field)
        $contentWritingHours = isset($validated['content_writing']) && $validated['content_writing'] ? (3 / 1000) * $validated['content_writing'] : 0;
        $speedOptimizationHours = isset($validated['speed_optimization']) && $validated['speed_optimization'] ? 6 : 0;
        $uiDesignHours = isset($validated['no_of_ui_design_page']) && $validated['no_of_ui_design_page'] ? $validated['no_of_ui_design_page'] * 3 : 0;
        $logoHours = isset($validated['no_of_logo']) && $validated['no_of_logo'] ? $validated['no_of_logo'] * 4 : 0;
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

        // Add hours per day multiplication with calculated project budget
        $projectBudgetWithDeadlineValue = $projectBudgetRounded;
        $no_of_day_required = $validated['no_of_days'];
        $calculated_total_hours = number_format($projectStimatedHoursDependOnPrimaryAndSecondaryPages, 2) + number_format($majorFunctionalityHours, 2) + number_format($totalHoursOfOtherWorks, 2);
        if($validated['deadline_type'] == 2){
            $actualNoOfDays = $validated['no_of_days'] - 3;
            $hoursPerDay = $calculated_total_hours / $actualNoOfDays;
            $multiplicationForHoursPerDay = 1;
            if($hoursPerDay <= 4){
                $multiplicationForHoursPerDay = 1;
            }elseif($hoursPerDay > 4 && $hoursPerDay <= 5.5){
                $multiplicationForHoursPerDay = 1.2;
            }elseif($hoursPerDay > 5.5 && $hoursPerDay <= 7){
                $multiplicationForHoursPerDay = 1.5;
            }elseif($hoursPerDay > 7 && $hoursPerDay <= 10){
                $multiplicationForHoursPerDay = 2;
            }elseif($hoursPerDay > 10){
                return response()->json([
                    'status' => 400,
                    'message' => 'The project is not feasible! The estimated working hours per day are excessive',
                    'estimated_hours_per_day' => $hoursPerDay
                ]);
            }
            $projectBudgetWithDeadlineValue = $projectBudgetRounded * $multiplicationForHoursPerDay;
        }elseif($validated['deadline_type'] == 1){
            $no_of_day_required = ceil($calculated_total_hours / 4) + 3;
        }

        

        
        $dealStage = DealStage::select(['id','short_code','client_username','project_name'])->find($validated['deal_stage_id']);
        $projectCms = ProjectCms::select(['id','cms_name'])->find($validated['project_cms_id']);
        $projectNiche = ProjectNiche::select(['id','category_name'])->find($validated['project_niche_id']);
        $currency = Currency::select(['id','currency_name','currency_symbol','currency_code','exchange_rate'])->find($validated['currency_id']);

        if(isset($validated['is_selected']) && $validated['is_selected'] == 1){
            // Calculate project budget with multiplying factor of platform account
            if(isset($validated['platform_account_id']) && $validated['platform_account_id']){
                $platformAccount = PlatformAccount::select(['id','type','company_name','name','username','user_url','email','profile_type','multiplying_factor'])->where('id', $validated['platform_account_id'])->first();
                PriceQuotation::create([
                    'serial_no' => '001',
                    'deal_stage_id' => $validated['deal_stage_id'],
                    'project_cms_id' => $validated['project_cms_id'],
                    'project_niche_id' => $validated['project_niche_id'],
                    'no_of_primary_pages' => $validated['no_of_primary_pages'],
                    'no_of_secondary_pages' => $validated['no_of_secondary_pages'],
                    'no_of_major_functionalities' => $validated['no_of_major_functionalities'],
                    'risk_factor' => $validated['risk_factor'],
                    'total_hours_of_primary_page' => number_format($validated['no_of_primary_pages'] * $existingHoursForEachPrimaryPage, 2),
                    'total_hours_of_secondary_page' => number_format($validated['no_of_secondary_pages'] * $existingHoursForEachSecondaryPage, 2),
                    'total_hours_of_major_functionality' => number_format($majorFunctionalityHours, 2),
                    'total_hours_of_others_works' => number_format($totalHoursOfOtherWorks, 2),
                    'total_calculated_hours' => number_format($calculated_total_hours, 2),
                    'currency_id' => $validated['currency_id'],
                    'deadline_type' => $validated['deadline_type'],
                    'no_of_days' => $no_of_day_required,
                    'platform_account_id' => $validated['platform_account_id'],
                    'calculated_actual_budget' => number_format($projectBudgetWithDeadlineValue * $platformAccount->multiplying_factor, 2),
                    'calculated_usd_budget' => number_format(($projectBudgetWithDeadlineValue * $platformAccount->multiplying_factor) / $currency->exchange_rate, 2),
                ]);
            
            }else{
                return response()->json([
                    'status' => 400,
                    'message' => 'Something went wrong!'
                ]);
            }
        }else{
            // Calculate project budget with multiplying factor of platform account
            if(isset($validated['platform_account_id']) && $validated['platform_account_id']){
                $platformAccounts = PlatformAccount::select(['id','type','company_name','name','username','user_url','email','profile_type','multiplying_factor'])->where('id', $validated['platform_account_id'])->get();
            }else{
                $platformAccounts = PlatformAccount::select(['id','type','company_name','name','username','user_url','email','profile_type','multiplying_factor'])->get();
            }
            $data = array();
            foreach($platformAccounts as $key => $platformAccount){
                $data[$key]['deal_stage'] = $dealStage;
                $data[$key]['project_cms'] = $projectCms;
                $data[$key]['project_niche'] = $projectNiche;
                $data[$key]['no_of_primary_pages'] = $validated['no_of_primary_pages'];
                $data[$key]['no_of_secondary_pages'] = $validated['no_of_secondary_pages'];
                $data[$key]['no_of_major_functionalities'] = $validated['no_of_major_functionalities'];
                $data[$key]['risk_factor'] = $validated['risk_factor'];
                $data[$key]['hours_of_other_works'] = $totalHoursOfOtherWorks;
                $data[$key]['currency'] = $currency;
                $data[$key]['platform_account'] = $platformAccount;
                $data[$key]['calculated_project_budget'] = number_format($projectBudgetWithDeadlineValue * $platformAccount->multiplying_factor, 2);
                $data[$key]['calculated_total_hours'] = number_format($calculated_total_hours, 2);
                $data[$key]['calculated_no_of_days'] = $no_of_day_required;
                $data[$key]['caculated_project_budget_in_usd'] = number_format(($projectBudgetWithDeadlineValue * $platformAccount->multiplying_factor) / $data[$key]['currency']->exchange_rate, 2);
            }

            return response()->json([
                'status' => 200,
                'data' => $data,
                'previous_payloads' => $validated
            ]);
        }
        


        // $platformAccounts = PlatformAccount::when(
        //     !$validated['platform_account_id'], 
        //     fn($query) => $query->where('id', $validated['platform_account_id'])
        // )->get();
        
        // $data = $platformAccounts->map(function ($platformAccount) use ($validated, $projectBudgetWithDeadlineValue, $no_of_day_required) {
        //     return [
        //         'deal_stage_id' => $validated['deal_stage_id'],
        //         'project_cms_id' => $validated['project_cms_id'],
        //         'project_niche_id' => $validated['project_niche_id'],
        //         'no_of_primary_pages' => $validated['no_of_primary_pages'],
        //         'no_of_secondary_pages' => $validated['no_of_secondary_pages'],
        //         'no_of_major_functionalities' => $validated['no_of_major_functionalities'],
        //         'risk_factor' => $validated['risk_factor'],
        //         'currency_id' => $validated['currency_id'],
        //         'deadline_type' => $validated['deadline_type'],
        //         'no_of_days' => $validated['no_of_days'],
        //         'platform_account_id' => $platformAccount->id,
        //         'calculated_project_budget' => $projectBudgetWithDeadlineValue * $platformAccount->multiplying_factor,
        //         'calculated_no_of_days' => $no_of_day_required,
        //     ];
        // });
        
        // return ($data->toArray());
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
