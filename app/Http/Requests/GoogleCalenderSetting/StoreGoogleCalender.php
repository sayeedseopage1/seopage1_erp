<?php

namespace App\Http\Requests\GoogleCalenderSetting;

use Illuminate\Foundation\Http\FormRequest;

class StoreGoogleCalender extends FormRequest
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
        $rules = [];

        if (request()->get('status') == 'active') {
            $rules['google_client_id'] = 'required';
            $rules['google_client_secret'] = 'required';
        }

        return $rules;
    }

}
