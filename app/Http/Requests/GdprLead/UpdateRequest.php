<?php

namespace App\Http\Requests\GdprLead;

use App\Models\Lead;
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
        $lead = Lead::whereRaw('md5(id) = ?', $this->route('lead'))->firstOrFail();

        $rules = [
            'company_name' => 'required',
            'client_name' => 'required',
            'client_email' => 'required|email:rfc|unique:leads,client_email,'.$lead->id,
        ];

        return $rules;
    }

}
