@php
	$dealStage = \App\Models\DealStage::where('id', $notification->data['deal_id'])->first();
	$updatedUser = \App\Models\User::where('id', $notification->data['user_id'])->first();
	$heading = '';
@endphp
@if($dealStage->won_lost != null)
	@if ($dealStage->won_lost == 'Yes') 
		@php $heading = 'Won'; @endphp
	@else 
		@php $heading = 'Lost'; @endphp
	@endif
@else
	@if($dealStage->deal_stage == 0)
		@php $heading = 'Contact Made' @endphp
	@elseif ($dealStage->deal_stage == 1) 
		@php $heading = 'Qualified' @endphp
	@elseif($dealStage->deal_stage == 2)
		@php $heading = 'Requirements Defined' @endphp
	@elseif ($dealStage->deal_stage == 3) 
		@php $heading = 'Proposal Made' @endphp
	@else 
		@php $heading = 'Negotiation Started' @endphp
	@endif
@endif
<div class="card border-0">
    <a class="view-notification text-dark border-bottom-grey px-3" href="{{route('deals.show', $notification->data['deal_id'])}}" data-notification-id="{{$notification->id}}">
        <div class="card-horizontal align-items-center">
            <div class="card-img-small mr-3 ml-0 my-2">
                <img class="___class_+?4___" src="{{$updatedUser->image_url}}">
            </div>
            <div class="card-body border-0 pl-0 pr-0 py-1">
                <p class="card-title f-11 mb-0 text-dark-grey f-w-500">Deals marked as ({{$heading}})</p>
                <p class="f-11 mb-0 text-dark-grey">{{$dealStage->project_name}}</p>
                <p class="card-text f-10 text-lightest">{{$dealStage->updated_at->diffForHumans()}}</p>
            </div>
        </div>
    </a>
</div>