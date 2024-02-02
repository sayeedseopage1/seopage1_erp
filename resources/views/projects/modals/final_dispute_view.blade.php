<div class="modal fade" id="final_dispute_view" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-xl">
      <div class="modal-content">
        <form action="#"  method="post" id="authForm">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">See Dispute</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <?php
            $dispute = App\Models\ProjectDispute::where('project_id', $project->id)
                ->orderBy('id', 'desc')
                ->first();
            ?>
        <div class="modal-body">
          <div class="card">
            <div class="card-body">
                <div class="col-12 px-0 pb-3 d-block d-lg-flex d-md-flex">
                    <p class="mb-0 text-lightest f-14 w-30 d-inline-block text-capitalize">@lang('Dispute Data')</p>
                    <p class="mb-0 text-dark-grey f-14 w-70">
                        @if ($dispute->project_id)
                            @if ($dispute->project->status == 'in progress')
                                <i class="fa fa-circle mr-1 text-blue f-10"></i>
                            @elseif ($dispute->project->status == 'on hold')
                                <i class="fa fa-circle mr-1 text-yellow f-10"></i>
                            @elseif ($dispute->project->status == 'not started')
                                <i class="fa fa-circle mr-1 text-yellow f-10"></i>
                            @elseif ($dispute->project->status == 'canceled')
                                <i class="fa fa-circle mr-1 text-red f-10"></i>
                            @elseif ($dispute->project->status == 'finished')
                                <i class="fa fa-circle mr-1 text-dark-green f-10"></i>
                            @endif
                            <a href="{{ route('projects.show', $dispute->project_id) }}" class="text-dark-grey">
                                {{ $dispute->project->project_name }}</a>

                        @else
                            --
                        @endif
                    </p>

                </div>
                <div class="col-12 px-0 pb-3 d-block d-lg-flex d-md-flex">
                    <p class="mb-0 text-lightest f-14 w-30 d-inline-block text-capitalize">@lang('Client User Name')</p>
                    <p class="mb-0 text-dark-grey f-14 w-70">

                                <i class="fa fa-circle mr-1 text-red f-10"></i>
                            <span class="text-dark-grey">
                                {{ $dispute->client_username }}</span>


                    </p>

                </div>

            <div class="col-12 px-0 pb-3 d-block d-lg-flex d-md-flex">
                <p class="mb-0 text-lightest f-14 w-30 d-inline-block text-capitalize">@lang('Project Value')</p>
                <p class="mb-0 text-dark-grey f-14 w-70">
                   {{ $dispute->project_value }}
                </p>
            </div>

                <x-cards.data-row :label="__('What was the project about!')" :value="!empty($dispute->description1) ? $dispute->description1 : '--'" html="true" />
                <x-cards.data-row :label="__('What percentage of the amount is in dispute? Also, write the amount in dispute separately. (for example 60% and 300 USD)')"
                :value="!empty($dispute->description2) ? $dispute->description2 : '--'" html="true" />
                <x-cards.data-row :label="__('Did they release the amount that is not in dispute? Or did they release any amount at all?')"
                :value="!empty($dispute->description3) ? $dispute->description3 : '--'" html="true" />
                <x-cards.data-row :label="__('Which phase we were at when this issue occurred?
                (Requirements define, Research/planning, execution (Mention the percentage of execution that was done), QC, Revisions and feedback)')"
                :value="!empty($dispute->description4) ? $dispute->description4 : '--'" html="true" />
                <x-cards.data-row :label="__('What is the issue here? (Dispute/Milestone cancelation/Project cancelation/Client complaining to freelancer.com)')"
                :value="!empty($dispute->description5) ? $dispute->description5 : '--'" html="true" />
                <x-cards.data-row :label="__('According to you, which of our team/individuals is responsible for this exactly? (You could not manage the project properly/the sales team brought the wrong project/the developers messed up or anything else. Write in detail)')"
                :value="!empty($dispute->description6) ? $dispute->description6 : '--'" html="true" />
                <x-cards.data-row :label="__('Was the work delivered fully to the clients satisfaction and as per the agreed job scope?')"
                :value="!empty($dispute->description7) ? $dispute->description7 : '--'" html="true" />
                <x-cards.data-row :label="__('What was the deadline and was the deadline met?')"
                :value="!empty($dispute->description8) ? $dispute->description8 : '--'" html="true" />
                <x-cards.data-row :label="__('What was the work about (You can share the instruction file) (optional)')"
                :value="!empty($dispute->description9) ? $dispute->description9 : '--'" html="true" />
                <x-cards.data-row :label="__('Describe the reason why we are here. In other words, write down why the client is this much dissatisfied and thinks of such extreme steps.')"
                :value="!empty($dispute->description10) ? $dispute->description10 : '--'" html="true" />
                <x-cards.data-row :label="__('When did the client get dissatisfied the 1st time (Write the date, the reason, what he demanded and what measures were taken from your side after that)')"
                :value="!empty($dispute->description11) ? $dispute->description11 : '--'" html="true" />
                <x-cards.data-row :label="__('When did the client get dissatisfied the 2nd time? (Write down the date, the reason, what he demanded and what measures were taken after that)')"
                :value="!empty($dispute->description12) ? $dispute->description12 : '--'" html="true" />
                <x-cards.data-row :label="__('When did the client get dissatisfied the 3rd time? (Write down the date, the reason, what he demanded and what measures were taken from your side after that)')"
                :value="!empty($dispute->description13) ? $dispute->description13 : '--'" html="true" />
                <x-cards.data-row :label="__('List down your weaknesses/shortcomings/lackings during this project. Please be honest and do not hide anything. That is in the best interest of you and the company!')"
                :value="!empty($dispute->description14) ? $dispute->description14 : '--'" html="true" />
                <x-cards.data-row :label="__('If we have to win here, what is the percentage and value of the amount we should realistically claim (According to you)?')"
                :value="!empty($dispute->description15) ? $dispute->description15 : '--'" html="true" />
                <x-cards.data-row :label="__('Write down anything that you did not specifically mention above. Remember, if we are not
                aware of anything and the client blindsides us during the arbitration, the case will become very weak and it will be close to impossible for us to win it!')"
                :value="!empty($dispute->description16) ? $dispute->description16 : '--'" html="true" />
                <x-cards.data-row :label="__('Please confirm all the above details are correct & complete & no information was hidden for the client
                to blindside us. Repetition of such things may lead to tougher actions from the company as in a showcause letter, cash penalty etc.')"
                :value="!empty($dispute->description17) ? $dispute->description17 : '--'" html="true" />

                <div class="col-12 px-0 pb-3 d-block d-lg-flex d-md-flex">
                    <p class="mb-0 text-lightest f-14 w-30 d-inline-block text-capitalize">@lang('Project Manager Name')</p>
                    <p class="mb-0 text-dark-grey f-14 w-70"> {{ $dispute->pm_name }}</p>
                </div>
                <div class="col-12 px-0 pb-3 d-block d-lg-flex d-md-flex">
                    <p class="mb-0 text-lightest f-14 w-30 d-inline-block text-capitalize">@lang('Project Manager Email')</p>
                    <p class="mb-0 text-dark-grey f-14 w-70">
                       {{ $dispute->pm_email }}
                    </p>
                </div>
                @php
                    $canceledProject = App\Models\Project::where('id',$project->id)->first();
                @endphp
                @if ($canceledProject->status=='canceled')
                <hr>
                <div class="col-12 px-0 pb-3 d-block d-lg-flex d-md-flex">
                    <p class="mb-0 text-lightest f-14 w-30 d-inline-block text-capitalize">@lang('Admin Comment')</p>
                    <p class="mb-0 text-dark-grey f-14 w-70">
                       {!! $canceledProject->dispute_admin_comment !!}
                    </p>
                </div>
                @endif
                @if (Auth::user()->role_id==1 && $canceledProject->dispute_admin_comment == null)
                <div class="form-group mt-3">
                    <label class="text-dark-grey" data-label="true" for="dispute_admin_comment">Comment
                        <sup class="mr-1">*</sup>
                    </label>
                    <textarea name="dispute_admin_comment" id="dispute_admin_comment" class="form-control"></textarea>
                   <script src="{{ asset('/ckeditor/ckeditor.js') }}"></script>
                    <script>
                        CKEDITOR.replace('dispute_admin_comment');
                    </script>
                    <label id="dispute_admin_commentError" class="error" for="dispute_admin_comment"></label>
                </div>
                @endif

            </div>
          </div>
        </div>
        <div class="modal-footer">
            @if (Auth::user()->role_id==1 && $canceledProject->dispute_admin_comment == null)
                <button type="button" class="btn btn-primary" id="authBtn">Authorize</button>
            @endif
        </div>
        </form>
      </div>
    </div>
  </div>
<script>
     $('#authBtn').click(function(e){
        e.preventDefault();
        var dispute_admin_comment = CKEDITOR.instances.dispute_admin_comment.getData();
        var data= {
            '_token': "{{ csrf_token() }}",
            'project_id': {{$project->id}},
            'dispute_admin_comment': dispute_admin_comment,
        }
        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            }
        });
        $.easyAjax({
            blockUI: true,
            disableButton: true,
            buttonSelector: "#authBtn",
            type: "POST",
            url: "{{route('dispute-authorization')}}",
            data: data,
            dataType: "json",
            success: function (response) {
                if (response.status == 400) {
                    toastr.success('Authorization request send successfully');
                    window.location.reload();
                }
            },
        });
    });
</script>
