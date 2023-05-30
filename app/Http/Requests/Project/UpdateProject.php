<?php

namespace App\Http\Requests\Project;

use App\Http\Requests\CoreRequest;
use App\Models\CustomField;
use App\Models\Project;
use AWS\CRT\HTTP\Request;

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
            'deadline' => 'required',
            'project_summary'=>'required',

            // 'hours_allocated' => 'required|numeric',
            'client_id' => 'requiredIf:client_view_task,true',
            'project_code' => 'required|unique:projects,project_short_code,'.$this->route('project'),
        ];

        if (!$this->has('without_deadline')) {
            $rules['deadline'] = 'required';
        }

        if ($this->project_budget != '') {
            $rules['project_budget'] = 'numeric';

        }
        if($this->status_validation == 'not started')
        {
            $rules['requirement_defined'] = 'required';
            $rules['deadline_meet'] = 'required';

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
