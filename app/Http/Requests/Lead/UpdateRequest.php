<?php

namespace App\Http\Requests\Lead;

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

        $rules = [
            'client_name' => 'required',
            'client_email' => 'nullable|email:rfc|unique:leads,client_email,'.$this->route('lead'),
            'website' => 'nullable|url'
        ];

        return $rules;
    }

}
