<?php

namespace App\Http\Requests\Events;

use App\Http\Requests\CoreRequest;
use Illuminate\Foundation\Http\FormRequest;

class UpdateEvent extends CoreRequest
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
        return [
            'event_name' => 'required',
            'start_date' => 'required',
            'end_date' => 'required|date_format:"' . $setting->date_format . '"|after_or_equal:start_date',
            'all_employees' => 'sometimes',
            'where' => 'required',
            'description' => 'required',
            'event_link' => 'nullable|url'
        ];
    }

}
