<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\PendingAction;
use App\Models\Project;
use App\Models\ProjectCms;
use App\Models\ProjectNiche;
use App\Models\ProjectPortfolio;
use App\Models\ProjectTimeLog;
use App\Models\ProjectWebsitePlugin;
use App\Models\ProjectWebsiteTheme;
use App\Models\ProjectWebsiteType;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Request as FacadesRequest;

use function Google\Auth\Cache\get;
use function Symfony\Component\HttpClient\Response\select;

class PortfolioController extends AccountBaseController
{
    public function __construct()
    {
        parent::__construct();
        $this->pageTitle = 'Portfolio';
        $this->activeSettingMenu = 'portfolio';

    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $this->project_cmss = ProjectCms::all();
        $this->website_types = ProjectWebsiteType::all();
        $this->website_categories = ProjectNiche::whereNull('parent_category_id')->get();
        $this->website_themes = ProjectWebsiteTheme::all();
        $this->website_plugins = ProjectWebsitePlugin::whereNotNull('plugin_name')->get();

//        $this->portfolios = DB::table('project_portfolios')
//            ->join('projects', 'project_portfolios.project_id', '=', 'projects.id')
//            ->join('users', 'projects.client_id', '=', 'users.id')
//            ->join('project_submissions', 'project_portfolios.project_id', '=', 'project_submissions.project_id')
//            ->select('project_portfolios.*', 'users.user_name', 'projects.project_name', 'projects.project_budget', 'project_submissions.actual_link')
//            ->get();

//                dd($this->website_subcategories);

        return view('portfolio.index', $this->data);
    }

    public function getSubCategory($website_cat_id)
    {
        //        dd($website_cat_id);
        $website_sub_cats = ProjectNiche::find($website_cat_id)->child;
        return response()->json($website_sub_cats);
    }


    public function filterCmsCategories(Request $request)
    {
        $filteredCategories = ProjectPortfolio::query();
        if (!is_null($request->input('category_id'))) {
            $selectedCategoryId = $request->input('category_id');
            $filteredCategories = $filteredCategories->where('cms_category', $selectedCategoryId);
        }

        if (!is_null($request->input('website_type'))) {
            $selectedCategoryId = $request->input('website_type');
            $filteredCategories = $filteredCategories->where('website_type', $selectedCategoryId);
        }

        if (!is_null($request->input('website_category'))) {
            $selectedCategoryId = $request->input('website_category');
            $filteredCategories = $filteredCategories->where('niche', $selectedCategoryId);
        }

        if (!is_null($request->input('website_sub_cat'))) {
            $selectedCategoryId = $request->input('website_sub_cat');
            $filteredCategories = $filteredCategories->where('sub_niche', $selectedCategoryId);
        }

        if (!is_null($request->input('theme_name'))) {
            $selectedCategoryId = $request->input('theme_name');
            $filteredCategories = $filteredCategories->where('theme_name', $selectedCategoryId);
        }

        if (!is_null($request->input('website_plugin'))) {
            $selectedCategoryId = $request->input('website_plugin');
            $filteredCategories = $filteredCategories->where('plugin_name', $selectedCategoryId);
        }

        $filteredCategories = $filteredCategories->where('portfolio_link', '!=', null)->get();
        return response()->json($filteredCategories);
    }

    public function calculateProjectLoggedTime($projectId)
            {
                $project_time_logs_hours = ProjectTimeLog::where('project_id', $projectId)->sum('total_hours');
                $project_time_logs_minutes = ProjectTimeLog::where('project_id', $projectId)->sum('total_minutes');

                $project_time_hours = intval($project_time_logs_minutes / 60);
                $project_time_minutes = $project_time_logs_minutes % 60;

                $currentTime = Carbon::now();

                $totalMinutes = DB::table('project_time_logs')
                    ->where('project_id', $projectId)
                    ->whereNull('end_time')
                    ->select(DB::raw("SUM(TIME_TO_SEC(TIMEDIFF('$currentTime', start_time)))/60 as total_minutes"))
                    ->value('total_minutes');

                $active_time_hours = intval(round($totalMinutes, 1) / 60);
                $active_time_minutes = intval(round($totalMinutes, 1) % 60);

                $update_hours = $project_time_minutes + $active_time_minutes / 60;
                $update_minutes = $project_time_minutes + $active_time_minutes % 60;

                if ($project_time_minutes + $active_time_minutes >= 60) {
                    $add_hours = intval(round(($project_time_minutes + $active_time_minutes) / 60, 1));
                    $add_minutes = ($project_time_minutes + $active_time_minutes) % 60;
                } else {
                    $add_hours = 0;
                    $add_minutes = $project_time_minutes + $active_time_minutes;
                }

                $total_hours = intval(round($project_time_hours, 1)) + $active_time_hours + $add_hours + $add_minutes / 60;

                $total_minutes = $total_hours * 60 + $add_minutes;

                return [
                    'total_hours' => $total_hours,
                    'total_minutes' => $total_minutes
                ];
            }


    public function filterDataShow($portfolio_id)
    {

        $portfolio = DB::table('project_portfolios')
                    ->select(
                        'project_portfolios.*',
                        'users.user_name as client_name',
                        'users.image as client_image',
                        'users.id as client_id',
                        'projects.id as project_id',
                        'projects.project_name',
                        'projects.project_budget',
                        'project_submissions.actual_link',
                        'projects.hours_allocated'
                    )
                    ->where('project_portfolios.id', $portfolio_id)
                    ->leftJoin('projects', 'project_portfolios.project_id', '=', 'projects.id')
                    ->leftJoin('users', 'projects.client_id', '=', 'users.id')
                    ->leftJoin('project_submissions', 'project_portfolios.project_id', '=', 'project_submissions.project_id')
                    ->first();

        if($portfolio->sub_niche){
            $portfolio->sub_niche = DB::table('project_niches')->where('id', $portfolio->sub_niche)->first();
        }

        if($portfolio->niche){
            $portfolio->niche = DB::table('project_niches')->where('id', $portfolio->niche)->first();
        }

        if($portfolio->theme_id){
            $theme_data = ProjectWebsiteTheme::find($portfolio->theme_id);
            $portfolio->theme_name = $theme_data? $theme_data->theme_name : null;
        }

        $portfolio->estimated_total_minutes =  ($portfolio->hours_allocated) * 60;
        $logged_hours = $this->calculateProjectLoggedTime($portfolio->project_id);

        $portfolio->total_logged_time = $logged_hours["total_minutes"];

        $total_hours = $logged_hours["total_hours"];
        $portfolio->hourly_budget = $total_hours > 0 ? round($portfolio->project_budget / $total_hours, 2) : 0;

        // Average hourly price based on the final logged hours

        return response()->json($portfolio, 200);
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
    public function ratingStore(Request $request)
    {
        $portfolio = ProjectPortfolio::where('id', $request->portfolio_id)->first();
        $portfolio->rating_score = $request->rating_score;
        $portfolio->added_by_comment = $request->added_by_comment;
        $portfolio->rating_added_by = $request->rating_added_by;
        $portfolio->save();

        $actions = PendingAction::where('code','WSR')->where('past_status',0)->where('portfolio_id',$portfolio->id)->get();
        if($actions != null)
        {
            foreach ($actions as $key => $action) 
            {
                $action->authorized_by= Auth::id();
                $action->authorized_at= Carbon::now();
                $action->past_status = 1;
                $action->save();
                
                $project = Project::where('id',$portfolio->project_id)->first();
                $project_submission = ProjectSubmission::where('project_id',$project->id)->first();
                $pm = User::where('id',$project->pm_id)->first();
                $client = User::where('id',$project->client_id)->first();
                $authorize_by= User::where('id',$action->authorized_by)->first();

                $past_action= new PendingActionPast();
                $past_action->item_name = $action->item_name;
                $past_action->code = $action->code;
                $past_action->serial = $action->serial;
                $past_action->action_id = $action->id;
                $past_action->heading = 'Website rating added successfully!';
                if($portfolio->portfolio_link != null){
                    $past_action->message = 'Website <a href="'.$portfolio->portfolio_link.'">'.$portfolio->portfolio_link.'</a> for client <a href="'.route('clients.show',$client->id).'">'.$client->name.'</a> by PM <a href="'.route('employees.show',$pm->id).'">'.$pm->name.'</a> was rated by <a href="'.route('employees.show',$authorize_by->id).'">'.$authorize_by->name.'</a>';
                    }elseif($project_submission->dummy_link != null){
                        $past_action->message = 'Website <a href="'.$project_submission->dummy_link.'">'.$project_submission->dummy_link.'</a> for client <a href="'.route('clients.show',$client->id).'">'.$client->name.'</a> by PM <a href="'.route('employees.show',$pm->id).'">'.$pm->name.'</a> was rated by <a href="'.route('employees.show',$authorize_by->id).'">'.$authorize_by->name.'</a>';
                    }else{
                        $past_action->message = 'Website <span class="text-danger">No Link Provided</span> for client <a href="'.route('clients.show',$client->id).'">'.$client->name.'</a> by PM <a href="'.route('employees.show',$pm->id).'">'.$pm->name.'</a> was rated by <a href="'.route('employees.show',$authorize_by->id).'">'.$authorize_by->name.'</a>';
                    }
                $past_action->timeframe = $action->timeframe;
                $past_action->authorization_for = $action->authorization_for;
                $past_action->authorized_by = $action->authorized_by;
                $past_action->authorized_at = $action->authorized_at;
                $past_action->expired_status = $action->expired_status;
                $past_action->past_status = $action->past_status;
                $past_action->project_id = $action->project_id;
                $past_action->client_id = $action->client_id;
                $button = [
                    [
                        'button_name' => 'View rating',
                        'button_color' => 'primary',
                        'button_type' => 'redirect_url',
                        'button_url' => route('portfolio.index', ['protfolio_id' => $portfolio->id, 'modal' => 'show-rating']),
                    ],
                ];
                $past_action->button = json_encode($button);
                $past_action->save();
            }
        }

        return response()->json([
            'message' => 'Rating added successfully',
        ], 200);

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
    public function ratingUpdate(Request $request)
    {
        $portfolio = ProjectPortfolio::where('id', $request->portfolio_id)->first();
        $portfolio->rating_score = $request->rating_score;
        $portfolio->added_by_comment = $request->added_by_comment;
        $portfolio->rating_updated_by = $request->rating_updated_by;
        $portfolio->rating_updated_at = Carbon::now();
        $portfolio->save();

        return response()->json([
            'message' => 'Rating Updated successfully',
        ], 200);

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



    // get filter data
    public function get_filter_data(){
        $project_cms = ProjectCms::select("id", "cms_name")->get();
        $website_types = ProjectWebsiteType::select("id", "website_type")->get();
        $website_categories = ProjectNiche::select("id", "category_name", "parent_category_id", "sub_category_id")->get();
        $website_themes = ProjectWebsiteTheme::all();
        $website_plugins = ProjectWebsitePlugin::whereNotNull('plugin_name')->get();

        $data = [
            "project_cms"=> $project_cms,
            "website_types" => $website_types,
            "website_categories" => $website_categories,
            "website_themes" => $website_themes,
            "website_plugins" => $website_plugins
        ];

        return Response()->json($data, 200);
    }


    // get portfolio data
    public function get_portfolio_data(Request $request)
    {
        $cms = $request->cms ?? null;
        $website_type = $request->website_type ?? null;
        $website_category = $request->website_category ?? null;
        $website_sub_category = $request->website_sub_category ?? null;
        $theme_id = $request->theme_id ?? null;
        $plugin_id = $request->plugin_id ?? null;
        $rating = $request->rating_id ?? null;
        $limit = $request->page_size ?? 30;

        // $itemsPaginated = SalesRiskPolicy::where('parent_id', null)->offset($req->input('limit', 10) * $req->input('page', 1))->paginate($req->input('limit', 10));
        $rawData1 = DB::table('project_portfolios as pp')
        ->leftJoin('project_submissions as ps', 'ps.project_id', '=', 'pp.project_id')
        ->leftJoin('projects', 'pp.project_id', '=', 'projects.id')
        ->leftJoin('users as client', 'projects.client_id', '=', 'client.id')
        ->leftJoin('users as pm', 'projects.pm_id', '=', 'pm.id')
        ->leftJoin('project_niches as category', 'pp.niche', '=', 'category.id')
        ->leftJoin('project_niches as subcategory', 'pp.sub_niche', '=', 'subcategory.id')
        ->leftJoin('project_cms', 'pp.cms_category', '=', 'project_cms.id')
        ->leftJoin('project_website_types', 'pp.website_type', '=', 'project_website_types.id')
        ->leftJoin('project_website_themes', 'pp.theme_id', '=', 'project_website_themes.id')
        ->select('pp.*','client.id as clientId','client.name as clientName','pm.id as pmId','pm.name as pmName','category.category_name','subcategory.category_name as sub_category_name','project_cms.cms_name','project_website_types.website_type as websiteType','project_website_themes.theme_name','project_website_themes.theme_name')
        ->where('pp.portfolio_link', '!=', null)
        ->whereNotIn('pp.portfolio_link',["n/a", "N/A", "na", "NA"])
        ->where('ps.status', 'accepted')
        ->where(function($query) use ($cms, $website_type, $website_category, $website_sub_category, $theme_id, $plugin_id, $rating) {
            if ($cms) {
                $query->where('pp.cms_category', $cms);
            }

            if ($website_type) {
                $query->where('pp.website_type', $website_type);
            }

            if ($website_category) {
                $query->where('pp.niche', $website_category);
            }

            if ($website_sub_category) {
                $query->where('pp.sub_niche', $website_sub_category);
            }

            if ($theme_id) {
                $query->where('pp.theme_id', $theme_id);
            }

            if ($plugin_id) {
                $query->whereJsonContains('pp.plugin_list', [$plugin_id]);
            }

            $ratingRanges = [
                1 => [0.25, 1.75],
                2 => [2.00, 2.75],
                3 => [3.00, 3.75],
                4 => [4.00, 4.75],
                5 => [5.00],
            ];
            
            if (isset($rating) && array_key_exists($rating, $ratingRanges)) {
                $range = $ratingRanges[$rating];
                $query->where('pp.rating_score', '>=', $range[0]);
                if (count($range) > 1) {
                    $query->where('pp.rating_score', '<=', $range[1]);
                }
            }

        })
        ->distinct();

        $rawData2 = DB::table('project_portfolios as pp')
        ->leftJoin('project_submissions as ps', 'ps.project_id', '=', 'pp.project_id')
        ->leftJoin('projects', 'pp.project_id', '=', 'projects.id')
        ->leftJoin('users as client', 'projects.client_id', '=', 'client.id')
        ->leftJoin('users as pm', 'projects.pm_id', '=', 'pm.id')
        ->leftJoin('project_niches as category', 'pp.niche', '=', 'category.id')
        ->leftJoin('project_niches as subcategory', 'pp.sub_niche', '=', 'subcategory.id')
        ->leftJoin('project_cms', 'pp.cms_category', '=', 'project_cms.id')
        ->leftJoin('project_website_types', 'pp.website_type', '=', 'project_website_types.id')
        ->leftJoin('project_website_themes', 'pp.theme_id', '=', 'project_website_themes.id')
        ->select('pp.*','client.id as clientId','client.name as clientName','pm.id as pmId','pm.name as pmName','category.category_name','subcategory.category_name as sub_category_name','project_cms.cms_name','project_website_types.website_type as websiteType','project_website_themes.theme_name','project_website_themes.theme_name')
        ->where('pp.portfolio_link', '!=', null)
        ->whereNotIn('pp.portfolio_link',["n/a", "N/A", "na", "NA"])
        ->where('ps.status', 'accepted')
        ->where(function($query) use ($cms, $website_type, $website_category, $website_sub_category, $theme_id, $plugin_id ,$rating) {
            if ($cms) {
                $query->where('pp.cms_category', $cms);
            }

            if ($website_type) {
                $query->where('pp.website_type', $website_type);
            }

            if ($website_category) {
                $query->where('pp.niche', $website_category);
            }

            if ($website_sub_category) {
                $query->where('pp.sub_niche', $website_sub_category);
            }

            if ($theme_id) {
                $query->where('pp.theme_id', $theme_id);
            }

            if ($plugin_id) {
                $query->whereJsonContains('pp.plugin_list', [$plugin_id]);
            }

            $ratingRanges = [
                1 => [0.25, 1.75],
                2 => [2.00, 2.75],
                3 => [3.00, 3.75],
                4 => [4.00, 4.75],
                5 => [5.00],
            ];
            
            if (isset($rating) && array_key_exists($rating, $ratingRanges)) {
                $range = $ratingRanges[$rating];
                $query->where('pp.rating_score', '>=', $range[0]);
                if (count($range) > 1) {
                    $query->where('pp.rating_score', '<=', $range[1]);
                }
            }

        })
        ->distinct();

        $totalRow = $rawData1->get()->count();
        $itemsPaginated = $rawData1->paginate($limit);
        $itemsTransformed = $rawData2->limit($limit)->offset($limit * ($request->input('page',1) -1))->get()->toArray();

        $data = new \Illuminate\Pagination\LengthAwarePaginator(
            $itemsTransformed,
            $totalRow,
            $itemsPaginated->perPage(),
            $itemsPaginated->currentPage(),
            [
                'path' => FacadesRequest::url(),
                'query' => [
                    'page' => $itemsPaginated->currentPage()
                ]
            ]
        );

        return response()->json($data, 200);
    }
}
