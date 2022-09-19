<?php

namespace App\Http\Requests\Invoices;

use App\Http\Requests\CoreRequest;

class StoreRecurringInvoice extends CoreRequest
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

        $setting = global_setting();

        $rules = [
            'issue_date' => 'required',
            'sub_total' => 'required',
            'total' => 'required',
            'currency_id' => 'required',
        ];

        if ($this->has('due_date')) {
            $rules['due_date'] = 'required|date_format:"' . $setting->date_format . '"|after_or_equal:'.$this->issue_date;
        }

        if ($this->show_shipping_address == 'on') {
            $rules['shipping_address'] = 'required';
        }

        if ($this->project_id == '') {
            $rules['client_id'] = 'required';
        }

        if($this->get('rotation') == 'weekly' || $this->get('rotation') == 'bi-weekly'){
            $rules['day_of_week'] = 'required';
        }
        elseif ($this->get('rotation') == 'monthly' || $this->get('rotation') == 'quarterly' || $this->get('rotation') == 'half-yearly' || $this->get('rotation') == 'annually'){
            $rules['day_of_month'] = 'required';
        }

        return $rules;
    }

}
