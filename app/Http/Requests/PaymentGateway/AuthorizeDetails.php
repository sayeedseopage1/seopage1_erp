<?php

namespace App\Http\Requests\PaymentGateway;

use Illuminate\Foundation\Http\FormRequest;

class AuthorizeDetails extends FormRequest
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
        return [
            'card_number' => 'required|numeric',
            'expiration_month' => 'required',
            'expiration_year' => 'required',
            'cvv' => 'required|numeric|digits_between:3,4',
        ];
    }

}
