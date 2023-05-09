<?php
namespace App\Traits;
use App\Models\LeadsDealsActivityLog;
use Auth;

trait LeadDealActivityLog
{
	public function saveActivityLog($type = [], $message)
	{
		$data = new LeadsDealsActivityLog();
		foreach ($type as $key => $value) {
			if ($key == 'lead') {
				$data->lead_id = $value;
			}

			if ($key == 'deal') {
				$data->deal_id = $value;
			}

			if ($key == 'won_deal') {
				$data->won_deal_id = $value;	
			}
		}
		
		$data->message = $message;
		$data->created_by = Auth::id();
		$data->save();
	}
}
?>