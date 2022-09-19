<?php

namespace App\Http\Requests\Proposal;

use App\Http\Requests\CoreRequest;
use Carbon\Carbon;

class StoreRequest extends CoreRequest
{

    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        $setting = global_setting();
        $today = now()->format($setting->date_format);

        return [
            'valid_till' => 'required|after_or_equal:' . $today,
            'sub_total' => 'required',
            'total' => 'required',
            'lead_id' => 'required'
        ];
    }

}
