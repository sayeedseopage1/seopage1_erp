<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Project;
use App\Models\ProjectCms;
use App\Models\ProjectNiche;
use App\Models\ProjectPortfolio;
use App\Models\ProjectWebsitePlugin;
use App\Models\ProjectWebsiteTheme;
use App\Models\ProjectWebsiteType;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use function Google\Auth\Cache\get;
use function Symfony\Component\HttpClient\Response\select;

class PortfolioController extends AccountBaseController
{
    public function __construct()
    {
        parent::__construct();
        $this->pageTitle = 'Portfolio';
        $this->activeSettingMenu = 'portfolio';
        $this->middleware(function ($request, $next) {
            abort_403(user()->permission('manage_company_setting') !== 'all');
            return $next($request);
        });
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

    public function filterDataShow($dataId)
    {
        $portfolio = DB::table('project_portfolios')
            ->select('project_portfolios.*', 'users.user_name', 'projects.project_name', 'projects.project_budget', 'project_submissions.actual_link', 'niche.category_name','sub_niche.id')
            ->join('projects', 'project_portfolios.project_id', '=', 'projects.id')
            ->join('project_niches as niche', 'project_portfolios.niche', '=', 'niche.id')
            ->leftJoin('project_niches as sub_niche', 'project_portfolios.sub_niche', '=', 'sub_niche.id')
            ->join('users', 'projects.client_id', '=', 'users.id')
            ->join('project_submissions', 'project_portfolios.project_id', '=', 'project_submissions.project_id')
           
            ->where('project_portfolios.id', $dataId)
            ->first();
       // dd($portfolio);

//        dd($portfolio);


        $html = view('portfolio.portfolio_modal', [
            'portfolio' => $portfolio
        ])->render();
        return response($html);
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
        //
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
