<?php

namespace App\Http\Requests\SubTask;

use App\Models\Task;
use Carbon\Carbon;
use Illuminate\Foundation\Http\FormRequest;

class StoreSubTask extends FormRequest
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

    public function prepareForValidation()
    {
        $input = $this->all();

        // Modify the post data here

        if ($input['description'] == '<p><br></p>') {
            $input['description'] = '';
        }

        $this->replace($input);
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {


        $setting = global_setting();
        $task = Task::find(request()->task_id);
        $startDate = $task->start_date->format($setting->date_format);
        $dueDate = !is_null($task->due_date) ? $task->due_date->format($setting->date_format) : '';

        $rules = [
            'title' => 'required',
            'estimate_hours'=> 'required',
            'estimate_minutes'=> 'required',
            'description' => 'required',
            'user_id'=>'required'

        ];

        $dueDateRule = 'nullable|date_format:"' . $setting->date_format . '"|after_or_equal:' . $startDate;

        !is_null($task->due_date) ? $dueDateRule . '|before_or_equal:' . $task->due_date : $dueDateRule;

        if ($task->due_date) {

            $dueDate = $task->due_date->format($setting->date_format);
            $dueDateRule .= '|before_or_equal:' . $dueDate;
        }

        $rules['start_date'] = $dueDateRule;

        $rules['due_date'] = !is_null(request()->start_date) ? ($dueDateRule . '|after_or_equal:' . Carbon::createFromFormat($setting->date_format, request()->start_date)->format($setting->date_format)) : $dueDateRule;

        return $rules;
    }

}
