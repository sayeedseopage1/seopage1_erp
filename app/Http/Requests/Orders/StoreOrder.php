<?php

namespace App\Http\Requests\Orders;

use App\Http\Requests\CoreRequest;

class StoreOrder extends CoreRequest
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
            'client_id' => 'required',
            'order_date' => 'required',
            'due_date' => 'required',
            'sub_total' => 'required',
            'total' => 'required',
            'currency_id' => 'required',
        ];

        return $rules;
    }

    public function messages()
    {
        return [
            'client_id.required' => __('modules.projects.selectClient')
        ];
    }

}
