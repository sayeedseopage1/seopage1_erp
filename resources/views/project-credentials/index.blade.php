@extends('layouts.app')
@section('content')
    <div class="container-fluid">
        <div class="row">
            <div class="col-md-12">
                <div class="card mt-3">
                    <div class="card-title my-3 ml-3">
                        <h3>Project credentials</h3>
                    </div>
                    <div class="card-body" style="background-color: #F2F4F7">
                        <div class="form-group">
                            <h6>Website url</h6>
                            <a href="{{$project_submission->actual_link}}" style="font-size: 16px;">{{$project_submission->actual_link}}</a>
                        </div>
                        <div class="form-group">
                            <h6>Demo website url (If any)</h6>
                            <a href="{{$project_submission->dummy_link}}" style="font-size: 16px;">{{$project_submission->dummy_link}}</a>
                        </div>
                        <div class="form-group">
                            <h6>Admin panel url</h6>
                            <a href="{{$project_submission->login_url}}" style="font-size: 16px;">{{$project_submission->login_url}}</a>
                        </div>
                        <div class="row">
                            <div class="col-md-6 col-sm-6">
                                <div class="form-group">
                                    <h6>Admin panel Username</h6>
                                    <p>{{$project_submission->login}}</p>
                                </div>
                            </div>
                            <div class="col-md-6 col-sm-6">
                                <div class="form-group">
                                    <h6>Admin panel Password</h6>
                                    <p>{{$project_submission->password}}</p>
                                </div>
                            </div>
                        </div>
                        <div class="form-group">
                            <h6>Latest backup of the website file link</h6>
                            <a href="{{$project_submission->google_link}}" style="font-size: 16px;">{{$project_submission->google_link}}</a>
                        </div>
                        <div class="row">
                            <div class="col-md-6 col-sm-6">
                                <div class="form-group">
                                    <h6>Backups will be automatically sent to your email</h6>
                                    <p>{{$project_portfolio->backup_email_address}}</p>
                                </div>
                            </div>
                            <div class="col-md-6 col-sm-6">
                                <div class="form-group">
                                    <h6>Days Interval</h6>
                                    <p>{{$project_portfolio->day_interval}}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="card mt-2" style="background-color: #EBF1FC">
                    <div class="card-body">
                        <h3 class="mb-4">Completed lists of QCs:</h3>
                            <div>
                                <span>
                                    @if($q_c_submission->site_https==1)
                                        <h6><i class="fa fa-bullhorn mr-2" aria-hidden="true"></i>SSL was added.</h6>
                                    @endif
                                </span>
                                <span>
                                    @if($q_c_submission->favicon==1)
                                        <h6><i class="fa fa-bullhorn mr-2" aria-hidden="true"></i> Favicon was added.</h6>
                                    @endif
                                </span>
                                <span>
                                    @if($q_c_submission->webmail==1)
                                        <h6><i class="fa fa-bullhorn mr-2" aria-hidden="true"></i> Webmail functionality checked & working perfectly.</h6>
                                    @endif
                                </span>
                                <span>
                                    @if($q_c_submission->contact_form==1)
                                        <h6><i class="fa fa-bullhorn mr-2" aria-hidden="true"></i> Contact forms were checked and working properly with captcha.</h6>
                                    @endif
                                </span>
                                <span>
                                    @if($q_c_submission->social_media==1)
                                        <h6><i class="fa fa-bullhorn mr-2" aria-hidden="true"></i> Social media links were added and working perfectly.</h6>
                                    @endif
                                </span>
                                <span>
                                    @if($q_c_submission->login_link==1)
                                        <h6><i class="fa fa-bullhorn mr-2" aria-hidden="true"></i> Login page, registration page, top bar links and footer links were checked and working properly.</h6>
                                    @endif
                                </span>
                                <span>
                                    @if($q_c_submission->scroll_down==1)
                                        <h6><i class="fa fa-bullhorn mr-2" aria-hidden="true"></i> Images and sections were checked on all main pages and they are aligned properly.</h6>
                                    @endif
                                </span>
                                <span>
                                    @if($q_c_submission->lorem_text==1)
                                        <h6><i class="fa fa-bullhorn mr-2" aria-hidden="true"></i> Lorem ipsum text was fixed as per agreement.</h6>
                                    @endif
                                </span>
                                <span>
                                    @if($q_c_submission->logical_issues==1)
                                        <h6><i class="fa fa-bullhorn mr-2" aria-hidden="true"></i> All logical issues were checked and confirmed as working properly.</h6>
                                    @endif
                                </span>
                                <span>
                                    @if($q_c_submission->loading_speed==1)
                                        <h6><i class="fa fa-bullhorn mr-2" aria-hidden="true"></i> Site loading speed meets our highest standards.</h6>
                                    @endif
                                </span>
                                <span>
                                    @if($q_c_submission->mobile_speed==1)
                                        <h6><i class="fa fa-bullhorn mr-2" aria-hidden="true"></i> Website responsiveness check and working perfectly.</h6>
                                    @endif
                                </span>
                                <span>
                                    @if($q_c_submission->migration==1)
                                        <h6><i class="fa fa-bullhorn mr-2" aria-hidden="true"></i> Site was migrated to the live server and confirmed the site as crawlable.</h6>
                                    @endif
                                </span>
                                <span>
                                    @if($q_c_submission->links_working==1)
                                        <h6><i class="fa fa-bullhorn mr-2" aria-hidden="true"></i> All the links are working properly.</h6>
                                    @endif
                                </span>
                                <span>
                                    @if($q_c_submission->backup_plugin==1)
                                        <h6><i class="fa fa-bullhorn mr-2" aria-hidden="true"></i> Backup plugin and email was setup properly.</h6>
                                    @endif
                                </span>
                                <span>
                                    @if($q_c_submission->uptime_monitoring==1)
                                        <h6><i class="fa fa-bullhorn mr-2" aria-hidden="true"></i> Uptime monitoring plugin, and necessary emails were added and confirmed about getting notified as soon as the site is down.</h6>
                                    @endif
                                </span>
                                <span>
                                    @if($q_c_submission->file_backup==1)
                                        <h6><i class="fa fa-bullhorn mr-2" aria-hidden="true"></i> Final backuop of the website was kept.</h6>
                                    @endif
                                </span>
                                <span>
                                    @if($q_c_submission->slogan==1)
                                        <h6><i class="fa fa-bullhorn mr-2" aria-hidden="true"></i> Title and tagline was added.</h6>
                                    @endif
                                </span>
                            </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection

