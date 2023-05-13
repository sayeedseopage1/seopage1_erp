@extends('layouts.app')
@section('content')
<style>
    .selectBox{
        width: 7rem;
        background-color: #ffffff;
        border: none;
        box-shadow: 0 0 10px rgba(0,0,0,0.1);
        border-radius: 5px;
        text-align: center;

    }
    .categoryLink{
        background-color: #ffffff;
        box-shadow: 0 0 10px rgba(0,0,0,0.1);
        border-radius: 50px;
    }
    @media (max-width: 580px) {
        .categoryLink {
            margin-bottom: 10px;
        }
        .col-sm-6 {
            width: 100%;
            display: block;
        }
    }
    @media (max-width: 750px) {
        .col-md-3 {
            width: 50%;
        }
        .categoryLink {
            margin-bottom: 10px;
        }
    }
    @media (max-width: 750px) {
        .mediaBox {
            flex-wrap: wrap;
        }
        .col-sm-2 {
            width: 50%;
            margin-bottom: 10px;
        }
    }
    @media (max-width: 750px) {
        .dropdown-toggleMedia {
            display: block;
            width: 100%;
            text-align: left;
        }

        .dropdown-menuMedia {
            position: static;
            float: none;
            width: auto;
            margin-top: 0;
            box-shadow: none;
        }

        .dropdown-itemMedia {
            display: block;
            width: 100%;
            padding: 0.5rem 1rem;
            clear: both;
            font-weight: 400;
            color: #212529;
            text-align: left;
        }

        .dropdown-item:hover {
            color: #16181b;
            background-color: #f8f9fa;
        }
    }
</style>
    <div class="container-fluid">
        <div class="row">
            <div class="col-md-12">
                <div class="card mt-3">
                    <div class="card-body">
                        <div class="row mediaBox">
                            <div class="col-sm-2">
{{--                                {{dd($categories)}}--}}
                                <label for="">Select CMS Category</label><br>
                                <div class="dropdown">
                                    <button class="btn dropdown-toggle selectBox dropdown-toggleMedia" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        All<i class="fa fa-sort-down mb-1 ml-2"></i>
                                    </button>
                                    <div class="dropdown-menu dropdown-menuMedia" aria-labelledby="dropdownMenuButton">
                                        <a class="dropdown-item dropdown-itemMedia" href="#">Action</a>
                                        <a class="dropdown-item dropdown-itemMedia" href="#">Another action</a>
                                    </div>
                                </div>
                            </div>
                            <div class="col-sm-2">
                                <label for="">Website Types</label><br>
                                <div class="dropdown">
                                    <button class="btn dropdown-toggle selectBox dropdown-toggleMedia" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        All<i class="fa fa-sort-down mb-1 ml-2"></i>
                                    </button>
                                    <div class="dropdown-menu dropdown-menuMedia" aria-labelledby="dropdownMenuButton">
                                        <a class="dropdown-item dropdown-itemMedia" href="#">Action</a>
                                        <a class="dropdown-item dropdown-itemMedia" href="#">Another action</a>
                                    </div>
                                </div>
                            </div>
                            <div class="col-sm-2">
                                <label for="">Select Website Category</label><br>
                                <div class="dropdown">
                                    <button class="btn dropdown-toggle selectBox dropdown-toggleMedia" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        All<i class="fa fa-sort-down mb-1 ml-2"></i>
                                    </button>
                                    <div class="dropdown-menu dropdown-menuMedia" aria-labelledby="dropdownMenuButton">
                                        <a class="dropdown-item dropdown-itemMedia" href="#">Action</a>
                                        <a class="dropdown-item dropdown-itemMedia" href="#">Another action</a>
                                    </div>
                                </div>
                            </div>
                            <div class="col-sm-2">
                                <label for="">Select Website Subcategory</label><br>
                                <div class="dropdown">
                                    <button class="btn dropdown-toggle selectBox dropdown-toggleMedia" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        All<i class="fa fa-sort-down mb-1 ml-2"></i>
                                    </button>
                                    <div class="dropdown-menu dropdown-menuMedia" aria-labelledby="dropdownMenuButton">
                                        <a class="dropdown-item dropdown-itemMedia" href="#">Action</a>
                                        <a class="dropdown-item dropdown-itemMedia" href="#">Another action</a>
                                    </div>
                                </div>
                            </div>
                            <div class="col-sm-2">
                                <label for="">Select Website Theme</label><br>
                                <div class="dropdown">
                                    <button class="btn dropdown-toggle selectBox dropdown-toggleMedia" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        All<i class="fa fa-sort-down mb-1 ml-2"></i>
                                    </button>
                                    <div class="dropdown-menu dropdown-menuMedia" aria-labelledby="dropdownMenuButton">
                                        <a class="dropdown-item dropdown-itemMedia" href="#">Action</a>
                                        <a class="dropdown-item dropdown-itemMedia" href="#">Another action</a>
                                    </div>
                                </div>
                            </div>
                            <div class="col-sm-2">
                                <label for="">Select Website Plugin</label><br>
                                <div class="dropdown">
                                    <button class="btn dropdown-toggle selectBox dropdown-toggleMedia" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        All<i class="fa fa-sort-down mb-1 ml-2"></i>
                                    </button>
                                    <div class="dropdown-menu dropdown-menuMedia" aria-labelledby="dropdownMenuButton">
                                        <a class="dropdown-item dropdown-itemMedia" href="#">Action</a>
                                        <a class="dropdown-item dropdown-itemMedia" href="#">Another action</a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <p class="mt-5 f-20">Website Category: Blog</p>

                        <div class="row mt-5">
                            <div class="col-sm-6 col-md-3">
                                <div class="categoryLink">
                                    <img src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50" alt="" class="rounded-circle m-1" width="30" height="30"><span class="ml-2">http://127.0.0.1:8000/portfolio</span>
                                </div>
                            </div>
                            <div class="col-sm-6 col-md-3">
                                <div class="categoryLink">
                                    <img src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50" alt="" class="rounded-circle m-1" width="30" height="30"><span class="ml-2">http://127.0.0.1:8000/portfolio</span>
                                </div>
                            </div>
                            <div class="col-sm-6 col-md-3">
                                <div class="categoryLink">
                                    <img src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50" alt="" class="rounded-circle m-1" width="30" height="30"><span class="ml-2">http://127.0.0.1:8000/portfolio</span>
                                </div>
                            </div>
                            <div class="col-sm-6 col-md-3">
                                <div class="categoryLink">
                                    <img src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50" alt="" class="rounded-circle m-1" width="30" height="30"><span class="ml-2">http://127.0.0.1:8000/portfolio</span>
                                </div>
                            </div>
                        </div>
                        <div class="row mt-3">
                            <div class="col-sm-6 col-md-3">
                                <div class="categoryLink">
                                    <img src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50" alt="" class="rounded-circle m-1" width="30" height="30"><span class="ml-2">http://127.0.0.1:8000/portfolio</span>
                                </div>
                            </div>
                            <div class="col-sm-6 col-md-3">
                                <div class="categoryLink">
                                    <img src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50" alt="" class="rounded-circle m-1" width="30" height="30"><span class="ml-2">http://127.0.0.1:8000/portfolio</span>
                                </div>
                            </div>
                            <div class="col-sm-6 col-md-3">
                                <div class="categoryLink">
                                    <img src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50" alt="" class="rounded-circle m-1" width="30" height="30"><span class="ml-2">http://127.0.0.1:8000/portfolio</span>
                                </div>
                            </div>
                            <div class="col-sm-6 col-md-3">
                                <div class="categoryLink">
                                    <img src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50" alt="" class="rounded-circle m-1" width="30" height="30"><span class="ml-2">http://127.0.0.1:8000/portfolio</span>
                                </div>
                            </div>
                        </div>
                        <div class="row mt-3">
                            <div class="col-sm-6 col-md-3">
                                <div class="categoryLink">
                                    <img src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50" alt="" class="rounded-circle m-1" width="30" height="30"><span class="ml-2">http://127.0.0.1:8000/portfolio</span>
                                </div>
                            </div>
                            <div class="col-sm-6 col-md-3">
                                <div class="categoryLink">
                                    <img src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50" alt="" class="rounded-circle m-1" width="30" height="30"><span class="ml-2">http://127.0.0.1:8000/portfolio</span>
                                </div>
                            </div>
                            <div class="col-sm-6 col-md-3">
                                <div class="categoryLink">
                                    <img src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50" alt="" class="rounded-circle m-1" width="30" height="30"><span class="ml-2">http://127.0.0.1:8000/portfolio</span>
                                </div>
                            </div>
                            <div class="col-sm-6 col-md-3">
                                <div class="categoryLink">
                                    <img src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50" alt="" class="rounded-circle m-1" width="30" height="30"><span class="ml-2">http://127.0.0.1:8000/portfolio</span>
                                </div>
                            </div>
                        </div>

                        <section style="background-color: #f4f4f4" class="py-3 mt-3">
                            <div class="container-fluid">
                                <div class="mb-3">
                                    <h5 class="f-20">Project Title:</h5>
                                    <span>Blog page of NCC News</span>
                                </div>
                                <div class="mb-3">
                                    <span class="f-20">Client Name:</span><br>
                                    <img src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50" alt="" class="rounded-circle m-1" width="30" height="30"><span class="ml-2">dasdsdas</span>
                                </div>
                                <div class="row">
                                    <div class="col-md-6 mb-3 mb-md-0">
                                        <h5>Website Link:</h5>
                                        <span>http://127.0.0.1:8000/portfolio</span>
                                    </div>
                                    <div class="col-md-6">
                                        <h5>Agree price:</h5>
                                        <span>$ 3587 USD</span>
                                    </div>
                                </div>
                                <div class="row mt-3">
                                    <div class="col-md-6 mb-3 mb-md-0">
                                        <h5>Final price with bonus and additional requirements:</h5>
                                        <span>$ 4654 USD</span>
                                    </div>
                                    <div class="col-md-6 d-flex">
                                        <h5>Theme Name:</h5>
                                        <p class="ml-2">Avada</p>
                                    </div>
                                </div>
                                <div class="row mt-3">
                                    <div class="col-md-6 mb-3 mb-md-0">
                                        <h5>Total estimated hours:</h5>
                                        <span>350 Hours & 25 Min</span>
                                    </div>
                                    <div class="col-md-6">
                                        <h5>Total Logged hours:</h5>
                                        <p class="ml-2">250 Hours & 10 Min</p>
                                    </div>
                                </div>
                                <div class="row mt-3">
                                    <div class="col-md-6 mb-3 mb-md-0">
                                        <h5>Average hourly price based on the final logged hours:</h5>
                                        <span>$ 50 USD</span>
                                    </div>
                                    <div class="col-md-6">
                                        <h5>Total number of pages with page numbers:</h5>
                                        <p class="ml-2">04 page (Home, about us, Blog, contact Us)</p>
                                    </div>
                                </div>
                                <div class="mt-3">
                                    <h5>Any major function (With name of the functionality, a brief description with screenshot)</h5>
                                    <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque sapien velit, aliquet eget commodo nec, auctor a sapien. Nam eu neque vulputate diam rhoncus faucibus. Curabitur quis varius libero. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam placerat sem at mauris suscipit porta. Cras metus velit, elementum sed pellentesque a, pharetra eu eros. Etiam facilisis placerat euismod. Nam faucibus neque arcu, quis accumsan leo tincidunt varius. In vel diam enim. Sed id ultrices ligula. Maecenas at urna arcu. Sed quis nulla sapien. Nam felis mauris, tincidunt at convallis id, tempor molestie libero. Quisque viverra sollicitudin nisl sit amet hendrerit. Etiam sit amet arcu sem. Morbi eu nibh condimentum, interdum est quis, tempor nisi. Vivamus convallis erat in pharetra elementum. Phasellus metus neque, commodo vitae venenatis sed, pellentesque non purus. Pellentesque egestas convallis suscipit. Ut luctus, leo quis porta vulputate, purus purus pellentesque ex, id consequat mi nisl quis eros. Integer ornare libero quis risus fermentum consequat. Mauris pharetra odio sagittis, vulputate magna at, lobortis nulla. Proin efficitur, nisi vel finibus elementum, orci sem volutpat eros, eget ultrices velit mi sagittis massa. Vestibulum sagittis ullamcorper cursus. Ut turpis dolor, tempor ut tellus et, sodales ultricies elit. Ut pharetra tristique est ac dictum. Integer ac consectetur purus, vehicula efficitur urna. Donec ultrices accumsan ipsum vitae faucibus. Quisque malesuada ex nisi, a bibendum erat commodo in. Pellentesque suscipit varius gravida. Nam scelerisque est sit amet laoreet pharetra. Vivamus quis ligula sed lacus mattis mollis. Vivamus facilisis orci rutrum nulla porta dignissim. Fusce fermentum id nibh laoreet volutpat. Suspendisse venenatis, risus sed euismod finibus, risus arcu fringilla augue, nec vulputate felis nisl et enim. In ornare, massa a cursus cursus, nisl mi ornare mauris, nec porttitor risus erat ut odio. Integer malesuada hendrerit purus ullamcorper molestie. Fusce imperdiet orci vitae purus suscipit rutrum. Nunc ac metus ac mi commodo sagittis at in leo. Vestibulum est lorem, consequat vel dictum non, imperdiet eu felis. Vivamus molestie sapien id quam rutrum, eget hendrerit eros finibus. Morbi in justo at felis blandit fringilla at faucibus purus. Donec ac aliquet purus, vitae tincidunt nulla. Curabitur ultricies auctor quam tincidunt molestie. Quisque tristique metus nunc, in pretium lectus dictum at. Nullam scelerisque placerat dui, maximus commodo augue mollis quis. Nulla gravida ex sed lectus consectetur laoreet et vel ex. Proin pretium libero non leo mattis, ullamcorper scelerisque diam hendrerit. Quisque gravida, dui a porttitor interdum, velit quam pulvinar arcu, eu blandit sapien velit ut lacus. Vestibulum congue eleifend odio, in aliquam leo sodales sed. Nam eu lacinia ipsum. Aenean sagittis nisl eu sodales lacinia. Duis nulla ante, suscipit a nibh sit amet, blandit luctus elit.</span>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection
