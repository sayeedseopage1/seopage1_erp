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
            position: absolute;
            max-width: 640px;
            margin: 0 auto;
            display: block;
            border: 1px solid #eee;
            border-radius: 5px;
            transform: translate(-50%,-50%);
            top: 50%;
            left: 50%;
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
            background: #222;
        }






    </style>

</head>
<body>
<?php
  $user= App\Models\User::where('id',$data->pm_id)->first();
  $deal= App\Models\Deal::where('id',$data->deal_id)->first();
  $client= App\Models\User::where('id',$data->client_id)->first();
  //$row->created_at->format($this->global->date_format).$row->created_at->format('h:i:s A');

 ?>
    <section class="email_templates">
        <div class="email_header">
            <img src="{{asset('email/img/logo_seopage1.png')}}" alt="">
        </div>

        <div class="custom_containers">
            <div class="email_contents">
                <img src="{{asset('email/img/Check_mark.svg')}}" alt="">

                <strong>New Deal Won</strong>
            </div>

            <div class="email_message">
                <h4>Hi {{$user->name}},</h4>
                <p>We have won a new deal for you on <span>{{$deal->created_at->format('Y-m-d')}} at {{$deal->created_at->format('h:i:s A')}}.</span> Let's check the short details below. You can check the details about this deal following <a href="erp.seopage1.net/account/contracts/{{$data->deal_id}}">this link.</a></p>
            </div>

            <div class="email_message">
                <h4 style="color: #D99218;font-weight: 700;font-size: 22px;">Deal Details</h4>
                <ul>
                    <li><strong>Deal Name:</strong>{{$deal->project_name}}</li>
                    <li><strong>Created On:</strong> {{$deal->created_at->format('Y-m-d')}} at {{$deal->created_at->format('h:i:s A')}}</li>
                    <li><strong>Client Name:</strong> {{$client->name}}</li>
                </ul>
                <br>
                <strong>The  last Delivery Time Is {{$data->deadline}}  </strong>

            </div>

            <div class="email_submits">
                <a href="erp.seopage1.net/account/contracts/{{$data->deal_id}}">Receive The Work</a>
            </div>
        </div>

    </section>


</body>
</html>
