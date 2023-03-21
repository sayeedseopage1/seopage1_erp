<div class="col-xl-3 col-lg-3 col-md-3 mb-3" style="color:blue;">
    <x-cards.widget :title="__('Number of projects')" :value="$project_counts->project_count ?? 0" icon="layer-group"/>
</div>
<div class="col-xl-3 col-lg-3 col-md-3 mb-3" style="color:blue;">
    <x-cards.widget :title="__('Total project value')" :value="round($project_counts->amount ?? 0 , 2)" icon="layer-group" />
</div>
<div class="col-xl-3 col-lg-3 col-md-3 mb-3" style="color:blue;">
    <x-cards.widget :title="__('Total released amount')" :value="$project_counts->release_amount ?? 0" icon="layer-group" />
</div>
<div class="col-xl-3 col-lg-3 col-md-3 mb-3" style="color:blue;">

    <x-cards.widget :title="__('% of Project Got Completion')" :value="$total_release_percentage .'%'" icon="layer-group" />

</div>
<div class="col-xl-3 col-lg-3 col-md-3 mb-3" style="color:blue;">

    <x-cards.widget :title="__('% of Project Got Canceled')" :value="round($percentage_of_project_cancelation, 2) . '%'" icon="layer-group" />

</div>
<div class="col-xl-3 col-lg-3 col-md-3 mb-3" style="color:blue;">

    <x-cards.widget :title="__('No. of Upsells')" :value="0" icon="layer-group" />

</div>
<div class="col-xl-3 col-lg-3 col-md-3 mb-3" style="color:blue;">

    <x-cards.widget :title="__('Value of Upsells')" :value="0" icon="layer-group" />

</div>
<div class="col-xl-3 col-lg-3 col-md-3 mb-3" style="color:blue;">

    <x-cards.widget :title="__('No. of Cross-sells')" :value="0" icon="layer-group" />

</div>
<div class="col-xl-3 col-lg-3 col-md-3 mb-3" style="color:blue;">

    <x-cards.widget :title="__('Value of Cross-sells')" :value="0" icon="layer-group" />

</div>


<div class="col-xl-3 col-lg-3 col-md-3 mb-3" style="color:blue;">

    <x-cards.widget :title="__('Avg. Project Completion Time')" :value="0" icon="layer-group" />

</div>
<div class="col-xl-3 col-lg-3 col-md-3 mb-3">

    <x-cards.widget :title="__('Avg. Payment Rel. Time')" :value="0" icon="layer-group" />

</div>
<div class="col-xl-3 col-lg-3 col-md-3 mb-3" style="color:blue;">

    <x-cards.widget :title="__('Neg. FB After Submission')" :value="0" icon="layer-group" />

</div>
<div class="col-xl-3 col-lg-3 col-md-3 mb-3">

    <x-cards.widget :title="__('% of Projects Compl. on Time')" :value="0" icon="layer-group" />

</div>
<div class="col-xl-3 col-lg-3 col-md-3 mb-3" style="color:blue;">

    <x-cards.widget :title="__('% of Projects Cancl. Rate')" :value="round($percentage_of_project_cancelation_rate, 2) . '%'" icon="layer-group" />

</div>
<div class="col-xl-3 col-lg-3 col-md-3 mb-3">

    <x-cards.widget :title="__('% of Projects Gone On-Hold')" :value="$projects_on_hold_percentage .'%'" icon="layer-group" />

</div>