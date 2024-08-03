<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Seopag1 Erp</title>

    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">

    <!-- font-awesome  -->
    <link href="https://cdn.jsdelivr.net/npm/summernote@0.8.18/dist/summernote.min.css" rel="stylesheet" />
    <link rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css"
          integrity="sha512-xh6O/CkQoPOWDdYTDqeRdPCVd1SpvCA9XXcUnZS2FmJNp1coAFzvtCN9BmamE+4aHK8yyUHUSCcJHgXloTyT2A=="
          crossorigin="anonymous" referrerpolicy="no-referrer"/>

    <link rel="stylesheet" href="{{asset('custom/client/css/intlTelInput.css')}}">
    <link rel="stylesheet" href="{{asset('mobile/css/style.css')}}">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/css/intlTelInput.css" />
    <script src="https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/intlTelInput.min.js"></script>
    <link rel="stylesheet" href="{{asset('toastr/toastr.min.css')}}">

    <style media="screen">
        input, button {
            margin: 0;
            padding: 0;

        }
        .intl-tel-input {
            position: relative;
            display: inline-block;
            width: 100% !important;
        }
    </style>
    <style>
        .iti {
            position: relative;
            display: inline-block;
            width: 100%;
        }

        .ourfields .input-group-text {
            width: 130px;
        }
        .input-group.ourfields input {
            height: 38px !important;
            margin-left: -2px !important;
        }
    </style>


</head>
<body>


<section class="freelancerseopage  py-5">

    <div class="container">

        <div class="row ">
            <div class="col-md-2"></div>
            <div class="col-md-8 myshadow">
                <h6>
                    We understand that you may not be available on freelancer.com the whole day. So we would like to have your contact information so the communication is smooth and your project is not delayed just because you
                    didn't get notified about our messages on freelancer.com!
                </h6>
                <hr />
                <!-- form   -->


                <form class="row g-3" action="{{route('client-submission')}}" method="post">
                    @csrf
                    <input type="hidden" name="deal_id" value="{{$deal->id}}" />
                    <div class="col-md-12">
                        <label for="Email3" class="form-label">Please put your freelancer.com username here!</label>
                        <input type="text" name="user_name" value="{{$deal->client_username}}" class="form-control @error('user_name') is-invalid @enderror" />
                    </div>
                    @error('user_name')
                    <div class="mt-3">
                        <div class="alert alert-danger">{{ $message }}</div>
                    </div>
                    @enderror

                    <div class="col-md-12">
                        <label for="Email3" class="form-label">Your email (For future communication)!</label>
                        <input type="email" name="email" class="form-control @error('email') is-invalid @enderror"  />
                    </div>
                    @error('email')
                    <div class="mt-3">
                        <div class="alert alert-danger">{{ $message }}</div>
                    </div>
                    @enderror

                    <div id="input-tel-parent" class="col-md-12">
                        <label for="inputEmail4" class="form-label">Phone number!</label> <br>

                        <input  class="form-control mybtns" id="phone" name="client_phone" type="tel" >
                        <span id="valid-msg" class="hide">Valid</span>
                        <span id="error-msg" class="hide">Invalid number</span>
                    </div>
                    {{--  <div class="col-md-12">
                          <label for="inputEmail4" class="form-label">Your WhatsApp ID (For future communication)!</label> <br>
                          <input  class="form-control mybtns" id="phone2" name="client_whatsapp" type="tel" required>
                          <span id="valid-msg" class="hide">Valid</span>
                          <span id="error-msg" class="hide">Invalid number</span>

                      </div>
                      <div class="col-md-12">
                          <label for="floatingTextarea"><strong>Any other instant messengers where you are mostly available (Example, skype, telegram etc.)! (optional)</strong></label>
                          <div class="mt-3">
                              <textarea class="form-control" name="other_platform" id="platform" placeholder="Leave a comment here"></textarea>
                          </div>


                      </div> --}}
                    <div class="col-md-12">
                        <div class="input-group ourfields">
                            <span class="input-group-text" id="inputGroup-sizing-default">WhatsApp  No :</span>
                            <input type="number" name="client_whatsapp" class="form-control" aria-label="Sizing example input" placeholder="Enter Your Whats App Number" aria-describedby="inputGroup-sizing-default">
                        </div>
                    </div>

                    <div class="col-md-12">
                        <div class="input-group ourfields">
                            <span class="input-group-text" id="inputGroup-sizing-default">Skype ID:</span>
                            <input type="text" name="client_skype" class="form-control" aria-label="Sizing example input" placeholder="Enter Your Skype Id" aria-describedby="inputGroup-sizing-default">
                        </div>
                    </div>

                    <div class="col-md-12">
                        <div class="input-group ourfields">
                            <span class="input-group-text" id="inputGroup-sizing-default">Telegram ID:</span>
                            <input type="text" name="client_telegram" class="form-control" aria-label="Sizing example input" placeholder="Enter Your Telegram Id" aria-describedby="inputGroup-sizing-default">
                        </div>
                    </div>

                    <div class="col-md-12">
                        <div class="input-group ourfields">
                            <span class="input-group-text" id="inputGroup-sizing-default">Messanger ID:</span>
                            <input type="text" name="client_messenger" class="form-control" aria-label="Sizing example input" placeholder="Enter Your Messanger Id" aria-describedby="inputGroup-sizing-default">
                        </div>
                    </div>

                    <div class="col-md-12">
                        <div class="input-group ourfields">
                            <span class="input-group-text" id="inputGroup-sizing-default">IMO No:</span>
                            <input type="text" name="client_imo" class="form-control" aria-label="Sizing example input" placeholder="Enter Your IMO Number" aria-describedby="inputGroup-sizing-default">
                        </div>
                    </div>

                    <div class="col-md-12 pb-4">
                        <label for="floatingTextarea">
                            <strong>
                                What time of the day should we primarily reach out to you for any queries, updates, etc. & what is your current timezone? (optional)
                            </strong>
                        </label>
                        <label for="inputState" class="form-label mt-3">Time Zone</label>
                        <select name="timezone" id="inputState" class="form-select">

                            <option value="Africa/Abidjan GMT+0:00" selected="selected">Africa/Abidjan GMT+0:00</option>
                            <option value="Africa/Accra GMT+0:00">Africa/Accra GMT+0:00</option>
                            <option value="Africa/Addis_Ababa GMT+3:00">Africa/Addis_Ababa GMT+3:00</option>
                            <option value="Africa/Algiers GMT+1:00">Africa/Algiers GMT+1:00</option>
                            <option value="Africa/Asmara GMT+3:00">Africa/Asmara GMT+3:00</option>
                            <option value="Africa/Asmera GMT+3:00">Africa/Asmera GMT+3:00</option>
                            <option value="Africa/Bamako GMT+0:00">Africa/Bamako GMT+0:00</option>
                            <option value="Africa/Bangui GMT+1:00">Africa/Bangui GMT+1:00</option>
                            <option value="Africa/Banjul GMT+0:00">Africa/Banjul GMT+0:00</option>
                            <option value="Africa/Bissau GMT+0:00">Africa/Bissau GMT+0:00</option>
                            <option value="Africa/Blantyre GMT+2:00">Africa/Blantyre GMT+2:00</option>
                            <option value="Africa/Brazzaville GMT+1:00">Africa/Brazzaville GMT+1:00</option>
                            <option value="Africa/Bujumbura GMT+2:00">Africa/Bujumbura GMT+2:00</option>
                            <option value="Africa/Cairo GMT+2:00">Africa/Cairo GMT+2:00</option>
                            <option value="Africa/Casablanca GMT+0:00">Africa/Casablanca GMT+0:00</option>
                            <option value="Africa/Ceuta GMT+1:00">Africa/Ceuta GMT+1:00</option>
                            <option value="Africa/Conakry GMT+0:00">Africa/Conakry GMT+0:00</option>
                            <option value="Africa/Dakar GMT+0:00">Africa/Dakar GMT+0:00</option>
                            <option value="Africa/Dar_es_Salaam GMT+3:00">Africa/Dar_es_Salaam GMT+3:00</option>
                            <option value="Africa/Djibouti GMT+3:00">Africa/Djibouti GMT+3:00</option>
                            <option value="Africa/Douala GMT+1:00">Africa/Douala GMT+1:00</option>
                            <option value="Africa/El_Aaiun GMT+0:00">Africa/El_Aaiun GMT+0:00</option>
                            <option value="Africa/Freetown GMT+0:00">Africa/Freetown GMT+0:00</option>
                            <option value="Africa/Gaborone GMT+2:00">Africa/Gaborone GMT+2:00</option>
                            <option value="Africa/Harare GMT+2:00">Africa/Harare GMT+2:00</option>
                            <option value="Africa/Johannesburg GMT+2:00">Africa/Johannesburg GMT+2:00</option>
                            <option value="Africa/Juba GMT+3:00">Africa/Juba GMT+3:00</option>
                            <option value="Africa/Kampala GMT+3:00">Africa/Kampala GMT+3:00</option>
                            <option value="Africa/Khartoum GMT+2:00">Africa/Khartoum GMT+2:00</option>
                            <option value="Africa/Kigali GMT+2:00">Africa/Kigali GMT+2:00</option>
                            <option value="Africa/Kinshasa GMT+1:00">Africa/Kinshasa GMT+1:00</option>
                            <option value="Africa/Lagos GMT+1:00">Africa/Lagos GMT+1:00</option>
                            <option value="Africa/Libreville GMT+1:00">Africa/Libreville GMT+1:00</option>
                            <option value="Africa/Lome GMT+0:00">Africa/Lome GMT+0:00</option>
                            <option value="Africa/Luanda GMT+1:00">Africa/Luanda GMT+1:00</option>
                            <option value="Africa/Lubumbashi GMT+2:00">Africa/Lubumbashi GMT+2:00</option>
                            <option value="Africa/Lusaka GMT+2:00">Africa/Lusaka GMT+2:00</option>
                            <option value="Africa/Malabo GMT+1:00">Africa/Malabo GMT+1:00</option>
                            <option value="Africa/Maputo GMT+2:00">Africa/Maputo GMT+2:00</option>
                            <option value="Africa/Maseru GMT+2:00">Africa/Maseru GMT+2:00</option>
                            <option value="Africa/Mbabane GMT+2:00">Africa/Mbabane GMT+2:00</option>
                            <option value="Africa/Mogadishu GMT+3:00">Africa/Mogadishu GMT+3:00</option>
                            <option value="Africa/Monrovia GMT+0:00">Africa/Monrovia GMT+0:00</option>
                            <option value="Africa/Nairobi GMT+3:00">Africa/Nairobi GMT+3:00</option>
                            <option value="Africa/Ndjamena GMT+1:00">Africa/Ndjamena GMT+1:00</option>
                            <option value="Africa/Niamey GMT+1:00">Africa/Niamey GMT+1:00</option>
                            <option value="Africa/Nouakchott GMT+0:00">Africa/Nouakchott GMT+0:00</option>
                            <option value="Africa/Ouagadougou GMT+0:00">Africa/Ouagadougou GMT+0:00</option>
                            <option value="Africa/Porto-Novo GMT+1:00">Africa/Porto-Novo GMT+1:00</option>
                            <option value="Africa/Sao_Tome GMT+0:00">Africa/Sao_Tome GMT+0:00</option>
                            <option value="Africa/Timbuktu GMT+0:00">Africa/Timbuktu GMT+0:00</option>
                            <option value="Africa/Tripoli GMT+2:00">Africa/Tripoli GMT+2:00</option>
                            <option value="Africa/Tunis GMT+1:00">Africa/Tunis GMT+1:00</option>
                            <option value="Africa/Windhoek GMT+2:00">Africa/Windhoek GMT+2:00</option>
                            <option value="America/Adak GMT-10:00">America/Adak GMT-10:00</option>
                            <option value="America/Anchorage GMT-9:00">America/Anchorage GMT-9:00</option>
                            <option value="America/Anguilla GMT-4:00">America/Anguilla GMT-4:00</option>
                            <option value="America/Antigua GMT-4:00">America/Antigua GMT-4:00</option>
                            <option value="America/Araguaina GMT-3:00">America/Araguaina GMT-3:00</option>
                            <option value="America/Argentina/Buenos_Aires GMT-3:00">America/Argentina/Buenos_Aires GMT-3:00</option>
                            <option value="America/Argentina/Catamarca GMT-3:00">America/Argentina/Catamarca GMT-3:00</option>
                            <option value="America/Argentina/ComodRivadavia GMT-3:00">America/Argentina/ComodRivadavia GMT-3:00</option>
                            <option value="America/Argentina/Cordoba GMT-3:00">America/Argentina/Cordoba GMT-3:00</option>
                            <option value="America/Argentina/Jujuy GMT-3:00">America/Argentina/Jujuy GMT-3:00</option>
                            <option value="America/Argentina/La_Rioja GMT-3:00">America/Argentina/La_Rioja GMT-3:00</option>
                            <option value="America/Argentina/Mendoza GMT-3:00">America/Argentina/Mendoza GMT-3:00</option>
                            <option value="America/Argentina/Rio_Gallegos GMT-3:00">America/Argentina/Rio_Gallegos GMT-3:00</option>
                            <option value="America/Argentina/Salta GMT-3:00">America/Argentina/Salta GMT-3:00</option>
                            <option value="America/Argentina/San_Juan GMT-3:00">America/Argentina/San_Juan GMT-3:00</option>
                            <option value="America/Argentina/San_Luis GMT-3:00">America/Argentina/San_Luis GMT-3:00</option>
                            <option value="America/Argentina/Tucuman GMT-3:00">America/Argentina/Tucuman GMT-3:00</option>
                            <option value="America/Argentina/Ushuaia GMT-3:00">America/Argentina/Ushuaia GMT-3:00</option>
                            <option value="America/Aruba GMT-4:00">America/Aruba GMT-4:00</option>
                            <option value="America/Asuncion GMT-4:00">America/Asuncion GMT-4:00</option>
                            <option value="America/Atikokan GMT-5:00">America/Atikokan GMT-5:00</option>
                            <option value="America/Atka GMT-10:00">America/Atka GMT-10:00</option>
                            <option value="America/Bahia GMT-3:00">America/Bahia GMT-3:00</option>
                            <option value="America/Bahia_Banderas GMT-6:00">America/Bahia_Banderas GMT-6:00</option>
                            <option value="America/Barbados GMT-4:00">America/Barbados GMT-4:00</option>
                            <option value="America/Belem GMT-3:00">America/Belem GMT-3:00</option>
                            <option value="America/Belize GMT-6:00">America/Belize GMT-6:00</option>
                            <option value="America/Blanc-Sablon GMT-4:00">America/Blanc-Sablon GMT-4:00</option>
                            <option value="America/Boa_Vista GMT-4:00">America/Boa_Vista GMT-4:00</option>
                            <option value="America/Bogota GMT-5:00">America/Bogota GMT-5:00</option>
                            <option value="America/Boise GMT-7:00">America/Boise GMT-7:00</option>
                            <option value="America/Buenos_Aires GMT-3:00">America/Buenos_Aires GMT-3:00</option>
                            <option value="America/Cambridge_Bay GMT-7:00">America/Cambridge_Bay GMT-7:00</option>
                            <option value="America/Campo_Grande GMT-4:00">America/Campo_Grande GMT-4:00</option>
                            <option value="America/Cancun GMT-5:00">America/Cancun GMT-5:00</option>
                            <option value="America/Caracas GMT-4:00">America/Caracas GMT-4:00</option>
                            <option value="America/Catamarca GMT-3:00">America/Catamarca GMT-3:00</option>
                            <option value="America/Cayenne GMT-3:00">America/Cayenne GMT-3:00</option>
                            <option value="America/Cayman GMT-5:00">America/Cayman GMT-5:00</option>
                            <option value="America/Chicago GMT-6:00">America/Chicago GMT-6:00</option>
                            <option value="America/Chihuahua GMT-7:00">America/Chihuahua GMT-7:00</option>
                            <option value="America/Coral_Harbour GMT-5:00">America/Coral_Harbour GMT-5:00</option>
                            <option value="America/Cordoba GMT-3:00">America/Cordoba GMT-3:00</option>
                            <option value="America/Costa_Rica GMT-6:00">America/Costa_Rica GMT-6:00</option>
                            <option value="America/Creston GMT-7:00">America/Creston GMT-7:00</option>
                            <option value="America/Cuiaba GMT-4:00">America/Cuiaba GMT-4:00</option>
                            <option value="America/Curacao GMT-4:00">America/Curacao GMT-4:00</option>
                            <option value="America/Danmarkshavn GMT+0:00">America/Danmarkshavn GMT+0:00</option>
                            <option value="America/Dawson GMT-8:00">America/Dawson GMT-8:00</option>
                            <option value="America/Dawson_Creek GMT-7:00">America/Dawson_Creek GMT-7:00</option>
                            <option value="America/Denver GMT-7:00">America/Denver GMT-7:00</option>
                            <option value="America/Detroit GMT-5:00">America/Detroit GMT-5:00</option>
                            <option value="America/Dominica GMT-4:00">America/Dominica GMT-4:00</option>
                            <option value="America/Edmonton GMT-7:00">America/Edmonton GMT-7:00</option>
                            <option value="America/Eirunepe GMT-5:00">America/Eirunepe GMT-5:00</option>
                            <option value="America/El_Salvador GMT-6:00">America/El_Salvador GMT-6:00</option>
                            <option value="America/Ensenada GMT-8:00">America/Ensenada GMT-8:00</option>
                            <option value="America/Fort_Nelson GMT-7:00">America/Fort_Nelson GMT-7:00</option>
                            <option value="America/Fort_Wayne GMT-5:00">America/Fort_Wayne GMT-5:00</option>
                            <option value="America/Fortaleza GMT-3:00">America/Fortaleza GMT-3:00</option>
                            <option value="America/Glace_Bay GMT-4:00">America/Glace_Bay GMT-4:00</option>
                            <option value="America/Godthab GMT-3:00">America/Godthab GMT-3:00</option>
                            <option value="America/Goose_Bay GMT-4:00">America/Goose_Bay GMT-4:00</option>
                            <option value="America/Grand_Turk GMT-5:00">America/Grand_Turk GMT-5:00</option>
                            <option value="America/Grenada GMT-4:00">America/Grenada GMT-4:00</option>
                            <option value="America/Guadeloupe GMT-4:00">America/Guadeloupe GMT-4:00</option>
                            <option value="America/Guatemala GMT-6:00">America/Guatemala GMT-6:00</option>
                            <option value="America/Guayaquil GMT-5:00">America/Guayaquil GMT-5:00</option>
                            <option value="America/Guyana GMT-4:00">America/Guyana GMT-4:00</option>
                            <option value="America/Halifax GMT-4:00">America/Halifax GMT-4:00</option>
                            <option value="America/Havana GMT-5:00">America/Havana GMT-5:00</option>
                            <option value="America/Hermosillo GMT-7:00">America/Hermosillo GMT-7:00</option>
                            <option value="America/Indiana/Indianapolis GMT-5:00">America/Indiana/Indianapolis GMT-5:00</option>
                            <option value="America/Indiana/Knox GMT-6:00">America/Indiana/Knox GMT-6:00</option>
                            <option value="America/Indiana/Marengo GMT-5:00">America/Indiana/Marengo GMT-5:00</option>
                            <option value="America/Indiana/Petersburg GMT-5:00">America/Indiana/Petersburg GMT-5:00</option>
                            <option value="America/Indiana/Tell_City GMT-6:00">America/Indiana/Tell_City GMT-6:00</option>
                            <option value="America/Indiana/Vevay GMT-5:00">America/Indiana/Vevay GMT-5:00</option>
                            <option value="America/Indiana/Vincennes GMT-5:00">America/Indiana/Vincennes GMT-5:00</option>
                            <option value="America/Indiana/Winamac GMT-5:00">America/Indiana/Winamac GMT-5:00</option>
                            <option value="America/Indianapolis GMT-5:00">America/Indianapolis GMT-5:00</option>
                            <option value="America/Inuvik GMT-7:00">America/Inuvik GMT-7:00</option>
                            <option value="America/Iqaluit GMT-5:00">America/Iqaluit GMT-5:00</option>
                            <option value="America/Jamaica GMT-5:00">America/Jamaica GMT-5:00</option>
                            <option value="America/Jujuy GMT-3:00">America/Jujuy GMT-3:00</option>
                            <option value="America/Juneau GMT-9:00">America/Juneau GMT-9:00</option>
                            <option value="America/Kentucky/Louisville GMT-5:00">America/Kentucky/Louisville GMT-5:00</option>
                            <option value="America/Kentucky/Monticello GMT-5:00">America/Kentucky/Monticello GMT-5:00</option>
                            <option value="America/Knox_IN GMT-6:00">America/Knox_IN GMT-6:00</option>
                            <option value="America/Kralendijk GMT-4:00">America/Kralendijk GMT-4:00</option>
                            <option value="America/La_Paz GMT-4:00">America/La_Paz GMT-4:00</option>
                            <option value="America/Lima GMT-5:00">America/Lima GMT-5:00</option>
                            <option value="America/Los_Angeles GMT-8:00">America/Los_Angeles GMT-8:00</option>
                            <option value="America/Louisville GMT-5:00">America/Louisville GMT-5:00</option>
                            <option value="America/Lower_Princes GMT-4:00">America/Lower_Princes GMT-4:00</option>
                            <option value="America/Maceio GMT-3:00">America/Maceio GMT-3:00</option>
                            <option value="America/Managua GMT-6:00">America/Managua GMT-6:00</option>
                            <option value="America/Manaus GMT-4:00">America/Manaus GMT-4:00</option>
                            <option value="America/Marigot GMT-4:00">America/Marigot GMT-4:00</option>
                            <option value="America/Martinique GMT-4:00">America/Martinique GMT-4:00</option>
                            <option value="America/Matamoros GMT-6:00">America/Matamoros GMT-6:00</option>
                            <option value="America/Mazatlan GMT-7:00">America/Mazatlan GMT-7:00</option>
                            <option value="America/Mendoza GMT-3:00">America/Mendoza GMT-3:00</option>
                            <option value="America/Menominee GMT-6:00">America/Menominee GMT-6:00</option>
                            <option value="America/Merida GMT-6:00">America/Merida GMT-6:00</option>
                            <option value="America/Metlakatla GMT-9:00">America/Metlakatla GMT-9:00</option>
                            <option value="America/Mexico_City GMT-6:00">America/Mexico_City GMT-6:00</option>
                            <option value="America/Miquelon GMT-3:00">America/Miquelon GMT-3:00</option>
                            <option value="America/Moncton GMT-4:00">America/Moncton GMT-4:00</option>
                            <option value="America/Monterrey GMT-6:00">America/Monterrey GMT-6:00</option>
                            <option value="America/Montevideo GMT-3:00">America/Montevideo GMT-3:00</option>
                            <option value="America/Montreal GMT-5:00">America/Montreal GMT-5:00</option>
                            <option value="America/Montserrat GMT-4:00">America/Montserrat GMT-4:00</option>
                            <option value="America/Nassau GMT-5:00">America/Nassau GMT-5:00</option>
                            <option value="America/New_York GMT-5:00">America/New_York GMT-5:00</option>
                            <option value="America/Nipigon GMT-5:00">America/Nipigon GMT-5:00</option>
                            <option value="America/Nome GMT-9:00">America/Nome GMT-9:00</option>
                            <option value="America/Noronha GMT-2:00">America/Noronha GMT-2:00</option>
                            <option value="America/North_Dakota/Beulah GMT-6:00">America/North_Dakota/Beulah GMT-6:00</option>
                            <option value="America/North_Dakota/Center GMT-6:00">America/North_Dakota/Center GMT-6:00</option>
                            <option value="America/North_Dakota/New_Salem GMT-6:00">America/North_Dakota/New_Salem GMT-6:00</option>
                            <option value="America/Ojinaga GMT-7:00">America/Ojinaga GMT-7:00</option>
                            <option value="America/Panama GMT-5:00">America/Panama GMT-5:00</option>
                            <option value="America/Pangnirtung GMT-5:00">America/Pangnirtung GMT-5:00</option>
                            <option value="America/Paramaribo GMT-3:00">America/Paramaribo GMT-3:00</option>
                            <option value="America/Phoenix GMT-7:00">America/Phoenix GMT-7:00</option>
                            <option value="America/Port-au-Prince GMT-5:00">America/Port-au-Prince GMT-5:00</option>
                            <option value="America/Port_of_Spain GMT-4:00">America/Port_of_Spain GMT-4:00</option>
                            <option value="America/Porto_Acre GMT-5:00">America/Porto_Acre GMT-5:00</option>
                            <option value="America/Porto_Velho GMT-4:00">America/Porto_Velho GMT-4:00</option>
                            <option value="America/Puerto_Rico GMT-4:00">America/Puerto_Rico GMT-4:00</option>
                            <option value="America/Punta_Arenas GMT-3:00">America/Punta_Arenas GMT-3:00</option>
                            <option value="America/Rainy_River GMT-6:00">America/Rainy_River GMT-6:00</option>
                            <option value="America/Rankin_Inlet GMT-6:00">America/Rankin_Inlet GMT-6:00</option>
                            <option value="America/Recife GMT-3:00">America/Recife GMT-3:00</option>
                            <option value="America/Regina GMT-6:00">America/Regina GMT-6:00</option>
                            <option value="America/Resolute GMT-6:00">America/Resolute GMT-6:00</option>
                            <option value="America/Rio_Branco GMT-5:00">America/Rio_Branco GMT-5:00</option>
                            <option value="America/Rosario GMT-3:00">America/Rosario GMT-3:00</option>
                            <option value="America/Santa_Isabel GMT-8:00">America/Santa_Isabel GMT-8:00</option>
                            <option value="America/Santarem GMT-3:00">America/Santarem GMT-3:00</option>
                            <option value="America/Santiago GMT-4:00">America/Santiago GMT-4:00</option>
                            <option value="America/Santo_Domingo GMT-4:00">America/Santo_Domingo GMT-4:00</option>
                            <option value="America/Sao_Paulo GMT-3:00">America/Sao_Paulo GMT-3:00</option>
                            <option value="America/Scoresbysund GMT-1:00">America/Scoresbysund GMT-1:00</option>
                            <option value="America/Shiprock GMT-7:00">America/Shiprock GMT-7:00</option>
                            <option value="America/Sitka GMT-9:00">America/Sitka GMT-9:00</option>
                            <option value="America/St_Barthelemy GMT-4:00">America/St_Barthelemy GMT-4:00</option>
                            <option value="America/St_Johns GMT-4:30">America/St_Johns GMT-4:30</option>
                            <option value="America/St_Kitts GMT-4:00">America/St_Kitts GMT-4:00</option>
                            <option value="America/St_Lucia GMT-4:00">America/St_Lucia GMT-4:00</option>
                            <option value="America/St_Thomas GMT-4:00">America/St_Thomas GMT-4:00</option>
                            <option value="America/St_Vincent GMT-4:00">America/St_Vincent GMT-4:00</option>
                            <option value="America/Swift_Current GMT-6:00">America/Swift_Current GMT-6:00</option>
                            <option value="America/Tegucigalpa GMT-6:00">America/Tegucigalpa GMT-6:00</option>
                            <option value="America/Thule GMT-4:00">America/Thule GMT-4:00</option>
                            <option value="America/Thunder_Bay GMT-5:00">America/Thunder_Bay GMT-5:00</option>
                            <option value="America/Tijuana GMT-8:00">America/Tijuana GMT-8:00</option>
                            <option value="America/Toronto GMT-5:00">America/Toronto GMT-5:00</option>
                            <option value="America/Tortola GMT-4:00">America/Tortola GMT-4:00</option>
                            <option value="America/Vancouver GMT-8:00">America/Vancouver GMT-8:00</option>
                            <option value="America/Virgin GMT-4:00">America/Virgin GMT-4:00</option>
                            <option value="America/Whitehorse GMT-8:00">America/Whitehorse GMT-8:00</option>
                            <option value="America/Winnipeg GMT-6:00">America/Winnipeg GMT-6:00</option>
                            <option value="America/Yakutat GMT-9:00">America/Yakutat GMT-9:00</option>
                            <option value="America/Yellowknife GMT-7:00">America/Yellowknife GMT-7:00</option>
                            <option value="Antarctica/Casey GMT+8:00">Antarctica/Casey GMT+8:00</option>
                            <option value="Antarctica/Davis GMT+7:00">Antarctica/Davis GMT+7:00</option>
                            <option value="Antarctica/DumontDUrville GMT+10:00">Antarctica/DumontDUrville GMT+10:00</option>
                            <option value="Antarctica/Macquarie GMT+11:00">Antarctica/Macquarie GMT+11:00</option>
                            <option value="Antarctica/Mawson GMT+5:00">Antarctica/Mawson GMT+5:00</option>
                            <option value="Antarctica/McMurdo GMT+12:00">Antarctica/McMurdo GMT+12:00</option>
                            <option value="Antarctica/Palmer GMT-3:00">Antarctica/Palmer GMT-3:00</option>
                            <option value="Antarctica/Rothera GMT-3:00">Antarctica/Rothera GMT-3:00</option>
                            <option value="Antarctica/South_Pole GMT+12:00">Antarctica/South_Pole GMT+12:00</option>
                            <option value="Antarctica/Syowa GMT+3:00">Antarctica/Syowa GMT+3:00</option>
                            <option value="Antarctica/Troll GMT+0:00">Antarctica/Troll GMT+0:00</option>
                            <option value="Antarctica/Vostok GMT+6:00">Antarctica/Vostok GMT+6:00</option>
                            <option value="Arctic/Longyearbyen GMT+1:00">Arctic/Longyearbyen GMT+1:00</option>
                            <option value="Asia/Aden GMT+3:00">Asia/Aden GMT+3:00</option>
                            <option value="Asia/Almaty GMT+6:00">Asia/Almaty GMT+6:00</option>
                            <option value="Asia/Amman GMT+2:00">Asia/Amman GMT+2:00</option>
                            <option value="Asia/Anadyr GMT+12:00">Asia/Anadyr GMT+12:00</option>
                            <option value="Asia/Aqtau GMT+5:00">Asia/Aqtau GMT+5:00</option>
                            <option value="Asia/Aqtobe GMT+5:00">Asia/Aqtobe GMT+5:00</option>
                            <option value="Asia/Ashgabat GMT+5:00">Asia/Ashgabat GMT+5:00</option>
                            <option value="Asia/Ashkhabad GMT+5:00">Asia/Ashkhabad GMT+5:00</option>
                            <option value="Asia/Atyrau GMT+5:00">Asia/Atyrau GMT+5:00</option>
                            <option value="Asia/Baghdad GMT+3:00">Asia/Baghdad GMT+3:00</option>
                            <option value="Asia/Bahrain GMT+3:00">Asia/Bahrain GMT+3:00</option>
                            <option value="Asia/Baku GMT+4:00">Asia/Baku GMT+4:00</option>
                            <option value="Asia/Bangkok GMT+7:00">Asia/Bangkok GMT+7:00</option>
                            <option value="Asia/Barnaul GMT+7:00">Asia/Barnaul GMT+7:00</option>
                            <option value="Asia/Beirut GMT+2:00">Asia/Beirut GMT+2:00</option>
                            <option value="Asia/Bishkek GMT+6:00">Asia/Bishkek GMT+6:00</option>
                            <option value="Asia/Brunei GMT+8:00">Asia/Brunei GMT+8:00</option>
                            <option value="Asia/Calcutta GMT+5:30">Asia/Calcutta GMT+5:30</option>
                            <option value="Asia/Chita GMT+9:00">Asia/Chita GMT+9:00</option>
                            <option value="Asia/Choibalsan GMT+8:00">Asia/Choibalsan GMT+8:00</option>
                            <option value="Asia/Chongqing GMT+8:00">Asia/Chongqing GMT+8:00</option>
                            <option value="Asia/Chungking GMT+8:00">Asia/Chungking GMT+8:00</option>
                            <option value="Asia/Colombo GMT+5:30">Asia/Colombo GMT+5:30</option>
                            <option value="Asia/Dacca GMT+6:00">Asia/Dacca GMT+6:00</option>
                            <option value="Asia/Damascus GMT+2:00">Asia/Damascus GMT+2:00</option>
                            <option value="Asia/Dhaka GMT+6:00">Asia/Dhaka GMT+6:00</option>
                            <option value="Asia/Dili GMT+9:00">Asia/Dili GMT+9:00</option>
                            <option value="Asia/Dubai GMT+4:00">Asia/Dubai GMT+4:00</option>
                            <option value="Asia/Dushanbe GMT+5:00">Asia/Dushanbe GMT+5:00</option>
                            <option value="Asia/Famagusta GMT+2:00">Asia/Famagusta GMT+2:00</option>
                            <option value="Asia/Gaza GMT+2:00">Asia/Gaza GMT+2:00</option>
                            <option value="Asia/Harbin GMT+8:00">Asia/Harbin GMT+8:00</option>
                            <option value="Asia/Hebron GMT+2:00">Asia/Hebron GMT+2:00</option>
                            <option value="Asia/Ho_Chi_Minh GMT+7:00">Asia/Ho_Chi_Minh GMT+7:00</option>
                            <option value="Asia/Hong_Kong GMT+8:00">Asia/Hong_Kong GMT+8:00</option>
                            <option value="Asia/Hovd GMT+7:00">Asia/Hovd GMT+7:00</option>
                            <option value="Asia/Irkutsk GMT+8:00">Asia/Irkutsk GMT+8:00</option>
                            <option value="Asia/Istanbul GMT+3:00">Asia/Istanbul GMT+3:00</option>
                            <option value="Asia/Jakarta GMT+7:00">Asia/Jakarta GMT+7:00</option>
                            <option value="Asia/Jayapura GMT+9:00">Asia/Jayapura GMT+9:00</option>
                            <option value="Asia/Jerusalem GMT+2:00">Asia/Jerusalem GMT+2:00</option>
                            <option value="Asia/Kabul GMT+4:30">Asia/Kabul GMT+4:30</option>
                            <option value="Asia/Kamchatka GMT+12:00">Asia/Kamchatka GMT+12:00</option>
                            <option value="Asia/Karachi GMT+5:00">Asia/Karachi GMT+5:00</option>
                            <option value="Asia/Kashgar GMT+6:00">Asia/Kashgar GMT+6:00</option>
                            <option value="Asia/Kathmandu GMT+5:45">Asia/Kathmandu GMT+5:45</option>
                            <option value="Asia/Katmandu GMT+5:45">Asia/Katmandu GMT+5:45</option>
                            <option value="Asia/Khandyga GMT+9:00">Asia/Khandyga GMT+9:00</option>
                            <option value="Asia/Kolkata GMT+5:30">Asia/Kolkata GMT+5:30</option>
                            <option value="Asia/Krasnoyarsk GMT+7:00">Asia/Krasnoyarsk GMT+7:00</option>
                            <option value="Asia/Kuala_Lumpur GMT+8:00">Asia/Kuala_Lumpur GMT+8:00</option>
                            <option value="Asia/Kuching GMT+8:00">Asia/Kuching GMT+8:00</option>
                            <option value="Asia/Kuwait GMT+3:00">Asia/Kuwait GMT+3:00</option>
                            <option value="Asia/Macao GMT+8:00">Asia/Macao GMT+8:00</option>
                            <option value="Asia/Macau GMT+8:00">Asia/Macau GMT+8:00</option>
                            <option value="Asia/Magadan GMT+11:00">Asia/Magadan GMT+11:00</option>
                            <option value="Asia/Makassar GMT+8:00">Asia/Makassar GMT+8:00</option>
                            <option value="Asia/Manila GMT+8:00">Asia/Manila GMT+8:00</option>
                            <option value="Asia/Muscat GMT+4:00">Asia/Muscat GMT+4:00</option>
                            <option value="Asia/Nicosia GMT+2:00">Asia/Nicosia GMT+2:00</option>
                            <option value="Asia/Novokuznetsk GMT+7:00">Asia/Novokuznetsk GMT+7:00</option>
                            <option value="Asia/Novosibirsk GMT+7:00">Asia/Novosibirsk GMT+7:00</option>
                            <option value="Asia/Omsk GMT+6:00">Asia/Omsk GMT+6:00</option>
                            <option value="Asia/Oral GMT+5:00">Asia/Oral GMT+5:00</option>
                            <option value="Asia/Phnom_Penh GMT+7:00">Asia/Phnom_Penh GMT+7:00</option>
                            <option value="Asia/Pontianak GMT+7:00">Asia/Pontianak GMT+7:00</option>
                            <option value="Asia/Pyongyang GMT+9:00">Asia/Pyongyang GMT+9:00</option>
                            <option value="Asia/Qatar GMT+3:00">Asia/Qatar GMT+3:00</option>
                            <option value="Asia/Qostanay GMT+6:00">Asia/Qostanay GMT+6:00</option>
                            <option value="Asia/Qyzylorda GMT+5:00">Asia/Qyzylorda GMT+5:00</option>
                            <option value="Asia/Rangoon GMT+6:30">Asia/Rangoon GMT+6:30</option>
                            <option value="Asia/Riyadh GMT+3:00">Asia/Riyadh GMT+3:00</option>
                            <option value="Asia/Saigon GMT+7:00">Asia/Saigon GMT+7:00</option>
                            <option value="Asia/Sakhalin GMT+11:00">Asia/Sakhalin GMT+11:00</option>
                            <option value="Asia/Samarkand GMT+5:00">Asia/Samarkand GMT+5:00</option>
                            <option value="Asia/Seoul GMT+9:00">Asia/Seoul GMT+9:00</option>
                            <option value="Asia/Shanghai GMT+8:00">Asia/Shanghai GMT+8:00</option>
                            <option value="Asia/Singapore GMT+8:00">Asia/Singapore GMT+8:00</option>
                            <option value="Asia/Srednekolymsk GMT+11:00">Asia/Srednekolymsk GMT+11:00</option>
                            <option value="Asia/Taipei GMT+8:00">Asia/Taipei GMT+8:00</option>
                            <option value="Asia/Tashkent GMT+5:00">Asia/Tashkent GMT+5:00</option>
                            <option value="Asia/Tbilisi GMT+4:00">Asia/Tbilisi GMT+4:00</option>
                            <option value="Asia/Tehran GMT+3:30">Asia/Tehran GMT+3:30</option>
                            <option value="Asia/Tel_Aviv GMT+2:00">Asia/Tel_Aviv GMT+2:00</option>
                            <option value="Asia/Thimbu GMT+6:00">Asia/Thimbu GMT+6:00</option>
                            <option value="Asia/Thimphu GMT+6:00">Asia/Thimphu GMT+6:00</option>
                            <option value="Asia/Tokyo GMT+9:00">Asia/Tokyo GMT+9:00</option>
                            <option value="Asia/Tomsk GMT+7:00">Asia/Tomsk GMT+7:00</option>
                            <option value="Asia/Ujung_Pandang GMT+8:00">Asia/Ujung_Pandang GMT+8:00</option>
                            <option value="Asia/Ulaanbaatar GMT+8:00">Asia/Ulaanbaatar GMT+8:00</option>
                            <option value="Asia/Ulan_Bator GMT+8:00">Asia/Ulan_Bator GMT+8:00</option>
                            <option value="Asia/Urumqi GMT+6:00">Asia/Urumqi GMT+6:00</option>
                            <option value="Asia/Ust-Nera GMT+10:00">Asia/Ust-Nera GMT+10:00</option>
                            <option value="Asia/Vientiane GMT+7:00">Asia/Vientiane GMT+7:00</option>
                            <option value="Asia/Vladivostok GMT+10:00">Asia/Vladivostok GMT+10:00</option>
                            <option value="Asia/Yakutsk GMT+9:00">Asia/Yakutsk GMT+9:00</option>
                            <option value="Asia/Yangon GMT+6:30">Asia/Yangon GMT+6:30</option>
                            <option value="Asia/Yekaterinburg GMT+5:00">Asia/Yekaterinburg GMT+5:00</option>
                            <option value="Asia/Yerevan GMT+4:00">Asia/Yerevan GMT+4:00</option>
                            <option value="Atlantic/Azores GMT-1:00">Atlantic/Azores GMT-1:00</option>
                            <option value="Atlantic/Bermuda GMT-4:00">Atlantic/Bermuda GMT-4:00</option>
                            <option value="Atlantic/Canary GMT+0:00">Atlantic/Canary GMT+0:00</option>
                            <option value="Atlantic/Cape_Verde GMT-1:00">Atlantic/Cape_Verde GMT-1:00</option>
                            <option value="Atlantic/Faeroe GMT+0:00">Atlantic/Faeroe GMT+0:00</option>
                            <option value="Atlantic/Faroe GMT+0:00">Atlantic/Faroe GMT+0:00</option>
                            <option value="Atlantic/Jan_Mayen GMT+1:00">Atlantic/Jan_Mayen GMT+1:00</option>
                            <option value="Atlantic/Madeira GMT+0:00">Atlantic/Madeira GMT+0:00</option>
                            <option value="Atlantic/Reykjavik GMT+0:00">Atlantic/Reykjavik GMT+0:00</option>
                            <option value="Atlantic/South_Georgia GMT-2:00">Atlantic/South_Georgia GMT-2:00</option>
                            <option value="Atlantic/St_Helena GMT+0:00">Atlantic/St_Helena GMT+0:00</option>
                            <option value="Atlantic/Stanley GMT-3:00">Atlantic/Stanley GMT-3:00</option>
                            <option value="Australia/ACT GMT+10:00">Australia/ACT GMT+10:00</option>
                            <option value="Australia/Adelaide GMT+9:30">Australia/Adelaide GMT+9:30</option>
                            <option value="Australia/Brisbane GMT+10:00">Australia/Brisbane GMT+10:00</option>
                            <option value="Australia/Broken_Hill GMT+9:30">Australia/Broken_Hill GMT+9:30</option>
                            <option value="Australia/Canberra GMT+10:00">Australia/Canberra GMT+10:00</option>
                            <option value="Australia/Currie GMT+10:00">Australia/Currie GMT+10:00</option>
                            <option value="Australia/Darwin GMT+9:30">Australia/Darwin GMT+9:30</option>
                            <option value="Australia/Eucla GMT+8:45">Australia/Eucla GMT+8:45</option>
                            <option value="Australia/Hobart GMT+10:00">Australia/Hobart GMT+10:00</option>
                            <option value="Australia/LHI GMT+10:30">Australia/LHI GMT+10:30</option>
                            <option value="Australia/Lindeman GMT+10:00">Australia/Lindeman GMT+10:00</option>
                            <option value="Australia/Lord_Howe GMT+10:30">Australia/Lord_Howe GMT+10:30</option>
                            <option value="Australia/Melbourne GMT+10:00">Australia/Melbourne GMT+10:00</option>
                            <option value="Australia/NSW GMT+10:00">Australia/NSW GMT+10:00</option>
                            <option value="Australia/North GMT+9:30">Australia/North GMT+9:30</option>
                            <option value="Australia/Perth GMT+8:00">Australia/Perth GMT+8:00</option>
                            <option value="Australia/Queensland GMT+10:00">Australia/Queensland GMT+10:00</option>
                            <option value="Australia/South GMT+9:30">Australia/South GMT+9:30</option>
                            <option value="Australia/Sydney GMT+10:00">Australia/Sydney GMT+10:00</option>
                            <option value="Australia/Tasmania GMT+10:00">Australia/Tasmania GMT+10:00</option>
                            <option value="Australia/Victoria GMT+10:00">Australia/Victoria GMT+10:00</option>
                            <option value="Australia/West GMT+8:00">Australia/West GMT+8:00</option>
                            <option value="Australia/Yancowinna GMT+9:30">Australia/Yancowinna GMT+9:30</option>
                            <option value="Brazil/Acre GMT-5:00">Brazil/Acre GMT-5:00</option>
                            <option value="Brazil/DeNoronha GMT-2:00">Brazil/DeNoronha GMT-2:00</option>
                            <option value="Brazil/East GMT-3:00">Brazil/East GMT-3:00</option>
                            <option value="Brazil/West GMT-4:00">Brazil/West GMT-4:00</option>
                            <option value="CET GMT+1:00">CET GMT+1:00</option>
                            <option value="CST6CDT GMT-6:00">CST6CDT GMT-6:00</option>
                            <option value="Canada/Atlantic GMT-4:00">Canada/Atlantic GMT-4:00</option>
                            <option value="Canada/Central GMT-6:00">Canada/Central GMT-6:00</option>
                            <option value="Canada/Eastern GMT-5:00">Canada/Eastern GMT-5:00</option>
                            <option value="Canada/Mountain GMT-7:00">Canada/Mountain GMT-7:00</option>
                            <option value="Canada/Newfoundland GMT-4:30">Canada/Newfoundland GMT-4:30</option>
                            <option value="Canada/Pacific GMT-8:00">Canada/Pacific GMT-8:00</option>
                            <option value="Canada/Saskatchewan GMT-6:00">Canada/Saskatchewan GMT-6:00</option>
                            <option value="Canada/Yukon GMT-8:00">Canada/Yukon GMT-8:00</option>
                            <option value="Chile/Continental GMT-4:00">Chile/Continental GMT-4:00</option>
                            <option value="Chile/EasterIsland GMT-6:00">Chile/EasterIsland GMT-6:00</option>
                            <option value="Cuba GMT-5:00">Cuba GMT-5:00</option>
                            <option value="EET GMT+2:00">EET GMT+2:00</option>
                            <option value="EST5EDT GMT-5:00">EST5EDT GMT-5:00</option>
                            <option value="Egypt GMT+2:00">Egypt GMT+2:00</option>
                            <option value="Eire GMT+0:00">Eire GMT+0:00</option>
                            <option value="Etc/GMT GMT+0:00">Etc/GMT GMT+0:00</option>
                            <option value="Etc/GMT+0 GMT+0:00">Etc/GMT+0 GMT+0:00</option>
                            <option value="Etc/GMT+1 GMT-1:00">Etc/GMT+1 GMT-1:00</option>
                            <option value="Etc/GMT+10 GMT-10:00">Etc/GMT+10 GMT-10:00</option>
                            <option value="Etc/GMT+11 GMT-11:00">Etc/GMT+11 GMT-11:00</option>
                            <option value="Etc/GMT+12 GMT-12:00">Etc/GMT+12 GMT-12:00</option>
                            <option value="Etc/GMT+2 GMT-2:00">Etc/GMT+2 GMT-2:00</option>
                            <option value="Etc/GMT+3 GMT-3:00">Etc/GMT+3 GMT-3:00</option>
                            <option value="Etc/GMT+4 GMT-4:00">Etc/GMT+4 GMT-4:00</option>
                            <option value="Etc/GMT+5 GMT-5:00">Etc/GMT+5 GMT-5:00</option>
                            <option value="Etc/GMT+6 GMT-6:00">Etc/GMT+6 GMT-6:00</option>
                            <option value="Etc/GMT+7 GMT-7:00">Etc/GMT+7 GMT-7:00</option>
                            <option value="Etc/GMT+8 GMT-8:00">Etc/GMT+8 GMT-8:00</option>
                            <option value="Etc/GMT+9 GMT-9:00">Etc/GMT+9 GMT-9:00</option>
                            <option value="Etc/GMT-0 GMT+0:00">Etc/GMT-0 GMT+0:00</option>
                            <option value="Etc/GMT-1 GMT+1:00">Etc/GMT-1 GMT+1:00</option>
                            <option value="Etc/GMT-10 GMT+10:00">Etc/GMT-10 GMT+10:00</option>
                            <option value="Etc/GMT-11 GMT+11:00">Etc/GMT-11 GMT+11:00</option>
                            <option value="Etc/GMT-12 GMT+12:00">Etc/GMT-12 GMT+12:00</option>
                            <option value="Etc/GMT-13 GMT+13:00">Etc/GMT-13 GMT+13:00</option>
                            <option value="Etc/GMT-14 GMT+14:00">Etc/GMT-14 GMT+14:00</option>
                            <option value="Etc/GMT-2 GMT+2:00">Etc/GMT-2 GMT+2:00</option>
                            <option value="Etc/GMT-3 GMT+3:00">Etc/GMT-3 GMT+3:00</option>
                            <option value="Etc/GMT-4 GMT+4:00">Etc/GMT-4 GMT+4:00</option>
                            <option value="Etc/GMT-5 GMT+5:00">Etc/GMT-5 GMT+5:00</option>
                            <option value="Etc/GMT-6 GMT+6:00">Etc/GMT-6 GMT+6:00</option>
                            <option value="Etc/GMT-7 GMT+7:00">Etc/GMT-7 GMT+7:00</option>
                            <option value="Etc/GMT-8 GMT+8:00">Etc/GMT-8 GMT+8:00</option>
                            <option value="Etc/GMT-9 GMT+9:00">Etc/GMT-9 GMT+9:00</option>
                            <option value="Etc/GMT0 GMT+0:00">Etc/GMT0 GMT+0:00</option>
                            <option value="Etc/Greenwich GMT+0:00">Etc/Greenwich GMT+0:00</option>
                            <option value="Etc/UCT GMT+0:00">Etc/UCT GMT+0:00</option>
                            <option value="Etc/UTC GMT+0:00">Etc/UTC GMT+0:00</option>
                            <option value="Etc/Universal GMT+0:00">Etc/Universal GMT+0:00</option>
                            <option value="Etc/Zulu GMT+0:00">Etc/Zulu GMT+0:00</option>
                            <option value="Europe/Amsterdam GMT+1:00">Europe/Amsterdam GMT+1:00</option>
                            <option value="Europe/Andorra GMT+1:00">Europe/Andorra GMT+1:00</option>
                            <option value="Europe/Astrakhan GMT+4:00">Europe/Astrakhan GMT+4:00</option>
                            <option value="Europe/Athens GMT+2:00">Europe/Athens GMT+2:00</option>
                            <option value="Europe/Belfast GMT+0:00">Europe/Belfast GMT+0:00</option>
                            <option value="Europe/Belgrade GMT+1:00">Europe/Belgrade GMT+1:00</option>
                            <option value="Europe/Berlin GMT+1:00">Europe/Berlin GMT+1:00</option>
                            <option value="Europe/Bratislava GMT+1:00">Europe/Bratislava GMT+1:00</option>
                            <option value="Europe/Brussels GMT+1:00">Europe/Brussels GMT+1:00</option>
                            <option value="Europe/Bucharest GMT+2:00">Europe/Bucharest GMT+2:00</option>
                            <option value="Europe/Budapest GMT+1:00">Europe/Budapest GMT+1:00</option>
                            <option value="Europe/Busingen GMT+1:00">Europe/Busingen GMT+1:00</option>
                            <option value="Europe/Chisinau GMT+2:00">Europe/Chisinau GMT+2:00</option>
                            <option value="Europe/Copenhagen GMT+1:00">Europe/Copenhagen GMT+1:00</option>
                            <option value="Europe/Dublin GMT+0:00">Europe/Dublin GMT+0:00</option>
                            <option value="Europe/Gibraltar GMT+1:00">Europe/Gibraltar GMT+1:00</option>
                            <option value="Europe/Guernsey GMT+0:00">Europe/Guernsey GMT+0:00</option>
                            <option value="Europe/Helsinki GMT+2:00">Europe/Helsinki GMT+2:00</option>
                            <option value="Europe/Isle_of_Man GMT+0:00">Europe/Isle_of_Man GMT+0:00</option>
                            <option value="Europe/Istanbul GMT+3:00">Europe/Istanbul GMT+3:00</option>
                            <option value="Europe/Jersey GMT+0:00">Europe/Jersey GMT+0:00</option>
                            <option value="Europe/Kaliningrad GMT+2:00">Europe/Kaliningrad GMT+2:00</option>
                            <option value="Europe/Kiev GMT+2:00">Europe/Kiev GMT+2:00</option>
                            <option value="Europe/Kirov GMT+3:00">Europe/Kirov GMT+3:00</option>
                            <option value="Europe/Lisbon GMT+0:00">Europe/Lisbon GMT+0:00</option>
                            <option value="Europe/Ljubljana GMT+1:00">Europe/Ljubljana GMT+1:00</option>
                            <option value="Europe/London GMT+0:00">Europe/London GMT+0:00</option>
                            <option value="Europe/Luxembourg GMT+1:00">Europe/Luxembourg GMT+1:00</option>
                            <option value="Europe/Madrid GMT+1:00">Europe/Madrid GMT+1:00</option>
                            <option value="Europe/Malta GMT+1:00">Europe/Malta GMT+1:00</option>
                            <option value="Europe/Mariehamn GMT+2:00">Europe/Mariehamn GMT+2:00</option>
                            <option value="Europe/Minsk GMT+3:00">Europe/Minsk GMT+3:00</option>
                            <option value="Europe/Monaco GMT+1:00">Europe/Monaco GMT+1:00</option>
                            <option value="Europe/Moscow GMT+3:00">Europe/Moscow GMT+3:00</option>
                            <option value="Europe/Nicosia GMT+2:00">Europe/Nicosia GMT+2:00</option>
                            <option value="Europe/Oslo GMT+1:00">Europe/Oslo GMT+1:00</option>
                            <option value="Europe/Paris GMT+1:00">Europe/Paris GMT+1:00</option>
                            <option value="Europe/Podgorica GMT+1:00">Europe/Podgorica GMT+1:00</option>
                            <option value="Europe/Prague GMT+1:00">Europe/Prague GMT+1:00</option>
                            <option value="Europe/Riga GMT+2:00">Europe/Riga GMT+2:00</option>
                            <option value="Europe/Rome GMT+1:00">Europe/Rome GMT+1:00</option>
                            <option value="Europe/Samara GMT+4:00">Europe/Samara GMT+4:00</option>
                            <option value="Europe/San_Marino GMT+1:00">Europe/San_Marino GMT+1:00</option>
                            <option value="Europe/Sarajevo GMT+1:00">Europe/Sarajevo GMT+1:00</option>
                            <option value="Europe/Saratov GMT+4:00">Europe/Saratov GMT+4:00</option>
                            <option value="Europe/Simferopol GMT+3:00">Europe/Simferopol GMT+3:00</option>
                            <option value="Europe/Skopje GMT+1:00">Europe/Skopje GMT+1:00</option>
                            <option value="Europe/Sofia GMT+2:00">Europe/Sofia GMT+2:00</option>
                            <option value="Europe/Stockholm GMT+1:00">Europe/Stockholm GMT+1:00</option>
                            <option value="Europe/Tallinn GMT+2:00">Europe/Tallinn GMT+2:00</option>
                            <option value="Europe/Tirane GMT+1:00">Europe/Tirane GMT+1:00</option>
                            <option value="Europe/Tiraspol GMT+2:00">Europe/Tiraspol GMT+2:00</option>
                            <option value="Europe/Ulyanovsk GMT+4:00">Europe/Ulyanovsk GMT+4:00</option>
                            <option value="Europe/Uzhgorod GMT+2:00">Europe/Uzhgorod GMT+2:00</option>
                            <option value="Europe/Vaduz GMT+1:00">Europe/Vaduz GMT+1:00</option>
                            <option value="Europe/Vatican GMT+1:00">Europe/Vatican GMT+1:00</option>
                            <option value="Europe/Vienna GMT+1:00">Europe/Vienna GMT+1:00</option>
                            <option value="Europe/Vilnius GMT+2:00">Europe/Vilnius GMT+2:00</option>
                            <option value="Europe/Volgograd GMT+4:00">Europe/Volgograd GMT+4:00</option>
                            <option value="Europe/Warsaw GMT+1:00">Europe/Warsaw GMT+1:00</option>
                            <option value="Europe/Zagreb GMT+1:00">Europe/Zagreb GMT+1:00</option>
                            <option value="Europe/Zaporozhye GMT+2:00">Europe/Zaporozhye GMT+2:00</option>
                            <option value="Europe/Zurich GMT+1:00">Europe/Zurich GMT+1:00</option>
                            <option value="GB GMT+0:00">GB GMT+0:00</option>
                            <option value="GB-Eire GMT+0:00">GB-Eire GMT+0:00</option>
                            <option value="GMT GMT+0:00">GMT GMT+0:00</option>
                            <option value="GMT0 GMT+0:00">GMT0 GMT+0:00</option>
                            <option value="Greenwich GMT+0:00">Greenwich GMT+0:00</option>
                            <option value="Hongkong GMT+8:00">Hongkong GMT+8:00</option>
                            <option value="Iceland GMT+0:00">Iceland GMT+0:00</option>
                            <option value="Indian/Antananarivo GMT+3:00">Indian/Antananarivo GMT+3:00</option>
                            <option value="Indian/Chagos GMT+6:00">Indian/Chagos GMT+6:00</option>
                            <option value="Indian/Christmas GMT+7:00">Indian/Christmas GMT+7:00</option>
                            <option value="Indian/Cocos GMT+6:30">Indian/Cocos GMT+6:30</option>
                            <option value="Indian/Comoro GMT+3:00">Indian/Comoro GMT+3:00</option>
                            <option value="Indian/Kerguelen GMT+5:00">Indian/Kerguelen GMT+5:00</option>
                            <option value="Indian/Mahe GMT+4:00">Indian/Mahe GMT+4:00</option>
                            <option value="Indian/Maldives GMT+5:00">Indian/Maldives GMT+5:00</option>
                            <option value="Indian/Mauritius GMT+4:00">Indian/Mauritius GMT+4:00</option>
                            <option value="Indian/Mayotte GMT+3:00">Indian/Mayotte GMT+3:00</option>
                            <option value="Indian/Reunion GMT+4:00">Indian/Reunion GMT+4:00</option>
                            <option value="Iran GMT+3:30">Iran GMT+3:30</option>
                            <option value="Israel GMT+2:00">Israel GMT+2:00</option>
                            <option value="Jamaica GMT-5:00">Jamaica GMT-5:00</option>
                            <option value="Japan GMT+9:00">Japan GMT+9:00</option>
                            <option value="Kwajalein GMT+12:00">Kwajalein GMT+12:00</option>
                            <option value="Libya GMT+2:00">Libya GMT+2:00</option>
                            <option value="MET GMT+1:00">MET GMT+1:00</option>
                            <option value="MST7MDT GMT-7:00">MST7MDT GMT-7:00</option>
                            <option value="Mexico/BajaNorte GMT-8:00">Mexico/BajaNorte GMT-8:00</option>
                            <option value="Mexico/BajaSur GMT-7:00">Mexico/BajaSur GMT-7:00</option>
                            <option value="Mexico/General GMT-6:00">Mexico/General GMT-6:00</option>
                            <option value="NZ GMT+12:00">NZ GMT+12:00</option>
                            <option value="NZ-CHAT GMT+12:45">NZ-CHAT GMT+12:45</option>
                            <option value="Navajo GMT-7:00">Navajo GMT-7:00</option>
                            <option value="PRC GMT+8:00">PRC GMT+8:00</option>
                            <option value="PST8PDT GMT-8:00">PST8PDT GMT-8:00</option>
                            <option value="Pacific/Apia GMT+13:00">Pacific/Apia GMT+13:00</option>
                            <option value="Pacific/Auckland GMT+12:00">Pacific/Auckland GMT+12:00</option>
                            <option value="Pacific/Bougainville GMT+11:00">Pacific/Bougainville GMT+11:00</option>
                            <option value="Pacific/Chatham GMT+12:45">Pacific/Chatham GMT+12:45</option>
                            <option value="Pacific/Chuuk GMT+10:00">Pacific/Chuuk GMT+10:00</option>
                            <option value="Pacific/Easter GMT-6:00">Pacific/Easter GMT-6:00</option>
                            <option value="Pacific/Efate GMT+11:00">Pacific/Efate GMT+11:00</option>
                            <option value="Pacific/Enderbury GMT+13:00">Pacific/Enderbury GMT+13:00</option>
                            <option value="Pacific/Fakaofo GMT+13:00">Pacific/Fakaofo GMT+13:00</option>
                            <option value="Pacific/Fiji GMT+12:00">Pacific/Fiji GMT+12:00</option>
                            <option value="Pacific/Funafuti GMT+12:00">Pacific/Funafuti GMT+12:00</option>
                            <option value="Pacific/Galapagos GMT-6:00">Pacific/Galapagos GMT-6:00</option>
                            <option value="Pacific/Gambier GMT-9:00">Pacific/Gambier GMT-9:00</option>
                            <option value="Pacific/Guadalcanal GMT+11:00">Pacific/Guadalcanal GMT+11:00</option>
                            <option value="Pacific/Guam GMT+10:00">Pacific/Guam GMT+10:00</option>
                            <option value="Pacific/Honolulu GMT-10:00">Pacific/Honolulu GMT-10:00</option>
                            <option value="Pacific/Johnston GMT-10:00">Pacific/Johnston GMT-10:00</option>
                            <option value="Pacific/Kiritimati GMT+14:00">Pacific/Kiritimati GMT+14:00</option>
                            <option value="Pacific/Kosrae GMT+11:00">Pacific/Kosrae GMT+11:00</option>
                            <option value="Pacific/Kwajalein GMT+12:00">Pacific/Kwajalein GMT+12:00</option>
                            <option value="Pacific/Majuro GMT+12:00">Pacific/Majuro GMT+12:00</option>
                            <option value="Pacific/Marquesas GMT-10:30">Pacific/Marquesas GMT-10:30</option>
                            <option value="Pacific/Midway GMT-11:00">Pacific/Midway GMT-11:00</option>
                            <option value="Pacific/Nauru GMT+12:00">Pacific/Nauru GMT+12:00</option>
                            <option value="Pacific/Niue GMT-11:00">Pacific/Niue GMT-11:00</option>
                            <option value="Pacific/Norfolk GMT+11:00">Pacific/Norfolk GMT+11:00</option>
                            <option value="Pacific/Noumea GMT+11:00">Pacific/Noumea GMT+11:00</option>
                            <option value="Pacific/Pago_Pago GMT-11:00">Pacific/Pago_Pago GMT-11:00</option>
                            <option value="Pacific/Palau GMT+9:00">Pacific/Palau GMT+9:00</option>
                            <option value="Pacific/Pitcairn GMT-8:00">Pacific/Pitcairn GMT-8:00</option>
                            <option value="Pacific/Pohnpei GMT+11:00">Pacific/Pohnpei GMT+11:00</option>
                            <option value="Pacific/Ponape GMT+11:00">Pacific/Ponape GMT+11:00</option>
                            <option value="Pacific/Port_Moresby GMT+10:00">Pacific/Port_Moresby GMT+10:00</option>
                            <option value="Pacific/Rarotonga GMT-10:00">Pacific/Rarotonga GMT-10:00</option>
                            <option value="Pacific/Saipan GMT+10:00">Pacific/Saipan GMT+10:00</option>
                            <option value="Pacific/Samoa GMT-11:00">Pacific/Samoa GMT-11:00</option>
                            <option value="Pacific/Tahiti GMT-10:00">Pacific/Tahiti GMT-10:00</option>
                            <option value="Pacific/Tarawa GMT+12:00">Pacific/Tarawa GMT+12:00</option>
                            <option value="Pacific/Tongatapu GMT+13:00">Pacific/Tongatapu GMT+13:00</option>
                            <option value="Pacific/Truk GMT+10:00">Pacific/Truk GMT+10:00</option>
                            <option value="Pacific/Wake GMT+12:00">Pacific/Wake GMT+12:00</option>
                            <option value="Pacific/Wallis GMT+12:00">Pacific/Wallis GMT+12:00</option>
                            <option value="Pacific/Yap GMT+10:00">Pacific/Yap GMT+10:00</option>
                            <option value="Poland GMT+1:00">Poland GMT+1:00</option>
                            <option value="Portugal GMT+0:00">Portugal GMT+0:00</option>
                            <option value="ROK GMT+9:00">ROK GMT+9:00</option>
                            <option value="Singapore GMT+8:00">Singapore GMT+8:00</option>
                            <option value="SystemV/AST4 GMT-4:00">SystemV/AST4 GMT-4:00</option>
                            <option value="SystemV/AST4ADT GMT-4:00">SystemV/AST4ADT GMT-4:00</option>
                            <option value="SystemV/CST6 GMT-6:00">SystemV/CST6 GMT-6:00</option>
                            <option value="SystemV/CST6CDT GMT-6:00">SystemV/CST6CDT GMT-6:00</option>
                            <option value="SystemV/EST5 GMT-5:00">SystemV/EST5 GMT-5:00</option>
                            <option value="SystemV/EST5EDT GMT-5:00">SystemV/EST5EDT GMT-5:00</option>
                            <option value="SystemV/HST10 GMT-10:00">SystemV/HST10 GMT-10:00</option>
                            <option value="SystemV/MST7 GMT-7:00">SystemV/MST7 GMT-7:00</option>
                            <option value="SystemV/MST7MDT GMT-7:00">SystemV/MST7MDT GMT-7:00</option>
                            <option value="SystemV/PST8 GMT-8:00">SystemV/PST8 GMT-8:00</option>
                            <option value="SystemV/PST8PDT GMT-8:00">SystemV/PST8PDT GMT-8:00</option>
                            <option value="SystemV/YST9 GMT-9:00">SystemV/YST9 GMT-9:00</option>
                            <option value="SystemV/YST9YDT GMT-9:00">SystemV/YST9YDT GMT-9:00</option>
                            <option value="Turkey GMT+3:00">Turkey GMT+3:00</option>
                            <option value="UCT GMT+0:00">UCT GMT+0:00</option>
                            <option value="US/Alaska GMT-9:00">US/Alaska GMT-9:00</option>
                            <option value="US/Aleutian GMT-10:00">US/Aleutian GMT-10:00</option>
                            <option value="US/Arizona GMT-7:00">US/Arizona GMT-7:00</option>
                            <option value="US/Central GMT-6:00">US/Central GMT-6:00</option>
                            <option value="US/East-Indiana GMT-5:00">US/East-Indiana GMT-5:00</option>
                            <option value="US/Eastern GMT-5:00">US/Eastern GMT-5:00</option>
                            <option value="US/Hawaii GMT-10:00">US/Hawaii GMT-10:00</option>
                            <option value="US/Indiana-Starke GMT-6:00">US/Indiana-Starke GMT-6:00</option>
                            <option value="US/Michigan GMT-5:00">US/Michigan GMT-5:00</option>
                            <option value="US/Mountain GMT-7:00">US/Mountain GMT-7:00</option>
                            <option value="US/Pacific GMT-8:00">US/Pacific GMT-8:00</option>
                            <option value="US/Pacific-New GMT-8:00">US/Pacific-New GMT-8:00</option>
                            <option value="US/Samoa GMT-11:00">US/Samoa GMT-11:00</option>
                            <option value="UTC GMT+0:00">UTC GMT+0:00</option>
                            <option value="Universal GMT+0:00">Universal GMT+0:00</option>
                            <option value="W-SU GMT+3:00">W-SU GMT+3:00</option>
                            <option value="WET GMT+0:00">WET GMT+0:00</option>
                            <option value="Zulu GMT+0:00">Zulu GMT+0:00</option>
                            <option value="EST GMT-5:00">EST GMT-5:00</option>
                            <option value="HST GMT-10:00">HST GMT-10:00</option>
                            <option value="MST GMT-7:00">MST GMT-7:00</option>
                            <option value="ACT GMT+9:30">ACT GMT+9:30</option>
                            <option value="AET GMT+10:00">AET GMT+10:00</option>
                            <option value="AGT GMT-3:00">AGT GMT-3:00</option>
                            <option value="ART GMT+2:00">ART GMT+2:00</option>
                            <option value="AST GMT-9:00">AST GMT-9:00</option>
                            <option value="BET GMT-3:00">BET GMT-3:00</option>
                            <option value="BST GMT+6:00">BST GMT+6:00</option>
                            <option value="CAT GMT+2:00">CAT GMT+2:00</option>
                            <option value="CNT GMT-4:30">CNT GMT-4:30</option>
                            <option value="CST GMT-6:00">CST GMT-6:00</option>
                            <option value="CTT GMT+8:00">CTT GMT+8:00</option>
                            <option value="EAT GMT+3:00">EAT GMT+3:00</option>
                            <option value="ECT GMT+1:00">ECT GMT+1:00</option>
                            <option value="IET GMT-5:00">IET GMT-5:00</option>
                            <option value="IST GMT+5:30">IST GMT+5:30</option>
                            <option value="JST GMT+9:00">JST GMT+9:00</option>
                            <option value="MIT GMT+13:00">MIT GMT+13:00</option>
                            <option value="NET GMT+4:00">NET GMT+4:00</option>
                            <option value="NST GMT+12:00">NST GMT+12:00</option>
                            <option value="PLT GMT+5:00">PLT GMT+5:00</option>
                            <option value="PNT GMT-7:00">PNT GMT-7:00</option>
                            <option value="PRT GMT-4:00">PRT GMT-4:00</option>
                            <option value="PST GMT-8:00">PST GMT-8:00</option>
                            <option value="SST GMT+11:00">SST GMT+11:00</option>
                            <option value="VST GMT+7:00">VST GMT+7:00</option>

                        </select>
                    </div>



                    <div class="col-md-12">
                        <table class="table table-bordered table-striped table-hover rowfy">

                            <tbody>
                            <tr>
                                <td>
                                    <div class="col-md-12">
                                        <label for="Choose_days"  class="form-label">Choose Days</label>
                                        <select id="Choose_days" name="day[]" class="form-select">

                                            <option selected value="Mon-Fri">Mon-Fri</option>
                                            <option selected value="Mon-Sun">All 7 Days</option>

                                        </select>
                                    </div>
                                </td>
                                <td>
                                    <div class="col-md-12">
                                        <label for="inputState" class="form-label">From</label>
                                        <select id="Choose_days" name="from[]" class="form-select">

                                            <option value="12:00 AM">12:00 AM</option>
                                            <option value="1:00 AM">01:00 AM</option>
                                            <option value="02:00 AM">02:00 AM</option>
                                            <option value="03:00 AM">03:00 AM</option>
                                            <option value="04:00 AM">04:00 AM</option>
                                            <option value="05:00 AM">05:00 AM</option>
                                            <option value="06:00 AM">06:00 AM</option>
                                            <option value="07:00 AM">07:00 AM</option>
                                            <option value="08:00 AM">08:00 AM</option>
                                            <option value="09:00 AM">09:00 AM</option>
                                            <option value="10:00 AM">10:00 AM</option>
                                            <option value="11:00 AM">11:00 AM</option>
                                            <option value="12:00 PM">12:00 PM</option>
                                            <option value="01:00 PM">01:00 PM</option>
                                            <option value="02:00 PM">02:00 PM</option>
                                            <option value="03:00 PM">03:00 PM</option>
                                            <option value="04:00 PM">04:00 PM</option>
                                            <option value="05:00 PM">05:00 PM</option>
                                            <option value="06:00 PM">06:00 PM</option>
                                            <option value="07:00 PM">07:00 PM</option>
                                            <option value="08:00 PM">08:00 PM</option>
                                            <option value="09:00 PM">09:00 PM</option>
                                            <option value="10:00 PM">10:00 PM</option>
                                            <option value="11:00 PM">11:00 PM</option>
                                        </select>
                                    </div>
                                </td>
                                <td>
                                    <div class="col-md-12">
                                        <label for="inputZip" class="form-label">To</label>
                                        <select id="Choose_days" name="to[]" class="form-select">

                                            <option value="12:00 AM">12:00 AM</option>
                                            <option value="1:00 AM">01:00 AM</option>
                                            <option value="02:00 AM">02:00 AM</option>
                                            <option value="03:00 AM">03:00 AM</option>
                                            <option value="04:00 AM">04:00 AM</option>
                                            <option value="05:00 AM">05:00 AM</option>
                                            <option value="06:00 AM">06:00 AM</option>
                                            <option value="07:00 AM">07:00 AM</option>
                                            <option value="08:00 AM">08:00 AM</option>
                                            <option value="09:00 AM">09:00 AM</option>
                                            <option value="10:00 AM">10:00 AM</option>
                                            <option value="11:00 AM">11:00 AM</option>
                                            <option value="12:00 PM">12:00 PM</option>
                                            <option value="01:00 PM">01:00 PM</option>
                                            <option value="02:00 PM">02:00 PM</option>
                                            <option value="03:00 PM">03:00 PM</option>
                                            <option value="04:00 PM">04:00 PM</option>
                                            <option value="05:00 PM">05:00 PM</option>
                                            <option value="06:00 PM">06:00 PM</option>
                                            <option value="07:00 PM">07:00 PM</option>
                                            <option value="08:00 PM">08:00 PM</option>
                                            <option value="09:00 PM">09:00 PM</option>
                                            <option value="10:00 PM">10:00 PM</option>
                                            <option value="11:00 PM">11:00 PM</option>
                                        </select>
                                    </div>
                                </td>
                            </tr>

                            </tbody>
                        </table>
                    </div>
                    <div class="col-md-12">
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" name="message"  id="flexCheckDefault">
                            <label for="floatingTextarea">
                                <strong>
                                    Our working hour is 8 am-5 pm Monday-Friday and 8 am-1 pm on Saturday. We are off on Sunday (We are in the Bangladeshi timezone GMAT+6). You can convert the Bangladeshi timezone to your timezone here:
                                    <a target="_blank" href="https://dateful.com/time-zone-converter">https://dateful.com/time-zone-converter</a>. We may not be able to reply outside of our working hours. Please confirm if you are okay
                                    with this?
                                </strong>
                            </label>

                        </div>
                    </div>
                    <div class="col-md-12">
                        <div class="form-check">


                            <input class="form-check-input" type="checkbox" name="check"  id="flexCheckDefault">
                            <label for="floatingTextarea">
                                <strong>
                                    Please check this box if you want to receive marketing tips, tricks, and the latest hacks from us occasionally. Rest assured, our intention will be to share useful marketing ideas with you that can get you targeted leads regularly.
                                </strong>
                            </label>
                        </div>
                    </div>

                    <div class="col-12 text-center">
                        <button type="submit" class="btn btn-primary sp1submit rounded-pill py-0 px-5">Submit</button>
                    </div>
                </form>

            </div>
            <div class="col-md-2"></div>
        </div>
    </div>
</section>





<script src="{{asset('custom/client/js/jquery-3.5.1.min.js')}}"></script>

<script src="https://stackpath.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>
<script src="{{asset('custom/client/js/intlTelInput.js')}}"></script>
<script src="{{asset('custom/client/js/rowfy.js')}}"></script>
<script src="https://cdn.jsdelivr.net/npm/summernote@0.8.18/dist/summernote.min.js"></script>
<script type="text/javascript">
    $(document).ready(function () {
        $("#timezone").summernote();
    });
    $(document).ready(function () {
        $("#whatsapp").summernote();
    });
    $(document).ready(function () {
        $("#message").summernote();
    });
    $(document).ready(function () {
        $("#platform").summernote();
    });

</script>
<script>
    const phoneInputField = document.querySelector("#phone");
    const phoneInputField2 = document.querySelector("#phone2");
    const phoneInput = window.intlTelInput(phoneInputField,phoneInputField2, {
        utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js",
    });
</script>



<script src="https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/11.0.9/js/intlTelInput.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/11.0.9/js/intlTelInput.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/11.0.9/js/utils.js"></script>

<script src="{{asset('mobile/js/mask.js')}}"></script>
<script src="{{asset('mobile/js/mask_list.js')}}"></script>

<script>
    mask("#phone");
    mask("#phone2");
</script>




<script>
    function getIp(callback) {
        fetch("https://ipinfo.io/json?token=<your token>", { headers: { Accept: "application/json" } })
            .then((resp) => resp.json())
            .catch(() => {
                return {
                    country: "us",
                };
            })
            .then((resp) => callback(resp.country));
    }
</script>
<script src="{{asset('toastr/toastr.min.js')}}"></script>
{!! Toastr::message() !!}

</body>
</html>
