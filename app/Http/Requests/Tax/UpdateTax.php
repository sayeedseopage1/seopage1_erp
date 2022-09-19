<?php

namespace App\Http\Requests\Tax;

use App\Http\Requests\CoreRequest;

class UpdateTax extends CoreRequest
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

        if($this->via && $this->via == 'tax-setting') {
            return $rules = [
                'tax_name' => 'required',
                'rate_percent' => 'required|numeric',
            ];
        }
        else {
            if ($this->type == 'tax_name') {
                $rules = [
                    'value' => 'required|unique:taxes,tax_name',
                ];
            }
            else {
                $rules = [
                    'value' => 'required|numeric'
                ];
            }
        }

        return $rules;
    }

}
