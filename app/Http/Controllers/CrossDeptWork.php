<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\BasicSeo;
use App\Models\BlogArticle;
use App\Models\ProductCategoryCollection;
use App\Models\ProductDescription;
use App\Models\WebContent;
use Illuminate\Http\Request;

class CrossDeptWork extends AccountBaseController
{
    public function __construct()
    {
        parent::__construct();
        $this->pageTitle = 'Cross Dept Work';

    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return view('service-type.cross-dept.general_view',$this->data);
    }

    public function adminViewWebContent(){
        $this->pageTitle = 'Web Content';
        $this->web_contents = WebContent::all();
        return view('service-type.cross-dept.admin_web_content',$this->data);
    }
    public function adminViewBlogArticle(){
        $this->pageTitle = 'Blog Article';
        $this->blog_articles = BlogArticle::all();
        return view('service-type.cross-dept.admin_blog_article',$this->data);
    }
    public function adminViewProductDescription(){
        $this->pageTitle = 'Product Description';
        $this->product_descriptions = ProductDescription::all();
        return view('service-type.cross-dept.admin_product_description',$this->data);
    }
    public function adminViewProductCategory(){
        $this->pageTitle = 'Product Category';
        $this->product_categories = ProductCategoryCollection::all();
        return view('service-type.cross-dept.admin_product_category',$this->data);
    }
    public function adminViewBasicSEO(){
        $this->pageTitle = 'Basic SEO';
        $this->basic_seo = BasicSeo::all();
        return view('service-type.cross-dept.admin_basic_seo',$this->data);
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
