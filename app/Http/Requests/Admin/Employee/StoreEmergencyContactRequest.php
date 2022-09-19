<?php

namespace App\Http\Requests\Admin\Employee;

use App\Http\Requests\CoreRequest;

class StoreEmergencyContactRequest extends CoreRequest
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
        $rules = [
            'name' => 'required|max:50',
            'mobile' => 'required',
            'relationship' => 'required',
        ];

        if (request()->get('email')) {
            $rules['email'] = 'email:rfc';
        }

        return $rules;
    }

}
