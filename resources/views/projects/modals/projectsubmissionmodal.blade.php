
<div class="modal fade" id="ProjectSubmissionModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog d-flex justify-content-center align-items-center modal-xl">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Project Completion Request Form</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <?php
      $project_submission= App\Models\ProjectSubmission::where('project_id',$project->id)->orderBy('id','desc')->first();
       ?>
      <form class="" action="{{route('project-submit-accept')}}" method="post">
        @csrf
        <input type="hidden" name="id" value="{{$project_submission->id}}">


      <div class="modal-body bg-additional-grey">


                                <div class="card bg-white border-0 b-shadow-4">

                        <div class="card-body ">
                          @if($project_submission->actual_link != null)
                          <h6 class="text-center"> <strong>Actual Site Link: </strong><a href="{{$project_submission->actual_link}}" target="_blank">{{$project_submission->actual_link}}</a></h6>
                          @else
                          <h6 class="text-center"> <strong>Dummy Site Link: </strong><a href="{{$project_submission->dummy_link}}" target="_blank">{{$project_submission->dummy_link}}</a></h6>
                          @endif
            <table class="table align-middle mb-0 bg-white table-bordered">
    <thead class="bg-light">
      <tr>
        <th>SL</th>
        <th>Query</th>
        <th>Response</th>


      </tr>
    </thead>
    <tbody>


      <tr>
        <td>
          <div class="d-flex align-items-center">
            1

          </div>
        </td>
        <td>
          <div class="d-flex align-items-center">
            Complete the QC Protocol

          </div>
        </td>
        <td>
          <p class="fw-normal mb-1">@if($project_submission->qc_protocol == 1)
            Yes
            @else
            No
            @endif</p>

        </td>


      </tr>
      <tr>
        <td>
          <div class="d-flex align-items-center">
            2

          </div>
        </td>
        <td>
          <div class="d-flex align-items-center">
            Collected the Login Information

          </div>
        </td>
        <td>
          <p class="fw-normal mb-1">@if($project_submission->login_yes == 1)
            Yes

            @else
            No
            @endif</p>

        </td>


      </tr>

      <tr>
        <td>
          <div class="d-flex align-items-center">
            3

          </div>
        </td>
        <td>
          <div class="d-flex align-items-center">
          Shared the login information with client

          </div>
        </td>
        <td>
          <p class="fw-normal mb-1">@if($project_submission->login_information == 1)
            Yes
            <br>
            <br>
            @if($project_submission->login_url != null)
            <strong>Login Url: </strong><a href="{{$project_submission->login_url}}" target="_blank">{{$project_submission->login_url}}</a>
            <br>
            @endif
          <strong>Login: </strong>{{$project_submission->login}}
          <br>
          <strong>Password: </strong>{{$project_submission->password}}
          <br>
          <strong>Screenshot: </strong><a href="{{$project_submission->screenshot}}" target="_blank">{{$project_submission->screenshot}}</a>
            @else
            No
            @endif
            </p>

        </td>


      </tr>
      <tr>
        <td>
          <div class="d-flex align-items-center">
            4

          </div>
        </td>
        <td>
          <div class="d-flex align-items-center">
          Uploaded Backup Folder in Drive

          </div>
        </td>
        <td>
          <p class="fw-normal mb-1">@if($project_submission->drive_yes == 1)
            Yes

            @else
            No
            @endif
            </p>

        </td>


      </tr>
      <tr>
        <td>
          <div class="d-flex align-items-center">
            5

          </div>
        </td>
        <td>
          <div class="d-flex align-items-center">
        Shared the updated the backup folder in google drive

          </div>
        </td>
        <td>
          <p class="fw-normal mb-1">@if($project_submission->drive_information == 1)
            Yes
            <br>
            <br>
          <strong>Google Drive Link: </strong><a href="{{$project_submission->google_link}}" target="_blank">{{$project_submission->google_link}}</a>
          <br>

            @else
            No
            @endif
            </p>

        </td>


      </tr>
      <tr>
        <td>
          <div class="d-flex align-items-center">
            6

          </div>
        </td>
        <td>
          <div class="d-flex align-items-center">
        The Work Quality of Technical Team

          </div>
        </td>
        <td>
          <p class="fw-normal mb-1">  {{$project_submission->rating}}/10
            </p>

        </td>


      </tr>
      <tr>
        <td>
          <div class="d-flex align-items-center">
            7

          </div>
        </td>
        <td>
          <div class="d-flex align-items-center">
        Comments on The Work Quality of Technical Team

          </div>
        </td>
        <td>
          <p class="fw-normal mb-1"> {{$project_submission->comments}}
            </p>

        </td>


      </tr>
      <tr>
        <td>
          <div class="d-flex align-items-center">
            8

          </div>
        </td>
        <td>
          <div class="d-flex align-items-center">
            The Work Quality of Sales Team to define requirements

          </div>
        </td>
        <td>
          <p class="fw-normal mb-1">   {{$project_submission->requirements}}/10
            </p>

        </td>


      </tr>
      <tr>
        <td>
          <div class="d-flex align-items-center">
            9

          </div>
        </td>
        <td>
          <div class="d-flex align-items-center">
          Comments on The Work Quality of Sales Team

          </div>
        </td>
        <td>
          <p class="fw-normal mb-1">   {{$project_submission->comments2}}
            </p>

        </td>


      </tr>
      <tr>
        <td>
          <div class="d-flex align-items-center">
            10

          </div>
        </td>
        <td>
          <div class="d-flex align-items-center">
          The quality of sales team to define price correctly

          </div>
        </td>
        <td>
          <p class="fw-normal mb-1">   {{$project_submission->price}}/10
            </p>

        </td>


      </tr>
      <tr>
        <td>
          <div class="d-flex align-items-center">
            11

          </div>
        </td>
        <td>
          <div class="d-flex align-items-center">
        Comments on Price defined Quality of Sales Team

          </div>
        </td>
        <td>
          <p class="fw-normal mb-1">   {{$project_submission->comments3}}
            </p>

        </td>


      </tr>
      <tr>
        <td>
          <div class="d-flex align-items-center">
            12

          </div>
        </td>
        <td>
          <div class="d-flex align-items-center">
            Niche/Category of the Project

          </div>
        </td>
        <td>
          <p class="fw-normal mb-1">
              @if($project_submission->niche)
                  {{$project_submission->niche}}
              @else
                  <p class="fw-normal mb-1">Category name not found</p>
              @endif
            </p>

        </td>


      </tr>
      <tr>
        <td>
          <div class="d-flex align-items-center">
            13

          </div>
        </td>
        <td>
          <div class="d-flex align-items-center">
            Collected the Dummy/test site Information

          </div>
        </td>
        <td>
          <p class="fw-normal mb-1">@if($project_submission->dummy_yes == 1)
            Yes

            @else
            No
            @endif
            </p>

        </td>


      </tr>
      <tr>
        <td>
          <div class="d-flex align-items-center">
            14

          </div>
        </td>
        <td>
          <div class="d-flex align-items-center">
            Shared the Dummy/test site with client

          </div>
        </td>
        <td>
          <p class="fw-normal mb-1">@if($project_submission->dummy_information == 1)
            Yes
            <br>
            <br>
          <strong>Dummy/Test Site link: </strong><a href="{{$project_submission->dummy_link}}" target="_blank">{{$project_submission->dummy_link}}</a>
          <br>

            @else
            No
            @endif
            </p>

        </td>


      </tr>
      <tr>
        <td>
          <div class="d-flex align-items-center">
            15

          </div>
        </td>
        <td>
          <div class="d-flex align-items-center">
            Notified the client about dummy site removal after 2 weeks

          </div>
        </td>
        <td>
          <p class="fw-normal mb-1">@if($project_submission->notify == 1)
            Yes

            @else
            No
            @endif
            </p>

        </td>


      </tr>
      <tr>
        <td>
          <div class="d-flex align-items-center">
            16

          </div>
        </td>
        <td>
          <div class="d-flex align-items-center">
            Collected the Actual site Information

          </div>
        </td>
        <td>
          <p class="fw-normal mb-1">@if($project_submission->actual_yes == 1)
            Yes

            @else
            No
            @endif
            </p>

        </td>


      </tr>
      <tr>
        <td>
          <div class="d-flex align-items-center">
            17

          </div>
        </td>
        <td>
          <div class="d-flex align-items-center">
            Shared the Actual site with client

          </div>
        </td>
        <td>
          <p class="fw-normal mb-1">@if($project_submission->dummy_information == 1)
            Yes
            <br>
            <br>
          <strong>Actual Site link: </strong><a href="{{$project_submission->actual_link}}" target="_blank">{{$project_submission->actual_link}}</a>
          <br>

            @else
            No
            @endif
            </p>

        </td>


      </tr>



    </tbody>
  </table>


                          <br>
{{--                            <label class="ml-3" for="">Comments On the Submission</label>--}}
{{--                          <div class="col-md-12">--}}

{{--                            <textarea name="admin_comment" rows="8" cols="160" style="max-width: 100%;"></textarea>--}}

{{--                          </div>--}}

                              <div class="col-md-12 col-lg-12">
                                  <div class="form-group">
                                      <label class="text-dark-grey" data-label="true" for="descriptionText">Comments On the Submission</label>
                                      <textarea name="admin_comment" id="admin_comment" class="form-control"></textarea>
                                     <script src="{{ asset('/ckeditor/ckeditor.js') }}"></script>
                                      <script>
                                          CKEDITOR.replace('admin_comment',{
                                              height: '100'
                                          });
                                      </script>
                                  </div>
                              </div>

                          </div>
                          </div>



      </div>
      <div class="modal-footer">


            <button type="submit" class="btn btn-primary" name="accept" value="accept">Accept</a>
            <button type="submit" class="btn btn-danger" name="deny" value="deny" >Deny</a>
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>

      </div>
        </form>

    </div>
  </div>
</div>
