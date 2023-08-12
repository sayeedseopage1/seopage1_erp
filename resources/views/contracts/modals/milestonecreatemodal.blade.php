<div class="modal fade" id="milestoneaddmodal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Create Milestone</h5>
                <button type="button" class="btn-close" data-dismiss="modal" aria-label="Close"></button>
            </div>
            <?php
            $currencies= App\Models\Currency::all();
            ?>

            <div class="modal-body">
                <ul id="saveform_errList">

                </ul>
                <div class="row">


                    <div class="col-md-6">

                        <div class="form-group">
                            <label for="exampleFormControlInput1">Milestone Title <span style="color:red;">*</span>
                                <svg class="svg-inline--fa fa-question-circle fa-w-16" data-toggle="popover" data-placement="top" data-content="Write the milestone description here like “Home page development”, “Hosting setup” etc. Don’t put Milestone 1, Milestone 2 etc. here." data-html="true" data-trigger="hover" aria-hidden="true" focusable="false" data-prefix="fa" data-icon="question-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg="" data-original-title="" title="">
                                    <path fill="currentColor" d="M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zM262.655 90c-54.497 0-89.255 22.957-116.549 63.758-3.536 5.286-2.353 12.415 2.715 16.258l34.699 26.31c5.205 3.947 12.621 3.008 16.665-2.122 17.864-22.658 30.113-35.797 57.303-35.797 20.429 0 45.698 13.148 45.698 32.958 0 14.976-12.363 22.667-32.534 33.976C247.128 238.528 216 254.941 216 296v4c0 6.627 5.373 12 12 12h56c6.627 0 12-5.373 12-12v-1.333c0-28.462 83.186-29.647 83.186-106.667 0-58.002-60.165-102-116.531-102zM256 338c-25.365 0-46 20.635-46 46 0 25.364 20.635 46 46 46s46-20.636 46-46c0-25.365-20.635-46-46-46z"></path>
                                </svg>
                            </label>
                            <input type="text" name="title" class="form-control title height-35 f-14" id="exampleFormControlInput1"  placeholder="Milestone Name">
                        </div>

                    </div>
                    <div class="col-md-6">
                        <div class="form-group">
                            <label for="exampleFormControlInput1">Milestone Cost <span style="color:red;">*</span></label>
                            <input type="text" name="cost" class="form-control cost height-35 f-14" id="exampleFormControlInput1"  placeholder="Milestone Cost">
                        </div>

                    </div>
                    <?php
                    $original_currency_id = App\Models\Currency::where('id',$deal->original_currency_id)->first();
                    ?>
                    <div class="col-md-4">
                        <div class="form-group">
                            <label for="exampleFormControlInput1">Currency <span style="color:red;">*</span></label>
                            <input type="text" id="original_currency_id"  readonly value="{{$original_currency_id->currency_code}}({{$original_currency_id->currency_symbol}})"  class="form-control original_currency_id height-35 f-14" id="exampleFormControlInput1"  placeholder="{{$original_currency_id->currency_code}}({{$original_currency_id->currency_symbol}})">
                        </div>

                    </div>
                    <div class="col-md-4">
                        <div class="form-group">

                            <label for="exampleFormControlTextarea1">Milestone Type <span style="color:red;">*</span></label>
                            <select class="form-control milestone_type height-35 f-14" name="milestone_type">



                                <option value="Proposed Milestone">Proposed Milestone</option>
                                <option value="Client Agreed to this Milestone">Client Agreed to this Milestone</option>
                                <option value="Client Created this Milestone">Client Created this Milestone</option>

                            </select>
                        </div>
                    </div>

                     <div class="col-md-4">
                        <div class="form-group">
                            <label for="exampleFormControlTextarea1">Service Type <span style="color:red;">*</span></label>
                            <select class="form-control milestone_type height-35 f-14" name="service_type" id="service_type" onchange="generateURL()">
                                <option value="">--</option>
                                <option value="web-content">Webcontent</option>
                                <option value="blogs-articles">Blogs/articles</option>
                                <option value="product-description">Product descriptions</option>
                                <option value="product-category">Product category/collection pages</option>
                                <option value="basic-seo">Basic SEO</option>
                            </select>
                        </div>
                    </div>
                    <div class="col-md-4"></div>
                    <div class="col-md-8 mt-2" id="inputUrl" style="display: none;">
                        <div class="input-group">
                            <input type="text" class="form-control height-35 f-14" id="generatedLinkContainer" aria-label="Recipient's username" aria-describedby="copyButton" readonly>
                            <div class="input-group-append">
                                <button class="btn btn-outline-secondary" type="button" id="copyButton" data-id="{{$deal->id}}"><i class="fa fa-clone"></i></button>
                            </div>
                        </div>
                        <button type="submit" class="btn btn-primary mt-2" value="submitted" id="linkSubmit" disabled>Did You Submit?</button>
                    </div>
                    <div class="col-md-12">
                        <div class="form-group">
                            <label for="exampleFormControlTextarea1">Milestone Summary
                                <svg class="svg-inline--fa fa-question-circle fa-w-16" data-toggle="popover" data-placement="top" data-content="If you don’t have anything to elaborate here, just keep it same as milestone title." data-html="true" data-trigger="hover" aria-hidden="true" focusable="false" data-prefix="fa" data-icon="question-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg="" data-original-title="" title="">
                                    <path fill="currentColor" d="M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zM262.655 90c-54.497 0-89.255 22.957-116.549 63.758-3.536 5.286-2.353 12.415 2.715 16.258l34.699 26.31c5.205 3.947 12.621 3.008 16.665-2.122 17.864-22.658 30.113-35.797 57.303-35.797 20.429 0 45.698 13.148 45.698 32.958 0 14.976-12.363 22.667-32.534 33.976C247.128 238.528 216 254.941 216 296v4c0 6.627 5.373 12 12 12h56c6.627 0 12-5.373 12-12v-1.333c0-28.462 83.186-29.647 83.186-106.667 0-58.002-60.165-102-116.531-102zM256 338c-25.365 0-46 20.635-46 46 0 25.364 20.635 46 46 46s46-20.636 46-46c0-25.365-20.635-46-46-46z"></path>
                                </svg>
                            </label>
                            <textarea  name="summary" id="summary1" class="form-control" rows="3" ></textarea>
                           <script src="{{ asset('/ckeditor/ckeditor.js') }}"></script>
                            <script>
                                CKEDITOR.replace('summary1');
                            </script>
                        </div>

                    </div>



                </div>





            </div>
            <div class="modal-footer">

                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary add_milestone" disabled>Create Milestone</button>

            </div>

        </div>

    </div>
</div>
<script>
    $('#linkSubmit').click(function(e){
        e.preventDefault();
        // console.log(formData);
        $('#linkSubmit').attr("disabled", true);
        $('#linkSubmit').html("Processing...");
        var buttonValue = $(this).val();
        var linkId = $('#generatedLinkContainer').attr('data-link-id');
        var data= {
            '_token': "{{ csrf_token() }}",
            'value': buttonValue,
            'deal_id': {{$deal->id}},
            'random_id': linkId,
            'service_type': document.getElementById("service_type").value,
        }
        // console.log(data);
        $.ajaxSetup({

            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            }
        });
        $.ajax({
            type: "POST",
            url: "{{route('store-link')}}",
            data: data,
            dataType: "json",
            success: function (response) {
                $('#inputUrl').hide();
                $('.add_milestone').attr("disabled", false);
                toastr.success('Link Submit Successfully');
                $('#linkSubmit').attr("disabled", false);
                $('#linkSubmit').html("Did You Submit?");
            },
            error: function(error) {
                $('#linkSubmit').attr("disabled", false);
                $('#linkSubmit').html("Did You Submit?");
            }
        });
    });
</script>
<script type="text/javascript">
    function generateRandomID(length) {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let randomID = '';
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            randomID += characters.charAt(randomIndex);
        }
        return randomID;
    }

    function generateURL() {
        var select = document.querySelector('#service_type');
        var selectedValue = select.value;

        var randomID = generateRandomID(5);

        var url = 'http://127.0.0.1:8000/deals/service-type/' + encodeURIComponent(selectedValue.toLowerCase().replace(/ /g, '-')) + '/'  + <?php echo $deal->id; ?> + '/' + randomID;

        var generatedLinkContainer = document.getElementById('generatedLinkContainer');
        generatedLinkContainer.value = url;
        generatedLinkContainer.setAttribute('data-link-id', randomID);
    }

    const selectElement = document.getElementById("service_type");
    const inputUrl = document.getElementById("inputUrl");

    selectElement.addEventListener("change", function() {
        if (selectElement.value === "web-content" ||
            selectElement.value === "blogs-articles" ||
            selectElement.value === "product-description" ||
            selectElement.value === "product-category" ||
            selectElement.value === "basic-seo") {
            inputUrl.style.display = "block";
        } else {
            inputUrl.style.display = "none";
        }
    });

    document.getElementById("copyButton").addEventListener("click", function() {
        var generatedLink = document.getElementById("generatedLinkContainer").value;

        navigator.clipboard.writeText(generatedLink)
            .then(function() {
                alert("Copied: " + generatedLink);
                document.getElementById("linkSubmit").removeAttribute("disabled");
            })
            .catch(function(error) {
                alert("Unable to copy: " + error);
            });
    });
</script>
