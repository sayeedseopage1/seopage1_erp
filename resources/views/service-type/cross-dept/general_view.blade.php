@extends('layouts.app')
@section('content')
@php
    $web_content = \App\Models\WebContent::all();
    $blog_article = \App\Models\BlogArticle::all();
    $product_description = \App\Models\ProductDescription::all();
    $product_category = \App\Models\ProductCategoryCollection::all();
    $basic_seo = \App\Models\BasicSeo::all();
@endphp
    <div class="container-fluid">
        <div class="row">
            <div class="col-md-12">
                <div class="card mt-3 p-3" style="border: none">
                    <div class="card-body">
                        <div class="row">
                            <div class="col-2">
                                <div class="card">
                                    <div class="card-body text-center">
                                        <h4>Web Content</h4>
                                        @if($web_content !=null)
                                            <a href="{{route('adminViewWebContent')}}">( {{count($web_content)}} )</a>
                                        @endif
                                    </div>
                                </div>
                            </div>
                            <div class="col-2">
                                <div class="card">
                                    <div class="card-body text-center">
                                        <h4>Blog/Article</h4>
                                        @if($blog_article !=null)
                                        <a href="{{route('adminViewBlogArticle')}}">( {{count($blog_article)}} )</a>
                                        @endif
                                    </div>
                                </div>
                            </div>
                            <div class="col-3">
                                <div class="card">
                                    <div class="card-body text-center">
                                        <h4>Product Description</h4>
                                        @if($product_description !=null)
                                        <a href="{{route('adminViewProductDescription')}}">( {{count($product_description)}} )</a>
                                        @endif
                                    </div>
                                </div>
                            </div>
                            <div class="col-3">
                                <div class="card">
                                    <div class="card-body text-center">
                                        <h4>Product Category/Collection Pages</h4>
                                        @if($product_category !=null)
                                        <a href="{{route('adminViewProductCategory')}}">( {{count($product_category)}} )</a>
                                        @endif
                                    </div>
                                </div>
                            </div>
                            <div class="col-2">
                                <div class="card">
                                    <div class="card-body text-center">
                                        <h4>Basic SEO</h4>
                                        @if($basic_seo !=null)
                                        <a href="{{route('adminViewBasicSEO')}}">( {{count($basic_seo)}} )</a>
                                        @endif
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection
