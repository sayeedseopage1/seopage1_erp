@extends('layouts.app')



@section('filter-section')






@endsection

@php
$addContractPermission = user()->permission('add_contract');
$manageContractTemplatePermission = user()->permission('manage_contract_template');

@endphp

@section('content')

@push('styles')

<link rel="stylesheet"
href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css"
integrity="sha512-xh6O/CkQoPOWDdYTDqeRdPCVd1SpvCA9XXcUnZS2FmJNp1coAFzvtCN9BmamE+4aHK8yyUHUSCcJHgXloTyT2A=="
crossorigin="anonymous" referrerpolicy="no-referrer"/>
<link href="https://cdn.jsdelivr.net/npm/summernote@0.8.18/dist/summernote.min.css" rel="stylesheet" />
<link rel="stylesheet" href="http://cdn.bootcss.com/toastr.js/latest/css/toastr.min.css">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet">

<style>
    .custom_container{

    }
    .seopage_card {
        box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 50px;
        padding: 5%;
        margin: 5% auto;
        display: block;
        border-radius: 30px;
    }
    .details-seopage1 {
        width: 100%;
        height: auto;
        padding: 5px;
        background: #F3F9FE;
        border-radius: 5px;
    }
    .info_dets h5{
        font-family: Poppins;
        font-size: 22px;
        font-weight: normal;
        line-height: 1.48;
        text-align: left;
        color: #41b4e1;
    }
    .info_dets h6 {
        font-family: Poppins;
        font-size: 13px;
        font-weight: 600;
        line-height: 1.48;
        color: #333;
    }
    .info_dets a {
        padding: 3px 14px;
        font-size: 12px;
        font-weight: 500;
    }
    .details-seopage1 h4{
        font-family: Poppins;
        font-size: 22px;
        font-weight: normal;
        line-height: 1.48;
        text-align: left;
        color: #41b4e1;
    }
    .details-seopage1 p {
        font-size: 16px;
        font-weight: normal;
        font-stretch: normal;
        font-style: normal;
        line-height: 1.5;
        letter-spacing: normal;
        text-align: left;
        color: #6a6a6a;
        margin: 5px 0;
    }
    #textcopyseopage1 a{
        font-size: 16px;
        font-weight: normal;
        line-height: 1.5;
        text-align: left;
        color: #41b4e1;
        text-decoration: none;
    }
    .details-seopage1 p span {
        font-weight: 500;
        color: #333;
    }

    .deal {
        background: #eee;
        padding: 4%;
        color: #888;
        display: flex;
        flex-wrap: nowrap;
        align-items: center;
        clip-path: polygon(95% 0%, 100% 50%, 95% 100%, 0% 100%, 5% 50%, 0% 0%);
        justify-content: center;
        align-content: center;
        flex-direction: row;
    }
    .deal i {
        padding-right: 6px;
        font-size: 15px;
    }

    .custom-active{
        background: #119143;
        color: #fff;
    }
    .nopadding h3 {
        padding: 10px 0;
        text-align: center;
        font-family: Poppins;
        font-size: 16px;
        font-weight: 500;
        line-height: 1.56;
        letter-spacing: normal;
        color: #1d82f5;
    }

    .nopadding {
        padding: 0 !important;
        margin: 0 !important;
        width: 20%;
    }
    /* deal_item  */

    .seodeals_item {
        padding: 0 14px;
    }
    .deal_item {
        width: 100%;
        border-radius: 10px;
        background-color: #F3F9FF;
        padding: 26px 0;
        display: flex;
        justify-content: space-around;
        flex-wrap: nowrap;
        flex-direction: column;
        align-content: center;
        padding-left: 20px;
        box-shadow: 0 20px 40px 0 rgba(235, 235, 235, 0.16);
        height: 100%;
    }

    .deal_item i {
        width: 22px;
        height: auto;
    }

    .deal_item h3, .deal_item2 h3 {
        margin: 8px 0 0 5px;
        font-family: Poppins;
        font-size: 16px;
        font-weight: normal;
        line-height: 1.48;
        color: #1d82f5;
    }

    .deal_item span {
        margin: 12px 0 0;
        font-family: Poppins;
        font-size: 12px;
        font-weight: normal;
        line-height: 1.5;
        color: #6a6a6a;
    }

    .deal_item2 {
        width: 100%;
        min-height: 150px;
        padding: 26px 0;
        border-radius: 10px;
        background-color: #F3F9FF;
        height: auto;
    }



    .deal_item2 a{
        font-family: Poppins;
        font-size: 14px;
        font-weight: normal;
        line-height: 1.5;
        color: #fff;
    }

    .wons {
        margin: 0 13px 0 0;
        padding: 8px 27px 7px;
        border-radius: 5px;
        background-color: #119143;
    }
    .loss{
        margin: 0 13px 0 0;
        padding: 8px 27px 7px;
        border-radius: 5px;
        background-color: #d30000;
    }
    .sbinfo {
        display: flex;
        align-items: center;
        justify-content: space-between;
        align-content: space-between;
    }
    .sbinfo ul {
        margin: 0;
        padding: 0;
        display: flex;
        align-content: flex-start;
    }
    .sbinfo ul li {
        list-style: none;
        font-family: Poppins;
        font-size: 12px;
        font-weight: 300;
        font-style: normal;
        line-height: 1.6;
        text-align: left;
        color: #1d82f5;
        overflow: visible;
        display: inline-block;
        width: 112px;
    }


    .sbinfo ul li:nth-child(2) {
        padding-right: 0px;
        padding-left: 5px;
        width: 60px;
    }
    .sbinfo ul li:nth-child(3) {
        padding-right: 0px;
        padding-left: 5px;
        width: 60px;
    }

    .custom_scroling_seo {
        width: 100%;
        height: 160px;
        overflow: auto;
    }

   /* ===== Scrollbar CSS ===== */
    /* Firefox */
    .custom_scroling_seo{
        scrollbar-width: auto;
        scrollbar-color: #1D82F5 #ffffff;
    }

    /* Chrome, Edge, and Safari */
    .custom_scroling_seo::-webkit-scrollbar {
        width: 12px;
    }

    .custom_scroling_seo::-webkit-scrollbar-track {
        background: #ffffff;
    }

    .custom_scroling_seo::-webkit-scrollbar-thumb {
        background-color: #1D82F5;
        border-radius: 10px;
        border: 3px solid #ffffff;
    }

   /* add comments  */

   .form-floating>label {
        font-size: 12px;
    }

   .form-floating textarea{
    border-radius: 10px;
   }

   .comment-add {
        border: 1px solid #eee;
        padding: 11px;
        border-radius: 7px;
        background: #F3F9FE;
        width: 86%;
        margin: 0 auto;
    }

    .comments-section .comment_btn {
        padding: 4px 4px;
        color: #fff;
        letter-spacing: 1px;
        font-family: 'Poppins';
        font-weight: 400;
        float: right;
    }

    .comments-section .btn-default:hover {
        background-color: #111;
        color: #fff;
    }

    .comment_btn {
        display: inline-block;
        font-weight: 400;
        line-height: 1.5;
        color: #fff;
        text-align: center;
        text-decoration: none;
        vertical-align: middle;
        cursor: pointer;
        -webkit-user-select: none;
        -moz-user-select: none;
        user-select: none;
        background-color: #1D82F5;
        padding: .375rem .75rem;
        font-size: 10px;
        border-radius: .25rem;
        transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;
    }


    /* input file  */


    .wrapper {
        padding: 0px;
        text-align: right;
    }

    .wrapper #file-input{
    display:none;
    }

    .wrapper label[for='file-input'] * {
        vertical-align: middle;
        cursor: pointer;
        font-size: 19px;
        color: #1D82F5;
    }

    .wrapper label[for='file-input'] span{
    margin-left: 10px
    }

    .wrapper i.remove{
    vertical-align:middle;
    margin-left: 5px;
    cursor:pointer;
    display:none;
    }

    .seopage1_attach{
        padding-bottom: 5px;
    }
    .seopage1_attach a {
        font-size: 10px;
        font-family: 'Poppins';
    }

    svg.svg-inline--fa.fa-times-circle.fa-w-16.remove {
    display: none !important;
}

    /* custom container */

    .custom_container{
      max-width: 1440px;
      margin: 0 auto;
      display: block;
    }
    @media (min-width: 768px) and (max-width: 1024px) {
        .nopadding {
            padding: 0 !important;
            margin: 0 !important;
            width: 33%;
        }
        .comment-add {
            width: 83%;
        }
        .sbinfo ul li {
            font-size: 10px;
            width: 100%;
        }
        .sbinfo ul li:nth-child(2) {
            padding-right: 0px;
            padding-left: 10px;
            width: 100%;
        }
        .sbinfo ul li:nth-child(3) {
            padding-right: 0px;
            padding-left: 10px;
            width: 100%;
        }
        .comments-section {
            margin-bottom: 30px;
        }
        .deal_item2 {
            width: 100%;
            min-height: 150px;
            padding: 26px 0;
            border-radius: 10px;
            background-color: #F3F9FF;
            display: flex;
            height: 100%;
            flex-direction: column;
            justify-content: space-between;
            align-items: center;
        }
    }
    @media (min-width: 320px) and (max-width: 767.98px) {
        .deal_item {
            margin: 5px 0;
        }
        .deal_item2 {
            margin: 5px 0;
        }
        .nopadding {
            padding: 0 !important;
            margin: 0 !important;
            width: 100%;
        }
        .comments-section {
            margin-bottom: 30px;
        }
        .comment-add {
            width: 91%;
        }
        .sbinfo ul li {
            width: 50%;
        }
        .sbinfo ul li:nth-child(2) {
            width: 95px;
        }
        .sbinfo ul li:nth-child(3) {
            width: auto;
        }
        .sbinfo ul {
            display: flex;
            align-content: space-around;
            height: 100%;
            width: 100%;
            justify-content: space-around;
            align-items: center;
        }
    }


</style>
@endpush


    <?php

      $currency=App\Models\Currency::where('id',$deal->original_currency_id)->first();
      $lead_converted_date= $deal->created_at->diffForHumans();
      //$value= $deal->actual_amount. $currency->currency_symbol;
    //  $bid_value= $deal->bid_value. $currency->currency_symbol;
    //  dd($deal);
    //  dd($deal);
       ?>
       <section class="seodeals py-5">
           <div class="custom_container">
               <div class="row">
                   <div class="col-md-4">
                       <div class="deal_item">
                           <h3><i class="fa-solid fa-user-large"></i> Client Name: <span>{{$deal->client_username}}</span> </h3>
                           <h3><i class="fa-solid fa-money-bill-transfer"></i> Converted On: <span>{{$deal->created_at->format('d M, Y')}}</span> <span>({{$deal->created_at->format('h : i A')}})</span> </h3>
                           @if($deal->won_lost == null)
                            <h3><i class="fa-solid fa-hands-bubbles"></i> Deal Won/Lost: <span>N\A</span> </h3>
                            @else
                           <h3><i class="fa-solid fa-hands-bubbles"></i> Deal Won/Lost: <span>23 Jan, 2023</span> <span>(10 : 20 PM)</span> </h3>
                           @endif
                       </div>
                   </div>

                   <div class="col-md-4">
                       <div class="deal_item">
                           <h3><i class="fa-solid fa-list-check"></i> Project Name: <span>{{$deal->project_name}}</span> </h3>
                           <h3><i class="fa-solid fa-sack-dollar"></i> Project Budget: <span>{{$currency->currency_symbol}}{{$deal->actual_amount}}</span> </h3>
                        {{--<h3><i class="fa-solid fa-medal"></i> Skills: <span>PHP, Laravel, MySQL, Git, React.js</span></h3>--}}
                       </div>
                   </div>

                   <div class="col-md-4 text-center">
                       <div class="deal_item2">
                           <h3>Deal Status</h3><br>
                           <a href="#" class="btn btn-success wons">Won The Deal</a>
                           <a href="#" class="btn btn-danger loss">Lost The Deal</a>
                       </div>
                   </div>

               </div>
           </div>
       </section>

       <section class="sp_steps">
           <div class="custom_container">
               <div class="rows">
                       <!-- info  -->

                       <div class="row seodeals_item pb-4">
                           <div class="nopadding">
                               <div class="deal custom-active" data-bs-whatever="@mdo">
                                   <i class="fa-solid fa-clock"></i>  <span>   {{$lead_converted_date}}</span>
                               </div>
                               <h3>Contact Made</h3>

                               <div class="custom_scroling_seo">
                                   <div class="details-seopage1 mb-2">
                                       <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras non dolor sapien. </p>

                                       <div class="seopage1_attach">
                                           <a href="#" target="_blank"><i class="fa fa-paperclip"></i>Attachments</a>
                                           <a href="#" target="_blank"><i class="fa fa-paperclip"></i>Attachments</a>
                                           <a href="#" target="_blank"><i class="fa fa-paperclip"></i>Attachments</a>
                                       </div>

                                       <div class="sbinfo">
                                           <ul>
                                               <li>Riad Hasan</li>
                                               <li>10/20/22</li>
                                               <li>12: 20 PM</li>
                                           </ul>
                                       </div>
                                   </div>


                               </div>

                               <div class="dealstage_comments_box mt-4">

                                   <div class="comments-section">
                                       <div class="row">

                                           <div class="comment-add">
                                               <div class="col-md-12">
                                                   <form action="">
                                                       <div class="form-floating mb-3">
                                                           <textarea class="form-control" rows="3" cols="20" placeholder="Leave a comment here" id="floatingTextarea2" style="height: auto"></textarea>

                                                       </div>

                                                       <div class="wrapper">
                                                           <input type="file" id="file-input">
                                                           <label for="file-input">

                                                             <i class="fa fa-paperclip fa-2x"></i>
                                                             <span></span>
                                                           </label>

                                                           <i class="fa fa-times-circle remove"></i>
                                                           <input type="submit" class="btn btn-default pull-right comment_btn text-end" value="Comment">
                                                         </div>

                                                   </form>
                                               </div>
                                           </div>
                                       </div>
                                   </div>
                               </div>

                           </div>

                           <!-- nopadding  -->


                           <div class="nopadding">
                               <div class="deal" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@mdo">
                                   <i class="fa-solid fa-clock"></i>  <span> 1 hours Ago</span>
                               </div>
                               <h3>Qualified</h3>

                               <div class="custom_scroling_seo">
                                   <div class="details-seopage1 mb-2">
                                       <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras non dolor sapien. </p>

                                       <div class="seopage1_attach">
                                           <a href="#" target="_blank"><i class="fa fa-paperclip"></i>Attachments</a>
                                           <a href="#" target="_blank"><i class="fa fa-paperclip"></i>Attachments</a>
                                           <a href="#" target="_blank"><i class="fa fa-paperclip"></i>Attachments</a>
                                       </div>

                                       <div class="sbinfo">
                                           <ul>
                                               <li>Riad Hasan</li>
                                               <li>10/20/22</li>
                                               <li>12: 20 PM</li>
                                           </ul>
                                       </div>
                                   </div>

                                   <div class="details-seopage1 mb-2">
                                       <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras non dolor sapien. </p>
                                       <div class="sbinfo">
                                           <ul>
                                               <li>Riad Hasan khan khan</li>
                                               <li>10/20/22</li>
                                               <li>12: 20 PM</li>
                                           </ul>
                                       </div>
                                   </div>

                                   <div class="details-seopage1 mb-2">
                                       <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras non dolor sapien. </p>
                                       <div class="sbinfo">
                                           <ul>
                                               <li>Riad Hasan khan</li>
                                               <li>10/20/22</li>
                                               <li>12: 20 PM</li>
                                           </ul>
                                       </div>
                                   </div>

                                   <div class="details-seopage1 mb-2">
                                       <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras non dolor sapien. </p>
                                       <div class="sbinfo">
                                           <ul>
                                               <li>Riad Hasan</li>
                                               <li>10/20/22</li>
                                               <li>12: 20 PM</li>
                                           </ul>
                                       </div>
                                   </div>

                                   <div class="details-seopage1 mb-2">
                                       <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras non dolor sapien. </p>
                                       <div class="sbinfo">
                                           <ul>
                                               <li>Riad Hasan</li>
                                               <li>10/20/22</li>
                                               <li>12: 20 PM</li>
                                           </ul>
                                       </div>
                                   </div>
                                   <div class="details-seopage1 mb-2">
                                       <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras non dolor sapien. </p>
                                       <div class="sbinfo">
                                           <ul>
                                               <li>Riad Hasan</li>
                                               <li>10/20/22</li>
                                               <li>12: 20 PM</li>
                                           </ul>
                                       </div>
                                   </div>
                               </div>

                               <div class="dealstage_comments_box mt-4">

                                   <div class="comments-section">
                                       <div class="row">

                                           <div class="comment-add">
                                               <div class="col-md-12">
                                                   <form action="">
                                                       <div class="form-floating mb-3">
                                                           <textarea class="form-control" rows="3" cols="20" placeholder="Leave a comment here" id="floatingTextarea2" style="height: auto"></textarea>

                                                       </div>

                                                       <div class="wrapper">
                                                           <input type="file" id="file-input">
                                                           <label for="file-input">

                                                             <i class="fa fa-paperclip fa-2x"></i>
                                                             <span></span>
                                                           </label>

                                                           <i class="fa fa-times-circle remove"></i>
                                                           <input type="submit" class="btn btn-default pull-right comment_btn text-end" value="Comment">
                                                         </div>



                                                   </form>
                                               </div>
                                           </div>
                                       </div>
                                   </div>
                               </div>
                           </div>

                           <!-- nopadding  -->

                           <div class="nopadding">
                               <div class="deal" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@mdo">
                                   03 hours Ago
                               </div>
                               <h3>Requirements Defined</h3>

                               <div class="custom_scroling_seo">
                                   <div class="details-seopage1 mb-2">
                                       <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras non dolor sapien. </p>

                                       <div class="seopage1_attach">
                                           <a href="#" target="_blank"><i class="fa fa-paperclip"></i>Attachments</a>
                                           <a href="#" target="_blank"><i class="fa fa-paperclip"></i>Attachments</a>
                                           <a href="#" target="_blank"><i class="fa fa-paperclip"></i>Attachments</a>
                                       </div>

                                       <div class="sbinfo">
                                           <ul>
                                               <li>Riad Hasan</li>
                                               <li>10/20/22</li>
                                               <li>12: 20 PM</li>
                                           </ul>
                                       </div>
                                   </div>

                                   <div class="details-seopage1 mb-2">
                                       <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras non dolor sapien. </p>
                                       <div class="sbinfo">
                                           <ul>
                                               <li>Riad Hasan khan khan</li>
                                               <li>10/20/22</li>
                                               <li>12: 20 PM</li>
                                           </ul>
                                       </div>
                                   </div>

                                   <div class="details-seopage1 mb-2">
                                       <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras non dolor sapien. </p>
                                       <div class="sbinfo">
                                           <ul>
                                               <li>Riad Hasan khan</li>
                                               <li>10/20/22</li>
                                               <li>12: 20 PM</li>
                                           </ul>
                                       </div>
                                   </div>

                                   <div class="details-seopage1 mb-2">
                                       <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras non dolor sapien. </p>
                                       <div class="sbinfo">
                                           <ul>
                                               <li>Riad Hasan</li>
                                               <li>10/20/22</li>
                                               <li>12: 20 PM</li>
                                           </ul>
                                       </div>
                                   </div>

                                   <div class="details-seopage1 mb-2">
                                       <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras non dolor sapien. </p>
                                       <div class="sbinfo">
                                           <ul>
                                               <li>Riad Hasan</li>
                                               <li>10/20/22</li>
                                               <li>12: 20 PM</li>
                                           </ul>
                                       </div>
                                   </div>
                                   <div class="details-seopage1 mb-2">
                                       <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras non dolor sapien. </p>
                                       <div class="sbinfo">
                                           <ul>
                                               <li>Riad Hasan</li>
                                               <li>10/20/22</li>
                                               <li>12: 20 PM</li>
                                           </ul>
                                       </div>
                                   </div>
                               </div>

                               <div class="dealstage_comments_box mt-4">

                                   <div class="comments-section">
                                       <div class="row">

                                           <div class="comment-add">
                                               <div class="col-md-12">
                                                   <form action="">
                                                       <div class="form-floating mb-3">
                                                           <textarea class="form-control" rows="3" cols="20" placeholder="Leave a comment here" id="floatingTextarea2" style="height: auto"></textarea>

                                                       </div>

                                                       <div class="wrapper">
                                                           <input type="file" id="file-input">
                                                           <label for="file-input">

                                                             <i class="fa fa-paperclip fa-2x"></i>
                                                             <span></span>
                                                           </label>

                                                           <i class="fa fa-times-circle remove"></i>
                                                           <input type="submit" class="btn btn-default pull-right comment_btn text-end" value="Comment">
                                                         </div>



                                                   </form>
                                               </div>
                                           </div>
                                       </div>
                                   </div>
                               </div>
                           </div>

                           <!-- nopadding  -->

                           <div class="nopadding">
                               <div class="deal" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@mdo">
                                   04 hours Ago
                               </div>
                               <h3>Proposal Made</h3>

                               <div class="custom_scroling_seo">
                                   <div class="details-seopage1 mb-2">
                                       <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras non dolor sapien. </p>

                                       <div class="seopage1_attach">
                                           <a href="#" target="_blank"><i class="fa fa-paperclip"></i>Attachments</a>
                                           <a href="#" target="_blank"><i class="fa fa-paperclip"></i>Attachments</a>
                                           <a href="#" target="_blank"><i class="fa fa-paperclip"></i>Attachments</a>
                                       </div>

                                       <div class="sbinfo">
                                           <ul>
                                               <li>Riad Hasan</li>
                                               <li>10/20/22</li>
                                               <li>12: 20 PM</li>
                                           </ul>
                                       </div>
                                   </div>

                                   <div class="details-seopage1 mb-2">
                                       <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras non dolor sapien. </p>
                                       <div class="sbinfo">
                                           <ul>
                                               <li>Riad Hasan khan khan</li>
                                               <li>10/20/22</li>
                                               <li>12: 20 PM</li>
                                           </ul>
                                       </div>
                                   </div>

                                   <div class="details-seopage1 mb-2">
                                       <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras non dolor sapien. </p>
                                       <div class="sbinfo">
                                           <ul>
                                               <li>Riad Hasan khan</li>
                                               <li>10/20/22</li>
                                               <li>12: 20 PM</li>
                                           </ul>
                                       </div>
                                   </div>

                                   <div class="details-seopage1 mb-2">
                                       <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras non dolor sapien. </p>
                                       <div class="sbinfo">
                                           <ul>
                                               <li>Riad Hasan</li>
                                               <li>10/20/22</li>
                                               <li>12: 20 PM</li>
                                           </ul>
                                       </div>
                                   </div>

                                   <div class="details-seopage1 mb-2">
                                       <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras non dolor sapien. </p>
                                       <div class="sbinfo">
                                           <ul>
                                               <li>Riad Hasan</li>
                                               <li>10/20/22</li>
                                               <li>12: 20 PM</li>
                                           </ul>
                                       </div>
                                   </div>
                                   <div class="details-seopage1 mb-2">
                                       <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras non dolor sapien. </p>
                                       <div class="sbinfo">
                                           <ul>
                                               <li>Riad Hasan</li>
                                               <li>10/20/22</li>
                                               <li>12: 20 PM</li>
                                           </ul>
                                       </div>
                                   </div>
                               </div>

                               <div class="dealstage_comments_box mt-4">

                                   <div class="comments-section">
                                       <div class="row">

                                           <div class="comment-add">
                                               <div class="col-md-12">
                                                   <form action="">
                                                       <div class="form-floating mb-3">
                                                           <textarea class="form-control" rows="3" cols="20" placeholder="Leave a comment here" id="floatingTextarea2" style="height: auto"></textarea>

                                                       </div>

                                                       <div class="wrapper">
                                                           <input type="file" id="file-input">
                                                           <label for="file-input">

                                                             <i class="fa fa-paperclip fa-2x"></i>
                                                             <span></span>
                                                           </label>

                                                           <i class="fa fa-times-circle remove"></i>
                                                           <input type="submit" class="btn btn-default pull-right comment_btn text-end" value="Comment">
                                                         </div>



                                                   </form>
                                               </div>
                                           </div>
                                       </div>
                                   </div>
                               </div>


                           </div>


                           <!-- nopadding  -->


                           <div class="nopadding">
                               <div class="deal" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@mdo">
                                   05 hours Ago
                               </div>
                               <h3>Negotiation Started</h3>
                               <div class="custom_scroling_seo">
                                   <div class="details-seopage1 mb-2">
                                       <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras non dolor sapien. </p>

                                       <div class="seopage1_attach">
                                           <a href="#" target="_blank"><i class="fa fa-paperclip"></i>Attachments</a>
                                           <a href="#" target="_blank"><i class="fa fa-paperclip"></i>Attachments</a>
                                           <a href="#" target="_blank"><i class="fa fa-paperclip"></i>Attachments</a>
                                       </div>

                                       <div class="sbinfo">
                                           <ul>
                                               <li>Riad Hasan</li>
                                               <li>10/20/22</li>
                                               <li>12: 20 PM</li>
                                           </ul>
                                       </div>
                                   </div>

                                   <div class="details-seopage1 mb-2">
                                       <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras non dolor sapien. </p>
                                       <div class="sbinfo">
                                           <ul>
                                               <li>Riad Hasan khan khan</li>
                                               <li>10/20/22</li>
                                               <li>12: 20 PM</li>
                                           </ul>
                                       </div>
                                   </div>

                                   <div class="details-seopage1 mb-2">
                                       <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras non dolor sapien. </p>
                                       <div class="sbinfo">
                                           <ul>
                                               <li>Riad Hasan khan</li>
                                               <li>10/20/22</li>
                                               <li>12: 20 PM</li>
                                           </ul>
                                       </div>
                                   </div>

                                   <div class="details-seopage1 mb-2">
                                       <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras non dolor sapien. </p>
                                       <div class="sbinfo">
                                           <ul>
                                               <li>Riad Hasan</li>
                                               <li>10/20/22</li>
                                               <li>12: 20 PM</li>
                                           </ul>
                                       </div>
                                   </div>

                                   <div class="details-seopage1 mb-2">
                                       <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras non dolor sapien. </p>
                                       <div class="sbinfo">
                                           <ul>
                                               <li>Riad Hasan</li>
                                               <li>10/20/22</li>
                                               <li>12: 20 PM</li>
                                           </ul>
                                       </div>
                                   </div>
                                   <div class="details-seopage1 mb-2">
                                       <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras non dolor sapien. </p>
                                       <div class="sbinfo">
                                           <ul>
                                               <li>Riad Hasan</li>
                                               <li>10/20/22</li>
                                               <li>12: 20 PM</li>
                                           </ul>
                                       </div>
                                   </div>
                               </div>

                               <div class="dealstage_comments_box mt-4">

                                   <div class="comments-section">
                                       <div class="row">

                                           <div class="comment-add">
                                               <div class="col-md-12">
                                                   <form action="">
                                                       <div class="form-floating mb-3">
                                                           <textarea class="form-control" rows="3" cols="20" placeholder="Leave a comment here" id="floatingTextarea2" style="height: auto"></textarea>

                                                       </div>

                                                       <div class="wrapper">
                                                           <input type="file" id="file-input">
                                                           <label for="file-input">

                                                             <i class="fa fa-paperclip fa-2x"></i>
                                                             <span></span>
                                                           </label>

                                                           <i class="fa fa-times-circle remove"></i>
                                                           <input type="submit" class="btn btn-default pull-right comment_btn text-end" value="Comment">
                                                         </div>



                                                   </form>
                                               </div>
                                           </div>
                                       </div>
                                   </div>
                               </div>

                           </div>
                       </div>

                       <!-- details  -->





                   </div>

                   <!-- modal popup -->

                   <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                       <div class="modal-dialog">
                           <div class="modal-content">
                           <div class="modal-header">
                               <h5 class="modal-title" id="exampleModalLabel">New message</h5>
                               <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                           </div>
                           <div class="modal-body">
                               <form>
                               <div class="mb-3">
                                   <label for="recipient-name" class="col-form-label">Recipient:</label>
                                   <input type="text" class="form-control" id="recipient-name">
                               </div>
                               <div class="mb-3">
                                   <label for="message-text" class="col-form-label">Message:</label>
                                   <textarea class="form-control" id="message-text"></textarea>
                               </div>
                               </form>
                           </div>
                           <div class="modal-footer">
                               <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                               <button type="button" class="btn btn-primary">Send message</button>
                           </div>
                           </div>
                       </div>
                   </div>

           </div>
       </section>





@endsection
<script src="sweetalert2.all.min.js"></script>
@if(session('status_updated'))
        <script>
            const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.addEventListener('mouseenter', Swal.stopTimer)
                    toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
            })

            Toast.fire({
                icon: 'success',
                title: '{{session('Lead Successfully Added')}}'
            })
        </script>
    @endif
<script type="text/javascript">
Swal.fire({
  title: 'Error!',
  text: 'Do you want to continue',
  icon: 'error',
  confirmButtonText: 'Cool'
})

</script>

<script src="https://code.jquery.com/jquery-3.5.1.js" charset="utf-8"></script>



@push('scripts')
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/js/bootstrap.min.js" charset="utf-8"></script>
<script src="https://cdn.datatables.net/1.12.1/js/jquery.dataTables.min.js" charset="utf-8"></script>
<script src="https://cdn.datatables.net/1.12.1/js/dataTables.bootstrap4.min.js" charset="utf-8"></script>
  <script src="https://cdn.jsdelivr.net/npm/summernote@0.8.18/dist/summernote.min.js"></script>
  <script type="text/javascript">
  $(document).ready(function () {
      $("#comments1").summernote();
  });

  </script>
<script type="text/javascript">
$(document).ready(function () {
    $('#dealstagetable').DataTable();
});
</script>
<script type="text/javascript">
function yesnoCheck() {
    yes1 = document.getElementById('yes')
    //yes2 = document.getElementById('acc')

    no1 = document.getElementById('other3')
  //  no2 = document.getElementById('other4')

    if (document.getElementById('yesCheck').checked) {
        yes1.type  = 'text';
        no1.type =  'hidden';
    } else {
        no1.type =  'text';
        yes1.type =  'hidden';
    }

}

</script>
<script type="text/javascript">
$('input[name="deal_stage"]').change(function() {
   if($(this).is(':checked') && $(this).val() == 'yes') {
        $('#qualifymodal').modal('show');
   }
});
$('input[name="deal_stage"]').change(function() {
   if($(this).is(':checked') && $(this).val() == 'no') {
        $('#lostmodal').modal('show');
   }
});

</script>
<script src="http://cdn.bootcss.com/toastr.js/latest/js/toastr.min.js"></script>
   {!! Toastr::message() !!}
   <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>



   <script>
       var textarea = document.querySelector('textarea');

       textarea.addEventListener('keydown', autosize);

       function autosize(){
       var el = this;
       setTimeout(function(){
           el.style.cssText = 'height:auto; padding:40';
           // for box-sizing other than "content-box" use:
           // el.style.cssText = '-moz-box-sizing:content-box';
           el.style.cssText = 'height:' + el.scrollHeight + 'px';
       },0);
       }
   </script>


 <script>
   $('document').ready(function(){

 var $file = $('#file-input'),
     $label = $file.next('label'),
     $labelText = $label.find('span'),
     $labelRemove = $('i.remove'),
     labelDefault = $labelText.text();

 // on file change
 $file.on('change', function(event){
   var fileName = $file.val().split( '\\' ).pop();
   if( fileName ){
     console.log($file)
     $labelText.text(fileName);
     $labelRemove.show();
   }else{
     $labelText.text(labelDefault);
     $labelRemove.hide();
   }
 });

 // Remove file
 $labelRemove.on('click', function(event){
   $file.val("");
   $labelText.text(labelDefault);
   $labelRemove.hide();
   console.log($file)
 });
 })
 </script>
@endpush
