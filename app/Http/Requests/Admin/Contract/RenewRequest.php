<?php

namespace App\Http\Requests\Admin\Contract;

use App\Http\Requests\CoreRequest;
use App\Models\Contract;

class RenewRequest extends CoreRequest
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
        $setting = global_setting();

        $rules = [
            'amount' => 'required',
            'end_date' => 'nullable|date_format:"' . $setting->date_format . '"|after_or_equal:start_date',
        ];


        if (request()->has('contract_id')) {
            $contract = Contract::findOrFail(request()->contract_id);
            $startDate = $contract->end_date ? $contract->end_date->format($setting->date_format) : $contract->start_date->format($setting->date_format);
            $rules['start_date'] = 'required|date_format:"' . $setting->date_format . '"|after_or_equal:' . $startDate;
        }

        return $rules;

    }

    public function messages()
    {
        return [
            'amount.required' => 'The amount field is required.',
            'start_date.required' => 'The start date field is required.',
            'end_date.required' => 'The end date field is required.'
        ];
    }

}
