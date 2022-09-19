<?php

namespace App\Http\Requests\PusherSetting;

use App\Http\Requests\CoreRequest;

class UpdateRequest extends CoreRequest
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
            $rules['pusher_app_id'] = 'required';
            $rules['pusher_cluster'] = 'required';
            $rules['pusher_app_key'] = 'required';
            $rules['pusher_app_secret'] = 'required';
        }

        return $rules;
    }

}
