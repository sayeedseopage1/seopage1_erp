<?php
$project_counts= App\Models\PMAssign::where('pm_id',$item->pm_id)->first();
if ($project_counts->project_count != 0) {
  $project_release_count= App\Models\Project::where('pm_id',$item->pm_id)->where('due',0)->count();
  //dd($project_release_count);
  if ($project_release_count != 0) {
    $total_release_percentage= ($project_counts->project_count /$project_release_count)* 100;
  }else {
    $total_release_percentage=0;
  }

  $project_cancelation=  App\Models\Project::where('pm_id',$item->pm_id)->where('status','canceled')->count();
  if ($project_cancelation != 0) {
      $percentage_of_project_cancelation= ($project_cancelation/$project_counts->project_count)*100;
  }else {
    $percentage_of_project_cancelation= 0;
  }

  $projects_on_hold= App\Models\Project::where('pm_id',$item->pm_id)->where('status','on hold')->count();
  if ($projects_on_hold != 0) {
    $projects_on_hold_percentage= ($projects_on_hold/$project_counts->project_count)*100;
  }else {
    $projects_on_hold_percentage= 0;
  }

}else {
    $total_release_percentage=0;
    $percentage_of_project_cancelation= 0;
    $projects_on_hold_percentage= 0;
}
if ($project_counts->amount != 0) {

  $project_cancelation_rate=  App\Models\Project::where('pm_id',$item->pm_id)->where('status','canceled')->sum('project_budget');
  $percentage_of_project_cancelation_rate= ($project_cancelation_rate/$project_counts->amount)*100;
}else {

  $percentage_of_project_cancelation_rate= 0;
}
 ?>
<div class="modal fade" id="manageroverviewmodal{{$item->pm_id}}" aria-hidden="true" aria-labelledby="exampleModalToggleLabel" tabindex="-1">
  <div class="modal-dialog modal-dialog-centered modal-xl">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalToggleLabel">{{ ucfirst($item->project->name) }}</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
                    <div class="row">


                    <div class="col-xl-3 col-lg-3 col-md-3 mb-3" style="color:blue;">

                            <x-cards.widget :title="__('Number of projects')" :value="$project_counts->project_count"
                                icon="layer-group" />

                    </div>
                    <div class="col-xl-3 col-lg-3 col-md-3 mb-3" style="color:blue;">

                            <x-cards.widget :title="__('Total project value')" :value="$project_counts->amount"
                                icon="layer-group" />

                    </div>
                    <div class="col-xl-3 col-lg-3 col-md-3 mb-3" style="color:blue;">

                            <x-cards.widget :title="__('Total released amount')" :value="$project_counts->release_amount"
                                icon="layer-group" />

                    </div>
                    <div class="col-xl-3 col-lg-3 col-md-3 mb-3" style="color:blue;">

                            <x-cards.widget :title="__('% of Project Got Completion')" :value="$total_release_percentage .'%'"
                                icon="layer-group" />

                    </div>
                    <div class="col-xl-3 col-lg-3 col-md-3 mb-3" style="color:blue;">

                            <x-cards.widget :title="__('% of Project Got Canceled')" :value="$percentage_of_project_cancelation . '%'"
                                icon="layer-group" />

                    </div>
                    <div class="col-xl-3 col-lg-3 col-md-3 mb-3" style="color:blue;">

                            <x-cards.widget :title="__('No. of Upsells')" :value="0"
                                icon="layer-group" />

                    </div>
                    <div class="col-xl-3 col-lg-3 col-md-3 mb-3" style="color:blue;">

                            <x-cards.widget :title="__('Value of Upsells')" :value="0"
                                icon="layer-group" />

                    </div>
                    <div class="col-xl-3 col-lg-3 col-md-3 mb-3" style="color:blue;">

                            <x-cards.widget :title="__('No. of Cross-sells')" :value="0"
                                icon="layer-group" />

                    </div>
                    <div class="col-xl-3 col-lg-3 col-md-3 mb-3" style="color:blue;">

                            <x-cards.widget :title="__('Value of Cross-sells')" :value="0"
                                icon="layer-group" />

                    </div>


                    <div class="col-xl-3 col-lg-3 col-md-3 mb-3" style="color:blue;">

                            <x-cards.widget :title="__('Avg. Project Completion Time')" :value="0"
                                icon="layer-group" />

                    </div>
                    <div class="col-xl-3 col-lg-3 col-md-3 mb-3">

                            <x-cards.widget :title="__('Avg. Payment Rel. Time')" :value="0"
                                icon="layer-group" />

                    </div>
                    <div class="col-xl-3 col-lg-3 col-md-3 mb-3" style="color:blue;">

                            <x-cards.widget :title="__('Neg. FB After Submission')" :value="0"
                                icon="layer-group" />

                    </div>
                    <div class="col-xl-3 col-lg-3 col-md-3 mb-3">

                            <x-cards.widget :title="__('% of Projects Compl. on Time')" :value="0"
                                icon="layer-group" />

                    </div>
                    <div class="col-xl-3 col-lg-3 col-md-3 mb-3" style="color:blue;">

                            <x-cards.widget :title="__('% of Projects Cancl. Rate')" :value="$percentage_of_project_cancelation_rate . '%'"
                                icon="layer-group" />

                    </div>
                    <div class="col-xl-3 col-lg-3 col-md-3 mb-3">

                            <x-cards.widget :title="__('% of Projects Gone On-Hold')" :value="$projects_on_hold_percentage .'%'"
                                icon="layer-group" />

                    </div>
                  </div>
      </div>
      <div class="modal-footer">
         <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>

      </div>
    </div>
  </div>
</div>
