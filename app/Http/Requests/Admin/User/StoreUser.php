<?php

namespace App\Http\Requests\Admin\User;

use App\Http\Requests\CoreRequest;

class StoreUser extends CoreRequest
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
        return [
            'name' => 'required:max:50',
            'email' => 'required|email:rfc|unique:users',
            'password' => 'required|min:6',
            'slack_username' => 'nullable|unique:employee_details,slack_username',
            'hourly_rate' => 'nullable|numeric',
            'joining_date' => 'required'
        ];
    }

}
