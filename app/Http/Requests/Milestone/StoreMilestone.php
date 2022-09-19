<?php

namespace App\Http\Requests\Milestone;

use Illuminate\Foundation\Http\FormRequest;

class StoreMilestone extends FormRequest
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
            'project_id' => 'required',
            'milestone_title' => 'required',
            'summary' => 'required'
        ];

        if ($this->end_date !== null) {
            $rules['start_date'] = 'required';
        }

        if ($this->start_date !== null) {
            $rules['end_date'] = 'required';
        }

        if ($this->start_date > $this->end_date) {
            $rules['end_date'] = 'after_or_equal:start_date';
        }

        if ($this->cost != '' && $this->cost > 0) {
            $rules['currency_id'] = 'required';
        }

        return $rules;
    }

    public function messages()
    {
        return [
            'end_date.after_or_equal' => __('messages.milestoneStartDateValidation')
        ];
    }

}
