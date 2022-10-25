
<!-- TAB CONTENT START -->
<div class="tab-pane fade show active" role="tabpanel" aria-labelledby="nav-email-tab">
<?php
$tasks= App\Models\TaskSubmission::where('task_id',$task->id)->get();
$user_id= App\Models\TaskUser::where('task_id',$task->id)->first();
$user= App\Models\User::where('id',$user_id->user_id)->first();

 ?>
    <div class="d-flex flex-wrap p-20">


            <div class="card file-card w-100 rounded-0 border-0 comment">
                <div class="card-horizontal">
                    <div class="card-img my-1 ml-0">
                        <img src="{{ $user->image_url }}" alt="{{ mb_ucwords($user->name) }}">
                    </div>
                    <div class="card-body border-0 pl-0 py-1 mb-2">
                        <div class="d-flex flex-grow-1">
                            <h4 class="card-title f-12 font-weight-normal text-dark mr-3 mb-1">
                                 <a
                                    href="{{ route('employees.show', $user->id) }}"
                                    class="text-darkest-grey">Task Submission by {{ mb_ucwords($user->name) }}</a>
                            </h4>
                        </div>
                        <hr>



                        <div class="col-12 px-0 pb-3 d-lg-flex d-md-flex d-block">


                          <div class="mb-0 text-dark-grey">

                              <h5 class="text-center">Links</h5>

                              <div class="card bg-light" >
                                <div class="card-body text-center" style="width:100%">


                            @foreach($tasks as $row)
                            @if($row->link != null)



                                    <p class="card-text">  <a class="text-dark-grey" style="font-weight:bold;" target="_blank" href="{{$row->link}}"><i class="fa-solid fa-link"></i> {{$row->link}}</a></p>
                              <br>
                              @endif
                              @endforeach
                            </div>
                          </div>


                          </div>

                        </div>

                      {{--  <div class="col-12 px-0 pb-3 d-lg-flex d-md-flex d-block">


                          <div class="mb-0 text-dark-grey">

                              <h5 class="text-center">Tables</h5>
                              <div class="card bg-light" style="width:655%">
                                <div class="card-body text-center" >

                            @foreach($tasks as $row)
                            @if($row->table != null)

                                  <p class="card-text">  <a class="text-dark-grey" style="font-weight:bold;"> {!!$row->table!!}</a></p>
                              @endif
                              @endforeach
                              </div>
                              </div>

                          </div>

                        </div>
                        <div class="col-12 px-0 pb-3 d-lg-flex d-md-flex d-block">


                          <div class="mb-0 text-dark-grey">

                              <h5 class="text-center">Lists</h5>

                              <div class="card bg-light" style="width:655%">
                                <div class="card-body text-center" >


                            @foreach($tasks as $row)
                            @if($row->list != null)



                                    <p class="card-text">  <a class="text-dark-grey" style="font-weight:bold;"> {!!$row->link!!}</a></p>
                              <br>
                              @endif
                              @endforeach
                            </div>
                          </div>


                          </div>

                        </div> --}}
                        <div class="col-12 px-0 pb-3 d-lg-flex d-md-flex d-block">


                          <div class="mb-0 text-dark-grey">

                              <h5 class="text-center">Texts</h5>

                              <div class="card bg-light" >
                                <div class="card-body text-center" style="width:100%">


                            @foreach($tasks as $row)
                            @if($row->text != null)



                                    <p class="card-text">  <a class="text-dark-grey" style="font-weight:bold;"> {!!$row->text!!}</a></p>
                              <br>
                              @endif
                              @endforeach
                            </div>
                          </div>


                          </div>

                        </div>
                        <div class="col-12 px-0 pb-3 d-lg-flex d-md-flex d-block">


                          <div class="mb-0 text-dark-grey">

                              <h5 class="text-center">Attachment</h5>





                            @foreach($tasks as $row)
                            @if($row->attach != null)
                            <div class="card-body" style="width:100%">

                             <img class="card-img-top" src="{{asset('storage/TaskSubmission/'.$row->attach)}}" width="300" height="150" alt="Card image">



                               </div>

                              @endif
                              @endforeach



                          </div>

                        </div>



                    </div>
                </div>
            </div>
            @if($tasks == null)

            <x-cards.no-record icon="history" :message="__('messages.noRecordFound')" />
            @endif


    </div>

</div>
<!-- TAB CONTENT END -->
