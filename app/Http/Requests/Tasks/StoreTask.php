<?php

namespace App\Http\Requests\Tasks;

use App\Http\Requests\CoreRequest;
use App\Models\CustomField;
use App\Models\Project;
use App\Models\ProjectMilestone;
use App\Models\Task;
use Carbon\Carbon;
use Gitlab\Api\Milestones;

class StoreTask extends CoreRequest
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
        $project = request('project_id') ? Project::findOrFail(request('project_id')) : null;

        if(!is_null($this->milestone_id))
        {
            $milestone = ProjectMilestone::find($this->milestone_id);
            $milestoneEndDate = Carbon::parse($milestone->end_date);
        }
        else
        {
            $milestoneEndDate = null;
        }


        $setting = global_setting();
        $unassignedPermission = user()->permission('create_unassigned_tasks');

        $user = user();
        $rules = [
            'heading' => 'required',
            'milestone_id'=>'required',
            'user_id'=>'required',
            'start_date' => 'required|date_format:"' . $setting->date_format . '"',
            'due_date' => 'required|date_format:"' . $setting->date_format . '"',
            'priority' => 'required',
            'estimate_hours'=> 'required',
            'estimate_minutes'=> 'required',
            'description'=> 'required'
        ];

        if(!$this->has('without_duedate'))
        {
            if(is_null($milestoneEndDate))
            {
                $rules['due_date'] = 'required|date_format:"' . $setting->date_format . '"|after_or_equal:start_date';
            }
            else
            {
              //  $rules['due_date'] = 'required|date_format:"' . $setting->date_format . '"|after_or_equal:start_date|before_or_equal:'.$milestoneEndDate;
            }
        }


        if (request()->has('project_id') && request()->project_id != 'all' && request()->project_id != '') {
            $project = Project::findOrFail(request()->project_id);
            $startDate = $project->start_date->format($setting->date_format);
            $rules['start_date'] = 'required|date_format:"' . $setting->date_format . '"|after_or_equal:' . $startDate;
        }
        else {
            $rules['start_date'] = 'required|date_format:"' . $setting->date_format;
        }

        // if ($this->has('dependent') && $this->dependent_task_id != '') {
        //     $dependentTask = Task::find($this->dependent_task_id);
        //     $rules['start_date'] = 'required|date_format:"' . $setting->date_format . '"|after_or_equal:"' . $dependentTask->due_date->format($setting->date_format) . '"';
        // }

        $rules['user_id.0'] = 'required_with:is_private';

        if ($unassignedPermission != 'all') {
            $rules['user_id.0'] = 'required';
        }

        $rules['dependent_task_id'] = 'required_with:dependent';

        if ($this->has('repeat')) {
            $rules['repeat_cycles'] = 'required|numeric';
        }

        if ($this->has('set_time_estimate')) {
            $rules['estimate_hours'] = 'required|integer|min:0';
            $rules['estimate_minutes'] = 'required|integer|min:0';
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
            'project_id.required' => __('messages.chooseProject'),
            'due_date.after_or_equal' => __('messages.taskAfterDateValidation'),
            'due_date.before_or_equal' => __('messages.taskBeforeDateValidation')
        ];
    }

    public function attributes()
    {
        $attributes = [
            'user_id.0' => __('modules.tasks.assignTo'),
            'dependent_task_id' => __('modules.tasks.dependentTask')
        ];

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
