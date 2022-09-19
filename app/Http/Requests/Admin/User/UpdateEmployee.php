<?php

namespace App\Http\Requests\Admin\User;

use App\Models\EmployeeDetails;
use App\Http\Requests\CoreRequest;
use Illuminate\Foundation\Http\FormRequest;

class UpdateEmployee extends CoreRequest
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
        $detailID = EmployeeDetails::where('user_id', $this->route('employee'))->first();
        return [
            'email' => 'required|max:100|unique:users,email,'.$this->route('employee'),
            'slack_username' => 'nullable|max:100|unique:employee_details,slack_username,'.$detailID->id,
            'name'  => 'required|max:100',
            'hourly_rate' => 'nullable|numeric',
        ];
    }

}
