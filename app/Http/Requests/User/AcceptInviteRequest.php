<?php

namespace App\Http\Requests\User;

use Illuminate\Foundation\Http\FormRequest;

class AcceptInviteRequest extends FormRequest
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
            'name' => 'required',
            'password' => 'required|min:8'
        ];

        if (request()->has('email_address')) {
            $rules['email_address'] = 'required';
        }
        
        $rules['email'] = 'required|email:rfc|unique:users';

        return $rules;
    }

}
