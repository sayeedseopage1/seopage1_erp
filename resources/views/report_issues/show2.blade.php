<link href="https://cdn.jsdelivr.net/npm/summernote@0.8.18/dist/summernote.min.css" rel="stylesheet">
<div id="">
    <div class="row">
        <div class="col-sm-12">
            <div class="card bg-white border-0 b-shadow-4">
                <div class="card-header bg-white  border-bottom-grey text-capitalize justify-content-between p-20">
                    <div class="row">
                        <div class="col-lg-10 col-10">
                            <h3 class="heading-h1 mb-3">Report Issues Details</h3>
                        </div>

                    </div>
                </div>
                <div class="card-body">
                  <?php
                  $page_link = '';
                  $page_link .= '<a href="'.$issue->page_link.'" target="_blank" class="text-darkest-grey">'.$issue->page_link.'</a>';
                  $screenshot= '';
                  $screenshot= '<a href="'.$issue->screenshot.'" class="text-darkest-grey" target="_blank">'.$issue->screenshot.'</a>';

                   ?>


                          <x-cards.data-row :label="__('Subject')"
                              :value="$issue->subject" />
                                <x-cards.data-row :label="__('Issue Type')" :value="$issue->issue_type" />


                          <x-cards.data-row :label="__('Description')" :value="$issue->description" html="true" />

                          <x-cards.data-row :label="__('Page Link')" :value="$page_link" />
                              <x-cards.data-row :label="__('Screenshot')" :value="$screenshot" />
                                @if($issue->status == 'pending')
                                <div class="col-12 px-0 pb-3 d-block d-lg-flex d-md-flex">
                          <p class="mb-0 text-lightest f-14 w-30 d-inline-block text-capitalize">
                              Status</p>
                          <p class="mb-0 text-dark-grey f-14 w-70">
                                                              <svg class="svg-inline--fa fa-circle fa-w-16 mr-1 text-yellow f-10" aria-hidden="true" focusable="false" data-prefix="fa" data-icon="circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8z"></path></svg><!-- <i class="fa fa-circle mr-1 text-yellow f-10"></i> Font Awesome fontawesome.com -->
                                                          {{$issue->status}}                        </p>
                      </div>

            @elseif($issue->status == 'in progress')
            <div class="col-12 px-0 pb-3 d-block d-lg-flex d-md-flex">
      <p class="mb-0 text-lightest f-14 w-30 d-inline-block text-capitalize">
          Status</p>
      <p class="mb-0 text-dark-grey f-14 w-70 text-capitalize">
                                          <svg class="svg-inline--fa fa-circle fa-w-16 mr-1 text-primary f-10" aria-hidden="true" focusable="false" data-prefix="fa" data-icon="circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8z"></path></svg><!-- <i class="fa fa-circle mr-1 text-yellow f-10"></i> Font Awesome fontawesome.com -->
                                      {{$issue->status}}</p>
                        </div>
                        @elseif($issue->status == 'fixed')
                        <div class="col-12 px-0 pb-3 d-block d-lg-flex d-md-flex">
                  <p class="mb-0 text-lightest f-14 w-30 d-inline-block text-capitalize">
                      Status</p>
                  <p class="mb-0 text-dark-grey f-14 w-70 text-capitalize">
                                                      <svg class="svg-inline--fa fa-circle fa-w-16 mr-1 text-dark-green f-10" aria-hidden="true" focusable="false" data-prefix="fa" data-icon="circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8z"></path></svg><!-- <i class="fa fa-circle mr-1 text-yellow f-10"></i> Font Awesome fontawesome.com -->
                                                  {{$issue->status}}                        </p>
              </div>
              @else
              <div class="col-12 px-0 pb-3 d-block d-lg-flex d-md-flex">
        <p class="mb-0 text-lightest f-14 w-30 d-inline-block text-capitalize">
            Status</p>
        <p class="mb-0 text-dark-grey f-14 w-70 text-capitalize">
                                            <svg class="svg-inline--fa fa-circle fa-w-16 mr-1 text-danger f-10" aria-hidden="true" focusable="false" data-prefix="fa" data-icon="circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8z"></path></svg><!-- <i class="fa fa-circle mr-1 text-yellow f-10"></i> Font Awesome fontawesome.com -->
                                        {{$issue->status}}                        </p>
    </div>

            @endif

            <?php
            $comments = App\Models\IssueQuery::where('issue_id',$issue->id)->get();
            $comments_count = App\Models\IssueQuery::where('issue_id',$issue->id)->count();
            //dd($comments);
             ?>
                @if($comments_count > 0)
                  <hr>
                <div class="col-12 px-0 pb-3 d-flex">
                    <p class="mb-0 text-lightest f-14 w-30">
                        @lang('Username')</p>
                    <h1 class="text-dark-grey f-14">
                      Comments
                    </h1>
                </div>

                 @foreach($comments as $comment)
                <div class="col-12 px-0 pb-3 d-flex">
                    <p class="mb-0 text-lightest f-14 w-30"><a class="text-darkest-grey" href="/account/employees/{{$comment->user_id}}" target="_blank">
                        {{$comment->user->name}}</a></p>
                    <h1 class="text-dark-grey f-14">
                      {!!$comment->comments!!}
                    </h1>
                </div>
              @endforeach
              @endif

                            <div class="w-100 border-top-grey d-block d-lg-flex d-md-flex justify-content-start px-4 py-3">

                              @if($issue->status == 'pending')
                                @if(Auth::user()->role_id == 1)
                              <form class="" action="{{route('report-issue-status')}}" method="post">
                                @csrf
                                <input type="hidden" name="id" value="{{$issue->id}}">
                                <input type="hidden" name="status" value="in progress">



                        <button type="submit" class="btn-primary rounded f-14 p-2 mr-3">
                                <svg class="svg-inline--fa fa-check fa-w-16 mr-1" aria-hidden="true" focusable="false" data-prefix="fa" data-icon="check" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"></path></svg><!-- <i class="fa fa-check mr-1"></i> Font Awesome fontawesome.com -->
                            Mark As Open
                          </button>
                            </form>
                            @endif

                          @elseif($issue->status == 'in progress')
                          <form id="save-contract-form" action="{{route('report-issue-status')}}" method="post">
                            @csrf
                            <input type="hidden" name="id" value="{{$issue->id}}">

                            <div class="mb-5">
                                <label for="exampleFormControlTextarea1" class="form-label">Comments</label>
                                <div class="mb-3">

                                  <textarea class="form-control" id="comments" name="comments" rows="4" cols="12"></textarea>
                                </div>
                            </div>
                            <div class="row ml-1">

                                @if(Auth::user()->role_id == 1)
                    <button type="submit" name="status" value="fixed" class="btn-primary rounded f-14 p-2 mr-3">
                            <svg class="svg-inline--fa fa-check fa-w-16 mr-1" aria-hidden="true" focusable="false" data-prefix="fa" data-icon="check" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"></path></svg><!-- <i class="fa fa-check mr-1"></i> Font Awesome fontawesome.com -->
                        Mark As Complete
                      </button>
                      @endif



                        @if(Auth::user()->role_id == 1)
                <button type="submit" name="status" value="Not Taken Into Consideration" class="btn-danger rounded f-14 p-2 mr-3">
                      <i class="fa-solid fa-circle-xmark"></i><!-- <i class="fa fa-check mr-1"></i> Font Awesome fontawesome.com -->
                    Not Taken Into Consideration
                  </button>
                  @endif


                          <button type="submit" name="status" value="reply" class="btn-success rounded f-14 p-2 mr-3">
                                <i class="fa-solid fa-reply"></i><!-- <i class="fa fa-check mr-1"></i> Font Awesome fontawesome.com -->
                            Reply
                            </button>
                            @endif

                              </form>




                      <a href="/account/report_issues" class="btn-cancel rounded f-14 p-2 border-0">
                          Cancel
  </a>
  </div>
  </div>
                </div>
            </div>
        </div>
    </div>
</div>
<script src="https://cdn.jsdelivr.net/npm/summernote@0.8.18/dist/summernote.min.js"></script>
<script type="text/javascript">
$(document).ready(function() {
  $('#comments').summernote();
});

</script>
