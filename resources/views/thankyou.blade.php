<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <title></title>
  <link rel="stylesheet" href="{{asset('/common/style.css')}}">
  <link href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.0.0-
     alpha/css/bootstrap.css" rel="stylesheet">

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>

	<link rel="stylesheet" type="text/css"
     href="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.min.css">

    <script src="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/js/toastr.min.js"></script>
  </head>
  <body>
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.3.1/css/all.css" integrity="sha384-mzrmE5qonljUremFsqc01SB46JvROS7bZs3IO2EmfFsd15uHvIt+Y8vEf7N7fWAU" crossorigin="anonymous"><meta name="google-site-verification" content="OBHSOz2bJypVuqhse4EbUNPh6u4nlzaqmKaLoOryaqs" />
<main>
  <div class="email-container">
  <div class="email-body">
    <div class="banner">
        <h2>Submission Successful</h2>

      <h1>Thank You</h1>
        <h2>We've Got Your Information</h2>
    </div>
    <div class="email-content">
      <p>Hi there!</p>
      <p>Thank you for subscribing. We're so excited to share the latest news and updates about our product with you. If you'd like to learn more, follow us on social media!</p>
      <a href="#"><i class="fab fa-facebook-square"></i> Check us out on Facebook</a><br>
      <a href="#"><i class="fab fa-twitter-square"></i> Follow Us on Twitter</a>
    <hr>
    <p>Sincerely,</p>
    <p class="sig">Melissa</p>
    <p><em>Melissa A.</em>
    <br>Customer Success Manager</p>
    </div>
  </div>
</div>
</main>
<footer>
  <p>unsubscribe</p>
</footer>
<script>
  @if(Session::has('message'))
  toastr.options =
  {
  	"closeButton" : true,
  	"progressBar" : true
  }
  		toastr.success("{{ session('message') }}");
  @endif

  @if(Session::has('error'))
  toastr.options =
  {
  	"closeButton" : true,
  	"progressBar" : true
  }
  		toastr.error("{{ session('error') }}");
  @endif

  @if(Session::has('info'))
  toastr.options =
  {
  	"closeButton" : true,
  	"progressBar" : true
  }
  		toastr.info("{{ session('info') }}");
  @endif

  @if(Session::has('warning'))
  toastr.options =
  {
  	"closeButton" : true,
  	"progressBar" : true
  }
  		toastr.warning("{{ session('warning') }}");
  @endif
</script>
  </body>
</html>
