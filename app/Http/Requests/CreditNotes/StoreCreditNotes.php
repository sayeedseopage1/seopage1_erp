<?php

namespace App\Http\Requests\CreditNotes;

use App\Http\Requests\CoreRequest;
use Illuminate\Validation\Rule;

class StoreCreditNotes extends CoreRequest
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
            'cn_number' => Rule::unique('credit_notes'),
            'issue_date' => 'required',
            'sub_total' => 'required',
            'total' => 'required',
            'invoice_id' => Rule::unique('credit_notes'),
        ];

        if (isset($this->adjustment_amount) && !is_null($this->adjustment_amount)) {
            $min_adjustment_amount = -$this->min_adjustment_amount;
            $rules['adjustment_amount'] = 'gte:' . $min_adjustment_amount;
        }

        return $rules;
    }

    public function messages()
    {
        return [
            'adjustment_amount.gte' => 'Adjustment amount must be greater than or equals to total payment amount of this invoice'
        ];
    }

}
