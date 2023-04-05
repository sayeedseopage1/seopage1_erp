<?php

namespace App\Http\Requests\Invoices;

use App\Http\Requests\CoreRequest;
use App\Models\CustomField;

class StoreInvoice extends CoreRequest
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
            'invoice_number' => 'required|unique:invoices',
            'issue_date' => 'required',
            'sub_total' => 'required',
            'total' => 'required|min:0',
            'currency_id' => 'required',
        ];

        if ($this->has('due_date')) {
            $rules['due_date'] = 'required|date_format:"' . $setting->date_format . '"|after_or_equal:'.$this->issue_date;
        }

        if ($this->project_id == '') {
            $rules['client_id'] = 'required';
        }

        if (request()->get('custom_fields_data')) {
            $fields = request()->get('custom_fields_data');

            foreach ($fields as $key => $value) {
                $idarray = explode('_', $key);
                $id = end($idarray);
                $customField = CustomField::findOrFail($id);

                if ($customField->required == 'yes' && (is_null($value) || $value == '')) {
                    $rules['custom_fields_data['.$key.']'] = 'required';
                }
            }
        }

        return $rules;
    }

    public function attributes()
    {
        $attributes = [];

        if (request()->get('custom_fields_data')) {
            $fields = request()->get('custom_fields_data');

            foreach ($fields as $key => $value) {
                $idarray = explode('_', $key);
                $id = end($idarray);
                $customField = CustomField::findOrFail($id);

                if ($customField->required == 'yes' && (is_null($value) || $value == '')) {
                    $rules['custom_fields_data[$key]'] = 'required';
                }
            }
        }

        return $attributes;
    }

    public function messages()
    {
        return [
            'client_id.required' => __('modules.projects.selectClient')
        ];
    }

}
