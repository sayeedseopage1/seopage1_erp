<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Project;
use App\Models\ProjectCms;
use App\Models\ProjectNiche;
use App\Models\ProjectPortfolio;
use App\Models\ProjectWebsiteTheme;
use App\Models\ProjectWebsiteType;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
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
//        $this->website_themes = ProjectWebsiteTheme::all();

        $this->portfolios = DB::table('project_portfolios')
            ->join('projects', 'project_portfolios.project_id', '=', 'projects.id')
            ->join('users', 'projects.client_id', '=', 'users.id')
            ->select('project_portfolios.*','users.user_name','projects.project_name', 'projects.project_budget')
            ->get();

//                dd($this->portfolios);
        return view('portfolio.index',$this->data);
    }

    public function getSubCategory($website_cat_id)
    {
//        dd($website_cat_id);
        $website_sub_cats = ProjectNiche::find($website_cat_id)->child;
        return response()->json($website_sub_cats);
    }


    public function filterCmsCategories(Request $request)
    {
//                dd($request->all());
        if (!is_null($request->input('category_id'))) {
            $selectedCategoryId = $request->input('category_id');
            $filteredCategories = ProjectPortfolio::where('cms_category', $selectedCategoryId);
        }

        if (!is_null($request->input('website_type'))) {
            $selectedCategoryId = $request->input('website_type');
            $filteredCategories = ProjectPortfolio::where('website_type', $selectedCategoryId);
        }

        if (!is_null($request->input('website_category'))) {
            $selectedCategoryId = $request->input('website_category');
            $filteredCategories = ProjectPortfolio::where('niche', $selectedCategoryId);
        }

        if (!is_null($request->input('sub_niche'))) {
            $selectedCategoryId = $request->input('sub_niche');
            $filteredCategories = ProjectPortfolio::where('sub_niche', $selectedCategoryId);
        }

        if (!is_null($request->input('theme_name'))) {
            $selectedCategoryId = $request->input('theme_name');
            $filteredCategories = ProjectPortfolio::where('id', $selectedCategoryId);
        }

        if (!is_null($request->input('website_plugin'))) {
            $selectedCategoryId = $request->input('website_plugin');
            $filteredCategories = ProjectPortfolio::where('id', $selectedCategoryId);
        }

        $filteredCategories = $filteredCategories->get();


//        dd($filteredCategories);
        return response()->json($filteredCategories);
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
