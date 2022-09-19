<?php

namespace App\Http\Requests\Team;

use App\Http\Requests\CoreRequest;

class StoreDepartment extends CoreRequest
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
            'team_name' => 'required|unique:teams'
        ];
    }

    public function messages()
    {
        return [
            'team_name.required' => __('messages.departmentName'),
            'team_name.unique' => __('messages.departmentUniq'),
        ];
    }

}
