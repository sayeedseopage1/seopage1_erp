<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Seopage 1</title>

    <style>
    body{
         padding: 0;
         margin: 0;
         box-sizing: border-box;
         font-family:arial;
     }
     .email_templates {
         max-width: 640px;
         margin: 10px auto;
         display: block;
         border: 1px solid #eee;
         border-radius: 5px;

     }
     .custom_containers{
         width: 96%;
         margin: 15px auto;
         display: block;
     }

     .email_header {
         background: #eee;
         width: 100%;
     }
     .email_header img{
         width: 142px;
         height: 61px;
     }
     .email_contents {
         width: 100%;
         display: flex;
         justify-content: flex-start;
         align-items: center;
     }
     .email_contents img {
         width: 35px;
         height: 35px;
     }
     .email_contents strong {
         padding-left: 5px;
     }

     .email_message {
         width: 100%;
     }
     .email_message span{
         color: #1D82F5;
         font-style: italic;
     }

     .email_message p a{
         color: #1D82F5;
         text-decoration: none;
     }

     .email_message p {
         font-weight: 500;
         line-height: 1.4em;
         font-size: 17px;
     }

     .email_message ul{
         padding: 0;
         margin: 0;
     }

     .email_message ul li {
         list-style: none;
         padding: 17px 0;
         border-bottom: 1px solid #eee;
         font-family: arial;
     }
     .email_submits {
         margin: 37px 0;
         width: 100%;
         display: block;
     }
     .email_submits a {
         background: #119143;
         padding: 15px 30px;
         color: #fff;
         text-decoration: none;
         font-style: normal;
         font-weight: 500;
         border-radius: 5px;
         transition: all .5s ease-in-out;
     }

     .email_submits a:hover{
         background: #D9922E;
     }



     @media only screen and (min-width: 320px) and (max-width: 600px)  {
         .email_templates {
             max-width: 600px;
             border: 1px solid #eee;
             margin: 2%;
         }
         .email_submits a {
             padding: 15px 10px;
             margin: 0 auto;
             display: block;
             width: 170px;
             text-align: center;
             border-radius: 30px;
             transition: all .5s ease-in-out;
         }
         .email_submits a:hover{
             background: #D9922E;
             color: #fff;
         }
     }



    </style>

</head>
<body>
{{--<?php
  $user= App\Models\User::where('id',$data->pm_id)->first();
  $deal= App\Models\Deal::where('id',$data->deal_id)->first();
  $client= App\Models\User::where('id',$data->client_id)->first();
  //$row->created_at->format($this->global->date_format).$row->created_at->format('h:i:s A');

 ?>
 --}}
    <section class="email_templates">
        <div class="email_header">
            <img src="{{asset('email/img/logo_seopage1.png')}}" alt="">
        </div>

        <div class="custom_containers">
            <div class="email_contents">
                <img src="{{asset('email/img/check_mark.png')}}" alt="">

                <strong>Client Submission</strong>
            </div>

            <div class="email_message">
                <h4>Hi Admin,</h4>
                <p>We have won a new deal for you on <span>12-12-22.</span> Let's check the short details below. You can check the details about this deal following <a href="erp.seopage1.net">this link.</a></p>
            </div>

            <div class="email_message">
                <h4 style="color: #D99218;font-weight: 700;font-size: 22px;">Deal Details</h4>
                <ul>
                    <li><strong>Deal Name:</strong> Test</li>
                    <li><strong>Created On:</strong> 12-12-22 at 10:00 P.M</li>
                    <li><strong>Client Name:</strong> Test Client</li>
                </ul>
                <br>

                <strong>The last Delivery Time Is  </strong>


            </div>

            <div class="email_submits">
                <a href="erp.seopage1.net">Receive The Work</a>
            </div>
        </div>

    </section>


</body>
</html>
