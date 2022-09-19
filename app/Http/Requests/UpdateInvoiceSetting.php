<?php

namespace App\Http\Requests;

use App\Http\Requests\CoreRequest;

class UpdateInvoiceSetting extends CoreRequest
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
            'invoice_prefix' => 'required',
            'estimate_prefix' => 'required',
            'credit_note_prefix' => 'required',
            'template' => 'required',
            'due_after' => 'required|numeric',
            'invoice_terms' => 'required'
        ];

        return $rules;
    }

}
