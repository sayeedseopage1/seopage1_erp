<?php

namespace App\Http\Requests\Payments;

use App\Http\Requests\CoreRequest;
use App\Models\Invoice;

class StorePayment extends CoreRequest
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
            'paid_on' => 'required'
        ];


        if (request('invoice_id') != '') {
            $invoice = Invoice::find(request('invoice_id'));
 
            if ($invoice->amountDue() == 0) {
                $rules['amount'] = 'required|numeric';

            } else {
                $rules['amount'] = 'required|numeric|min:1';
            }
        } else {
            $rules['amount'] = 'required|numeric|min:1';
        }


        if ($this->transaction_id) {
            $rules['transaction_id'] = 'unique:payments';
        }

        if (request('default_client') != '') {
            $rules['invoice_id'] = 'required_without:project_id';
            $rules['project_id'] = 'required_without:invoice_id';
        }


        return $rules;
    }

    public function attributes()
    {
        return [
            'invoice_id' => __('app.invoice'),
            'project_id' => __('app.project'),
        ];
    }

}
