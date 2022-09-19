<?php

namespace App\Http\Requests\CreditNotes;

use App\Http\Requests\CoreRequest;

class UpdateCreditNote extends CoreRequest
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
            'issue_date' => 'required',
            'sub_total' => 'required',
            'total' => 'required'
        ];

        if($this->recurring_payment == 'yes')
        {
            $rules['billing_frequency'] = 'required';
            $rules['billing_interval'] = 'required|integer';
            $rules['billing_cycle'] = 'required|integer';
        }

        return $rules;
    }

}
