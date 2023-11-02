@php
    $project = App\Models\Project::where('deal_id',$contract->deal_id)->first();
@endphp
    @if(Auth::user()->role_id == 1 || Auth::user()->role_id == 7 || Auth::user()->role_id == 8)
    <div class="row mb-4">
        @php
            $web_content = \App\Models\WebContent::where('deal_id',$project->deal_id)->get();
            $blog_article = \App\Models\BlogArticle::where('deal_id',$project->deal_id)->get();
            $product_description = \App\Models\ProductDescription::where('deal_id',$project->deal_id)->get();
            $product_category = \App\Models\ProductCategoryCollection::where('deal_id',$project->deal_id)->get();
            $basic_seo = \App\Models\BasicSeo::where('deal_id',$project->deal_id)->get();
        @endphp
        <div class="col-12">
            <x-cards.data>
                <div class="row">
                    <div class="col-2">
                        <div class="card">
                            <div class="card-body text-center">
                                <h4>Web Content</h4>
                                @if($web_content !=null)
                                    <a href="{{route('viewWebContent',$project->deal_id)}}">( {{count($web_content)}} )</a>
                                @endif
                            </div>
                        </div>
                    </div>
                    <div class="col-2">
                        <div class="card">
                            <div class="card-body text-center">
                                <h4>Blog/Article</h4>
                                @if($blog_article !=null)
                                <a href="{{route('viewBlogArticle',$project->deal_id)}}">( {{count($blog_article)}} )</a>
                                @endif
                            </div>
                        </div>
                    </div>
                    <div class="col-3">
                        <div class="card">
                            <div class="card-body text-center">
                                <h4>Product Description</h4>
                                @if($product_description !=null)
                                <a href="{{route('viewProductDescription',$project->deal_id)}}">( {{count($product_description)}} )</a>
                                @endif
                            </div>
                        </div>
                    </div>
                    <div class="col-3">
                        <div class="card">
                            <div class="card-body text-center">
                                <h4>Product Category/Collection Pages</h4>
                                @if($product_category !=null)
                                <a href="{{route('viewProductCategoryCollection',$project->deal_id)}}">( {{count($product_category)}} )</a>
                                @endif
                            </div>
                        </div>
                    </div>
                    <div class="col-2">
                        <div class="card">
                            <div class="card-body text-center">
                                <h4>Basic SEO</h4>
                                @if($basic_seo !=null)
                                <a href="{{route('viewBasicSEO',$project->deal_id)}}">( {{count($basic_seo)}} )</a>
                                @endif
                            </div>
                        </div>
                    </div>
                </div>
            </x-cards.data>
        </div>
    </div>
    @endif