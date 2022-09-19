<?php

namespace App\Http\Requests\Orders;

use App\Http\Requests\CoreRequest;

class UpdateOrder extends CoreRequest
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
        $this->has('show_shipping_address') ? $this->request->add(['show_shipping_address' => 'yes']) : $this->request->add(['show_shipping_address' => 'no']);

        $rules = [
            'sub_total' => 'required',
            'total' => 'required',
        ];

        return $rules;
    }

}
