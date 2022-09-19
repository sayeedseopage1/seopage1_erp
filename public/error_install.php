<html>
<head>
    <title>Worksuite Not installed</title>
    <link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css">
</head>


<body>
<!-- Page Content -->
<div class="container">
    <div class="row" style="margin-top: 30px">
        <div class="text-center m-t-20 mt-20">
            <h2>Fix the following errors</h2>
        </div>

        <?php if ($GLOBALS['error_type'] == 'php-version') { ?>
            <div class="alert alert-danger">
                <div class="row text-center">
                    <div class="col-md-12"><strong>Lower PHP version! </strong> Your server's php version is lower than
                        <b>8.0.1</b>. Please upgrade your version
                        to php version greater than equal <b>8.0.1</b> to make it work
                        <br>
                        <br>
                        <p class="">Your server current PHP version:
                            <b><?php echo phpversion(); ?></b></p>
                    </div>

                </div>


            </div>

        <?php } else { ?>
            <div class="alert alert-danger">
                <strong>.env file missing! </strong> You forgot to upload the .env file. For more info visit <a
                    href="https://froiden.freshdesk.com/support/solutions/articles/43000491463"
                    target="_blank">https://froiden.freshdesk.com/support/solutions/articles/43000491463</a>
            </div>
        <?php } ?>
    </div>
</div>

<script src="//cdnjs.cloudflare.com/ajax/libs/jquery/2.2.4/jquery.min.js"></script>
<script src="//maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js"></script>
</body>
</html>
