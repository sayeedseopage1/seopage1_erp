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
                                    class="text-darkest-grey">{{ mb_ucwords($user->name) }}</a>
                            </h4>
                        </div>
                        <div class="col-12 px-0 pb-3 d-lg-flex d-md-flex d-block">
                          <p class="mb-0 text-lightest f-14 w-30 text-capitalize">
                              Parent Task
                          </p>
                          <div class="mb-0 text-dark-grey">
                              <a class="text-dark-grey" style="font-weight:bold;" href="#">jndasdnasd</a>
                          </div>


                        </div>
                    </div>
                </div>
            </div>

            <x-cards.no-record icon="history" :message="__('messages.noRecordFound')" />


    </div>

</div>
<!-- TAB CONTENT END -->
