<?php

namespace App\Http\Requests\TimeLogs;

use App\Http\Requests\CoreRequest;
use App\Models\CustomField;

class StoreTimeLog extends CoreRequest
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
        $rules = array();

        $rules['start_time'] = 'required';
        $rules['end_time'] = 'required';
        $rules['memo'] = 'required';
        $rules['task_id'] = 'required';
        $rules['user_id'] = 'required';

        $checkCustomField = request()->custom_fields_data;

        if ($checkCustomField)
        {
            foreach ($checkCustomField as $key => $customFieldsData) {
                $fieldName = explode ('_', $key);
                $name = $fieldName[0];
                $id = $fieldName[1];

                $customFeild = CustomField::find($id);

                if ($customFeild->required == 'yes' && $customFieldsData == null)
                {
                    $rules[$name] = 'required';
                }
            }
        }

        return $rules;
    }

    public function messages()
    {
        return [
            'project_id.required' => __('messages.chooseProject'),
            'task_id.required' => __('messages.fieldBlank'),
            'user_id.required' => __('messages.fieldBlank'),
        ];
    }

}
