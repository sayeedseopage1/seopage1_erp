<?php

namespace App\Http\Requests\Orders;

use Illuminate\Foundation\Http\FormRequest;

class PlaceOrder extends FormRequest
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

        $rules['status'] = 'sometimes|in:pending,on-hold,failed,processing,completed,canceled';

        if (request()->has('client_id')) {
            $rules['client_id'] = 'required';
        }

        return $rules;
    }

    public function messages()
    {
        return [
            'client_id.required' => __('modules.projects.selectClient')
        ];
    }

}
