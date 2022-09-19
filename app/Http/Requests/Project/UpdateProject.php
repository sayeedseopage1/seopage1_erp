<?php

namespace App\Http\Requests\Project;

use App\Http\Requests\CoreRequest;
use App\Models\CustomField;
use App\Models\Project;

class UpdateProject extends CoreRequest
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
            'project_name' => 'required|max:150',
            'start_date' => 'required',
            'hours_allocated' => 'nullable|numeric',
            'client_id' => 'requiredIf:client_view_task,true',
            'project_code' => 'required|unique:projects,project_short_code,'.$this->route('project'),
        ];

        if (!$this->has('without_deadline')) {
            $rules['deadline'] = 'required';
        }

        if ($this->project_budget != '') {
            $rules['project_budget'] = 'numeric';
            $rules['currency_id'] = 'required';
        }

        $project = Project::find(request()->project_id);

        if (request()->private && in_array('employee', user_roles()))  {
            $rules['user_id.0'] = 'required';
        }

        if (!request()->private && !request()->public && $project->public == 0 && request()->member_id) {
            $rules['member_id.0'] = 'required';
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

    public function messages()
    {
        return [
            'user_id.0.required' => __('messages.atleastOneValidation'),
            'project_code.required' => __('messages.projectCodeRequired'),
            'member_id.0.required' => __('messages.atleastOneValidation')
        ];
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

                if ($customField->required == 'yes') {
                    $attributes['custom_fields_data['.$key.']'] = $customField->label;
                }
            }
        }

        return $attributes;
    }

}
