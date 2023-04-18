<?php

namespace App\Http\Requests\Seopage1Team;

use App\Http\Requests\CoreRequest;

class UpdateDepartment extends CoreRequest
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
            'team_name' => 'required|unique:teams,team_name,'.$this->route('department')
        ];
    }

}
